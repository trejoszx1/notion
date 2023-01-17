require("dotenv").config();

const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function getTags() {
  const database = await notion.databases.retrieve({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  //console.log(database.properties.Selecioness.select) // VER ESPECIFICO SELECT
  //console.log("multi select",database.properties.multi.multi_select) // VER ESPECIFICO SELECT

  //console.log(notionPropertiesById(database.properties))

  return notionPropertiesById(database.properties)[
    process.env.NOTION_TAGS_ID
  ].multi_select.options.map((option) => {
    return { id: option.id, name: option.name };
  });
}

function notionPropertiesById(properties) {
  return Object.values(properties).reduce((obj, property) => {
    const { id, ...rest } = property;
    return { ...obj, [id]: rest };
  }, {});
}

function createSuggestion({ title, isProject, number, description, tags }) {
  notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID,
    },
    properties: {
      ///---Name---///
      [process.env.NOTION_TITLE_ID]: {
        title: [
          {
            type: "text",
            text: {
              content: title,
            },
          },
        ],
      },
      //            "Checkbox":{   // tiambien se puede usar con el nombre de la columna
      //              "rich_text": [{
      //                  type: 'text',
      //                  text:{
      //                  content: 'a'
      //                  }
      //                }
      //
      //            ],},
      [process.env.NOTION_DETALLES]: {
        rich_text: [
          {
            type: "text",
            text: {
              content: description,
            },
          },
        ],
      },
      [process.env.NOTION_STOCK_ID]: {
        checkbox: isProject,
      },
      [process.env.NOTION_NUMBER_ID]: {
        number: 0,
      },

      ///--Selection---///
      [process.env.NOTION_TAGS_ID]: {
        multi_select: tags.map((tag) => {
          return { id: tag.id };
        }),
      },
    },
  });
}

//getTags().then(res => console.log(res))

async function getSuggestions() {
  const notionPages = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    sorts: [
      {
        property: process.env.NOTION_NUMBER_ID,
        direction: "descending",
      },
    ],
  });

  return notionPages.results.map(fromNotionObject);
}

function fromNotionObject(notionPages) {
  const propertiesById = notionPropertiesById(notionPages.properties);
  return {
    id: notionPages.id,
    title: propertiesById[process.env.NOTION_TITLE_ID].title[0].plain_text,
    number: propertiesById[process.env.NOTION_NUMBER_ID].number,
    tags: propertiesById[process.env.NOTION_TAGS_ID].multi_select.map(
      (option) => {
        return { id: option.id, name: option.name };
      }
    ),
    isProject: propertiesById[process.env.NOTION_STOCK_ID].checkbox,
    description:
      propertiesById[process.env.NOTION_DETALLES].rich_text[0].text.content,
  };
}
async function upVoteSuggestion(pageId){
  const suggestion = await getSuggestion(pageId)
  const votes = suggestion.votes + 1
  await notion.pages.update({
    page_id: pageId,
    properties:{
      [process.env.NOTION_NUMBER_ID]: { number: votes }
    }
  })
  return votes
};

async function getSuggestion(pageId){
  return fromNotionObject(await notion.pages.retrieve({ page_id: pageId }))
}

module.exports = {
  createSuggestion,
  getTags,
  getSuggestions,
  upVoteSuggestion,
};

////------Send data--------////
//
//getTags().then(tags => {
// createSuggestion({
//    title:'david ',
//    numbers:100123123123,
//    stock: true,
//    detalles:'es un nina linda',
//    tags: tags,
//})()
//
//})
//

//https://www.youtube.com/watch?v=zVfVLBjQuSA
