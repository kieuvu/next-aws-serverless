#!/bin/bash

DISTRIBUTION_FOLDER=.dist
NEXT_CONFIG_FILE=next.config.js

rm -rf .next
rm -rf $DISTRIBUTION_FOLDER

# sed -i 's/\/\/ assetPrefix/assetPrefix/' $NEXT_CONFIG_FILE
# echo "Next Config:"
# cat $NEXT_CONFIG_FILE

root='.'  # Project root
lib="${root}/node_modules/serverless-offline-sqs/src/sqs.js"

if grep -q patched "$lib"; then
  echo sqs.js already patched
else
  echo sqs.js is missing the patch, applying...
  sed -i "s|const sqsEvent = new SQSEventDefinition|// patched\n    const {queueName} = this.options;\n\n    if (queueName) rawSqsEventDefinition.queueName = queueName;\n\n    const sqsEvent = new SQSEventDefinition|" "$lib"
  echo done
fi

docker run -p 4566:4566 -d --restart unless-stopped localstack/localstack

sls dynamodb install

yarn build

rm -rf $DISTRIBUTION_FOLDER

mv .next/standalone/ $DISTRIBUTION_FOLDER/
cp -r .next/static $DISTRIBUTION_FOLDER/.next
rm $DISTRIBUTION_FOLDER/server.js

cp -r next.config.js $DISTRIBUTION_FOLDER/
# sed -i 's/assetPrefix/\/\/ assetPrefix/' $NEXT_CONFIG_FILE

cp -r .dynamodb $DISTRIBUTION_FOLDER/

cp serverless.yaml $DISTRIBUTION_FOLDER/
cp serverless.dev.config.json $DISTRIBUTION_FOLDER/
cp server.ts $DISTRIBUTION_FOLDER/
cp fetchTest.js $DISTRIBUTION_FOLDER/
cp s3cors.xml $DISTRIBUTION_FOLDER/
cp queueWorker.ts $DISTRIBUTION_FOLDER/
cp -r public $DISTRIBUTION_FOLDER/

cd $DISTRIBUTION_FOLDER

# echo "Enter function name (Input blank to deploy all functions):"
# read DEPLOY_FUNCTION

# if [[ "$DEPLOY_FUNCTION" == "" ]]; then
  sls offline start --verbose --useInProcess
# else
#   sls deploy function -f "$DEPLOY_FUNCTION"
# fi

cd ..
