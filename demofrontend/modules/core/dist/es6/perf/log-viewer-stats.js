import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React from 'react';
import { MetricCard, MetricChart } from '@streetscape.gl/monochrome';
import { HISTORY_SIZE, STATS_NAMES, STYLES, STATS_KEYS, STATS_COLORS, DEFAULT_STATS_TITLE, STATS_HELP, INITIAL_STATS } from './constants';

const Help = () => {
  const help = [];

  for (const [statName, statHelp] of Object.entries(STATS_HELP)) {
    help.push(React.createElement("div", {
      key: statName,
      style: {
        marginBottom: 10
      }
    }, React.createElement("strong", null, STATS_NAMES[statName]), React.createElement("div", null, statHelp)));
  }

  return React.createElement("div", {
    style: STYLES.LOG_VIEWER.STATS_HELP
  }, help);
};

const _updateStats = (stats, statsSnapshot) => {
  stats.counter += 1;

  for (const statName of Object.values(STATS_KEYS)) {
    if (stats[statName].length >= HISTORY_SIZE) {
      stats[statName] = stats[statName].slice(1);
    }

    const newStatValue = {
      x: stats.counter,
      y: statsSnapshot && statsSnapshot[statName] || 0
    };
    stats[statName].push(newStatValue);
  }

  return stats;
};

export class LogViewerStats extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      stats: INITIAL_STATS
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.statsSnapshot !== this.props.statsSnapshot) {
      const stats = _updateStats(this.state.stats, nextProps.statsSnapshot);

      this.setState({
        stats
      });
    }
  }

  render() {
    const _this$state$stats = this.state.stats,
          {
      counter
    } = _this$state$stats,
          data = _objectWithoutProperties(_this$state$stats, ["counter"]);

    const title = this.props.title || DEFAULT_STATS_TITLE;
    return React.createElement("div", {
      id: "stats",
      style: STYLES.LOG_VIEWER.STATS
    }, React.createElement(MetricCard, {
      title: title,
      description: React.createElement(Help, null),
      style: STYLES.LOG_VIEWER.METRIC_CARD
    }, React.createElement(MetricChart, {
      width: 350,
      height: 200,
      data: data,
      highlightX: counter,
      getColor: statKey => STATS_COLORS[statKey],
      formatTitle: statKey => STATS_NAMES[statKey]
    })));
  }

}
//# sourceMappingURL=log-viewer-stats.js.map