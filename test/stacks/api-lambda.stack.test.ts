import { expect as expectCDK, SynthUtils, countResources } from '@aws-cdk/assert'
import { Code } from '@aws-cdk/aws-lambda'
import { App } from '@aws-cdk/core'
import { ApiLambdaStack, IApiLambdaStackProps } from '../../src/stacks/api-lambda.stack'

describe('ApiLambdaStack', () => {
  let stack: ApiLambdaStack

  beforeAll(()=> {
    const props: IApiLambdaStackProps = {
      lambdaProps: {
        code: Code.fromInline('lambda'),
        handler: 'handler',
      }
    }
    stack = new ApiLambdaStack(new App(), 'ApiLambdaStack', props)
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