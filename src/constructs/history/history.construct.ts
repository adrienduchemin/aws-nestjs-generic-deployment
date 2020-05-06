import { join } from 'path'
import { Table, AttributeType, TableProps } from '@aws-cdk/aws-dynamodb'
import { Code } from '@aws-cdk/aws-lambda'
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import { Queue } from '@aws-cdk/aws-sqs'
import { Construct } from '@aws-cdk/core'
import { Lambda } from '../lambda.construct'

export interface IHistoryProps {
  queue: Queue,
  tableProps?: TableProps
}

export class History extends Construct {
  constructor(scope: Construct, id: string, props: IHistoryProps) {
    const { queue, tableProps } = props
    const tableName = `${id}HistoryTable`

    super(scope, id)

    const lambda = new Lambda(this, `${id}History`, {
        code: Code.fromAsset(join(__dirname, './lambda')),
        handler: 'index.handler',
    })
    
    lambda.addEventSource(new SqsEventSource(queue))
    
    const table = new Table(this, tableName, {
      tableName,
      partitionKey : { name: 'id', type: AttributeType.STRING } ,
      ...tableProps,
    })
    table.grantReadWriteData(lambda)

    lambda.addEnvironment('TABLE_NAME', table.tableName)
  }
}