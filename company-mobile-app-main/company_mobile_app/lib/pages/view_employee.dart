import 'dart:convert';

import 'package:company_mobile_app/pages/add_employee.dart';
import 'package:company_mobile_app/pages/update_employee.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ViewEmployee extends StatefulWidget {
  @override
  _ViewEmployeeState createState() {
    return _ViewEmployeeState();
  }
}

class _ViewEmployeeState extends State<ViewEmployee> {
  Map<String, dynamic> mapData;
  List<dynamic> listEmployees;

  //get all employees
  Future getEmployees() async {
    http.Response res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllEmployees'));
    mapData = json.decode(res.body);
    setState(() {
      listEmployees = mapData["Employees"];
    });
    print(res.statusCode);
    return res.body;
  }

  @override
  void initState() {
    super.initState();
    getEmployees();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffE7EEEC),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Color(0xff50C2C9),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => AddEmployeeForm()),
          );
        },
      ),
      appBar: new AppBar(
        title: Text("Employee List"),
        backgroundColor: Color(0xff50C2C9),
      ),
      body: ListView.builder(
          itemCount: listEmployees == null ? 0 : listEmployees.length,
          itemBuilder: (BuildContext context, int index) {
            return TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => UpdateEmployeeForm(
                          id: "${listEmployees[index]["id"]}")),
                );
              },
              child: Card(
                child: ListTile(
                  contentPadding: EdgeInsets.all(20.0),
                  title: Column(
                    children: <Widget>[
                      Text(
                        "Employee ID : ${listEmployees[index]["empId"]}",
                        style: TextStyle(fontSize: 20.0),
                      ),
                      Text(
                        "Employee Name : ${listEmployees[index]["name"]}",
                        style: TextStyle(fontSize: 20.0),
                      ),
                    ],
                  ),
                ),
              ),
            );
          }),
    );
  }
}
