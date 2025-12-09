---
title: Additions and Revisions to Standard SQL Commands
group: SQL Syntax
tags: 'Priority_SDK'
---

## Additions and Revisions to Standard SQL Commands 

***Priority*** offers some additional features to several standard SQL
commands: SELECT, ORDER BY and LIKE. Furthermore, it entails revisions
to the standard SQL join.

See also [ **Syntax Conventions** ](SQL-Syntax#Syntax-Conventions ).

## Output Formats for SELECT 

In ***Priority***, an output format command must be added to the end of
a SELECT statement in order to obtain output. There are several output
format commands:

-   **FORMAT**--- generates output comprised of column headings and
    data.
-   **TABS**--- generates data separated by tabs (\\t) with titles of
    retrieved columns at the beginning of each record and line feed
    (\\n) at the end of each record; useful for preparing files that can
    be loaded into a spreadsheet.

    **Note:** To create the file without titles, initialize the
    :NOTABSTITLE variable to 1 before executing the query.

-   **DATA**--- generates file structure information (header), marked as
    comment lines by the symbol #, as well as the data; useful for
    exporting ***Priority*** data to an external database.
-   **ASCII**--- produces output of data only (no column headings) with
    no spaces in between columns.
-   **SQLSERVER**--- same as **TABS**, except that output does not
    include the titles of retrieved columns.
-   **ORACLE**--- generates a file for **sqlldr** (SQL Loader -- an
    Oracle utility used to load data from external files).
-   **UNICODE**--- generates output in Unicode (UTF-16) format. Add this option if the data contains special characters (such as those in languages such as Spanish or German).
-   **ADDTO**--- adds data to end of specified file, rather than
    replacing the contents of the file.

The syntax of these commands is:

:   **SELECT** \... \[ { **FORMAT \| TABS \| DATA \| ASCII** \|
    **SQLSERVER \| ORACLE**} \[**UNICODE**\] \[ **ADDTO** \] \[
    *\'filename\'*\] \];

If a file name is specified (enclosed in single quotes), the output is
dumped into that file; otherwise, it appears in standard output.

Note that the file name can be an expression. For instance,

```sql
SELECT * FROM PART
WHERE PART > 0 
FORMAT STRCAT ('/tmp/', 'part.sav'); 
```

will store results in the *tmp* directory in a file named *part.sav*.

## Extended LIKE Patterns 

***Priority*** includes several LIKE patterns in addition to those found
in standard SQL ("\_" and "%" wildcards, which represent a single
character and an unlimited number of characters, respectively).

For instance, the symbol " \| " may be used in pairs (as brackets) to
enclose several characters or a range of characters. Any single
character appearing within the brackets or falling within the range may
be retrieved (e.g., **\| A--D \| %** yields any character or string
beginning with the letter *A, B, C* or *D*, such as *Armchair, Desk,
Chair*).

Moreover, the symbol "\^" may be added before one or more characters
enclosed in brackets, to retrieve any character *other than* those (e.g. **\| \^A--D \| %** yields any character or string that does *not* begin
with the letter *A, B, C*, or *D*).

Finally, the delimiter "\\" should be used to retrieve one of the above
symbols. For instance, **A\\%** yields the string *A%*.

For more examples, see the search criteria designated in the *User
Interface Guide*.

It is important to remember that LIKE expressions need to appear in a
single line.

**Correct Example**

```sql
WHERE (PARTNAME LIKE '%' OR PART.PARTDES LIKE '%' 
OR EPARTDES LIKE '%')
```

**Incorrect Example**

```sql
WHERE (PARTNAME LIKE '%' OR PART.PARTDES 
LIKE '%' OR EPARTDES LIKE  '%')
```

## Outer Join 

An outer join is represented in ***Priority***'s syntax by a question
mark (?) following the table ID:

```sql
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

## Using OFFSET and FETCH as part of SQL Queries 

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
> ```sql
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
> ```sql
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

## UPSERT

<span class="version-highlight">25.1</span>

The UPSERT commands represents the combination of a standard UPDATE command, with a fallback INSERT command. If the UPDATE command fails - usually because there is no matching record to the WHERE clause - then the system will perform the INSERT command.

**Example:**

```sql
UPSERT LASTS
SET NAME = 'FOO',
VALUE = 123
WHERE NAME = 'FOO'
;
```

This example is equivalent to the following logic using UPDATE and INSERT:

```sql
UPDATE LASTS
SET VALUE = 123
WHERE NAME = 'FOO'
;
GOTO 1 WHERE :RETVAL > 0
;
INSERT INTO LASTS(NAME, VALUE)
VALUES('FOO', 123)
;
LABEL 1
;
```

The UPSERT command must include values for both the UPDATE and INSERT commands (<code>NAME = 'FOO'</code> in the above example). So even though we try to update by a value, it must also appear in the SET section of the code.

UPSERT is very useful for dealing with semamphore values, such as values in the LASTS table, or custom constants. In other words, values that are expected to exist, but will need to be generated if this is the first time the code is run.

### Unique Key Concerns

Due to its structure, with an INSERT fallback, the UPSERT command always includes a change to the unique key of the table (to serve as the unique key in case of an INSERT). Depending on the conditions in your WHERE clause, this can cause inconsistent results. If there is a single record in the table and you try to change the unique key, the UPDATE will succeed. However, if there are more records in the table, the UPDATE section will fail (as a successful update would result in identical unique keys), and the INSERT section might succeed.

For example, the following command is problematic:

```sql
UPSERT LASTS
SET NAME = 'FOO',
VALUE = 123;
```

The command could update the NAME (the unique key) of a single record in LASTS to 'FOO', or it could insert a new 'FOO' record, and it would be difficult for you to know which of the two it was.

This issue can be easily avoided by using the unique key in your WHERE clause.




{% if site.output == "web" %}
## Further Reading 

-   [Executing SQL Statements](Executing-SQL-Statements )
-   [SQL Functions and Variables](SQL-Functions-Variables )
-   [Flow Control](Flow-Control)
-   [Execution Statements](Execution-Statements)
-   [LINK and UNLINK](Link-Unlink)
-   [Return Values and Statement Failure](RETVAL-Values)
-   [Non-standard Scalar Expressions](Scalar-Expressions)
-   [Viewing Table Structure](TableStructure)
{% endif %}