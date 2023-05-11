---
title: Load Data from a File or Export Data to a File
group: Interfaces
tags: 'Priority_SDK'
---

## Introduction

Form interfaces can be mapped to match 4 different types of files:

- Fixed-width files
- Tab separated values (TSV)
- XML files
- JSON files

Fixed and TSV files can be grouped together, as mapping is based on position in the file. For XML and JSON files, in contrast, mapping is based on tags or fields, respectively. 

For fixed-width and TSV files, you'll need detailed information regarding the structure and order of the fields. For JSON and XML, you'll need a sample file with the necessary tags or fields.

***Priority***\'s interface tools can import data from either ASCII or Unicode (UTF-16) files, and will automatically recognize the format used.

Data exported from ***Priority*** for use in outgoing interfaces will be saved in Unicode (UTF16) format, unless otherwise specified.

## Fixed Position and TSV Files

**Tip:** If you want to create a new form load based on an existing one,
retrieve the desired form load and run the *File Definitions for Form
Load* report by Action from the *Form Load Designer* form.

### Defining the File 

Designate the name of the file, its record size and its file type in the
appropriate columns of the *Form Load Designer* form.

If the file is stored in the *system\\load* directory, you can specify
just the filename. Otherwise, provide a path to the file, which can be relative (such as **../../tmp/filename.txt**) or a full path.

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

### Forms in the Load 

Use the *Forms to be Loaded* sub-level form to specify which forms
participate in the load. These usually consist of a root form (e.g.,
**ORDERS**) and one or more sub-levels (e.g., **ORDERITEMS**).

Indicate the name of each form, as well as the code representing its
record type. Each level in the form tree must be assigned its own unique
record type (e.g., **ORDERS** = 1; **ORDERITEMS** = 2). This must match
the record type in the file itself.

**Note:**  After recording a form, run the *List of Sub-level Forms* report by Action to view all its sub-levels (one level down only).

For each form, if you want the interface to overwrite existing records in the
sub-levels, flag the *Replace Form Data* column. Leave this column blank
to add the new records to existing ones. This is only relevant, of
course, when the root record (e.g., an order) already exists. If the
interface is used only for inserting new root records, leave the column blank to make the interface faster.

### Link Form Columns to Fields in File 

Use the next sub-level, *Position of Form Columns in File*, to match the
data in the file to specific form columns. For text files, also indicate
the order of insertion. In a TSV file separators, identify the file
data by its column number. In fixed-width files, indicate the number of the first and last characters that contain the field. 

If you want the **INTERFACE** program to treat empty strings and zero
values as a true value, flag the *Insert Null Values* column. If the file contains **REAL** values (or shifted integers) without a decimal point, indicate the number of *Digits After Decimal*.

Use the *Position of Record Type in File* form (a sub-level of
the *Form Load Designer*) to indicate where the record type is located in the file. Specify the column number (in a tab-separated
file) or the position of the first and last character that defines this
field (in a fixed-width file).

### Default Values 

Use the *Default Value for Column* sub-level to assign a default
value to be loaded into the form column. If the specified position in
the file is empty, the value specified in this sub-level form will be
loaded into the form table. When the form interface is used to
export data, if the form column is empty, the default value will be
exported.

### Additional Definitions for Exporting Data 

When you are exporting data from ***Priority*** forms to a file, you can
use the *Outgoing Interface Definitions* form (a sub-level of *Position
of Form Columns in File*) to define the following:

-   *Align* -- determines how to align the columns in the file (left or
    right); useful for number columns.
-   *Date Format* -- determines how date values will be displayed.
    Again, you can use any of the available SQL date formats, such as
    MMDDYY or MM/DD/YY.
-   *Padding w/Zeroes* -- useful for number columns.

## XML/JSON Files 

### Parsing File Tags/Fields
If you are loading to or from an XML/JSON file, you must define the tags/properties in the system. To do so, you must import a file with the tags/properties and let the system parse it:

**In the Web Interface**

