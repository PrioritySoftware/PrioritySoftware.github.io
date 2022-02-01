---
title: Report Display
layout: sdk_nav
group: Reports
tags: 'Priority_SDK'
---

## Report Column Attributes 

Report columns inherit the name, title, type, width and decimal
precision (in the case of **REAL**or **INT** columns) of the table
columns whose data they display. With the exception of column name, all
these report attributes may be modified, where desired.

To record attributes for report columns, use the appropriate columns in
the *Report Columns* sub-level of the *Report Generator* form, unless
otherwise designated.

See also [Reports](Reports ).

## When Creating a New Report 

When you are creating your own report manually (and not copying an
existing report), you need to decide upon the table columns that will
make up the report. These columns may be derived from several different
tables. The columns that make up a report can be assigned automatically
or manually.

To add report columns automatically, enter the *Report Tables*sub-level
of the *Report Generator*form, and specify all tables from which data
are derived.

**Tip:** Move to the *Table Name* column and press **F6**. You will
access the *Table Dictionary*, in which you can retrieve table names.

The order in which report tables are specified will affect the positions
of the derived report columns. The columns of the first table to be
designated will receive the first positions, those assigned to the
second table will receive the next ones, and so on. Within each table,
columns will be positioned in order of their insertion into the table.
These column positions, which determine the order in which report
columns are displayed, may be revised, where desired. You can also
delete the records (from the *Report Columns* form) for those table
columns which you do not need in the report, or you can hide unneeded
columns.

> **Example:** There is no need for the following columns in the
> **CUSTOMERS** table to appear in a report for sales orders: address,
> city/state, zip code, phone number, price list, internal customer
> number.


**Note:** See [Rules for Customizing](Customization-Rules ).

## Adding Report Columns 

To assign report columns yourself (whether to a new report or to an
existing one), enter the *Report Columns* form and specify column
position, column name and table name. As with forms, the order in which
columns appear in the report is determined by their relative position
(an integer). Integers determining column position need not be
consecutive. The column assigned the lowest integer will appear first,
that with the next highest integer will appear second, and so on.

**Tip:** Press **F6** from the *Column Name* column to access the
*Column Dictionary* or press **F6** from the *Table
Name* column to access the *Table Dictionary*. The *Columns* sub-level
form of the *Table Dictionary* displays all columns that belong to a
given table.

Certain restrictions apply to report column names:

-   Only alphanumeric values (uppercase and lowercase letters and
    digits) and the underline sign may be used (no spaces).
-   The name must begin with a letter.
-   You may not use a reserved word (a list of reserved words appears in
    the *Reserved Words* form --- *System Management → Dictionaries*).
-   The name assigned to any newly created report column must include a
    common four-letter prefix (the same one you use for all entities
    that you add to ***Priority*** for the customer in question).

## Column Numbers 

Each report column is identified by its unique column number, which is
assigned automatically by the system. This number is used to identify
the column in expressions. When report columns are added automatically
(in a new report), the column with the lowest position receives column
number 1, the next column is numbered 2, and so on. When columns are
added to the report manually, the column number is copied from the
column position. If another column already has that ID number, the new
column will be assigned the next available number. Changes in column
position do not affect column numbers.


**Note:** In order to prevent future ***Priority*** releases from
overwriting any newly added columns, ***manually*** assign them a column
numberof at least 500 (and then change the position). For more details,
see [Rules for Customizing](Customization-Rules ).


## Join Columns 

Join columns limit the records displayed in the report so that the
appropriate data is displayed. When a new report is created, if no join
columns are added, the user will receive all possible combinations of
data from the included table columns.

> **Example:** If no join columns are displayed in a report based on the
> **ORDERS**, **ORDERITEMS** and **CUSTOMERS** tables, then the report
> will display Order 1000 for all customers and all ordered parts,
> regardless of whether there is any connection between these pieces of
> data. To obtain the desired combination of data -- i.e., Order 1000
> for Customer P600 (North Island Stars) -- you have to link the order's
> internal customer number to the internal customer number in the
> **CUSTOMERS** table, by means of join columns and their tables.

