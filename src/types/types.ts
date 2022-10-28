import { Request, Response } from "express";

export interface JdoodleStruct {
    clientId: string;
    clientSecret: string;
    language: string;
    script: string;
    stdin?: string;
    versionIndex: string;
}

export interface CustomRequest extends Request {
    params: any
}

export interface CustomResponse extends Response {
    header: any,
    json: any
}