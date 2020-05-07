import { Construct } from '@aws-cdk/core'
import { Api, ILambdaRestApiProps } from './api.construct'
import { Lambda, ILambdaProps } from './lambda.construct'
import { IEventRuleProps, WarmLambda } from './warm-lambda.construct'

export interface IApiLambdaProps {
  warmLambdaProps?: IEventRuleProps;
  lambdaProps: ILambdaProps;
  apiProps?: ILambdaRestApiProps;
}

export class ApiLambda extends Lambda {
  constructor(scope: Construct, id: string, props: IApiLambdaProps) {
    const { lambdaProps, apiProps, warmLambdaProps } = props

    super(scope, `${id}`, {
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