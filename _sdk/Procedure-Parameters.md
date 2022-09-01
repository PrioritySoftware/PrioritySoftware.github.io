---
title: Procedure Parameters
group: Procedures
tags: 'Priority_SDK'
---

## Introduction

To define parameters, use the *Procedure Parameters* form, a sub-level
of the *Procedure Steps*form (itself a sub-level of the *Procedure
Generator*).

Most [procedure steps](Procedure-Steps) incorporate
parameters. These are a means of transferring arguments from the
procedure to programs or reports activated by the procedure. They also
serve to transfer information from one procedure step to another (or
from the user to the procedure step).

> **Example:**When a program finds an error, it writes the appropriate
> message to a file (i.e., a parameter in the program). The parameter is
> then passed on to the [PRINTERR
> command](Procedure-Steps#Basic_Commands), which prints out
> its contents on screen.

Only certain steps require parameter specification (e.g.,
[CONTINUE](Procedure-Steps#Basic_Commands) and
[END](Procedure-Steps#Basic_Commands) do not). Moreover,
different types of steps require that different attributes of the
parameter be defined. For instance, you need not specify type for any
parameter in a [CHOOSE or CHOOSEF
command](Procedure-Steps#Basic_Commands), and there is no
need to designate position for any parameters in a report step.

## Parameter Name and Title 

All procedure parameters must be given a name. This must meet the same
requirements as the procedure name, with two exceptions: (1) there is no
prefix); and (2) the parameter name is restricted to up to three
characters (e.g., DAY, MSG, AA).

The title is a short description of the parameter. When the parameter is
for input purposes or generates a Choose menu, the user will see the
title. It can also be used to store a brief message that is displayed by
the [PRINT, PRINTCONT or PRINTERR
command](Procedure-Steps#Basic_Commands).

## Parameter Order 

The order of parameters in a given procedure step is determined by their
position (an integer). Integers need not be consecutive; the parameter
with the lowest integer will be first. In a program, parameter position
will determine the order of parameters that are passed to the procedure.


**Note:** If the procedure step consists of a single parameter, it is
not necessary to specify position at all. Nor is it necessary to
indicate position for parameters in a report step.



## Parameter Content 

There are three distinct types of procedure parameters:

-   Those which are constants or variables.
-   Those which are text files.
-   Those which are linked files.

A parameter may be assigned a constant value or a variable in the Value
column. The value of any variable, which is identified by the prefix ":"
(e.g., :date), must be specified earlier in the procedure.

The content of a text file is determined by a step in the procedure
(generally by a program). This is generally a message file, which will
then be printed out by a PRINT, PRINTCONT or PRINTERR command.

**Note:** All temporary text files created by the system (e.g., procedure message files) are
saved in Unicode format. 

A linked file is a copy of a database table that contains only certain
records. This file includes all the table's columns and keys. The
content of a linked file is input by the user via a parameter input
screen or by means of a form. Such a file is tied to a specific database
table and column by means of the *Table Name* and *Column Name* columns.
The user then retrieves specific records by specifying search criteria
for the column in question, by moving from the column in the parameter
input screen to a target form and retrieving desired records, or by
retrieving data from the form that opens instead of the input screen (as
a result of a Form step in the procedure). A third possibility is to
input data from a specific form record. This occurs when the procedure
is directly activated from within a given form. Whatever method is used,
a file of records is created. Data manipulations may then be carried out
on the linked file.

## Parameter Type 

With the exception of parameters for a CHOOSE or CHOOSEF command, all
procedure parameters must have a specified type.

-   A parameter which contains a constant value must be assigned one of
    the valid column types (**CHAR, REAL, INT, UNSIGNED, DATE, TIME,
    DAY**).
-   A parameter that is a text file must be assigned **ASCII** type.
-   A parameter that stores text must be assigned **TEXT** type.
-   If the parameter is a linked file of records, you must designate one
    of the following types and specify the names of the table and column
    to which the file is linked:
    -   Select **FILE** if the linked file comprises a group of records
        input from the database.
    -   Select **NFILE** if the linked file comprises a group of records
        and you want the link table to remain empty when the user enters
        \* or leaves the field empty.
    -   Select **LINE** if the file consists of a single record input
        from the database.

{% if site.output == "web" %}
## Further Reading {#further_reading}

-   [Procedure Steps](Procedure-Steps)
-   [User Input in Procedures](Procedure-Input)
-   [Procedure Step Queries](Procedure-Step-Queries)
-   [Procedure Flow Control](Procedure-Flow-Control)
-   [Procedure Message Display](Procedure-Messages)
-   [Processed Reports](Processed-Reports)
-   [Running a Procedure](Run-Procedure)
-   [Help Messages](Help-Messages)
-   [Rules for Customizing](Customization-Rules)
-   [Procedures](Procedures)
{% endif %}