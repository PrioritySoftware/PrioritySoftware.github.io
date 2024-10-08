---
title: LINK and UNLINK
group: SQL Syntax
tags: 'Priority_SDK'
---

## The Commands 

The LINK mechanism creates a temporary copy of a given database table.
This linked file serves a number of purposes:

-   It can serve as a parameter comprised of a batch of records.
-   It can function as a work area in which data manipulation is
    performed prior to report output. Results are then sent for display
    in the processed report.
-   It is used by form load interfaces.

The LINK command is complemented by the UNLINK command.

## Syntax

See [Syntax Conventions](SQL-Syntax#Syntax-Conventions ).

**LINK** *table_name1* \[ ID \] \[ **TO** *filename*1 \];

*{ database manipulations }*

**UNLINK** \[**AND REMOVE**\] *table_name1* \[ID\];

## Explanation and Examples 

The LINK command ties a designated table to a temporary file having an
identical structure, including all the columns and keys from the
original table. If the linked file does not yet exist, this command
creates it. If it does exist, the command simply executes the linkage.
If you specify a file name, this file can be used later on.

> **Example:** The SQLI program can create [a linked
> file](Procedure-Input#Retrieving-Records-Into-a-Linked-File )
> in one procedure step, whose contents are used in a report in the next
> step.

The linked file is initially empty of data. All subsequent operations
that refer to the original table are actually executed upon that
temporary file, until the UNLINK command is encountered.

You cannot link the same table more than once prior to an UNLINK. If you
do, the second (and any subsequent) LINK to that table will return a
value of --1 (i.e., that particular query will fail, but the rest of the
queries will continue to be executed). However, you can circumvent this
restriction by adding a different suffix (table ID) to the table name
for each link.

> **Example:** While you cannot link the **ORDERS** table twice, you can
> link both **ORDERS A** and **ORDERS B**. In this case, you will obtain
> another copy of the table for each link, and these may be used as
> separate files. Then, after linking, you could perform the following
> query:
>
> ```sql
> INSERT INTO ORDERS A 
> SELECT * FROM ORDERS B 
> WHERE ...;
> ```

After the database manipulations are completed and the required data is
stored in the linked file, you can simply display the results in a
processed report, without affecting the database table. The UNLINK
command stores the temporary file in the specified (linked) file and
undoes the link. All succeeding operations will be performed on the
original table. If the AND SET option is used, then the copy of the
table, with all its data manipulations, will be stored in the original
table. All operations that succeed the UNLINK command will be performed
on the database table and not on the copy.

Use the AND REMOVE option if you wish the linked file to be deleted when
it is unlinked. This is necessary when working with loops, particularly
when manipulations are carried out on the data in the linked file. If
you do not remove the linked file, and the function using LINK and
UNLINK is called more than once, you will receive the *same copy* of the
table during the next link. So, if you want the LINK command to open a
new (updated) copy of the table, use UNLINK AND REMOVE.

**Important!** Working with a linked file can be dangerous when the link
fails. If the query is meant to insert or update records in the linked
table and the link fails, then **everything is going to be executed on
the real table!** Therefore, you must either include an ERRMSG command
for when the link fails, or use the GOTO command so as to skip the part
of the query that uses the linked table.

For example:

```sql
SELECT SQL.TMPFILE INTO :TMPFILE;
LINK ORDERS TO :TMPFILE;
ERRMSG 1 WHERE :RETVAL <= 0;
/*database manipulation on the temporary ORDERS table */
UNLINK ORDERS;
```

or:

```sql
SELECT SQL.TMPFILE INTO :TMPFILE;
LINK ORDERS TO :TMPFILE;
GOTO 99 WHERE :RETVAL <= 0;
/*database manipulation on the temporary ORDERS table */
UNLINK ORDERS;
LABEL 99;
```

## LINK ALL

*LINK ALL* is a special variant of the LINK command. It is shorthand for linking a table to a temporary file, and then inserting all the records from the original table into the newly linked one.
As in other links, make sure to check the link was successful and unlink when you are done manipulating the records.

For example:

```sql
SELECT SQL.TMPFILE INTO :TMPFILE;
LINK ALL ORDERS TO :TMPFILE;
GOTO 99 WHERE :RETVAL <= 0;
/*database manipulation on the temporary ORDERS table */
UNLINK ORDERS;
LABEL 99;
```

Is equivalent to:

```sql
SELECT SQL.TMPFILE INTO :TMPFILE;
LINK ORDERS TO :TMPFILE;
GOTO 99 WHERE :RETVAL <= 0;
INSERT INTO ORDERS
SELECT * FROM ORDERS ORIG
WHERE ORIG.ORD <> 0;
/*database manipulation on the temporary ORDERS table */
UNLINK ORDERS;
LABEL 99;
```

LINK ALL should be used sparingly, if at all. Only in rare cases do you need the entire population of a table, and being more specific about the records you want to work on will improve performance.

{% if site.output == "web" %}
## Further Reading 

-   [Executing SQL Statements](Executing-SQL-Statements )
-   [SQL Functions and Variables](SQL-Functions-Variables )
-   [Flow Control](Flow-Control )
-   [Additions and Revisions to Standard SQL Commands](Additions-to-SQL-Commands )
-   [Execution Statements](Execution-Statements )
-   [Return Values and Statement Failure](RETVAL-Values )
-   [Non-standard Scalar Expressions](Scalar-Expressions )
-   [Viewing Table Structure](TableStructure )
{% endif %}