1. In the *Form Load Designer* form, record a default **File Name** (e.g. *example.xml* or *demo.json*). This filename will be used when exporting the interface.
2. Run the **Import XML/JSON Interfc Template** Action and upload the template file.
3. Run the **Prepare Tags by File Defs**  Action. The structure of the file
is analyzed and transferred to the *Tags for Interface* sub-level form.

**In the Windows Interface**

1. Save the file in the *system\\load\\company* directory, where *company* is the name of the current company (SQL.ENV).
1. In the *Form Load Designer* form, record in **File Name** the location of the file (e.g. *example.xml* or *demo.json*). This filename will also be used when exporting the interface.
3. Run the **Prepare Tags by File Defs** Action. The structure of the file
is analyzed and transferred to the *Tags for Interface* sub-level form.

### Working with the Parsed XML File

{% include info.html content="<p><b>Additions in Version 23.0</b></p>" %}

1. Enter the *Tags for Interface* form and check the results. The form should show all tags that are present in the XML file. You can delete tags that are not necessary. You can also add/revise tag names.

2. For parsed tags, the data in the first record appears in the *Value* column. If you want this (or any other value) to be used in all records, regardless of definitions in the file, specify *C* in the *Type of Value* column. Revise the values as necessary.

3. To mark a tag as a structural tag, i.e., a tag in the XML that is empty of data or attributes, and serves an organizational purpose in the file, specify *E* in the **Type of Value** column. Parsed tags may receive this value automatically based on analysis of the file.

    Some XML document schemas call for parent tags to repeat for each child data item, as depicted in the following example:

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

    For tags that need to be repeated, specify *R* in the **Type of Value** column.

    **Note:** In previous versions, this was accomplished by adding **+** to the tag name. This previous option is now in **deprecated** status.

4. If you are exporting data to an XML file and there are attributes for any tags, record them in the XML Attributes column.

    **Example:** For an XML tag defined as \<custname type=\'string\'\>1001\</custname> you would record \"type =\'string\' \" in this column.
    In other files, this tag needs to appear only once. Record *R* in **Type of Value** for a repeating parent. or a **-** for a parent that should appear only once, in the *XML Tags for Interface* sub-level form.

5.  Return to the *Forms to be Loaded* form and its sub-level *Position of Column in File*. Use the next sub-level, *Tag Definitions*, to link each form column to the appropriate tag/field. If the tag is a date, you can also define the *Date Format*, indicating how the date value will be displayed. You can use any of the available [SQL date formats](ATOD-and-DTOA), such as MMDDYY or MM/DD/YY.
6.  If a tag/field should be omitted entirely from the XML/JSON when empty, use the **Without Empty Tags** checkbox.

**Note:**  Windows only: Once you have created a form load design that uses an XML file, ***Priority*** automatically enables users to export data from the main form of this load design to an XML file. In this case the *XML File* option in the *Mail* top menu of the relevant form will be enabled. When it is selected, the user gets a choice of interfaces to run. The system indicates where the output file has been saved.


### Working with the Parsed JSON File

1. Enter the *Tags for Interface* form and check the results. The form should show all properties that are present in the JSON file. You can delete properties that are not necessary. You can also add/revise property names.

2. For parsed properties, the data in the first record appears in the *Value* column. If you want this (or any other value) to be used in all records, regardless of definitions in the file, specify *C* in the *Type of Value* column. Revise the values as necessary.

5.  Return to the *Forms to be Loaded* form and its sub-level *Position of Column in File*. Use the next sub-level, *Tag Definitions*, to link each form column to the appropriate property. If the property is a date, you can also define the *Date Format*, indicating how the date value will be displayed. You can use any of the available [SQL date formats](ATOD-and-DTOA), such as MMDDYY or MM/DD/YY.

**Note:** Decimal data in JSON files loaded into the system must always use a decimal point as the decimal separator, even if the decimal separator configured for the ***Priority*** system locale is a different symbol.

{% if site.output == "web" %}
## More on Form Loads 

-   [Loading from/to a Load Table](Loading-from-Load-Table)
-   [Executing the Form Load](Execute-FormLoads)
-   [Deleting Records from a Form](Interfaces-Deleting-Records)
-   [Form Loads](Form-Loads)
{% endif %}