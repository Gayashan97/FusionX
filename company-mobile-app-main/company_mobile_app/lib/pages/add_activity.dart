import 'dart:convert';

import 'package:company_mobile_app/pages/activity_management.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AddActivity extends StatefulWidget {
  @override
  _AddActivityState createState() => _AddActivityState();

  final String userId;
  const AddActivity({Key key, this.userId}) : super(key: key);
}

class _AddActivityState extends State<AddActivity> {

  //declare variables
  TextEditingController _purposeController = TextEditingController();
  TextEditingController _expectedClearingDateController = TextEditingController();
  TextEditingController _thirdPartyIdController = TextEditingController();
  TextEditingController _containerIdController = TextEditingController();
  TextEditingController _shippingLineIdController = TextEditingController();
  var mapThirdParty, mapShippingLine;
  List thirdPartyList = List();
  List shippingLine = List();
  String _userId, _newValThridParty, _newValShippingLine;

  @override
  void initState() {
    super.initState();
    getThirdPartyCompanies();
    getshippingLine();
    _userId = widget.userId;
    print(_userId);
  }

  // Get third party company list for dropdown menu
  Future getThirdPartyCompanies() async {
    var res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllThirdParties'));
    mapThirdParty = json.decode(res.body);
    setState(() {
      thirdPartyList = mapThirdParty["ThirdPartyCompanies"];
    });
    print(res.request);
    return res.body;
  }

  // Get Shipping Line list for dropdown menu
  Future getshippingLine() async {
    var res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllShippingLines'));
    mapShippingLine = json.decode(res.body);
    setState(() {
      shippingLine = mapShippingLine["ShippingLines"];
    });
    print(res.request);
    return res.body;
  }

  _saveActivities(String purpose, containerId, shippingLineId) async {

    if (_purposeController.text.trim() == "" ||
        _containerIdController.text.trim() == "") {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Fields can not be blank !')),
      );
    } else {
      var data = { // assign data to json
        'purpose': purpose,
        'expectedClearingDate': _dateTime.toString(),
        'status': 'CREATED',
        'thirdPartyId': _newValThridParty,
        'containerGivenID': containerId,
        'shippingLineId': _newValShippingLine,
        'createdUser': '1'
      };

      try {
        await Dio().post(
            'https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/SaveActivity',
            data: data);
        Navigator.push(context,
          MaterialPageRoute(builder: (context) => ViewActivities()),
        );
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Successfully saved your activity!')),
        );

        _purposeController.clear();
        _expectedClearingDateController.clear();
        _thirdPartyIdController.clear();
        _containerIdController.clear();
        _shippingLineIdController.clear();

      } on DioError catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Network Error !')),
        );
        print(e);
      }
    }

  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffE7EEEC),
      appBar: new AppBar(
        backgroundColor: Color(0xff50C2C9),
        title: Text("Add Activity"),
      ),
      body: ListView(
        children: <Widget>[
          /*********** Logo ***********/
          Padding(
            padding: const EdgeInsets.only(top: 15.0, bottom: 10.0),
            child: Image(
              image: AssetImage('assets/yacht.png'),
              height: 175,
              width: 175,
            )
          ),
          Text("Activity Details",
              textAlign: TextAlign.center,
              style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 40
              )
          ),
          Container(
            margin: new EdgeInsets.fromLTRB(20, 10, 20, 20),
            child: Form(
                child: Column(children: <Widget>[

                  /*********** Start Purpose Text Box ***********/
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
                    child: TextFormField(
                      controller: _purposeController,
                      keyboardType: TextInputType.text,
                      decoration: InputDecoration(
                          hintText: 'Purpose',
                          hintStyle: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                          ),
                          fillColor: Colors.grey,
                          focusColor: Colors.red,
                          border: InputBorder.none
                      ),
                    ),
                  ),
                  /*********** End Purpose Text Box ***********/

                  /*********** Start Expected Clearing Date Text Box ***********/
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
                  /*********** End Expected Clearing Date Text Box ***********/

                  /*********** Start Third Party Company Text Box ***********/
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
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Expanded(
                          child: DropdownButtonHideUnderline(
                            child: ButtonTheme(
                              alignedDropdown: true,
                              child: DropdownButton<String>(
                                value: _newValThridParty,
                                iconSize: 30,
                                style: TextStyle(
                                  color: Colors.black54,
                                  fontSize: 16,
                                ),
                                hint: Text('Third Party Company'),
                                onChanged: (String newValue) {
                                  setState(() {
                                    _newValThridParty = newValue;
                                    getThirdPartyCompanies();
                                    print(_newValThridParty);
                                  });
                                },
                                items: thirdPartyList?.map((item) {
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
                  /*********** End Third Party Company Text Box ***********/

                  /*********** Start Container Given ID Text Box ***********/
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
                    child: TextFormField(
                      controller: _containerIdController,
                      keyboardType: TextInputType.text,
                      decoration: InputDecoration(
                          hintText: 'Container Given ID',
                          hintStyle: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                          ),
                          fillColor: Colors.grey,
                          focusColor: Colors.red,
                          border: InputBorder.none),
                    ),
                  ),
                  /*********** End Container Given ID Text Box ***********/

                  /*********** Start Shipping Line Text Box ***********/
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
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Expanded(
                          child: DropdownButtonHideUnderline(
                            child: ButtonTheme(
                              alignedDropdown: true,
                              child: DropdownButton<String>(
                                value: _newValShippingLine,
                                iconSize: 30,
                                style: TextStyle(
                                  color: Colors.black54,
                                  fontSize: 16,
                                ),
                                hint: Text('Shipping Line'),
                                onChanged: (String newValue) {
                                  setState(() {
                                    _newValShippingLine = newValue;
                                    getshippingLine();
                                    print(_newValShippingLine);
                                  });
                                },
                                items: shippingLine?.map((item) {
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
                  /*********** End Shipping Line Text Box ***********/

                  /*********** Start Save Button ***********/
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: <Widget>[
                      SizedBox(
                        width: 90,
                        height: 40,
                        child: ElevatedButton(
                          onPressed: () {
                            _saveActivities(
                                _purposeController.text,
                                _containerIdController.text,
                                _shippingLineIdController.text);
                          },
                          style: ButtonStyle(
                              backgroundColor:
                              MaterialStateProperty.all<Color>(
                                Colors.green,
                              )),
                          child: Text('SAVE'),
                        ),
                      ),
                      /*********** End Save Button ***********/

                      /*********** Start Cancel Button ***********/
                      SizedBox(
                        width: 90,
                        height: 40,
                        child: ElevatedButton(
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => ViewActivities()),
                            );
                          },
                          style: ButtonStyle(
                              backgroundColor:
                              MaterialStateProperty.all<Color>(
                                Colors.red,
                              )
                          ),
                          child: Text('CANCEL'),
                        ),
                      ),
                      /*********** End Cancel Button ***********/

                    ],
                  )
                ]
              )
            ),
          )
        ],
      ),
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
