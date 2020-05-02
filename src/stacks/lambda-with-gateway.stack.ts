import { App, Stack, StackProps } from '@aws-cdk/core'
import { LambdaWithGateway } from '../constructs/lambda-with-gateway.construct'
import { LambdaProps } from '../constructs/lambda.construct'

export interface LambdaWithGatewayStackProps extends StackProps {
  lambdaProps: LambdaProps;
}

export class LambdaWithGatewayStack extends Stack {
  constructor(scope: App, id: string, props: LambdaWithGatewayStackProps) {
    const { lambdaProps } = props
    super(scope, id, { lambdaProps, ...props })

    console.log({ props })
    console.log({ lambdaProps })
    const test = { lambdaProps, ...props }
    console.log({ test })

    const lambda = new LambdaWithGateway(this, id, lambdaProps)

    console.log('ARN lambda', { lambda: lambda.functionArn })

    // queueReader.authorize(write, lambda)

    // should create a RDS and link the lambda as write access to it
    // creer un autre repo de deploiement
  }
}
