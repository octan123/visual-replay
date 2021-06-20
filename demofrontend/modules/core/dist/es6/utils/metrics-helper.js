const getX = d => d.time;

const variableNullFilter = value => value !== undefined;

function getTimeSeriesForStream(streamName, metadata, stream, target) {
  if (metadata.nograph) {
    return;
  }

  const mapper = metadata.valueMap;
  const scale = metadata.scale || 1;
  const getY = mapper ? d => mapper[d.variable] : d => d.variable * scale;
  const sampleDatum = stream.find(variableNullFilter);

  if (!sampleDatum || !Number.isFinite(getY(sampleDatum))) {
    return;
  }

  target.isLoading = false;
  target.getX = getX;
  target.getY = getY;
  target.unit = metadata.unit || '';
  target.data[streamName] = stream.filter(variableNullFilter);
}

export function getTimeSeries({
  streamsMetadata = {},
  streamNames,
  streams
}) {
  const timeSeries = {
    isLoading: true,
    data: {},
    missingStreams: []
  };

  for (const streamName of streamNames) {
    const streamMetadata = streamsMetadata && streamsMetadata[streamName] || {};
    const stream = streams[streamName];

    if (stream) {
      getTimeSeriesForStream(streamName, streamMetadata, stream, timeSeries);
    }
  }

  timeSeries.missingStreams = streamNames.filter(streamToDisplay => !timeSeries.data[streamToDisplay]);
  return timeSeries;
}
//# sourceMappingURL=metrics-helper.js.map