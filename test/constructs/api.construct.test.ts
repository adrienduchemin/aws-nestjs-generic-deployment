import { expect as expectCDK, haveResource, SynthUtils, countResources } from '@aws-cdk/assert'
import { Code } from '@aws-cdk/aws-lambda'
import { Stack } from '@aws-cdk/core'
import { Api, IApiProps } from '../../src/constructs/api.construct'
import { Lambda } from '../../src/constructs/lambda.construct'

describe('Api', () => {
  let stack: Stack
  let props: IApiProps

  beforeEach(()=> {
    stack = new Stack()
    props = {
      handler : new Lambda(stack, 'Lambda', {
          code: Code.fromInline('lambda'),
          handler: 'handler',
      }),
    }
  })

  it('should create one default Api', () => {
    new Api(stack, 'Api', props)

    expectCDK(stack).to(countResources("AWS::ApiGateway::RestApi", 1))
    expectCDK(stack).to(haveResource("AWS::ApiGateway::RestApi",{
      Name: 'ApiRestApi',
    }))
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})