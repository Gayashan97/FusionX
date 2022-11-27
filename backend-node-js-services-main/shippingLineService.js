// importing the Database Connection
const con = require("./databaseConnection")
const currentTimeStamp = require("./currentDate")

// Shipping Line Get ALL service
exports.listAllShippingLines = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT * FROM ShippingLine;"

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
                    ShippingLines:rows
                })
            })
        }
    })
}