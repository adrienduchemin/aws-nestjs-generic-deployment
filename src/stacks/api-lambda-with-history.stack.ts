import { Queue } from '@aws-cdk/aws-sqs'
import { App } from '@aws-cdk/core'
import { LambdaHistory } from '../constructs/lambda-history/lambda-history.construct'
import { ApiLambdaStack, ApiLambdaStackProps } from './api-lambda.stack'

export class ApiLambdaWithHistoryStack extends ApiLambdaStack {
  constructor(scope: App, id: string, props: ApiLambdaStackProps) {
    super(scope, id, props)

    const queue = new Queue(this, `${id}-history-queue`, { fifo: true })
    queue.grantSendMessages(this.lambda)

    this.lambda.addEnvironment('QUEUE_URL', queue.queueUrl)

    // not yet with rds
    new LambdaHistory(this, `${id}-history`, { queue })
  }
}
