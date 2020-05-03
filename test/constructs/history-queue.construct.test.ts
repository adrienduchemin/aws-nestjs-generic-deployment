import { expect as expectCDK, SynthUtils, countResources, haveResource } from '@aws-cdk/assert'
import { Stack } from '@aws-cdk/core'
import { HistoryQueue } from '../../src/constructs/history/history-queue.construct'

describe('History', () => {
  let stack: Stack

  beforeAll(()=> {
    stack = new Stack()
    new HistoryQueue(stack, 'HistoryQueue', { })
  })

  it('should create one Queue', () => {
    expectCDK(stack).to(countResources("AWS::SQS::Queue", 1))
    expectCDK(stack).to(haveResource("AWS::SQS::Queue",{
      FifoQueue: true,
    }))
  })

  it('should create one Lambda', () => {
    expectCDK(stack).to(countResources("AWS::Lambda::Function", 1))
    expectCDK(stack).to(haveResource("AWS::Lambda::Function",{
      Handler: 'index.handler'
    }))
  })

  it('should create one Table', () => {
    expectCDK(stack).to(countResources("AWS::DynamoDB::Table", 1))
    expectCDK(stack).to(haveResource("AWS::DynamoDB::Table",{
      KeySchema: [{ 
        AttributeName: "id",
        KeyType: "HASH",
      }],
    }))
  })

  it('should not have changed', () => {
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot()
  })
})