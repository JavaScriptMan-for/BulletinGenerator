import fs from 'fs'
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
import { GeneralInfoType } from "../controllers/redact.controller";

    function generate_void (general_info: GeneralInfoType): ISectionOptions[] {

            const void_pages: ISectionOptions[] = [];
            const imagePath = "./static/Vote.png";

            let size_address: number = 50;

               if(general_info.address.length > 97) {
                    size_address = 46
                } else {
                    size_address = 52
                }
                for(let i = 0; i < 4; i++) {
             void_pages.push(
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
                                                                            size: 58,
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
                                                                            size: 58
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
                                                    text: `___________________________________________________________`,
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
                                                    text: `___________________________________________________________`,
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
                                                                            text: '___________',
                                                                            font: "Times New Roman",
                                                                            size: 54
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
                                                                            text: general_info.isShareWithCommon == 'true' ? '____________________' : '',
                                                                            font: "Times New Roman",
                                                                            size: 54
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
                                                                            size: 54
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
                                                                            text: '(размер доли в праве)',
                                                                            font: "Times New Roman",
                                                                            size: 363
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
                                                                            size: 36
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
                                                                            size: 36
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
                                                    text: `Номер вопроса повестки дня: `,
                                                    bold: true,
                                                    font: "Times New Roman",
                                                    size: 49
                                                }),
                                                new TextRun({
                                                    text: "____",
                                                    bold: true,
                                                    font: "Times New Roman",
                                                    size: 54
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
        return void_pages
        } 
export default  generate_void 