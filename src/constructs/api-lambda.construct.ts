import { Construct, Duration } from '@aws-cdk/core'
import { Api, ILambdaRestApiProps } from './api.construct'
import { Lambda, ILambdaProps } from './lambda.construct'
import { IEventRuleProps, WarmLambda } from './warm-lambda.construct'

export interface IApiLambdaProps {
  warmLambdaProps?: IEventRuleProps;
  lambdaProps: ILambdaProps;
  apiProps?: ILambdaRestApiProps;
}

// should timeout before API Gateway timeout
export const LAMBDA_API_TIMEOUT = 28

export class ApiLambda extends Lambda {
  constructor(scope: Construct, id: string, props: IApiLambdaProps) {
    const { lambdaProps, apiProps, warmLambdaProps } = props

    super(scope, `${id}`, {
      timeout : Duration.seconds(LAMBDA_API_TIMEOUT),
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