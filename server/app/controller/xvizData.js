const fs = require('fs');
const xviz = require("@xviz/builder");
const getDeclarativeUI = require('./declarative-ui');

const XVIZBuilder = xviz.XVIZBuilder;
const XVIZMetadataBuilder = xviz.XVIZMetadataBuilder;

class xvizData {
  constructor(settings, metadata, allFrameData, loadFrameData) {
    this.VEHICLE_POSE = '/vehicle_pose';
    this.VEHICLE_ACCELERATION = '/vehicle/acceleration';
    this.VEHICLE_VELOCITY = '/vehicle/velocity';
    this.VEHICLE_TRAJECTORY = '/vehicle/trajectory';
    this.VEHICLE_WHEEL = '/vehicle/wheel_angle';
    this.VEHICLE_AUTONOMOUS = '/vehicle/automy_state';
  }

  // 根据pos和radian计算polygon四个角的坐标
  calculatePlygon(x, y, radian = 0, length = 4.5, width = 1.9) {
    const distance = Math.sqrt(Math.pow(length, 2) + Math.pow(width, 2)) / 2;
    const angle = Math.PI -  2 * Math.atan(length / 2 / (width / 2));
    const polygon1X = x + Math.cos(radian + angle / 2) * distance;
    const polygon1Y = y + Math.sin(radian + angle / 2) * distance;
    const polygon3X = x - Math.cos(radian + angle / 2) * distance;
    const polygon3Y = y - Math.sin(radian + angle / 2) * distance;
    const polygon2X = x + Math.cos(radian - angle / 2) * distance;
    const polygon2Y = y + Math.sin(radian - angle / 2) * distance;
    const polygon4X = x - Math.cos(radian - angle / 2) * distance;
    const polygon4Y = y - Math.sin(radian - angle / 2) * distance;
    return [[polygon1X, polygon1Y], [polygon2X, polygon2Y], [polygon3X, polygon3Y], [polygon4X, polygon4Y]];
  }

  sendMetaData = async (fileName) => {
    const jsondata = await fs.readFileSync('template-41.json');
    const autoCar = JSON.parse(jsondata).Vehicles[1];
    const obstacleCar = JSON.parse(jsondata).Vehicles[0];
    const timeLog = autoCar.pos[autoCar.pos.length - 1].timestamp;
    
    const xvizMetaBuilder = new XVIZMetadataBuilder();
    xvizMetaBuilder
      .startTime(0)
      .endTime(timeLog)

      .stream('/vehicle_pose')
      .category('pose')

      .stream(this.VEHICLE_ACCELERATION)
      .category('timeSeries')
      .type('float')
      .unit('m/s^2')

      .stream(this.VEHICLE_VELOCITY)
      .category('timeSeries')
      .type('float')
      .unit('km/h')

      .stream(this.VEHICLE_WHEEL)
      .category('timeSeries')
      .type('float')
      .unit('deg/s')

      // 轨迹
      // .stream('/object/tracking_point')
      // .category('PRIMITIVE')
      // .type('CIRCLE')
      // .coordinate('VEHICLE_RELATIVE')
      // .streamStyle({
      //   fill_color: '#fb0'
      // })

      .stream('/object/shape')
      .category('PRIMITIVE')
      .type('POLYGON')
      .coordinate('IDENTITY')
      .streamStyle({
        fill_color: '#008000',
        height: 1.5,
        extruded: true,
      });

    xvizMetaBuilder.ui(getDeclarativeUI());

    const envelopdMsg = {
      type: 'xviz/metadata',
      data: xvizMetaBuilder.getMetadata(),
    }

    const metaData = JSON.stringify(envelopdMsg);
    this.ws.send(metaData, { compress: true });

    const lenght = 2;
    const width = 4;
    
    obstacleCar.pos.forEach((element, index) => {
      const timestamp = element['timestamp'];
      const xvizBuilder = new XVIZBuilder();
      const posX = element.x;
      const posY = element.y;
      
      // 直接相加减计算坐标存在问题，没有考虑航向，导致障碍车车头角度不会变化
      // const polygon1 = [posX - lenght/2, posY - width/2, 0];
      // const polygon2 = [posX - lenght/2, posY + width/2, 0];
      // const polygon3 = [posX + lenght/2, posY + width/2, 0];
      // const polygon4 = [posX + lenght/2, posY - width/2, 0];
      const polygonPos = this.calculatePlygon(posX, posY, element.radian);

      xvizBuilder
        .pose('/vehicle_pose')
        .timestamp(timestamp)
        .mapOrigin(0, 0, 0) // 如需修改，客户端中地图coordinateOrigin需同步修改，复杂车辆和地图将无法匹配
        // .position(0, 0, 0)
        // .mapOrigin(114.064855, 22.672703, 0)
        .position(autoCar.pos[index].x, autoCar.pos[index].y, 0)
        .orientation(0, 0, autoCar.pos[index].radian);

      xvizBuilder
        .timeSeries(this.VEHICLE_ACCELERATION)
        .timestamp(timestamp)
        .value(autoCar.pos[index].acceleration);

      xvizBuilder
        .timeSeries(this.VEHICLE_VELOCITY)
        .timestamp(timestamp)
        .value(autoCar.pos[index].velocity);

      xvizBuilder
        .timeSeries(this.VEHICLE_WHEEL)
        .timestamp(timestamp)
        .value(autoCar.pos[index].angle);

      xvizBuilder
        .timeSeries('/velocity')
        .timestamp(timestamp)
        .value(autoCar.pos[index].velocity);

      // xvizBuilder
      //   .primitive('/object/tracking_point')
      //   .circle([0, 0, 0], 2)
      //   .style({
      //     fill_color: '#048'
      //   })

      xvizBuilder
        .primitive('/object/shape')
        .polygon(polygonPos)
        .id('object-1')
        .style({ fill_color: '#FF0000' });

      const msg = {
        type: 'xviz/state_update',
        data: xvizBuilder.getMessage(),
      }
      const data = JSON.stringify(msg);
      this.ws.send(data, { compress: true });
    });
  }

  onConnection = (ws, fileName) => {
    console.log('> Connection from Client');
    this.t_start_time = process.hrtime();
    this.ws = ws;
    // ws.on('messge', msg => this.onMessage(msg))
    this.sendMetaData(fileName);
  }

  onClose(event) {
    this.log(`> Connection Closed. Code: ${event.code} Reason:${event.reason}`)
  }
}

module.exports = xvizData;