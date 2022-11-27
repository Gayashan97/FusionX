// importing the Database Connection
const con = require("./databaseConnection")

// LOGIN validation Service
exports.login = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let userName = "";
    let password = '';
    let consoleTypeId = '';

    // consoleTypeId -------- >>   1 : Web Console , 2 : Admin Console , 3 : Mobile App , 4 : Third Party App

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.userName) 
            userName = body.userName;
        if (body.password) 
            password = body.password;
        if (body.consoleTypeId) 
            consoleTypeId = body.consoleTypeId;
    }

    const sql = "SELECT userss.id , userss.empId , userss.name , userss.userName , userRoleConsoleType.userRoleId , userRoleConsoleType.consoleTypeId , userss.thirdPartyId FROM Users userss , UserRole_ConsoleType userRoleConsoleType WHERE userss.userRoleId = userRoleConsoleType.userRoleId AND userss.userName = ? AND userss.password = ? AND userRoleConsoleType.consoleTypeId = ?"

    con.query(sql, [userName, password, consoleTypeId], (error, result, rows) => {
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

            if (result === undefined || result.length == 0) {
                callback(null, {
                    statusCode: 422,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify("Invalid UserName or Password. Please try again")
                })
            } else {
                callback(null, {
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body:JSON.stringify({
                        "Successful": result
                    })
                })
            }

        }
    })
    // JSON Sample ------->
    // {
    //     "userName": "sahan",
    //     "password": "sahan",
    //     "consoleTypeId": "4"
    // }
}

//  locally for testing 
// var userName = 'sahan';
// var password = 'bakelmun';
// var consoleTypeId = '4';
// var responseBody = {
//     "message": "LogIn Successful ...... Welcome :",
//     "userName": userName
// };
// var sql = 'SELECT userss.id , userss.empId , userss.name , userss.userName  , userRoleConsoleType.userRoleId , userRoleConsoleType.consoleTypeId , userss.thirdPartyId FROM Users userss , UserRole_ConsoleType userRoleConsoleType WHERE userss.userRoleId = userRoleConsoleType.userRoleId AND userss.userName = ? AND userss.password = ? AND userRoleConsoleType.consoleTypeId = ?';
// con.query(sql, [userName, password, consoleTypeId], function (err, result, rows) {
    
//     if (result === undefined || result.length == 0) {
//         console.log("Invalid UserName or Password. Please try again",) ;
//     } else {
//         console.log("LogIn Successful ...... Welcome :" , result);
//     }
// });