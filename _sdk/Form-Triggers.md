---
title: Form Triggers
layout: sdk_nav
---

## Introduction

A form trigger in ***Priority***is a set of SQL statements that affect
record insertions, updates and deletions during form completion. Before
creating triggers, it is important to fully understand the use of SQL
syntax in***Priority*** (see [SQL Syntax](SQL_Syntax "wikilink")).

***Priority***provides for several types of triggers in the construction
of forms. It both includes built-in triggers of its own and enables you
to create your own triggers: Column (or Field) triggers, Row triggers
and Form triggers. This section first explains variables that are
employed in triggers, then briefly illustrates***Priority***’s built-in
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
Tools](Debug_Tools "wikilink").

## More on Triggers

-   [SQL Variables](SQL_Variables "wikilink")
-   [Built-in Triggers](Built-in_Triggers "wikilink")
-   [Creating Your Own Triggers](Creating_Your_Own_Triggers "wikilink")
-   [Error and Warning Messages](Error_and_Warning_Messages "wikilink")
-   [Sending a Mail Message](Sending_a_Mail_Message "wikilink")
-   [Changing Column Titles
    Dynamically](Changing_Column_Titles_Dynamically "wikilink")
-   [Including One Trigger in
    Another](Including_One_Trigger_in_Another "wikilink")
-   [Trigger Errors and
    Warnings](Trigger_Errors_and_Warnings "wikilink")

## Further Reading

-   [Forms](Forms "wikilink")
-   [Form Columns](Form_Columns "wikilink")
-   [Sub-level Forms](Sub-level_Forms "wikilink")
-   [Conditions of Record Display and
    Insertion](Conditions_of_Record_Display_and_Insertion "wikilink")
-   [Direct Activations](Direct_Activations "wikilink")
-   [Form Refresh](Form_Refresh "wikilink")
-   [Accessing a Related Form](Accessing_a_Related_Form "wikilink")
-   [Creating a Text Form](Creating_a_Text_Form "wikilink")
-   [Designing a Screen-Painted
    Form](Designing_a_Screen-Painted_Form "wikilink")
-   [Form Preparation](Form_Preparation "wikilink")
-   [Help Messages](Help_Messages "wikilink")
-   [Rules for Customizing](Rules_for_Customizing "wikilink")
