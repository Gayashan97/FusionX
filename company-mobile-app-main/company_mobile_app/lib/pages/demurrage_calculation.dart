import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class DemurrageCalculation extends StatefulWidget {
  @override
  _DemurrageCalculationState createState() => _DemurrageCalculationState();
}

class _DemurrageCalculationState extends State<DemurrageCalculation> {
  Map<String, dynamic> mapDataLog;
  List<dynamic> listActivityLog;

  Future _calculateDemurrage() async {
      http.Response res = await http.post( //send data to API
      Uri.https('ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
          'Prod/DemurrageCalculation'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{ // assign data to json
        'createdDate': _createdDate.toString(),
        'clearingDate': _clearingDate.toString(),
      }),
    );
    mapDataLog = json.decode(res.body);
    setState(() {
      listActivityLog = mapDataLog["Calculation"];
    });
    print('${listActivityLog[0]["message"]}');
    return res.body;

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffE7EEEC),
      appBar: new AppBar(
        title: Text("Demurrage Calculation"),
        backgroundColor: Color(0xff50C2C9),
      ),
      body: Center(
        child: ListView(
          children: <Widget>[
            /*********** Logo ***********/
            Padding(
              padding: const EdgeInsets.only(top: 25.0, bottom: 35.0),
              child: Image(
                image: AssetImage('assets/yacht.png'),
                height: 175,
                width: 175,
              ),
            ),

            /*********** Heading ***********/
            Text("Calculate Demurrage",
                textAlign: TextAlign.center,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 40)
            ),

            Column(
              children: <Widget>[
                Padding(
                    padding: const EdgeInsets.only(top: 15)
                ),

                /*********** Start Created Date Label ***********/
                Container(
                  child: Text("Created Date",
                      textAlign: TextAlign.left,
                      style:
                          TextStyle(fontWeight: FontWeight.bold, fontSize: 20)
                  ),
                ),

                /*********** Start Created Date Picker ***********/
                Container(
                  margin: const EdgeInsets.symmetric(
                      vertical: 10.0, horizontal: 20.0),
                  padding: const EdgeInsets.all(8.0),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.black, width: 1.0),
                    borderRadius: BorderRadius.circular(20.0),
                  ),
                  child: Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            vertical: 10.0, horizontal: 20.0),
                        child: Icon(
                          Icons.calendar_today_rounded,
                          color: Colors.black,
                        ),
                      ),
                      Container(
                        height: 30.0,
                        width: 1.0,
                        color: Colors.black.withOpacity(0.5),
                        margin: const EdgeInsets.only(right: 10.0),
                      ),
                      Expanded(
                        child: FlatButton(
                          onPressed: () {
                            createdDatePicker(context); //call datepicker
                          },
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Expanded(
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(
                                      vertical: 16.0
                                  ),
                                  child: Text(
                                    _createdDate.toString(),
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 18
                                    ),
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      )
                    ],
                  ),
                ),

                Padding(padding: const EdgeInsets.only(top: 15)),

                /*********** Start Clearing Date Label ***********/
                Container(
                  child: Text("Clearing Date",
                      textAlign: TextAlign.left,
                      style:
                      TextStyle(fontWeight: FontWeight.bold, fontSize: 20)
                  ),
                ),

                /*********** Start Clearing Date Text Box ***********/
                Container(
                  margin: const EdgeInsets.symmetric(
                      vertical: 10.0, horizontal: 20.0
                  ),
                  padding: const EdgeInsets.all(8.0),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.black, width: 1.0),
                    borderRadius: BorderRadius.circular(20.0),
                  ),
                  child: Row(
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            vertical: 10.0, horizontal: 15.0),
                        child: Icon(
                          Icons.calendar_today_rounded,
                          color: Colors.black,
                        ),
                      ),
                      Container(
                        height: 30.0,
                        width: 1.0,
                        color: Colors.black.withOpacity(0.5),
                        margin: const EdgeInsets.only(right: 10.0),
                      ),
                      Expanded(
                        child: FlatButton(
                          onPressed: () {
                            clearingDatePicker(context);
                          },
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: <Widget>[
                              Expanded(
                                child: Padding(
                                  padding: const EdgeInsets.symmetric(
                                      vertical: 16.0),
                                  child: Text(
                                    _clearingDate.toString(),
                                    style: TextStyle(
                                      color: Colors.black,
                                      fontSize: 18
                                    ),
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                      )
                    ],
                  ),
                ),
              ],
            ),

            /*********** Start Calculate Demurrage Button ***********/
            Container(
              margin: const EdgeInsets.only(top: 20.0),
              padding: const EdgeInsets.only(left: 20.0, right: 20.0),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: FlatButton(
                      splashColor: Color(0xff50C2C9),
                      color: Color(0xff50C2C9),
                      disabledColor: Color(0xff50C2C9),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30.0),
                      ),
                      onPressed: () {
                        setState(() {});
                        _calculateDemurrage();
                        if(listActivityLog[0] != null){
                          showDialog( //show data in pop up dialog box
                              context: context,
                              builder: (context) {
                                return Dialog(
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(20.0),
                                  ),
                                  child: Container(
                                    alignment: Alignment.center,
                                    height: 200,
                                    child: Padding(
                                      padding: EdgeInsets.all(12.0),
                                      child: Column(
                                        crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                        mainAxisAlignment:
                                        MainAxisAlignment.center,
                                        children: <Widget>[
                                          Text(
                                            '${listActivityLog[0]["message"]}',
                                            textAlign: TextAlign.center,
                                            style: TextStyle(
                                                color: Colors.black,
                                                fontSize: 25
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                  ),
                                );
                              }
                          );
                        }
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Expanded(
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 16.0),
                              child: Text(
                                "Calculate Demurrage",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Colors.white, fontSize: 20),
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                  )
                ],
              ),
            ),
            /*********** End Calculate Demurrage Button ***********/
          ],
        ),
      ),
    );
  }

  // Get a current date
  DateTime _createdDate = DateTime.now();
  DateTime _clearingDate = DateTime.now();

  // Date picker
  Future<String> createdDatePicker(BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: _createdDate,
        firstDate: DateTime(DateTime.now().year - 50),
        lastDate: DateTime(DateTime.now().year + 50));
    if (picked != null && picked != _createdDate) {
      setState(() {
        _createdDate = picked;
      });
    }
    return _createdDate.toString();
  }

  Future<String> clearingDatePicker(BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: _clearingDate,
        firstDate: DateTime(DateTime.now().year - 50),
        lastDate: DateTime(DateTime.now().year + 50));
    if (picked != null && picked != _clearingDate) {
      setState(() {
        _clearingDate = picked;
      });
    }
    return _clearingDate.toString();
  }
}
