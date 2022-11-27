import 'dart:convert';

import 'package:company_mobile_app/pages/activity_management.dart';
import 'package:company_mobile_app/pages/view_charts.dart';
import 'package:company_mobile_app/pages/view_employee.dart';
import 'package:company_mobile_app/pages/warehouse_management.dart';
import 'package:flutter/material.dart';
import 'demurrage_calculation.dart';
import 'package:http/http.dart' as http;

class AdminConsole extends StatefulWidget {
  @override
  _AdminConsole createState() => _AdminConsole();

  final String userName;
  const AdminConsole({Key key, this.userName}) : super(key: key);
}

class _AdminConsole extends State<AdminConsole> {
  Map<String, dynamic> mapData;
  List<dynamic> listUsers;
  String _userName;
  String _userId;

  @override
  void initState() {
    super.initState();
    _userName = widget.userName;
    getUserDetails();
  }

  // get user details
  Future getUserDetails() async {
    http.Response res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetEmployeeByUserName/' + _userName));
    mapData = json.decode(res.body);
    setState(() {
      listUsers = mapData["Employees"];
    });
    _userId = Text("${listUsers[0]["id"]}").toString();
    print(_userId);
    print(res.statusCode);
    print(res.request);
    return res.body;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffE7EEEC),
      body: ListView(
        children: <Widget>[
          /*********** Logo ***********/
          Padding(
            padding: const EdgeInsets.only(top: 15.0, bottom: 35.0),
            child: Image.asset("assets/yacht.png"),
          ),

          /*********** Start User Management Button ***********/
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
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                ViewEmployee() // navigate to user management page
                        ),
                      );
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 16.0),
                            child: Text(
                              "User Management",
                              textAlign: TextAlign.center,
                              style:
                              TextStyle(color: Colors.white, fontSize: 20),
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
          /*********** End User Management Button ***********/

          /*********** Start Activity Management Button ***********/
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
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => ViewActivities(
                                userId:
                                _userId)), // navigate to activities page
                      );
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 16.0),
                            child: Text(
                              "Activity Management",
                              textAlign: TextAlign.center,
                              style:
                              TextStyle(color: Colors.white, fontSize: 20),
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
          /*********** End Activity Management Button ***********/

          /*********** Start Warehouse Management Button ***********/
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
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                WarehouseManagement() // navigate to fraud activity management page
                        ),
                      );
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 16.0),
                            child: Text(
                              "Warehouse Management",
                              textAlign: TextAlign.center,
                              style:
                              TextStyle(color: Colors.white, fontSize: 20),
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
          /*********** End Warehouse Management Button ***********/

          /*********** Start View Dashboard Button ***********/
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
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                ViewCharts() // navigate to dashboard page
                            ),
                      );
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 16.0),
                            child: Text(
                              "View Dashboard",
                              textAlign: TextAlign.center,
                              style:
                                  TextStyle(color: Colors.white, fontSize: 20),
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
          /*********** End View Dashboard Button ***********/

          /*********** Start Demurrage Calculator Button ***********/
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
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                DemurrageCalculation() // navigate to demurrage calculation page
                            ),
                      );
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Expanded(
                          child: Padding(
                            padding: const EdgeInsets.symmetric(vertical: 16.0),
                            child: Text(
                              "Calculate Demurrage",
                              textAlign: TextAlign.center,
                              style:
                                  TextStyle(color: Colors.white, fontSize: 20),
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
          /*********** End Demurrage Calculator Button ***********/

        ],
      ),
    );
  }
}
