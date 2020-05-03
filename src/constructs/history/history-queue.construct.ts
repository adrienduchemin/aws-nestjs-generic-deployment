import { Queue, QueueProps } from '@aws-cdk/aws-sqs'
import { Construct } from '@aws-cdk/core'
import { History } from './history.construct'

export type IQueueProps = Omit<QueueProps, 'fifo'>

export interface IHistoryQueueProps {
  historyQueueProps?: IQueueProps
}

export class HistoryQueue extends Queue {
  constructor(scope: Construct, id: string, props: IHistoryQueueProps) {
    const { historyQueueProps } = props
    const { queueName = `${id}HistoryQueue.fifo` } = historyQueueProps ? historyQueueProps : {}

    super(scope, `${id}HistoryQueue.fifo`, { 
      fifo: true,
      ...historyQueueProps,
      queueName
    })

    new History(this, `${id}`, {
      queue: this
    })
  }
}