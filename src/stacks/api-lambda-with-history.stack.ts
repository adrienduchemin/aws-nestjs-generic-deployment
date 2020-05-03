import { App } from '@aws-cdk/core'
import { HistoryQueue, IHistoryQueueProps } from '../constructs/history/history-queue.construct'
import { ApiLambdaStack, IApiLambdaStackProps } from './api-lambda.stack'

export interface IApiLambdaWithHistoryStackProps extends IApiLambdaStackProps, IHistoryQueueProps {}

export class ApiLambdaWithHistoryStack extends ApiLambdaStack {
  constructor(scope: App, id: string, props: IApiLambdaWithHistoryStackProps) {
    const { historyQueueProps } = props

    super(scope, id, props)
    
    const queue = new HistoryQueue(this, id, { historyQueueProps })
    queue.grantSendMessages(this.lambda)
    this.lambda.addEnvironment('QUEUE_URL', queue.queueUrl)
  }
}
