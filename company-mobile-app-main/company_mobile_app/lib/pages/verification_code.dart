import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

import 'reset_password.dart';
import 'reset_password.dart';

/**
 * Verification Code
 *
 ********************************************************************************************************
 *  ###   Date              Author       Description
 *-------------------------------------------------------------------------------------------------------
 *    1   15-APR-2020    	  Senitha      Initial Development.
 *
 ********************************************************************************************************
 */

class VerificationCode extends StatefulWidget {
  @override
  _VerificationCodeState createState() => _VerificationCodeState();
}

class _VerificationCodeState extends State<VerificationCode> {
  Response response;
  TextEditingController _emailController = TextEditingController();
  bool _isLoading = false;

  _verifyCode(String email) async {
    if (_emailController.text.trim() == "") {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please enter a email !')),
      );
    } else {
      var data = {
        'email': email,
      };

      try {
        await Dio().put(
            'https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/VerificationCodeForResetPassword',
            data: data);
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ResetPassword()),
        );
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Verification code sent to your email !')),
        );

        _emailController.clear();

      } on DioError catch (e) {
        print(e.message);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Email is incorrect !')),
        );
        print(response.statusCode);
      }
      print(response.statusCode);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xffE7EEEC),
      body: Form(
        child: ListView(
          children: <Widget>[
            /*********** Logo ***********/
            Padding(
              padding: const EdgeInsets.only(top: 72.0, bottom: 35.0),
              child: Image.asset("assets/yacht.png"),
            ),

            /*********** Start User name text box ***********/
            Container(
              margin:
                  const EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
              padding: const EdgeInsets.all(4.0),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.black, width: 1.0),
                borderRadius: BorderRadius.circular(20.0),
              ),
              child: Row(
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.symmetric(
                        vertical: 10.0, horizontal: 15.0),
                    child: Icon(
                      Icons.alternate_email,
                      color: Colors.black,
                    ),
                  ),
                  Container(
                    height: 30.0,
                    width: 1.0,
                    color: Colors.black.withOpacity(0.5),
                    margin: const EdgeInsets.only(right: 10.0),
                  ),
                  Expanded(
                    child: TextFormField(
                      controller: _emailController,
                      style: TextStyle(
                        color: Colors.black,
                      ),
                      decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: "Enter your email ",
                          hintStyle: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                          )),
                    ),
                  )
                ],
              ),
            ),
            /*********** End Email Text Box ***********/

            /*********** Start Log In Button ***********/
            Container(
              margin: const EdgeInsets.only(top: 20.0),
              padding: const EdgeInsets.only(left: 20.0, right: 20.0),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: FlatButton(
                      splashColor: Color(0xff50C2C9),
                      color: Color(0xff50C2C9),
                      disabledColor: Color(0xff50C2C9),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30.0),
                      ),

                      /*********** Navigate to other page ***********/
                      onPressed: _isLoading == true
                          ? null
                          : () {
                              _verifyCode(_emailController.text);
                            },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Container(
                            padding: const EdgeInsets.all(16.0),
                            margin: const EdgeInsets.only(left: 50.0),
                          ),
                          Expanded(
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 16.0),
                              child: Text(
                                "Send Verification Code",
                                textAlign: TextAlign.left,
                                style: TextStyle(
                                    color: Colors.white, fontSize: 20),
                              ),
                            ),
                          )
                        ],
                      ),
                    ),
                  )
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
