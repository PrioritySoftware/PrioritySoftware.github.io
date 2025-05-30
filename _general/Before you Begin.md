---
title: Before you Begin
layout: onePage
permalink: /general
tags: "General"
---



# Before you Begin
Please read this before starting out with Priority’s REST API and Web SDK

### Introduction
Over the past couple of releases, we’ve been incredibly busy adding new tools that empower developers to create cool applications and integrations with Priority. It’s exciting to see how our innovative customers and partners use these tools in ways that we never could have imagined.

While working with these developers, we’ve gained insights into the most common pitfalls that developers encounter when getting started with these tools. Therefore, we’ve put together a checklist of items to review before you begin a development project that involves these tools.

### Understand the capabilities of the two tools and the differences between them

There are two tools you can use in order to interact programmatically with Priority entities. The **REST API** is designed for creating integrations between Priority and other systems while the **Web SDK** is great for creating mobile apps and websites that talk to Priority. Here’s a list of capabilities that are common to both tools:

*   Record level access – reading and writing to records.
*   Priority business logic – activating field-level and record-level triggers, business rules.
*   Enforce permissions – all access is executed according to the user’s permissions.


The differences between the tools are outlined in the following table:

|                 | REST API         | Web SDK       |
|--- | --- | --- | 
| Primary use | Integration - App 2 App | Specialized UI/UX for Business Logic |
| Access to the values returned by Choose/Search triggers | Not supported | Supported |
| Activation of procedures and reports | Not supported | Supported |
| Triggers | Full row inputted at once, so both field and row triggers fire at the same time | Apply at field level, and then row level |
| Uploading attachments | Supported (V. 21.0) | Supported |
| Programming language | Any programming language that provides a HTTP client | JavaScript only| 
| Standards compliance | OData [specification](https://docs.oasis-open.org/odata/odata/v4.0/odata-v4.0-part1-protocol.html) | - |



### Make sure you have the relevant skills
Both tools require basic programming skills in order to use them correctly. In addition:

For REST API: 
* RESTful Web services and HTTP
* Tools such as [PostMan](https://www.getpostman.com/).
* The programming interfaces exposed by the external system
* An understanding of the entities in the external system and how they map to the relevant Priority entities.
* Evaluate the various implementation possibilities for the integration, and choose the optimal one based on business requirements.

For SDK:
* Javascript
* Web development frameworks such as Angular or React.
* Ability to map the entities in the system being built to the matching Priority entities.

#### Help! I'm trying to use the SDK/REST API but my browser is giving me an error about CORS. What should I do?

Browsers block cross origin requests, that is how the Internet is designed. See [here](https://en.wikipedia.org/wiki/Same-origin_policy) for more information.
If this is a problem for you, you can do one of the following: 
1.  Host your code in the same domain as the Priority server.
2.  Configure CORS on the server.
3.  Host your application logic in your own server running with node.js.

Options 1 or 2 are relevant only if you control all of the Priority servers that your application will access - now and in the future.
If this is not the case, #3 is your best bet.


### Configure your Priority environment correctly
*   Both tools require a working Priority Application server.
*   Certain target platforms impose restrictions on the TLS/SSL configuration. Make sure that your target platforms support the configuration you have in place.
*   Both tools have licensing requirements. Make sure that users connecting to Priority have the appropriate licenses assigned to them.
*   REST API requires defining users as **API USERS**.

### Understand the underlying Priority entities

If you have made it to here, you are nearly ready to begin your project and programmatically interact with some cool Priority entities! However, before you get started, you need to understand how these entities work. Specifically, you need to know:
*   Which forms contain the entities?
*   Which fields are included in each form and what is their business meaning?
*   What happens when you change them?
*   In what order should they be updated?
*   Are the fields read-only? Perhaps they are mandatory?
*   And so on.
The technical documentation does not include this information. If you need additional help, please work with someone with the relevant knowledge.

### Keep your business logic on the server

As your application grows in complexity, you might be tempted to implement business logic on the application side. Resist this temptation if you can. The correct place for your application’s business logic is on the server, within the Priority form triggers and procedures. Doing so will also create additional opportunities for code reuse both inside the Priority UI and in  future additional applications. On the other hand, implementing business logic on the app side will add needless complexity to the application. 

### Don’t forget security

If you are exposing your Priority installation to the outside world, please make sure that you take all of the necessary precautions to keep your precious business data safe.

Consult with security experts!

### Ask questions

We love answering questions related to these tools on [StackOverflow](https://stackoverflow.com/). Go ahead and post your questions there, and tag them with the dedicated tag [priority-web-sdk](https://stackoverflow.com/questions/tagged/priority-web-sdk).

### Priority on Github

You're more than welcome to check out our [Github](https://github.com/PrioritySoftware) repositories. We have code samples with examples of how to use the Web SDK, and even an entire package based on the SDK that can be used for building mobile applications.

### Develop great stuff!

With all of that out of the way, we wish you much success with your project.
Keep in mind that for a great user experience, you should probably involve a UX expert in the design of your interface.
Finally, we love hearing about the cool projects that use these tools, so please – let us know!