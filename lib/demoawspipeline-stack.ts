import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

import * as pipelines from 'aws-cdk-lib/pipelines';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';

declare const codePipeline: codepipeline.Pipeline;

export class DemoawspipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const sourceArtifact = new codepipeline.Artifact('MySourceArtifact');

    const democicdpipeline = new pipelines.CodePipeline(this, 'DemoPipeline', {
      synth: new pipelines.ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: pipelines.CodePipelineSource.gitHub(
          'Giskardmx/demoawspipeline',
          'main'
        ),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });
    // example resource
    // const queue = new sqs.Queue(this, 'DemoawspipelineQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
