

const errorHandler = (err, _req, res, _next) => {
    const statusCode = res.statusCode;
    console.log(process.env.VALIDATION_ERROR);
    switch(statusCode){
        case process.env.VALIDATION_ERROR:
            res.json({title: "VALIDATION_ERROR",message: err.message,stackTrace: err.stack});
            break;
        case process.env.UNAUTHORIZED:
            res.json({title: "UNAUTHORIZED",message: err.message,stackTrace: err.stack});
            break;
        case process.env.FORBIDDEN:
            res.json({title: "FORBIDDEN",message: err.message,stackTrace: err.stack});
            break;
        case process.env.NOT_FOUND:
            res.json({title: "NOT_FOUND",message: err.message,stackTrace: err.stack});
            break;
        case process.env.INTERNAL_SERVER_ERROR:
            res.json({title: "INTERNAL_SERVER_ERROR",message: err.message,stackTrace: err.stack});
            break;
        default:
            res.json({title: "No Error all good", code: statusCode, message: err.message,stackTrace: err.stack});
    }
    next();
};

module.exports = errorHandler;