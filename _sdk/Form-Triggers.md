---
title: Form Triggers
layout: sdk_nav
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

## More on Triggers

-   [SQL Variables](SQL-Variables )
-   [Built-in Triggers](Built-in-Triggers )
-   [Creating Your Own Triggers](Creating-Your-Own-Triggers )
-   [Error and Warning Messages](Error-and-Warning-Messages )
-   [Sending a Mail Message](Sending-a-Mail-Message )
-   [Changing Column Titles
    Dynamically](Changing-Column-Titles-Dynamically )
-   [Including One Trigger in
    Another](Including-One-Trigger-in-Another )
-   [Trigger Errors and
    Warnings](Trigger-Errors-and-Warnings )

## Further Reading

-   [Forms](Forms )
-   [Form Columns](Form-Columns )
-   [Sub-level Forms](Sub-level-Forms )
-   [Conditions of Record Display and
    Insertion](Conditions-of-Record-Display-and-Insertion )
-   [Direct Activations](Direct-Activations )
-   [Form Refresh](Form-Refresh )
-   [Accessing a Related Form](Accessing-a-Related-Form )
-   [Creating a Text Form](Creating-a-Text-Form )
-   [Designing a Screen-Painted
    Form](Designing-a-Screen-Painted-Form )
-   [Form Preparation](Form-Preparation )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Rules-for-Customizing )
