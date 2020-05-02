import { Function, Runtime, FunctionProps } from '@aws-cdk/aws-lambda'
import { Duration, Construct } from '@aws-cdk/core'

export interface LambdaProps extends Omit<FunctionProps, 'runtime'> {
  runtime?: Runtime
}

export class Lambda extends Function {
  constructor(scope: Construct, id: string, props: LambdaProps) {
    const { code, handler, runtime = Runtime.NODEJS_12_X, timeout = Duration.seconds(30) } = props

    super(scope, 'lambda', {
      runtime,
      code,
      handler,
      timeout,
    })
  }
}
