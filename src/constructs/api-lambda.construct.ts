import { LambdaRestApi, LambdaRestApiProps } from '@aws-cdk/aws-apigateway'
import { Construct, Duration } from '@aws-cdk/core'
import { LambdaProps, Lambda } from './lambda.construct'

export interface ApiLambdaProps {
  lambdaProps: LambdaProps;
  lambdaRestApiProps?: Omit<LambdaRestApiProps, 'handler'> ;
}

export const API_LAMBDA_TIMEOUT = Duration.seconds(60)

export class ApiLambda extends Lambda {
  constructor(scope: Construct, id: string, props: ApiLambdaProps) {
    const { lambdaProps, lambdaRestApiProps } = props
    const { timeout = API_LAMBDA_TIMEOUT } = lambdaProps
    
    super(scope, id, { ...lambdaProps, timeout })

    // the id should concatenate the same way lambda id does
    // new LambdaRestApi(this, 'gateway', {
    new LambdaRestApi(this, `${id}Gateway`, {
      handler: this,
      ...lambdaRestApiProps
    })
  }
}