Both the *Join Column* and its *Join Table* must be specified.

**Note:** If you have added a column to a standard report and the join
is to a new table, assign a *Join ID* greater than 5. For details, see
[Rules for Customizing](Customization-Rules ).

### Special Joins 

There are two special types of joins:

-   multiple joins --- when two or more report columns are joined
    through the same table column
-   outer joins --- that allow for unmatched rows between the base and
    join tables.

*Column ID*s and *Join ID*s are used to distinguish between two joins
made through the same table column. A good example of a ***multiple
join*** is found in the **TOTWARHSBAL** (*Total Part Inventory*) report,
which displays inventory in both standard part units and in factory
units. The former unit is stored in **PUNIT** in the **PART** table and
the latter is stored in **UNIT** in the same table. Both are joined to
the **UNIT** table. To distinguish between the two, **PUNIT** is
assigned a *Join ID* of 1 and **UNIT** is assigned a *Join ID* of 0.

Just as a distinction must be made between the two joins, so, too, must
a distinction be made between the report columns that are imported
through each join. For instance, the two types of units are imported
from the same table column: **UNITNAME**from the **UNIT** table. The
factory unit must be imported through join 0, whereas the standard unit
must be imported through join 1. Thus, the former is assigned a
*Column ID* of 0, whereas the latter is assigned a *Column ID* of
1.

**Important note:** When creating your own multiple joins, use a join ID
and column ID greater than 5.


As opposed to regular joins, an ***outer join*** allows for unmatched
rows between joined tables. To designate the outer join, add a question
mark (?) in the relevant*Column ID* or *Join ID* column, next to
the number of the ID. The decision as to where to put the question mark
(column ID? join ID?) depends on where the null record is expected to be
encountered. If it is in the table from which the report column is
derived (i.e., the one appearing in the *Table Name* column of
the *Report Columns* form), then add the question mark to the column ID.
If, on the other hand, the null record is expected to appear in the join
table, attach the question mark to the join ID. In the case of an
additional join between the outer join table and another table, the
question mark should appear in *each* of these join IDs.

> **Example:** In the **WWWIV_1** report, which creates a header for
> printouts of various invoices, there is a join to the **NSCUST**
> table, which stores revised customer names (used mainly for walk-in
> customers) for all types of documents. Since not all invoices include
> revised customer names (but rather use the name stored in the
> **CUSTOMERS** table), there is an outer join between the **INVOICES**
> table and the **NSCUST** table via the **IV**column in both tables.\
> **Note:** As the **NSCUST** table is also used for other kinds of
> documents, the key for that table consists of **IV** and **TYPE**, and
> there is a condition on the **TYPE** column that distinguishes between
> invoices, orders, documents, etc. Nonetheless, it is enough to define
> only the **IV** column as the outer join.

**Note:** Outer-joined tables are accessed after regular join tables.


## Report Output 

You will not always wish all columns assigned to the report to be
displayed during report output. For instance, there is generally no
reason to display internal numbers. Hence, the **CUST** and
**ORD** columns from the **ORDERS** table are not displayed in the
**ORDERSBYCUST** report.

To prevent output for a given report column, flag the *Hide* column.

## User Input 

To create a parameter input screen, flag the *Input* column for each
column to appear in the screen. If you want the input to be Boolean
(Y/N) and appear as a check box, also specify *B* in the *Don't
Display 0 Val* column. This only applies to a **CHAR** column with a
width of one character.

To allow the user the option of defining query conditions, a parameter
input screen, comprised of certain report columns, is created. While
this screen can theoretically include any report columns, it is
advisable only to include those columns which the user will find
helpful.

