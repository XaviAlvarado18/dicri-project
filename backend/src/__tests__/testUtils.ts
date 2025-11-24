import type { NextFunction, Request, Response } from "express";

export const mockReq = (data: Partial<Request> = {}): Request =>
  ({
    ...data,
  } as Request);

export const mockRes = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockNext = () => jest.fn() as NextFunction;
