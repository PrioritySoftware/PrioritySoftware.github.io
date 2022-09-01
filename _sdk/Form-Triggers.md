---
title: Form Triggers
group: Forms
tags: 'Priority_SDK'
---

## Introduction

A form trigger in ***Priority*** is a set of SQL statements that affect
record insertions, updates and deletions during form completion. Before
creating triggers, it is important to fully understand the use of SQL
syntax in ***Priority*** (see [SQL Syntax](SQL-Syntax )).

***Priority*** provides for several types of triggers in the construction
of forms. It both includes built-in triggers of its own and enables you
to create your own triggers: Column (or Field) triggers, Row triggers
and Form triggers. This section first explains variables that are
employed in triggers, then briefly illustrates ***Priority***’s built-in
triggers, and finally provides an in-depth look at user-designed
triggers. Each type of user-designed trigger is described and
exemplified, in addition to which a series of complex examples are
presented later on.

It should be noted that the term *form trigger* is used in two senses:

-   generically, to refer to all triggers activated by either exiting a
    form column, exiting the row or entering/exiting the form;
-   to refer to a specific type of trigger — PRE-FORM and POST-FORM —
    that takes effect when the form is entered or exited, respectively.

To distinguish between these two usages, the former (generic sense) will
be called a “form trigger,” whereas the latter (specific sense) will be
called a “Form trigger.” On form debugging, see [Debug
Tools](Debug-Tools ).

{% if site.output == "web" %}
## More on Triggers

-   [SQL Variables](SQL-Variables )
-   [Built-in Triggers](Built-in-Triggers )
-   [Creating Your Own Triggers](Creating-your-Triggers )
-   [Error and Warning Messages](Errors-and-Warnings )
-   [Sending a Mail Message](Send-Mail )
-   [Changing Column Titles Dynamically](Dynamic-Column-Titles )
-   [Including One Trigger in Another](Include-Triggers )
-   [Trigger Errors and Warnings](Trigger-Errors )

## Further Reading

-   [Forms](Forms )
-   [Form Columns](Form-Columns )
-   [Sub-level Forms](Sub-level-Forms )
-   [Conditions of Record Display and Insertion](Conditions-Record-Display )
-   [Actions](Actions)
-   [Form Refresh](Form-Refresh )
-   [Accessing a Related Form](Accessing-Related-Form )
-   [Creating a Text Form](Create-Text-Form )
-   [Default Design for a Form](Default-Design )
-   [Form Preparation](Form-Preparation )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
{% endif %}