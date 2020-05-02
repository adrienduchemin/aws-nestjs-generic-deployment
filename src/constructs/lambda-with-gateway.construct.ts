import { LambdaRestApi } from '@aws-cdk/aws-apigateway'
import { Construct } from '@aws-cdk/core'
import { Lambda } from './lambda.construct'

export interface LambdaWithGatewayProps {
  path: string;
  handler: string;
  timeout?: number;
}

export class LambdaWithGateway extends Lambda {
  constructor(scope: Construct, id: string, props: LambdaWithGatewayProps) {
    const { path, handler, timeout } = props

    super(scope, id, { path, handler, timeout })

    // the id should concatenate the same way lambda id does
    // new LambdaRestApi(this, 'gateway', {
    new LambdaRestApi(this, `${scope.node.id}-gateway`, {
      handler: this
    })
  }
}
