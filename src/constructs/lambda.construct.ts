import { Code, Function, Runtime } from '@aws-cdk/aws-lambda'
import { Duration, Construct } from '@aws-cdk/core'

export interface LambdaProps {
  path: string;
  handler: string;
  timeout?: number;
}

export class Lambda extends Function {
  constructor(scope: Construct, id: string, props: LambdaProps) {
    const { path, handler, timeout = 30 } = props

    super(scope, 'lambda', {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset(path),
      handler,
      timeout: Duration.seconds(timeout),
    })
  }
}
