const dotenv = require('dotenv').config();
const { Client } = require("@notionhq/client");
const { json } = require("stream/consumers");


// Init client
const token = process.env.NOTION_TOKEN
const databaseId = process.env.NOTION_DATABASE_ID


const notion = new Client({
    auth: token
});

const listDatabases = async () => {
    const response = await notion.databases.retrieve({
        database_id: databaseId
        });
    console.log(response);
    
};

listDatabases()





  
