import { Response } from 'express';

export const SuccessResponse = (
  res: Response, data: any, message: string, status: number, paginate : boolean=false, paginateData?: any
  ) => {
  return paginate ? res.status(200).send(
    { status: true, message: message, data: data, paginate: paginateData }
    ) : res.status(status).send(
    { status: true, message: message, data: data }
    );
}

export const ErrorResponse = (
  res: Response, message: string, status: number
  ) => {
  return res.status(400).send(
    { status: false, message: message }
    );
}