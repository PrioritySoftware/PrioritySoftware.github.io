---
title: Non-standard Scalar Expressions
group: SQL Syntax
tags: 'Priority_SDK'
---

## Introduction

In addition to standard SQL scalar expressions, ***Priority*** also
recognizes several other expressions. These are described below.
Moreover, it offers support of bitwise operations on integers.



**Note:** To test the SELECT statements below, you can record them in the
window of the *SQL Development Program*, as follows, and then execute
them, using the *SQL Interpreter*. See [Executing SQL
Statements](Executing-SQL-Statements ).


## Conditional Expression 

See [Syntax Conventions](SQL-Syntax ).

Following C language, ***Priority*** uses the symbols ? : to designate a
conditional expression *(if \... then \... else \... )*. The syntax of a
conditional expression is:

<code>( *expression* **?** *expression* **:** *expression* )</code>

If the first expression yields a True value, then the second will
determine the resulting value. If not, then the third expression will
determine that value.

**Example:** A conditional expression could be used for a calculated
column in the **ORDERSBYCUST** report which warns that the order is
overdue:

```sql
( SQL.DATE8 ORDERITEMS.DUEDATE AND ORDERITEMS.BALANCE 0 ? ’*’ : ’ ’ )
```

That is, if the current date is later than the due date and the
balance to be delivered is greater than 0, then display an asterisk;
otherwise, leave blank.

## Numbers

### Mathmatical Expressions

**ROUND**(*m* )

rounds *m* (a real number) to the nearest integer and treats it as an
integer\
```sql
SELECT ROUND(1.45) FROM DUMMY FORMAT; /* 1 */
```


**ROUNDR**(*m* )

rounds *m* (a real number) to the nearest integer but treats it as a
    real number
```sql
SELECT ROUNDR(1.45) FROM DUMMY FORMAT; /* 1.000000 */
```

**EXP**(*m, n*)

treats *n* as an exponent of *m* 
```sql
SELECT EXP(3,2) FROM DUMMY FORMAT; /* 9 */
SELECT EXP(2,3) FROM DUMMY FORMAT; /* 8 */
```



**SQRT**(*m*)

returns the square root of *m* rounded to the nearest integer, where
    *m* is an integer
```sql
SELECT SQRT(10) FROM DUMMY FORMAT; /* 3 */
```



**SQRTR**(*m*)

returns the square root of *m* , where *m* is a real number
```sql
SELECT SQRTR(10.0) FROM DUMMY FORMAT; /* 3.162278 */
```



**ABS**(*m*)

returns the absolute value of *m* , where *m* is an integer
```sql
SELECT ABS(-5) FROM DUMMY FORMAT; /* 5 */
```



**ABSR**(*m*)

returns the absolute value of *m* , where *m* is a real number
```sql
SELECT ABSR(-5.3) FROM DUMMY FORMAT; /* 5.300000 */
```



*n* **MOD** *m* 

calculates modular arithmetic
```sql
SELECT 10 MOD 4 FROM DUMMY FORMAT; /* 2 */
```

You can also use the MOD function to retrieve the time from a
    **DATE** 14 variable:
```sql
SELECT 17/05/09 12:25 MOD 24:00 FROM DUMMY FORMAT;/* 12:25 */
```

### Comparisons


**MINOP**(*m, n*)

returns the minimum value between two numbers
```sql
SELECT MINOP(1.5,2) FROM DUMMY FORMAT; /* 1.500000 */
```

**MAXOP**(*m, n*)

returns the maximum value between two numbers
```sql
SELECT MAXOP(1.5,2) FROM DUMMY FORMAT; /* 2.000000 */
```

### Conversions

**REALQUANT**(*m*)

inputs a shifted integer and translates it to a real number, where
    the number of places that the decimal point is moved is determined
    by the value of the DECIMAL system constant (usually, 3). Used in
    reports to define a calculated column that, for example, displays
    *Quantity* x *Price*, when *Quantity* is a shifted integer and
    *Price* is a real number.
```sql
:ORDERITEMS.TQUANT = 1000;
SELECT REALQUANT(:ORDERITEMS.TQUANT) FROM DUMMY FORMAT;
    /* 1.000000 assuming the Decimal constant = 3 */
```



