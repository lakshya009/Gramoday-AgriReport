Gramoday-AgriReport

In this project daily prices are reported by users whose occupation is mandi
commission agent. Each mandi commission agent maps to one market commodity combination
for which he creates a daily price report.

For a particular commodity item, different users can add different reports and finally an aggregated report is generated and shown.

Example:

POST\api\repots:

```{
    "reportDetails": [
        {
        "userID": "user-1",
        "marketID": "market-1",
        "marketName": "Vashvi Navi Mumbai",
        "cmdtyID": "cmdty-1",
        "cmdtyName": "Potato",
        "priceUnit": "Pack",
        "convFctr": 50,
        "price": 700
    }
  ]
}

Note: convFctr is factor to convert priceUnit to convert to base prices (Kg).

Response:
{
  reportStatus: "success";,
  report_id: 6263154354d536d501e18b88;
}

Another POST
{
    "reportDetails": [
        {
        "userID": "user-2",
        "marketID": "market-1",
        "marketName": "Vashvi Navi Mumbai",
        "cmdtyID": "cmdty-1",
        "cmdtyName": "Potato",
        "priceUnit": "Quintal",
        "convFctr": 100,
        "price": 1600
    }
  ]
}

Response:
Response:
{
  reportStatus: "success";,
  report_id: 6263154354d536d501e18b88;
}


#GET request
  GET\api\reports?report_id=6263154354d536d501e18b88

  Response:
  {
    "_id": "62639aa12257d273c8e0febb",
    "marketID": "market-1",
    "marketName": "Vashvi Navi Mumbai",
    "cmdtyID": "cmdty-1",
    "cmdtyName": "Potato",
    "users": [
        "user-1",
        "user-2"
    ],
    "priceUnit": "Kg",
    "price": 15,
    "createdAt": "2022-04-23T06:20:17.936Z",
    "updatedAt": "2022-04-23T06:28:12.061Z",
    "__v": 0
}

---------------------------------------------------------------------------------------------------------------------------------------------------------------------
=> In this project, report_id of a submitted report is used to search for the reports.
=> If there are same commodities (same commodity id), then their prices are aggregated after converting prices to the base price (Kg).
=> If an aggregated already exists then only the price is updated in database.
```
