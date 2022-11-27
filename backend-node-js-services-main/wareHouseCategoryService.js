// importing the Database Connection
const con = require("./databaseConnection")

// WareHouse Categories Get ALL service
exports.getAllWareHouseCategories = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT id, itemName, itemDescription, date_format(createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, createdUser FROM WareHouseCategory"

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
                    WareHouseCategories:rows
                })
            })
        }
    })
}