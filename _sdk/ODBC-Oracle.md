---
title: ODBC for Oracle
layout: sdk_nav
group: ODBC Oracle
tags: 'Priority_SDK'
---

## Introduction

Several ODBC functions have been written for ***Priority*** when using
an Oracle database. This section contains a comprehensive list of string
functions, number functions and date functions, together with examples
of their usage.

## String Functions 

The following functions are performed on strings:

-   **tabula.tabulaf.atoi**(*string*) --- outputs the designated string
    as an integer.

    `SELECT tabula.tabulaf.atoi('100') FROM DUAL; /* 100 */`

-   **tabula.tabulaf.ator**(*string*) --- outputs the designated string
    as a real number.

    `SELECT tabula.tabulaf.ator('100.66') FROM DUAL; /* 100.66 */`


-   **tabula.tabulaf.itoa**(*string, n*) --- moves the decimal point *n*
    places to the left. When input is a string that contains one or more
    decimal points (which break up the string into parts), the function
    is applied separately to each part; this is useful for sorting
    columns that contain WBS codes.

    `SELECT tabula.tabulaf.itoa('1',3) FROM DUAL; /* .001 */`
    `SELECT tabula.tabulaf.itoa('3.5.2',3) FROM DUAL; /* .003.005.002 */`


-   **tabula.tabulaf.strpiece**(*string, delimiter, m, n*) --- for a
    given input string and delimiter (which breaks up the string into
    parts), retrieves *n* parts, beginning from the *m*th part.

    `SELECT tabula.tabulaf.strpiece('hello-world','-',2,1) FROM DUAL; /* 'world' */`
    `SELECT tabula.tabulaf.strpiece('112.113.114.115','.',1,3) FROM DUAL; /* '112.113.114' */`


**Notes:**

-   The following function is intended for users of ***Priority*** in
    Hebrew.
-   This function is not supported in SQL Server 2017.


The tabulaf.hebconvert function performs automated conversion of Hebrew
text formats in strings that contain both English and Hebrew letters.

> **Example:**
>
> ```sql
> /* The following command yields a string that contains both English and Hebrew letters. 
> Note that the English letters and the numerals appear backwards. */
> SELECT F.DES 
> FROM tabula.demo$FNCCONST F 
> WHERE F.NAME2 = 'AutoRecon';
> /* Result: התאמה אוט. בקבלה )1=הזמנות/2=חשבוניות/3=OFIF(
>
> /* Using the tabulaf.hebconvert function, the output appears as follows: */
> SELECT tabula.tabulaf.hebconvert(tabula.tabulaf.revstr(F.DES)) 
> FROM tabula.demo$FNCCONST F 
> WHERE F.NAME2 = 'AutoRecon';
> /* Result: ‎(FIFO=3/‎חשבוניות‎=2/‎הזמנות‎=1) ‎בקבלה‎ .‎אוט‎ ‎התאמה‎ */
> ```

## Number Functions 

The following functions are performed on numbers:

-   **tabula.tabulaf.tabula_htoi**(*m*) --- inputs a hexadecimal value
    and translates it to its corresponding integer.

    `SELECT tabula.tabulaf.htoi('ff') FROM DUAL; /* 255 */`


-   **tabula.tabulaf.tabula_itoh**(*n*) --- returns the hexadecimal
    value of *n*, where *n* is an integer.

    `SELECT tabula.tabulaf.itoh(15) FROM DUAL; /* 'f' */`

### Shifted Integers 

