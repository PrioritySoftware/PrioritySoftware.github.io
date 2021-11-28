Column titles can be set dynamically, so that they are assigned when the
user enters the form. This option is available for forms that are not
[screen-painted](Designing_a_Screen-Painted_Form "wikilink") and which
have a value of *T* in the *One-to-many* column of the *Form Generator*.

To change the column title, use a variable made up of the form name, the
title name and \"TITLE\".

> **Example:** To change the title of the \"TEST\" column in the
> \"MY_FORM\" form to \"New Title,\" write in the [PRE-FORM
> trigger](Creating_Your_Own_Triggers#PRE-FORM "wikilink"):
>
> ``` tsql
>  
> MYFORM.TEST.TITLE = 'New Title';
> ```
>
> See also the **FRGROUPS_DET** form.

See also [Form Triggers](Form_Triggers "wikilink").

## More on Triggers {#more_on_triggers}

-   [SQL Variables](SQL_Variables "wikilink")
-   [Built-in Triggers](Built-in_Triggers "wikilink")
-   [Creating Your Own Triggers](Creating_Your_Own_Triggers "wikilink")
-   [Error and Warning Messages](Error_and_Warning_Messages "wikilink")
-   [Sending a Mail Message](Sending_a_Mail_Message "wikilink")
-   [Including One Trigger in
    Another](Including_One_Trigger_in_Another "wikilink")
-   [Trigger Errors and
    Warnings](Trigger_Errors_and_Warnings "wikilink")
