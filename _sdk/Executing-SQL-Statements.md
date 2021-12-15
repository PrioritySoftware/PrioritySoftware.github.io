---
title: Executing SQL
layout: sdk_nav
---

## The SQL Interpreter {#the_sql_interpreter}

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
[Forms](Forms "wikilink") and [Interfaces](Interfaces "wikilink")).
Additionally, anyone executing INSERT, UPDATE or DELETE statements must
belong to the privilege group of the superuser (tabula).

Additional options for using the *SQL Interpreter* are:

-   **+ optimizer** --- displays the steps of data retrieval.
-   **+ execution** --- displays the steps of data retrieval and
    indicates the number of records retrieved in each step.

## Further Reading {#further_reading}

-   [SQL Functions and
    Variables](SQL_Functions_and_Variables "wikilink")
-   [Flow Control](Flow_Control "wikilink")
-   [Additions and Revisions to Standard SQL
    Commands](Additions_and_Revisions_to_Standard_SQL_Commands "wikilink")
-   [Execution Statements](Execution_Statements "wikilink")
-   [LINK and UNLINK](LINK_and_UNLINK "wikilink")
-   [Return Values and Statement
    Failure](Return_Values_and_Statement_Failure "wikilink")
-   [Non-standard Scalar
    Expressions](Non-standard_Scalar_Expressions "wikilink")
-   [Viewing Table Structure](Viewing_Table_Structure "wikilink")
