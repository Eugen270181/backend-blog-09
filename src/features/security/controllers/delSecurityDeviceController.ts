import {Request, Response} from 'express'
import {HttpStatus} from "../../../common/types/enum/httpStatus";
import {RequestWithParams} from "../../../common/types/requests.type";
import {IdType} from "../../../common/types/id.type";
import {commentsServices} from "../../comments/services/commentsServices";
import {ResultStatus} from "../../../common/types/enum/resultStatus";
import {authServices} from "../../auth/services/authServices";
import {securityServices} from "../services/securityServices";
//TODO
export const delSecurityDeviceController = async (req: RequestWithParams<IdType>, res: Response) => {
    const sid = req.params.id;
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(HttpStatus.Unauthorized)
    const checkRT = await authServices.checkRefreshToken(refreshToken)
    if (checkRT.status !== ResultStatus.Success) return res.sendStatus(HttpStatus.Unauthorized)

    const deleteResult = await securityServices.deleteSession(checkRT.data!._id)



    return  res.sendStatus(HttpStatus.NoContent)

}