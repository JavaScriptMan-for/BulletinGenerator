import { Request, Response } from "express"


type CadastralNumberArray = [number, number, number]

interface GeneralInfoType {
    date: string,
    cadastral_number: CadastralNumberArray,
    area: string,
    address: string,
    number_questions: number
}

interface VariousInfoType {
    fraction: 'в доле' | 'га',
    isRepresentative: boolean,
    name: string,
    share_size: number,
    share_size_with_common_denominator: string
}

interface BodyType {
   general_info: GeneralInfoType,
   various_info: VariousInfoType,
   count: number
}


class RedactController {
    public async postData(req: Request<{}, {}, BodyType>, res: Response) {
        try {
            const { general_info, various_info, count } = req.body;
            
            

        } catch (error) {
            res.status(500).json({message: "Ошибка сервера"})
        }
    }
}

export const { postData } = new RedactController()