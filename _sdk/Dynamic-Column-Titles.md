---
title: Changing Column Titles Dynamically
layout: sdk_nav
group: Forms
tags: 'Priority_SDK'
---

Column titles can be set dynamically, so that they are assigned when the
user enters the form. This option is available for forms that do not have a default design, and which have a value of *T* in the *One-to-many* column of the *Form Generator*.

To change the column title, use a variable made up of the form name, the
title name and \"TITLE\".

> **Example:** To change the title of the \"TEST\" column in the
> \"MY_FORM\" form to \"New Title,\" write in the [PRE-FORM
> trigger](Creating-your-Triggers#PRE-FORM ):
>
> ```sql
> MYFORM.TEST.TITLE = 'New Title';
> ```
>
> See also the **FRGROUPS_DET** form.

See also [Form Triggers](Form-Triggers ).

## More on Triggers 

-   [SQL Variables](SQL-Variables )
-   [Built-in Triggers](Built-in-Triggers )
-   [Creating Your Own Triggers](Creating-your-Triggers )
-   [Error and Warning Messages](Errors-and-Warnings )
-   [Sending a Mail Message](Send-Mail )
-   [Including One Trigger in
    Another](Include-Triggers )
-   [Trigger Errors and
    Warnings](Trigger-Errors )
