import 'package:flutter/material.dart';
import 'dart:convert';

import 'package:http/http.dart' as http;

import 'add_activity_log.dart';

class ViewActivityLogs extends StatefulWidget {
  @override
  _ViewActivityLogsState createState() => _ViewActivityLogsState();

  final String id;
  const ViewActivityLogs({Key key, this.id}) : super(key: key);
}

class _ViewActivityLogsState extends State<ViewActivityLogs> {
  Map<String, dynamic> mapDataLog;
  List<dynamic> listActivityLog;
  String _activityId;

  @override
  void initState() {
    super.initState();
    _activityId = widget.id;
    getActivityLogs();
  }

  Future getActivityLogs() async {
    http.Response res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetActivityLogsByActivityId/' + _activityId));
    mapDataLog = json.decode(res.body);
    setState(() {
      listActivityLog = mapDataLog["ActivityLogs"];
    });
    print(_activityId);
    print(res.statusCode);
    print(res.request);
    return res.body;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xffE7EEEC),
        appBar: new AppBar(
          title: Text("Activity Logs"),
          backgroundColor: Color(0xff50C2C9),
        ),
        floatingActionButton: FloatingActionButton(
          child: Icon(Icons.add),
          backgroundColor: Color(0xff50C2C9),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => ActivityLog(id: _activityId)),
            );
          },
        ),
        body: ListView.builder(
            itemCount: listActivityLog == null ? 0 : listActivityLog.length,
            itemBuilder: (BuildContext context, int index) {
              return Card(
                child: ListTile(
                  contentPadding: EdgeInsets.all(20.0),
                  title: Column(
                    children: <Widget>[
                      Text(
                        "Activity Log Type Name : ${listActivityLog[index]["activityLogsTypeName"]}",
                        style: TextStyle(fontSize: 18.0),
                      ),
                      Text(
                        "Created Date : ${listActivityLog[index]["createdDate"]}",
                        style: TextStyle(fontSize: 16.0),
                      ),
                    ],
                  ),
                ),
              );
            }));
  }
}
