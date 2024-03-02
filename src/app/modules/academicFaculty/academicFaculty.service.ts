import { AcademicFaculty } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";

const insertIntoDB = async (academicFacultyData: AcademicFaculty): Promise<AcademicFaculty> => {
    const result = await prisma.academicFaculty.create({
        data: academicFacultyData
    })
    return result
}

const getAllFromDB = async (): Promise<IGenericResponse<AcademicFaculty[]>> => {
    const result = await prisma.academicFaculty.findMany({});
    const total = await prisma.academicFaculty.count();
    return {
        meta: {
            total,
            page: 1,
            limit: 10
        },
        data: result
    };
}

export const AcademicFacultyService = {
    insertIntoDB,
    getAllFromDB
}