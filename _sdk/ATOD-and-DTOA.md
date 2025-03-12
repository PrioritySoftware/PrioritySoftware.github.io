---
title: ATOD and DTOA
group: SQL Syntax
tags: 'Priority_SDK'
---

## Syntax

**ATOD**(*date, pattern*)

converts dates, times and days into internal numbers (mainly used to import external data)


**DTOA**(*date, pattern*)

converts dates, times and days in the system to ASCII (mainly used to print out or display data to the user)

## Pattern Components for ATOD and DTOA Expressions 

The following pattern components can be included in ATOD and DTOA
expressions (those marked with an asterisk (\*) only apply to DTOA). Of
course, more than one component can be used in the same expression.

-------------------------------------------------------------------

**Note:** You can add punctuation marks (e.g., dashes, slashes, commas) and spaces between pattern components as desired.

-------------------------------------------------------------------

   **MMM** or **mmm**--- abbreviated form (first three letters) of
    month name (Jan)

   **MMMM** or **mmmm** --- full name of the month (January)

**MONTH** --- abbreviated form of month name and the last two digits
    of the year (Jun-06)

**MM** --- number of the month (01)

**DD** --- date in the month (15)

**YY** --- last two digits of year (06)

**YYYY** --- all four digits of year (2006)

**day** --- weekday (Mon)

**hh:mm** --- hours and minutes (12:05)

**XX/XX/XX** --- date with two-digit year, displayed in American or
    European format, depending on the language type defined in the
    *Languages* form.

**XX/XX/XXXX** --- date with four-digit year, displayed in American
    or European format, depending on the language type defined in the
    *Languages* form.

**FULLDATE** --- the month name (abbreviated form), date and
    four-digit year

**WW** ---<span class="version-highlight">23.0</span> week in the year (03). \
**Note:** This is similar to the WEEK function, however, the WEEK function returns both the year and week (0603).

## Converting a String to a Date: Examples 

```sql
SELECT ATOD('06/21/06','MM/DD/YY') FROM DUMMY FORMAT; /* 06/21/06 
    (June 21, 2006, in American format) */
SELECT ATOD('06/21/2006','MM/DD/YYYY') FROM DUMMY FORMAT; /*
    06/21/06 (June 21, 2006, in American format) */
SELECT ATOD('062106','MMDDYY') FROM DUMMY FORMAT; /* 06/21/06
    (June 21, 2006, in American format) */
SELECT ATOD('311006','DDMMYY') FROM DUMMY FORMAT; /* 31/10/06
    (October 31, 2006, in European format) */
SELECT ATOD('31102006','DDMMYYYY') FROM DUMMY FORMAT; /* 31/10/06
    (October 31, 2006, in European format) */
```

## Converting a Date to a String: Examples 

Unless otherwise stated, examples are in American date format.

```sql
:DATE = 06/01/06; /* June 1, 2006 */
SELECT DTOA(:DATE,'MMMM') FROM DUMMY FORMAT; /* June */
SELECT DTOA(:DATE,'MMM') FROM DUMMY FORMAT; /* Jun */
SELECT DTOA(:DATE,'MM') FROM DUMMY FORMAT; /* 06 */
SELECT DTOA(:DATE,'MONTH') FROM DUMMY FORMAT; /* Jun-06 */
SELECT DTOA(:DATE,'day') FROM DUMMY FORMAT; /* Thu */
SELECT DTOA(06/01/06,'XX/XX/XX') FROM DUMMY FORMAT; /* 06/01/06
(June 1, 2006, in American format;
 January 6, 2006, in European) */
SELECT DTOA(:DATE,'FULLDATE') AS 'FULLDATE' FROM DUMMY FORMAT;
 /*  Jun 01,2006 */
:DATE = 06/01/06 12:33;
SELECT DTOA(:DATE,'MM/DD/YY hh:mm,day') FROM DUMMY FORMAT;
 /*  06/01/06 12:33,Thu */
SELECT DTOA(:DATE,'MMM-YY') FROM DUMMY FORMAT; /* Jun-06 */
SELECT DTOA(:DATE,'MMMM-YYYY') FROM DUMMY FORMAT;/* June-2006 */
SELECT DTOA(:DATE, 'The current date is MM-DD-YY,
 and the time is hh:mm.') FROM DUMMY FORMAT;
```

{% if site.output == "web" %}
## Further Reading 

-   [Non-standard Scalar Expressions](Scalar-Expressions)

{% endif %}
