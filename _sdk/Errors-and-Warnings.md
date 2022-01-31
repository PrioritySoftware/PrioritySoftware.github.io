---
title: Error and Warning Messages
layout: sdk_nav
group: Forms
tags: 'Priority_SDK'
---

## Introduction

Triggers which perform verification checks should include error message
(ERRMSG) or warning message (WRNMSG) commands. When they succeed, both
these commands generate a message. However, whereas trigger execution
continues when a warning message command is successful, it halts once an
error message command is successful.

**Tip:** The system manager can change any warning into an error message
via the *Privilege Explorer*. For details, run the *Privilege Explorer
Wizard*.

See also [Form Triggers](Form-Triggers ).

## Activating the Command 

To activate an ERRMSG or WRNMSG command, use the following syntax:


**ERRMSG** *number* [ **WHERE** *condition* ];\
**WRNMSG** *number* [ **WHERE** *condition* ];

The number refers to the message that will be generated. For example,

```sql
ERRMSG 4 WHERE :$.TYPE NOT IN ('O','R','P');
```

will cause message 4 ("Specify P (part), R (raw material) or O
(other).") to appear if the part type is not *O, R* or *P*.

## Specifying the Message Content 

For any given form, all ERRMSG and WRNMSG commands appearing in any
trigger must be accompanied by error and warning messages. Moreover, it
is important to ensure that the message is assigned the same number as
the one referred to in the appropriate command. If the form preparation
mechanism encounters a trigger with an ERRMSG or WRNMSG command and no
message to accompany it, a warning will appear in the *Warnings Report*:

> There is no message number X for Y form (appears in Z trigger).

If this warning is not heeded, and the form is loaded, the trigger will
work normally. However, ***instead of*** its designated error or warning
message, the user will receive the above message.

The content of each message is generally written in the *Error & Warning
Messages* form. Each new message should be assigned a number greater
than 500. Actually, there are three *Error & Warning Messages* forms
that can be used interchangeably:

-   the **FORMMSG** form, a sub-level of the *Form Generator* form;
-   the **TRIGMSG** form, a sub-level of the *Row & Form Triggers -
    Text* form, which allows you to view the contents of the Row or Form
    trigger that generates the message;
-   the **TRIGCLMSG** form, a sub-level of the *Form Column Triggers -
    Text* form, which allows you to view the contents of the Column
    trigger that generates the message.

If the message is longer than a single line, it may be continued in the
sub-level of each of the above forms.

Storing the error/warning messages in separate tables from the triggers
themselves gives them autonomous status. This is useful in two respects.
First, it enables the messages to be displayed in the *Form Messages*
dictionary. Hence, messages for different forms can be retrieved
together, which helps the form designer to unify their style. Second, it
enables ***Priority***'s translation facility to take the messages into
account. Thus, while the contents of triggers will remain the same, the
error and warning messages that are generated by these triggers can be
displayed in another language.

In any given error or warning message, you can refer to a specific
**Priority*** entity using a special format:
**{**entity_name.**{ **F** \| **R** \| **P** \| **M** } **}**,
where F = form, R = report, P = procedure, M = menu. That is, you
designate the entity name and type, and the entity's title will appear
in their place. This format is useful because entity names are rarely
changed, whereas titles are rather likely to be modified in upgraded or
customized versions. In this way, the most up-to-date title will appear
in your message.

> **Example:** You can create a warning message for a trigger in the
> **SHIPTO** (*Shipping Address*) form which refers to the *Customers*
> form: <code>The shipping address is identical to the customer's mailing
> address. See the {CUSTOMERS.F} form.</code>

Remember to check that the entity name and type have been correctly
written, that is, the entity you specified really exists.

You can also create a warning message (WRNMSG), error message (ERRMSG)
or send mail message (MAILMSG) that displays the content of a text file.
Within the trigger in question, define a variable of **FILE** type
called MESSAGEFILE and specify **msg_number** = 1000000. This message
number should not appear in the *Error & Warning Messages* form.

> **Example:** A CHECK-FIELD trigger might contain the following code:
>
> ```sql
> SELECT SQL.TMPFILE INTO :MESSAGEFILE FROM DUMMY;
> SELECT 'Sample message' FROM DUMMY ASCII UNICODE :MESSAGEFILE;
> ERRMSG 1000000;
> ```

## General Error Messages 

To assist in creating a unified language for your users, you can create
error messages that can be called from any entity. To do so, use the
following syntax:

**GENMSG** *number* \[ **WHERE** *condition* \];

To add additional general messages, open the **Compiled Programs** form,
retrieve the GENMSG program, and add your message in the **Program
Messages** sub-level, following the development rules (message number \>
500).

## Require Password Reentry 

In certain cases, you may wish to prompt the user to reenter their
password when performing a certain action in a field (e.g. flagging a
purchase order as approved).

 **Note:** This functionality is only supported in the Priority Web interface.

**To prompt the user to reenter their password:**

Create a new warning message (WRNMSG) trigger. Within the trigger in
question, specify **msg_number** = 1000001. This message number should
not appear in the *Error & Warning Messages* form. After the user makes
a change to the field, a password prompt will appear, with the following
fields:

1.  **Username** - a text field with a default value of the current
    user\'s name. Altering the username will automatically fail the
    password check -- the check will not be performed and a value of 1
    will be returned.
2.  **Password** -- empty password field. This field automatically hides
    the characters entered (using asterisks/bullets), and its content
    cannot be copied to the clipboard. By default, it is the active
    field when the password prompt appears.
3.  **OK** and **Cancel** buttons.

The results of the password prompt are returned in a special variable
PWD_RETVAL, with the following possible values:

-   **1** - Username was changed and therefore no password check was
    performed.
-   **2** - Username is unchanged and the password was correct.
-   **3** - Username is unchanged and the password was not correct.
-   **4** - The user pressed the **Cancel** button.

## Message Parameters 

An error or warning message can include parameters (a maximum of three
per message) --- `<P1>`, `<P2>` and `<P3>`. The
values to be assigned to these parameters are defined in the trigger
that generates the message, by means of the system variables :PAR1,
:PAR2 and :PAR3.

> **Example:** The CHECK-FIELD trigger for the **PARTNAME** column of
> the **PORDERITEMS** form checks that the specified order item is sold
> by the vendor to which the order is made:\
>
> ```sql
> WRNMSG 140 WHERE NOT EXISTS /* Don't give warning for nonstandard*/
> (SELECT 'X' FROM PARTPARAM WHERE PART =
> (SELECT PART FROM PART WHERE PARTNAME = :$.@)
> AND NSFLAG = 'Y')
> AND NOT EXISTS
> (SELECT 'X' FROM SUPPART, PART WHERE SUPPART.SUP = :$$.SUP
> AND SUPPART.VALIDFLAG = 'Y'
> AND SUPPART.PART = PART.PART AND PART.PARTNAME = :$.@);
> ```
>
> Warning message 140 would then be: Vendor `<P1>` does not
> supply this part. PAR1 is filled in by the appropriate vendor number.

The variables :PAR1,:PAR2 and :PAR3 are of **CHAR** type. If you wish to
assign a form column variable which is of a different type to a message
parameter, you will have to first convert it to a string (use
[**ITOA**](Scalar-Expressions#Strings ) for an
integer and [**DTOA**](ATOD-and-DTOA ) for a date).

> **Example:** To insert the order date into a message parameter,
> include the following statement in the trigger:
>
> ```sql
> :PAR1 = DTOA (:$.CURDATE, ’MM/DD/YY’)
> ```

## More on Triggers 

-   [SQL Variables](SQL-Variables )
-   [Built-in Triggers](Built-in-Triggers )
-   [Creating Your Own Triggers](Creating-your-triggers )
-   [Sending a Mail Message](Send-Mail )
-   [Changing Column Titles
    Dynamically](Dynamic-Column-Titles )
-   [Including One Trigger in
    Another](Include-Triggers )
-   [Trigger Errors and
    Warnings](Trigger-Errors )