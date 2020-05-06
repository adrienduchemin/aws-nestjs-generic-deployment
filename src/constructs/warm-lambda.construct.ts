import { Rule, RuleTargetInput, Schedule, RuleProps } from '@aws-cdk/aws-events'
import { LambdaFunction, LambdaFunctionProps } from '@aws-cdk/aws-events-targets'
import { Construct, Duration } from '@aws-cdk/core'
import { Lambda } from './lambda.construct'

export interface IEventRuleProps {
  lambdaNumberWarmup?: number; //  number of lambdas to keep warm
  ruleProps?: RuleProps;
  eventProps?: LambdaFunctionProps;
}

export interface IWarmLambdaProps extends IEventRuleProps {
  lambda: Lambda;
}

export const SCHEDULE_RATE_IN_SECONDS = 300 // ping every 5 minutes to keep them warm
export const LAMBDA_MAX_NUMBER_WARMUP = 10 // keep maximum this number of lambdas warm
export const LAMBDA_MAX_WARMUP_MAX_ERROR = `number of warm lambda cannot exceed ${LAMBDA_MAX_NUMBER_WARMUP}`

export class WarmLambda extends Construct {
  constructor(scope: Construct, id: string, props: IWarmLambdaProps) {
    const { lambda, lambdaNumberWarmup, ruleProps, eventProps } = props

    super(scope, `${id}`)

    if(lambdaNumberWarmup && lambdaNumberWarmup > 0) {
      if (lambdaNumberWarmup > LAMBDA_MAX_NUMBER_WARMUP) {
        throw new Error(LAMBDA_MAX_WARMUP_MAX_ERROR)
      }

      for (let i = 0; i < lambdaNumberWarmup; i++) {
        // warmup lambda[i] every 5 minutes
        const rule = new Rule(this, 'Rule', {
          schedule : Schedule.rate(Duration.seconds(SCHEDULE_RATE_IN_SECONDS)),
          ...ruleProps,
        })
    
        rule.addTarget(new LambdaFunction(lambda, {
          event: RuleTargetInput.fromObject({ ping: true }),
          ...eventProps
        }))
      }
    }
  }
}