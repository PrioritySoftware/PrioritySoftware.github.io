---
title: Including One Trigger in Another
layout: sdk_nav
---

## The INCLUDE Command 

The #INCLUDE command enables you to use the same trigger more than once
without rewriting it.

To include the same trigger elsewhere, use the following syntax (note
that there is no semi-colon at the end of the statement):
`<code>`{=html}

:   **#INCLUDE** *form_name / trigger_name*\
:   **#INCLUDE** *form_name / form_column_name / trigger_name*

`</code>`{=html} When a trigger is included in one or more other
triggers, the entire contents of the former are inherited by the latter.
Thus, if the CHECK-FIELD trigger for the **TYPE** column in the **PART**
form is identical to the CHECK-FIELD trigger for the **TYPE** column in
the **LOGPART** form, you could write the trigger for one column and
include it in the other:

CHECK-FIELD for **TYPE** column in **PART** form:\
:`ERRMSG 4 WHERE :$.TYPE NOT IN ('O','R','P');`

CHECK-FIELD for **TYPE** column in **LOGPART** form:\
:`#INCLUDE PART/TYPE/CHECK-FIELD`

Moreover, you can write more statements to the latter (*including*)
trigger which do not apply to the former (*included*) trigger (before or
after the include command).

In contrast, any additions to the included trigger will automatically be
attached to the including trigger as well. That is, if changes are made
in an included trigger, this will affect all forms that include it;
thus, all forms involved will have to be prepared as executable files by
the form preparation mechanism.

If the included trigger is deleted, the error will be revealed during
the form preparation of any forms that include that trigger.

**Tip:** To view the original trigger, move to the #INCLUDE line and
press **F6**. The trigger text appears in the sub-level form, *Row &
Form Triggers -- Text*.

See also [Form Triggers](Form-Triggers ).

## Using Buffers 

Often, it is more efficient to include only a portion of a trigger. That
is, several triggers may share the same set of SQL statements, but each
trigger also has additional statements of its own. In such a case, a
special type of trigger, called a "buffer," should be defined. This
buffer should hold all the shared SQL statements and it should be
included in any trigger that uses this group of statements.

> **Example:** Almost no document in the system (e.g., *Goods Receiving
> Voucher, Customer Shipments, Customer Returns*) can be revised once
> it's final. The relevant sub-level forms (*Received Items, Shipped
> Items, Returned Items*) should therefore include the same check. Thus,
> the PRE-INSERT trigger of all these sub-level forms includes the same
> trigger that performs the check:
>
> ``` tsql
> #INCLUDE TRANSTRIG/BUF10 /* Check CANCEL and FINAL */ 
> ```

## Naming Buffers 

A buffer may either be numbered (BUF1, BUF2, BUF3, \..., BUF19) or
assigned a trigger name that hints at its usage. Before any buffer name
can be used, it must first be added to the *List of Triggers* form,
which can be accessed by pressing **F6** from the *Row & Form Triggers*
form or from the *Form Column Triggers* form. Numbered buffers already
appear in this list.

The restrictions on buffer names are virtually identical to those of
[customized
triggers](Creating-Your-Own-Triggers#Naming-Customized-Triggers ).
The only difference is that, of course, no key strings may be used.

## Nesting INCLUDE Commands 

The #INCLUDE command can be nested. That is, one trigger can include
another, which in turn includes a third trigger (and so on).

> **Example:** The PRE-INSERT trigger of the **TRANSTRIG** form includes
> many buffers from the same form. (The **TRANSTRIG** form is a special
> form that only contains triggers included in other forms.)

## Advantages of the Wildcards 

Wildcards (\$ and @) are very useful when including one trigger in
another. This is because the wildcard has a relative meaning, which
depends upon the form in which the trigger is activated.

> **Example:** :\$\$.DOC in the PRE-INSERT trigger of the *Received
> Items* form refers to :DOCUMENTS_P.DOC, whereas in the PRE-INSERT
> trigger of the *Shipped Items* form, it refers to :DOCUMENTS_D.DOC.

## Error and Warning Messages 

Triggers inherit not only all SQL statements from the included trigger
(or buffer), but also their accompanying [error and warning
messages](Error-and-Warning-Messages ). The scope of the
messages is all the triggers written for this form.

## Checking Trigger Usage 

Caution must be exercised when revising a trigger that is included in
other triggers, as any changes in the former will obviously affect the
latter. You can view any triggers that include the current trigger in
the *Use of Trigger* sub-level form of *Form Column Triggers* and of
*Row & Form Triggers*.

## More on Triggers 

-   [SQL Variables](SQL-Variables )
-   [Built-in Triggers](Built-in-Triggers )
-   [Creating Your Own Triggers](Creating-Your-Own-Triggers )
-   [Error and Warning Messages](Error-and-Warning-Messages )
-   [Sending a Mail Message](Sending-a-Mail-Message )
-   [Changing Column Titles
    Dynamically](Changing-Column-Titles-Dynamically )
-   [Trigger Errors and
    Warnings](Trigger-Errors-and-Warnings )
