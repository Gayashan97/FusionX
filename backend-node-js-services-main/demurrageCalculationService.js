var dateFormat = require('dateformat');
var moment = require('moment-business-days');

// Service to Calculate Demurrage Cost in USD $
exports.demurrageCalculation = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false
    let createdDate = "";
    let clearingDate = '';

    if (event.body !== null && event.body !== undefined) {
        let body = JSON.parse(event.body)
        if (body.createdDate) 
            createdDate = body.createdDate;
        if (body.clearingDate) 
            clearingDate = body.clearingDate;
    }
    let formatCreatedDate=dateFormat(createdDate, "mm-dd-yyyy");
    let formatClearingDate=dateFormat(clearingDate, "mm-dd-yyyy");

    var diff = moment(formatClearingDate, 'MM-DD-YYYY').businessDiff(moment(formatCreatedDate,'MM-DD-YYYY'));
    console.log("Log", diff)
    var demmurageCost = "";
    if(diff>3){
        var diff1 = diff-3
        if(diff>11){
            if(diff>18){
                    demmurageCost = diff1*23
            }else{
                demmurageCost = diff1*15
            }
        }else {
            demmurageCost = diff1*8
        }
    }else {
        demmurageCost = "00.00"
    }

    callback(null, {
        statusCode: '200',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        // body: "Total Calculated Demmurage Cost in USD : $" + demmurageCost,
        body:JSON.stringify({
            Calculation: [{  
                "message": "Total Calculated Demmurage Cost in USD : $" + demmurageCost
                }]
        })
    });
};


// Locally for testiing
// let createdDate = "2021-04-02 00:00:00.000";
// let clearingDate = '2021-04-30 00:00:00.000';
// createdDate=dateFormat(createdDate, "mm-dd-yyyy");
// clearingDate=dateFormat(clearingDate, "mm-dd-yyyy");
// console.log(createdDate, clearingDate)
// var diff = moment(clearingDate, 'MM-DD-YYYY').businessDiff(moment(createdDate,'MM-DD-YYYY'));
// var responseBody = {"Calculation": [{
//     "message": "Total Calculated Demmurage Cost in USD : $" + diff
//     }]};
// console.log("AAAAAAA", responseBody)