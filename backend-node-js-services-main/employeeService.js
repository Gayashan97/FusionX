// importing the Database Connection
const con = require("./databaseConnection")
const currentTimeStamp = require("./currentDate")


// Employee Get ALL service
exports.listAllEmployees = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT userss.id , userss.empId , userss.name , userss.age , userss.contactNo , userss.address , userss.userName, userss.email, userss.userRoleId, role.userRoleName, userTypes.id 'userTypeId', userTypes.userTypeName, userss.departmentId, dep.departmentName FROM Users userss , UserRole role, UserType userTypes, Department dep WHERE userss.userTypeId = '1' AND userss.userTypeId = userTypes.id AND userss.userRoleId = role.id AND userss.departmentId = dep.id;"

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
                    Employees:rows
                })
            })
        }
    })
}

// Employee Get By ID service
exports.getEmployeeById = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const id = event["pathParameters"]['id']
    const sql = "SELECT userss.id , userss.empId , userss.name , userss.age , userss.contactNo , userss.address , userss.userName, userss.email, userss.userRoleId, role.userRoleName, userTypes.id 'userTypeId', userTypes.userTypeName, userss.departmentId, dep.departmentName FROM Users userss , UserRole role, UserType userTypes, Department dep WHERE userss.userTypeId = '1' AND userss.userTypeId = userTypes.id AND userss.userRoleId = role.id AND userss.departmentId = dep.id AND userss.id = ?"

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
                    Employees:rows
                })
            })
        }
    })
}

// Employee SAVE service
exports.saveEmployee = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let empId = "";
    let empName = '';
    let age = '';
    let contactNo = '';
    let address = '';
    let userRoleId = '';
    let createdDate = currentTimeStamp;
    let createdUser = '';
    let userTypeId = 1;
    let userName= '';
    let email= '';
    let departmentId= '';

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
        if (body.userRoleId) 
            userRoleId = body.userRoleId;
        if (body.createdUser) 
            createdUser = body.createdUser;
        if (body.userName) 
            userName = body.userName;
        if (body.email) 
            email = body.email;
        if (body.departmentId) 
            departmentId = body.departmentId;
    }

    const body = [empId, empName, userName, email, age, contactNo, address, userRoleId, createdDate, createdUser, userTypeId, departmentId]
    const sql = "INSERT INTO Users (empId, name, userName, email, age, contactNo, address, userRoleId , createdDate, createdUser, userTypeId, departmentId) VALUES (?)"

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
                body:JSON.stringify("Employee Saved Successfully :" + empId + " :- " + empName)
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
//     "userRoleId": "1",
//     "userName": "sahan",
//     "email": "sahan@abc.lk",
//     "createdUser": "sahan"
// }
}

// Employee UPDATE service
exports.updateEmployee = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let empId = "";
    let empName = '';
    let age = '';
    let contactNo = '';
    let address = '';
    let userRoleId = '';
    let modifiedDate = currentTimeStamp;
    let modifiedUser = '';
    let userTypeId = 1;
    let userName="";
    let email="";
    let departmentId= '';
    
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
        if (body.userRoleId) 
            userRoleId = body.userRoleId;
        if (body.modifiedUser) 
            modifiedUser = body.modifiedUser;
        if (body.userName) 
            userName = body.userName;
        if (body.email) 
            email = body.email;
        if (body.departmentId) 
            departmentId = body.departmentId;
    }

     const sql = "UPDATE Users SET empId = ?, name = ?, userName = ?, email = ?, age = ?, contactNo = ?, address = ?, userRoleId = ?, modifiedDate = ?, modifiedUser = ?, userTypeId =?, departmentId =? WHERE id = ?"

    con.query(sql, [empId, empName, userName, email, age, contactNo, address, userRoleId, modifiedDate, modifiedUser, userTypeId, departmentId, id], (error,result)=> {
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
                body:JSON.stringify("Updated Successfully :" + empId + " :- " + empName)
            })
        }
    })
}

// Employee Get by UserName service
exports.getEmployeeByUserName = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const userName = event["pathParameters"]['userName']
    const sql = "SELECT userss.id ,userss.empId , userss.name , userss.age , userss.contactNo , userss.address, userss.userName, userss.email, userss.userRoleId, userss.thirdPartyId, userTypes.id 'userTypeId', userTypes.userTypeName, userss.departmentId FROM Users userss , UserType userTypes WHERE userss.userTypeId = userTypes.id AND userss.userName = ?"

    con.query(sql, [userName], (error,rows)=> {
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
                    Employees:rows
                })
            })
        }
    })
}

// Department Get ALL  service
exports.getAllDepartments = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT * FROM Department;"

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
                    Departments:rows
                })
            })
        }
    })
}
