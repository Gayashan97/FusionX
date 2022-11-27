// importing the Database Connection
const con = require("./databaseConnection")
const currentTimeStamp = require("./currentDate")

// WareHouse Items Get ALL service
exports.getAllWareHouseItems = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT id, date_format(createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, quantity, createdUser, wareHouseCategoryID, wareHouseId, itemName, date_format(modifiedDate, '%W %m/%d/%Y %l:%i %p') modifiedDate, modifiedUser FROM WareHouseItems"

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
                    WareHouseItems:rows
                })
            })
        }
    })
}

// WareHouse Items Get by Id service
exports.getWareHouseItemsById = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const id = event["pathParameters"]['id']
    const sql = "SELECT id, date_format(createdDate, '%W %m/%d/%Y %l:%i %p') createdDate, quantity, createdUser, wareHouseCategoryID, wareHouseId, itemName, date_format(modifiedDate, '%W %m/%d/%Y %l:%i %p') modifiedDate, modifiedUser FROM WareHouseItems WHERE id = ?"

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
                    WareHouseItems:rows
                })
            })
        }
    })
}

// WareHouse Items SAVE service
exports.saveWareHouseItems = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let quantity = "";
    let wareHouseCategoryID = '';
    let wareHouseId = '';
    let itemName = '';
    let createdDate = currentTimeStamp;
    let createdUser = '';

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.quantity) 
            quantity = body.quantity;
        if (body.wareHouseCategoryID) 
            wareHouseCategoryID = body.wareHouseCategoryID;
        if (body.wareHouseId) 
            wareHouseId = body.wareHouseId;
        if (body.itemName) 
            itemName = body.itemName;
        if (body.createdUser) 
            createdUser = body.createdUser;
    }

    const body = [quantity, wareHouseCategoryID, wareHouseId, itemName, createdDate, createdUser]
    const sql = "INSERT INTO WareHouseItems (quantity, wareHouseCategoryID, wareHouseId, itemName, createdDate, createdUser) VALUES (?)"

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
                body:JSON.stringify("WareHouse Items Saved Successfully")
            })
        }
    })

// JSON Sample ------->
// {   
//     "quantity": "200.00",
//     "wareHouseCategoryID": "1",
//     "itemName": "1",
//
// }
}

// WareHouse Items UPDATE service
exports.updateWareHouseItems = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let quantity = "";
    let wareHouseCategoryID = '';
    let wareHouseId = '';
    let itemName = '';
    let modifiedDate = currentTimeStamp;
    let modifiedUser = '';
    
    const id = event["pathParameters"]['id']

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.quantity) 
            quantity = body.quantity;
        if (body.wareHouseCategoryID) 
            wareHouseCategoryID = body.wareHouseCategoryID;
        if (body.wareHouseId) 
            wareHouseId = body.wareHouseId;
        if (body.itemName) 
            itemName = body.itemName;
        if (body.modifiedUser) 
            modifiedUser = body.modifiedUser;
    }

     const sql = "UPDATE WareHouseItems SET quantity = ?, wareHouseCategoryID = ?, wareHouseId = ?, itemName = ?, modifiedDate = ?, modifiedUser = ? WHERE id = ?"

    con.query(sql, [quantity, wareHouseCategoryID, wareHouseId, itemName, modifiedDate, modifiedUser, id], (error,result)=> {
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
                body:JSON.stringify("Updated Successfully")
            })
        }
    })
}

// WareHouse Items GET by Category Id service
exports.getWareHouseItemsByCategoryId = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const id = event["pathParameters"]['catId']
    const sql = "SELECT id, createdDate, quantity, createdUser, wareHouseCategoryID, wareHouseId, itemName, modifiedDate, modifiedUser FROM WareHouseItems WHERE wareHouseCategoryID = ?"

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
                    WareHouseItems:rows
                })
            })
        }
    })
}

// WareHouse  GET All service
exports.getAllWareHouses = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    
    const sql = "SELECT * FROM WareHouse"

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
                    WareHouses:rows
                })
            })
        }
    })
}