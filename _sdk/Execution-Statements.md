---
title: Execution Statements
layout: sdk_nav
---

## Introduction

***Priority***recognizes several commands which affect execution of the
SQL statement (or group of statements). See also [Syntax
Conventions](SQL_Syntax#Syntax_Conventions "wikilink").

## ENV

The ENV command changes the current ***Priority*** company to the
specified company. The syntax is:

**ENV***company*;

where the company can be defined by a string (the value appearing in the
*Company* column of the *Companies* form) or a variable.

------------------------------------------------------------------------

**Note:** In the web interface, the ENV command has a minor limitation.
When used within a procedure, if you then open a form from within the
procedure, it will still open the form in the original company (the one
in which the procedure was run) rather than the one specified using ENV.

------------------------------------------------------------------------

## EXECUTE

The EXECUTE command executes a specified program with designated
parameters. It is mainly used in form triggers, in order to activate a
program from within the form or from an SQLI step in a procedure. In any
program that uses an EXECUTE command, execution occurs in the present
company. It may take place in the background.

The syntax is:

**EXECUTE**\[ **BACKGROUND**\] *program*\[ *parameter, \...* \];

where the program and each of its parameters can be specified as a
string or variable. (All parameters are separated by commas. For
strings, each string is also enclosed in a set of apostrophes).

**Note:** For the ***Priority*** web interface, see [Working with the
Priority Web
Interface](Working_with_the_Priority_Web_Interface "wikilink").

## Further Reading {#further_reading}

-   [Executing SQL Statements](Executing_SQL_Statements "wikilink")
-   [SQL Functions and
    Variables](SQL_Functions_and_Variables "wikilink")
-   [Flow Control](Flow_Control "wikilink")
-   [Additions and Revisions to Standard SQL
    Commands](Additions_and_Revisions_to_Standard_SQL_Commands "wikilink")
-   [LINK and UNLINK](LINK_and_UNLINK "wikilink")
-   [Return Values and Statement
    Failure](Return_Values_and_Statement_Failure "wikilink")
-   [Non-standard Scalar
    Expressions](Non-standard_Scalar_Expressions "wikilink")
-   [Viewing Table Structure](Viewing_Table_Structure "wikilink")
