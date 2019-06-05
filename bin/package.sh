#!/bin/bash
# This tool requies Azure CLI 2.0 be be installed on the host
# https://docs.microsoft.com/en-gb/cli/azure/install-azure-cli

# DON'T USE THIS OPTION UNLESS TESTING
while getopts b: option
do
  case "${option}"
    in
      b) CIRCLE_BUILD_NUM=${OPTARG};;
    esac
done

containsElement () {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

BRANCHES=("master" "develop")
DIST_FOLDER="./dist"
DEPLOY_FOLDER="./.deploy"
UPLOADER_SCRIPT="./bin/uploader"
MODULE_NAME=$(node -p -e "require('./package.json').name")
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
GIT_REVISION=$(git rev-parse --short HEAD)
BLOB_NAME="${MODULE_NAME}-${CIRCLE_BUILD_NUM}.${GIT_REVISION}"
ZIP_FILENAME="${BLOB_NAME}.zip"
FILE_LOC="${DEPLOY_FOLDER}/${ZIP_FILENAME}"

mkdir -p ${DEPLOY_FOLDER}

echo "*************************************"
echo "Packaging"
echo "*************************************"
echo "Module: ${MODULE_NAME}"
echo "Version: ${PACKAGE_VERSION}"
echo "GIT Revision: ${GIT_REVISION}"
echo
echo "Creating package of ${DIST_FOLDER}:"

pushd $DIST_FOLDER
zip -r "${ZIP_FILENAME}" ./*
popd
mv "dist/${ZIP_FILENAME}" $DEPLOY_FOLDER

containsElement "$CIRCLE_BRANCH" "${BRANCHES[@]}"
if [ "$?" == 0 ]; then
  BRANCH_BLOB="${MODULE_NAME}-${CIRCLE_BRANCH}"
  BRANCH_FILE_LOC="$DEPLOY_FOLDER/${BRANCH_BLOB}.zip"
  cp "${FILE_LOC}" "${BRANCH_FILE_LOC}"
fi

echo
echo "Package created at:"
echo "${FILE_LOC}"
echo
echo "*************************************"
echo "Uploading package to Azure Storage"
echo "*************************************"
echo "file ${FILE_LOC}"
: 'node ${UPLOADER_SCRIPT} --file=${FILE_LOC} --module=${MODULE_NAME}'

containsElement "$CIRCLE_BRANCH" "${BRANCHES[@]}"
if [ "$?" == 0 ]; then
  echo "Uploading ${CIRCLE_BRANCH} tag"
  node ${UPLOADER_SCRIPT} --file=${BRANCH_FILE_LOC} --module=${MODULE_NAME}
fi
