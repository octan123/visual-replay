import React, { useEffect, useState } from 'react';
import {
  LogViewer, 
  VIEW_MODE, 
  XVIZPanel,
  StreamSettingsPanel,
  PlaybackControl,
  TurnSignalWidget,
  TrafficLightWidget,
  MeterWidget,
} from 'streetscape.gl'
import { Form } from '@streetscape.gl/monochrome';
import { PathLayer } from '@deck.gl/layers';
import { PathStyleExtension } from '@deck.gl/extensions';
import { COORDINATE_SYSTEM } from '@deck.gl/core'

import { 
  CAR, 
  APP_SETTINGS, 
  XVIZ_STYLE, 
} from './constants';
import { getMapData } from './lib';

import logo from './logo.svg';
import './App.css';

const logLoader = require('./log-from-stream').default;



function App() {
  const [log, setLog] = useState(logLoader);
  const [settings, setSettting] = useState({
    viewMode: 'PERSPECTIVE',
    showTooltip: false,
  })
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    async function getData(){
      const params = new URLSearchParams(window.location.search);      
      const mapData = await getMapData(params.get('mapName'));
      const temp1 = new PathLayer({
        coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: [0, 0, 0],
        id: 'path-layer-solid',
        widthUnits: 'pixels',
        rounded: true,
        data: mapData.solidLines,
        getColor: d => [80, 88, 98]
      });
      const temp2 = new PathLayer({
        coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        coordinateOrigin: [0, 0, 0],
        id: 'path-layer-dashed',
        widthUnits: 'pixels',
        rounded: true,
        data: mapData.dashedLines,
        getColor: d => [80, 88, 98],
        getDashArray: [120, 300],
        dashJustified: true,
        extensions: [new PathStyleExtension({ dash: true, highPrecisionDash: true })]
      });
      let layers = [
        // 高精地图图层
        temp1,
        temp2,
        // new PathLayer({
        //   coordinateSystem: COORDINATE_SYSTEM.METER_OFFSETS,
        //   coordinateOrigin: [0, 0, 0],
        //   id: 'path-layer-lanes',
        //   widthUnits: 'pixels',
        //   rounded: true,
        //   data: mapData.pointLines,
        //   getColor: d => [80, 88, 98]
        // })
      ]
      setLayers(layers);
    }
    getData();
    log.on('error', console.error).connect();
  }, []);

  const settingChange = (value) => {
    setSettting({
      ...settings, ...value
    })
  }

  const _onSeek = (timestamp) => {
    // return true;
    // console.log('log', log.getLogEndTime());
    // 自动停止，否则会不停地循环播放
    if(timestamp >= Math.floor(log.getLogEndTime()) - 1) {
      return true;
    }
  }

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div id='container'>
      <div id='control-panel'>
        <XVIZPanel log={log} name='Metrics' />
        <hr />
        <XVIZPanel log={log} name='Camera' />
        <hr />
        <Form 
          data={APP_SETTINGS}
          values={settings}
          onChange={settingChange}
        />
        <StreamSettingsPanel log={log} />
      </div>
      <div id="log-panel">
        <div id="map-view">
          <LogViewer
            log={log}
            car={CAR}
            xvizStyles={XVIZ_STYLE}
            showTooltip={settings.showTooltip}
            viewMode={VIEW_MODE[settings.viewMode]}
            showMap={false}
            customLayers={layers}
          />
          <div id="hud">
            <TurnSignalWidget log={log} streamName="/vehicle/turn_signal" />
            <hr />
            <TrafficLightWidget log={log} streamName="/vechicle/traffic_light" />
            <hr />
            <MeterWidget
              log={log}
              streamName="/vehicle/acceleration"
              label="Acceleration"
              min={-3}
              max={3}
            />
            <hr />
            <MeterWidget
              log={log}
              streamName="/vehicle/velocity"
              label="Speed"
              getWarning={x => (x > 6 ? 'FAST': '')}
              min={0}
              max={20}
            />
          </div>
        </div>
        <div id='timeline'>
          <PlaybackControl
            width="100%"
            log={log}
            onSeek={_onSeek}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
