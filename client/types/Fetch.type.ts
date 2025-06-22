import { GeneralInfo, GeneralInfoToServer, VariousInfoToServer } from "./Form.type"

export interface HiType {
    id?: number,
    message: string
}
export interface FullInfo {
    general_info: GeneralInfoToServer,
    various_info: VariousInfoToServer[]
}