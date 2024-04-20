const globalErrorHandler = (err, req, res, next) => {
    // Handle errors
    //stack
    //message
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    const message = err?.message;
    
    res.status(statusCode).json({
        stack,
        message,
    });
}

//404 handler
const NotFound = (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    next(err);
}


module.exports = {globalErrorHandler, NotFound};