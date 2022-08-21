const { Pool } = require('pg');
const { DB } = require('./../config');
const { Markup, Telegraf } = require('telegraf');

const { BOT_TOKEN } = require('./../config');
const bot = new Telegraf(BOT_TOKEN);

const Promise = require('bluebird');

const pool = new Pool(DB);

const { getIcon } = require('./utils')

const object = async (ctx) => {
  const objectId = ctx.match.input.split('#')[1]
  const order = ctx.match.input.split('#')[2]
  try {
    const result = await pool.query(`SELECT * FROM objects WHERE id = ${objectId}`)
    ctx.reply(`\n${getIcon(result.rows[0].type)} ${order}.${result.rows[0].title}\n🌎 ${result.rows[0].address}.\n🎯 ${result.rows[0].target}.\n📞 ${result.rows[0].phone_number}.\n💰 ${result.rows[0].cost} so'm.\nℹ ${result.rows[0].description}`, Markup.inlineKeyboard([
      Markup.button.callback('🌎', `map_#${objectId}`),
      Markup.button.callback('📷', `picture_#${objectId}`),
    ]))
  } catch (err) {
    console.log(err);
  }
}

const map = async (ctx) => {
  const stadiumId = ctx.match.input.split('#')[1]
  try {
    const result = await pool.query(`SELECT coordinates FROM objects WHERE id = ${stadiumId}`)
    ctx.replyWithLocation(result.rows[0].coordinates[0], result.rows[0].coordinates[1])
  } catch (err) {
    console.log(err);
  }
}

const picture = async (ctx) => {
  const stadiumId = ctx.match.input.split('#')[1];
  try {
    const result = await pool.query(`
      SELECT 
        file_id 
      FROM 
        objects o
      JOIN
        pictures p ON p.id = ANY (picture_ids)
      WHERE o.id = ${stadiumId}
    `)
    
    let arr = []
    if (result.rows.length) {
      await Promise.mapSeries(result.rows, async (value) => {
        let url = await bot.telegram.getFileLink(value.file_id)
        arr.push({
          type: 'photo',
          media: {
            url
          }
        })
      })
    }
    
    ctx.replyWithMediaGroup(arr)
  } catch (err) {
    console.log(err);
  }
}

module.exports = { object, map, picture }