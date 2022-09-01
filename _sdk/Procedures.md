---
title: Procedures
group: Procedures
tags: 'Priority_SDK'
---

## Introduction

Procedures are a set of executable steps carried out in a predefined
order. They are often used to create *processed reports* --- reports
that are generated following data manipulation. Similarly, they can be
used to create a *document*. This is a special procedure that collects
data from more than one report and displays a final file using an
Internet browser (see [Documents](Documents )). Another type
of procedure is used to create a new document (e.g., a sales order) on
the basis of another document, by means of an interface to a form.
Finally, procedures also serve to run the SQLI program as well as
internal programs, which perform data manipulations and other tasks.

***You should not create a procedure that inserts records directly into
a table.*** Instead, use the procedure to run an interface to a form
that will insert the records. For details, see [Form
Loads](Form-Loads ).

A procedure is characterized by:

-   a unique name
-   a title
-   steps of execution (the entities/commands that are run)
-   parameters.

Procedures are constructed and modified in the *Procedure Generator*
form and its sub-levels (*System Management → Generators → Procedures*).

***You cannot customize an existing procedure.*** Rather, you must copy
it (using the *Copy Procedure* program in the same menu) and make
revisions to the copy. The two procedures (standard and customized)
should be very similar in terms of their logic.

<!--- Adjust for Web focus -->

**Note:** There are some slight differences when procedures are written
for the ***Priority*** web interface; see [Working with the Priority Web Interface](Priority-Web) for
details.


## Copying Procedures 

The *Copy Procedure* program copies:

-   all the procedure steps
-   all their parameters
-   all step queries and procedure messages
-   any designated target forms.

It ***does not*** copy the output title, links to menus, forms or other
procedures.

When assigning a name to the new procedure, be sure to follow the rules
designated below. After the program is completed, make any needed
revisions to the copy.


**Notes:**

-   If the procedure creates reports, you may need to copy one or more
    of those reports as well, using the [*Copy Report* program](Reports).
-   If the procedure runs a program, you must not make any changes to
    parameters used by the program.


## Procedure Attributes 

To revise a procedure\'s attributes (or to open a new procedure
manually), use the appropriate columns in the *Procedure Generator*
form, unless otherwise designated.

### Procedure Name 

The procedure name is a short name by which the procedure is identified
by the system. The following restrictions apply:

-   Only alphanumeric values (uppercase and lowercase letters and
    digits) and the underline sign may be used (no spaces).
-   The name must begin with a letter.
-   You may not use a reserved word (a list of reserved words appears in
    the *Reserved Words* form, at: *System Management → Dictionaries*).
-   The name assigned to any newly created procedure must include a
    common four-letter prefix (the same one you use for all entities
    that you add to **Priority** for the customer in question;
    e.g., **XXXX_WWWSHOWORDER**).

### Procedure Title 

The title is the means of identifying the procedure in the user
interface. The procedure title will appear in menus and at the top of
any report that is output by the procedure. Procedure titles are
restricted to 32 characters. You may, however, designate a longer title,
which will appear in printouts, in the *Output Title* sub-level form.
For a procedure that runs reports, specify the output title for the
report instead (using the appropriate form in the *Report Generator*).
If you specify an output title for both, then the one assigned to the
report will be used.

### Procedure Type 

Designate the type of procedure:

-   If the procedure runs a report, specify *R* in the
    *Rep/Wizard/Dashboard* column.
-   If the procedure runs a report but you want to prevent the
    Print/Send Options dialogue box from appearing to the user, specify
    *N* in the *Rep/Wizard/Dashboard* column.
-   If the procedure creates a document, specify *R* in the
    *Rep/Wizard/Dashboard* column and *Y* in the *HTML Document* column.


**Note:** See [Processed Reports](Processed-Report ) and
[Documents](Documents ).


### Application

Each procedure is assigned an application, which is used to classify
procedures by the type of data they access (e.g., FNC for the Financials
module). If the procedure is copied, the application is taken from the
original procedure. When opening a new procedure manually, specify a
code word that aids in retrieval.

### Module

Each procedure belongs to a given ***Priority*** module. As different
modules are included in each type of ***Priority*** package, users are
restricted to those procedures whose modules they have purchased. If the
procedure is copied, the module is taken from the original procedure.
When opening a new procedure manually, specify "Internal Development";
this way you (and your customers) will be able to use the procedure no
matter which modules of ***Priority*** have been purchased.

{% if site.output == "web" %}
## Further Reading 

-   [Procedure Steps](Procedure-Steps )
-   [Procedure Parameters](Procedure-Parameters )
-   [User Input in Procedures](Procedure-Input )
-   [Procedure Step Queries](Procedure-Step-Queries )
-   [Procedure Flow Control](Procedure-Flow-Control )
-   [Procedure Message Display](Procedure-Messages )
-   [Processed Reports](Processed-Report )
-   [Running a Procedure](Run-Procedure )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
{% endif %}