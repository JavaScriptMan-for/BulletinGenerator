import { GeneralInfoToServer, VariousInfo, VariousInfoToServer } from "./Form.type"
export interface VariousInfoState {
    various_info: VariousInfo[],
    various_info_to_server: VariousInfoToServer[],
    isClick: number,
    isValid: boolean[]
}
export interface GeneralInfoState  {
    general_info: GeneralInfoToServer
}
