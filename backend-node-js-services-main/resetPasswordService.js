// importing the Database Connection
const con = require("./databaseConnection")

// Verification Email Sending Service
exports.verificationCodeForResetPassword = (event, context, callback) => {

    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    context.callbackWaitsForEmptyEventLoop = false
    let email = "";
    let verificationCode = Math.random().toString(36).substring(7);

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.email) 
            email = body.email;
    }

    var responseBody = {
        "message": "Verification Code Successfully Sent ...... Please check your mail box",
        "email": email
    };

    // Integrationm of gmail
    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
          user: 'fusionx.sdgp@gmail.com',
          pass: 'sdgpAdmin'
        }
      }));
      
      var mailOptions = {
        from: 'fusionx.sdgp@gmail.com',
        to: email,
        subject: 'Password Reset Verification Code for fusionX Cargo Tracking System',
        text: 'Please use this verification code to reset your password : ' + verificationCode
      };
    
    const sql = "UPDATE Users SET verificationCode = ? WHERE email = ?"

    con.query(sql, [verificationCode, email], (error, result) => {
        if (error) {
            callback({
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(error)
            })
        } else {
            if (result === undefined || result.changedRows == 0) {
                callback(null, {
                    statusCode: 422,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify("Invalid Email. Please try again")
                })
            } else {
                transporter.sendMail(mailOptions, function(error, info){
                  if (error) {
                    console.log("ERROR !!")
                  }
                  callback(null, {
                      statusCode: 200,
                      headers: {
                          'Content-Type': 'application/json',
                          'Access-Control-Allow-Origin': '*'
                      },
                      body: JSON.stringify(responseBody)
                  })
                });
            }
        }
    })
    // JSON Sample  ------->
    // {
    //     "email": "sahan.2018523@iit.ac.lk"
    // }
}

// Confirm Reset PW Service
exports.confirmResetPassword = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let email = "";
    let verificationCode = "";
    let newPassword = '';
    let confirmNewPassword = '';

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.email) 
            email = body.email;
        if (body.verificationCode) 
            verificationCode = body.verificationCode;
        if (body.newPassword)
            newPassword = body.newPassword;
        if (body.confirmNewPassword) 
            confirmNewPassword = body.confirmNewPassword;
    }

    if(newPassword == confirmNewPassword){

    const sql = "UPDATE Users SET password = ? WHERE email = ? AND verificationCode = ?"

    con.query(sql, [confirmNewPassword, email, verificationCode], (error, result) => {
        if (error) {
            callback({
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(error)
            })
        } else {

            if (result === undefined || result.changedRows == 0) {
                callback(null, {
                    statusCode: 422,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify("Invalid Email or Verification Code. Please try again")
                })
            } else {
                callback(null, {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify("Password Successfully Changed ...... : " + email)
                })
            }

        }
    })} else {
        callback(null, {
            statusCode: 422,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify("Passwords miss match. Please try again")
        })
    }
    // JSON Sample ------->
    // {
    //     "email": "sahan.2018523@iit.ac.lk",
    //     "verificationCode": "TEST",
    //     "newPassword": "Bakelmun",
    //     "confirmNewPassword": "Bakelmun"
    // }
}

//  locally for testing 
// var email = 'sahan.2018523@iit.ac.lk';
// var verificationCode = 'TEST';
// var newPassword = 'op';
// var confirmNewPassword = 'op';
// if(newPassword == confirmNewPassword){
//     var pass = confirmNewPassword;
//     var sql = 'UPDATE Users SET password = ? WHERE email = ? AND verificationCode = ?';
//     con.query(sql, [pass, email, verificationCode], function (err, result) {
        
//         if (result === undefined || result.changedRows == 0) {
//             console.log("Invalid UserName or Password. Please try again",) ;
//         } else {
//             console.log("LogIn Successful ...... Welcome : ", email);
//         }
//     });
// } else {
//     console.log("FAILED");
// }


//  locally for testing 
// var nodemailer = require('nodemailer');
// var smtpTransport = require('nodemailer-smtp-transport');
// let email = "sahan.2018523@iit.ac.lk";
// let verificationCode = Math.random().toString(36).substring(7);
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'fusionx.sdgp@gmail.com',
//       pass: 'sdgpAdmin'
//     }
//   });
  
//   var mailOptions = {
//     from: 'fusionx.sdgp@gmail.com',
//     to: email,
//     subject: 'Sending Email using Node.js',
//     text: 'Please use this verification code to reset your password : ' + verificationCode
//   };
  
//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });