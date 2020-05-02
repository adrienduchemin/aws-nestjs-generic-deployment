import { join } from 'path'
import { expect as expectCDK, SynthUtils, countResources } from '@aws-cdk/assert'
import { App } from '@aws-cdk/core'
import { LambdaWithGatewayStack, LambdaWithGatewayStackProps } from '../../src/stacks/lambda-with-gateway.stack'

describe('LambdaWithGatewayStack', () => {
  let stack: LambdaWithGatewayStack
  const props: LambdaWithGatewayStackProps = {
    lambdaCodePath: join(__dirname, './lambda'),
  }

  beforeAll(()=> {
    stack = new LambdaWithGatewayStack(new App(), 'LambdaWithGatewayStack', props)
  })

  it('should create one Lambda', () => {
    expectCDK(stack).to(countResources("AWS::Lambda::Function", 1))
  })

  it('should create one API GATEWAY', () => {
    expectCDK(stack).to(countResources("AWS::ApiGateway::RestApi", 1))
  })

  it('should not have changed', () => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})