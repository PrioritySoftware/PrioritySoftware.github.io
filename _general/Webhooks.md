---
title: Working with Webhooks
layout: default
permalink: /webhooks
tags: "Webhooks"
---

<style type="text/css">
    
    ul {
        list-style-type: disc;
    }

    #main_content_wrap {
        font-size: 120%;
        width: 60%;
    }

</style>

# Webhooks

[20.1]()

Priority now supports webhooks!

Priority administrators can now fire webhooks from standard business process management (BPM) rules and business rules. Use them to trigger functions in other apps based on events in Priority.

Working with Webhooks requires the Webhooks module.

## Set Up a Webhook Handler/Catcher

Before you can set up the webhook in Priority, you'll need to set up your hook handler or catcher in your target app. The hook catcher will be set to a specific URL.

For example, in Zapier, you'd add a Zap of type **Catch Hook**. This will include the Hook Catcher URL:
![Zapier Hook Catcher](https://cdn.priority-software.com/docs/images/zapier_hook.png)


## Setting Up Webhooks in Priority

Before you can begin working with webhooks, you'll have to define **Webhook Endpoints**. This can be done in **System Management > System Maintenance > Periodic Maintenance > BPM Maintenance > Webhook Definitions**.

For each webhook, give it a name, and the URL of the hook catcher. You can also create an authentication token to secure the webhook. Note that the authentication token is obscured as soon as you leave the line, so you should copy it immediately after generating it, and configure it in your app's webhook endpoint.

## Adding a Webhook to a Business Rule

Working with webhooks is identical to creating other business rules in Priority. In this example, we'll use the **Customer Shipments** form, adding a rule that fires a webhook to our app when the delivery is on its way to the customer.

1.  Open the BPM chart in Priority via **Inventory > Inventory Transactions > Sales Inventory Transactions > Statuses for Sales Inv Transacts > BPM Flow Chart-Shipping Docs**.
2.  Add a new rule for the status used for en route goods.
3.  Under **Do the Following:**, select **Webhook**.
4.  Choose the webhook to fire from the adjacent choose list. This list is populated based on the webhooks defined in the **Webhook Definitions** form.
5.  Optional: In the message body, you can specify fields to include in the webhook payload. These will be delivered in a JSON key:value format. For example:
    ```json
    {
      "DOCUMENTS_P": {
        "PDOCNO": "SH2000000880",
        "CDES": "David Smith",
        "CURDATE": "2020-07-28T00:00:00"
      },
      "DOCTODOLIST": {
        "OWNERLOGIN": "SteveD"
      }
    }
    ```
6. As in other business rules in Priority, you can also set conditions. In this case the webhook only fires for VIP customers.


![Defining a Webhook Rule](https://cdn.priority-software.com/docs/images/webhook_bpm_definition.png)

## Full Webhook Payload

Other than the fields included in the message, the Webhook payload will always include the following data in the call headers:

| Header name | Example | Description |
|----|---|---|
|priority-form-name| DOCUMENTS_P | The internal form name in Priority |
|priority-bpm-subject | Your order is on its way | The subject of the rule message in Priority |
|priority-bpm-id | 245988 | ID number of the rule in Priority |
|priority-bpm-name | Shipment Webhook | The business rule description in Priority|
|priority-bpm-token| D6D4545CE5AB4827BB51CA3C03005D1D | authentication token for this webhook as recorded in **Webhook Definitions** form |

As previously mentioned, the body will contain a json of field values added to the business rule message.

```json
    {
      "DOCUMENTS_P": {
        "PDOCNO": "SH2000000880",
        "CDES": "David Smith",
        "CURDATE": "2020-07-28T00:00:00"
      },
      "DOCTODOLIST": {
        "OWNERLOGIN": "SteveD"
      }
    }
```