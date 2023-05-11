---
title: Executing the Form Load
group: Interfaces
tags: 'Priority_SDK'
---

## Introduction

There are a number of alternate ways to execute a [form interface](Form-Loads).

-   Run the *Load Data* program from the *Form Load (EDI)* menu.
    Indicate whether to import data (Load), load it a second time
    (Reload), or export data (Upload).
-   Activate the load from an SQLI step in a procedure or from a form
    trigger. To execute the load in this way, use the following syntax
    (parameters are explained in the next section):

    ```sql
    EXECUTE INTERFACE 'interface_name', 'msgfile', ['-L', 'link_file'], ['-stackerr', 'stackerr_file'],
    ['-w'], ['-ns'], ['-nl'], ['-nv'], ['-noskip'], ['-enforcebpm'], ['-t'], ['-W'], ['-m'],
    ['-o' | '-ou' [, '-f', 'output_file']], ['-debug', 'debug_file'], ['-repeat'],
    ['-l', 'table_name1', 'link_file1'], '-v';
    ```

-   Include the form load as an interface step (type *I*) in a
    [procedure](Procedure-Steps). You can use the same
    parameters as in the previous option, except that they are listed in
    the *Procedure Parameters* form (sub-level form of *Procedure
    Steps*).
-   Include the **INTERFACE** program as a step in a procedure. The
    first parameter must be the name of the form load. Thereafter, you
    can use the same parameters as specified above.

**Note:** The last three methods offer more options than the first.

