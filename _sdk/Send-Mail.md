---
title: Sending an Email from a Program
layout: sdk_nav
---

## Introduction

Mail messages are similar to error and warning messages, except that
they are sent by internal or external mail to designated recipients and
can be accompanied by an attachment. Thus, you need to define one or
more users and/or e-mail addresses to which the message is to be sent,
as well as the filename (if you are sending an attachment).

**Tip:** Use ***Priority*** groups to define multiple users and/or
e-mail addresses.

> **Examples:**
>
> 1.  `MAILMSG 9 TO USER :NEXTSIGN WHERE :NEXTSIGN <> 0 AND :NEXTSIGN <> SQL.USER;`
> 2.  `<code>`{=html}:EMAIL = \'yuval\@priority-software.com\';
>
>     :   :FILE = \'C:\\tmp\\msg.doc\';
>     :   MAILMSG 5 TO EMAIL :EMAIL DATA :FILE; `</code>`{=html}

See also [Form Triggers](Form_Triggers "wikilink").

## Controlling the Appearance of Line Breaks within a Message {#controlling_the_appearance_of_line_breaks_within_a_message}

------------------------------------------------------------------------

**Note:** This feature does not support output of bi-directional
languages such as Hebrew and Arabic.

------------------------------------------------------------------------

In certain cases, the message you want to send will be longer than a
single line (i.e., message text continues into the *Error/Warning
Message (cont.)* sub-level form). In such cases, the message text will
be broken up into multiple lines.

In order to control the appearance of line breaks within a message,
include the following string in the message:

\<!\--\| priority:priform \|\--\>

***Priority*** will treat any text that follows this string as HTML
code. This enables you to include HTML tags such as line breaks in your
message, affording you a greater degree of control over the appearance
of text in the message.

> **Example:** The following e-mail is sent using the command:\
> `MAILMSG 605 TO USER :USER;`\
> Where warning message 605 contains the following:
>
> Service Call request number: `<P1>`{=html} was updated by Customer.
>
> and the *Error/Warning Message (cont.)* sub-level form contains the
> following:\
> `<P2>`{=html}`<P3>`{=html}
>
> The resulting message is sent without using HTML tags:\
> Service Call request number: ILSC123456 was\
> updated by Customer.\
> Customer: CRR\
> Holding Company\
> Date&Time: 18/10/08 14:28
>
> The second e-mail is sent using the identical command:\
> `MAILMSG 605 TO USER :USER;`\
> Where warning message 605 contains the string:
>
> \<!\--\| priority:priform \|\--\>
>
> And the *Error/Warning Message (cont.)* sub-level form contains the
> following:\
> Service Call request number: `<P1>`{=html} was updated by
> Customer.\<br>\<P2>\<br>\<P3>
>
> After line breaks are inserted using HTML tags, the same message
> appears as follows:
>
> Service Call request number: ILSC123456 was updated by Customer.\
> Customer: CRR Holding Company\
> Date&Time: 18/10/08 14:28

## Updating the History of Statuses Using MAILMSG {#updating_the_history_of_statuses_using_mailmsg}

The MAILMSG command can also be used to update the *History of Statuses*
(**DOCTODOLISTLOG**) form, by including the following syntax in the
appropriate POST- trigger:

``` tsql
:PAR1 = statustype; /* the type of document whose assigned user and status you want to record in 
the '''DOCTODOLISTLOG''' form */
:PAR2 = :iv; /* the autounique value of the record whose assigned user and status you want to 
record in the '''DOCTODOLISTLOG''' form */
MAILMSG 1 TO USER -2;
```

The parameters :PAR1 and :PAR2 are used to indicate a unique form and
record from which to retrieve the status and assigned user. The MAILMSG
command generates a new line in the *History of Statuses* form with the
user and status currently assigned to the specified record.

> **Example:** To add a new line to the *History of Statuses* sub-level
> of the *Sales Orders* (**ORDERS**) form for Order No. A00098, use the
> following syntax:
>
> ``` tsql
>  :PAR1 = 'O'; /* the Type defined for all records in the ORDERS form */ 
>  :PAR2 = '15982'; /* the internal Document (ID) of Order Number A00098 */ 
>  MAILMSG 1 TO USER -2;
> ```

You can also add this syntax to a custom POST- trigger in order to
record other changes to a form record.

> **Examples:**
>
> 1.  To update the status history for the *Tasks* form after a change
>     in the *Notes* (**CUSTNOTESTEXT**) form, add the above syntax to a
>     new custom POST-FORM trigger.
> 2.  To do the same after a change in the *Start Date* of the task, add
>     the above syntax to a new custom POST-UPDATE trigger.

------------------------------------------------------------------------

**Note:** This feature can only be used in a sub-level form, not in the
root form. For example, you cannot update the status history of an order
from the *Sales Orders* (**ORDERS**) form.

------------------------------------------------------------------------

## Sending a Link to a Document using MAILMSG {#sending_a_link_to_a_document_using_mailmsg}

You can also use the message parameters to include a link to a document
in a message.

> **Example:** Message 1 is defined as: \"Here is a link to order
> \<P1.ORDERS.F>.\"
>
> ``` tsql
> :PAR1 = 'SO1212888'; 
> MAILMSG 1 TO USER :USER; 
> ```

## More on Triggers {#more_on_triggers}

-   [SQL Variables](SQL_Variables "wikilink")
-   [Built-in Triggers](Built-in_Triggers "wikilink")
-   [Creating Your Own Triggers](Creating_Your_Own_Triggers "wikilink")
-   [Error and Warning Messages](Error_and_Warning_Messages "wikilink")
-   [Changing Column Titles
    Dynamically](Changing_Column_Titles_Dynamically "wikilink")
-   [Including One Trigger in
    Another](Including_One_Trigger_in_Another "wikilink")
-   [Trigger Errors and
    Warnings](Trigger_Errors_and_Warnings "wikilink")
