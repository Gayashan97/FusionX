exports.handler = (event, context, callback) => {
    callback(null, {
        statusCode: '200',
        body: 'Initial Code. Use this sample for coding',
    });
};



exports.handlertwo = (event, context, callback) => {
    callback(null, {
        statusCode: '200',
        body: 'Test Second Function',
    });
};