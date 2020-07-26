---
title: Before you Begin
layout: default
permalink: /general/webhooks
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

#Webhooks
[20.1]

Priority now supports webhooks!

Priority administrators can now fire webhooks from standard business prcoess management (BPM) rules and business rules. Use them to trigger operations in other apps based on events in Priority.

## Setting Up Webhooks in Priority

Before you can begin working with webhooks, you'll have to define **Webhook Endpoints**. This can be done in **System Management > System Maintenance > Periodic Maintenance > BPM Maintenance > Webhook Definitions**.

For each webhook, give it a name, and the URL of the endpoint. You can also create an authentication token to secure the webhook. Note that the authentication token is obscured as soon as you leave the line, so you should copy it immediately after generating it, and configure it in your app's webhook endpoint.

## Adding a Webhook to a Rule

