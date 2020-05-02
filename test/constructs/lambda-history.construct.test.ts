import { expect as expectCDK, SynthUtils, countResources, haveResource } from '@aws-cdk/assert'
import { Queue } from '@aws-cdk/aws-sqs'
import { Stack } from '@aws-cdk/core'
import { LambdaHistory, LambdaHistoryProps } from '../../src/constructs/lambda-history/lambda-history.construct'

describe('LambdaHistory', () => {
  let stack: Stack

  beforeAll(()=> {
    stack = new Stack()
    const props: LambdaHistoryProps = {
      queue : new Queue(stack, 'HistoryQueue')
    }
    new LambdaHistory(stack, 'LambdaHistory', props)
  })

  it('should create one Lambda', () => {
    expectCDK(stack).to(countResources("AWS::Lambda::Function", 1))
  })

  it('should create one Table', () => {
    expectCDK(stack).to(countResources("AWS::DynamoDB::Table", 1))
    // { name: 'id', type: AttributeType.STRING }
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