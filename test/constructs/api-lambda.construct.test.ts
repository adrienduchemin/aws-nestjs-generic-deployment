import { expect as expectCDK, SynthUtils, countResources, haveResource } from '@aws-cdk/assert'
import { Code } from '@aws-cdk/aws-lambda'
import { Stack } from '@aws-cdk/core'
import { ApiLambda, API_LAMBDA_TIMEOUT } from '../../src/constructs/api-lambda.construct'

describe('ApiLambda', () => {
  let stack: Stack

  beforeAll(()=> {
    stack = new Stack()
    new ApiLambda(stack, 'ApiLambda', {
      lambdaProps: {
        code: Code.fromInline('lambda'),
        handler: 'handler',
      }
    })
  })

  it('should create one Lambda', () => {
    expectCDK(stack).to(countResources("AWS::Lambda::Function", 1))
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Timeout: API_LAMBDA_TIMEOUT.toSeconds(),
    }))
  })

  it('should create one Api Gateway', () => {
    expectCDK(stack).to(countResources("AWS::ApiGateway::RestApi", 1))
  })

  it('should not have changed', () => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})