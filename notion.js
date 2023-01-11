const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN})


function createSuggestion({title, stock , numbers, detalles}){
    notion.pages.create({
        parent:{
            database_id: process.env.NOTION_DATABASE_ID
        },
        properties: {
//            [process.env.NOTION_TITLE_ID]:{
//                title:[{
//                    type: 'text',
//                    text:
//                    {
//                        content: title,
//                    },
//                },
//                ],
//            },
            [process.env.NOTION_DETALLES_ID]: {
                    rich_text: [
                      {
                        type: "text",
                        text: {
                          content: detalles,
                        },
                      },
                    ],
                },
//           [process.env.NOTION_STOCK_ID]:{
//                    checkbox: stock
//                    },
//            [process.env.NOTION_NUMBER_ID]:{
//                number: numbers
//                    },
//
        },
    })

}

createSuggestion({
    title:'Vanessa Heranadez',
    numbers:100123123123,
    stock: true,
    detalles:'es un nina linda',
})
//https://www.youtube.com/watch?v=zVfVLBjQuSA