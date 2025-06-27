import { Request, Response } from "express"
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    PageOrientation,
    ISectionOptions,
    ISectionPropertiesOptions,
    ImageRun,
    BorderStyle,
    WidthType,
    Table, TableRow, TableCell
} from "docx";

import { generate_void } from "../services/generate_void_docoment"

import fs from "fs"

export interface GeneralInfoType {
    date: string,
    cadastral_number: string,
    area: string,
    address: string,
    number_questions: number,
    isShareWithCommon: boolean | string
}

interface VariousInfoType {
    fraction: 'в доле' | 'га',
    isRepresentative: boolean | string,
    name: string,
    name_representative: string,
    share_size: string,
    share_size_with_common_denominator: string,
    number_day: number |'____'
}

interface BodyType {
    general_info: GeneralInfoType,
    various_info: VariousInfoType[],
}

const imagePath = "./static/Vote.png";


class RedactController {
    public async postData(req: Request<{}, {}, BodyType>, res: Response): Promise<any> {
        try {
            const { general_info, various_info } = req.body;


            res.setHeader('Content-Type', 'application/json');
            const count: number = various_info.length
            //Валидация

            if (count > 300) return res.status(429).json({ message: "Превышен лимит бюллетеней" })

            if (general_info.date.length > 23) return res.status(400).json({ message: "Ошибка при указании даты" })
            if (general_info.cadastral_number.length < 15 || general_info.cadastral_number.length > 19) return res.status(400).json({ message: "Ошибка при вводе кадастрового номера" })
            if (general_info.area.length > 15 || general_info.area.length < 5) return res.status(400).json({ message: "Неверно указана площадь" })
            if(general_info.address.length > 146) return res.status(400).json({message: "Слишком длинный адрес"})


            for (let i: number = 0; i < various_info.length; i++) {
                if (various_info[i].name.length > 60) return res.status(400).json({ message: "Некорректное ФИО" })
                if (various_info[i].isRepresentative && various_info[i].name_representative.length > 60) return res.status(400).json({ message: "Некорректное ФИО представителя" })

                if (various_info[i].fraction === 'в доле') {
                    if (various_info[i].share_size.length > 18 || various_info[i].share_size.length < 3) return res.status(400).json({ message: "Некорректная доля" })
                } else {
                    if (various_info[i].share_size.length > 12 || various_info[i].share_size.length < 4) return res.status(400).json({ message: "Некорректная доля" })
                }
            }

            const pages: ISectionOptions[] = []

            function createPage(general_info: GeneralInfoType, various_info: VariousInfoType[], count: number) {

                let share_text: string = `(размер доли в праве) ${general_info.isShareWithCommon}`
                const name_representative_text: string =  `(представитель ${various_info[count].name_representative})`
                let size_address: number = 52


                if (various_info[count].fraction === 'га') {
                    share_text = "(размер доли в га)"
                } else {
                    share_text = `(размер доли в праве)`
                }

                if(general_info.address.length > 97) {
                    size_address = 46
                } else {
                    size_address = 52
                }

                pages.push(
                    {
                        properties: {
                            page: {
                                size: {
                                    width: 16838,
                                    height: 11906,
                                },
                                orientation: PageOrientation.LANDSCAPE,
                                margin: {
                                    top: 0,
                                    bottom: 720,
                                    left: 120,
                                    right: 120,
                                },
                            },
                        } as ISectionPropertiesOptions,

                        children: [
                            new Table({
                                columnWidths: [10000],
                                width: {
                                    size: 100,
                                    type: WidthType.PERCENTAGE,
                                },
                                rows: [
                                    new TableRow({
                            
                                        children: [
                                            new TableCell({
                                                      borders: {
                                                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                },
                                                shading: {
                                                    fill: "D3D3D3"
                                                },
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.LEFT,
                                                        children: [
                                                            new TextRun({
                                                                text: "БЮЛЛЕТЕНЬ ДЛЯ ГОЛОСОВАНИЯ",
                                                                size: 52,
                                                                font: "Times New Roman",
                                                                bold: true
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            new TableCell({
                                                    shading: {
                                                    fill: "D3D3D3"
                                                },
                                                      borders: {
                                                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                },
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.RIGHT,
                                                        children: [
                                                            new TextRun({
                                                                text: general_info.date,
                                                                font: "Times New Roman",
                                                                size: 52
                                                            }),
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: `${various_info[count].name}`,
                                        font: "Times New Roman",
                                        size: 56,
                                        bold: true
                                    })
                                ]
                            }),
                            new Paragraph({
                                alignment: AlignmentType.CENTER,
                                children: [
                                    new TextRun({
                                        text: various_info[count].isRepresentative == 'true' ? name_representative_text : '',
                                        font: "Times New Roman",
                                        size: 56,
                                        bold: true
                                    })
                                ]
                            })
                            ,
                            new Paragraph({
                                spacing: {
                                    before: 200
                                }
                            })
                            ,
                            new Table({
                                columnWidths: [10000],
                                width: {
                                    size: 100,
                                    type: WidthType.PERCENTAGE,
                                },
                                rows: [
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.LEFT,
                                                        children: [
                                                            new TextRun({
                                                                text: various_info[count].share_size,
                                                                font: "Times New Roman",
                                                                size: 42
                                                            })
                                                        ]
                                                    })
                                                ],
                                                borders: {
                                                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                },
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.CENTER,
                                                        children: [
                                                            new TextRun({
                                                                text: general_info.isShareWithCommon == 'true' ? various_info[count].share_size_with_common_denominator : ``,
                                                                font: "Times New Roman",
                                                                size: 42
                                                            })
                                                        ]
                                                    })
                                                ],
                                                borders: {
                                                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                },
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.RIGHT,
                                                        children: [
                                                            new TextRun({
                                                                text: "___________________________________",
                                                                size: 42
                                                            })
                                                        ]
                                                    })
                                                ],
                                                borders: {
                                                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                },
                                            }),
                                        ],
                                    }),
                                    new TableRow({
                                        children: [
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.LEFT,
                                                        children: [
                                                            new TextRun({
                                                                text: share_text,
                                                                font: "Times New Roman",
                                                                size: 32
                                                            })
                                                        ]
                                                    })
                                                ],
                                                borders: {
                                                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                },
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.CENTER,
                                                        children: [
                                                            new TextRun({
                                                                text: general_info.isShareWithCommon == 'true' ? "(доля с общим знаменателем)" : '',
                                                                font: "Times New Roman",
                                                                size: 32
                                                            })
                                                        ]
                                                    })
                                                ],
                                                borders: {
                                                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                },
                                            }),
                                            new TableCell({
                                                children: [
                                                    new Paragraph({
                                                        alignment: AlignmentType.RIGHT,
                                                        children: [
                                                            new TextRun({
                                                                text: "(фамилия И.О. лица, выдавшего бюллетень)",
                                                                size: 32
                                                            })
                                                        ]
                                                    })
                                                ],
                                                borders: {
                                                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                                                },
                                            }),
                                        ]
                                    })
                                ],
                            }),


                            new Paragraph({
                                spacing: {
                                    before: 200
                                }
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `на общем собрании участников долевой собственности на земельный участок с кадастровым номером ${general_info.cadastral_number} общей площадью ${general_info.area}, расположенный по адресу: ${general_info.address} `,
                                        font: "Times New Roman",
                                        size: size_address
                                    })
                                ]
                            }),

                            new Paragraph({
                                spacing: {
                                    before: 200
                                }
                            })
                            ,
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: `Номер вопроса повестки дня: ${various_info[count].number_day}`,
                                        bold: true,
                                        font: "Times New Roman",
                                        size: 49
                                    })
                                ]
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Результаты голосования по вопросу повестки дня:",
                                        bold: true,
                                        font: "Times New Roman",
                                        size: 49
                                    })
                                ]
                            }),
                            new Paragraph({
                                spacing: {
                                    before: 200
                                }
                            })
                            ,
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        data: fs.readFileSync(imagePath),
                                        type: 'png',
                                        transformation: {
                                            width: 800,
                                            height: 120
                                        }
                                    }),
                                ]
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "* укажите номер вопроса в соответствии с публикацией в СМИ",
                                        font: "Times New Roman",
                                        size: 46,
                                        italics: true
                                    }),
                                ]
                            }),
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "** поставьте свою подпись напротив Вашего решения по вопросу",
                                        font: "Times New Roman",
                                        size: 46,
                                        italics: true
                                    })
                                ],
                            })
                        ],
                    },
                )
            }


            for (let i: number = 0; i < count; i++) {
                createPage(general_info, various_info, i)
            }

      generate_void(general_info) !== undefined ?  pages.push(...generate_void(general_info)) : null

            const doc = new Document({
                sections: pages
            })

            const buffer = await Packer.toBuffer(doc);

            res.setHeader('Content-Disposition', `attachment; filename="bullet.docx`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.status(200).send(buffer);
        } catch (error) {
            res.status(500).json({ message: "Ошибка сервера" })
            console.log(error)
        }
    }
}

export const { postData } = new RedactController()