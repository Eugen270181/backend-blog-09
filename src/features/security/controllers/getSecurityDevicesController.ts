import {Request, Response} from 'express'
import {HttpStatus} from "../../../common/types/enum/httpStatus";
import {authServices} from "../../auth/services/authServices";
import {SecurityOutputModel} from "../types/output/securityOutput.model";
//TODO
export const getSecurityDevicesController = async (req: Request, res: Response<SecurityOutputModel[]>) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(HttpStatus.Unauthorized)
    const isLogout = await authServices.logoutUser(refreshToken)

    if (!isLogout) return res.sendStatus(HttpStatus.Unauthorized)

    return res.sendStatus(HttpStatus.NoContent)

}