// importing the Database Connection
const con = require("./databaseConnection")
const currentTimeStamp = require("./currentDate")

// Activity Get ALL service
exports.getAllActivities = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT activity.id, activity.purpose, date_format(activity.createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, date_format(activity.expectedClearingDate, '%W %m/%d/%Y %l:%i %p') expectedClearingDate, activity.`status`, third.id 'thirdPartyId', third.name 'thirdPartyName', container.id 'containerID',  container.containerGivenID, shipping.id 'shippingLineID', shipping.name 'shippingLineName' FROM Activities activity, Containers container, ShippingLine shipping, ThirdParty third WHERE activity.containerId=container.id AND activity.shippingLineId=shipping.id AND activity.thirdPartyId=third.id"

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
                    Activities:rows
                })
            })
        }
    })
}

// Activity Get By ID service
exports.getActivityById = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const id = event["pathParameters"]['id']
    const sql = "SELECT activity.id, activity.purpose, date_format(activity.createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, date_format(activity.expectedClearingDate, '%W %m/%d/%Y %l:%i %p') expectedClearingDate, activity.`status`, third.id 'thirdPartyId', third.name 'thirdPartyName', container.id 'containerID',  container.containerGivenID, shipping.id 'shippingLineID', shipping.name 'shippingLineName' FROM Activities activity, Containers container, ShippingLine shipping, ThirdParty third WHERE activity.containerId=container.id AND activity.shippingLineId=shipping.id AND activity.thirdPartyId=third.id AND activity.id = ?"

    con.query(sql, [id], (error,rows)=> {
        if (error) {
            callback({
                statusCode:500,
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                body:JSON.stringify({
                    Activities:rows
                })
            })
        }
    })
}

// Activity SAVE service
exports.saveActivity = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let purpose = '';
    let createdDate = currentTimeStamp;
    let createdUser = '';
    let expectedClearingDate = '';
    let status = '';
    let thirdPartyId = '';
    let shippingLineId ='';
    let containerGivenID ='';

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.containerGivenID) 
            containerGivenID = body.containerGivenID;
        if (body.purpose) 
            purpose = body.purpose;
        if (body.expectedClearingDate) 
            expectedClearingDate = body.expectedClearingDate;
        if (body.status) 
            status = body.status;
        if (body.thirdPartyId) 
            thirdPartyId = body.thirdPartyId;
        if (body.shippingLineId) 
            shippingLineId = body.shippingLineId;
        if (body.createdUser) 
            createdUser = body.createdUser;
    }

    const body1 = [containerGivenID, createdDate, createdUser]
    const sql = "INSERT INTO Containers (containerGivenID, createdDate, createdUser) VALUES (?); INSERT INTO Activities (purpose, expectedClearingDate, status, thirdPartyId, containerId, shippingLineId, createdDate, createdUser) SELECT ?, ?, ?, ?, id, ?, ?, ? FROM Containers WHERE containerGivenID = ?;"

    con.query(sql, [body1, purpose, expectedClearingDate, status, thirdPartyId, shippingLineId, createdDate,createdUser, containerGivenID ], (error,result)=> {
        if (error) {
            callback({
                statusCode:500,
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                body:JSON.stringify("Activity Saved Successfully")
            })
        }
    })
}    

// Activity UPDATE service
exports.updateActivity = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let purpose = '';
    let modifiedDate = currentTimeStamp;
    let modifiedUser = '';
    let expectedClearingDate = '';
    let status = '';
    let thirdPartyId = '';
    let containerId = '';
    let shippingLineId ='';

    
    const id = event["pathParameters"]['id']

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.purpose) 
            purpose = body.purpose;
        if (body.expectedClearingDate) 
            expectedClearingDate = body.expectedClearingDate;
        if (body.status) 
            status = body.status;
        if (body.thirdPartyId) 
            thirdPartyId = body.thirdPartyId;
        if (body.containerId) 
            containerId = body.containerId;
        if (body.shippingLineId) 
            shippingLineId = body.shippingLineId;
        if (body.modifiedUser) 
            modifiedUser = body.modifiedUser;
    }

     const sql = "UPDATE Activities SET purpose = ?, expectedClearingDate = ?, status = ?, thirdPartyId = ?, containerId = ?, shippingLineId = ?, modifiedDate = ?, modifiedUser =? WHERE id = ?"

    con.query(sql, [purpose, expectedClearingDate, status, thirdPartyId, containerId, shippingLineId, modifiedDate, modifiedUser, id], (error,result)=> {
        if (error) {
            callback({
                statusCode:500,
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                body:JSON.stringify("Activity Updated  Successfully")
            })
        }
    })
}

// Activity GET by ThirdPartyId service
exports.getActivitiesByThirdPartyId = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const id = event["pathParameters"]['thirdPartyId']
    const sql = "SELECT activity.id, activity.purpose, date_format(activity.createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, date_format(activity.expectedClearingDate, '%W %m/%d/%Y %l:%i %p') expectedClearingDate, activity.`status`, third.id 'thirdPartyId', third.name 'thirdPartyName', container.id 'containerID',  container.containerGivenID, shipping.id 'shippingLineID', shipping.name 'shippingLineName' FROM Activities activity, Containers container, ShippingLine shipping, ThirdParty third WHERE activity.containerId=container.id AND activity.shippingLineId=shipping.id AND activity.thirdPartyId=third.id AND activity.thirdPartyId = ?"

    con.query(sql, [id], (error,rows)=> {
        if (error) {
            callback({
                statusCode:500,
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                body:JSON.stringify({
                    Activities:rows
                })
            })
        }
    })
}

//  locally for testing 


// JSON Sample ------->
// {
//     "purpose": "Cargo Loading",
//     "expectedClearingDate": "2021-04-01 11:03:28",
//     "status": "CREATED",
//     "thirdPartyId": "1",
//     "containerId": "1",
//     "shippingLineId": "1"
// }
// const body1 = ['ABBAAAAA', '2021-04-01 11:03:28', '1']
// var purpose = 'sahan';
// var expectedClearingDate = '2021-04-01 11:03:28';
// var status = 'AAAA';
// var thirdPartyId = '1';
// var shippingLineId = '1';
// var createdDate = '2021-04-01 11:03:28';
// var createdUser = '1';
// var containerGivenID = 'ABBAAAAA';
// var sql = 'INSERT INTO Containers (containerGivenID, createdDate, createdUser) VALUES (?); INSERT INTO Activities (purpose, expectedClearingDate, status, thirdPartyId, containerId, shippingLineId, createdDate, createdUser) SELECT ?, ?, ?, ?, id, ?, ?, ? FROM Containers WHERE containerGivenID = ?;';
// con.query(sql, [body1, purpose, expectedClearingDate, status, thirdPartyId, shippingLineId, createdDate,createdUser, containerGivenID], function (err, result, rows) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
// });