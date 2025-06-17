import { GeneralInfoToServer, VariousInfo } from "./Form.type"
export interface VariousInfoState {
    various_info: VariousInfo[],
    isClick: number
}
export interface GeneralInfoState  {
    general_info: GeneralInfoToServer
}
