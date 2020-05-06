import { Construct, Duration } from '@aws-cdk/core'
import { Api, ILambdaRestApiProps } from './api.construct'
import { Lambda, ILambdaProps } from './lambda.construct'
import { IEventRuleProps, WarmLambda } from './warm-lambda.construct'

export interface IApiLambdaProps {
  warmLambdaProps?: IEventRuleProps;
  lambdaProps: ILambdaProps;
  apiProps?: ILambdaRestApiProps;
}

// default timeout for lambda
export const LAMBDA_MAX_DURATION_IN_SECONDS = 29 // API Gateway timeout
export const LAMBDA_TIMEOUT_ERROR = `lambda api cannot exceed ${LAMBDA_MAX_DURATION_IN_SECONDS} seconds`

export class ApiLambda extends Lambda {
  constructor(scope: Construct, id: string, props: IApiLambdaProps) {
    const { lambdaProps, apiProps, warmLambdaProps } = props
    const { timeout } = lambdaProps

    if (timeout && timeout.toSeconds() > LAMBDA_MAX_DURATION_IN_SECONDS) {
      throw new Error(LAMBDA_TIMEOUT_ERROR)
    }

    super(scope, `${id}`, {
      timeout : Duration.seconds(LAMBDA_MAX_DURATION_IN_SECONDS),
       ...lambdaProps 
    })

    new Api(this, `${id}`, {
      ...apiProps,
      handler: this,
    })

    new WarmLambda(this, `${id}`, {
      ...warmLambdaProps,
      lambda: this
    })
  }
}