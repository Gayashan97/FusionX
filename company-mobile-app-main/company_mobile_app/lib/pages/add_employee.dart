import 'dart:convert';

import 'package:company_mobile_app/pages/view_employee.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'admin_console.dart';

class AddEmployeeForm extends StatefulWidget {
  @override
  AddEmployeeFormState createState() {
    return AddEmployeeFormState();
  }
}

class AddEmployeeFormState extends State<AddEmployeeForm> {

  //declare variables
  final _formKey = GlobalKey<FormState>();
  TextEditingController empIDController = TextEditingController();
  TextEditingController nameController = TextEditingController();
  TextEditingController usernameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController ageController = TextEditingController();
  TextEditingController contactController = TextEditingController();
  TextEditingController addressController = TextEditingController();
  TextEditingController positionController = TextEditingController();

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

  //validate text fields
  validateData() {
    if (_formKey.currentState.validate()) {
      createUser();

      return;
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Invalid Data!')),
      );
    }
  }

  //insert user data
  createUser() async {
    var data = {
      'empId': empIDController.text,
      'name': nameController.text,
      'age': addressController.text,
      'contactNo': contactController.text,
      'address': addressController.text,
      'userRoleId': _newValDepartment,
      'userName': usernameController.text,
      'email': emailController.text,
      'createdUser': '1',
      'departmentId': '1'
    };

    try {
      await Dio().post(
          'https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/SaveEmployee',
          data: data);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('User added successfully!')),
      );
    } on DioError catch (e) {
      print(e);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed!')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Scaffold(
        backgroundColor: Color(0xffE7EEEC),
        appBar: new AppBar(
          backgroundColor: Color(0xff50C2C9),
          title: Text("Add Employee"),
        ),
        body: ListView(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(top: 10.0),
              child: Image(
                image: AssetImage('assets/yacht.png'),
                height: 175,
                width: 175,
              ),
            ),
            Text("Enter Details",
                textAlign: TextAlign.center,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 40)),
            Container(
              margin: new EdgeInsets.fromLTRB(20, 10, 20, 20),
              child: Form(
                  key: _formKey,
                  child: Column(children: <Widget>[
                    Container(
                      margin:
                          EdgeInsets.symmetric(vertical: 15, horizontal: 20),
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
                        decoration: InputDecoration(
                            hintText: 'Employee ID',
                            fillColor: Colors.grey,
                            focusColor: Colors.red,
                            border: InputBorder.none),
                        validator: (String value) {
                          if (value.isEmpty) {
                            return 'Please enter employee ID!';
                          }
                          return null;
                        },
                      ),
                    ),
                    Container(
                      margin:
                          EdgeInsets.symmetric(vertical: 15, horizontal: 20),
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
                      margin:
                          EdgeInsets.symmetric(vertical: 15, horizontal: 20),
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
                        decoration: InputDecoration(
                            hintText: 'Username',
                            fillColor: Colors.grey,
                            focusColor: Colors.red,
                            border: InputBorder.none),
                        validator: (String value) {
                          if (value.isEmpty) {
                            return 'Please enter username!';
                          }
                          return null;
                        },
                      ),
                    ),
                    Container(
                      margin:
                          EdgeInsets.symmetric(vertical: 15, horizontal: 20),
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
                          if (!RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]")
                              .hasMatch(value)) {
                            return 'Please enter a valid email';
                          }
                          return null;
                        },
                      ),
                    ),
                    Container(
                      margin:
                          EdgeInsets.symmetric(vertical: 15, horizontal: 20),
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
                      margin:
                          EdgeInsets.symmetric(vertical: 15, horizontal: 20),
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
                      margin:
                          EdgeInsets.symmetric(vertical: 15, horizontal: 20),
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
                      margin:
                          EdgeInsets.symmetric(vertical: 15, horizontal: 20),
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
                                          child:
                                              new Text(item['departmentName']),
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
                    // Container(
                    //   margin: EdgeInsets.fromLTRB(20, 10, 20, 50),
                    //   padding: EdgeInsets.only(left: 10),
                    //   decoration: BoxDecoration(
                    //     color: Colors.white,
                    //     border: Border.all(
                    //         color: Colors.grey, // set border color
                    //         width: 3.0),
                    //   ),
                    //   child: TextFormField(
                    //     // The validator receives the text that the user has entered.
                    //     controller: positionController,
                    //     keyboardType: TextInputType.number,
                    //     decoration: InputDecoration(
                    //         hintText: 'User Role',
                    //         fillColor: Colors.grey,
                    //         focusColor: Colors.grey,
                    //         border: InputBorder.none),
                    //     validator: (String value) {
                    //       if (value.isEmpty) {
                    //         return 'Please enter user role!';
                    //       }
                    //       return null;
                    //     },
                    //   ),
                    // ),

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
                              createUser();
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
        ));
  }
}
