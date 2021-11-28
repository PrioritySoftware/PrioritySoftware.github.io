## Introduction

The following options are available from the *Table Generator* menu
(*System Management* → *Generators* → *Tables*). In order to run them,
you must belong to the privilege group of the superuser (*tabula*) and
the PRIVUSERS system constant must be set to 1.

------------------------------------------------------------------------

**Note:** When ***Priority*** is first installed, the *Table Generator*
is invisible by default. To add it to the *Generators* menu, enter the
*Menu Generator* form (*System Management* → *Generators* → *Menus*) and
retrieve the *Generators* menu. Then add the **TABGEN** menu using the
*Menu Items* sub-level form. For more information on adding entities to
menus, see [Linking the Tree to a
Menu](Sub-level_Forms#Linking_the_Tree_to_a_Menu "wikilink").

------------------------------------------------------------------------

It is imperative that ***only one of these programs be run at a time***;
otherwise, temporary tables will be overwritten. Thus, you must wait for
one program to finish before you can run another one. Moreover, care
must be taken that two individuals do not run any of these programs at
the same time.

## Programs for Tables {#programs_for_tables}

-   **Create Table** --- To create a new table:
    1.  Enter the *Define Table* form and record a table name, type (1)
        and title.
    2.  Enter the *Columns* sub-level form and, for each table column,
        record a name, type, width, title and decimal precision (if
        needed).
    3.  Enter the parallel sub-level form, *Keys*, and record the new
        table\'s keys.
    4.  For each key, enter the *Key Columns* sub-level form and record
        the columns that make up the key.
    5.  Exit all forms. The new table is created.
    6.  A message appears asking if you wish to continue. To create
        additional tables, click *OK*; otherwise, click *Cancel*.
-   **Delete Table** --- You cannot delete a table if at least one of
    its columns appears in a form, report or procedure.
-   **Change Table Name** --- The revision of the name will have no
    effect on the forms or reports based on the table (as these forms
    and reports refer to the table's internal number, rather than its
    name). However, any SQL statements that refer to the table will have
    to be revised accordingly.
-   **Change Table Title**
-   **Add Column to Table** --- To add a table column:
    1.  Run the *Add Column to Table* program. The *Add Column* form
        opens.
    2.  Choose the table to which you want to add the column.
    3.  Enter the sub-level form and record the name, type, width, title
        and decimal precision (if needed) of the new column.
    4.  Exit all forms. The new column is added to the table in
        question.
    5.  A message appears asking if you wish to continue. To add more
        table columns, click *OK*; otherwise, click *Cancel*.
-   **Delete Column from Table**

## Programs for Columns {#programs_for_columns}

-   **Change Column Name** --- The revision will have no effect on any
    forms or reports that include the column (as it is the column title,
    rather than the column name, which appears in the user interface,
    and as the column is identified in forms and reports by its internal
    number). However, any SQL statements that refer to the column will
    have to be revised accordingly.
-   **Change Column Width** --- Widths will be modified in any existing
    forms and reports that include the column. Exercise caution when
    reducing column width, as stored data that were originally wider
    than the new width will be lost (see [**Unique
    Keys**](#Unique_Keys "wikilink")).
-   **Change Decimal Precision** --- You can only change decimal
    precision in the following cases (decimal precision will be modified
    in any existing forms and reports that include the column):
    -   any real number
    -   a regular integer (current precision = 0) can be changed to the
        value of the DECIMAL system constant
    -   a shifted integer can be changed to a precision of 0 (i.e.,
        converted to a regular integer).
-   **Change Number Type** --- Columns of **INT** type may be changed to
    **REAL** type, and vice versa, during the development phase. Caution
    is advised: if the column in question is already part of an SQL
    query (e.g., in a form trigger or compiled program), then certain
    adjustments will have to be made. For instance, the type context may
    have to be redefined. When a **REAL** column is converted into an
    **INT** column, values are rounded off to the nearest integer, and
    decimal precision is changed to 0 (e.g., 5.68 becomes 6 and 2.13
    becomes 2). When an **INT** column is converted into a **REAL**
    column, two decimal places are added (i.e., a decimal precision of 2
    is automatically assigned). For instance, a value of 6 becomes 6.00
    and a value of 2 becomes 2.00.

:   **Note:** Once a custom development has been installed in your
    working environment, this operation may fail, in which case you
    should use a workaround method (see [Column
    Types](Table_Columns#Column_Types "wikilink")).

-   **Change Column Title** --- The revision will generally affect all
    forms and reports that include the column. The new title will not
    affect form columns or report columns which have been assigned a
    revised title in a specific form or report, as this overrides the
    table column title.

## Programs for Keys {#programs_for_keys}

-   **Add Key to Table** --- To add a table key:
    1.  Run the *Add Key to Table* program. The *Add Key* form opens.
    2.  Indicate the table to which you want to add the key, the type of
        key (A, U or N) and the key\'s priority.\
        :**Notes:**\
        :There may only be one autounique key per table.\
        :The addition of a unique key to a table that already includes
        records should be done with caution. See [Unique
        Keys](Keys#Unique_Keys "wikilink").\
    3.  Enter the sub-level form and record the columns in the key.
    4.  Exit all forms.
    5.  A message appears asking if you wish to continue. Click *OK* to
        add the key to the table.
    6.  A second message appears asking if you wish to continue. To add
        more table keys, click *OK*; otherwise, click *Cancel*.
-   **Delete Key from Table**
-   **Change Key Priority**
-   **Change Autounique to Unique**
-   **Change Unique to Nonunique** --- You cannot change the type of the
    first unique key in the table.
-   **Add Column to Key** --- To assign the new column a priority that
    has already been assigned to another key column, specify the desired
    priority. The new column will take over that priority and the old
    one (and any subsequent ones) will move down a priority.
-   **Delete Column from Key** --- Once a column is removed from a key,
    all columns with a lower priority move up a priority. On the dangers
    of deleting a column from a unique key, see [Unique
    Keys](Keys#Unique_Keys "wikilink").
-   **Change Column Priority** --- The changing of a column's priority
    will affect the priority of the other columns in the table.

## Further Reading {#further_reading}

-   [Tables](Tables "wikilink")
-   [Table Columns](Table_Columns "wikilink")
-   [Keys](Keys "wikilink")
-   [Viewing Tables in the
    Database](Viewing_Tables_in_the_Database "wikilink")
-   [DBI Syntax](DBI_Syntax "wikilink")
