---
title: DBI Syntax
layout: sdk_nav
group: Tables
tags: 'Priority_SDK'
---

## Introduction

The *Database Interpreter* (**DBI**) program comprises a database
language created especially for constructing and modifying database
tables.

## Syntax Conventions 

In delineating the syntax for the *Database Interpreter* program, the
following conventions are employed:

-   Anything within brackets is optional (e.g., \[ *filename* \]). If
    brackets are omitted, the argument *must* be specified.
-   The "\|" symbol between several options indicates that only one may
    be chosen (e.g., \[ **FORMAT** \| **DATA** \| **ASCII** \]).
-   When a set of options is enclosed within curved brackets, one of the
    various options must be chosen (e.g., { *form/trigger* \|
    *form/form_column/trigger* }).
-   Characters in **bold** must be specified exactly as they appear.
    Characters in *italics* have to be replaced by appropriate values. An
    underscore between two or more italicized words indicates that they
    should be treated as a single value (e.g., **SQLI \$U**/*query_file
    parameter*).
-   All punctuation must be designated as is (commas, colons,
    parentheses, and especially the semicolon that is required at the
    end of each SQL statement)
-   Ellipses (\...) indicate that several values may be indicated for
    the previous argument (e.g., *table_name*, \...).
-   In examples, curved brackets {} enclosing text signify a comment
    which does not belong to the SQL statement. Comments within SQL
    statements are enclosed within a pair of slashes and asterisks
    (e.g., /\* Open failed; no record meets condition \*/).

## Modifying Database Tables via SQL Statements 

In addition to using the options in the *Tables Generator*, you can run
the *SQL Development* program and modify tables by means of SQL
statements, using the syntax outlined below, provided you belong to the
privilege group of the superuser (*tabula*) (for details, see
[Installing Your Customizations](Installing-Your-Customizations )).

### Syntax for Tables 

Create table

> **CREATE TABLE** *table_name* [*type*]\
*column_name1* (*type, width, \[ decimal_precision, \] 'title'*)\
[ *column_name2* (*type, width, \[ decimal_precision, \] 'title'*)
    \]\
[ *column_name3* \... \]\
[ **AUTOUNIQUE** (*column_name*) \]\
**UNIQUE** (*column_name*, \... )\
[ **UNIQUE** \... \]\
[ **NONUNIQUE** (*column_name*, \... ) \]\
[ **NONUNIQUE** \... \];

\
Delete table\
**DELETE TABLE** *table_name;*

Change table name

**FOR TABLE** *table_name*\
**CHANGE NAME TO** *new_name*;

Change table title

**FOR TABLE** *table_name*
**CHANGE TITLE TO** \'*new_title*\';

### Syntax for Columns 

Add column to table

**FOR TABLE** *table_name*\
**INSERT** *column_name (type, width, \[ decimal_precision, \]*
    \'*title*\');

Delete column from table

**FOR TABLE** *table_name* **DELETE** *column_name*;

Change column name

**FOR TABLE** *table_name* **COLUMN** *column_name*\
**CHANGE NAME TO** *new_name*;

New column width

**FOR TABLE** *table_name* **COLUMN** *column_name*
**CHANGE WIDTH TO** *integer*;

New column title

**FOR TABLE** *table_name* **COLUMN** *column_name*
**CHANGE TITLE TO** \'*title*\';

New decimal precision

**FOR TABLE** *table_name* **COLUMN** *column_name*\
**CHANGE DECIMAL TO** *decimal_precision*;

Change number type

/\*from INT to REAL and vice versa\*/\
**FOR TABLE** *table_name* **COLUMN** *column_name*\
**CHANGE NUMBER TYPE**;


/\*only from INT to REAL; if already REAL, leaves as is\*/

**FOR TABLE** *table_name* **COLUMN** *column_name*\
**CHANGE NUMBER TYPE TO REAL**;


/\*only from REAL to INT; if already INT, leaves as is\*/

**FOR TABLE** *table_name* **COLUMN** *column_name*\
**CHANGE NUMBER TYPE TO INT**;

### Syntax for Keys 

Add new key to table

**FOR TABLE** *table_name*\
**INSERT** { **AUTOUNIQUE \| UNIQUE \| NONUNIQUE**}\
(*column_name, \...*)\
[ **WITH PRIORITY** *key_priority* \];


Delete key from table

**FOR TABLE** *table_name*\
**DELETE KEY** {*key_priority \| (column_name 1, \... , column_name
    n)* };

Change key priority

**FOR TABLE** *table_name*\
**KEY** { *key_priority \| (column_name 1, \... , column_name n*) }\
**CHANGE PRIORITY TO** *new_key_priority*;

Change key type from autounique to unique

**FOR TABLE** *table_name*\
**CHANGE AUTOUNIQUE TO UNIQUE**;

Change key type from unique to nonunique

**FOR TABLE** *table_name*\
**KEY** { *key_priority \| (column_name 1, \... , column_name n*) }\
**CHANGE UNIQUE TO NONUNIQUE**;

### Syntax for Key Columns 

Add new column to key

**FOR TABLE** *table_name*\
**KEY** { *key_priority \| (column_name 1, \... , column_name n*) }\
**INSERT** *column_name*\
[ **WITH PRIORITY** *column_priority* \];

Delete column from key

**FOR TABLE** *table_name*\
**KEY** { *key_priority \| (column_name 1, \... , column_name n*) }\
**DELETE** *column_name*;

Change column priority in key

**FOR TABLE** *table_name*\
**KEY** { *key_priority \| (column_name 1, \... , column_name n*) }\
**COLUMN** *column_name*\
**CHANGE PRIORITY TO** *new_column_priority*;

## Further Reading 

-   [Tables](Tables )
-   [Table Columns](Table-Columns )
-   [Keys](Keys )
-   [Options for Creating and Modifying Tables, Columns and
    Keys](Create-Modify-Tables )
-   [Viewing Tables in the
    Database](View-Tables )
