export const errorHandler = (statusCode,message)=>{
    const erro =new Error()
    error.statusCode = statusCode;
    error.message=message;
    return error;
}
