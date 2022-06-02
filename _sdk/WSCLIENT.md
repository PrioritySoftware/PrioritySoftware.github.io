---
title: Interacting with Webservices via WSCLIENT
layout: sdk_nav
group: Programming Tools
tags: 'Priority_SDK'
---

Using the WSCLIENT program you can make requests to an external web
service. The WSCLIENT program is generic and can make requests to most
web services. Use the following syntax to interface with a web service
(optional parameters are specified in square brackets \[ \]):

> EXECUTE WSCLIENT :endpoint_url, :inFile, :outFile \[, \'-msg\',
> :msgFile\] \[\[, \'-head2\', :oneHeader\] \| \[, \'-head\',
> :headerFile\]\] \[, \'-usr\', :wsUser \[, \'-pwd\', :wsUserPwd\] \[,
> \'-domain\', :userDomain\]\] \[, \'-tag\'\|\'-val\', :tagName\] \[,
> \'-action\', :soapAction\'\] \[, \'-timeout\', :msec\] \[,
> \'-content\', :contentType\'\] \[, \'-method\', :method\] ['-headout' headers_response_outfile] \[,
> \'-authname, :tokenCode\] \[, \'-urlfile\', urlfile\];
>


## WSCLIENT Parameters 

-   *:endpoint_url* -- the URL of the web service. Limited to 127
    characters.
-   *:inFile* -- the file being sent to the web service. The infile should be unicode - it will be converted as necessary if a different encoding is speficied in the *content-type*.
-   *:outFile* -- the file where the response from the web service will
    be stored.
-   *\[, \'-msg\', :msgFile\]* -- The file in which error messages will
    be recorded.
-   *\[\[, \'-head2\', :oneHeader\] \| \[, \'-head\', :headerFile\]\]*
    -- header data to be sent with the request. You can specify multiple
    instances of the *--head2* parameter, each with different headers.
    For example: `'-head2', :headerA, '-head2', :headerB,...`
    Alternatively, you can provide a single header file using *-head*.
    Note that each header file must include a new line at the end, including
    the last one.
-   *\[, \'-usr\', :wsUser \[, \'-pwd\', :wsUserPwd\] \[, \'-domain\',
    :userDomain\]* -- use to specify username, password, and domain (if
    necessary).
-   *\[, -tlscert \"certData\" \"pem password\"\]* - if asked to provide
    client-side certificate authentication, use this option. *certData*
    should be the client certificate or the path to the file in PEM
    format, while *pem password* is the password for accessing it. The
    CertData file should contain the certification and its corresponding
    private key.
-   *\[, \'-tag\'\|\'-val\', :tagName\]* -- if the response uses XML,
    you can specify a tag to extract from the response. Alternatively,
    you can use *--val* to extract the contents of the tag (without the
    tag itself).
-   *\[, \'-action\', :soapAction\'\]* -- if the web service uses SOAP,
    you can specify the SOAP action to perform.
-   *\[, \'-timeout\', :msec\]* -- wait time, in milliseconds, before
    the request times out
-   *\[, \'-content\', :contentType\'\]* -- the content type of the
    request (such as **application/json**). The default content type is
    **text/xml;charset=\\\"utf-8\\\"**.
-   *\[, \'-method\', :method\]* -- if the remote web service is REST
    based, the HTTP method. The default method is **POST**, but you can
    specify others (e.g. GET, PATCH).
-   *['-headout' headers_response_outfile]* - If some of the data returned by the response is in the header of the response (instead of the body), use this option to store the header response in a file.
-   \[, \'-authname, :tokenCode\]; -- if the remote web service uses
    OAuth2 for authorization, the OAuth2 token code that contains the
    access token. See **Interfacing With OAuth2** for more information.
-   \[, \'-urlfile\', urlfile\] -- if the URL is greater than 127
    characters, add this option to the WSCLIENT program to transmit the
    endpoint_url within an ASCII file. When using this option, the
    parameter :endpoint_url must be empty.

**Notes:**

-   Error messages are also written to the ERRMSGS table with type
    *\"w\"* under SQL.USER.
-   You can use the [XMLPARSE](XMLPARSE) command to read a response received as an
    XML or JSON file.
-   Requests sent to the web service and response received will be
    written to the server log when it is set to record
    [DEBUG](Debug-Tools#Logging ) level messages.

### Interfacing With OAuth2 

You can use **WSCLIENT** to interface with services that require
authorization by OAuth2. Doing so requires some additional setups:

1.  In **\'\'Priority**\'\', open the **OAuth2 Definitions** form.
2.  Specify a **Token Code** and **Token Description** for the web
    service.
3.  Register in the web service provider\'s website, and obtain the
    following:
    -   ClientID
    -   Secret
    -   Token URL
    -   OAuth2 URL

Fill them in the appropriate fields in the form.

1.  Next, fill in the **Redirect Url**. You can work with Automatic
    Redirect or OOB Redirect. Automatic Redirect makes the process of
    obtaining a token simpler compared to OOB which requires an
    additional step.
    -   To work with Automatic Redirect, the web service provider must
        support this option. In addition, you must have a Priority
        Application Server installed.\
        To obtain a Redirect URL, run the **Update Redirect URL**
        program from the list of actions in the **OAuth2 Definitions**
        form. The **Redirect URL** is filled in the form. Copy and
        register it with the provider.
    -   The parameters of the OOB Redirect are supplied by the web
        service provider. They should appear similar to this example:
        **<urn:ietf:wg:oauth:2.0:oob>**. Record them in the **Redirect
        URL** field in the **OAuth2 Definitions** form.
2.  Finally, fill in the **Scope**. This should also be supplied by the
    provider, and end with **offline_access**. For example: **write:vat
    read:vat offline_access**

You can now obtain the access token to work with the web service:

1.  From the **OAuth2 Defintions** form, run the **Get New Token** from
    the list of actions.
2.  A browser window opens, where you will be prompted to login to your
    account with the vendor (e.g. VAT service).
3.  If you work with Automatic Redirect, the Access Token and Refresh
    Token are obtained automatically.
4.  If you work with OOB Redirect, the browser will navigate to a new
    page, where a long string of characters appears. Copy this string
    and paste it into the input window in ***Priority***.
5.  The Access Token and Refresh Token have been filled in. If you need
    to refresh your access token in the future, you can do so by running
    **Refresh Token** from list of actions in the form.
