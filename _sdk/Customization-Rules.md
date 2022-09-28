---
title: Customization Rules and Best Practices
layout: sdk_nav
group: CR
tags: 'Priority_SDK'
---

## General Rules

### Development Process

In order to properly handle your customizations, you should have a total of three ***Priority*** installations:
- a development environment one in which you develop your customization.
- a test environment in which you or the customer run tests.
- the production server for which the customization is developed.

After creating your customizations in the development installation, create an upgrade file and install it in the test installation. Only once you are satisfied with results should you install it on the production server.

> **Warning!** You should never customize directly on the production
server.

As revisions are maintained per user, it is imperative for all
programmers to work in their own usernames while performing the
programming.

<!-- TODO: Remove note, integrate into new Getting Started page -->

**Note:** In order to execute a DBI operation -- i.e., anything that
affects a table, table column or key -- you must belong to the privilege
group of the superuser (*tabula*) and the PRIVUSERS system constant must
be set to 1.

For more information on creating the revision and installing it on the test/production server, see [Installing  your Customizations](Installing-Customizations).

### Names

The following rules apply to the internal names of all private entities added to the system:

-   They are restricted to 20 characters in length.
-   They may only contain alphanumeric values and the underline sign (no
    spaces).
-   They must begin with a letter.
-   You may not use a reserved word (a list of reserved words appears in
    the *Reserved Words* form --- *System Management* → *Dictionaries*).
