import 'dart:convert';

import 'package:company_mobile_app/pages/add_warehouse_item.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class DisplayWarehouseItem extends StatefulWidget {
  final String id;

  const DisplayWarehouseItem({Key key, this.id}) : super(key: key);

  @override
  _DisplayWarehouseItemState createState() =>
      _DisplayWarehouseItemState(this.id);
}

class _DisplayWarehouseItemState extends State<DisplayWarehouseItem> {
  Map<String, dynamic> mapData;
  List<dynamic> warehouseItemList;

  int index;
  String _id;

  _DisplayWarehouseItemState(String id) {
    _id = id;
  }

  //get warehouse items by item category ID
  Future getWarehouseItemByCategoryId() async {
    var res = await http.get(Uri.https(
        'ky107h7r00.execute-api.ap-southeast-1.amazonaws.com',
        '/Prod/GetWareHouseItemsByCategoryId/' + _id));
    var warehouseItem = json.decode(res.body);
    setState(() {
      warehouseItemList = warehouseItem["WareHouseItems"];
    });
    print(res.request);
    return res.body;
  }

  @override
  void initState() {
    super.initState();
    getWarehouseItemByCategoryId();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffE7EEEC),
      appBar: new AppBar(
        title: Text("Warehouse Item List"),
        backgroundColor: Color(0xff50C2C9),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Color(0xff50C2C9),
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => AddWarehouseItem()),
          );
        },
      ),
      body: ListView.builder(
          itemCount: warehouseItemList == null ? 0 : warehouseItemList.length,
          itemBuilder: (BuildContext context, int index) {
            return TextButton(
              child: Card(
                child: ListTile(
                  contentPadding: EdgeInsets.all(20.0),
                  title: Column(
                    children: <Widget>[
                      Text(
                        "Warehouse Item : ${warehouseItemList[index]["itemName"]}",
                        style: TextStyle(fontSize: 20.0),
                      ),
                      Text(
                        "Quantity : ${warehouseItemList[index]["quantity"]}",
                        style: TextStyle(fontSize: 20.0),
                      ),
                      Text(
                        "Warehouse Name : Head Office",
                        style: TextStyle(fontSize: 20.0),
                      )
                    ],
                  ),
                ),
              ),
            );
          }),
    );
  }
}
