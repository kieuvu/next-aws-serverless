#!/bin/bash

DISTRIBUTION_FOLDER=.dist
NEXT_CONFIG_FILE=next.config.js

rm -rf .next

sed -i 's/\/\/ assetPrefix/assetPrefix/' $NEXT_CONFIG_FILE
echo "Next Config:"
cat $NEXT_CONFIG_FILE

npm run-script build

rm -rf $DISTRIBUTION_FOLDER

mv .next/standalone/ $DISTRIBUTION_FOLDER/
cp -r .next/static $DISTRIBUTION_FOLDER/.next
rm $DISTRIBUTION_FOLDER/server.js

cp -r next.config.js $DISTRIBUTION_FOLDER/
sed -i 's/assetPrefix/\/\/ assetPrefix/' $NEXT_CONFIG_FILE

cp serverless.yaml $DISTRIBUTION_FOLDER/
cp server.ts $DISTRIBUTION_FOLDER/
cp queueWorker.ts $DISTRIBUTION_FOLDER/
cp -r public $DISTRIBUTION_FOLDER/

cd $DISTRIBUTION_FOLDER

# echo "Enter function name (Input blank to deploy all functions):"
# read DEPLOY_FUNCTION

# if [[ "$DEPLOY_FUNCTION" == "" ]]; then
  sls deploy
# else
#   sls deploy function -f "$DEPLOY_FUNCTION"
# fi

cd ..
rm -rf $DISTRIBUTION_FOLDER
