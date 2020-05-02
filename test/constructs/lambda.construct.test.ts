import { join } from 'path'
import { expect as expectCDK, haveResource, SynthUtils } from '@aws-cdk/assert'
import { Stack } from '@aws-cdk/core'
import { Lambda, LambdaProps } from '../../src/constructs/lambda.construct'

describe('Lambda', () => {
  let stack: Stack
  const props: LambdaProps = {
    path: join(__dirname, './lambda'),
    handler: "function.handler",
  }

  beforeEach(()=> {
    stack = new Stack()
  })

  it('should create a default lambda', () => {
    new Lambda(stack, 'Lambda', props)

    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Handler: "function.handler",
      Timeout: 30,
      Runtime: "nodejs12.x",
    }))
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })

  it('should create a lambda with specified timeout', () => {
    const overridenProps: LambdaProps =  {
      ...props,
      timeout: 15,
    }
    new Lambda(stack, 'Lambda', overridenProps)
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Timeout: 15,
    }))
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})