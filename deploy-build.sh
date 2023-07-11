#!/bin/bash

BUILD_FOLDER=.dist

rm -rf .next

npm run-script build

rm -rf $BUILD_FOLDER
mv .next/standalone/ $BUILD_FOLDER/
cp -r .next/static $BUILD_FOLDER/.next
rm $BUILD_FOLDER/server.js
cp -r next.config.js $BUILD_FOLDER/
cp serverless.yaml $BUILD_FOLDER/
cp -r functions $BUILD_FOLDER/
cp server.ts $BUILD_FOLDER/
cp -r public $BUILD_FOLDER/
cd $BUILD_FOLDER

sls deploy

rm -rf $BUILD_FOLDER