> **Example:** The input screen for the **ORDERSBYCUST** report is made
> up of: customer number, customer name, order number and part number.
> Thus, by specifying "CA001" in the *Customer* input column, the user
> will obtain only those orders placed by that customer.

## Predefined Query Conditions 

Besides creating a parameter input screen, in which the user has the
option of stipulating query conditions, you can also define query
conditions yourself. These conditions will hold whenever the report is
run. Of course, the user can stipulate query conditions in addition to
your predefined ones.

Use the *Expression/Condition* column of the sub-level *Report
Column Extension *form to set query conditions. If the condition is
too long to fit in that column, continue in the sub-level form,
*Expression/Condition (cont.)*. Once the *Report Column
Extension *form is exited, a check mark appears in the
*Expression/Condition* column of the *Report Columns* form. This
flag makes it easy to spot any report column with a condition.

Conditions are written in SQL and must begin with a comparative operator
(\<, \>, \<=, \>=, \<\>, =). Only records that comply with the
prescribed condition will appear in the report.

> **Example:** The **TRANSPARTCUST** (*Customer Shipments*) report
> includes a condition for the **OTYPE** column from the **DOCTYPES**
> table: = \'C\' (so as to limit the report to sales transactions,
> excluding purchase transactions).

## Accessing a Related Form 

One of the ways to input data is to access a target form (by pressing
**F6** twice). Thus the target form for the *Customer Number* column
would be the *Customers *form, whereas the target from the
*Order Number* column would be the *Sales Orders* form. Such
target forms are also accessed when the user clicks on a link within a
displayed report.

As with target forms reached from forms, the target form in question
must always meet the following conditions:

-   it must be a root form (have no upper-level form of its own).
-   its base table must include the column from which the user
    originated.

Generally speaking, the user accesses the default target form --- the
single form in the application which meets the above conditions and
which shares the same name as the column's base table. However, there
are several ways to override this default, so that the move will be to
***another root form based on the same table***:

-   by designating a main target form (type *M* in the
    *Zoom/International* column of the *Form Generator* form for the form
    in question);
-   by designating an application target form (type *Z* in the same
    column);
-   by designating a form as a target for this particular report column
    (specify the name of the relevant form in the *Target Form Name*
    column of the *Report Column Extension* sub-level of the *Report
    Columns* form).

The last option overrides all other target forms, and the application
target overrides the main target form.

**Note:** To disable automatic access from a given column, specify the
**NULL**form as the target form in the *Report Column Extension* form.

### Dynamic Access 

Sometimes you want the target form to vary, based on the data displayed
in a given record. For example, in the **AGEDEBTCUST** report, the
target form of the *Invoice* column is the relevant type of invoice
(e.g., **AINVOICES**, **CINVOICES**).

In order to achieve this, for the report column in question, record the
following settings in the *Link/Input* tab of the *Report Columns-HTML
Design* sub-level of the *Report Columns* form:

-   *Link/Input Type* = P
-   *Return Value Name (:HTMLACTION)* = \_winform
-   *Return Value Column# (:HTMLVALUE)* = the number of the column
    containing the **ENAME** of the target form.

    **Note:** The column with the **ENAME** of the target form must have
    a *Sort*value.

-   *Internal Link Column#* = same as :HTMLVALUE above.

### Accessing from a Column That is Not a Unique Key 

Sometimes you want to link to a form from a report column which is not
part of the unique key. For example, you may want to link from a *Part
Description* column to the *Part Catalogue* form, or from a *Details*
column to the *Sales Orders* form.

In order to achieve this, for the report column in question, record the
following settings in the *Link/Input* tab of the *Report Columns-HTML
Design* sub-level of the *Report Columns* form:

-   *Link/Input Type* = P
-   *Return Value Name (:HTMLACTION)* = \_winform
-   *Return Value Column# (:HTMLVALUE)* = the number of the column
    containing the key of the target form.

    **Note:** The column with the key of the target form must have a
    *Sort* value.

