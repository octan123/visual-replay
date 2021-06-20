#!/bin/sh
#
# Copyright (c) 2019 Uber Technologies, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Automated tests

set -e

BASEDIR=$(dirname "$0")

GIT_FILTER="$BASEDIR/git-copyright-files.sh"

echo 'Running copyright header check'
git diff-index --diff-filter=AM --cached --name-only HEAD | grep -e '\.sh$' -e '\.js$' | xargs "$BASEDIR/git-copyright-files.sh"
