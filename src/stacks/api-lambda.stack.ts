import { App, Stack, StackProps } from '@aws-cdk/core'
import { ApiLambda, ApiLambdaProps } from '../constructs/api-lambda.construct'

export interface ApiLambdaStackProps extends StackProps, ApiLambdaProps {}

export class ApiLambdaStack extends Stack {
  lambda: ApiLambda

  constructor(scope: App, id: string, props: ApiLambdaStackProps) {
    super(scope, id, props)
    
    const { lambdaProps, lambdaRestApiProps } = props
    this.lambda = new ApiLambda(this, id, { lambdaProps, lambdaRestApiProps })
  }
}
