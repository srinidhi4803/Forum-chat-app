class ApiResponse {
  constructor(status, message="Success", data) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success=this.status<400;
  }
}

export { ApiResponse }