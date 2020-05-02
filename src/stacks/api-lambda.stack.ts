import { App, Stack, StackProps } from '@aws-cdk/core'
import { LambdaWithGateway } from '../constructs/lambda-with-gateway.construct'
import { LambdaProps } from '../constructs/lambda.construct'

export interface ApiLambdaStackProps extends StackProps {
  lambdaProps: LambdaProps;
}

export class ApiLambdaStack extends Stack {
  lambda: LambdaWithGateway

  constructor(scope: App, id: string, props: ApiLambdaStackProps) {
    const { lambdaProps } = props
    delete props.lambdaProps
    super(scope, id, props)

    this.lambda = new LambdaWithGateway(this, id, lambdaProps)
  }
}
