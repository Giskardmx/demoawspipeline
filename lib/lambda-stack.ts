import * as cdk from 'aws-cdk-lib/core';
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class lambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const demoLambda = new lambda.Function(this, 'MyLambdaFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,
            handler: 'index.handler',
            code: lambda.Code.fromInline('exports.handler = _ => "Hello CDK!";')
        });
    }
}