import { Function, Runtime, FunctionProps } from '@aws-cdk/aws-lambda'
import { Duration, Construct } from '@aws-cdk/core'

export interface ILambdaProps extends Omit<FunctionProps, 'runtime'> {
  runtime?: Runtime
}

// default runtime for lambda
export const LAMBDA_RUNTIME = Runtime.NODEJS_12_X
// default timeout for lambda
export const LAMBDA_MAX_DURATION_IN_SECONDS = 60 // can go up to 900 seconds
export const LAMBDA_TIMEOUT_ERROR = `lambda cannot exceed ${LAMBDA_MAX_DURATION_IN_SECONDS} seconds`

export class Lambda extends Function {
  constructor(scope: Construct, id: string, props: ILambdaProps) {
    const { timeout } = props
    const functionName = `${id}Lambda`

    if (timeout && timeout.toSeconds() > LAMBDA_MAX_DURATION_IN_SECONDS) {
      throw new Error(LAMBDA_TIMEOUT_ERROR)
    }
    
    super(scope, functionName, {
      runtime: LAMBDA_RUNTIME,
      functionName,
      timeout :Duration.seconds(LAMBDA_MAX_DURATION_IN_SECONDS),
      ...props,
    })
  }
}
