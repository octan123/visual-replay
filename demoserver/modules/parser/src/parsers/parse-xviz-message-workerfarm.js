// Copyright (c) 2019 Uber Technologies, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/* global Blob, URL */
import {WorkerFarm} from '../utils/worker-utils';
import {getXVIZConfig, subscribeXVIZConfigChange} from '../config/xviz-config';
import streamDataWorker from '../../dist/workers/stream-data.worker.js';

const workerFarm = {};

export function getWorkerFarm(id = 'default') {
  return workerFarm[id];
}

// Mainly for testing
export function destroyWorkerFarm() {
  Object.keys(workerFarm).forEach(id => {
    if (workerFarm[id]) {
      workerFarm[id].destroy();
      delete workerFarm[id];
    }
  });
}

export function initializeWorkerFarm({
  worker,
  maxConcurrency = 4,
  capacity = null,
  id = 'default'
}) {
  if (!workerFarm[id]) {
    const xvizConfig = {...getXVIZConfig()};
    delete xvizConfig.preProcessPrimitive;
    let workerURL;

    if (typeof worker === 'string') {
      // worker is an URL
      workerURL = worker;
    } else {
      // use default worker
      const blob = new Blob([streamDataWorker], {type: 'application/javascript'});
      workerURL = URL.createObjectURL(blob);
    }

    workerFarm[id] = new WorkerFarm({
      id,
      workerURL,
      maxConcurrency,
      capacity,
      initialMessage: {xvizConfig}
    });
  }
}

export function updateWorkerXVIZVersion() {
  Object.keys(workerFarm).forEach(id => {
    if (workerFarm[id]) {
      const xvizConfig = {...getXVIZConfig()};
      delete xvizConfig.preProcessPrimitive;

      workerFarm[id].broadcast({xvizConfig});
    }
  });
}

// Subscribe to XVIZConfig changes so we can
// update WebWorkers to adapt to XVIZ version changes
subscribeXVIZConfigChange(updateWorkerXVIZVersion);
