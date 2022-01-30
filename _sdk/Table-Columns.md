---
title: Table Columns
layout: sdk_nav
group: Tables
tags: 'Priority_SDK'
---

## Column Names and Titles 

The column name is unique to its table, and is used in SQL statements.
The column title is also unique to its table; it is updatable and is
utilized in the user interface (forms, reports, programs, ODBC). Every
column must be assigned both a name and a title. For instance, the
column which stores an order number has the name **ORDNAME** and the
title *Order Number*. A title may be easily changed (even translated
into another language) as often as necessary. In contrast, a change in
column name will require appropriate changes in SQL statements that
refer to the column (e.g., in form triggers, compiled programs). As the
column name is used in SQL statements, it is subject to the same
restrictions as table names (see [Rules for
Columns](#Rules-for-Columns )).

## Column Types 

The following table lists all available column types:

|    <br>Col. Type    	|    <br>Description                              	|    <br>Width    	|    <br>Form Col. Type    	|
|---------------------	|-------------------------------------------------	|-----------------	|--------------------------	|
|    <br>CHAR         	|    <br>string of characters                     	|    <br>>1       	|    <br>String→           	|
|                     	|    <br>single character                         	|    <br>=1       	|    <br>Character         	|
|    <br>REAL         	|    <br>real number                              	|    <br>any      	|    <br>Real              	|
|    <br>INT          	|    <br>signed integer                           	|    <br>any      	|    <br>Integer           	|
|    <br>DATE         	|    <br>date (mm/dd/yy or dd/mm/yy)              	|    <br>8        	|    <br>Date              	|
|                     	|    <br>date (mm/dd/yyyy or   dd/mm/yyyy)        	|    <br>10       	|    <br>Date              	|
|                     	|    <br>date & time (24-hour   clock)            	|    <br>14       	|    <br>Date+Time         	|
|    <br>TIME         	|    <br>time (24-hour clock)                     	|    <br>5        	|    <br>hh:mm             	|
|                     	|    <br>span (number of hours and   minutes)     	|    <br>6        	|    <br>hhh:mm            	|
|    <br>DAY          	|    <br>day of the week                          	|    <br>3        	|    <br>Day               	|

**Note:** It is important to distinguish between integers (columns of
**INT** type, e.g., **QUANT**, **BALANCE**) and strings of digits
(columns of **CHAR** type, e.g., **ZIPCODE**, **ORDNAME**, **PHONE**).


With one exception (see below), you cannot change the type of an
existing column. Instead, you need to take the following steps:

1.  Add a new column of the correct type.
2.  Write a short command to filter data from the existing column into
    the new one.
3.  Delete the old column.

Exception to the above rule: During the development phase, you can
convert **INT** columns to **REAL** and vice versa, using the *Change
Number Type* program (see [**Options for Creating and Modifying Tables,
Columns and
Keys**](Create-Modify-Tables )).
However, once a custom development has been installed in your working
environment, this operation may fail, in which case you should use the
above method instead.

## Decimal Precision 

Decimal precision (the number of places to display to the right of the
decimal point) is optional; it is used in real numbers and shifted
integers. A shifted integer is stored in the database as an integer but
is displayed as a real number (see, for example, the **TQUANT** column
in the **ORDERITEMS** table).

------------------------------------------------------------------------

**Note:** When working with shifted integers, use the REALQUANT function
to retrieve the actual value.

------------------------------------------------------------------------

## Rules for Columns 

The following rules apply to table columns:

-   Column names are up to 20 characters.
-   Column names must be made up of alphanumeric values and the
    underline sign (no spaces).
-   Column names must begin with a letter.
-   The column name may not be a reserved word (a list of reserved words
    appears in the **RESERVED** form).
-   When adding a new column to a standard table, you must assign the
    column name a four-letter prefix (e.g., **XXXX-CUSTNAME**). This
    should be the same prefix you use for all entities that you add to
    ***Priority*** for the customer in question.
-   Column titles (up to 20 characters, including spaces) must be
    enclosed in single quotations, e.g., \'*Order Number*\'.
-   Decimal precision can only be specified for a **REAL** or **INT**
    column. Most columns have a decimal precision of 2. To designate a
    **REAL** number with indefinite precision, use decimal precision 0;
    otherwise, the number will be rounded up to a defined precision by
    INSERT and UPDATE statements. In the case of a shifted integer,
    decimal precision must be equal to the value of the DECIMAL system
    constant (or it may be 0, i.e., a regular integer).
-   Modification of a column affects all forms and reports in which the
    column appears.
-   You cannot delete a column that appears in a form, report or
    procedure.
-   You can only change the following column types: **INT** to **REAL**
    and vice versa (number conversion), and only during the development
    phase.
-   Text columns (i.e., **CHAR** columns) should not exceed a width of
    80 characters. Wider columns might not be displayed well in forms,
    depending on the screen resolution of the user\'s computer. While
    there are a few table columns whose width exceeds 80 characters
    (e.g., the **MESSAGE** column in the **ERRMSGS** table), these
    columns are generally only displayed in reports. If you need a wide
    text column, it is recommended that you use a sub-level text form
    instead.
-   You cannot add columns to system tables.

## Further Reading 

-   [Tables](Tables )
-   [Keys](Keys )
-   [Options for Creating and Modifying Tables, Columns and
    Keys](Create-Modify-Tables )
-   [Viewing Tables in the
    Database](View-Tables )
-   [DBI Syntax](DBI-Syntax )
