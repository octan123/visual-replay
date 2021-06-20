'use strict';

const Controller = require('egg').Controller;
const xvizData = require('./xvizData');
const fs = require('fs');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async map() {
    const { ctx } = this;
    const mapData = fs.readFileSync('outOP121501_map.json');
    ctx.body = JSON.parse(mapData);
  }

  async socket() {
    const { websocket } = this.ctx;
    console.log('client connected');

    const context = new xvizData();
    context.onConnection(websocket);

    websocket
      .on('message', (msg) => {
        console.log('receive', msg);
      })
      .on('close', (code, reason) => {
        console.log('websocket closed', code, reason);
      });
  }
}

module.exports = HomeController;
