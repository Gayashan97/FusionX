import 'dart:convert';

import 'package:company_mobile_app/pages/display_warehouse_item.dart';
import 'package:dio/dio.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class AddWarehouseItem extends StatefulWidget {
  @override
  _AddWarehouseItemState createState() => _AddWarehouseItemState();
}

class _AddWarehouseItemState extends State<AddWarehouseItem> {
  final _formKey = GlobalKey<FormState>();
  TextEditingController itemNameController = TextEditingController();
  TextEditingController quantityController = TextEditingController();
  TextEditingController categoryController = TextEditingController();

  var warehouseItemCategory;
  List warehouseItemCategoryList = List();
  String _newValWarehouseItemCategory;

  var warehouseName;
  List warehouseList = List();
  String _newValWarehouse;

  // Get warehouse name list for dropdown menu
  Future getWarehouseNames() async {
    var res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllWareHouses'));
    warehouseName = json.decode(res.body);
    setState(() {
      warehouseList = warehouseName["WareHouses"];
    });
    print(res.request);
    return res.body;
  }

  // Get warehouse item category list for dropdown menu
  Future getWarehouseItemCategories() async {
    var res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllWareHouseCategories'));
    warehouseItemCategory = json.decode(res.body);
    setState(() {
      warehouseItemCategoryList = warehouseItemCategory["WareHouseCategories"];
    });
    print(res.request);
    return res.body;
  }

  //validate text fields
  validateData() {
    if (_formKey.currentState.validate()) {
      createItem();

      return;
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Invalid Data!')),
      );
    }
  }

  //insert warehouse data
  createItem() async {
    var data = {
      "quantity": quantityController.text,
      "wareHouseCategoryID": _newValWarehouseItemCategory,
      "wareHouseId": _newValWarehouse,
      "createdUser": "1",
      "itemName": itemNameController.text
    };

    try {
      await Dio().post(
          'https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/SaveWareHouseItems',
          data: data);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Item added successfully!')),
      );
    } on DioError catch (e) {
      print(e);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed!')),
      );
    }
  }

  @override
  void initState() {
    super.initState();
    getWarehouseItemCategories();
    getWarehouseNames();
  }

  @override
  Widget build(BuildContext context) {
    // Build a Form widget using the _formKey created above.
    return Scaffold(
        backgroundColor: Color(0xffE7EEEC),
        appBar: new AppBar(
          backgroundColor: Color(0xff50C2C9),
          title: Text("Add Warehouse Item"),
        ),
        body: ListView(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(top: 60.0),
              child: Image(
                image: AssetImage('assets/yacht.png'),
                height: 125,
                width: 125,
              ),
            ),
            Text("Add Warehouse Item",
                textAlign: TextAlign.center,
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 25)),
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
                        controller: itemNameController,
                        keyboardType: TextInputType.text,
                        decoration: InputDecoration(
                            hintText: 'Item Name',
                            fillColor: Colors.grey,
                            focusColor: Colors.red,
                            border: InputBorder.none),
                        validator: (String value) {
                          if (value.isEmpty) {
                            return 'Please enter item name!';
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
                        controller: quantityController,
                        keyboardType: TextInputType.number,
                        decoration: InputDecoration(
                            hintText: 'Quantity',
                            fillColor: Colors.grey,
                            focusColor: Colors.red,
                            border: InputBorder.none),
                        validator: (String value) {
                          if (value.isEmpty) {
                            return 'Please enter quantity!';
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
                                  value: _newValWarehouseItemCategory,
                                  iconSize: 30,
                                  style: TextStyle(
                                    color: Colors.black54,
                                    fontSize: 16,
                                  ),
                                  hint: Text('Warehouse Item Category'),
                                  onChanged: (String newValue) {
                                    setState(() {
                                      _newValWarehouseItemCategory = newValue;
                                      getWarehouseItemCategories();
                                    });
                                  },
                                  items: warehouseItemCategoryList?.map((item) {
                                        return new DropdownMenuItem(
                                          child: new Text(item['itemName']),
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
                                  value: _newValWarehouse,
                                  iconSize: 30,
                                  style: TextStyle(
                                    color: Colors.black54,
                                    fontSize: 16,
                                  ),
                                  hint: Text('Warehouse Name'),
                                  onChanged: (String newValue) {
                                    setState(() {
                                      _newValWarehouse = newValue;
                                      getWarehouseNames();
                                    });
                                  },
                                  items: warehouseList?.map((item) {
                                        return new DropdownMenuItem(
                                          child:
                                              new Text(item['wareHouseName']),
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
                                MaterialPageRoute(builder: (context) => DisplayWarehouseItem()),
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
