const router = require("express").Router();
const Report = require("../models/Report");
const FinalReport = require("../models/FinalReport");

//Create a new report
router.post("/", async function (req, res) {
  const newReport = new Report(req.body);

  try {
    const savedReport = await newReport.save();

    reportStatus = "success";
    report_id = savedReport._id;

    res.status(200).json({ reportStatus, report_id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get report
router.get("/", async function (req, res) {
  try {
    const query = req.query.report_id;

    const report = await Report.findById(query);
    const commodities = await Report.find({ cmdtyID: report._id });

    //Checking if the commodity being added already exists or not
    if (commodities) {
      let commodityInstance = commodities[0].reportDetails[0];

      // const sample = {
      //   cmdtyID: commodityInstance.cmdtyID,
      //   marketID: commodityInstance.marketID,
      // };
      // const test = await Report.findOne(sample);
      // console.log(test);

      let totalPrice = 0;
      let convertedPrice;
      let flag = 0;
      let users = [];

      //Looping through all the matched commodities
      commodities.forEach(function (commodity) {
        convertedPrice =
          commodity.reportDetails[0].price /
          commodity.reportDetails[0].convFctr;
        totalPrice += convertedPrice;
        flag++;
        users.push(commodity.reportDetails[0].userID);
      });

      let meanPrice = totalPrice / flag;

      const sameCommodity = await FinalReport.findOne({
        cmdtyID: commodityInstance.cmdtyID,
        marketID: commodityInstance.marketID,
      });

      //Checking if an aggregated report already exists on the basis of commodityID and marketID
      //If yes then simply update the aggregated prices
      //else add the aggregated report to the Final Report
      if (sameCommodity) {
        try {
          const updatedReport = await FinalReport.findOneAndUpdate(
            sameCommodity,
            {
              $set: { price: meanPrice },
            },
            { new: true }
          );

          res.status(200).json(updatedReport);
        } catch (err) {
          res.status(400).json(err);
        }
      } else {
        let finalReport = {
          cmdtyID: commodityInstance.cmdtyID,
          cmdtyName: commodityInstance.cmdtyName,
          marketID: commodityInstance.marketID,
          marketName: commodityInstance.marketName,
          users: users,
          priceUnit: "Kg",
          price: meanPrice,
        };

        const newFinalReport = new FinalReport(finalReport);

        try {
          const savedFinalReport = await newFinalReport.save();

          res.status(200).json(savedFinalReport);
        } catch (err) {
          console.log(err);
          res.status(400).json(err);
        }
      }
    } else if (report) {
      res(200).json(report);
    } else {
      res(404).send("Report not found!!!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
