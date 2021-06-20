const { XVIZUIBuilder } = require('@xviz/builder');

function getDeclarativeUI() {
  const builder = new XVIZUIBuilder({});
  builder.child(getMetricsPanel(builder));
  // TODO camera
  // TODO trajectory
  // TODO perception

  return builder;
}

function getMetricsPanel(builder) {
  const panel = builder.panel({
    name: 'Metrics'
  });

  const container = builder.container({
    name: 'Metrics Panel',
    layout: 'vertical',
  })

  const metricAcceleration = builder.metric({
    title: 'Acceleration',
    streams: ['/vehicle/acceleration'],
    description: 'The acceleration of the vehicle',
  })

  const metricVelocity = builder.metric({
    title: 'Velocity',
    streams: ['/vehicle/velocity'],
    description: 'The velocity of the vehicle',
  })

  const metricWheel = builder.metric({
    title: 'Wheel',
    streams: ['/vehicle/wheel_angle'],
    description: 'The angular rate of the vehicle',
  });

  container.child(metricAcceleration);
  container.child(metricVelocity);
  container.child(metricWheel);
  panel.child(container);

  return panel;
}

module.exports = getDeclarativeUI;