import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'view_employee.dart';

class UpdateEmployeeForm extends StatefulWidget {
  final String id;

  const UpdateEmployeeForm({Key key, this.id}) : super(key: key);

  @override
  _UpdateEmployeeFormState createState() => _UpdateEmployeeFormState(this.id);
}

class _UpdateEmployeeFormState extends State<UpdateEmployeeForm> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController empIDController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController usernameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController ageController = TextEditingController();
  TextEditingController contactController = TextEditingController();
  TextEditingController addressController = TextEditingController();
  TextEditingController positionController = TextEditingController();

  int index;
  String _id;

  Map<String, dynamic> mapData;
  List<dynamic> listEmployees;

  var department;
  List departmentList = List();
  String _newValDepartment;

  // Get department list for dropdown menu
  Future getDepartments() async {
    var res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllDepartments'));
    department = json.decode(res.body);
    setState(() {
      departmentList = department["Departments"];
    });
    print(res.request);
    return res.body;
  }

  @override
  void initState() {
    super.initState();
    getDepartments();
  }

  _UpdateEmployeeFormState(String id) {
    _id = id;
    getEmployee().then((value) {
      String age = "${listEmployees[0]["age"]}".toString();
      String userRoleId = "${listEmployees[0]["userRoleId"]}".toString();
      empIDController.text = listEmployees[0]["empId"];
      usernameController.text = listEmployees[0]["userName"];
      emailController.text = listEmployees[0]["email"];
      nameController.text = listEmployees[0]["name"];
      ageController.text = age; //listEmployees[0]["age"];
      contactController.text = listEmployees[0]["contactNo"];
      addressController.text = listEmployees[0]["address"];
      positionController.text = userRoleId;
      //_newValDepartment = "${listEmployees[0]["departmentName"]}";
    });
  }

  //validate text fields
  validateData() {
    if (_formKey.currentState.validate()) {
        updateUser();
      return;

    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Invalid Data!')),
      );
    }
  }

  //update user
  updateUser() async {
    var data = {
      'empId': empIDController.text,
      'name': nameController.text,
      'age': ageController.text,
      'contactNo': contactController.text,
      'address': addressController.text,
      'userRoleId': positionController.text,
      'userName': usernameController.text,
      'email': emailController.text,
      'modifiedUser': "1",
      "departmentId": "1"
    };

    try {
      Response response = await Dio().put(
          'https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/UpdateEmployee/' +
              _id,
          data: data);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('User updated successfully!')),
      );

      if (response.statusCode == 200) {
        print("Success");
      }
      print(response.realUri);
      print(response.statusCode);
    } on DioError catch (e) {
      print(e.message);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed!')),
      );
    }
  }

  // Future updateEmployee() async {
  //   http.Response res = await http.put(Uri.https(
  //       'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
  //       '/Prod/UpdateEmployee/' + _id,
  //       data));
  //   print(res.statusCode);
  //   return res.body;
  // }

  //get employee by id
  Future getEmployee() async {
    http.Response res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetEmployeeById/' + _id));
    mapData = json.decode(res.body);
    setState(() {
      listEmployees = mapData["Employees"];
    });
    return res.body;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Color(0xffE7EEEC),
        appBar: new AppBar(
          backgroundColor: Color(0xff50C2C9),
          title: Text("Update Employee"),
        ),
        body: ListView.builder(
          itemCount: listEmployees == null ? 0 : listEmployees.length,
          itemBuilder: (BuildContext context, int index) {
            return Column(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.only(top: 10.0),
                  child: Image(
                    image: AssetImage('assets/yacht.png'),
                    height: 250,
                    width: 250,
                  ),
                ),
                Text("Update Details",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        fontWeight: FontWeight.bold, fontSize: 40
                    )
                ),
                Container(
                  margin: new EdgeInsets.fromLTRB(20, 10, 20, 20),
                  child: Form(
                      key: _formKey,
                      child: Column(children: <Widget>[
                        Container(
                          margin: EdgeInsets.symmetric(
                              vertical: 15, horizontal: 20),
                          padding: EdgeInsets.only(left: 10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                              color: Colors.grey, // set border color
                              width: 3.0,
                            ),
                          ),
                          child: TextFormField(
                            // The validator receives the text that the user has entered.
                            controller: empIDController,
                            keyboardType: TextInputType.text,
                            enabled: false,
                            decoration: InputDecoration(
                                hintText: 'Employee ID',
                                fillColor: Colors.grey,
                                focusColor: Colors.red,
                                border: InputBorder.none),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(
                              vertical: 15, horizontal: 20),
                          padding: EdgeInsets.only(left: 10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                              color: Colors.grey, // set border color
                              width: 3.0,
                            ),
                          ),
                          child: TextFormField(
                            // The validator receives the text that the user has entered.
                            controller: usernameController,
                            keyboardType: TextInputType.text,
                            enabled: false,
                            decoration: InputDecoration(
                                hintText: 'Username',
                                fillColor: Colors.grey,
                                focusColor: Colors.red,
                                border: InputBorder.none),
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(
                              vertical: 15, horizontal: 20),
                          padding: EdgeInsets.only(left: 10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                              color: Colors.grey, // set border color
                              width: 3.0,
                            ),
                          ),
                          child: TextFormField(
                            // The validator receives the text that the user has entered.
                            controller: nameController,
                            keyboardType: TextInputType.text,
                            decoration: InputDecoration(
                                hintText: 'Name',
                                fillColor: Colors.grey,
                                focusColor: Colors.red,
                                border: InputBorder.none),
                            validator: (String value) {
                              if (value.isEmpty) {
                                return 'Please enter name!';
                              }
                              return null;
                            },
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(
                              vertical: 15, horizontal: 20),
                          padding: EdgeInsets.only(left: 10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                              color: Colors.grey, // set border color
                              width: 3.0,
                            ),
                          ),
                          child: TextFormField(
                            // The validator receives the text that the user has entered.
                            controller: emailController,
                            keyboardType: TextInputType.text,
                            decoration: InputDecoration(
                                hintText: 'Email',
                                fillColor: Colors.grey,
                                focusColor: Colors.red,
                                border: InputBorder.none),
                            validator: (String value) {
                              if (value.isEmpty) {
                                return 'Please enter email!';
                              }
                              if (!RegExp(
                                      "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]")
                                  .hasMatch(value)) {
                                return 'Please enter a valid email';
                              }
                              return null;
                            },
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(
                              vertical: 15, horizontal: 20),
                          padding: EdgeInsets.only(left: 10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                                color: Colors.grey, // set border color
                                width: 3.0),
                          ),
                          child: TextFormField(
                            controller: ageController,
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                                hintText: 'Age',
                                fillColor: Colors.grey,
                                focusColor: Colors.grey,
                                border: InputBorder.none),
                            // The validator receives the text that the user has entered.
                            validator: (String value) {
                              if (value.isEmpty) {
                                return 'Please enter age!';
                              }
                              return null;
                            },
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(
                              vertical: 15, horizontal: 20),
                          padding: EdgeInsets.only(left: 10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                                color: Colors.grey, // set border color
                                width: 3.0),
                          ),
                          child: TextFormField(
                            controller: contactController,
                            keyboardType: TextInputType.number,
                            decoration: InputDecoration(
                                hintText: 'Contact Number',
                                fillColor: Colors.grey,
                                focusColor: Colors.grey,
                                border: InputBorder.none),
                            // The validator receives the text that the user has entered.
                            validator: (String value) {
                              if (value.isEmpty) {
                                return 'Please enter contact no!';
                              }
                              return null;
                            },
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(
                              vertical: 15, horizontal: 20),
                          padding: EdgeInsets.only(left: 10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                                color: Colors.grey, // set border color
                                width: 3.0),
                          ),
                          child: TextFormField(
                            // The validator receives the text that the user has entered.
                            controller: addressController,
                            keyboardType: TextInputType.text,
                            decoration: InputDecoration(
                                hintText: 'Address',
                                fillColor: Colors.grey,
                                focusColor: Colors.grey,
                                border: InputBorder.none),
                            validator: (String value) {
                              if (value.isEmpty) {
                                return 'Please enter address!';
                              }
                              return null;
                            },
                          ),
                        ),
                        Container(
                          margin: EdgeInsets.symmetric(
                              vertical: 15, horizontal: 20),
                          padding: EdgeInsets.only(left: 10),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            border: Border.all(
                              color: Colors.grey, // set border color
                              width: 3.0,
                            ),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              Expanded(
                                child: DropdownButtonHideUnderline(
                                  child: ButtonTheme(
                                    alignedDropdown: true,
                                    child: DropdownButton<String>(
                                      value: _newValDepartment,
                                      iconSize: 30,
                                      style: TextStyle(
                                        color: Colors.black54,
                                        fontSize: 16,
                                      ),
                                      hint: Text('Department'),
                                      onChanged: (String newValue) {
                                        setState(() {
                                          _newValDepartment = newValue;
                                          getDepartments();
                                          print(_newValDepartment);
                                        });
                                      },
                                      items: departmentList?.map((item) {
                                            return new DropdownMenuItem(
                                              child: new Text(
                                                  item['departmentName']),
                                              value: item['id'].toString(),
                                            );
                                          })?.toList() ??
                                          [],
                                    ),
                                  ),
                                ),
                              ),
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
                                  // Validate returns true if the form is valid, otherwise false.
                                  validateData();
                                },
                                style: ButtonStyle(
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                  Colors.green,
                                )),
                                child: Text('UPDATE'),
                              ),
                            ),
                            SizedBox(
                              width: 90,
                              height: 40,
                              child: ElevatedButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(builder: (context) => ViewEmployee()),
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
                      ])),
                )
              ],
            );
          },
        ));
  }
}
