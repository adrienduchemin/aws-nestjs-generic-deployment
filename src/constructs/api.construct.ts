import { LambdaRestApi, LambdaRestApiProps } from '@aws-cdk/aws-apigateway'
import { Construct } from '@aws-cdk/core'
import { Lambda } from './lambda.construct'

export type ILambdaRestApiProps = Omit<LambdaRestApiProps, 'handler'>

export interface IApiProps {
  apiProps?: ILambdaRestApiProps
  lambda: Lambda
}

export class Api extends LambdaRestApi {
  constructor(scope: Construct, id: string, props: IApiProps) {
    const { lambda, apiProps } = props
    const { restApiName = `${id}RestApi` } = apiProps ? apiProps : {}

    super(scope, `${id}RestApi`, {
      handler: lambda,
      ...apiProps,
      restApiName
    })
  }
}