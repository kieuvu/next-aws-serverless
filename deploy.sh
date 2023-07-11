#!/bin/bash

BUILD_FOLDER=.dist

cd $BUILD_FOLDER

sls deploy

rm -rf $BUILD_FOLDER
