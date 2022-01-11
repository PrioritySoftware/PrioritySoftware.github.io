---
title: Reports
layout: sdk_nav
group: Reports
---

## Introduction

Reports are constructed and modified in the *Report Generator* form and
its sub-levels (*System Management → Generators → Reports*).

An easy way to create a custom report is to copy an existing one (using
the *Copy Report* program in the same menu) and then make revisions to
it. In fact, this method is mandatory if you want to change the [sorting
or grouping of columns](Organizing-Report-Data ).

Reports selectively display data stored in the database, as well as
simple calculations of that data (e.g., sum totals). They can also
display complex calculations of data, defined by SQL expressions.
Finally, sophisticated operations can be performed on data by including
the report in a [procedure](Procedures ) --- i.e., a batch of
executable steps that are carried out in a predefined sequence. In fact,
most **Priority** reports are embedded in procedures. To
simplify things, the examples referred to here (e.g., **ORDERSBYCUST**)
will be treated as simple reports, even though some of them are actually
processed reports activated by a procedure.

You can create standard and [tabular reports
(tables)](Types-of-Reports ). Reports and tables can display
the same data, but in different formats. Reports tend to be more
detailed, displaying a relatively large amount of information. Tabular
reports are used to show summarized information.

A report is characterized by:

-   a unique name and title
-   a set of report columns derived from the columns of one or more
    tables in the database
-   [calculated columns](Calculated-Columns-in-Reports )
    (optional), whose values are determined by other columns.

<!--- TODO: Remove Tabula--->
**Note:** If your system uses an SQL or Oracle database, HTML documents
and reports are saved in Unicode format, using UTF-8 character encoding.
If your system uses the **Tabula** database, documents and reports are
saved in ASCII format.


## Copying Reports 

The *Copy Report* program copies:

-   all report columns and their attributes
-   all expressions for calculated columns
-   any designated target forms
-   the output title, if there is one.

It ***does not*** copy report tables, or links to procedures, menus or
forms.

When assigning a name to the new report, be sure to follow the rules
designated below. After the program is completed, make any needed
revisions to the copy.

## Report Attributes 

To revise a report's attributes (or to open a new report manually), use
the appropriate columns in the *Report Generator* form.

### Report Name 

As with forms, the report name is a short name by which the report is
identified by the system. There are certain restrictions (which also
apply to report column names):

-   Only alphanumeric values (uppercase and lowercase letters and
    digits) and the underline sign may be used (no spaces).
-   The name must begin with a letter.
-   You may not use a reserved word (a list of reserved words appears in
    the *Reserved Words* form --- *System Management → Dictionaries*).
-   The name assigned to any newly created report must include a common
    four-letter prefix (the same one you use for all entities that you
    add to **Priority** for the customer in question; e.g.,
    **XXXX_ORDERS**).

### Report Title 

The report title is the means of identifying the report in the user
interface. The designated title will appear in menus, at the top of the
screen when the report is displayed, and at the top of each page of the
printed report.

This title is restricted to 32 characters. You may, however, designate a
longer title, which will appear on screen and in printouts, in the
*Output Title* sub-level form.

Space considerations are not the only grounds for using an output title.
You might also decide to use one simply to distinguish between the menu
item and the report heading. For example, you might find it useful to
include the word "Table" in the menu, but you would not wish it to
appear in the actual report heading.

**Note:** If you change the report title after you have designated an
output title, you will receive a warning message. This is to ensure that
the output title is revised as well.

### Application

Each report is assigned an application, which is used to classify
reports by the type of data they access (e.g., FNC for the Financials
module). If the report is copied, the application is taken from the
original report. When opening a new report manually, specify a code word
that aids in retrieval.

### Module

Each report belongs to a given ***Priority*** module. As different
modules are included in each type of ***Priority*** package, users are
restricted to those reports whose modules that have purchased. If the
report is copied, the module is taken from the original report. When
opening a new report manually, specify "Internal Development"; this way
you (and your customers) will be able to use the report no matter which
modules of ***Priority*** have been purchased.

## Further Reading 

-   [Report Columns](Report-Columns )
-   [Organizing Report Data](Organizing-Report-Data )
-   [Refining Report Data
    Display](Refining-Report-Data-Display )
-   [Calculated Columns in
    Reports](Calculated-Columns-in-Reports )
-   [Types of Reports](Types-of-Reports )
-   [Running a Report](Running-a-Report )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Rules-for-Customizing )
