[Form preparation](Form_Preparation "wikilink") will fail if any major
trigger errors are encountered. The main trigger errors are:

-   SQL syntax errors
-   illegal or irresolvable variable types
-   syntax errors in [#INCLUDE
    commands](Including_One_Trigger_in_Another "wikilink")
-   #INCLUDE commands that refer to non-existent forms, form columns or
    triggers
-   [form column
    variables](SQL_Variables#Form_Column_Variables "wikilink") that
    refer to non-existent form/form column combinations (e.g.,
    :ORDERS.CUSTNAME, when there is no **CUSTNAME** column in the
    **ORDERS** form)
-   [ERRMSG or WRNMSG commands](Error_and_Warning_Messages "wikilink")
    that refer to message numbers not specified for the form in
    question.

In addition, warning messages (without causing form preparation to fail)
might be generated when the same local variable is used for two distinct
types. Even though form preparation succeeds in this case, it is
nevertheless recommended that you take care of all the problems that
generated the warning messages.

> **Example:** The same variable name contains a value of **INT** type
> in one trigger and a value of **CHAR** type in another.

## More on Triggers {#more_on_triggers}

-   [SQL Variables](SQL_Variables "wikilink")
-   [Built-in Triggers](Built-in_Triggers "wikilink")
-   [Creating Your Own Triggers](Creating_Your_Own_Triggers "wikilink")
-   [Error and Warning Messages](Error_and_Warning_Messages "wikilink")
-   [Sending a Mail Message](Sending_a_Mail_Message "wikilink")
-   [Changing Column Titles
    Dynamically](Changing_Column_Titles_Dynamically "wikilink")
-   [Including One Trigger in
    Another](Including_One_Trigger_in_Another "wikilink")
-   [Form Triggers](Form_Triggers "wikilink")
