import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

import 'login.dart';

/**
 * Reset Password
 *
 ********************************************************************************************************
 *  ###   Date              Author       Description
 *-------------------------------------------------------------------------------------------------------
 *    1   11-APR-2020    	  Senitha      Initial Development.
 *
 ********************************************************************************************************
 */

class ResetPassword extends StatefulWidget {
  @override
  _ResetPasswordState createState() => _ResetPasswordState();
}

class _ResetPasswordState extends State<ResetPassword> {
  TextEditingController _emailController = TextEditingController();
  TextEditingController _verificationCodeController = TextEditingController();
  TextEditingController _newPasswordController = TextEditingController();
  TextEditingController _confirmPasswordController = TextEditingController();
  Response response;
  bool _loggingIn = false;
  bool hideNewPassword = true;
  bool hideConfirmNewPassword = true;

  _login(
      String email, verificationCode, newPassword, confirmNewPassword) async {
    if (_emailController.text.trim() == "" ||
        _verificationCodeController.text.trim() == "" ||
        _newPasswordController.text.trim() == "" ||
        _confirmPasswordController.text.trim() == "") {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Fields can not be blank !')),
      );
    } else if (!RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]")
        .hasMatch(_emailController.text)) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please enter a valid email address !')),
      );
    } else if (_newPasswordController.text != _confirmPasswordController.text) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('New password does not match !')),
      );
    } else {

      var data = {
        'email': email,
        'verificationCode': verificationCode,
        'newPassword': newPassword,
        'confirmNewPassword': confirmNewPassword
      };

      try {
        var res = await Dio().put(
            'https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/ConfirmResetPassword',
            data: data);
        print(res);
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => LoginPage()),
        );
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Password successfully changed !')),
        );

        _emailController.clear();
        _verificationCodeController.clear();
        _newPasswordController.clear();
        _confirmPasswordController.clear();

      } on DioError catch (e) {
        print(e.message);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Email or Verification Code is incorrect !')),
        );
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
              padding: const EdgeInsets.only(top: 35.0, bottom: 35.0),
              child: Image.asset("assets/yacht.png"),
            ),

            /*********** Start Email Text Box ***********/
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
                          hintText: "Enter your email",
                          hintStyle: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                          )),
                    ),
                  )
                ],
              ),
            ),
            /*********** End Email Text Box ***********/

            /*********** Start Verification code Text Box ***********/
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
                      Icons.verified_user_outlined,
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
                      controller: _verificationCodeController,
                      style: TextStyle(
                        color: Colors.black,
                      ),
                      decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: "Enter verification code",
                          hintStyle: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                          )),
                    ),
                  )
                ],
              ),
            ),
            /*********** End Verification code Text Box ***********/

            /*********** Start New Password Text Box ***********/
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
                      Icons.lock_outline,
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
                      obscureText: hideNewPassword,
                      controller: _newPasswordController,
                      style: TextStyle(
                        color: Colors.black,
                      ),
                      decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: "Enter your new password",
                          suffixIcon: IconButton(
                            onPressed: () {
                              setState(() {
                                hideNewPassword = !hideNewPassword;
                              });
                            },
                            color: Colors.black,
                            icon: Icon(hideNewPassword
                                ? Icons.visibility_outlined
                                : Icons.visibility_off_outlined),
                          ),
                          hintStyle: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                          )),
                    ),
                  )
                ],
              ),
            ),
            /*********** End New Password Text Box ***********/

            /*********** Start New Confirm Password Text Box ***********/
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
                      Icons.lock_outline,
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
                      obscureText: hideConfirmNewPassword,
                      controller: _confirmPasswordController,
                      style: TextStyle(
                        color: Colors.black,
                      ),
                      decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: "Confirm your new password",
                          suffixIcon: IconButton(
                            onPressed: () {
                              setState(() {
                                hideConfirmNewPassword = !hideConfirmNewPassword;
                              });
                            },
                            color: Colors.black,
                            icon: Icon(hideConfirmNewPassword
                                ? Icons.visibility_outlined
                                : Icons.visibility_off_outlined),
                          ),
                          hintStyle: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                          )),
                    ),
                  )
                ],
              ),
            ),
            /*********** End Confirm New Password Text Box ***********/

            /*********** Start Reset Button ***********/
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
                      onPressed: _loggingIn == true
                          ? null
                          : () {
                              _login(
                                  _emailController.text,
                                  _verificationCodeController.text,
                                  _newPasswordController.text,
                                  _confirmPasswordController.text);
                            },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Container(
                            padding: const EdgeInsets.all(16.0),
                            margin: const EdgeInsets.only(left: 70.0),
                            child: Icon(
                              Icons.arrow_forward,
                              color: Colors.white,
                            ),
                          ),
                          Expanded(
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 16.0),
                              child: Text(
                                "Reset Password",
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
            ),
            /*********** End Reset Button ***********/
          ],
        ),
      ),
    );
  }
}
