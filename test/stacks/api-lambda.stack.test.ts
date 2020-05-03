import { expect as expectCDK, SynthUtils, countResources } from '@aws-cdk/assert'
import { Code } from '@aws-cdk/aws-lambda'
import { App } from '@aws-cdk/core'
import { ApiLambdaStack } from '../../src/stacks/api-lambda.stack'

describe('ApiLambdaStack', () => {
  let stack: ApiLambdaStack

  beforeAll(()=> {
    stack = new ApiLambdaStack(new App(), 'ApiLambdaStack', {
      lambdaProps: {
        code: Code.fromInline('lambda'),
        handler: 'handler',
      }
    })
  })

  it('should create one Lambda', () => {
    expectCDK(stack).to(countResources("AWS::Lambda::Function", 1))
  })

  it('should create one Api Gateway', () => {
    expectCDK(stack).to(countResources("AWS::ApiGateway::RestApi", 1))
  })

  it('should not have changed', () => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})