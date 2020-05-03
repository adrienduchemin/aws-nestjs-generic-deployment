import { LambdaRestApi } from '@aws-cdk/aws-apigateway'
import { Construct, Duration } from '@aws-cdk/core'
import { Lambda, LambdaProps } from './lambda.construct'

export class LambdaWithGateway extends Lambda {
  constructor(scope: Construct, id: string, props: LambdaProps) {
    const { timeout = Duration.seconds(60) } = props

    super(scope, id, { ...props, timeout })

    // the id should concatenate the same way lambda id does
    // new LambdaRestApi(this, 'gateway', {
    new LambdaRestApi(this, `${id}Gateway`, {
      handler: this
    })
  }
}
