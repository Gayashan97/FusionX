import 'package:flutter/material.dart';
import 'package:dio/dio.dart';

import 'third_party_activity.dart';
import 'verification_code.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  Response response;
  TextEditingController _usernameController = TextEditingController();
  TextEditingController _passwordController = TextEditingController();
  bool _isLogin = false;
  bool hidePassword = true;

  _login(String username, password) async {
    if (_usernameController.text.trim() == "" ||
        _passwordController.text.trim() == "") {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Please enter username and password !')),
      );
    } else {
      var data = {
        'userName': username,
        'password': password,
        'consoleTypeId': '4'
      };

      try {
        await Dio().post(
            'https://ky107h7r00.execute-api.ap-southeast-1.amazonaws.com/Prod/LogIn',
            data: data);
        Navigator.push(context,
          MaterialPageRoute(builder: (context) => ThirdPartyActivities(userName: username)),
        );

        _usernameController.clear();
        _passwordController.clear();

      } on DioError catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Username or Password is incorrect !')),
        );
      }
      //print(response.statusCode);
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
                      Icons.account_circle_outlined,
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
                      controller: _usernameController,
                      style: TextStyle(
                        color: Colors.black,
                      ),
                      decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: "Enter your username",
                          hintStyle: TextStyle(
                            color: Colors.black.withOpacity(0.5),
                          )),
                    ),
                  )
                ],
              ),
            ),
            /*********** End Email Text Box ***********/

            /*********** Start Password Text Box ***********/
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
                      obscureText: hidePassword,
                      controller: _passwordController,
                      style: TextStyle(
                        color: Colors.black,
                      ),
                      decoration: InputDecoration(
                          border: InputBorder.none,
                          hintText: "Enter your password",
                          suffixIcon: IconButton(
                            onPressed: () {
                              setState(() {
                                hidePassword = !hidePassword;
                              });
                            },
                            color: Colors.black,
                            icon: Icon(hidePassword
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
            /*********** End Password Text Box ***********/

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
                      onPressed: _isLogin == true
                          ? null
                          : () {
                              _login(_usernameController.text,
                                  _passwordController.text);
                            },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Container(
                            padding: const EdgeInsets.all(16.0),
                            margin: const EdgeInsets.only(left: 100.0),
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
                                "Sign In",
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
            /*********** End Log In Button ***********/

            /*********** Start Text ***********/
            Container(
              margin: const EdgeInsets.only(top: 20.0),
              padding: const EdgeInsets.only(left: 20.0, right: 20.0),
              child: Row(
                children: <Widget>[
                  Expanded(
                    child: FlatButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => VerificationCode()),
                        );
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Expanded(
                            child: Padding(
                              padding:
                                  const EdgeInsets.symmetric(vertical: 16.0),
                              child: Text(
                                "Forgot Password ?",
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: Colors.black, fontSize: 18),
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
            /*********** End Text ***********/
          ],
        ),
      ),
    );
  }
}
