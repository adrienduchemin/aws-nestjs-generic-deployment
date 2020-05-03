import { Construct, Duration } from '@aws-cdk/core'
import { ILambdaRestApiProps, Api } from './api.construct'
import { Lambda, IFunctionProps } from './lambda.construct'

export interface IApiLambdaProps {
  lambdaProps: IFunctionProps;
  apiProps?: ILambdaRestApiProps;
}

export const API_LAMBDA_TIMEOUT = Duration.seconds(60)

export class ApiLambda extends Lambda {
  constructor(scope: Construct, id: string, props: IApiLambdaProps) {
    const { lambdaProps, apiProps } = props
    const { timeout = API_LAMBDA_TIMEOUT } = lambdaProps

    super(scope, `${id}`, { lambdaProps : { ...lambdaProps, timeout } })

    new Api(this, `${id}`, {
      apiProps,
      lambda: this
    })
  }
}