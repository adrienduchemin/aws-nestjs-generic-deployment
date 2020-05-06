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
// todo : put the best option for timeout between 28/29/30 sec
export const LAMBDA_MAX_DURATION_IN_SECONDS = 30 // can go up to 29 seconds (API Gateway limit)
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