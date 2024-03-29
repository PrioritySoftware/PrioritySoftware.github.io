---
title: Running the Report
group: Reports
tags: 'Priority_SDK'
---

## Introduction

A simple [report](Reports ) (one which is not part of a
[procedure](Procedures )) may be run in one of three ways:

-   directly by means of a program
-   via the menu to which the report is attached
-   via the form to which it is linked.

## Using a Program to Run the Report 

You can use the *Run Report* program (accessed from the *Reports* menu)
or the *Run Report/Procedure* program (run as an Action from the
*Report Generator* form) to run a report. This method is particularly
useful during the report\'s development stages.

## Creating Menu Links 

Reports, like forms, are generally accessed from menus. To position a
given report within a menu, take the following steps:

1.  Enter the *Menu/Form Link* form, a sub-level of the *Report
    Generator* form.
2.  Indicate the name of the menu in question and specify *M* in the
    *Type* column. The title of the menu in question will appear
    automatically, to verify that you have specified the correct menu
    name.
3.  Specify an integer to determine the order of the report within the
    menu.
4.  Disregard the *Background Execution* column. This is only relevant
    for reports activated from within a form.


**Note:** The *Menu Items* form, a sub-level of the *Menu Generator*,
serves a similar purpose.


##  Form Action

Like most other ***Priority*** entities, reports may be run directly from
within a form. This option may be offered in addition to or in place of
accessing the report through the menus. By linking a report to a form,
it can be run and printed out directly from the form in question. When
directly activated from the form, input will be restricted to the form
record on which the cursor rests. Only columns which belong to the
form's base table serve as input data.

Running a report as an [Action](Actions)  from
within a form can take place in either the foreground or the background.
If it is in the background, the user will be able to continue work in
the form while the report is being run. Indeed, printouts of reports are
generally run in the background.

To allow for running a report as an action from within a form, take the
following steps:

1.  Enter the *Menu/Form Link* form, a sub-level of the *Report
    Generator* form.
2.  Indicate the name of the form in question and specify *F* in the
    *Type* column. The title of the form in question will appear
    automatically, to verify that you have specified the correct form
    name.
3.  Specify an integer to determine the order of the report within the
    form's list of Actions.
4.  If the report is to be run in the background, flag the *Background
    Execution* column.


**Note:** The *Actions* form, which is a sub-level of the *Form
Generator* form, serves a similar purpose.


{% if site.output == "web" %}
## Further Reading 

-   [Report Columns](Report-Columns )
-   [Organizing Report Data](Organize-Report-Data )
-   [Refining Report Data Display](Refine-Report-Display )
-   [Calculated Columns in Reports](Calculated-Columns-Reports )
-   [Types of Reports](Report-Types )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
-   [Reports](Reports )
{% endif %}