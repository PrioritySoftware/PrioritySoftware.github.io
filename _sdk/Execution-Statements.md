---
title: Execution Statements
layout: sdk_nav
---

## Introduction

***Priority***recognizes several commands which affect execution of the
SQL statement (or group of statements). See also [Syntax
Conventions](SQL-Syntax#Syntax-Conventions ).

## ENV

The ENV command changes the current ***Priority*** company to the
specified company. The syntax is:

**ENV** *company*;

where the company can be defined by a string (the value appearing in the
*Company* column of the *Companies* form) or a variable.


**Note:** In the web interface, the ENV command has a minor limitation.
When used within a procedure, if you then open a form from within the
procedure, it will still open the form in the original company (the one
in which the procedure was run) rather than the one specified using ENV.

## EXECUTE

The EXECUTE command executes a specified program with designated
parameters. It is mainly used in form triggers, in order to activate a
program from within the form or from an SQLI step in a procedure. In any
program that uses an EXECUTE command, execution occurs in the present
company. It may take place in the background.

The syntax is:

**EXECUTE** [**BACKGROUND**] *program*\[ *parameter, \...* \];

where the program and each of its parameters can be specified as a
string or variable. (All parameters are separated by commas. For
strings, each string is also enclosed in a set of apostrophes).
<!-- TODO: Fix focus to web interface -->
**Note:** For the ***Priority*** web interface, see [Working with the
Priority Web
Interface](Working-with-the-Priority-Web-Interface ).

## Further Reading 

-   [Executing SQL Statements](Executing-SQL-Statements )
-   [SQL Functions and
    Variables](SQL-Functions-and-Variables )
-   [Flow Control](Flow-Control )
-   [Additions and Revisions to Standard SQL
    Commands](Additions-and-Revisions-to-Standard-SQL-Commands )
-   [LINK and UNLINK](LINK-and-UNLINK )
-   [Return Values and Statement
    Failure](Return-Values-and-Statement-Failure )
-   [Non-standard Scalar
    Expressions](Non-standard-Scalar-Expressions )
-   [Viewing Table Structure](Viewing-Table-Structure )
