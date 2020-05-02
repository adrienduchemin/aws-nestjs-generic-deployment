import { expect as expectCDK, SynthUtils, countResources, haveResource } from '@aws-cdk/assert'
import { Code } from '@aws-cdk/aws-lambda'
import { Stack } from '@aws-cdk/core'
import { LambdaWithGateway } from '../../src/constructs/lambda-with-gateway.construct'
import { LambdaProps } from '../../src/constructs/lambda.construct'

describe('LambdaWithGateway', () => {
  let stack: Stack

  beforeAll(()=> {
    const props: LambdaProps = {
      code: Code.fromInline('lambda'),
      handler: 'handler',
    }
    stack = new Stack()
    new LambdaWithGateway(stack, 'LambdaWithGateway', props)
  })

  it('should create one Lambda', () => {
    expectCDK(stack).to(countResources("AWS::Lambda::Function", 1))
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Timeout: 60,
    }))
  })

  it('should create one Api Gateway', () => {
    expectCDK(stack).to(countResources("AWS::ApiGateway::RestApi", 1))
  })

  it('should not have changed', () => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})