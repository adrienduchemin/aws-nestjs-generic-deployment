import { LambdaRestApi, LambdaRestApiProps } from '@aws-cdk/aws-apigateway'
import { Construct } from '@aws-cdk/core'
import { Lambda } from './lambda.construct'

export type ILambdaRestApiProps = Omit<LambdaRestApiProps, 'handler'>

export interface ApiProps {
  apiProps?: ILambdaRestApiProps
  lambda: Lambda
}

export class Api extends LambdaRestApi {
  constructor(scope: Construct, id: string, props: ApiProps) {
    const { lambda, apiProps } = props
    const { restApiName = `${id}-rest-api` } = apiProps ? apiProps : {}

    super(scope, id, {
      handler: lambda,
      ...apiProps,
      restApiName
    })
  }
}