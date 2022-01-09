---
title: Types of Reports
layout: sdk_nav
---


## Tabular Reports 

[Reports](Reports ) can also be displayed in tabular form,
divided into columns and rows. Such tables succinctly summarize report
data. To define a report as tabular, specify *T*in the *Type*column of
the *Report Generator*form.

Each tabular column displays data for the report column which has been
assigned a graphic display value of *X*(in the *Graphic Display*column
of the *Report Columns*form).The order in which these data appear is
determined by a non-displayed column (e.g., the internal part number)
that has been assigned a graphic display value of *O*. This is
particularly useful when the *X*data display dates. If you have not
assigned *O*to any column, then the *X*data will be sorted
alphanumerically. Finally, the content of the table cell is determined
by the report column (or columns) which has been assigned a graphic
display value of *T*.

> **Example:** In the **AGEDEBT_T\_C** report, which displays monthly
> customer aging data, the X column displays the month (Jan-06, Feb-06,
> etc.). In order to sort correctly by month number, rather than month
> name, a hidden sort column (type *O*) is used (see column #102).

**Notes:**

-   Each [group](Organizing-Report-Data#Grouping) appears in
    a separate row in the table.
-   You can save horizontal space by using vertical mode (specify *V* in
    the *Table Display Mode* column of the *Report Generator* form).
-   If only one row is displayed for the group in question, you can to
    choose to hide its title (specify *h* in the *Table Display Mode*
    column).

### Totals

The table can display row totals, sum totals (per row and group) and/or
grand totals (for all groups and all rows). This is achieved by
assigning a group function to the column in question, as follows:

-   If a row total (group function = *H*) has been specified, each row
    will be totaled.
-   If a sum total (group function = *S)*has been specified, each group
    and row will be totaled.
-   If a total (group function = *T*) has been specified, column totals
    will appear.
-   If both a sum and a total (group function = *B*) have been
    specified, the table will display row totals, group totals, column
    totals and a grand total.

## Multi-Company Reports 

You can define a report to display data from multiple companies
(databases). In order to create such a multi-company report, add the
following columns to the report:

-   A displayed column, with a *Column Name* of TITLE and a *Table Name*
    of ENVIRONMENT.
-   A hidden column, with a *Column Name* of DNAME and a *Table Name* of
    ENVIRONMENT. Its *Expression/Condition* should be: = SQL.ENV

> **Example:** See the **ORDERSREP** report.

**Note:**The companies displayed in the report are the ones the user has
selected via *Define Multiple Companies*(in the *File* menu).

## Processed Reports 

A [procedure](Procedures ) is a batch of executable steps that
are carried out in a predefined sequence. One of the steps in a
procedure may be the processing of report data. Thus, any given report
may be part of a procedure. Include a report step in a procedure when
the report requires manipulations other than simple averages, sum
totals, minimums or maximums. The procedure allows for more complex
operations to be performed on data. For a detailed explanation, see
[Processed Reports](Processed-Reports ). Generally, you
include a report in a procedure via the *Procedure Steps* form, a
sub-level of the *Procedure Generator* form. You can then view that
linkage in the *Procedure Link* form, another sub-level of the *Report
Generator* form.

## Further Reading 

-   [Report Columns](Report-Columns )
-   [Organizing Report Data](Organizing-Report-Data )
-   [Refining Report Data
    Display](Refining-Report-Data-Display )
-   [Calculated Columns in
    Reports](Calculated-Columns-in-Reports )
-   [Running a Report](Running-a-Report )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Rules-for-Customizing )
-   [Reports](Reports )
