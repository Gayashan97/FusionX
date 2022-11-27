// importing the Database Connection
const con = require("./databaseConnection") 
const currentTimeStamp = require("./currentDate")

// Activity Logs Get ALL service
exports.getAllActivityLogs = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT logss.id, logss.status, date_format(logss.createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, logss.createdUser, date_format(logss.updatedDate, '%W %m/%d/%Y %l:%i %p') updatedDate, logss.updatedUser, logss.activityId, logss.activityLogsTypeId, act.purpose 'activityPurpose', logType.name 'activityLogsTypeName' FROM ActivityLogs logss, Activities act, ActivityLogsType logType WHERE logss.activityId=act.id AND logss.activityLogsTypeId=logType.id "

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
                    ActivityLogs:rows
                })
            })
        }
    })
}

// Activity Logs Get by ID service
exports.getActivityLogsById = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const id = event["pathParameters"]['id']
    const sql = "SELECT logss.id, logss.status, date_format(logss.createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, logss.createdUser, date_format(logss.updatedDate, '%W %m/%d/%Y %l:%i %p') updatedDate, logss.updatedUser, logss.activityId, logss.activityLogsTypeId, act.purpose 'activityPurpose', logType.name 'activityLogsTypeName' FROM ActivityLogs logss, Activities act, ActivityLogsType logType WHERE logss.activityId=act.id AND logss.activityLogsTypeId=logType.id AND logss.id = ?"

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
                    ActivityLogs:rows
                })
            })
        }
    })
}

// Activity Logs SAVE service
exports.saveActivityLog = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let status = '';
    let createdDate = '';
    let createdUser = '';
    let activityId = '';
    let activityLogsTypeId = '';

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.status) 
            status = body.status;
        if (body.activityId) 
            activityId = body.activityId;
        if (body.activityLogsTypeId) 
            activityLogsTypeId = body.activityLogsTypeId;
        if (body.createdUser) 
            createdUser = body.createdUser;
        if (body.createdDate) 
            createdDate = body.createdDate;
    }

    const body = [status, createdDate, createdUser, activityId, activityLogsTypeId]
    const sql = "INSERT INTO ActivityLogs (status, createdDate, createdUser, activityId, activityLogsTypeId) VALUES (?)"

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
                body:JSON.stringify("Activity Log Saved Successfully")
            })
        }
    })
}

// Activity Logs UPDATE service
exports.updateActivityLog = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let status = '';
    let updatedDate = '';
    let updatedUser = '';
    let activityId = '';
    let activityLogsTypeId = '';
    
    const id = event["pathParameters"]['id']

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.status) 
            status = body.status;
        if (body.activityId) 
            activityId = body.activityId;
        if (body.activityLogsTypeId) 
            activityLogsTypeId = body.activityLogsTypeId;
        if (body.updatedUser) 
            updatedUser = body.updatedUser;
        if (body.updatedDate) 
            updatedDate = body.updatedDate;
    }

     const sql = "UPDATE ActivityLogs SET status = ?, updatedDate = ?, updatedUser = ?, activityId = ?, activityLogsTypeId = ? WHERE id = ?"

    con.query(sql, [status, updatedDate, updatedUser, activityId, activityLogsTypeId, id], (error,result)=> {
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
                body:JSON.stringify("Activity Log Updated Successfully")
            })
        }
    })
}

// Activity Logs Get by Activity ID service
exports.getActivityLogsByActivityId = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const actId = event["pathParameters"]['actId']
    const sql = "SELECT logss.id, logss.status, date_format(logss.createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, logss.createdUser, date_format(logss.updatedDate, '%W %m/%d/%Y %l:%i %p') updatedDate, logss.updatedUser, logss.activityId, logss.activityLogsTypeId, act.purpose 'activityPurpose', logType.name 'activityLogsTypeName' FROM ActivityLogs logss, Activities act, ActivityLogsType logType WHERE logss.activityId=act.id AND logss.activityLogsTypeId=logType.id AND logss.activityId = ?"

    con.query(sql, [actId], (error,rows)=> {
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
                    ActivityLogs:rows
                })
            })
        }
    })
}