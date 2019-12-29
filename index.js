
const TelegramBot = require( `node-telegram-bot-api` )
const controller  = require( './db-controller' )
const { Client } = require('pg');
const connectionString = 'postgres://postgres:@localhost:5432/mssg';

const client = new Client({ connectionString: connectionString });
client.connect();

const bot = new TelegramBot( '1034299915:AAEmklqTtBXpoME_bI57Fb34fkQnMlLPXuo', { polling: true } )

bot.on('message', (msg) => {
  const chatID = msg.chat.id;
  const a = (msg.text).split(' - ')

  client.query(controller.rule(a), function (err, result) {
    if (err) { console.log(err); }
    let convertida = (result.rows).map(function(obj) {
      return Object.keys(obj).map(function(chave) {
          return obj[chave] + "\n";
      })[0];
    });
    bot.sendMessage(chatID, convertida.toString().split(",").join(""));
  });
});
