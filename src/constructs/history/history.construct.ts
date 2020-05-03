import { join } from 'path'
import { Table, AttributeType, TableProps } from '@aws-cdk/aws-dynamodb'
import { Code } from '@aws-cdk/aws-lambda'
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import { Queue } from '@aws-cdk/aws-sqs'
import { Construct } from '@aws-cdk/core'
import { Lambda } from '../lambda.construct'

export interface HistoryProps {
  queue: Queue,
  tableProps?: TableProps
}

export class History extends Construct {
  constructor(scope: Construct, id: string, props: HistoryProps) {
    const { queue, tableProps } = props
    const { tableName = `${id}HistoryTable`, partitionKey = { name: 'id', type: AttributeType.STRING } } = tableProps ? tableProps : {}

    super(scope, id)

    const lambda = new Lambda(this, `${id}History`, {
      lambdaProps: {
        code: Code.fromAsset(join(__dirname, './lambda')),
        handler: 'index.handler',
      }
    })
    
    lambda.addEventSource(new SqsEventSource(queue))
    
    const table = new Table(this, `${id}HistoryTable`, {
      ...tableProps,
      tableName,
      partitionKey
    })
    table.grantReadWriteData(lambda)

    lambda.addEnvironment('TABLE_NAME', table.tableName)
  }
}