import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ThirdPartyActivities extends StatefulWidget {
  @override
  _ThirdPartyActivitiesState createState() => _ThirdPartyActivitiesState();

  final String userName;
  const ThirdPartyActivities({Key key, this.userName}) : super(key: key);

}

class _ThirdPartyActivitiesState extends State<ThirdPartyActivities> {

  Map<String, dynamic> mapUsers;
  Map<String, dynamic> mapActivities;
  List<dynamic> listUsers;
  List<dynamic> listActivities;
  String _userName;
  String _userId;
  String _thirdPartyId;

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
    mapUsers = json.decode(res.body);
    setState(() {
      listUsers = mapUsers["Employees"];
    });
    _userId = Text("${listUsers[0]["id"]}").toString();
    _thirdPartyId = "${listUsers[0]["thirdPartyId"]}";
    print(_userId);
    print(_thirdPartyId);
    print(res.request);
    getActivities();
    return res.body;
  }

  // get activities for third party companies
  Future getActivities() async {
    http.Response responsesss = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetActivitiesByThirdPartyId/' + _thirdPartyId));
    mapActivities = json.decode(responsesss.body);
    setState(() {
      listActivities = mapActivities["Activities"];
    });
    print(responsesss.request);
    return responsesss.body;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffE7EEEC),
      appBar: new AppBar(
        title: Text("All Activities"),
        backgroundColor: Color(0xff50C2C9),
      ),
      body: ListView.builder(
          itemCount: listActivities == null ? 0 : listActivities.length,
          itemBuilder: (BuildContext context, int index) {
            return ListTile(
              contentPadding: EdgeInsets.all(20.0),
              title: Column(
                children: <Widget>[
                  Text(
                    "Purpose : ${listActivities[index]["purpose"]}",
                    style: TextStyle(fontSize: 20.0),
                  ),
                  Text(
                    "Status : ${listActivities[index]["status"]}",
                    style: TextStyle(fontSize: 18.0),
                  ),
                  Text(
                    "Container Given ID : ${listActivities[index]["containerGivenID"]}",
                    style: TextStyle(fontSize: 18.0),
                  ),
                  Text(
                    "Container Given ID : ${listActivities[index]["expectedClearingDate"]}",
                    style: TextStyle(fontSize: 18.0),
                  ),
                ],
              ),
            );
          }
      ),
    );
  }
}
