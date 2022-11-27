---
title: Organizing Report Data
layout: sdk_nav
group: Reports
tags: 'Priority_SDK'
---

## Introduction

***Priority*** enables you to organize the data displayed in
[reports](Reports). You can ensure that records are distinct
(i.e., prevent the multiple appearance of identical records); you can sort data according to one or more columns; you can group data; you can place certain columns in a header; and you can perform certain functions upon the members of a group.

## Distinct Records 

Sometimes, a report will generate the same records more than once. Take the case of the **ORDDELAY** report, which displays all sales orders that meet two conditions:

-   they have not been fully supplied to the customer (at least one
order item is still due); and
-   the due dates of those items have already passed.

Hence, an order will be displayed if the balance of at least one of its order items is greater than 0 and its due date is prior to today's date. As several items in a given order may have a balance greater than 0, the same order can appear more than once in the report. To prevent the repeated appearance, you must indicate that records should be distinct.

Flag the *Distinct* column of the *Report Generator* form.

## Sorting

Sorting data in reports is similar to sorting records in forms. Here, too, you can assign sort priorities to one or more columns, and you may designate the type of sort (in the *Report Columns* form). The records in a given report will be sorted first according to the data in the column with the highest sort priority; then according to the data for the column with the next highest sort priority; and so on. Sorts will be performed in ascending order, unless a different sort type is specified (the other options are descending sort, alphanumeric ascending and alphanumeric descending; for details, see [Sorting Data](Form-Columns#Sorting-Data)).

**Notes:**

-   It is possible to sort data according to a column which does not
appear during report output.
-   Do not change the sorting of a standard report. Instead, copy the existing report and revise the copy to suit your needs.



## Grouping

Displayed columns are often organized into groups. When you group
records together, you can perform certain operations on the group as a
whole.

> **Example:** A report displaying sales orders groups data by customer
> and order number. Thus, all orders from the same customer are
> displayed together, and details are presented for each order in turn.
> Sales totals can then be calculated for each subgroup (i.e., order)
> and group (i.e., customer).

The columns that define the group (order, customer) are called "Group
by" columns. From one group to another, identical values are not
repeated. It is therefore advisable to group by any columns which will
otherwise repeat the same values. For instance, the customer name will
not change until there is a new customer number. Thus, you should group
by these columns. If you do not, the same customer name will be repeated
for ***each*** order of this customer.

Grouping also affects the collapse/expand functionality of reports. For each grouping level, the report shows collapse/expand buttons (as + or - symbols). The user can use these buttons to expand or collapse sections of the report based on the grouping.

Assign any "Group by" column an integer in the *Group by* column of the
*Report Columns* form. Integers need not be consecutive, but the first
"Group by" column should be assigned a value of 1. All "Group by"
columns from the same table should share the same integer; they
constitute a single "Group by" set. Records will first be grouped by the
set with the lowest integer, then by the set with the next lowest
integer, and so on.


**Notes:**

-   Grouping also affects output in tabular reports.
-   Do not change the grouping of a standard report. Instead, copy the
existing report and revise the copy to suit your needs.

## Headers

"Group by" columns can either be positioned at the leftmost side of the
report, or they can be placed in report headers, at the top of each
group. The latter option saves on horizontal space, enabling you to
display more report columns.

If you decide to use headers, ***always*** place the first "Group by" set
in the header. You can then decide whether to also include the second
"Group by" set, the third set, and so on.

To place a "Group by" column in a header, specify either *H* or *h* in the
*Header* column of the *Report Generator* form. Specify a capital
*H* whenever you wish to begin a new line in the header. Specify the
lower case *h* when you wish to continue on the same line. Both the title
of the "Group by" column (e.g., *Customer Name*) and the value of the
column (e.g., CRR Holding Company) will appear in the header. If you
want to display the value only, add a semicolon to the left of the
revised column title (e.g., ;*Customer Name*).

## Display of Grouped Records 

As mentioned above, identical values are not repeated from one group to
another. However, you can force repetition of identical values, if you
so desire. You can also add blank lines between groups or even start
each group on a new page.

-   To repeat values, specify 1 in the \'\'Repeat Group (1)*column of
the *Report Columns *form for the first "Group by" set (*Group
by\'**\'**= 1).

-   To add blank lines after the group, specify an integer (up to 10) in
the *Skip Lines* column for the first "Group by" set.

-   To start a new page for each group, specify "--1" in the *Skip
Lines* column for the first "Group by" set.

    **Note:** When multiple columns are included in the same \"Group
by\" set, a new page can only be started for the first column in the
set.

-   To let the user decide whether to add a page break before each
group, use the system variable :GROUPPAGEBREAK in the procedure that
runs the report. For example, see the **PBR** input parameter in the
    **ACCOUNTS** procedure.

## Financial Reports: Distinguishing Between Credit and Debit Balances 

When you create a report that displays financial balances (such as a
General Ledger report), there is a need to distinguish between credit
and debit balances, by placing one within parentheses. Some users prefer
to view debit balances in parentheses; others prefer credit balances. In
***Priority***, it is the value of the CREDITBAL system constant which
determines whether debit or credit balances will be enclosed in
parentheses. However, these parentheses will only appear in a column
that is flagged as a financial balance column.

**Note**: If you flag the column for a value of type CHAR, the report should not be exported to Excel. Excel will not be able to interpret the column and output a blank worksheet instead.

## Group Functions 

If records have been grouped, then the data in any column which does not
define the group may undergo one of several group functions (determined
by the value appearing in the *Group Func.* column of the *Report
Columns* form):

-   Totals can be calculated for each group (*Group Func.* = *S* for the
column to be totaled).
-   Sub-totals can be calculated for any portion of the group (*Group
Func.* = *R* for the "Group by" column in question).
-   Totals can be calculated for the entire report by designating *T* in
the *Group Func.* column.
-   Both group totals ***and*** the entire report total can be displayed.
Specify *B* instead of *S* or *T*.
-   You can repeat the previous value of a string (*Group Func.* = *R*
for the column whose data is to be repeated).
-   Cumulative balances can be calculated from one line to the next,
within each group (*Group Func.* = *A*). This is useful, for
example, in a General Ledger report, which displays credit and debit
balances that are updated for each displayed financial transaction.
In this case, you would calculate cumulative balances for the
    *Balance* column.
-   Complex total functions can be created for the group (*Group Func. =
s, t, b* for the column to be totaled) by designating *F* in the
    *Col. Func* column of the *Report Columns* form. For example, see
column 180 in the **INCOME_BUDGETS** report (*Budget P&L -
Summary*).

    **Note:**The expression must reference a calculated report column
that has been defined in the *Report Column Extension* sub-level
form (expressions in the *Expression/Condition (cont.)* sub level
form will not be taken into account). The *Column Type* of the
calculated column must be **REAL**.

-   A constant value (*Group Func.* = *C*) can be added to the
cumulative balance. For instance, the value appearing in the
    *Opening Balance* column can be added to each figure appearing in
the *Balance* column.


**Note:** There is one other group function (*H*) that applies only to
tabular reports (see below).


## Operations on Report Columns 

Several functions can be performed on an individual report column.
Depending on the value specified in the *Col. Func.*column of the
*Report Columns* form, you can obtain:

-   a sum total (*Col. Func.*= *S*)
-   an average (*A*)
-   a minimum value (*I*)
-   a maximum value (*M*)
-   a complex function (*F*) (defined in the *Report Column Extension* sub-level).

When you specify a column function, only the *result* of the operation is
displayed. That is, values for a number of lines are compressed into
values appearing in a single line. For instance, with respect to a sum
total, the same information that was detailed for a given group is
summarized into a single value.

> **Example:** The **AGEDEBTCUST2** report (*Daily Aged Receivables*) makes use of the *S* column function to summarize the
> amounts owed (in the *Cum. Sum Outstanding* and *Sum* columns).

**Note:** You can combine column and group functions.


## Additional Sub-totals in Reports 

To include sub-totals in a report, add a hidden column with the title
*#ACCTOTAL*. This will add a sub-total up to a specific point in the
report.

If you want to display positive values in the report, but to treat them
as negative values in the calculation of totals, add a hidden column
entitled *#TOTALSIGN*. When calculating the total, all lines in the
report will be multiplied by this value.

> **Example:** See the **INCOME_STATEMENT** report.

## Further Reading 

-   [Report Columns](Report-Columns )
-   [Refining Report Data
Display](Refine-Report-Display )
-   [Calculated Columns in
Reports](Calculated-Columns-Reports )
-   [Types of Reports](Report-Types )
-   [Running a Report](Run-Report )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
-   [Reports](Reports )
