import 'dart:convert';
import 'package:company_mobile_app/pages/add_activity.dart';

import 'view_activity_logs.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ViewActivities extends StatefulWidget {
  @override
  _ViewActivitiesState createState() => _ViewActivitiesState();

  final String userId;
  const ViewActivities({Key key, this.userId}) : super(key: key);
}

class _ViewActivitiesState extends State<ViewActivities> {

  Map<String, dynamic> mapData;
  List<dynamic> listActivities;
  String _userId;

  @override
  void initState() {
    super.initState();
    getActivities();
    _userId = widget.userId;
  }

  // Added by Osura - Get activity list
  Future getActivities() async {
    http.Response res = await http.get(Uri.https( //get data from API
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllActivities'));
    mapData = json.decode(res.body);
    setState(() {
      listActivities = mapData["Activities"];
    });
    print(_userId);
    print(res.statusCode);
    return res.body;
  }

  @override // Added by Osura
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        title: Text("All Activities"),
        backgroundColor: Color(0xff50C2C9),
      ),
      backgroundColor: Color(0xffE7EEEC),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Color(0xff50C2C9),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) => AddActivity(userId: _userId)
            ),
          );
        },
      ),
      body: ListView.builder(
          itemCount: listActivities == null ? 0 : listActivities.length,
          itemBuilder: (BuildContext context, int index) {
            return Card(
              child: ListTile(
                contentPadding: EdgeInsets.all(20.0),
                title: Column(
                  children: <Widget>[
                    Text(
                      "Purpose : ${listActivities[index]["purpose"]}",
                      style: TextStyle(fontSize: 18.0),
                    ),
                    Text(
                      "Status : ${listActivities[index]["status"]}",
                      style: TextStyle(fontSize: 16.0),
                    ),
                    Text(
                      "Container Given ID : ${listActivities[index]["containerGivenID"]}",
                      style: TextStyle(fontSize: 16.0),
                    ),
                    Text(
                      "Container Given ID : ${listActivities[index]["expectedClearingDate"]}",
                      style: TextStyle(fontSize: 16.0),
                    ),
                  ],
                ),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => ViewActivityLogs(
                            id: "${listActivities[index]["id"]}" //send activity id to next page
                        )
                    ),
                  );
                },
              ),
            );
          }),
    );
  }
}
