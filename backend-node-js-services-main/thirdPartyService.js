// importing the Database Connection
const con = require("./databaseConnection")
const currentTimeStamp = require("./currentDate")

// Third Party Get ALL service
exports.listAllThirdParties = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT * FROM ThirdParty;"

    con.query(sql, (error,rows)=> {
        if (error) {
            callback({
                statusCode:500,
                body:JSON.stringify(error)
            })
        } else {
            callback(null, {
                statusCode:200,
                body:JSON.stringify({
                    ThirdPartyCompanies:rows
                })
            })
        }
    })
}