-   **Windows only:** In addition, users can export data to an [XML file](Loading-from-File#xmljson-files)
    from within a form, by using the *XML File* command in the *Mail*
    menu.

## Form Load Parameters 

-   *'interface_name'* - The *Load Name* used to identify the form
    load in the *Form Load Designer*.
-   *'msgfile'* - The file in which error messages will be recorded.
    This can later be used to display the resulting message to the user
    (e.g., \"5 out of 6 records were loaded.\").
-   '-L', *'link_file'* - Use this option when you want the
    **INTERFACE** program to refer to a linked file of the load table.
    '-L' tells the load program to use a linked file, and
    *link_filename* is the file that will be used to link the load
    table.
-   '-stackerr', *'stackerr_file'* -- Use this option if you want to
    have **INTERFACE** program error messages sent to a linked file of
    the **STACK_ERR** table. '-stackerr' tells the program to use a
    linked file of the **STACK_ERR** table, rather than the **ERRMSGS**
    table, and *stackerr_file* is the name of this linked file.\
    **Note:** When using this option, error messages will not be sent to
    the **ERRMSGS** table; thus, the **INTERFACEERR** report will not
    retrieve any values.
-   *'-w'* - Use this option to have the **INTERFACE** program ignore
    warning messages (equivalent to the functionality of the [*Ignore Warnings* column](Form-Loads#load-parameters-load_parameters) in the *Form Load Designer*).
-   *'-ns'* - By default, the **INTERFACE** program displays a
    progress bar as the load is executed. Use this option to disable
    this utility.
-   *'-nl'* - If the load program encounters errors, it generates an
    errors report. By default, each line in that report indicates the
    line in the load table that generated the error. Use this option if
    you don't want to display the line number in the message.
-   *'-nv'* - When a value generates an error from a CHECK-FIELD
    trigger, the errors report, by default, displays the name of the
    column and value that generated the error. Use this option to hide
    this information.

    **Example:** If you try to open a sales order for customer C000981
    and that customer does not exist in the database, the error message
    in the report would be: \"Line X - Customer Number C000981:
    Specified item not in database.\" If you use the '-nv' option, the
    message will display: \"Line X - Specified item not in database.\"
-   *'-noskip'* - Equivalent to the functionality of the [*Do Not Skip  Lines* column](Form-Loads#load-parameters-load_parameters ) in the *Form
    Load Designer*.
-   *'-enforcebpm'* - Many forms use business rules (defined in the
    Business Rules Generator or the Data Generator), BPM rules and
    definitions of paths between statuses to manage business processes.
    As part of this process, the Business Rules Generator/BPM utility
    sends mail to designated users and/or external addresses. You should
    include this parameter when you want the **INTERFACE** program to
    apply any rules created in the Business Rules Generator and to run
    the BPM mechanism while loading the form data. If you do not include
    it, mail will be sent, but all business rules and BPM rules will be
    bypassed and defined paths will be ignored. This means, for example,
    that custom error/warning messages defined in the Business Rules
    Generator will be ignored, and that any status can be changed to any
    status (e.g., a customer shipment recorded against an order will
    change that order's status to **Closed**, even though this status
    change is prevented by BPM rules).

    **Note:** Data Generator rules are not affected by this parameter as
    they are activated elsewhere in the code (after POST-FIELD). For
    details on the Business Rules Generator, the Data Generator and BPM,
    see the *User Interface Guide*.

-   *'-t'* - When no file type is defined in the *Form Load Designer*,
    use this parameter to indicate that the file being loaded has tab
    separators. This option is useful when you do not know the file type
    in advance. In such a case, you must define form column positions in
    both ways (for both fixed-width and tab-separated files) and then
    include this parameter when the load is of a file with tab
    separators.
-   *'-W'* - Use this option to display warning messages in the *Load
    Errors* report even if you defined the form load to ignore such
    messages.
-   '-m' - Use this option to break up error messages into several
    lines. 
-   '-debug', 'debug_file' - Parameters used in debug mode;
    the **INTERFACE** program will write all operations executed by the
    form load into the specified debug file. This is similar to the
     other ***Priority*** debug tools (see [Debug
    Tools](Debug-Tools )).
-   '-repeat' - Equivalent to the *Reload* option (when the program
    is run from the menu). Use this option to reload lines that were not
    successfully loaded in a previous run (see more below).
-   '-v' - Use this option if you want the **INTERFACE** program to
    check the structure of the input file. If the type of a value (e.g.,
    **INT, REAL, DATE**) is incompatible with the expected type for that
    position, an error is generated and the file will not be loaded.

### Export-only Parameters

The following parameters are only relevant when exporting data.

-   '-o' -  When exporting to a file, the data will be written to the file recorded in the *Form
    Load Designer* using ASCII character encoding. When loading to a table, the program will insert records in the defined load table.\
    **Note:** This option is often used together with '-f'.
-   '-ou' - This is similar to the '-o' option, except that data will be written to the file using Unicode (UTF-16) character encoding.\
    **Note:** This option is often used together with '-f'.
-   '-f', *'output_file'* - When exporting data to a file (using
    the '-o' or '-ou' option), include this parameter to write the
    output to a different file than the one recorded in the *Form Load
    Designer*.\
    **Note:** This is necessary when you have recorded a sample file
    (used to define XML tags) in the *Form Load Designer*.
-   '-l' (lowercase \"L\"), *'table_name'*, *'link_file'* - Use this option when you want the **INTERFACE** program to export data to a linked copy of the load table. You can then use the data in the linked copy of the table and manipulate it. When using this option, **'-L'** needs to be provided with a linked table with a list of records from the base table of the first form in the load.

## Dealing With Errors and Reloading 

If errors were encountered by the **INTERFACE** program, they can be
found in the *Load Errors* report (**INTERFACEERR**). These errors are
saved in the **ERRMSGS** table, which consists of the columns: **LINE,
TYPE, MESSAGE** and **USER**. The unique key of this table is
**USER,TYPE,LINE**. That is because this table stores messages from many
types of system programs, and the messages are unique to each user. That
is, two different users can run the **INTERFACE** program, and each will
see only messages from his/her own load. The type for errors generated
by the **INTERFACE** program is i.

There are various methods of displaying error messages to your own
customers. Here are a number of suggestions:

-   In the error message you create, refer explicitly to the errors
    report, using its entity name {INTERFACEERR.R}. The entity title
    will then appear to the user with a link to the report. All the user
    needs to do is click on the link.
-   Include the **INTERFACERR** report as a procedure step, using GOTO
    to skip this step if there are no errors.
-   Link the errors report to the same menu as the procedure that runs
    the load.
-   In a procedure query, define a MSG parameter of **ASCII** type. Then
    use SELECT MESSAGE FROM ERRMSGS WHERE TYPE = 'i' AND USER =
    SQL.USER ASCII :$.MSG; and pass the MSG parameter to a PRINT
    procedure step.
-   If you know there will be no more than one error message, you can
    use SELECT MESSAGE INTO :PAR1 FROM ERRMSGS WHERE TYPE = 'i' AND
    USER = SQL.USER AND LINE = 1; and then use ERRMSG to display the
    message.

If some of the records were not successfully loaded, you may execute the
same load again, with the same data, using the Reload or '--repeat'
option. The **INTERFACE** program will then run only on those records
for which the **LOADED** column is not assigned the value *Y*.

**Example:** The load should open orders and insert items into the
order line. If one item failed to be loaded (e.g., the *Part Number*
was not found in the *Part Catalogue*), you can repair the load table
(define the part or fix the number) and re-execute the load, and the
item will be inserted into the order that was already opened.

**Note:** Once the form load is successful, you may wish to export it
for installation on a different server (e.g., if you are running the
**INTERFACE** program on a test installation and you wish to copy it to
the production server). To do so, return to the *Forms to be Loaded*
form and run the *Upload Interface* program from the list of Actions .

## Executing a Form Load from a Form Trigger or Step Query 

Programs that prepare privileges for procedures and forms also check the
SQL statements in all form triggers and procedure steps. If any
interface is executed from a [form
trigger](Creating-your-Triggers ) or [procedure
step](Procedure-Steps ), the required privileges are prepared
whenever the trigger or procedure in question is activated. For example,
when using the syntax EXECUTE INTERFACE *'interface_name',*\... the
program prepares privileges for the *'interface_name'* interface for
the user in question.

Sometimes, however, you may wish to define an SQL variable that refers
to the interface to be executed (e.g., :MYINTERFACE =
'SOMEINTERFACE';), rather than specifying the desired interface
directly. In such a case, the privileges program will not be able to
identify the interface being executed. If the user has privileges for
the form or procedure itself, but not for the interface
('SOMEINTERFACE'), they will not receive any errors, but the form or
procedure may not function correctly.

It is therefore recommended that you refer to any relevant interfaces
from within the form/procedure in such a way that they are identifiable
by the privileges program, while ensuring that they're not actually
executed at that point. For example, include each interface in a
separate EXECUTE command, but run it from within a GOTO command that
jumps to step 999, or add the interfaces as additional procedure steps,
but place them after an END command. If the variable can refer to more
than one interface, make sure to include a reference to each possible
interface using one of these methods. In this way, the privileges
program will be able to identify any interface that may be executed from
the form or procedure and will prepare all required privileges.

**Example:** See the BUF7 trigger in the **DOCPACK** form.

## Code Examples

-   Execute interface from file specificed in **Form Load Designer**

```sql
EXECUTE INTERFACE 'interface', SQL.TMPFILE;
```

- Run interface based on load table

```sql
SELECT SQL.TMPFILE INTO :G1 FROM DUMMY;

LINK GENERALLOAD ORD TO :G1;
GOTO 99 WHERE :RETVAL <= 0;

INSERT INTO GENERALLOAD ORD(LINE,RECORDTYPE,TEXT2)
SELECT SQL.LINE, '1', CPROFNUM 
FROM CPROF 
WHERE PDATE = SQL.DATE8;

EXECUTE INTERFACE 'OPENORDBYCPROF', SQL.TMPFILE, '-L', :G1;

LABEL 99;
UNLINK GENERALLOAD ORD;
```

- Use interface to export data to a load table

```sql
SELECT SQL.TMPFILE INTO :G1 FROM DUMMY;
SELECT SQL.TMPFILE INTO :O1 FROM DUMMY;

LINK ORDERS TO :O1;
GOTO 99 WHERE :RETVAL <= 0;

INSERT INTO ORDERS
SELECT * FROM ORDERS ORIG
WHERE CURDATE = '03/22/23';

EXECUTE INTERFACE 'DUMPORD', SQL.TMPFILE, '-L', :O1,
'-l', 'GENERALLOAD', :G1;

LINK GENERALLOAD TO :G1;
GOTO 99 WHERE :RETVAL <= 0;
LABEL 99;
UNLINK ORDERS;
UNLINK GNERALLOAD;
```

{% if site.output == "web" %}
## More on Form Loads 

-   [Loading from/to a Load Table](Loading-from-Load-Table )
-   [Loading from/to a File](Loading-from-File )
-   [Deleting Records from a Form](Interfaces-Deleting-Records )
-   [Form Loads](Form-Loads )
{% endif %}
