---
title: Loading from/to a Load Table
layout: sdk_nav
---

## Introduction

When using a load table to import or export data in a [form
load](Form_Loads "wikilink"), it is recommended that the following steps
be taken:

1.  Determine which form columns need to be loaded and into which forms.
    Pay special attention to mandatory columns that are not filled in
    automatically; these must be included in the load.
2.  Determine how the interface will be structured. Choose between using
    the default **GENERALLOAD** table as your load table and designing
    your own table.

    :   **Tips:**
    :   \- If needed, you can add columns to the **GENERALLOAD** table.
    :   \- If you create your own table, in addition to the mandatory
        columns (see below), use column names that are relevant to the
        loaded data, as this will facilitate programming and interface
        definitions.
3.  Enter the needed data into the load table (e.g., build a program).
4.  Define the interface in the *Form Load Designer*. You may discover,
    as you define it, that you need to make adjustments to the load
    table. If you decide to switch load tables (e.g., create your own
    table), you will have to redefine the interface.
5.  Run the **INTERFACE** program.

## The Load Table {#the_load_table}

Designate the name of the table in the *Load Table* column of the *Form
Load Designer* form, indicating any *Record Size*.

The load table must contain certain columns, defined as follows (name,
type, width, title):

-   **LINE** (**INT**,8,\'Ln\')
-   **RECORDTYPE** (**CHAR**,3,\'Record Type\')
-   **LOADED** (**CHAR**,1,\'Loaded?\')
-   **KEY1** (**CHAR**,20,\'Key 1\')
-   **KEY2** (**CHAR**,20,\'Key 2\')
-   **KEY3** (**CHAR**,20,\'Key 3\')

The **LINE** column must be the unique key of the table.

------------------------------------------------------------------------

**Notes:**

-   The predefined **GENERALLOAD** table meets all these criteria and
    also includes several columns of each type.
-   The predefined **GENERALLOAD_T** also meets these criteria.
    Moreover, it contains an extra TITLE column, which can be used to
    store a message that will be added to the form\'s error message (if
    there is one). See, e.g., the **DELWTASKITEMS** procedure.

------------------------------------------------------------------------

In some cases (see below) you may need more than three key columns. As
you define the forms included in the load, the *Form Load Designer* will
warn you if there are not enough keys in the designated table. If you
need more keys, add them to the relevant **GENERALLOAD** table or design
your own table.

Once a record is successfully loaded into a form (after the
**INTERFACE** program is run), the **LOADED** column is assigned the
value *Y* and the values of the key columns are updated by the new
record that was opened. If there is an autounique key, that will serve
as **KEY1**. If not, the columns making up the unique key will be
inserted in as many keys as necessary. Therefore, you need at least as
many key columns in your table as the number of columns in the unique
key.

> **Example:** If the **INTERFACE** program opens new customers, in
> every record that was successfully loaded into the **CUSTOMERS** form,
> the value in the **KEY1** column will equal the value in the **CUST**
> column.

## Forms in the Load {#forms_in_the_load}

Use the *Forms to be Loaded* sub-level form to specify which forms
participate in the load. These usually consist of a root form (e.g.,
**ORDERS**) and one or more sub-levels (e.g., **ORDERITEMS**).

Indicate the name of each form, as well as the code representing its
record type. Each level in the form tree must be assigned its own unique
record type (e.g., **ORDERS** = 1; **ORDERITEMS** = 2).

**Tip:** After recording a form, run the *List of Sub-level Forms*
report by Direct Activation to view all its sub-levels (one level down
only).

For each form, if you want the load to overwrite existing records in the
sub-levels, flag the *Replace Form Data* column. Leave this column blank
to add the new records to existing ones.

------------------------------------------------------------------------

**Notes:**

-   Use of this flag to overwrite form data is based on the assumption
    that the existing record will be deleted successfully.
-   If the form in question has a PRE-DELETE trigger, it is not
    advisable to flag this column, as the trigger may interfere with
    deletion.
-   This flag is used mainly for text forms.

------------------------------------------------------------------------

## Link Form Columns to Table Columns {#link_form_columns_to_table_columns}

Use the next sub-level, *Link Form Cols to Load Tbl Cols*, to indicate
which form columns are equivalent to which load table columns and to
specify the order of column insertion.

While the Choose list of form columns only includes updatable columns in
the form, the **INTERFACE** program can also insert values into hidden
columns. This is useful, for instance, when you want to create a form
load that ***updates*** records. Due so with caution, however. In most
other cases, it is not good practice to insert values into hidden or
read-only columns, as this may contradict some checks defined in the
form.

> **Example:** To update the unit price of ordered parts whose records
> already exist in the **ORDERITEMS** form, you would define one of the
> load table columns as updating the hidden **ORDI** column in that
> form. In this case, make this column first in order of insertion. But
> to specify the ordered part, use the **PARTNAME** column. **\'\'Do
> not**\'\' use the hidden **PART** column, even though this may seem
> easier, as the CHECK-FIELD trigger of the **PARTNAME** column will be
> bypassed and this is likely to have an adverse effect on record
> insertion.

If you want the **INTERFACE** program to treat empty strings and zero
values as a true value, flag the *Insert Null Values* column.

> **Example:**Flag this column to load records into the **ORDERITEMS**
> form for ordered parts with a unit price of 0. Otherwise, the
> **INTERFACE** program will ignore the 0 value in that column and
> insert the default unit price of the item instead by activating the
> form\'s trigger.

## Adding Line Items to an Existing Document {#adding_line_items_to_an_existing_document}

When an interface that adds line items to a document is executed, by
default the new items are inserted first in the document (that is, they
receive a smaller line number than existing records). For instance, if a
given interface adds lines to an existing order that contains two lines,
the new record will appear on line 1, the first existing order item will
move to line 2 and the second existing order item will move to line 3.

If you want to change the position of the new record (e.g., move it
directly after the first line item), do the following:

1.  Define the interface so that existing lines are retrieved (e.g., by
    linking the **INT1** column in the load table to the **KLINE** or
    **ORDI** column).
2.  Add a column to the load table to hold the internal ID of the first
    line (**KLINE** or **ORDI**).
3.  In the load table, insert the record of the new line to be added
    after the record that retrieves the first line.

## Default Values {#default_values}

Use the next sub-level, *Default Value for Column,* to assign a default
value to be loaded into the form column. If the load table column is
empty, the value specified in this sub-level form will be loaded into
the form table. When the form load interface is used to export data, if
the form column is empty, the default value will be exported.

## More on Form Loads {#more_on_form_loads}

-   [Loading from/to a File](Loading_from/to_a_File "wikilink")
-   [Executing the Form Load](Executing_the_Form_Load "wikilink")
-   [Deleting Records from a
    Form](Deleting_Records_from_a_Form "wikilink")
-   [Form Loads](Form_Loads "wikilink")
