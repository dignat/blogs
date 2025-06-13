---
title: AWS SQS and fan-out pattern with Kafka (Confluent).
---
Refactoring !!! 
Refactoring is inevitable. We face it almost every day. Sometimes we plan for it, sometimes comes as an unscheduled change.

At the beginning of the story, we had a simple, easy flow.
Very trivial workflow: 
Publisher will publish a message to AWS SNS Topic , which is subscribed to AWS SQS , then the AWS SQS will send a message to Kafka. So far so good:


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ir3ffwve9k7nswc37hme.png)

with schema matching the structure of the domain product, to push to Kafka. Something along the lines in json format:

JSONSchema (if you are interested to find out more)
[JSONSchema](https://json-schema.org/learn/getting-started-step-by-step)

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer"
    }
  }
}

```

In order to satisfy the new business requirements, we came up with a solution involving changing the structure of the schema for our domain event.
Something along the lines: leveraging the `oneOf` feature to create complex tree like structure: 

```
{
 "$schema": "http://json-schema.org/draft-07/schema#",
 "$id": "TreeNode",
 "type": "object",
 "properties": {
   "value": { "type": "number" },
   "left": {
     "oneOf": [
       { "type": "null" },
       { "$ref": "TreeNode" }
     ]
   },
   "right": {
     "oneOf": [
       { "type": "null" },
       { "$ref": "TreeNode" }
     ]
   }
 },
 "required": ["value", "left", "right"]
}

```


How the refactoring lead to Fan-out pattern?

It is a well known fact that Kafka Schema Registry have a few compatibility modes and the recommended one is backward compatibility and this is the one we have signed for and it is the default one as well - simply accept new only optional fields, delete fields and do not allow change of type of existing ones. The consumer always read the latest version of the schema and not the version it was produced with. With the huge difference in the schema structure, that was going to be introduced, the crash and the errors were just waiting to happen. 


Kafka Schema Registry compatibility modes.
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/76i2fjphys5o4xq843yh.png)

The only solution that could have helped us to maintain the current flat schema and gradually to introduce and accommodate the new event tree-like schema was to use the Fan-out pattern.


In Fan-out messaging scenario, messages are "pushed" to multiple subscribers, which eliminates the need to periodically check or poll for updates and enables parallel asynchronous processing of the message by the subscribers.
We were aiming at that parallel processing scenario, where our AWS SQS is subscribed to two AWS SNS topics, and our AWS SQS queue is attached as a trigger to an AWS Lambda, which pushes messages to these Kafka topics. Then AWS Lambda subscriber reads the Kafka messages from the two separate Kafka topics, and programmatically decides how to consume the messages depend on the message body structure. As a side note - Kafka topic works as a queue. 


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2dez50tfwm5v7h3nl2a8.png)

How would you achieve this?
You would start with AWS AppConfig: 

- Create a feature flag - either through the AWS Console or with your favorite serverless framework or simply by using AWS CDK.

- Create publisher (AWS Lambda).

  - Add Logic to your publisher to decide to which topic to publish message depending on the feature flag.

- Create AWS SNS topics.

- Create two separate Kafka topics.

- Create AWS SQS Fifo queue.

  - Subscribe the queue to the SNS topics.


- Create your producer AWS Lambda.

  - Attach the AWS SQS as a trigger.

  - Bind to the AWS Lambda your Kafka topics.

  - Add logic to your producer to read the message body and decide which one to push to which Kafka topic depending on the message structure. 

- Create AWS Lambda as Kafka subscriber ( for your Kafka topics ).

  - Add event source to your Lambda - the Kafka topics. 

  - Add logic to your code to read and consume the message body from Kafka topic and decide how to process further depending on the message structure. 

Keeping two separate Kafka topics, allowed us to have the current codebase and flow working uninterrupted and at the same time gave us the freedom to test the new schema without causing any problems in production stage.
Once satisfied with the test results we have been able to perform canary deployment and this approach saved us from the headache and worry about the availability of our product.


This is it!
As a side Note: You could skip the creation of the two separate AWS SNS topics and by only leveraging the AWS AppConfig feature flag to switch on and off what type of message to flow trough the SNS topic, and keep only the two Kafka topics (this is a must).

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ke54dw2lby7qpa014u3.png)

Thank you for reading! I hope you enjoy it and find it useful. Please leave a comment, would love to hear your thoughts.

