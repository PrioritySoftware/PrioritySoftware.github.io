---
title: View Table Structure
group: Tables
tags: 'Priority_SDK'
---

## The SQL Development Program 

The *SQL Development* (**WINDBI**) program (*System Management* →
*Generators* → *Procedures*) provides access to utilities that can help
you understand table structure in ***Priority***. The main utility is
*Dump Table*, which creates a file containing the full definition of a
designated table. The first line indicates the table name, title and
type; subsequent lines delineate its columns and keys.

This is the result of the *Dump Table* program for the **ORDSTATUS**
table:

```sql
CREATE TABLE ORDSTATUS 'Possible Statuses for Orders' 0
ORDSTATUS (INT,13,'Order Status (ID)')
ORDSTATUSDES (CHAR,12,'Order Status')
INITSTATFLAG (CHAR,1,'Initial Status?')
CLOSED (CHAR,1,'Close Order?')
PAYED (CHAR,1,'Paid?')
SORT (INT,3,'Display Order')
OPENDOCFLAG (CHAR,1,'Allow Shipmt/ProjRep')
CHANGEFLAG (CHAR,1,'Allow Revisions?')
CLOSESTATFLAG (CHAR,1,'Closing Status?')
REOPENSTATFLAG (CHAR,1,'Reopening Status?')
INTERNETFLAG (CHAR,1,'Order from Internet?')
OPENASSEMBLY (CHAR,1,'Open Assembly Status')
CLOSEASSEMBLY (CHAR,1,'End Assembly Status')
PARTIALASSEMBLY (CHAR,1,'Partial Assm. Status')
ESTATUSDES (CHAR,16,'Status in Lang 2')
MANAGERREPOUT (CHAR,1,'Omit from Reports')
AUTOUNIQUE (ORDSTATUS)
UNIQUE (ORDSTATUSDES);
```

To run the program, from the **Dump** menu, select **Table**. In the
input window, designate the table you want to see. To dump more than one
table at a time, separate table names with a space.

Additional utilities are accessed from the **Queries** menu (in the same
window):

-   **Select All** retrieves all records from a designated table.
-   **Table Columns** shows the columns in a table.
-   **Table Columns incl. precision** provides the same information, but
    also displays decimal precision.
-   **Table Keys** shows the keys in a table.

## Further Reading 

-   [Tables](Tables )
-   [SQL Syntax](SQL-Syntax )
-   [Executing SQL Statements](Executing-SQL-Statements )
