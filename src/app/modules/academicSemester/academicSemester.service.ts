import { AcademicSemester, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { IAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterSearchableField } from "./academicSemeter.contants";


const insertIntoDB = async (academicSemesterData: AcademicSemester): Promise<AcademicSemester> => {
    const result = await prisma.academicSemester.create({
        data: academicSemesterData
    })
    return result;
}

const getAllFromDB = async (
    filters: IAcademicSemester,
    options: IPaginationOptions
)
    : Promise<IGenericResponse<AcademicSemester[]>> => {

    const { page, limit, skip } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            OR: AcademicSemesterSearchableField.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    }

    const whereConditions: Prisma.AcademicSemesterWhereInput =
        andConditions.length > 0 ? { AND: andConditions } : {}

    const result = await prisma.academicSemester.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ?
            {
                [options.sortBy]: options.sortOrder
            }
            :
            { createdAt: 'desc' }
    });
    const total = await prisma.academicSemester.count();
    return {
        meta: {
            total,
            page: 1,
            limit: 10
        },
        data: result
    }

}

const getDataById = async (id: string): Promise<AcademicSemester | null> => {
    const result = await prisma.academicSemester.findUnique({
        where: { id }
    })
    return result;
}

export const AcademicSemesterService = {
    insertIntoDB,
    getAllFromDB,
    getDataById
}


// where: {
//     OR: [
//         {
//             title: {
//                 contains: searchTerm,
//                 mode: 'insensitive'
//             }
//         },
//         {
//             code: {
//                 contains: searchTerm,
//                 mode: 'insensitive'
//             }
//         }
//     ]
// },