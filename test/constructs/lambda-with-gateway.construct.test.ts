import { join } from 'path'
import { expect as expectCDK, SynthUtils, countResources, haveResource } from '@aws-cdk/assert'
import { Stack } from '@aws-cdk/core'
import { LambdaWithGateway, LambdaWithGatewayProps } from '../../src/constructs/lambda-with-gateway.construct'

describe('LambdaWithGateway', () => {
  let stack: Stack
  const props: LambdaWithGatewayProps = {
    path: join(__dirname, './lambda'),
    handler: "function.handler",
  }

  beforeAll(()=> {
    stack = new Stack()
    new LambdaWithGateway(stack, 'LambdaWithGateway', props)
  })

  it('should create one Lambda', () => {
    expectCDK(stack).to(countResources("AWS::Lambda::Function", 1))
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Handler: "function.handler",
    }))
  })

  it('should create one Api Gateway', () => {
    expectCDK(stack).to(countResources("AWS::ApiGateway::RestApi", 1))
    expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi",{
      Name: "-gateway",
    }))
  })

  it('should not have changed', () => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})