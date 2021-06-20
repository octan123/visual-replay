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
export const XVIZ_FORMAT = Object.freeze({
  // Binary GLB enocded in Buffer/ArrayBuffer
  BINARY_GLB: 'BINARY_GLB',
  // Protobuf encoded in a Buffer/ArrayBuffer
  BINARY_PBE: 'BINARY_PBE',
  // JSON encoded in a Buffer/ArrayBuffer
  JSON_BUFFER: 'JSON_BUFFER',
  // JSON encoded in a String
  JSON_STRING: 'JSON_STRING',
  // XVIZ Object
  OBJECT: 'OBJECT'
});

export const XVIZ_MESSAGE_NAMESPACE = 'xviz';
export const XVIZ_GLTF_EXTENSION = 'AVS_xviz';
