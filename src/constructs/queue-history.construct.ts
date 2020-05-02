// import iam = require('@aws-cdk/aws-iam')
// import { Code, Function, Runtime } from '@aws-cdk/aws-lambda'
// import { Queue } from '@aws-cdk/aws-sqs'
// import targets = require('@aws-cdk/aws-events-targets')
// // import dynamodb = require('@aws-cdk/aws-dynamodb')
// import events = require('@aws-cdk/aws-events')
// import path = require('path')

// import { Duration, Construct } from '@aws-cdk/core'

// export interface QueueHistoryProps extends QueueProps {
//     id? : string
// }

// export class QueueHistory extends Queue {
//   constructor(parent: Construct, id: string, props: QueueHistoryProps) {
//     super(parent, id)

//     // const keyName = 'id'
//     // const table = new dynamodb.Table(this, 'CheckpointTable', {
//     //   partitionKey: { name: keyName, type: dynamodb.AttributeType.STRING }
//     // })

//     const fn = new Function(this, 'Poller', {
//       code: Code.fromAsset(path.join(__dirname, '..', 'lambda')),
//       handler: 'lib/index.handler',
//       runtime: Runtime.NODEJS_12_X,
//       timeout: Duration.minutes(15),
//       environment: {
//         CREDENTIALS_SECRET: props.secretArn,
//         TWITTER_QUERY: props.query,
//         QUEUE_URL: this.queueUrl,
//         CHECKPOINT_TABLE_NAME: table.tableName,
//         CHECKPOINT_TABLE_KEY_NAME: keyName
//       }
//     })

//     fn.addToRolePolicy(new iam.PolicyStatement({
//       resources: [ props.secretArn ],
//       actions: [ 'secretsmanager:GetSecretValue' ]
//     }))

//     fn.addToRolePolicy(new iam.PolicyStatement({
//       resources: [ this.queueArn ],
//       actions: [ 'sqs:SendMessage', 'sqs:SendMessageBatch' ]
//     }))

//     table.grantReadWriteData(fn)

//     const interval = props.intervalMin === undefined ? 1 : props.intervalMin
//     if (interval > 0) {
//       const timer = new events.Rule(this, 'PollingTimer', {
//         schedule: events.Schedule.rate(Duration.minutes(interval))
//       })

//       timer.addTarget(new targets.LambdaFunction(fn))
//     }
//   }
// }