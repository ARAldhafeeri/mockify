import { Response } from 'express';

export const SuccessResponse = (
  res: Response, data: any, message: string, status: number
  ) => {
  return res.status(200).send(
    { status: true, data: data, message: message }
    );
}

export const ErrorResponse = (
  res: Response, message: string, status: number
  ) => {
  return res.status(400).send(
    { status: false, message: message }
    );
}