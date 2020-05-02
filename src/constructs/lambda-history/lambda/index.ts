import { Context, SQSHandler, SQSEvent } from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'

export const handler: SQSHandler = async (event: SQSEvent, context: Context) => {
    console.log({ event, context })

    if(!process.env.TABLE_NAME) {
        throw new Error('no table name given')
    }

    const client = new DynamoDB.DocumentClient()

    for(const record of event.Records){
        const body = record.body ? JSON.parse(record.body) : { }
        await client.put({
            TableName: process.env.TABLE_NAME,
            Item: {
                id: record.messageId,
                text: body.text,
            }
        }).promise()
    }
}