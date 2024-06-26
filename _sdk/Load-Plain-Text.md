---
title: Import/Export Data with Plain Text Files
group: Interfaces
tags: 'Priority_SDK'
---

## Fixed Position and TSV Files

When importing or exporting form data using a plain-text file, you'll need detailed information regarding the structure and order of the fields in the file. For fixed-width, you'll need exact width and positioning information for each field. For tab-separated files, positioning information is sufficient.

**Tips:**

- You can use a [filter](Filters) to convert files that use a different separator into tabs for use in imports. For example, if you have a comma-separated values file (CSV), you could convert the commas to tabs and treat the file as a TSV. However, this method would not work if the file contained regular tabs as part of its contents.
- If you want to create a new form load based on an existing one,
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
    You can use any of the available SQL date formats, such as
    MMDDYY or MM/DD/YY.
-   *Padding w/Zeroes* -- useful for number columns.


{% if site.output == "web" %}

-   [File Import/Export](Loading-from-File)
-   [Loading/Exporting XML/JSON](Load-XML-JSON)

## More on Form Loads 

-   [Loading from/to a Load Table](Loading-from-Load-Table)
-   [Executing the Form Load](Execute-FormLoads)
-   [Deleting Records from a Form](Interfaces-Deleting-Records)
-   [Form Loads](Form-Loads)
{% endif %}