**INTQUANT**(*m*)

inputs a real number and translates it to a shifted integer, where
    the number of places that the decimal point is moved is determined
    by the DECIMAL system constant. Used in the form interface (*Form
    Load Designer*) when the load table is **GENERALLOAD**, and you want
    to use one of the table columns for quantity as a shifted integer.
```sql
SELECT INTQUANT(1.0) FROM DUMMY FORMAT; 
/* 1000 assuming the Decimal constant = 3 */
```



**ITOH**(*m*)

returns the hexadecimal value of *m* , where *m* is an integer
```sql
SELECT ITOH(10) FROM DUMMY FORMAT; /* a */
```



**HTOI**(STRING *'M'*)

inputs a hexadecimal value and translates it to its corresponding
    integer
```sql
SELECT HTOI('2f4') FROM DUMMY FORMAT; /* 756 */
```

## Strings

### Conversions

**ITOA**(*m, n*)

outputs *m* as a string having *n* characters, where both values are
    integers (leading zeroes are added where necessary)


**Note:** If no *n* is specified, or if the value of *n* is less than
    what is needed, the minimum required width will be used.
```sql
SELECT ITOA(35,4) FROM DUMMY FORMAT;/* \'0035\' */
SELECT ITOA(35) FROM DUMMY FORMAT;/* \'35\' */
```

**ATOI**(*string*)

outputs the designated string as an integer (maximum length of 10
    characters)
```sql
SELECT ATOI('35') FROM DUMMY FORMAT;/* 35 */
```

**ATOR**(*string*)

outputs the designated string as a real number(maximum length of 14
    characters)
```sql
SELECT ATOR('109012.99') FROM DUMMY FORMAT;/* 109012.990000 */
```

**RTOA**(*m, n, USECOMMA*)

outputs *m* (a real number) as a string, displaying *n* decimal places
    according to the decimal format for the current language
    

**Note:** If USECOMMA is not included, the decimal format 1,234.56
    will be used.
```sql
SELECT RTOA(150654.665,2,USECOMMA) FROM DUMMY FORMAT; /*
    \'150.654,67\' assuming decimal format is 1.234,56 */


SELECT RTOA(3.665432,2) FROM DUMMY FORMAT; /* \'3.67\' */
```

### String Information 

**STRLEN**(*string*)

outputs the length of the string (an integer)
```sql
SELECT STRLEN('Priority') FROM DUMMY FORMAT;/* 8 */
```

**ISALPHA**(*string*)

indicates whether a given string begins with a letter and is
    comprised solely of: uppercase and lowercase letters, digits, and/or
    \_ (underline); yields 1 if it is, 0 if it is not
```sql
SELECT ISALPHA('Priority_21') FROM DUMMY FORMAT; /* 1 */
SELECT ISALPHA('21Priority') FROM DUMMY FORMAT; /* 0 */
```

**ISPREFIX**(*string1*, *string2*)

indicates whether the first string is the prefix appearing in the
    second string
```sql
SELECT ISPREFIX('HEEE','HEEE_ORDERS') FROM DUMMY FORMAT; /* 1 */
SELECT ISPREFIX('HEEWE','HEEE_ORDERS') FROM DUMMY FORMAT; /* 0 */
```


**ISNUMERIC**(*string*)

indicates whether a given string is comprised solely of digits;
    yields 1 if it is, 0 if it is not. Useful when you wish to ensure
    that a given column of **CHAR** type is made up only of digits
    (i.e., a zip code)


**Note:** You would not use **INT** type in this case, because you
    do not want the value to be treated like a number (i.e., you want
    the zip code to appear as 07666 and not as 7,666).
```sql
SELECT ISNUMERIC('07666') FROM DUMMY FORMAT; /* 1 */
SELECT ISNUMERIC('14.5') FROM DUMMY FORMAT; /* 0 */
```



**ISFLOAT**(*string*)

indicates whether a given string is a real number; yields 1 if it
    is, 0 if it is not
```sql
SELECT ISFLOAT('14.5') FROM DUMMY FORMAT; /* 1 */
```

**STRINDEX**(full_string, search_string, index)

returns the index location of a search string within the full
    string. The search starts from the specified index position. Returns
    a value of 0 if the search string was not found, or the provided
    index position is larger than the length of the full string.\
    Specify an index of -1 to reverse the search, starting from the last
    index position of the full string.

