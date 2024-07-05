class ApiError {
    constructor(
        statusCode,
        message="Something went wrong",
    ){
        this.statusCode=statusCode;
        this.success=false;
        this.data={
            message
        };
        this.success=false;
    }
}

export {ApiError}