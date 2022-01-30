---
# title: Customization Rules
# layout: sdk_nav
# group: CR
# tags: 'Priority_SDK'
---


## Tables

### Table Names 

The following rules apply to table names:

-   They are restricted to 20 characters.
-   They may only contain alphanumeric values and the underline sign (no
    spaces).
-   They must begin with a letter.
-   You may not use a reserved word (a list of reserved words appears in
    the *Reserved Words* form --- *System Management* → *Dictionaries*).
-   The name of any new table (one you have added yourself) must begin
    with a four-letter prefix (e.g., **XXXX_CUSTOMERS**). All tables
    (and any other ***Priority*** entities) that you have created for
    the same customer should share the same prefix.

### Rules for Modifying Tables and Table Columns 

1.  When modifying tables, do not change standard table columns or any
    of the table*s unique (or Auto Unique) keys.
2.  If you add a column to the table, the column name must begin with a
    four-letter prefix. Use the same prefix for all table columns (as
    well as any other Priority entities) that you have added for a given
    customer.

### Rules for Columns 

The following rules apply to table columns:

-   Column names are up to 20 characters.
-   Column names must be made up of alphanumeric values and the
    underline sign (no spaces).
-   Column names must begin with a letter.
-   The column name may not be a reserved word (a list of reserved words
    appears in the **RESERVED** form).
-   When adding a new column to a standard table, you must assign the
    column name a four-letter prefix (e.g., **XXXX-CUSTNAME**). This
    should be the same prefix you use for all entities that you add to
    ***Priority*** for the customer in question.
-   Column titles (up to 20 characters, including spaces) must be
    enclosed in single quotations, e.g., \'*Order Number*\'.
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
    80 characters. Wider columns might not be displayed well in forms,
    depending on the screen resolution of the user\'s computer. While
    there are a few table columns whose width exceeds 80 characters
    (e.g., the **MESSAGE** column in the **ERRMSGS** table), these
    columns are generally only displayed in reports. If you need a wide
    text column, it is recommended that you use a sub-level text form
    instead.
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

### When Installing a Revision with Modifications of a Standard Table 

-   Ensure that all users have exited the system.

## Forms

-   ***Never*** use a standard base table to create your own form.
    Create your own table instead.
-   Include the appropriate four-letter prefix (e.g., **XXXX_ORDERS**)
    in the name of any form you create.
-   When modifying a standard form, any newly added column must start
    with your four-letter prefix.
-   You cannot delete a standard column from a standard form.
-   When creating your own [multiple
    joins](Form-Column-Attributes#Special-Joins ), use a join
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

-   Any [variable](SQL-Variables#User-defined-Variables ) that
    you add to a standard form should start with the same four-letter
    prefix. If it does not, you run the risk of duplicating a system
    variable, which will have an adverse effect. It is not sufficient to
    check that such a variable does not already exist in the trigger, as
    it may be added in future software revisions.
-   Any [form message](Errors-and-Warnings ) that you
    add must be assigned a number greater than 500.

### Column Names

-   The column name must begin with a letter.
-   You may not use a reserved word.
-   Any new column in a *standard* form must begin with the appropriate four-letter prefix.

<!--- TODO: See if we can combine / change the note-->

**Note:** For general guidelines for development, see [Working with
Version
Revisions](Installing-Your-Customizations#Working-with-Version-Revisions ).

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
-   Include the appropriate four-letter prefix (e.g., **XXXX_ORDERS**)
    in the name of any report you create.
-   When creating your own multiple joins, use a join ID and column ID
    greater than 5.
-   Whenever you revise a standard report or write a new one, it is
    imperative to check the report\'s optimization. To do so, run the
    *SQL Development* (**WINDBI**) program (*System Management →
    Generators → Procedures*). From the **Optimization** menu, select
    **Report Optimization** and record the internal name of the relevant
    report.



**Note:** For general guidelines for development, see [Working with
Version
Revisions](Installing-Your-Customizations#Working-with-Version-Revisions ).



## Procedures

-   You cannot revise a standard procedure. Instead, you must copy it
    and make revisions to the copy. If the procedure runs one or more
    reports, you may need to copy the reports as well (depending on the
    type of revisions desired; see [Reports](Reports )).
-   Include the appropriate four-letter prefix (e.g.,
    **XXXX_WWWSHOWORDER**) in the name of any procedure you create.
-   When creating a copy of a standard procedure that runs a program, do
    not change any of the parameters that are transferred to the
    program.



**Note:** For general guidelines for development, see [Working with
Version
Revisions](Installing-Your-Customizations#Working-with-Version-Revisions ).



## Further Reading 

-   [Tables](Tables)
-   [Forms](Forms )
-   [Reports](Reports )
-   [Procedures](Procedures )
