import { App, Stack, StackProps } from '@aws-cdk/core'
import { ApiLambda, IApiLambdaProps } from '../constructs/api-lambda.construct'

export interface IApiLambdaStackProps extends IApiLambdaProps {
  stackProps?: StackProps;
}

export class ApiLambdaStack extends Stack {
  lambda: ApiLambda

  constructor(scope: App, id: string, props: IApiLambdaStackProps) {
    const { stackProps, lambdaProps, apiProps } = props

    super(scope, id, stackProps)
    
    this.lambda = new ApiLambda(this, `${id}`, { lambdaProps, apiProps })
  }
}
