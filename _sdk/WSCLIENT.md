---
title: Interacting with Webservices via WSCLIENT
group: Programming Tools
tags: 'Priority_SDK'
---

Using the WSCLIENT program you can make requests to an external web
service. The WSCLIENT program is generic and can make requests to most
web services. Use the following syntax to work with a web service
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
    request (such as **application/json**).  Adds an approriate content-type header to the request.\
    In the case of XML, the content type must match the one encoding specified in the XML file header, e.g.
    **text/xml;charset=\"utf-8\"** should be matched in the XML with:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    ```
-   *\[, \'-method\', :method\]* -- if the remote web service is REST
    based, the HTTP method. The default method is **POST**, but you can
    specify others (e.g. GET, PATCH).
-   *['-headout' headers_response_outfile]* - If some of the data returned by the response is in the header of the response (instead of the body), use this option to store the header response in a file.
-   \[, \'-authname, :tokenCode\]; -- if the remote web service uses
    OAuth2 for authorization, the OAuth2 token code that contains the
    access token. See **Authenticating With OAuth2** for more information.
-   \[, \'-urlfile\', urlfile\] -- if the URL is greater than 127
    characters, add this option to the WSCLIENT program to transmit the
    endpoint_url within an ASCII file. When using this option, the
    parameter :endpoint_url must be an empty string:\
    <code>EXECUTE WSCLIENT '', :INFILE, :OUTFILE</code>

**Notes:**

-   Error messages are also written to the ERRMSGS table with type
    *\"w\"* under SQL.USER.
-   You can use the [XMLPARSE](XMLPARSE) command to read a response received as an
    XML or JSON file.
-   Requests sent to the web service and response received will be
    written to the server log when it is set to record
    [DEBUG](Debug-Tools#Logging ) level messages.

### Authenticating With OAuth2 

You can use **WSCLIENT** to communicate with services that require
 OAuth2 authentication. Doing so requires some additional setups:

1.  In **Priority**, open the **OAuth2 Definitions** form.
2.  Record a **Token Code** and **Token Description** for the web
    service. You should use your custom prefix for the code, e.g. **DEMO_TOKEN**.
3.  Register in the web service provider\'s website, and obtain the
    following:
    -   ClientID
    -   Client Secret & Client Secret 2 (if the secret exceeds the width of Client Secret)
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
        **<urn:ietf:wg:oauth:2.0:oob>**. Record them in the **Redirect URL** field in the **OAuth2 Definitions** form.
2.  Fill in the **Scope**. This should also be supplied by the provider, and end with **offline_access**. For example: **write:vat read:vat offline_access**.

The following fields are only available starting with version 22.1:

3.  Additional parameters for the URL can be specified in **Additional Parameters**.
4.  The checkboxes control the behavior of the tokens:
    - **Encrypted Tokens** - will automatically encrypt the received tokens so users cannot copy tokens of other users.
    - **By User** - if selected, users can only view their own tokens in the sub-level forms.
    - **Multi-company** - determines whether token is multi-company, i.e. persists between different companies in the system. Single-company tokens need a new token per company in the system.

You can now obtain the access token to work with the web service:

1.  In the **OAuth2 Data** subform, record an **Entity ID** and **Description** and run the **Get New Token** from the list of actions.\
    Starting with version 22.1, you can also define tokens as multi-company and obtain tokens in the **Auth Data (Multienv)** subform instead.
2.  A browser window opens, where you will be prompted to login to your account with the vendor (e.g. VAT service).
3.  If you work with Automatic Redirect, the Access Token and Refresh Token are obtained automatically.
4.  If you work with OOB Redirect, the browser will navigate to a new page, where a long string of characters appears. Copy this string
    and paste it into the input window in ***Priority***.
    <!-- TODO: Review Get New Token vs. Get Token w/Redirect -->
5.  The Access Token and Refresh Token have been filled in. If you need to refresh your access token in the future, you can do so by running
    **Refresh Token** from list of actions in the form.
