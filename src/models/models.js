(async () => {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter:{
            or: [
                {
                    property: 'In stock',
                    checkbox:{
                        equals: true,
                    },
                }
            ],
        } ,
        sorts:[
            {
                property: 'Last ordered',
                direction:'ascending',
            },
        ],
        });
    console.log(response);
  })();



const = dataa [

  {
    object: 'database',
  id: '22313192-28b7-494a-abfb-c450a6ee7623',
  cover: {
    type: 'external',
    external: { url: 'https://www.notion.so/images/page-cover/webb3.jpg' }
  },
  icon: null,
  created_time: '2023-01-04T15:12:00.000Z',
  created_by: { object: 'user', id: 'ad0d3175-4245-4350-9ffd-f0eb5734a4cb' },
  last_edited_by: { object: 'user', id: 'ad0d3175-4245-4350-9ffd-f0eb5734a4cb' },
  last_edited_time: '2023-01-07T14:05:00.000Z',
  title: [
    {
      type: 'text',
      text: [Object],
      annotations: [Object],
      plain_text: 'Book Details',
      href: null
    }
  ],
  description: [],
  is_inline: false,
  properties: {
    'In stock': {
      id: '%5CD%3Ag',
      name: 'In stock',
      type: 'checkbox',
      checkbox: {}
    },
    Titulos: {
      id: 'f%3BN%7C',
      name: 'Titulos',
      type: 'rich_text',
      rich_text: {}
    },
    Selecioness: {
      id: 'g%5Dzy',
      name: 'Selecioness',
      type: 'select',
      select: [Object]
    },
    'Const of next trip': {
      id: 'r%3FNY',
      name: 'Const of next trip',
      type: 'number',
      number: [Object]
    },
    Name: { id: 'title', name: 'Name', type: 'title', title: {} }
  },
  parent: { type: 'workspace', workspace: true },
  url: 'https://www.notion.so/2231319228b7494aabfbc450a6ee7623',
  archived: false
}
  ]
