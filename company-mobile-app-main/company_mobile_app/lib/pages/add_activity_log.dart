import 'dart:convert';

import 'package:company_mobile_app/pages/view_activity_logs.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ActivityLog extends StatefulWidget {
  @override
  _ActivityLogState createState() => _ActivityLogState();

  final String id;
  const ActivityLog({Key key, this.id}) : super(key: key);
}

class _ActivityLogState extends State<ActivityLog> {

  //declare variables
  TextEditingController _activityLogTypeController = TextEditingController();
  TextEditingController _createdDateController = TextEditingController();
  String _activityId, _activityLogs;
  var mapActivityLogType;
  List activityLogTypeList = List();

  // Get activity list for dropdown menu
  Future getActivityLogs() async {
    var res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllActivityLogTypes'));
    mapActivityLogType = json.decode(res.body);
    setState(() {
      activityLogTypeList = mapActivityLogType["ActivityLogTypes"];
    });
    print(res.request);
    return res.body;
  }

  @override
  void initState() {
    super.initState();
    _activityId = widget.id;
    getActivityLogs();
  }

  _saveActivityLogs(String activityLogsTypeId, createdDate) async {

    var data = { // assign data to json
      'activityId': _activityId,
      'createdDate': _dateTime.toString(),
      'activityLogsTypeId': _activityLogs,
      'status': 'CREATED',
      'createdUser':'1'
    };

    try {
      await Dio().post(
          'https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/SaveActivityLog',
          data: data);
      Navigator.push(context,
        MaterialPageRoute(builder: (context) => ViewActivityLogs()),
      );
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Successfully saved your activity log!')),
      );

      _activityLogTypeController.clear();
      _createdDateController.clear();

    } on DioError catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Network Error !')),
      );
      print(e.message);
    }

  }

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Scaffold(
        backgroundColor: Color(0xffE7EEEC),
        appBar: new AppBar(
          backgroundColor: Color(0xff50C2C9),
          title: Text("Add Activity Log"),
        ),
        body: ListView(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(top: 25.0, bottom: 35.0),
              child: Image(
                image: AssetImage('assets/yacht.png'),
                height: 175,
                width: 175,
              ),
            ),
            Text("Activity Log Creation",
                textAlign: TextAlign.center,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 40)),
            Container(
              margin: new EdgeInsets.fromLTRB(20, 10, 20, 20),
              child: Form(
                  child: Column(children: <Widget>[
                    Container(
                      margin: EdgeInsets.symmetric(vertical: 15, horizontal: 20),
                      padding: EdgeInsets.only(left: 10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        border: Border.all(
                            color: Colors.grey, // set border color
                            width: 3.0),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          Expanded(
                            child: DropdownButtonHideUnderline(
                              child: ButtonTheme(
                                alignedDropdown: true,
                                child: DropdownButton<String>(
                                  value: _activityLogs,
                                  iconSize: 30,
                                  style: TextStyle(
                                    color: Colors.black54,
                                    fontSize: 16,
                                  ),
                                  hint: Text('Activity Log Type'),
                                  onChanged: (String newValue) {
                                    setState(() {
                                      _activityLogs = newValue;
                                      getActivityLogs();
                                      print(_activityLogs);
                                    });
                                  },
                                  items: activityLogTypeList?.map((item) {
                                    return new DropdownMenuItem(
                                      child: new Text(item['name']),
                                      value: item['id'].toString(),
                                    );
                                  })?.toList() ?? [],
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),

                    Container(
                      margin: EdgeInsets.symmetric(vertical: 15, horizontal: 20),
                      padding: EdgeInsets.only(left: 10),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        border: Border.all(
                          color: Colors.grey, // set border color
                          width: 3.0,
                        ),
                      ),
                      child: Row(
                        children: <Widget>[
                          Expanded(
                            child: FlatButton(
                              onPressed: () {
                                dateTimePicker(context);
                              },
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: <Widget>[
                                  Expanded(
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(vertical: 16.0),
                                      child: Text(
                                        _dateTime.toString(),
                                        textAlign: TextAlign.left,
                                        style: TextStyle(
                                          color: Colors.black,
                                          //fontSize: 18
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

                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: <Widget>[
                        SizedBox(
                          width: 90,
                          height: 40,
                          child: ElevatedButton(
                            onPressed: () {
                              _saveActivityLogs(
                                _activityLogTypeController.text,
                                _createdDateController.text
                              );
                            },
                            style: ButtonStyle(
                                backgroundColor:
                                    MaterialStateProperty.all<Color>(
                              Colors.green,
                            )),
                            child: Text('SAVE'),
                          ),
                        ),
                        SizedBox(
                          width: 90,
                          height: 40,
                          child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(context,
                                MaterialPageRoute(builder: (context) => ViewActivityLogs()),
                              );
                            },
                            style: ButtonStyle(
                                backgroundColor:
                                    MaterialStateProperty.all<Color>(
                              Colors.red,
                            )),
                            child: Text('CANCEL'),
                          ),
                        ),
                      ],
                    )
                  ]
                )
              ),
            )
          ],
        )
    );
  }

  // Get a current date
  DateTime _dateTime = DateTime.now();

  // Date picker
  Future<Null> dateTimePicker(BuildContext context) async{
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: _dateTime,
        firstDate: DateTime(DateTime.now().year - 50),
        lastDate: DateTime(DateTime.now().year + 50)
    );
    if(picked != null && picked != _dateTime){
      setState(() {
        _dateTime = picked;
      });
    }
  }

}
