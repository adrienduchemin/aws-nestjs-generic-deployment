import { join } from 'path'
import { Table, AttributeType } from '@aws-cdk/aws-dynamodb'
import { Code } from '@aws-cdk/aws-lambda'
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import { Queue } from '@aws-cdk/aws-sqs'
import { Construct } from '@aws-cdk/core'
import { Lambda } from '../lambda.construct'

export interface LambdaHistoryProps {
  queue: Queue,
}

export class LambdaHistory extends Lambda {
  constructor(scope: Construct, id: string, props: LambdaHistoryProps) {
    super(scope, id, {
      code: Code.fromAsset(join(__dirname, './lambda')),
      handler: 'index.handler',
      // environment: {
        // RDS_ARN: from props,
      // }
    })

    const { queue } = props
    this.addEventSource(new SqsEventSource(queue))
    
    const table = new Table(this, `${id}Table`, {
      partitionKey: { name: 'id', type: AttributeType.STRING }
    })
    table.grantReadWriteData(this)

    this.addEnvironment('TABLE_NAME', table.tableName)
  }
}