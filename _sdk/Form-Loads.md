---
title: Form Interfaces
layout: sdk_nav
group: Interfaces
tags: 'Priority_SDK'
---

Form interfaces are used to both import records into ***Priority*** forms and to export records from those forms. Using a form interface to import data simulates a user adding one or more records to the target forms, which includes firing all the relevant field and form triggers. 

> **Example:** You write a procedure that receives the customer name and > a list of ordered items as input. The procedure opens a sales order for the customer in input, and inserts the items into the *Order Items* sub-level form. In this case you must use the *Form Load Designer* to insert new records into the *Sales Orders* form and its sub-levels.

## Advantages of Form Interfaces

There are several advantages to using form interfaces to insert and update data:

- Data Integrity - as mentioned, form interfaces simulate a user manually entering the data in the form. They are subject to field and form triggers, and will fail if they trigger an error. You can choose whether interfaces will fail on warnings and business rules, as well.
- Work with multiple forms - a single form interface can perform actions on a parent form and its subforms in one process.
- Feedback - upon completion, the interface reports which lines were loaded succesfully and which failed. Successful lines return the key(s) of the created/updated records, while errors that caused failures are automaticaly stored in the database.

As such, interfaces are an excellent option whenever you need to create or update records, especially in standard forms.

**Note:** Think carefully when running an interface from a form trigger. If the form interface can cause that same trigger to fire again, you may create an infinite loop where an interface triggers itself.

## Form Interface Sources and Targets

A form interface serves as a map between one or more forms and their columns to a load table or a file. A form interface can read/write from the following:

- a database load table. The standard load table in the system is called GENERALLOAD, but you can also create custom load tables.
- files:
  - XML
  - JSON
  - tab separated files
  - fixed width files

## General Defintions for All Interfaces

Form interfaces are recorded in the *Form Load Designer* form and its sub-levels (*System Management → Database Interface → Form Load (EDI)*).

### Interface Name and Title {#load_name_and_title}

The interface name is a short name by which the interface is identified by the system. The following restrictions apply:

-   Only alphanumeric values (uppercase and lowercase letters and digits) and the underline sign may be used (no spaces).
-   The name must begin with a letter.
-   You may not use a reserved word (a list of reserved words appears in the *Reserved Words* form → *System Management → Dictionaries*).
-   The name assigned to any newly created form interface must include a common four-letter prefix (the same one you use for all entities that you add to ***Priority*** for the customer in question; e.g., **XXXX_LOADFNC**).

The interface title is the means of identifying the interface when executing it from the menu.

### Module

Each form interface belongs to a given ***Priority*** module. As different modules are included in each type of ***Priority*** package, users are
restricted to those form loads whose modules they have purchased. Assign any new form interface you create the "Internal Development" module; this way you (and
your customers) will be able to use it no matter which modules of ***Priority*** have been purchased.

### Load Parameters {#load_parameters}

A number of parameters will affect the form interface. Some of these can also be designated [during execution](Execute-FormLoads) of the interface:

-   *Do Not Skip Lines* --- Check this column when you want the **INTERFACE** program to continue loading records of the current
    record type once an error occurs. Leave this column blank to stop the insertion of records of the current record type when an error is
    encountered.

    > **Example:** The interface is supposed to open two sales orders, each of which contains a few order items. If the **INTERFACE** program  encounters an error while loading the first item of the first sales order and the *Do Not Skip Lines* column is not flagged, then the program will skip to the next order. If the column is checked, then the program will continue loading the remaining items of the first order.

-   *Ignore Warnings* --- ***Priority*** forms generate two types of messages: errors and warnings. Leave this column blank if you
    want the **INTERFACE** program to treat warning messages as errors.To ignore warning messages, flag this column.

-   *HTML Text* --- When exporting ***Priority*** data to an application that supports HTML tags (such as another ***Priority*** application), check this box.  HTML text definitions, such as fonts, sizes and colors, will be transferred intact, together with the text.

