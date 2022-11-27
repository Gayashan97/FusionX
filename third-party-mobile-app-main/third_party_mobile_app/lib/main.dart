import 'package:flutter/material.dart';

import 'pages/login.dart';

/**
 * Main Class
 *
 ********************************************************************************************************
 *  ###   Date              Author       Description
 *-------------------------------------------------------------------------------------------------------
 *    1   24-FEB-2020    	  Senitha      Initial Development.
 *
 ********************************************************************************************************
 */

void main() {
  runApp(
    MyApp(),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Login App',
      home: LoginPage(),
    );
  }
}
