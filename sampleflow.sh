BUCKET=my.bucket
EMAIL=emailaddress@example.com
PASS=mypassword
SECRET=mysecret

rm -f deploy.yaml
aws s3 rm s3://${BUCKET}
aws s3 mb s3://${BUCKET}
aws cloudformation package --template-file Project/template.yaml --output-template-file deploy.yaml --s3-bucket ${BUCKET}
aws cloudformation deploy --template-file deploy.yaml --capabilities CAPABILITY_NAMED_IAM --stack-name TheBedPassProxy --parameter-overrides email=${EMAIL} password=${PASS} secret=${SECRET}