-   *Internal Link Column#* = leave empty.
-   *Target Form (Choose)* = the name of the target form.

### Writing a New CHOOSE-FIELD or SEARCH-FIELD Trigger for a Report Column 

When a column is defined is an input column, if the column has a target
form and that form has CHOOSE-FIELD or SEARCH-FIELD triggers, those
triggers will be imported to the report input screen. You may want to
write a specific CHOOSE-FIELD or SEARCH-FIELD for the report. The same
restrictions that apply to [form trigger
names](Creating-your-triggers#Naming-Customized-Triggers)
apply here as well.

To design a new trigger, use the *Field Triggers* form (a sub-level of
*Report Columns*).

## Special Report Columns 

You can use report columns to display special values by using the
*Report Columns-HTML Design* sub-level of the *Report Columns* form. For
example, you can display addresses in Google Maps; pictures; or QR
codes.

### Displaying an Address in Google Maps 

You can define a column that will appear in the report as a link to
Google Maps, which will bring up the relevant address.

In order to achieve this, for the report column in question, record the
following settings in the *Link/Input*tab of the*Report Columns-HTML
Design* sub-level of the *Report Columns* form:

-   *Link/Input Type* = Q
-   *Return Value Name (:HTMLACTION)* = any value (do not leave empty)
-   *Return Value Column# (:HTMLVALUE)* = the number of the column
    containing the address to be retrieved.

:   **Note:**This can be a hidden column provided it has a *Sort* value.

> **Example:**See column #60 in the **WWWORDFORM2** report.

### Displaying QR Codes 

You can define a column that will appear in the report as a QR code (a
2D bar code). The system will encode the content of the column as a QR code. Due to column width limitations, this is limited to 120 characters.

In order to achieve this, for the report column in question, record the
following settings in the *Picture* tab of the *Report Columns-HTML
Design* sub-level of the *Report Columns* form:

-   *Picture* = Q
-   *Width \[pixels\]*= Determined by the amount of data encoded
-   *Height \[pixels\]* = Determined by the amount of data encoded

    **Note:** The width and height should be equal, as QR codes are
    square shaped and setting different values will cause image
    distortion.

> **Example:** See column #190 in the **WWWIV_5** report.

[22.0]()

You can now encode the contents of unicode text files as a QR code. To do so, specify a lowercase **q** in the *Picture* field (rather than an uppercase one). The column contents should be the unicode text file you want to encode.

For an example, see the *** report.

The unicode file can not exceed 1663 characters in length. While this is smaller than the maximum theoretical character length of QR codes (4296 characters), it allows for a high correction level, which makes the code readable in less than optimal conditions, and for support for unicode characters instead of just ANSI. 

#### Updating Custom Printing Programs with QR Codes

Note that prior to version 22.0, several programs used a custom bypass (<code>EXECUTE QRCODE</code>) to exceed the width limit on QR codes defined as **Q** in the *Picture* field. With the new encoding method for text files, this custom bypass is no longer supported.

If you created custom printing programs that are based on copies of standard programs that used this bypass, you must adapt your custom programs to use the new encoding method. 

You can locate programs that use <code>EXECUTE QRCODE</code> by running the following code in the SQL Interperter:

```sql
SELECT E.ENAME, E.TITLE, P.POS, PT.TEXT, PT.TEXTORD, E.TYPE 
FROM PROGRAMSTEXT PT, PROGRAMS P, EXEC E
WHERE PT.TEXT LIKE '%EXECUTE QRCODE%'
AND PT.PROG = P.PROG
AND P.EXEC = E.EXEC
ORDER BY 1, 3, 5
FORMAT;
```




## Further Reading 

-   [Organizing Report Data](organize-report-data )
-   [Refining Report Data
    Display](Refine-Report-Display )
-   [Calculated Columns in
    Reports](Calculated-Columns-Reports )
-   [Types of Reports](Report-Types )
-   [Running a Report](Run-Report )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
-   [Reports](Reports )
