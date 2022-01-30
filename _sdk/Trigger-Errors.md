---
title: Trigger Errors
layout: sdk_nav
group: Forms
tags: 'Priority_SDK'
---

[Form preparation](Form-Preparation ) will fail if any major
trigger errors are encountered. The main trigger errors are:

-   SQL syntax errors
-   illegal or irresolvable variable types
-   syntax errors in [#INCLUDE
    commands](Include-Triggers )
-   #INCLUDE commands that refer to non-existent forms, form columns or
    triggers
-   [form column
    variables](SQL-Variables#Form-Column-Variables ) that
    refer to non-existent form/form column combinations (e.g.,
    :ORDERS.CUSTNAME, when there is no **CUSTNAME** column in the
    **ORDERS** form)
-   [ERRMSG or WRNMSG commands](Errors-and-Warnings )
    that refer to message numbers not specified for the form in
    question.

In addition, warning messages (without causing form preparation to fail)
might be generated when the same local variable is used for two distinct
types. Even though form preparation succeeds in this case, it is
nevertheless recommended that you take care of all the problems that
generated the warning messages.

> **Example:** The same variable name contains a value of **INT** type
> in one trigger and a value of **CHAR** type in another.

## More on Triggers 

-   [SQL Variables](SQL-Variables )
-   [Built-in Triggers](Built-in-Triggers )
-   [Creating Your Own Triggers](Creating-your-triggers )
-   [Error and Warning Messages](Errors-and-Warnings )
-   [Sending a Mail Message](Send-Mail )
-   [Changing Column Titles
    Dynamically](Dynamic-Column-Titles )
-   [Including One Trigger in
    Another](Include-Triggers )
-   [Form Triggers](Form-Triggers )
