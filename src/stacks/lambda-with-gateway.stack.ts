import { join } from 'path'
import { App, Stack, StackProps } from '@aws-cdk/core'
import { LambdaWithGateway } from '../constructs/lambda-with-gateway.construct'

export interface LambdaWithGatewayStackProps extends StackProps {
  lambdaCodePath: string;
  lambdaHandler?: string;
  lambdaTimeout?: number;
}

export class LambdaWithGatewayStack extends Stack {
  constructor(scope: App, id: string, props: LambdaWithGatewayStackProps) {
    super(scope, id, props)

    const { lambdaCodePath, lambdaHandler = 'dist/lambda.handler', lambdaTimeout } = props

    const lambda = new LambdaWithGateway(this, id, {
      path: lambdaCodePath,
      handler: lambdaHandler,
      timeout: lambdaTimeout,
    })

    console.log('ARN lambda', { lambda: lambda.functionArn })

    // queueReader.authorize(write, lambda)

    // should create a RDS and link the lambda as write access to it
    // creer un autre repo de deploiement
  }
}
