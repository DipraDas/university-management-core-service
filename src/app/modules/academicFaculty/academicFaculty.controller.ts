import { AcademicFaculty } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { AcademicFacultyFilterAbleFields } from "./academicFaculty.contants";
import { AcademicFacultyService } from "./academicFaculty.service";

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.insertIntoDB(req.body);
    sendResponse<AcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty Created",
        data: result
    })
})


const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    const filters = pick(req.query, AcademicFacultyFilterAbleFields);
    const options = pick(req.query, ['title']);

    const result = await AcademicFacultyService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester Data Fetched',
        meta: result.meta,
        data: result.data
    })
})

const getDataById = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyService.getDataById(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester Data Fetched',
        data: result
    })
})

export const AcademicFacultyController = {
    insertIntoDB,
    getAllFromDB,
    getDataById
}