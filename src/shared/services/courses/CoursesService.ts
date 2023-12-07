import { AxiosResponse } from "axios"
import { AxiosConfig } from "shared/configs"
import { ICoursesData } from "shared/interfaces"

const extractData = async<T> (promise: Promise<AxiosResponse<T>>) => {
    const {data} = await promise
    return data
}

const getAll = async (): Promise<ICoursesData[]> => {
    return extractData(AxiosConfig.get<ICoursesData[]>("/courses"))
}

const create = async (newCourse: Omit<ICoursesData, "id">): Promise<ICoursesData> => {
    return extractData(AxiosConfig.post<ICoursesData>("/courses", newCourse))
}

const getById = async (id: number) => {
    return extractData(AxiosConfig.get<ICoursesData>(`/courses/${id}`))
}

const update = async (data: ICoursesData) => {
    return extractData(AxiosConfig.put<ICoursesData>(`/courses/${data.id}`, {...data}))
}

const remove = async (id: number) => {
    return extractData(AxiosConfig.delete<void>(`/courses/${id}`))
}


export const CoursesServices = {
    getAll, create, getById, update, remove
}
