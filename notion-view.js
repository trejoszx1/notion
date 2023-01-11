const { Client } = require('@notionhq/client');
require('dotenv').config()

const notion = new Client({ auth: process.env.NOTION_TOKEN})

//read data to page
//--------------------///
async function getDatabase(){
    const response = await notion.databases.retrieve({

        database_id: process.env.NOTION_DATABASE_ID
    })
    console.log(response)
}

getDatabase()

