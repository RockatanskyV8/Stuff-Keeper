
const TelegramBot = require( `node-telegram-bot-api` )

const controller  = require( './db-controller' )
const { Client } = require('pg');
const connectionString = 'postgres://postgres:@localhost:5432/mssg';
const client = new Client({ connectionString: connectionString });
client.connect();

let paths = {
    'get'      : "select id || ' - ' || name as nfo from msgs.users order by id;",
    'specific' : "select * from msgs.users where name = $1;",
    'create'   : "insert into msgs.users (name) values ($1);",
    'update'   : "update msgs.users set name = $2 where id = $1;",
    'delete'   : "delete from msgs.users where id = $1;"
}

const bot = new TelegramBot( '1034299915:AAEmklqTtBXpoME_bI57Fb34fkQnMlLPXuo', { polling: true } )

bot.onText(/Get/, (msg) => {
  let chatID = msg.chat.id;
  console.log(chatID)
  let query  = paths[(msg.text).toLowerCase()];
  client.query(query, (err, res) => { let x;
                                      for(x in res['rows']){ bot.sendMessage(chatID, res['rows'][x]['nfo']) }
  });
});

bot.onText(/P [0-9]+l \- [0-9\,]+ \- [0-9]+/, (msg) => {
  let chatID = msg.chat.id;
  let regex = '/([0-9]+l) \- ([0-9\,]+) \- ([0-9]+)/g'.exec(msg.text)
  // let text = (msg.text).replace("P ", "").split(" - ");


  console.log(regex)
});
