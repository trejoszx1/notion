const dotenv = require('dotenv').config();
const { Client } = require("@notionhq/client");
const { json } = require("stream/consumers");


// Init client
const token = process.env.NOTION_TOKEN
const databaseId = process.env.NOTION_DATABASE_ID


const notion = new Client({
    auth: token
});

///////////////////////
const listDatabases = async () => {
    const response = await notion.databases.retrieve({
        database_id: databaseId
        });
    console.log(response);
    
};

listDatabases()






const queryDatabases =  async () => {
    const payload = {
      path: `databases/${databaseId}/query`,
      method:'POST'
    }
    const { results } = await notion.request(payload)
    const data = results.map((page)=> {
      console.log(page.properties.Titulos.rich_text[0].text.content)

      return{
        id: page.id,
        title: page.properties.Name.title[0].text.content,
        select: page.properties.Selecioness.select,
        checkbox: page.properties.stock.checkbox,
        number: page.properties.Number.number

      }
    })

    return data
  }
  (async()=>{
    const nData = await queryDatabases()
    console.log(nData)
  })()
//https://www.youtube.com/watch?v=9JdP-S3crt8&t=816s