---
title: Tables
group: Tables
tags: 'Priority_SDK'
---

## Table Names 

The following rules apply to table names:

-   They are restricted to 20 characters.
-   They may only contain alphanumeric values and the underline sign (no
    spaces).
-   They must begin with a letter.
-   You may not use a reserved word (a list of reserved words appears in
    the *Reserved Words* form --- *System Management* → *Dictionaries*).
-   The name of any new table (one you have added yourself) must begin
    with a four-letter prefix (e.g., **XXXX_CUSTOMERS**). All tables
    (and any other ***Priority*** entities) that you have created for
    the same customer should share the same prefix.

## Table Type 

The table type determines whether the table is an application table or a
system table. An application table is a table in which data is
maintained separately for each ***Priority*** company, whereas a
system table is used to store data that is common to all companies in
the current ***Priority*** installation.

For historical reasons,***Priority*** lists 4 possible values in the
**TYPE** column:

-   0/1 -- for application tables
-   2/3 -- for system tables

However, new tables should always be assigned type 0.


**Note:** You cannot create new system tables or add new columns to
system tables.


### Rules for Modifying Tables and Table Columns 

1.  When modifying tables, do not change standard table columns or any
    of the table's unique (or Auto Unique) keys.
2.  If you add a column to the table, the column name must begin with a
    four-letter prefix. Use the same prefix for all table columns (as
    well as any other Priority entities) that you have added for a given
    customer.
3.  When creating a new table, the table name should begin with the
    appropriate four-letter prefix (there is no need to add this prefix
    to the new table's columns).

#### When Installing a Revision with Modifications of a Standard Table 

-   Ensure that all users have exited the system.


**Note:** For general guidelines for development, see [Working with Version Revisions](Installing-Customizations).


## Further Reading 

-   [Table Columns](Table-Columns )
-   [Keys](Keys )
-   [Options for Creating and Modifying Tables, Columns and
    Keys](Create-Modify-Tables )
-   [Viewing Tables in the Database](View-Tables )
-   [DBI Syntax](DBI-Syntax )
-   [Viewing Table Structure](TableStructure )
