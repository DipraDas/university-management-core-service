import { AcademicSemester } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { AcademicSemesterService } from "./academicSemester.service";
import { AcademicSemesterFilterAbleFields } from "./academicSemeter.contants";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.insertIntoDB(req.body);
    sendResponse<AcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester Created',
        data: result
    })
})

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, AcademicSemesterFilterAbleFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await AcademicSemesterService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester Data Fetched',
        meta: result.meta,
        data: result.data
    })
})

const getDataById = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicSemesterService.getDataById(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester Data Fetched',
        data: result
    })
})

export const AcademicSemesterController = {
    insertIntoDB,
    getAllFromDB,
    getDataById
}