const { Pool } = require('pg');
const { DB } = require('./../config');

const { Markup } = require('telegraf');
const { getIcon } = require('./utils')

const pool = new Pool(DB);

const location = async (ctx) => {
  if (ctx.message.location) {
    try {
      let arr = [], string = ''
      let results = await pool.query(`
        SELECT 
          id, type, title
        FROM 
          objects
        WHERE 
         ST_DWithin(way::geography, ST_MakePoint(${ctx.message.location.longitude}, ${ctx.message.location.latitude})::geography, 10000);
        `
      )
      console.log(sql);
      results.rows.forEach((value, index) => {
        string += `\n${getIcon(value.type)} ${index + 1}.${value.title}`
        arr.push(Markup.button.callback(index + 1, `object_#${value.id}#${index}`))
      })
      
      ctx.reply(`Yaqin atrofdagi stadionlar \n${string}\n`, Markup.inlineKeyboard(arr, { columns: 4 }).resize())
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { location };