import { CarMesh } from 'streetscape.gl';

export const MAPBOX_TOKEN = '';
export const MAP_STYLE = 'mapbox://styles/mapbox/light-v9';

export const CAR = CarMesh.sedan({
  length: 4.3,
  width: 2.2,
  height: 1.5,
  color: [160, 160, 160]
})

export const APP_SETTINGS = {
  viewMode: {
    type: 'select',
    title: 'View Mode',
    data: {TOP_DOWN: 'Top Down', PERSPECTIVE: 'Perspective', DRIVER: 'Driver'}
  },
  showTooltip: {
    type: 'toggle',
    titile: 'Show Tooltip'
  }
}

export const XVIZ_STYLE = {
  '/tracklets/objects': [{name: 'selected', style: { fill_color: '#ff8000aa'}}],
  '/lidar/points': [{style: {point_color_mode: 'ELEVATION'}}]
}