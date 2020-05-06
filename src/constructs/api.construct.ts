import { LambdaRestApi, LambdaRestApiProps } from '@aws-cdk/aws-apigateway'
import { Construct } from '@aws-cdk/core'
import { Lambda } from './lambda.construct'

export type ILambdaRestApiProps = Omit<LambdaRestApiProps, 'handler'>

export interface IApiProps extends ILambdaRestApiProps {
  handler: Lambda
}

export class Api extends LambdaRestApi {
  constructor(scope: Construct, id: string, props: IApiProps) {
    const { handler } = props
    const restApiName = `${id}RestApi`

    super(scope, restApiName, {
      restApiName,
      ...props,
      handler,
    })
  }
}