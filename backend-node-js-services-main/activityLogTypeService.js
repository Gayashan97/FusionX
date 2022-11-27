// importing the Database Connection
const con = require("./databaseConnection")

// Activity Logs Types Get ALL service
exports.getAllActivityLogTypes = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT activityLogsTypes.id, activityLogsTypes.name, activityLogsTypes.purpose, date_format(activityLogsTypes.createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, activityLogsTypes.createdUser FROM ActivityLogsType activityLogsTypes"

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
                    ActivityLogTypes:rows
                })
            })
        }
    })
}