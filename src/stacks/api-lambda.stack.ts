import { App, Stack, StackProps } from '@aws-cdk/core'
import { LambdaWithGateway } from '../constructs/lambda-with-gateway.construct'
import { LambdaProps } from '../constructs/lambda.construct'

export interface ApiLambdaStackProps extends StackProps {
  lambdaProps: LambdaProps;
}

export class ApiLambdaStack extends Stack {
  constructor(scope: App, id: string, props: ApiLambdaStackProps) {
    const { lambdaProps } = props
    delete props.lambdaProps
    super(scope, id, props)

    const lambda = new LambdaWithGateway(this, id, lambdaProps)

    console.log('ARN lambda', { lambda: lambda.functionArn })

    // queueReader.authorize(write, lambda)

    // should create a RDS and link the lambda as write access to it
    // creer un autre repo de deploiement
  }
}
