import axios from 'axios'

export async function getMapData(mapName) {
  // return axios.get(`/downloadapi/download/map/${mapName}.json`).then(data => {
    return axios.get(`http://127.0.0.1:7001/map`).then(data => {
      console.log('data', data);
    let sIndex = 0, dIndex = 0, pIndex = 0
    const mapData = {
      solidLines: [],
      dashedLines: [],
      pointLines: []
    }
    const POSITION_RATE = 1;
    const getLines = function (arr, key) {
      if (typeof (arr[0]) === 'string') {
        arr.forEach((item, index) => {
          if (item instanceof Array) {
            getLines(item, arr[index - 1])
          }
        })
      } else if (!!arr[0]?.x) {
        switch (key) {
          case 'SolidLine':
            mapData.solidLines.push({
              getWidth: d => 2,
              path: arr.map(i => [i.x / POSITION_RATE, i.y / POSITION_RATE]),
              name: 'SolidPathLayer' + sIndex,
              color: [255, 255, 255]
            })
            sIndex++
            break
          case 'BrokenLine':
            mapData.dashedLines.push({
              getWidth: d => 2,
              path: arr.map(i => [i.x / POSITION_RATE, i.y / POSITION_RATE]),
              name: 'DashedPathLayer' + dIndex,
              color: [255, 255, 255]
            })
            dIndex++
            break
          case 'Point':
            mapData.pointLines.push({
              getWidth: d => 2,
              path: arr.map(i => [i.x / POSITION_RATE, i.y / POSITION_RATE]),
              name: 'PointPathLayer' + pIndex,
              color: [255, 255, 255]
            })
            pIndex++
            break
        }
      }
    }
    getLines(data.data.Roads);
    return mapData;
  })
}