import { XVIZStreamLoader } from 'streetscape.gl';

const params = new URLSearchParams(window.location.search)

export default new XVIZStreamLoader({
  logGuid: params.get('fileName') || 'mock',
  bufferLength: 300,
  duration: 60,
  serverConfig: {
    // defaultLogLength: 60,
    serverUrl: 'ws://localhost:7001/ws'
  },
  worker: true,
  maxConcurrency: 4
})
