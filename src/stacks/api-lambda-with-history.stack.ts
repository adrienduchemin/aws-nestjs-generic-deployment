import { Queue } from '@aws-cdk/aws-sqs'
import { App } from '@aws-cdk/core'
import { LambdaHistory } from '../constructs/lambda-history/lambda-history.construct'
import { ApiLambdaStack, ApiLambdaStackProps } from './api-lambda.stack'

export class ApiLambdaWithHistoryStack extends ApiLambdaStack {
  constructor(scope: App, id: string, props: ApiLambdaStackProps) {
    super(scope, id, props)

    // coder le fait que la lambda ecrive dans le sqs ..
    const queue = new Queue(this, id, { fifo: true })
    queue.grantSendMessages(this.lambda)

    this.lambda.addEnvironment('QUEUE_URL', queue.queueUrl)

    // not yet with rds
    new LambdaHistory(this, id, { queue })
  }
}
