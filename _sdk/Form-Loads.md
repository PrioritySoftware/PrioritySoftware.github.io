---
title: Form Loads
layout: sdk_nav
---

## The Form Load {#the_form_load}

The form load is used both to import records directly into
***Priority*** forms and to export records from those forms.

> **Example:** You write a procedure that receives the customer name and
> a list of ordered items as input. The procedure opens a sales order
> for the customer in input, and inserts the items into the *Order
> Items* sub-level form. In this case you must use the *Form Load
> Designer* to insert new records into the *Sales Orders* form and its
> sub-levels.

In general, a form load interface is characterized by:

-   a unique interface name
-   a load table in ***Priority*** or an external file to which data is
    loaded (or from which it is exported)
-   definitions linking the table columns, file columns or XML tags to
    individual form columns
-   parameters affecting the load.

These definitions are recorded in the *Form Load Designer* form and its
sub-levels (*System Management → Database Interface → Form Load (EDI)*).

Each form load can be based on either a load table or an external file.

## Load Name and Title {#load_name_and_title}

The load name is a short name by which the load is identified by the
system. The following restrictions apply:

-   Only alphanumeric values (uppercase and lowercase letters and
    digits) and the underline sign may be used (no spaces).
-   The name must begin with a letter.
-   You may not use a reserved word (a list of reserved words appears in
    the *Reserved Words* form --- *System Management → Dictionaries*).
-   The name assigned to any newly created form load must include a
    common four-letter prefix (the same one you use for all entities
    that you add to ***Priority*** for the customer in question;
    e.g., **XXXX_LOADFNC**).

The load title is the means of identifying the load when executing it
from the menu.

## Module

Each form load belongs to a given ***Priority***module. As different
modules are included in each type of***Priority***package, users are
restricted to those form loads whose modules they have purchased. Assign
a new form load the "Internal Development" module; this way you (and
your customers) will be able to use it no matter which modules
of***Priority*** have been purchased.

## Load Parameters {#load_parameters}

A number of parameters will affect the form load. Some of these can also
be designated during execution of the load itself:

-   *Do Not Skip Lines* --- Flag this column when you want the
    **INTERFACE** program to continue loading records of the current
    record type once an error occurs. Leave this column blank to stop
    the insertion of records of the current record type when an error is
    encountered.

:   **Note:** The same purpose is served by the --*noskip* parameter,
    which can be included in the form load execution (see more details
    below).

> **Example:**The form load is supposed to open two sales orders, each
> of which contains a few order items. If the **INTERFACE** program
> encounters an error while loading the first item of the first sales
> order and the *Do Not Skip Lines* column is not flagged, then the
> program will skip to the next order. If the column is flagged, then
> the program will continue loading the remaining items of the first
> order.

-   *Ignore Warnings* --- ***Priority*** forms generate two types
    of messages: errors and warnings. Leave this column blank if you
    want the **INTERFACE** program to treat warning messages as errors.
    To ignore warning messages, flag this column.

:   **Note:** The same purpose is served by the --*w* parameter, which
    can be included during the form load. Furthermore, you can define a
    specific run of the form load so that warnings appear in the errors
    report even when they are \"ignored\", by means of the *--W*
    parameter (see more details below).

-   *HTML Text* --- When exporting ***Priority***data to an application
    that supports HTML tags (such as another***Priority*** application),
    flag this column. HTML text definitions, such as fonts, sizes and
    colors, will be transferred intact, together with the text.

