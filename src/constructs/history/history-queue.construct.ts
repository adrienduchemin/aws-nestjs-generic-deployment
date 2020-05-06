import { TableProps } from '@aws-cdk/aws-dynamodb'
import { Queue, QueueProps } from '@aws-cdk/aws-sqs'
import { Construct } from '@aws-cdk/core'
import { History } from './history.construct'

export interface IHistoryQueueProps {
  historyQueueProps?: QueueProps
  tableProps?: TableProps
}

export class HistoryQueue extends Queue {
  constructor(scope: Construct, id: string, props: IHistoryQueueProps) {
    const { tableProps, historyQueueProps } = props
    const queueName = `${id}HistoryQueue${historyQueueProps && historyQueueProps.fifo ? '.fifo' : ''}`

    super(scope, queueName, { 
      queueName,
      ...historyQueueProps,
    })

    new History(this, `${id}`, {
      queue: this,
      tableProps
    })
  }
}