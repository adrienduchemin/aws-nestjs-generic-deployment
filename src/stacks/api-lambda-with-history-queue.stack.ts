import { App } from '@aws-cdk/core'
import { HistoryQueue, IHistoryQueueProps } from '../constructs/history/history-queue.construct'
import { ApiLambdaStack, IApiLambdaStackProps } from './api-lambda.stack'

export interface IApiLambdaWithHistoryQueueStackProps extends IApiLambdaStackProps, IHistoryQueueProps {}

export class ApiLambdaWithHistoryQueueStack extends ApiLambdaStack {
  constructor(scope: App, id: string, props: IApiLambdaWithHistoryQueueStackProps) {
    const { historyQueueProps } = props

    super(scope, id, props)
    
    const queue = new HistoryQueue(this, `${id}`, { historyQueueProps })
    queue.grantSendMessages(this.lambda)
    this.lambda.addEnvironment('QUEUE_URL', queue.queueUrl)
  }
}
