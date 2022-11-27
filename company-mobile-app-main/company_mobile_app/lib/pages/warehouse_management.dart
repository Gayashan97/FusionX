import 'dart:convert';

import 'package:company_mobile_app/pages/add_warehouse_item.dart';
import 'package:company_mobile_app/pages/display_warehouse_item.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class WarehouseManagement extends StatefulWidget {
  @override
  _WarehouseManagementState createState() => _WarehouseManagementState();
}

class _WarehouseManagementState extends State<WarehouseManagement> {
  Map<String, dynamic> mapData;
  List<dynamic> warehouseItemCategoryList;

  //get warehouse item categories
  Future getWarehouseItemCategories() async {
    var res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetAllWareHouseCategories'));
    var warehouseItemCategory = json.decode(res.body);
    setState(() {
      warehouseItemCategoryList = warehouseItemCategory["WareHouseCategories"];
    });
    print(res.request);
    return res.body;
  }

  @override
  void initState() {
    super.initState();
    getWarehouseItemCategories();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffE7EEEC),
      appBar: new AppBar(
        title: Text("Warehouse Item Category List"),
        backgroundColor: Color(0xff50C2C9),
      ),
      body: ListView.builder(
          itemCount: warehouseItemCategoryList == null
              ? 0
              : warehouseItemCategoryList.length,
          itemBuilder: (BuildContext context, int index) {
            return TextButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => DisplayWarehouseItem(
                          id: "${warehouseItemCategoryList[index]["id"]}")),
                );
              },
              child: Card(
                child: ListTile(
                  contentPadding: EdgeInsets.all(20.0),
                  title: Center(
                      child: Text(
                          "${warehouseItemCategoryList[index]["itemName"]}")),
                  trailing: Icon(Icons.category),
                ),
              ),
            );
          }),
    );
  }
}
