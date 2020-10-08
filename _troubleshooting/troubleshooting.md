---
title: troubleshooting
layout: default
permalink: /troubleshooting
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

This page contains frequent issues that crop up when working with the Web SDK or REST API.

### Help! I'm trying to use the SDK/REST API but my browser is giving me an error about CORS. What should I do?

Browsers block cross origin requests, that is how the Internet is designed. See [here](https://en.wikipedia.org/wiki/Same-origin_policy) for more information.
If this is a problem for you, you can do one of the following: 
1.  Host your code in the same domain as the Priority server.
2.  Configure CORS on the server.
3.  Host your application logic in your own server running with node.js.

Options 1 or 2 are relevant only if you control all of the Priority servers that your application will access - now and in the future.
If this is not the case, #3 is your best bet.


