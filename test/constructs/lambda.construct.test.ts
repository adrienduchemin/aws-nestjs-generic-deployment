import { expect as expectCDK, haveResource, SynthUtils, countResources } from '@aws-cdk/assert'
import { Code, Runtime } from '@aws-cdk/aws-lambda'
import { Stack, Duration } from '@aws-cdk/core'
import { Lambda, LambdaProps } from '../../src/constructs/lambda.construct'

describe('Lambda', () => {
  let stack: Stack
  const props: LambdaProps = {
    code: Code.fromInline('lambda'),
    handler: 'handler',
  }

  beforeEach(()=> {
    stack = new Stack()
  })

  it('should create one default Lambda', () => {
    new Lambda(stack, 'Lambda', props)

    expectCDK(stack).to(countResources("AWS::Lambda::Function", 1))
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Code: {
        "ZipFile": "lambda"
      },
      Handler: "handler",
      Timeout: 30,
      Runtime: Runtime.NODEJS_12_X.name,
    }))
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })

  it('should create one Lambda with specified timeout', () => {
    const overridenProps: LambdaProps =  {
      ...props,
      timeout: Duration.seconds(15),
    }
    new Lambda(stack, 'Lambda', overridenProps)
    
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Timeout: 15,
    }))
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })

  it('should create one Lambda with specified runtime', () => {
    const overridenProps: LambdaProps =  {
      ...props,
      runtime: Runtime.NODEJS_10_X
    }
    new Lambda(stack, 'Lambda', overridenProps)
    
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Runtime: Runtime.NODEJS_10_X.name,
    }))
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})