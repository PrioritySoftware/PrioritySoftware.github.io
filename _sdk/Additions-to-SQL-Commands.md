---
title: Additions and Revisions to Standard SQL Commands
layout: sdk_nav
---

## Additions and Revisions to Standard SQL Commands {#additions_and_revisions_to_standard_sql_commands}

***Priority***offers some additional features to several standard SQL
commands: SELECT, ORDER BY and LIKE. Furthermore, it entails revisions
to the standard SQL join.

See also [**Syntax
Conventions**](SQL_Syntax#Syntax_Conventions "wikilink").

## Output Formats for SELECT {#output_formats_for_select}

In ***Priority***, an output format command must be added to the end of
a SELECT statement in order to obtain output. There are several output
format commands:

-   **FORMAT**--- generates output comprised of column headings and
    data.
-   **TABS**--- generates data separated by tabs (\\t) with titles of
    retrieved columns at the beginning of each record and line feed
    (\\n) at the end of each record; useful for preparing files that can
    be loaded into a spreadsheet.

:   **Note:** To create the file without titles, initialize the
    :NOTABSTITLE variable to 1 before executing the query.

-   **DATA**--- generates file structure information (header), marked as
    comment lines by the symbol #, as well as the data; useful for
    exporting ***Priority***data to an external database.
-   **ASCII**--- produces output of data only (no column headings) with
    no spaces in between columns.
-   **SQLSERVER**--- same as **TABS**, except that output does not
    include the titles of retrieved columns.
-   **ORACLE**--- generates a file for **sqlldr** (SQL Loader -- an
    Oracle utility used to load data from external files).
-   **UNICODE**--- generates output in Unicode (UTF-16) format.
-   **ADDTO**--- adds data to end of specified file, rather than
    replacing the contents of the file.

The syntax of these commands is:

:   **SELECT** \... \[ { **FORMAT \| TABS \| DATA \| ASCII** \|
    **SQLSERVER \| ORACLE**} \[**UNICODE** \] \[ **ADDTO** \] \[
    *\'filename\'*\] \];

If a file name is specified (enclosed in single quotes), the output is
dumped into that file; otherwise, it appears in standard output.

Note that the file name can be an expression. For instance,

``` tsql
SELECT * FROM PART
WHERE PART > 0 
FORMAT STRCAT ('/tmp/', 'part.sav'); 
```

will store results in the *tmp*directory in a file named *part.sav*.

## Extended LIKE Patterns {#extended_like_patterns}

***Priority***includes several LIKE patterns in addition to those found
in standard SQL ("\_" and "%" wildcards, which represent a single
character and an unlimited number of characters, respectively).

For instance, the symbol " \| " may be used in pairs (as brackets) to
enclose several characters or a range of characters. Any single
character appearing within the brackets or falling within the range may
be retrieved (e.g., **\| A--D \| %**yields any character or string
beginning with the letter *A, B, C*or *D*, such as *Armchair, Desk,
Chair*).

Moreover, the symbol "\^" may be added before one or more characters
enclosed in brackets, to retrieve any character *other than*those (e.g.
**\| \^A--D \| %**yields any character or string that does *not*begin
with the letter *A, B, C*, or *D*).

Finally, the delimiter "\\" should be used to retrieve one of the above
symbols. For instance, **A\\%**yields the string *A%*.

For more examples, see the search criteria designated in the *User
Interface Guide*.

It is important to remember that LIKE expressions need to appear in a
single line.

**Correct Example**

``` tsql
WHERE (PARTNAME LIKE '%' OR PART.PARTDES LIKE '%' 
OR EPARTDES LIKE '%')
```

**Inorrect Example**

``` tsql
WHERE (PARTNAME LIKE '%' OR PART.PARTDES 
LIKE '%' OR EPARTDES LIKE  '%')
```

## Outer Join {#outer_join}

An outer join is represented in ***Priority***'s syntax by a question
mark (?) following the table ID:

``` tsql
SELECT ...FROM FNCITEMS, FNCITEMSB ?
WHERE FNCITEMSB.FNCTRANS = FNCITEMS.FNCTRANS
AND FNCITEMSB.KLINE = FNCITEMS.KLINE;
```

As opposed to regular joins, an outer join preserves unmatched rows.
Thus, if there is no join record, a null record will be retrieved from
the join table and the query will succeed.

> **Example:** The **FNCITEMS** table, which stores journal entry items,
> is linked to **FNCITEMSB**, a table which (among other things) stores
> profit/cost centers from groups 2-5. An outer join is required, as not
> all records in **FNCITEMS** have values in **FNCITEMSB** (that is, a
> given journal entry item may not necessarily include profit/cost
> centers from groups 2-5).

## Using OFFSET and FETCH as part of SQL Queries {#using_offset_and_fetch_as_part_of_sql_queries}

Priority supports the saved words OFFSET and FETCH as part of SQL
queries. These are useful for cases where you need to create pages of
results.

Queries using OFFSET and FETCH must include an ORDER BY statement that
explicitly sorts the results.

Use OFFSET to retrieve results starting from a specified returned row.

> **Example:** The following request retrieves orders dated later than
> 01/01/19, and returns orders from starting with the 101th order
> retrieved. Orders are sorted by internal order number:
>
> ``` tsql
> :FR = 100;
> SELECT ORD, ORDNAME FROM ORDERS WHERE CURDATE > 01/01/19
> ORDER BY 1
> OFFSET :FR
> FORMAT;
> ```

To limit the amount of rows returned in the response, use FETCH and
specify the number of rows to retrieve.

> **Example:**
>
> ``` tsql
> :FR = 100;
> :MAX = 75;
> SELECT ORD, ORDNAME FROM ORDERS WHERE CURDATE > 01/01/19
> ORDER BY 1
> OFFSET :FR FETCH NEXT :MAX ROWS ONLY
> FORMAT;
> ```
>
> In this case, we FETCH :MAX =75, limiting the results to a maximum of
> 75 rows. We retrieve starting from row 101, as the results are OFFSET
> by 100.

## Further Reading {#further_reading}

-   [Executing SQL Statements](Executing_SQL_Statements "wikilink")
-   [SQL Functions and
    Variables](SQL_Functions_and_Variables "wikilink")
-   [Flow Control](Flow_Control "wikilink")
-   [Execution Statements](Execution_Statements "wikilink")
-   [LINK and UNLINK](LINK_and_UNLINK "wikilink")
-   [Return Values and Statement
    Failure](Return_Values_and_Statement_Failure "wikilink")
-   [Non-standard Scalar
    Expressions](Non-standard_Scalar_Expressions "wikilink")
-   [Viewing Table Structure](Viewing_Table_Structure "wikilink")
