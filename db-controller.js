'use strict'

let paths = {
    'get'      : "select name from msgs.users limit 1;",
    'specific' : "select * from msgs.users where name = $1;",
    'create'   : "insert into msgs.users (name) values ($1);",
    'update'   : "update msgs.users set name = $2 where id = $1;",
    'delete'   : "delete from msgs.users where id = $1;"
}

exports.rule = (args) => {
  let commands = args.split("-")
  commands[1] = (commands[1].trim()).split(",")

  return [paths[ commands[0] ] , commands[1]]
}
// bot.sendMessage(chatID, convertida.toString().split(",").join(""));
