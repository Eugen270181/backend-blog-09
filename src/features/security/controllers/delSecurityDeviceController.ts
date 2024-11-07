import {Request, Response} from 'express'
import {HttpStatus} from "../../../common/types/enum/httpStatus";
import {RequestWithParams} from "../../../common/types/requests.type";
import {IdType} from "../../../common/types/id.type";
//TODO
export const delSecurityDeviceController = async (req: RequestWithParams<IdType>, res: Response) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(HttpStatus.Unauthorized)


}