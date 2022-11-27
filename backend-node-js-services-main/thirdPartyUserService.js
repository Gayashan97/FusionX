// importing the Database Connection
const con = require("./databaseConnection")
const currentTimeStamp = require("./currentDate")


// THird Party Users Get ALL service
exports.listAllThirdPartyUsers = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT userss.id , userss.empId , userss.name , userss.age , userss.contactNo , userss.address , userss.userName, userss.email, third.id 'thirdPartyId', third.name 'thirdPartyName' FROM Users userss , ThirdParty third WHERE userss.thirdPartyId = third.id;"

    con.query(sql, (error,rows)=> {
        if (error) {
            callback({
                statusCode:500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify({
                    ThirdPartyUsers:rows
                })
            })
        }
    })
}

// THird Party Users Get By Id service
exports.getThirdPartyUserById = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const id = event["pathParameters"]['id']
    const sql = "SELECT userss.id , userss.empId , userss.name , userss.age , userss.contactNo , userss.address , userss.userName, userss.email, third.id 'thirdPartyId', third.name 'thirdPartyName' FROM Users userss , ThirdParty third WHERE userss.thirdPartyId = third.id AND userss.id = ?"

    con.query(sql, [id], (error,rows)=> {
        if (error) {
            callback({
                statusCode:500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify({
                    ThirdPartyUsers:rows
                })
            })
        }
    })
}

// THird Party Users SAVE service
exports.saveThirdPartyUser = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let empId = "";
    let empName = '';
    let age = '';
    let contactNo = '';
    let address = '';
    let userRoleId = 4;
    let createdDate = currentTimeStamp;
    let createdUser = '';
    let userTypeId = 2;
    let thirdPartyId = '';
    let userName= '';
    let email= '';

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.empId) 
            empId = body.empId;
        if (body.name) 
            empName = body.name;
        if (body.age) 
            age = body.age;
        if (body.contactNo) 
            contactNo = body.contactNo;
        if (body.address) 
            address = body.address;
        if (body.createdUser) 
            createdUser = body.createdUser;
        if (body.thirdPartyId) 
            thirdPartyId = body.thirdPartyId;
        if (body.userName) 
            userName = body.userName;
        if (body.email) 
            email = body.email;
    }

    const body = [empId, empName, userName, email, age, contactNo, address, userRoleId, createdDate, createdUser, userTypeId, thirdPartyId]
    const sql = "INSERT INTO Users (empId, name, userName, email, age, contactNo, address, userRoleId , createdDate, createdUser, userTypeId, thirdPartyId) VALUES (?)"

    con.query(sql, [body], (error,result)=> {
        if (error) {
            callback({
                statusCode:500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify("Third Party User Saved Successfully :" + empId + " :- " + empName)
            })
        }
    })
// JSON Sample ------->
// {
//     "empId": "E007",
//     "name": "Test Person",
//     "age": "77",
//     "contactNo": "0777777777",
//     "address": "testing",
//     "createdUser": "1",
//     "userName": "sahan",
//     "email": "sahan@abc.lk",
//     "thirdPartyId": "1"
// }
}

// THird Party Users UPDATE service
exports.updateThirdPartyUser = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let empId = "";
    let empName = '';
    let age = '';
    let contactNo = '';
    let address = '';
    let userRoleId = 4;
    let modifiedDate = currentTimeStamp;
    let modifiedUser = '';
    let userTypeId = 2;
    let thirdPartyId = '';
    let userName="";
    let email="";
    
    const id = event["pathParameters"]['id']

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.empId) 
            empId = body.empId;
        if (body.name) 
            empName = body.name;
        if (body.age) 
            age = body.age;
        if (body.contactNo) 
            contactNo = body.contactNo;
        if (body.address) 
            address = body.address;
        if (body.modifiedUser) 
            modifiedUser = body.modifiedUser;
        if (body.thirdPartyId) 
            thirdPartyId = body.thirdPartyId;
        if (body.userName) 
            userName = body.userName;
        if (body.email) 
            email = body.email;
    }

     const sql = "UPDATE Users SET empId = ?, name = ?, userName = ?, email = ?, age = ?, contactNo = ?, address = ?, userRoleId = ?, modifiedDate = ?, modifiedUser = ?, userTypeId =?, thirdPartyId =? WHERE id = ?"

    con.query(sql, [empId, empName, userName, email, age, contactNo, address, userRoleId, modifiedDate, modifiedUser, userTypeId, thirdPartyId, id], (error,result)=> {
        if (error) {
            callback({
                statusCode:500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body:JSON.stringify("User Updated Successfully :" + empId + " :- " + empName)
            })
        }
    })
}
