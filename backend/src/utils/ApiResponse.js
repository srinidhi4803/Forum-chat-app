class ApiResponse {
  constructor(status, message="Success", data,token) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success=this.status<400;
    this.token=token;
  }
}

export { ApiResponse }