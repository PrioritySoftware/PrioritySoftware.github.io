---
title: Load Data from a File or Export Data to a File
layout: sdk_nav
group: Interfaces
---

## Introduction

When using an external file to import or export data in a [form
load](Form_Loads ), make sure you know the structure of the
file you will be using before you begin defining the interface.

**Tip:** If you want to create a new form load based on an existing one,
retrieve the desired form load and run the *File Definitions for Form
Load* report by Direct Activation from the *Form Load Designer* form.

## Defining the File 

Designate the name of the file, its record size and its file type in the
appropriate columns of the *Form Load Designer* form.

If the file is stored in the *system\\load* directory, you can specify
just the filename. Otherwise, give the full path to the file.

For interfaces that load file data, flag the *Sub-directory?* column to
search for the file in the sub-folder of the current company within
system/load. The flag is only relevant when a file name is specified in
the File Name field without a path (i.e., the field does not contain (/)
or (\\)). Leave the column blank for the program to search for the file
in system/load.

**Notes:** If the file name appears with a path (i.e. the field contains
(/) or (\\)), flagging this column will have no effect.

As of version 19, this column is flagged by default for all interfaces
in the system (customized or standard) that load data from a file.


You can use one of three types of files for the form load:

-   an ASCII or Unicode text file with fixed column widths
-   an ASCII or Unicode text file with data separated by tabs
-   an XML/JSON file (using either ASCII or Unicode character encoding).

**Note:** ***Priority***\'s interface tools can import data from either
ASCII or Unicode (UTF-16) files, and will automatically recognize the
format used. Data exported from***Priority*** for use in outgoing
interfaces will be saved in ASCII format, unless otherwise specified.

## Forms in the Load 

Use the *Forms to be Loaded* sub-level form to specify which forms
participate in the load. These usually consist of a root form (e.g.,
**ORDERS**) and one or more sub-levels (e.g., **ORDERITEMS**).

Indicate the name of each form, as well as the code representing its
record type. Each level in the form tree must be assigned its own unique
record type (e.g., **ORDERS** = 1; **ORDERITEMS** = 2). This must match
the record type in the file itself.


**Notes:**

-   Record type is irrelevant for XML/JSON files. As the column is
    mandatory, record any value here.
-   After recording a form, run the *List of Sub-level Forms* report by
    Direct Activation to view all its sub-levels (one level down only).

For each form, if you want the load to overwrite existing records in the
sub-levels, flag the *Replace Form Data* column. Leave this column blank
to add the new records to existing ones. This is only relevant, of
course, when the root record (e.g., an order) already exists. If the
load is used only for inserting new root records, leave the column blank
to make the load faster.

## Link Form Columns to Fields in File 

Use the next sub-level, *Position of Form Columns in File*, to match the
data in the file to specific form columns. For text files, also indicate
the order of insertion. In a file with tab separators, identify the file
data by its column number. Otherwise, indicate the number of the first
and last characters that determine the field (in XML/JSON files, this
determines the order of insertion).

If you want the **INTERFACE** program to treat empty strings and zero
values as a true value, flag the *Insert Null Values* column (see
example above). If the file contains **REAL** values (or shifted
integers) without a decimal point, indicate the number of *Digits After
Decimal*.

For text files, indicate where the record type is located in the file.
To do so, use the *Position of Record Type in File* form (a sub-level of
the *Form Load Designer*). Specify the column number (in a tab-separated
file) or the position of the first and last character that defines this
field (in a fixed-width file).

## Default Values 

Use the next sub-level, *Default Value for Column,* to assign a default
value to be loaded into the form column. If the specified position in
the file is empty, the value specified in this sub-level form will be
loaded into the form table. When the form load interface is used to
export data, if the form column is empty, the default value will be
exported.

## Additional Definitions for XML/JSON Files 

If you are loading to or from an XML/JSON file, you must define the
tags. Specifically, you need to take the following steps:

1.  From the *Form Load Designer* form, run the *Prepare XML Tags by
    File Defs* program by Direct Activation. The structure of the file
    appearing in the *File Name* column will be analyzed and transferred
    to the *XML Tags for Interface* sub-level form. This file should be
    saved in the *system\\load\\company* directory, where *company* is
    the name of the current company (SQL.ENV).\
    **Note:** If you are exporting data to an XML file, use a sample
    file with the desired tags to create the structure.
2.  Enter the *XML Tags for Interface* form and check results. For each
    tag, the data in the first record appears in the *Value* column. If
    you want this (or any other value) to be used in all records,
    regardless of definitions in the file, specify *C* in the *Type of
    Value* column. If necessary, revise the value.\
    You may note that the `<i>`{=html}Type of Value`</i>`{=html} column
    contains a value of `<i>`{=html}E`</i>`{=html}, which cannot be
    revised. This denotes a tag in the XML that is empty of data or
    attributes, and serves an organizational purpose in the file.
3.  If you are exporting data to an XML file and there are attributes
    for any tags, record them in the XML Attributes column.\
    **Example:** For an XML tag defined as \<custname
    type=\'string\'\>1001\</custname> you would record \"type =
    \'string\' \" in this column.
4.  Some XML document schemas call for parent tags to repeat for each
    child data item, as depicted in the following example:
    ```xml
    <Order>
        <OrderItems>
            <OrderItem>
                <part>001</part>
            </OrderItem>
            <OrderItem>
                <part>002</part>
            </OrderItem>
        </OrderItems>
    </Order>
    ```

    \
    In other files, this tag needs to appear only once. You can control
    this behavior in the loaded file by prepending a
    **+** to a repeating parent, or a **-** for a parent that should appear only once.
    For an example, see the ECSL_BELGIUMMON form interface.
5.  Return to the *Forms to be Loaded* form and its sub-level *Position
    of Column in File*. Use the next sub-level, *Definition of XML
    Tags*, to link each form column to the appropriate tag. If the tag
    is a date, you can also define the *Date Format*, indicating how the
    date value will be displayed. You can use any of the available [SQL
    date formats](ATOD-and-DTOA ), such as MMDDYY or MM/DD/YY.

<!-- TODO: Move to Windows only -->

**Note:** Once you have created a form load design that uses an XML
file, ***Priority*** automatically enables users to export data from the
main form of this load design to an XML file. In this case the *XML
File* option in the *Mail* top menu of the relevant form will be enabled
(in Windows). When it is selected, the user gets a choice of interfaces
to run. The system indicates where the output file has been saved.

------------------------------------------------------------------------

## Additional Definitions for Exporting Data 

When you are exporting data from ***Priority***forms to a file, you can
use the *Outgoing Interface Definitions* form (a sub-level of *Position
of Form Columns in File*) to define the following:

-   *Align* -- determines how to align the columns in the file (left or
    right); useful for number columns.
-   *Date Format* -- determines how date values will be displayed.
    Again, you can use any of the available SQL date formats, such as
    MMDDYY or MM/DD/YY.
-   *Padding w/Zeroes* -- useful for number columns.

## More on Form Loads 

-   [Loading from/to a Load
    Table](Loading-from/to-a-Load-Table )
-   [Executing the Form Load](Executing-the-Form-Load )
-   [Deleting Records from a
    Form](Deleting-Records-from-a-Form )
-   [Form Loads](Form-Loads )
