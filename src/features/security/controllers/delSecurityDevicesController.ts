import {Request, Response} from 'express'
import {HttpStatus} from "../../../common/types/enum/httpStatus";
//TODO
export const delSecurityDevicesController = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(HttpStatus.Unauthorized)


}