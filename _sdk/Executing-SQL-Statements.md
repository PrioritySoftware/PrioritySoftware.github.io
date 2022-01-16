---
title: Executing SQL
layout: sdk_nav
group: SQL Syntax
tags: 'Priority_SDK'
---

## The SQL Interpreter 

The *SQL Development* (**WINDBI**) program (*System Management* →
*Generators* → *Procedures*) provides access to the *SQL Interpreter*,
which is used to execute SQL statements (from the **Execute** menu,
select **SQL interpreter**). Use of the *Interpreter* requires
permission, which is assigned to users in the *Authorized for SQL*
column of the *Personnel File* (in the *Human Resources* menu).

In principle, any statement can be written as input to the interpreter.
However, in order to avoid violations of referential integrity, it is
highly advisable to refrain from using the interpreter for updates and
deletions of the database. As ***Priority*** provides for full automatic
protection of referential integrity in its forms, such manipulations
should be executed via forms or form interface programs (see
[Forms](Forms ) and [Interfaces](Interfaces )).
Additionally, anyone executing INSERT, UPDATE or DELETE statements must
belong to the privilege group of the superuser (tabula).

Additional options for using the *SQL Interpreter* are:

-   **+ optimizer** --- displays the steps of data retrieval.
-   **+ execution** --- displays the steps of data retrieval and
    indicates the number of records retrieved in each step.

## Further Reading 

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
-   [Viewing Table Structure](Viewing-Table-Structure )
