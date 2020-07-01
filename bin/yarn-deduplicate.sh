#!/bin/bash

function isWindows() {
  [[ $(uname -s) =~ .*(CYGWIN|MINGW32|MSYS|MINGW).* ]]
}

function list() {
  if isWindows; then
    yarn-deduplicate.cmd --list
  else
    yarn-deduplicate --list
  fi
}

function deduplicate() {
 if isWindows; then
    yarn-deduplicate.cmd
  else
    yarn-deduplicate
  fi
}

if [[ "$DEDUPLICATION_IN_PROGRESS" != "true" ]]; then
  PATH=$(yarn bin):$PATH
  LIST=$(list)

  if [[ "$LIST" =~ "Package " ]]; then
    export DEDUPLICATION_IN_PROGRESS="true"

    echo "yarn-deduplicate: lockfile..."

    deduplicate

    echo "yarn-deduplicate: packages..."

    yarn --frozen-lockfile --silent --no-progress

    echo "yarn-deduplicate: done."
  else
    echo "yarn-deduplicate: up-to-date."
  fi
fi
