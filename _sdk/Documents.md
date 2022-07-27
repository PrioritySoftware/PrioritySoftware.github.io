---
title: Documents
layout: sdk_nav
group: Documents
tags: 'Priority_SDK'
---

## Introduction

You can use a [procedure](Procedures ) to generate a document.
This kind of procedure collects data from several reports and displays
it using an Internet browser. Each report creates a file, and the last
step of the procedure combines all these files into one displayed file.
The final document can be activated from a form via [Actions](Actions) (retrieving input from the record it was activated from), or it can be run from a menu, in which
case the user chooses the relevant records during parameter input. The
reports in such a procedure must handle one record from the base table
at a time, identified by the [autounique
key](Keys#The-Autounique-Key ).

> **Example:** In the **WWWSHOWORDER** procedure, each report handles
> one record from the **ORDERS** table at a time. Each report receives
> an ORD parameter, which contains the value of the autounique key of
> the relevant order.

## Creating the Input for the Document 

The INPUT parameter of the linked file for the procedure's main table
must be named PAR.If the procedure is to be activated from the menu, you
must define this parameter as input (specify *I* in the *Input*column)
and specify the *Column Name* and *Table Name* of the table column that
will be linked. If the procedure is to be activated only from a form, it
is not necessary to specify the PAR parameter as input, but you do have
to indicate column and table name.

## Declaring the Cursor 

The HTMLCURSOR command is used to create the cursor that goes over the
records stored in the linked table. The only thing you should write in
this step is the cursor query. The first column in the query should be
the autounique key of the table. You can retrieve more columns in the
cursor for sort purposes. The link to the table occurs in the background
of the HTMLCURSOR step.

> **Example:** In the **WWWSHOWORDER** procedure, the **ORDERS** table
> is linked to the PAR parameter. The first column in the query is the
> **ORD** column.

**In a non-English system:** If the document is in English (i.e., it is
assigned the value *E* in the *HTML Document* column of the *Procedure
Generator*), you will not be able to pass any procedure parameters from
a previous step to a step that comes after the HTMLCURSOR step, as the
latter are run in a separate process. You can work around this by
writing the parameter values into a temporary table before the
HTMLCURSOR step, and then reading these values from the table in a later
step.

### Going Over the Records 

The next step in the procedure is an SQLI step in which you retrieve the
records from the cursor. The system automatically opens the cursor that
was declared in the HTMLCURSOR step, runs the LOOP and closes the
cursor.

The value of the first parameter in the cursor is saved in a variable
called :HTMLVALUE. This is a system variable of **CHAR** type, and it
must be converted to an integer using the [ATOI
function](Scalar-Expressions#Strings ). Using
:HTMLVALUE you can retrieve the relevant record (the one being printed)
from the main table of the document in question.

> **Example:**In the **WWWSHOWORDER** procedure,
>
> ```sql
> SELECT ORDNAME,ORD,ORDSTATUS,BRANCH 
> INTO :PAR1,:$.ORD,:STAT,:BRANCH
> FROM ORDERS 
> WHERE ORD = ATOI(:HTMLVALUE) 
> AND ORD <> 0;
> ```
>
> The :$.ORD variable will be passed to the reports.

### Executing Reports that will Create the Document 

All reports that are part of the document should receive at least two
parameters. The first is the value of the autounique key of the record
currently being worked on (e.g., the sales order in question). The
second parameter should be of **ASCII**type, and must contain \"OUTPUT\"
in the *Value* column. This parameter will appear again in the final
INPUT step of the procedure, in which all the text files created by the
reports are combined into one document.

## Displaying the Document 

The last step in the document procedure should be the [INPUT
command](Procedure-Steps#Basic-Commands ). In the *Procedure
Parameters*sub-level form,you must list all the text file parameters
that were sent to the reports in the procedure. The INPUT step combines
all these files into a single HTML file.

To understand how the text files are positioned on the page, the HTML
page can be viewed as a matrix. Each text file is placed in that matrix
in the order you specify in the *Proc. Parameter-HTML Design*form, a
sub-level of *Procedure Parameters*.

Thus, for each parameter, specify its location in terms of row and
column. All the reports defined in row 1 will appear at the top of every
new page of the document. For example, you would probably like the
company logo to appear at the top of every page. You can also specify
the percentage of the width that each report will occupy (in the *Width
%*column).

Once you finish designing the report in this step, run the **Create HTML
Page for Step** action to generate the HTML framework that will be used
by the document. Rerun this action whenever you adjust the document\'s
design.

## Defining Print Options 

You can offer the user a number of print formats to choose from, based
on selected reports included in the procedure. First, name the print
format in the sub-level form, *Print Formats;* then, specify which
reports will be displayed in this format using the *Reports Included in
Print Format*form. You can also offer the user the option of printing
attachments together with the main document. To do so, include the
[HTMLEXTFILES command](Procedure-Steps#Basic-Commands )
towards the beginning of the procedure, recording a step query for it.
This command has no parameters.

> **Example:** See the various print formats defined for the
> **WWWSHOWORDER** procedure. See also the HTMLEXTFILES command in this
> procedure.

## Setting a Number of Copies to Print 

You also might want to create a program that generates multiple copies of a document by default, so that users need not update the number of copies each time the document is printed. The number of copies to be printed can be maintained in a custom form column.

For instance, say you want to create a procedure that prints multiple copies of a designated warehouse task, in which the number of copies is defined per warehouse. In order to achieve this, you can add a custom column to the **WAREHOUSES** form in which to define the desired number of copies. This value can then be retrieved when executing the document, in the HTMLCURSOR step of the procedure:

1.  Add a custom column to the WAREHOUSES form (column name =
    **PRIV_NUMCOPIES**; column type = **INT**) that can receive any number between 1 and 7.
2.  In the HTMLCURSOR step of the custom procedure, use the **DAYS** table to define a loop that generates the designated number of copies when executing the document:

> ```sql
> SELECT WTASKS.WTASK, WTASKS.WTASKNUM,
> (:$.SRT = 1 ? WTASKS.WTASKNUM :(:$.SRT = 2 ? WAREHOUSES.WARHSNAME : ''))
> FROM WTASKS, WAREHOUSES, DAYS
> WHERE WTASKS.WTASK <> 0
> AND WTASKS.WARHS = WAREHOUSES.WARHS
> AND DAYS.DAYNUM BETWEEN 1 AND MAXOP(1, WAREHOUSES.PRIV_NUMCOPIES)
> ORDER BY 3, 2;
> ```

**Notes:**

-   If you wish to allow for a number of copies that is greater than 7, you can use a custom table rather than the **DAYS** table. However, any table you use must contain a fixed number of records, like the **DAYS** table.
-   If the user also specifies a number of copies when sending the document to the printer (e.g., 2), the total number of copies printed will be a product of both numbers (e.g., if   **PRIV_NUMCOPIES** = 3, a total of 6 copies will be printed).
-   If this mechanism is used to generate multiple copies of a document in which only one original can be printed (such as an invoice or receipt), this mechanism does not override that restriction. In other words, additional copies that are generated in this fashion are still marked as copies.

## Further Reading 

-   [Special Document Features](Special-Document-Features )
-   [Outputting the Document](WINHTML )
-   [The Letter Generator](Letter-Generator )