```sql
:STR = 'hello world this is my string';
:SUBSTR = 'is';
:INDEX = 1; 
SELECT :STR, :SUBSTR, :INDEX, 
STRINDEX(:STR, :SUBSTR, :INDEX) FROM DUMMY FORMAT; /* Result = 15*/

:INDEX = -1;
SELECT :STR, :SUBSTR, :INDEX,
STRINDEX(:STR, :SUBSTR, :INDEX) FROM DUMMY FORMAT; /* Result = 18*/
```

This expression can also be used in queries. For example:

```sql
:FDT = BEGINOFYEAR(SQL.DATE);
SELECT CUSTNAME, CUSTDES, CREATEDDATE
FROM CUSTOMERS 
WHERE CREATEDDATE > :FDT
AND STRINDEX(CUSTNAME, '073', 1) > 0 
FORMAT;
```


### String Manipulation

**STRCAT**(*string1*, *string2*, \...)

outputs the concatenation of given strings\

**Note:**The length of the resulting concatenation is limited to 127
    characters.
```sql
SELECT STRCAT('abc','ba') FROM DUMMY FORMAT;/* 'abcba' */
```

**STRIND**(*string, m, n*)

beginning from the *m* th position in a given string, retrieves
    *n* characters
```sql
SELECT STRIND('Priority',3,2) FROM DUMMY FORMAT;/* 'io' */
```

**SUBSTR**(*string, m, n*)

beginning from the *m* th position in a given string, retrieves
    *n* characters, whether *m* and *n* are variables or fixed values
```sql
:STR = 'Priority';
:I = 3;
:T = 2;
SELECT SUBSTR(:STR, :I, :T) FROM DUMMY FORMAT; /* 'io' */
SELECT SUBSTR('Priority',3,2) FROM DUMMY FORMAT;/* 'io' */
```

**RSTRIND**(*string, m, n*)

same as STRIND, except that the string is read from right to left
```sql
SELECT RSTRIND('Priority',3,2) FROM DUMMY FORMAT; /* 'ri' */
```

**Note:** **STRIND** and **RSTRIND** behave differently when run on a *variable* within a SELECT statement from a real table, which can be confusing. As such, we recommend you always use **SUBSTR** and **RSUBSTR** instead.

**RSUBSTR**(*string, m, n*):

same as SUBSTR, except that the string is read from right to left

```sql
:STR = 'Priority';
:I = 3;
:T = 2;
SELECT RSUBSTR(:STR, :I, :T) FROM DUMMY FORMAT; /*'ri' */
SELECT RSUBSTR('Priority',3,2) FROM DUMMY FORMAT;/* 'ri' */
```

**STRPREFIX**(*string, n*)

retrieves the first *n* characters of the string, where *n* is a
    fixed value
```sql
SELECT STRPREFIX('Priority',2) FROM DUMMY FORMAT; /* 'Pr' */
```

**STRPIECE**(*string, delimiter, m, n*)

for a given input string and delimiter (which breaks up the string
    into parts), retrieves *n* parts, beginning from the *m* th part\

**Note:** The string and parameters *m* and *n* may be variables,
    but the delimiter must be a fixed value. The delimiter must be a
    single character long.
```sql
SELECT STRPIECE('a/b.c.d/e.f','.',2,1) FROM DUMMY FORMAT;
/* 'c' */
SELECT STRPIECE('a/b.c.d/e.f','/',2,1) FROM DUMMY FORMAT;
/*'b.c.d' */
SELECT STRPIECE('a/b.c.d/e.f','.',1,3) FROM DUMMY FORMAT;
/*  'a/b.c.d/e' */
SELECT STRPIECE('a/b.c.d/e.f','/',1,3) FROM DUMMY FORMAT;
/* 'a/b.c.d/e.f' */
```


**TOUPPER**(*string*)

changes characters to uppercase letters
```sql
:LOW = 'marianne';SELECT TOUPPER(:LOW) FROM DUMMY FORMAT;
/*MARIANNE */
```

**TOLOWER**(*string*)

