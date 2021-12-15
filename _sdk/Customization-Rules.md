---
title: Customization Rules
layout: sdk_nav
---


## Forms

-   ***Never*** use a standard base table to create your own form.
    Create your own table instead.
-   Include the appropriate four-letter prefix (e.g., **XXXX_ORDERS**)
    in the name of any form you create.
-   When modifying a standard form, any newly added column must start
    with your four-letter prefix.
-   You cannot delete a standard column from a standard form.
-   When creating your own [multiple
    joins](Form_Column_Attributes#Special_Joins "wikilink"), use a join
    ID and column ID greater than 5.
-   Any [trigger](Creating_Your_Own_Triggers "wikilink") you add must
    start with a four-letter prefix or end with a four-letter suffix.
    Choose the first letter in the prefix/suffix for sorting purposes;
    the rest of the prefix/suffix should be the one normally used for
    this customer.

:   **Important note:** [SEARCH-FIELD
    triggers](Creating_Your_Own_Triggers#SEARCH-FIELD "wikilink") are
    the one exception to this rule, as their name cannot be changed.
    Instead, you have to use the standard trigger. This creates the
    slight risk that your trigger will be overwritten by a standard
    SEARCH-FIELD trigger that is changed in future software revisions.

-   Any [variable](SQL_Variables#User-defined_Variables "wikilink") that
    you add to a standard form should start with the same four-letter
    prefix. If it does not, you run the risk of duplicating a system
    variable, which will have an adverse effect. It is not sufficient to
    check that such a variable does not already exist in the trigger, as
    it may be added in future software revisions.
-   Any [form message](Error_and_Warning_Messages "wikilink") that you
    add must be assigned a number greater than 500.

------------------------------------------------------------------------

**Note:** For general guidelines for development, see [Working with
Version
Revisions](Installing_Your_Customizations#Working_with_Version_Revisions "wikilink").

------------------------------------------------------------------------

## Reports

-   If you revise a standard report, you must follow some rules to
    ensure that your customizations are not overwritten by future
    ***Priority*** releases:
-   Any columns that you add to a standard report must have an internal
    number (*Col. Number*) greater than 500. After assigning the column
    number, you will probably need to fix the position of the column.
-   If you add a join to a new table, assign a *Join ID* greater than 5.
-   Do not change the sorting or grouping of standard reports. If you
    have to do so, copy the standard report and create one of your own.
-   You cannot delete a standard column from a standard report.
-   Include the appropriate four-letter prefix (e.g., **XXXX_ORDERS**)
    in the name of any report you create.
-   When creating your own multiple joins, use a join ID and column ID
    greater than 5.
-   Whenever you revise a standard report or write a new one, it is
    imperative to check the report\'s optimization. To do so, run the
    *SQL Development* (**WINDBI**) program (*System Management →
    Generators → Procedures*). From the **Optimization** menu, select
    **Report Optimization** and record the internal name of the relevant
    report.

------------------------------------------------------------------------

**Note:** For general guidelines for development, see [Working with
Version
Revisions](Installing_Your_Customizations#Working_with_Version_Revisions "wikilink").

------------------------------------------------------------------------

## Procedures

-   You cannot revise a standard procedure. Instead, you must copy it
    and make revisions to the copy. If the procedure runs one or more
    reports, you may need to copy the reports as well (depending on the
    type of revisions desired; see [Reports](Reports "wikilink")).
-   Include the appropriate four-letter prefix (e.g.,
    **XXXX_WWWSHOWORDER**) in the name of any procedure you create.
-   When creating a copy of a standard procedure that runs a program, do
    not change any of the parameters that are transferred to the
    program.

------------------------------------------------------------------------

**Note:** For general guidelines for development, see [Working with
Version
Revisions](Installing_Your_Customizations#Working_with_Version_Revisions "wikilink").

------------------------------------------------------------------------

## Further Reading {#further_reading}

-   [Forms](Forms "wikilink")
-   [Reports](Reports "wikilink")
-   [Procedures](Procedures "wikilink")