When working with shifted integers, there is often a need to convert
them to real numbers. In ***Priority***, the [REALQUANT
function](Scalar-Expressions#Numbers ) performs
this conversion automatically.

There is currently no ODBC-compliant equivalent to the REALQUANT
function. Therefore, when writing queries using SQL tools, it is
necessary to execute the division manually. The number of places that
the decimal point should be moved is determined by the value of the
DECIMAL system constant (usually, 3).

> **Example:**
>
> ```sql
> SELECT TQUANT, TQUANT / 1000
> FROM tabula.demo$ORDERITEMS 
> WHERE ORD <> 0
> /* assuming the Decimal constant = 3 */
> ```



**Notes:**

-   If the decimal precision is defined as 2 or 1, the integer will need
    to be divided by 100 or 10, accordingly.
-   To check the value of the DECIMAL system constant, execute the
    following query:


    `SELECT VALUE FROM tabula.SYSCONST WHERE NAME = 'DECIMAL';`



## Date Functions 

In ***Priority***, dates, times and days are stored in the database
as integers, which correspond to the number of minutes elapsed since
Jan. 1, 1988 (for example, Dec. 31, 1987 = -1440). These integers can be
retrieved using the *SQL Development* (**WINDBI**) program by writing
a query such as:

`SELECT 0 + IVDATE FROM INVOICES FORMAT;`

This enables you to perform calculations on dates.

> **Example:** To calculate the day after an invoice date, use:\
> `SELECT IVDATE + 24:00 FROM INVOICES FORMAT;`

The following functions are performed on dates:

-   **tabula.tabulaf.bofyear** (*date*) --- yields the date of the first
    day of the year.

    `SELECT tabula.tabulaf.bofyear(tabula.demo$INVOICES.IVDATE)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.eofyear** (*date*) --- yields the date of the end
    of the year.

    `SELECT tabula.tabulaf.eofyear(tabula.demo$INVOICES.IVDATE)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.bofhalf** (*date*) yields the date of the first day
    of the six-month period (half a year) in which the date falls.

    `SELECT tabula.tabulaf.bofhalf(tabula.demo$INVOICES.IVDATE)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.eofhalf** (*date*) --- yields the date of the end
    of the half-year.

    `SELECT tabula.tabulaf.eofhalf(tabula.demo$INVOICES.IVDATE)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.bofquarter** (*date*) --- yields the date of the
    first day of the quarter.

    `SELECT tabula.tabulaf.bofquarter(tabula.demo$INVOICES.IVDATE)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.eofquarter** (*date*) --- yields the date of the
    end of the quarter.

    `SELECT tabula.tabulaf.eofquarter(tabula.demo$INVOICES.IVDATE)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.bofmonth**(*date*) --- yields the date of the first
    day of the month.

    `SELECT tabula.tabulaf.bofmonth(tabula.demo$INVOICES.IVDATE)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.eofmonth** (*date*) --- yields the date of the end
    of the month.

    `SELECT tabula.tabulaf.eofmonth(tabula.demo$INVOICES.IVDATE)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.get_week**(*date, day year began*) --- yields an
    integer comprised of the year (last two digits of the year) and the
    number of the week in the year (two digits, between 01 and 53).

    `SELECT tabula.tabulaf.get_week(tabula.demo$INVOICES.IVDATE,3)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.bofweek**(*week no., day year began*) --- given a
    value for a week (the last two digits of a year and the number of a
    week in that year) and the day the year started, yields the date
    that week started.

    `SELECT tabula.tabulaf.bofweek(0801,1) FROM DUAL;`


-   **tabula.tabulaf.get_week6** (*date, day year began*) --- yields an
    integer comprised of the year in 4 digits and the number of the week
    in the year (two digits, between 01 and 53).

    `SELECT tabula.tabulaf.get_week6(tabula.demo$INVOICES.IVDATE,3)FROM tabula.demo$INVOICES;`


-   **tabula.tabulaf.mweek**(*week, day year began*) --- given a value
    for a week (the last two digits of a year and the number of a week
    in that year) and the day the year began, yields the number of the
    month in which that week falls.

    `SELECT tabula.tabulaf.mweek(0819,3) FROM DUAL;`


-   **tabula.tabulaf.dtoa** (*date, pattern, x, y)* --- converts a date
    to a string. If you are not displaying the names of the days or
    months, the last two parameters should be empty strings. See
    [Examples](#Converting-a-Date-to-a-String:-Examples ).


-   **tabula.tabulaf.atod** (*string, pattern, x, y*) --- converts a
    string to a date. See
    [Example](#Converting-a-String-to-a-Date:_Example ).

### Date Pattern Components for ATOD and DTOA Expressions 

The following pattern components can be used when outputting a date as a
string. Of course, more than one component can be used in the same
expression.


**Note:** You can add punctuation marks (e.g., dashes, slashes, commas)
and spaces between pattern components as desired.


-   **DD** --- date in the month (15)
-   **MM** --- number of the month (01)
-   **YY** --- last two digits of year (06)
-   **YYYY** --- all four digits of year (2006)
-   **hh:mm** --- hours and minutes (12:05)

### Converting a Date to a String: Examples 

```sql
SELECT tabula.tabulaf.dtoa(IVDATE, 'DD/MM/YY', 0, 0) FROM tabula.demo$INVOICES;

SELECT tabula.tabulaf.dtoa(UDATE, ' DD-MM-YYYY hh:mm', 0, 0) FROM tabula.demo$INVOICES;
```

### Converting a String to a Date: Example 

```sql
SELECT tabula.tabulaf. atod('01/06/2005', 'DD/MM/YYYY') FROM DUAL;
/* the integer corresponding to the date */
```
