import { Request, Response } from "express";
import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    PageOrientation,
    ISectionPropertiesOptions,
    ImageRun,
    UnderlineType,
    TabStopType,
} from "docx";
import fs from "fs"


const imagePath = "./static/Vote.png";

//  Читаем файл изображения в виде буфера



class MainController {
    async getMain(req: Request, res: Response) {
        try {
const doc = new Document({
    sections: [
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
                new Paragraph({
                    tabStops: [
                        {
                            type: TabStopType.RIGHT,
                            position: 9072, //  Примерная позиция табуляции (половина ширины страницы в twips)
                        },
                    ],
                    children: [
                        new TextRun({
                            text: "БЮЛЛЕТЕНЬ ДЛЯ ГОЛОСОВАНИЯ",
                            font: "Times New Roman",
                            size: 52,
                            bold: true,
                            highlight: "lightGray"
                        }),
                        new TextRun({
                            text: "\t\t\t\t      18 апреля 2025 года", //  Добавляем табуляцию перед текстом
                            font: "Times New Roman",
                            size: 52,
                            highlight: "lightGray"
                        }),
                    ],
                }),
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: "Миневский Иван Александрович",
                            font: "Times New Roman",
                            size: 56,
                            bold: true
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
                        tabStops: [
                        {
                            type: TabStopType.RIGHT,
                            position: 6072, //  Примерная позиция табуляции (половина ширины страницы в twips)
                        },
                    ],
                    children: [
                        new TextRun({
                            text: "243225/398325\t                      ",
                            font: "Times New Roman",
                            size: 42
                        }),
                        new TextRun({
                            text: '729675/1194975\t',
                            font: "Times New Roman",
                            size: 42
                        }),
                        new TextRun({
                            text: '\t\t',
                            font: "Times New Roman",
                            size: 42
                        }),
                        new TextRun({
                            text: '\t\t\t\t\t\t\t\t\t      ',
                            underline: {
                                type: UnderlineType.SINGLE,
                            }
                        })
                    ]
                }),
                new Paragraph({
                        tabStops: [
                        {
                            type: TabStopType.RIGHT,
                            position: 6072, //  Примерная позиция табуляции (половина ширины страницы в twips)
                        },
                    ],
                    children: [
                        new TextRun({
                            text: "(размер доли в праве)\t                      ",
                            font: "Times New Roman",
                            size: 28
                        }),
                        new TextRun({
                            text: '(размер доли с общим знаменателем)\t',
                            font: "Times New Roman",
                            size: 28
                        }),
                        new TextRun({
                            text: '                (фамилия И.О. лица, выдавшего бюллетень)',
                            font: "Times New Roman",
                            size: 28
                        })
                    ]
                }),
                new Paragraph({
                    spacing: {
                        before: 300
                    }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `на общем собрании участников долевой собственности на земельный участок с кадастровым номером 31:09:0000000:1354 общей площадью 
                            3 983 250 кв. м, расположенный по адресу: Белгородская область, Корочанский район. `,
                            font: "Times New Roman",
                            size: 52
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
                            text: "Номер вопроса повестки дня: 1",
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
                        }),
                    ]
                })
            ],
        },
    ],
});


            const buffer = await Packer.toBuffer(doc);

            res.setHeader('Content-Disposition', 'attachment; filename="ballot.docx"');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.send(buffer);

        } catch (error) {
            console.error("Error generating document:", error);
            res.status(500).send("Error generating document");
        }
    }
}

export const { getMain } = new MainController();