import 'dart:convert';

import 'package:syncfusion_flutter_charts/charts.dart';

import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

/**
 * View Charts
 *
 ********************************************************************************************************
 *  ###   Date              Author       Description
 *-------------------------------------------------------------------------------------------------------
 *    1   10-APR-2020    	  Theeksha      Initial Development.
 *
 ********************************************************************************************************
 */

class ViewCharts extends StatefulWidget {
  @override
  _ViewChartsState createState() => _ViewChartsState();
}

class _ViewChartsState extends State<ViewCharts> {

  TooltipBehavior _tooltipBehavior;
  Map<String, dynamic> mapData;
  List<dynamic> listActivities;

  @override
  void initState(){
    _tooltipBehavior =  TooltipBehavior(enable: true);
    super.initState();
    getDetails();
  }

  // Added by Osura - Get activity list
  Future getDetails() async {
    http.Response res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllActivities'));
    mapData = json.decode(res.body);
    setState(() {
      listActivities = mapData["Activities"];
    });
    print(res.statusCode);
    return res.body;
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
        backgroundColor: Color(0xffE7EEEC),
        appBar: new AppBar(
          title: Text("Dashboard"),
          backgroundColor: Color(0xff50C2C9),
        ),
        body: Center(
          child: ListView(
            children: <Widget>[
              Container(
                //Initialize chart
                  child: SfCartesianChart(
                    // Enables the tooltip for all the series in chart
                      tooltipBehavior: _tooltipBehavior,
                      // Initialize category axis
                      primaryXAxis: CategoryAxis(),
                      series: <ChartSeries>[
                        // Initialize line series
                        LineSeries<SalesData, String>(
                          // Enables the tooltip for individual series
                            enableTooltip: true,
                            dataSource: [
                              // Bind data source
                              SalesData('Jan', 35),
                              SalesData('Feb', 28),
                              SalesData('Mar', 34),
                              SalesData('Apr', 32),
                              SalesData('May', 40)
                            ],
                            xValueMapper: (SalesData sales, _) => sales.year,
                            yValueMapper: (SalesData sales, _) => sales.sales
                        )
                      ]
                  )
              ),

              Container(
                //Initialize chart
                  child: SfCartesianChart(
                    // Enables the tooltip for all the series in chart
                      tooltipBehavior: _tooltipBehavior,
                      // Initialize category axis
                      primaryXAxis: CategoryAxis(),
                      series: <ChartSeries>[
                        // Renders column chart
                        ColumnSeries<SalesData1, int>(
                            enableTooltip: true,
                            dataSource: [
                              SalesData1(2010, 35),
                              SalesData1(2011, 28),
                              SalesData1(2012, 34),
                              SalesData1(2013, 32),
                              SalesData1(2014, 40)

                      ],
                            xValueMapper: (SalesData1 sales, _) => sales.year1,
                            yValueMapper: (SalesData1 sales, _) => sales.sales1
                        )
                      ]
                  )
              ),
              Container(
                  child: SfCartesianChart(
                      primaryXAxis: CategoryAxis(),
                      series: <ChartSeries>[
                        SplineAreaSeries<SalesData1, int>(
                            dataSource:  [
                              SalesData1(2010, 35),
                              SalesData1(2011, 28),
                              SalesData1(2012, 34),
                              SalesData1(2013, 32),
                              SalesData1(2014, 40)

                            ],
                            xValueMapper: (SalesData1 sales, _) => sales.year1,
                            yValueMapper: (SalesData1 sales, _) => sales.sales1
                        ),
                        SplineAreaSeries<SalesData1, int>(
                            dataSource: [
                              // Bind data source
                              SalesData1(2010, 25),
                              SalesData1(2011, 10),
                              SalesData1(2012, 20),
                              SalesData1(2013, 27),
                              SalesData1(2014, 30)
                            ],
                            xValueMapper: (SalesData1 sales, _) => sales.year1,
                            yValueMapper: (SalesData1 sales, _) => sales.sales1
                        ),
                      ]
                  )
              )

            ]

          )

        )

    );
  }
}

class SalesData{
  SalesData(this.year, this.sales);
  final String year;
  final double sales;
}

class SalesData1{
  SalesData1(this.year1, this.sales1);
  final int year1;
  final double sales1;
}
