---
title: ODBC for SQL Server
layout: sdk_nav
---

## Introduction

Several ODBC functions have been written for ***Priority*** when using
an MS-SQL database. This page contains a comprehensive list of string
functions, number functions and date functions, together with examples
of their usage.

## String Functions {#string_functions}

The following functions are performed on strings:

-   **system.dbo.tabula_itoa** *(m,n,x,y)* --- yields *m*as a string
    having *n*characters, where both values are integers (leading zeroes
    are added where necessary); *x* indicates whether to separate
    thousands (0 = no, 1 = yes) and *y* is the separator.

    :   

        :   `SELECT system.dbo.tabula_itoa(50000,7,1,',') /* '0050,000' */`\
            `SELECT system.dbo.tabula_itoa(50000,7,0,',') /* '0050000' */`
-   **system.dbo.tabula_rtoa***(m,n,x,y)*--- yields *m*(a real number)
    as a string, displaying *n*decimal places, where *x* is the
    thousands separator and *y* is the decimal point.

    :   

        :   `SELECT system.dbo.tabula_rtoa(109999.35,2,',','.') /* '109,999.35' */`\
            `SELECT system.dbo.tabula_rtoa(109999.35,2,'-',',') /* '109-999,35' */`
-   **system.dbo.tabula_atoi**(*string*) --- outputs the designated
    string as an integer.

    :   

        :   `SELECT system.dbo.tabula_atoi('100') /* 100 */`
-   **system.dbo.tabula_ator**(*string*) --- outputs the designated
    string as a real number.

    :   

        :   `SELECT system.dbo.tabula_ator('100.66') /* 100.66 */`
-   **system.dbo.tabula_stritoa**(*string, n*) --- moves the decimal
    point *n* places to the left. When input is a string that contains
    one or more decimal points (which break up the string into parts),
    the function is applied separately to each part; this is useful for
    sorting columns that contain WBS codes.

    :   

        :   `SELECT system.dbo.tabula_stritoa('1',3) /* 001 */`\
            `SELECT system.dbo.tabula_stritoa('3.5.2',3) /* .003.005.002 */`
-   **system.dbo.tabula_strpiece**(*string, delimiter, m, n*) --- for a
    given input string and delimiter (which breaks up the string into
    parts), retrieves *n*parts, beginning from the *m*th part.

    :   

        :   `SELECT system.dbo.tabula_strpiece('hello-world','-',2,1) /* 'world' */`\
            `SELECT system.dbo.tabula_strpiece('112.113.114-115','.',1,3) /* '112.113.114' */`

------------------------------------------------------------------------

**Notes:**

-   The following function is intended for users of ***Priority*** in
    Hebrew.
-   This function is not supported in SQL Server 2017.

------------------------------------------------------------------------

The tabula_hebconvert function performs automated conversion of Hebrew
text formats in strings that contain both English and Hebrew letters.

This function does not appear in the default list of system functions
for **\'\'Priority***on SQL Server. To add tabula_hebconvert to the list
of system functions, select*Run Entity (Advanced)*from the*Tools*top
menu in the Windows interface or the*Run\'\' menu in the web interface,
and run the **HEBCONV** program.

> **Example:**
>
> ``` tsql
> /* The following command yields a string that contains both English and Hebrew letters. 
> Note that the English letters and the numerals appear backwards. */
> SELECT demo.dbo.TRIALBAL.TRIALBALDES
> FROM demo.dbo.TRIALBAL 
> WHERE demo.dbo.TRIALBAL.TRIALBALCODE = '888'
> /* Result: )wen(154 סעיף */
>
> /* Using the tabula_hebconvert function, the output appears as follows: */
> SELECT system.dbo.tabula_hebconvert(demo.dbo.TRIALBAL.TRIALBALDES)
> FROM demo.dbo.TRIALBAL 
> WHERE demo.dbo.TRIALBAL.TRIALBALCODE = '888'
> /*Result: (new) 451 סעיף */
> ```

## Number Functions {#number_functions}

