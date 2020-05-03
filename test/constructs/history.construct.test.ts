import { expect as expectCDK, SynthUtils, countResources, haveResource } from '@aws-cdk/assert'
import { Queue } from '@aws-cdk/aws-sqs'
import { Stack } from '@aws-cdk/core'
import { History } from '../../src/constructs/history/history.construct'

describe('History', () => {
  let stack: Stack

  beforeAll(()=> {
    stack = new Stack()
    new History(stack, 'LambdaHistory', {
      queue: new Queue(stack, 'HistoryQueue')
    })
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