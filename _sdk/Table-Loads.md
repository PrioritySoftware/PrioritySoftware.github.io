---
title: Table Loads
layout: sdk_nav
---

## Introduction

You can import data from text files into an interim table in
***Priority*** from tab-delimited text files (Excel files can be
converted into tab-delimited files using [a utility
program](Table-Loads#Converting-an-Excel-File-to-a-Tab-delimited-Text-File-for-DBLOAD )).
During the execution of this table load, you can perform additional
processing defined in a set of SQL statements (a load query). Results of
the load can be viewed - and revised - in a form based on the
interim table. Finally, a procedure can be used to transfer the final
data to a regular***Priority*** form (e.g., **ORDERS**), using the
form load defined above.

In general, a table load interface is characterized by:

-   a unique load file name
-   a specified table or a load query which defines how the load is
    performed
-   input fields defined as variables, which can be included in the load
    query
-   parameters affecting the load.

These definitions are recorded in the *Characteristics for Download*
form and its sub-levels (*System Management → Database Interface → Table
Load (Interfaces)*).

## Defining the Load File 

Any load files, which must use ASCII or Unicode encoding, should be
stored in the system\\load directory or one of its sub-directories
(specifically, the sub-directory for a particular ***Priority***
company). Its file name must match the name of the load file defined in
the *Characteristics for Download* form.

**Note:** ***Priority***\'s interface tools can import data from either
ASCII or Unicode (UTF-16) files, and will automatically recognize the
format used. Data exported from***Priority*** for use in outgoing
interfaces will be saved in ASCII format, unless otherwise specified.

This name is subject to the following restrictions:

-   It may consist of up to 20 characters
-   Only alphanumeric values (uppercase and lowercase letters and
    digits) and the underline sign may be used (no spaces).
-   The name must begin with a letter.
-   You may not use a reserved word.
-   The name assigned to any newly created form load should include a
    common four-letter prefix (the same one you use for all entities
    that you add to ***Priority*** for the customer in question;
    e.g., **XXXX_LOADFNC2**).

If the file in question is stored in a company sub-directory, also flag
the *Sub-directory* column (and make sure you run the load from the
correct company). If data is separated by tabs, flag the *Tab Separator*
column. You may also specify a brief description of the load file in the
*Description of Data* column.

## Defining the Load 

You have two options in defining the load:

-   You can designate the load table and have ***Priority*** create an
    automatic query, or
-   You can record the load query manually.

In both cases you must also define the input file. This consists of all
table columns (in the case of an automatic query), or the variables that
are input in each field (in the case of a manual query).

The automatic query inserts all data in the input file into the columns
of the specified table. Of course, the input file must contain all
unique key columns in the target table (with identical names) in order
for the load to succeed. It need not contain the autounique key; if
there is no value for this key, it will be assigned automatically during
the insert.

A manual query should be constructed if you want to add processing
during the table load. This is a set of SQL statements which determine
how the load is to be executed. The statements that make up the load
query are executed upon each line of the input file, one at a time.

### Automatic Load Query 

To make use of the automatic load query, designate the name of the table
in the *Table for Auto Load* column of the *Characteristics of Download*
form. Then define the input file in the sub-level form, *Input Record
Fields*. In the *Variable* column, record the name of each table column
into which data should be inserted. Indicate its type and position
(first and last character). You can also add a description in the
*Title* column.

**Note:** In a file with tab separators, column width is meaningless.

### Manual Load Query 

If you want to record a query manually, first define the input file in
the *Input Record Fields* sub-level form. On each line, record a
variable that is input into a field, to be used in the load query. For
each variable, designate its type and define its position within the
file. You can also add a description (in the *Title* column).


**Note:** In a file with tab separators, variable width is meaningless.


Next, record the SQL statements making up the query in the *Load Query*
sub-level form. You can include ERRMSG and WRNMSG commands. An error
message (ERRMSG) will cause the load of a given input line to fail. The
error message is then written in the **ERRMSGS** table. The failure to
load one input line has no effect on the loading of another. A warning
message is also written to the **ERRMSGS** table, but does not cause the
input line to fail. Like in forms and procedures, you can use message
parameters :PAR1, :PAR2 and :PAR3. The messages themselves should be
recorded in the *Error & Warning Messages* form. SQL statements are
stored in the **LOADTEXT** table; messages are stored in the **LOADMSG**
table.

**Tips:**

-   To check the SQL statements in your load query for syntax errors,
    prior to activation of the load, run the *Check Syntax* program by
    Direct Activation from within the *Characteristics for Download*
    form.
-   You can track changes to load queries once they have been included
    in prepared version revisions. See [Tracking Changes to
    Queries](Installing-Your-Customizations#Tracking-Changes-to-Queries ).

## Loading the File 

There are several ways to execute a table load:

-   Run the *Download a File* program from the *Table Load (Interfaces)*
    menu.
-   Activate the load from an SQLI step of a procedure, using the
    following syntax (parameters are explained in the next section):

```sql
EXECUTE DBLOAD ‘-L’, ‘loadname’, ['-I', 'input_file'], ['-I'], ['-T', 'table', 'linkfile'], 
['-g', 'debug_file'], ['-ns'], ['-N'], ['-E', 'unloaded_file'], ['-M'], ['-C'], ['-B'], 
['-U'], ['-u'], ['-v'], ['msgfile'];
```

-   Include the table load as a load step (type L) in a procedure,
    indicating the file name as the first parameter. You can use the
    same parameters as in the previous option, except that they are
    listed in the *Procedure Parameters* form (sub-level form of
    *Procedure Steps*).


**Note:** The last two methods offer more options than the first.


### Table Load Parameters 

-   *\'loadname\'* --- The *File Name* used to identify the table load
    in the *Characteristics for Download* form (also the name of the
    load file).
-   '-I' (uppercase \"i\") --- Use this option when you want the
    **DBLOAD** program to input data from the *file.in* file (stored in
    the *system\\load* directory). Alternatively, use the \[\'-i\',
    \'input_file\'\] option to specify a different input file.
-   '-T', *table,* *linkfile* --- Use this option when you want the
    **DBLOAD** program to load data to a linked copy of the designated
    table.
-   \'-g\', *\'debug_file\'* --- This option creates a file that
    displays each query and its execution. This is similar to other
    ***Priority*** debugging tools that offer the --g option (see [Debug
    Tools](Debug-Tools )).
-   '-ns' --- By default, the **INTERFACE** program displays a progress
    bar as the load is executed. Use this option to disable this
    utility.
-   \'-N\' --- Use this option if you do not want the **INTERFACE**
    program to clear the **ERRMSGS** table when executing a load.
    Instead, the program will append the contents of the newest unloaded
    file and message file to the **ERRMSGS** table (see below).
-   \'-E\', *\'unloaded_file\'* --- Use these parameters to create a
    file of all lines from the input file that failed to be loaded. This
    file will be stored in the *system\\load* directory, unless another
    path is specified. It can then serve as an input file in its own
    right, once the problem that caused the load to fail has been
    solved.
-   '-M' --- Use this option to have the **INTERFACE** program rename
    the input file to *file.bak* .
-   '-C' --- If the load table contains numeric values formatted as
    strings, use this option to have the **INTERFACE** program remove
    commas from any numbers that appear in strings.
-   '-B' --- Use this option to have the **INTERFACE** program remove
    any text enclosed in square brackets.
-   '-U' --- If the load table contains a **USERS** column, use this
    option to have the **INTERFACE** program ignore data in this column
    (data are inserted with **USER** = *0*).
-   '-u' --- Use this option if you want the **INTERFACE** program to
    specify the current user when messages are inserted into the
    **ERRMSGS** table. Otherwise, messages are inserted with **USER** =
    *0*.
-   \'-v\' -- Use this option if you want the **DBLOAD** program to
    check the structure of the input file. If the type of a value (e.g.,
    **INT**, **REAL**, **DATE**) is incompatible with the expected type
    for that position, an error is generated and the file will not be
    loaded.
-   *\'msgfile\'* --- The name of the file in which to hold messages.
    This file will be stored in the directory from which the **DBLOAD**
    was activated (*system\\load* or *system\\load*\\company), unless
    another path is specified. It contains the following:
    -   A message indicating how many lines of the input file have been
        successfully loaded.
    -   In the case of a fatal error (the structure of the input file
        was not defined, there was no load query or there was a syntax
        error in one of the SQL statements), a message explaining why
        the load failed altogether.

### Viewing Load Messages 

Any messages (error/warning) generated by the **DBLOAD** program will
appear in the *Download Messages* report (**DBLOADERRS**). These
messages are stored in the **ERRMSGS** table with the value *L* in the
**TYPE** column, and **USER** = *0* (or **USER** = SQL.USER if you use
the '-u' option. In every execution of a load, the messages from the
previous execution are deleted (unless you use the -N option).

### Converting an Excel File to a Tab-delimited Text File for DBLOAD 

Use the EXL2TXT command (from a trigger or Step Query of an SQLI step)
to convert an .xlsx file to the tab-delimited text file required for
table loads.

> **Example:** 
> ```sql
> EXECUTE WINAPP 'p:\bin.95', '-w', 'EXL2TXT.exe', :F, :T; /* where p:
> represents the full path to bin.95) */
> ```


The file is created with UTF-16 encoding.

## Further Reading 

-   [Form Loads](Form-Loads )
-   [Combining Table Loads with Form
    Loads](Combining-Table-Loads-with-Form-Loads )
-   [Tips for Finding Existing
    Interfaces](Tips-for-Finding-Existing-Interfaces )
-   [Interfaces](Interfaces )
