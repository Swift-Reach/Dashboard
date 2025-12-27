import { NextResponse } from "next/server";

enum Status {
  OK = 200,
  CREATED = 201,
  SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVICE_UNAVALIBLE = 503
}

function success (res:any = {}, status:Status = Status.OK) {
  return NextResponse.json(res, { status: status.valueOf() });
}

function error (status:Status = Status.SERVER_ERROR, message?:string) {
  return NextResponse.json({ error: message }, { status: status.valueOf() });
}

export { success, error, Status };