import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

import * as pipelines from 'aws-cdk-lib/pipelines';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import { PipelineAppStage } from './demoawspipeline-app-stack';

declare const codePipeline: codepipeline.Pipeline;

export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const auth = cdk.SecretValue.secretsManager('my-github-token')

    const democicdpipeline = new pipelines.CodePipeline(this, 'DemoPipeline', {
      synth: new pipelines.ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: pipelines.CodePipelineSource.gitHub(
          'Giskardmx/demoawspipeline',
          'main',
          {
            authentication: auth
          }
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    const testStage = democicdpipeline.addStage(new PipelineAppStage(this, 'test', {
      env: { account: '692485458325', region: 'us-east-2' }
    }));

    testStage.addPost(new pipelines.ManualApprovalStep('approval'));

    const prodStage = democicdpipeline.addStage(new PipelineAppStage(this, 'prod', {
      env: { account: '692485458325', region: 'us-east-2' }
    }));
    
  }
}