-   New custom entities (tables, forms, procdeures, reports, triggers, functions) must begin with a four-letter prefix (e.g., **XXXX_CUSTOMERS**). All entities created for the same customer should share the same prefix.
-   Sub-entities of standard entities (e.g., new column in standard form or report) should likewise begin with a four-letter prefix.
-   Any [variable](SQL-Variables#User-defined-Variables ) that
    you add to your code should start with the same four-letter
    prefix. If it does not, you run the risk of duplicating a system
    variable, which will have an adverse effect. It is not sufficient to
    check that such a variable does not already exist in the trigger, as
    it may be added in future software revisions.

### Code

- Never INSERT or UPDATE data in standard tables directly. Use [interfaces](Form-Loads) or other tools that interact with the form to insert data in standard forms.
- Any [LINK or UNLINK](Link-Unlink) operation should be followed by a test to ensure the operation succeeded. Remember, a failed LINK operation could lead to overwriting data in the original table rather than the linked copy!
- Do not write non-ASCII characters directly in your code. If you need to reference text that is unicode (e.g. a message in Hebrew), use the [ENTMESSAGE](SQL-Functions-Variables) function to insert it into a variable, instead.


## Tables

-  When modifying tables, do not change standard table columns or any
    of the table's unique (or Auto Unique) keys. If you wish to increase the width of certain columns, it is best to consult with Priority Software beforehand.

### Rules for Columns 

-   Decimal precision can only be specified for a **REAL** or **INT**
    column. Most columns have a decimal precision of 2. To designate a
    **REAL** number with indefinite precision, use decimal precision 0;
    otherwise, the number will be rounded up to a defined precision by
    INSERT and UPDATE statements. In the case of a shifted integer,
    decimal precision must be equal to the value of the DECIMAL system
    constant (or it may be 0, i.e., a regular integer).
-   Modification of a column affects all forms and reports in which the
    column appears.
-   You cannot delete a column that appears in a form, report or
    procedure.
-   You can only change the following column types: **INT** to **REAL**
    and vice versa (number conversion), and only during the development
    phase.
-   Text columns (i.e., **CHAR** columns) should not exceed a width of
    120 characters. 
- Columns that are part of the SELECT statement of a SEARCH type trigger cannot exceed 59 characters.
-   You cannot add columns to system tables.

### Rules for Keys 

-   There may only be one autounique key per table. It must comprise a
    single column of **INT** type which does not appear in any other of
    the table's keys, and it must be of first priority.
-   A table must have at least one unique key.
-   If there is an autounique key, it must be the first key (1) in the
    table and a unique key must be second. If there is no autounique
    key, one of the unique keys must have first priority.
-   The order in which key columns are designated determines their
    priorities.
-   The column to be included in the key must be included in the table
    to which the key is assigned.
-   If you add a column to a key without specifying column priority, it
    will automatically be assigned the last available priority (e.g., if
    the key includes two columns, the added column will receive a
    priority of 3).
-   Changing a key column's priority will affect the priority of the
    other columns in the key.

## Forms

-   ***Never*** use a standard base table to create your own form.
    Create your own table instead.
-   You cannot delete a standard column from a standard form.
-   When creating your own [multiple joins](Form-Columns#Special-Joins), use a join
    ID and column ID greater than 5.
-   Any [trigger](Creating-your-triggers ) you add must
    start with a four-letter prefix or end with a four-letter suffix.
    Choose the first letter in the prefix/suffix for sorting purposes;
    the rest of the prefix/suffix should be the one normally used for
    this customer.

    **Important note:** [SEARCH-FIELD
    triggers](Creating-your-triggers#SEARCH-FIELD ) are
    the one exception to this rule, as their name cannot be changed.
    Instead, you have to use the standard trigger. This creates the
    slight risk that your trigger will be overwritten by a standard
    SEARCH-FIELD trigger that is changed in future software revisions.

-   Any [form message](Errors-and-Warnings ) that you
    add must be assigned a number greater than 500.
-   Do not add standard forms as sub-level forms of custom forms. 
-   When using LABELs in your code, use numbers with at least 4 digits. This will prevent conflicts with the label numbers used in standard triggers.

## Reports

If you revise a standard report, you must follow some rules to
    ensure that your customizations are not overwritten by future
    ***Priority*** releases:

-   Any columns that you add to a standard report must have an internal
    number (*Col. Number*) greater than 500. After assigning the column
    number, you will probably need to fix the position of the column.
-   If you add a join to a new table in a *standard* report, assign a *Join ID* greater than 5.
-   Do not change the sorting or grouping of standard reports. If you
    have to do so, copy the standard report and create one of your own.
-   You cannot delete a standard column from a standard report.
-   When creating your own multiple joins, use a join ID and column ID
    greater than 5.
-   Whenever you revise a standard report or write a new one, it is
    imperative to check the report\'s optimization. To do so, run the
    *SQL Development* (**WINDBI**) program (*System Management →
    Generators → Procedures*). From the **Optimization** menu, select
    **Report Optimization** and record the internal name of the relevant
    report.
-   Conditions and expressions cannot exceed a maximum length of 3000 characters. 


## Procedures

-   You cannot revise a standard procedure. Instead, you must copy it
    and make revisions to the copy. If the procedure runs one or more
    reports, you may need to copy the reports as well (depending on the
    type of revisions desired; see [Reports](Reports )).
-   When creating a copy of a standard procedure that runs a program, do
    not change any of the parameters that are transferred to the
    program.
- All procedures that include a form interface should include the form interface as a step, after an END step. This is utilized by the system for assigning permissions when running the interface.
- You should avoid using a standard interface as part of a custom procedure, or your code may break in the future due to a change to the interface definitions. 

## Best Practices

For all intents and purposes, Priority's SQL is a development language in its own right, and general best practices for writing code should be kept in mind. 
- Write reusable code. If you plan on using the same code multiple times, turn it into a function or buffer.
- Write readable code. Use meaningful variable names and include comments.

### Recommendations

The following recommendations are intended for new developers to avoid some common pitfalls.

- Do not add multiple PRE/POST triggers for the same form or form column. If you need to add additional logic, add it as a buffer and include it in the existing PRE/POST trigger.
- When adding/modifying functionality, include a comment that points towards the specification document or requirement that led to this addition/change.
- Do not insert error and warning messages within the code being iterated over by a loop or a cursor. These will cause the process to hang while waiting for input from the user. If you need to display a message, escape the loop or wait for it to end, and then display the error/warning.




## Further Reading 

-   [Tables](Tables)
-   [Forms](Forms )
-   [Reports](Reports )
-   [Procedures](Procedures )
-   [Installing  your Customizations](Installing-Customizations)