The following functions are performed on numbers:

-   **system.dbo.tabula_htoi**(*m*) --- inputs a hexadecimal value and
    translates it to its corresponding integer.

    :   

        :   `SELECT system.dbo.tabula_htoi('ff') /* 255 */`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_itoh**(*n*) --- returns the hexadecimal value of
    *n*, where *n* is an integer.

    :   

        :   `SELECT system.dbo.tabula_itoh(15) /* 'f' */`

### Shifted Integers {#shifted_integers}

When working with shifted integers, there is often a need to convert
them to real numbers. In ***Priority***, the [REALQUANT
function](Non-standard_Scalar_Expressions#Numbers "wikilink") performs
this conversion automatically.

There is currently no ODBC-compliant equivalent to the REALQUANT
function. Therefore, when writing queries using SQL tools, it is
necessary to execute the division manually. The number of places that
the decimal point should be moved is determined by the value of the
DECIMAL system constant (usually, 3).

> **Example:**
>
> ``` tsql
> SELECT QUANT, 0.0 + TQUANT / 1000,
> FROM DEMO.DBO.ORDERITEMS 
> WHERE ORD <> 0
> /* assuming the Decimal constant = 3 */
>
> /*In SSMS (MS SQL), using CAST()*/
> SELECT QUANT, (CAST(TQUANT AS REAL) / 1000) AS TQUANT
> FROM DEMO.DBO.ORDERITEMS 
> WHERE ORD <> 0
> ```

------------------------------------------------------------------------

**Notes:**

-   If the decimal precision is defined as 2 or 1, the integer will need
    to be divided by 100 or 10, accordingly.
-   To check the value of the DECIMAL system constant, execute the
    following query:\
    :`SELECT VALUE FROM demo.dbo.SYSCONST WHERE NAME = 'DECIMAL';`

------------------------------------------------------------------------

## Date Functions {#date_functions}

In **\'\'Priority***, dates, times and days are stored in the database
as integers, which correspond to the number of minutes elapsed since
Jan. 1, 1988 (for example, Dec. 31, 1987 = -1440). These integers can be
retrieved using the*SQL Development\'\' (**WINDBI**) program by writing
a query such as:

`SELECT 0 + IVDATE FROM INVOICES FORMAT;`

This enables you to perform calculations on dates.

> **Example:** To calculate the day after an invoice date, use:\
> SELECT IVDATE + 24:00 FROM INVOICES FORMAT;

The following functions are performed on dates:

-   **system.dbo.tabula_dateconvert**(*date*) --- converts a
    ***Priority*** date to an SQL date.

    :   

        :   `SELECT demo.dbo.INVOICES.IVDATE, system.dbo.tabula_dateconvert(demo.dbo.INVOICES.IVDATE) FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_bofyear** (*date*) --- yields the date of the
    first day of the year.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_bofyear(demo.dbo.INVOICES.IVDATE))FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_eofyear** (*date*) --- yields the date of the
    end of the year.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_eofyear(demo.dbo.INVOICES.IVDATE))FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_bofhalf** (*date*) yields the date of the first
    day of the six-month period (half a year) in which the date falls.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_bofhalf(demo.dbo.INVOICES.IVDATE))FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_eofhalf** (*date*) --- yields the date of the
    end of the half-year.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_eofhalf(demo.dbo.INVOICES.IVDATE))FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_bofquarter** (*date*) --- yields the date of the
    first day of the quarter.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_bofquarter(demo.dbo.INVOICES.IVDATE))FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_eofquarter** (*date*) --- yields the date of the
    end of the quarter.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_eofquarter(demo.dbo.INVOICES.IVDATE))FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_bofmonth**(*date*) --- yields the date of the
    first day of the month.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_bofmonth(demo.dbo.INVOICES.IVDATE))FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_eofmonth** (*date*) --- yields the date of the
    end of the month.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_eofmonth(demo.dbo.INVOICES.IVDATE))FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_week** (*date, day year began*) --- yields an
    integer comprised of the year (last digit of the year) and the
    number of the week in the year (two digits, between 01 and 53).

    :   

        :   `SELECT system.dbo.tabula_week(demo.dbo.INVOICES.IVDATE, 3)FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_bofweek**(*week no., day year began*) --- given
    a value for a week (the last two digits of a year and the number of
    a week in that year) and the day the year started, yields the date
    that week started.

    :   

        :   `SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_bofweek(0801, 1));`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_week6** (*date, day year began*) --- yields an
    integer comprised of the year in 4 digits and the number of the week
    in the year (two digits, between 01 and 53).

    :   

        :   `SELECT system.dbo.tabula_week6(demo.dbo.INVOICES.IVDATE, 3)FROM demo.dbo.INVOICES;`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_mweek**(*week, day year began*) --- given a
    value for a week (the last two digits of a year and the number of a
    week in that year) and the day the year began, yields the number of
    the month in which that week falls.

    :   

        :   `SELECT system.dbo.tabula_mweek(0819,3);`

```{=html}
<!-- -->
```
-   **system.dbo.tabula_dtoa** (*date, pattern, \'\<months>\',
    \'\<days>\'*) --- converts a date to a string. If you are not
    displaying the names of the days or months, the last two parameters
    should be empty strings. See
    [Examples](#Converting_a_Date_to_a_String:_Examples "wikilink").

```{=html}
<!-- -->
```
-   **system.dbo.tabula_atod** (*string, pattern*) --- converts a string
    to a date. See
    [Examples](#Converting_a_String_to_a_Date:_Examples "wikilink").

### Date Pattern Components for ATOD and DTOA Expressions {#date_pattern_components_for_atod_and_dtoa_expressions}

The following pattern components can be used when outputting a date as a
string. Of course, more than one component can be used in the same
expression.

------------------------------------------------------------------------

**Note:** You can add punctuation marks (e.g., dashes, slashes, commas)
and spaces between pattern components as desired.

------------------------------------------------------------------------

-   **day** --- weekday (Mon)
-   **DD** --- date in the month (15)
-   **MM** --- number of the month (01)
-   **MMM** or **mmm**--- abbreviated form (first three letters) of
    month name (Jan)
-   **YY** --- last two digits of year (06)
-   **YYYY** --- all four digits of year (2006)
-   **hh:mm** --- hours and minutes (12:05)

### Converting a Date to a String: Examples {#converting_a_date_to_a_string_examples}

``` tsql
SELECT system.dbo.tabula_dtoa(demo.dbo.INVOICES.IVDATE, 'DD/MM/YY', '','') 
FROM demo.dbo.INVOICES;

SELECT system.dbo.tabula_dtoa(demo.dbo.INVOICES.UDATE, 'DD-MM-YYYY hh:mm', '','') 
FROM demo.dbo.INVOICES;

SELECT system.dbo.tabula_dtoa(demo.dbo.INVOICES.IVDATE, 
'day DD MMM YYYY',
'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct, Nov, Dec', 
'Sun,Mon,Tue,Wed,Thu,Fri,Sat') 
FROM demo.dbo.INVOICES;
```

------------------------------------------------------------------------

**Note:** This function can be adapted to display dates in any language
(e.g., Russian):

``` tsql
SELECT system.dbo.tabula_dtoa(demo.dbo.INVOICES.IVDATE, 'day DD MMM YYYY', 
'ian,fev,mar,apr,mai,iun,iul,avg,sen,okt,noi,dek', 
'vsk,pnd,vtr,srd,ctv,ptn,sbt') 
FROM demo.dbo.INVOICES 
```

------------------------------------------------------------------------

### Converting a String to a Date: Examples {#converting_a_string_to_a_date_examples}

``` tsql
SELECT system.dbo.tabula_atod('01/06/2005', 'DD/MM/YYYY');
/* the integer corresponding to the date */

SELECT system.dbo.tabula_dateconvert(system.dbo.tabula_atod('01/06/2005', 'DD/MM/YYYY'));
/* the date converted back to SQL format */
```
