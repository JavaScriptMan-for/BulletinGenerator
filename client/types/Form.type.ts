type Mouths = "январь" | "февраль" | "март" | "апрель" | "май" | "июнь" | "июль" | "август" | "сентябрь" | "октябрь" | "ноябрь" | "декабрь";

export interface GeneralInfo {
    day: number,
    mouth: Mouths,
    year: number,
    cadastral_number_1: number,
    cadastral_number_2: number,
    cadastral_number_3: number,
    cadastral_number_y: number
    area: number,
    unit_of_measurement: string
    address: string,
    number_questions: number
}
export interface GeneralInfoToServer {
    date: string,
    cadastral_number: string,
    area: string,
    address: string,
    number_questions: number
}

export interface VariousInfo {
    fraction: 'в доле' | 'га',
    isRepresentative: boolean,
    name: string,
    name_representative: string,
    share_size: string,
    share_size_with_common_denominator: string,
    number_day: number |'____'
}

//Части формы

export interface DatePartType {
    day: number,
    mouth: Mouths,
    year: number,
}
export interface CadastralNumberPartType {
    cadastral_number_1: number,
    cadastral_number_2: number,
    cadastral_number_3: number,
    cadastral_number_y: number
}
type Unit = 'кв. см' | "кв. м" | 'кв. км'

export interface AreaPartType {
    area: number,
    unit_of_measurement: Unit
}
    
export interface AddressPartType {
    address: 'string'
}
export interface NumberQuestionPartType {
    number_quest: number
}