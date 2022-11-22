---
title: Calculated Report Columns
layout: sdk_nav
group: Reports
tags: 'Priority_SDK'
---

## Introduction

In addition to report columns derived from tables, you can also create
columns which display data derived from other report columns. These data
are not stored in or retrieved from any database table. The value of a
calculated column is determined on the basis of other columns in the
report, including other calculated columns. To refer to other calculated
columns in an expression, use their [column
numbers](Report-Columns#Column-Numbers ).

> **Example:** The *Days Late* column (#26) in the **AGEDEBTCUST2** report
> indicates the number of days that have passed since payment was due by
> comparing today\'s date (**SQL.DATE8** --- an SQL variable) to the
> payment date (column #5):\
> `0+ (SQL.DATE8 - (#5) > 0 ? (SQL.DATE8 - (#5))/24:00 : 0)`
>
> Note the use of a question mark and colon to form an if-then-else
> expression. Roughly, this means: if the difference between today\'s
> date and the payment date is greater than 0, then divide that
> difference by 24 hours (to convert it into days); otherwise, display
> 0.

## Steps for Creating a Calculated Column 

To add a calculated column to a given report, take the following steps:

1.  In the *Report Columns* form, specify the position of the calculated column in the *Pos* column.
2.  Designate the column's width in the *Width* column. In the case of a
    real number or a shifted integer, designate decimal precision as
    well.
3.  Specify the column title in the *Revised Title* column. Note that,
    unlike regular report columns, which inherit titles from their
    respective table columns, calculated columns have to be assigned
    titles. If you forget to do so, the column will remain untitled when
    the report is run.
4.  Enter the sub-level form, *Report Column Extension*.
5.  Write the expression that determines the value of the column in the
    *Expression/Condition* column, using [SQL
    syntax](SQL-Syntax ). If there is not enough room for the
    entire expression, continue it in the sub-level form,
    *Expression/Condition (cont.)*.
6.  Designate the column type (e.g., **CHAR**, **INT**, **REAL**) in the
    *Column Type* column of the *Report Column Extension* form.

------------------------------------------------------------------------

**Notes:**

-   You can quickly view all calculated columns in a given report
    (identified by column number and title). To do so, access the
    *Calculated Columns* form, a sub-level of both the *Report Column Extension* form and the *Expression/Condition (cont.)* form.
-   Once you exit the *Report Column Extension* form, a check mark
    appears in the *Expression/Condition* column of the *Report Columns* form. This flag helps you to spot any calculated columns in
    the report at a glance.

------------------------------------------------------------------------

## Displaying Alternative Date Formats 

You can also use a calculated column to display dates in various
formats. The default is MM/DD/YY (e.g., 01/22/92) in an American date
format, or DD/MM/YY (e.g., 22/01/92) if you are using a European date
format. The DTOA (**D**ate **to A**SCII) expression is used to convert
dates into another pattern (e.g., *Fri, May-12-06*; *12 May 2006*). It
is used as follows:\
`DTOA(table.column, ’pattern’)`

> **Example:** DTOA(ORDERS.CURDATE, 'MMM DD, YYYY') converts an order
> date of 07/12/06 to Jul 12, 2006 (in American format). The type of
> such a calculated column would be **CHAR**, and its width would be 12.

------------------------------------------------------------------------

**Note:** For a list of available DTOA patterns, see [ATOD and
DTOA](ATOD-and-DTOA ).

------------------------------------------------------------------------

## Condition for a Calculated Column 

Sometimes you may wish to include a calculated column that has a
condition. In that case, you do not create a calculated column, as
described above. Instead, add a dummy column to the form (column name =
**DUMMY**; table name = **DUMMY**) and assign ***it*** the desired
condition. The condition itself must be preceded by "=1 AND" or \"=
DUMMY.DUMMY AND\".

> **Example:** Column #131 in the **ACCBYFNCPAT** (*Account Transactions
> by Type*) report includes the following expression for
> **DUMMY.DUMMY**:\
> `= 1 AND (FNCITEMS.DEBIT1 <> 0.0 OR FNCITEMS.CREDIT1 <> 0.0)`
>
> That is, the report only displays a sum when either **DEBIT1** or
> **CREDIT1** is greater or less than zero.

## Conditions in a Group by Column 

Suppose you want to create a report that displays the number of sales
orders in a designated time period for each customer, but only for
customers with more than a designated number of sales orders. In order
to achieve this, you can specify a search condition (e.g., HAVING
COUNT(\*) \> :MIN) for the group:

1.  Add a dummy column to the report (column name = **DUMMY**; table
    name = **DUMMY**).
2.  Hide the new report column.
3.  Indicate the function to be performed on the column (e.g., *Col.
    Func.* = *S*).
4.  In the *Report Column Extension* sub-level form, write an expression
    that represents the desired condition, using SQL syntax.

In the above example, you would record \"= 0 AND COUNT(\*) \> :MIN\",
where :MIN is an input variable received by the procedure that executes
the report.

If you then dump the report\'s query using the *SQL Development*
(**WINDBI**) program, you will see that the SQL query now includes the
following conditions in the GROUP BY clause:

```sql
HAVING SUM(DUMMY.DUMMY) = 0 
AND COUNT(*) &gt; :MIN 
AND (1 = 1)
```

Of course, the first and last conditions are always true.

## Using a Complex Function 

Sometimes you will want to perform a complex operation on a calculated
column (beyond a simple sum, average, minimum or maximum).

> **Example:** The **TOTALTRANSBAL** (*Inventory Movement in Period*)
> report includes a complex function in column #81 (*Avg Monthly
> Consumption*): (SUM(#56) / (#80))
>
> Column #56 displays *Outgoing Transact\'ns*, while column #80
> calculates the number of months in inventory in the period.

Complex functions are defined (like all calculated columns) in the
*Report Column Extension* form. In addition, a *Col. Func.* of type *F* must be specified.

## Further Reading 

-   [Report Columns](Report-Columns )
-   [Organizing Report Data](organize-report-data )
-   [Refining Report Data
    Display](Refine-Report-Display )
-   [Types of Reports](Report-Types )
-   [Running a Report](Run-Report )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
-   [Reports](Reports )
