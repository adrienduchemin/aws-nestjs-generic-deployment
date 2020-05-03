import { Function, Runtime, FunctionProps } from '@aws-cdk/aws-lambda'
import { Duration, Construct } from '@aws-cdk/core'

export interface LambdaProps extends Omit<FunctionProps, 'runtime'> {
  runtime?: Runtime
}

export const LAMBDA_TIMEOUT = Duration.seconds(30)
export const LAMBDA_RUNTIME = Runtime.NODEJS_12_X
export const LAMBDA_TIMEOUT_ERROR = 'lambda cannot exceed 60 seconds even if they can for 900 seconds'

export class Lambda extends Function {
  constructor(scope: Construct, id: string, props: LambdaProps) {
    const { code, handler, runtime = Runtime.NODEJS_12_X, timeout = LAMBDA_TIMEOUT } = props

    if (timeout.toSeconds() > 60) {
      throw new Error(LAMBDA_TIMEOUT_ERROR)
    }
    
    super(scope, `${id}Lambda`, {
      runtime,
      code,
      handler,
      timeout,
    })
  }
}
