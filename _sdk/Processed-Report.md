---
title: Processed Reports
group: Procedures
tags: 'Priority_SDK'
---

## Introduction

One of the most common uses of a procedure is to generate a *processed
report*--- a [report](Reports ) whose data undergo processing
prior to output. Such output may take the form of a standard report or a
table.

A procedure which generates a processed report is considered a special
type of procedure. Thus, you have to specify an *R* in the
*Rep/Wizard/Dashboard* column of the *Procedure Generator* form. Whenever
a procedure of this type is activated, ***it will act like a regular
report***. Indeed, there is no way for the user to distinguish between a
regular report and a processed one; they look exactly the same.

A procedure of this type is generally made up of the following steps:
user input (by means of a parameter input screen or through a form),
data manipulation (SQLI step) and running the report with processed data
(the report step itself, of type *R*).

A report step has several parameters:

-   One parameter for each of the linked files that are created during
    user input. These parameters are all of **FILE** type, and each is
    assigned the name of the table to which it is linked as its *Value*.
-   Input parameters that are passed on from the procedure to the report
    query. These, of course, are of the same parameter type they were
    assigned during the input step.

Unlike other steps containing more than one parameter, there is no need
to designate parameter position for a report.

## Changing the Report Title 

The report title can be changed at runtime in the SQLI step preceding
the report step, using the :HTMLFNCTITLE variable.

> **Example:** See step 20 of the **FRTRANS** procedure.


**Note:**This feature can also be used in HTML documents (see
[Documents](Documents )).


## Defining Dynamic Column Titles 

Report column titles can be defined dynamically. To do so, assign the
column title in an SQLI step preceding the report step.

> **Example:** The following changes the title of column #30, so that it
> displays the title from the procedure rather than what is defined in
> the report:
>
> ```sql
> :COLTITLES = 1;
> SELECT ENTMESSAGE('$', 'P', 10) 
> INTO :title1 FROM DUMMY;
> :REPCOLTITLE.30 = :title1;
> ```

## Defining Dynamic Report Conditions 

Processed reports that are generated by a procedure can also include
dynamic conditions that are defined while running the report. To use
this option, add a local variable called REPCONDITION (**FILE** type) to
an SQLI step preceding the report step, as follows:

`SELECT SQL.TMPFILE INTO :REPCONDITION FROM DUMMY;`

You can now define additional report conditions via queries whose output
is written to the REPCONDITION variable (in ASCII format).

> **Example:** See step 40 of the **WWWDB_PORDERS_A** procedure.

{% if site.output == "web" %}
## Further Reading 

-   [Procedure Steps](Procedure-Steps )
-   [Procedure Parameters](Procedure-Parameters )
-   [User Input in Procedures](Procedure-Input )
-   [Procedure Step Queries](Procedure-Step-Queries )
-   [Procedure Flow Control](Procedure-Flow-Control )
-   [Procedure Message Display](Procedure-Messages )
-   [Running a Procedure](Run-Procedure )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
-   [Procedures](Procedures )
{% endif %}