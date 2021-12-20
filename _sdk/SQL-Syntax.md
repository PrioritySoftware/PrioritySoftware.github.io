---
title: Syntax Conventions
layout: sdk_nav
---

## Syntax Conventions 

Syntax for SQL statements in ***Priority***is based on ANSI standard
syntax and its interpretation, but also includes several additional
features. Most of the material applies to all SQL queries
in***Priority***--- those found in form triggers, step queries in
procedures, load queries and expressions for calculated form columns and
report columns. Occasionally, however, reference is made to features
that only apply to one or two of these (e.g., form triggers). When this
is the case, this restriction is explicitly stated.

In delineating SQL syntax, the following conventions are employed:

-   Anything within brackets is optional (e.g., \[ *filename* \]). If
    brackets are omitted, the argument *must*be specified.
-   The "\|" symbol between several options indicates that only one may
    be chosen (e.g., \[ **FORMAT**\| **DATA**\| **ASCII** \]).
-   When a set of options is enclosed within curved brackets, one of the
    various options *must*be chosen (e.g., { *form/trigger*\|
    *form/form_column/trigger*}).
-   Characters in **bold**must be specified exactly as they appear.
    Characters in *italics*have to be replaced by appropriate values. An
    underscore between two or more italized words indicates that they
    should be treated as a single value (e.g., **SQLI \$U**/*query_file
    parameter*).
-   All punctuation must be designated as is (commas, colons,
    parentheses, and especially the semicolon that is required at the
    end of each SQL statement)
-   Ellipses (\...) indicate that several values may be indicated for
    the previous argument (e.g., *table_name*, \...).
-   In examples, curved brackets {} enclosing text signify a comment
    which does not belong to the SQL statement. Comments *within*SQL
    statements are enclosed within a pair of slashes and asterisks
    (e.g., /\* Open failed; no record meets condition \*/).

## Further Reading 

-   [Viewing Table Structure](Viewing-Table-Structure )
-   [Executing SQL Statements](Executing-SQL-Statements )
-   [SQL Functions and
    Variables](SQL-Functions-and-Variables )
-   [Flow Control](Flow-Control )
-   [Additions and Revisions to Standard SQL
    Commands](Additions-and-Revisions-to-Standard-SQL-Commands )
-   [Execution Statements](Execution-Statements )
-   [LINK and UNLINK](LINK-and-UNLINK )
-   [Return Values and Statement
    Failure](Return-Values-and-Statement-Failure )
-   [Non-standard Scalar
    Expressions](Non-standard-Scalar-Expressions )
-   [ATOD and DTOA](ATOD-and-DTOA )
