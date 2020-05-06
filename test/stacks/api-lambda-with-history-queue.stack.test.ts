import { expect as expectCDK, SynthUtils, countResources, haveResource } from '@aws-cdk/assert'
import { Code } from '@aws-cdk/aws-lambda'
import { App } from '@aws-cdk/core'
import { ApiLambdaWithHistoryQueueStack } from '../../src/stacks/api-lambda-with-history-queue.stack'

describe('ApiLambdaWithHistoryStack', () => {
  let stack: ApiLambdaWithHistoryQueueStack

  beforeAll(()=> {
    stack = new ApiLambdaWithHistoryQueueStack(new App(), 'ApiLambdaWithHistoryStack', {
      lambdaProps: {
        code: Code.fromInline('lambda'),
        handler: 'handler',
      },
      historyQueueProps: {
        fifo: true
      }
    })
  })

  it('should create two Lambda', () => {
    expectCDK(stack).to(countResources("AWS::Lambda::Function", 2))
  })

  it('should create one Api Gateway', () => {
    expectCDK(stack).to(countResources("AWS::ApiGateway::RestApi", 1))
  })

  it('should create one Queue', () => {
    expectCDK(stack).to(countResources("AWS::SQS::Queue", 1))
    expectCDK(stack).to(haveResource("AWS::SQS::Queue",{
      FifoQueue: true,
    }))
  })
  
  it('should create one Table', () => {
    expectCDK(stack).to(countResources("AWS::DynamoDB::Table", 1))
  })

  it('should not have changed', () => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})