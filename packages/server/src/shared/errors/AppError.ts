class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly status: string;

  constructor(message: string, statusCode = 400, status = 'bad_request') {
    this.message = message;
    this.statusCode = statusCode;
    this.status = status;
  }
}

export default AppError;