changes characters to lowercase letters
```sql
:UPPER = 'MARIANNE';SELECT TOLOWER(:UPPER) FROM DUMMY FORMAT;
 /*marianne */
```

### Files and Messages



**ENTMESSAGE**(*entity_name, entity_type, message_number*)

returns the message for *message_number* of entity *entity_name*
    with type *entity_type*. 

*ENTMESSAGE* should only be run against the DUMMY table. If you need to use it in a statement that includes a database table, store it in a variable first.

```sql
SELECT ENTMESSAGE('ORDERS','F',3) FROM DUMMY FORMAT; 
/* You cannot revise the number of an itemized order. */
```

```sql
/* In practice, it's more useful to directly assign 
the message to a variable */
:MSG = ENTMESSAGE('ORDERS','F',3);
```




**SYSPATH** (folder type [one of BIN, PREP, LOAD, MAIL, SYS, TMP, SYNC, IMAGE\], path output type: 1 for relative, or 0 for absolute)

returns the the path for a given system folder
```sql
SELECT SYSPATH('MAIL', 1) FROM DUMMY; /*../../system/mail */
SELECT SYSPATH('MAIL', 0) FROM DUMMY; /* P:/system/mail/ */
```

**Notes:** 

- In the Windows environment, the TMP folder location can change between users.
- system/Sync is a special folder in the public cloud only. It has [special caveats](Priority-Cloud#systemsync) regarding its use.



**NEWATTACH**('*filename*', \['*extension*'\])

[22.0]()

Creates a valid file location in the *system/mail* folder and returns it. While *extension* is optional, it is recommended that you add it. Note that the extension parameter should contain the dot as part of the string (**'.zip'** and not *'zip'*).

The function can handle conflicts with existing files (by adding a number suffix to the filename). 

This function is useful when you are working in the Web interface and need to prepare a file on the server in the  *system/mail* folder, which is accessible to users (unlike the temporary folder where files are usually created). You can also use it to create a valid folder name to which to move files you previously created.

If your filename and extension are a single string (e.g. after being uploaded in a procedure), you can use STRPIECE with a **.** delimiter to split the extension and file.

The function can be incorporated into SQL statements and use computed values, but only those that can be computed before the query is sent to the database (i.e., you cannot use the values in table columns as part of the computation).

Keep in mind that the filename will be changed to lowercase, as can be seen in the example.

[22.1]()

In version 22.1, the function will also create the folder on the server (instead of just providing a valid location).

```sql
:z = NEWATTACH('LOGFILe', '.zip');
SELECT :z FROM DUMMY FORMAT; 
/*../../system/mail/202202/1t2tymq0/logfile.m */
SELECT NEWATTACH('LOGFILe', '.zip') FROM DUMMY FORMAT;
SELECT NEWATTACH('C:\TMP\LOGFILe', '.zip') FROM DUMMY FORMAT;
SELECT NEWATTACH('C:\TMP\LOGFILe.zip') FROM CUSTOMERS WHERE CUST = 0 FORMAT;
```

## Dates

Dates, times and days are stored in the database as integers. Dates may be represented to the user in American (MMDDYY) or European (DDMMYY) format, depending on the type assigned to the language being used (in the *Languages* form: *System Management* → *Dictionaries* → *Translation*).

The following examples are in American date format.

### Date Parsing

**DAY**(*date*)

yields the number of the weekday on which the specified date falls
    (where Sun=1, Mon=2, etc.).
```sql
SELECT DAY(03/22/06) FROM DUMMY FORMAT;/* 4 */
```


**Note:** This number can then be translated into the name of the
    weekday by means of the **DAYS** table (for the application\'s base
    language of English) and the **LANGDAYS** table (for any additional
    languages). These tables store the names of all days in the week in
    what ever language you are using.

**MDAY**(*date*)

yields the number of the day in the month
```sql
SELECT MDAY(03/22/06) FROM DUMMY FORMAT;/* 22 */
```

**WEEK**(*date*)

yields an integer comprised of the year (last one or two digits of
    the year) and the number of the week in the year (two digits,
    between 01 and 53)
```sql
SELECT WEEK(03/22/06) FROM DUMMY FORMAT;/* 612 */
```

**WEEK6**(*date*)

yields an integer comprised of the year in 4 digits and the number
    of the week in the year (two digits, between 01 and 53)
```sql
SELECT WEEK6(03/22/06) FROM DUMMY FORMAT;/* 200612 */
```

**MWEEK**(*week*)

given a value for week (the last two digits of a year and the number
    of a week in that year), yields the number of the month in which
    that week falls
```sql
SELECT MWEEK(0612) FROM DUMMY FORMAT;/* 3 */
```

**MONTH**(*date*)

yields the number of the month in the year
```sql
SELECT MONTH(03/22/06) FROM DUMMY FORMAT;/* 3 */
```

**QUARTER**(*date*)

yields a string comprised of the annual quarter in which the date
    falls followed by the four digits of the year
```sql
SELECT QUARTER(09/22/06) FROM DUMMY FORMAT;/* 3Q-2006 */
```

**YEAR**(*date*)

yields an integer comprised of the four digits of the year
```sql
SELECT YEAR(03/22/06) FROM DUMMY FORMAT;/* 2006 */
```

**TIMELOCAL**(*date*)

yields the number of seconds from January 1, 1970, to the specified
    date
```sql
SELECT TIMELOCAL(05/04/06) FROM DUMMY FORMAT;/* 1146693600 */
```

**CTIME**(*int*)

yields the date corresponding to the given number of seconds since
    January 1, 1970 02:00
```sql
SELECT CTIME(1146693600) FROM DUMMY FORMAT;/* Thu May 04 01:00:00
    2006 */
```

### Calculated Dates

**BEGINOFWEEK**(*date in format YYWW*)

```sql
SELECT BEGINOFWEEK(2220) FROM DUMMY FORMAT; /* 15/05/22 */
```

**BEGINOFMONTH**(*date*)

yields the date of the first day of the month
```sql
SELECT BEGINOFMONTH(05/04/06) FROM DUMMY FORMAT;/* 05/01/06 */
```


**BEGINOFQUARTER**(*date*)

yields the date of the first day of the quarter
```sql
SELECT BEGINOFQUARTER(05/04/06) FROM DUMMY FORMAT;/* 04/01/06 */
```


**BEGINOFHALF**(*date*)

yields the date of the first day of the six-month period (half a
    year) in which the date falls
```sql
SELECT BEGINOFHALF(10/22/06) FROM DUMMY FORMAT;/* 07/01/06 */
```


**BEGINOFYEAR**(*date*)

yields the date of the first day of the year
```sql
SELECT BEGINOFYEAR(10/22/06) FROM DUMMY FORMAT;/* 01/01/06 */
```



**ENDOFMONTH**(*date*)

yields the date of the end of the month
```sql
SELECT ENDOFMONTH(04/22/06) FROM DUMMY FORMAT; /* 04/30/06 */
```



**ENDOFQUARTER**(*date*)

yields the date of the end of the quarter
```sql
SELECT ENDOFQUARTER(03/22/06) FROM DUMMY FORMAT; /* 03/31/06 */
```



**ENDOFHALF**(*date*)

yields the date of the end of the half-year
```sql
SELECT ENDOFHALF(03/22/06) FROM DUMMY FORMAT;/* 06/30/06 */
```



**ENDOFYEAR**(*date*)

yields the date of the end of the year
```sql
SELECT ENDOFYEAR(03/22/06) FROM DUMMY FORMAT;/* 12/31/06 */
```

### Date Conversion

**ATOD**(*date, pattern*)

converts dates, times and days into internal numbers (mainly used to
    import external data). See [ATOD and DTOA](ATOD-and-DTOA).


**DTOA**(*date, pattern*)

converts dates, times and days in the system to ASCII (mainly used
    to print out or display data to the user). See [ATOD and DTOA](ATOD-and-DTOA ).

{% if site.output == "web" %}
## Further Reading 

-   [Executing SQL Statements](Executing-SQL-Statements )
-   [SQL Functions and Variables](SQL-Functions-Variables )
-   [Flow Control](Flow-Control )
-   [Additions and Revisions to Standard SQL Commands](Additions-to-SQL-Commands )
-   [Execution Statements](Execution-Statements )
-   [LINK and UNLINK](Link-Unlink )
-   [Return Values and Statement Failure](RETVAL-Values )
-   [Viewing Table Structure](TableStructure )
{% endif %}