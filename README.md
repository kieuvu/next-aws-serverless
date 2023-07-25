# NextJS-serverless

## Stack

- NodeJS, NextJS, Typescript, Serverless Framework...
- AWS: lambda, api gateway (rest) ,s3, dynamoDB, sqs, cloudformation, cognito, aurora serverless, cloudwatch...

# Deploy Guide

```bash
npm install -g serverless
serverless config credentials --provider aws --key your_aws_client_key  --secret your_aws_secret_key

npm install

cp serverless.dev.config.example.json serverless.dev.config.json
cp .env.example .env

sudo chmod u+x deploy.sh

./deploy.sh
```

> Updating...
