---
title: SQL Functions and Variables
layout: sdk_nav
group: SQL Syntax
---

## Introduction

***Priority***offers a set of system functions that can be used to
retrieve set results (e.g., the current date and time). Furthermore, it
recognizes a number of kinds of variables. These functions and variables
are used in SQL statements.

Functions are identified within the SQL statement by the prefix "SQL."
Variables are identified by the prefix ":" (colon).

Each function and variable must belong to one of the following types:
**CHAR, INT, REAL, DATE, TIME** or **DAY**. These are all valid column
types (for an explanation of each, see [Table
Columns](Table-Columns )).

## System Functions 

Here is a partial list of SQL functions recognized by ***Priority***.

-   SQL.ENV: the current ****Priority**** company (**CHAR** type)
-   SQL.USER: the internal number of the current user (**INT** type)
-   SQL.GROUP: the internal user number of the group representative from
    whom the current user inherits privileges (**INT** type)
-   SQL.DATE: the current date and time (**DATE** type)
-   SQL.DATEUTC: the current date and time in UTC (**DATE** type)
-   SQL.DATE8: the current date without time (**DATE** type)
-   SQL.TIME: the current time (**TIME** type)
-   SQL.DAY: the current weekday (**DAY** type)
-   SQL.LINE: the line number during retrieval from the database;
    retrieved records are numbered consecutively (**INT** type)
-   SQL.TMPFILE: a full path to a temporary file name; you can use this
    path to link tables to the file
-   SQL.ENVLANG: the language defined for the current ***Priority***
    company (in the *Companies* form)
-   SQL.WEBID, SQL.CLIENTID: identification variables (**INT** type and
    **CHAR** type, respectively) used for ***Priority Lite*** only (see
    [User Identification for Priority
    Lite/Dashboards](User-Identification-for-Priority-Lite/Dashboards )).
-   SQL.GUID: returns a random 32-character string, using the operating
    system*s UUID function.

> **Examples:**
>
> 1.  You can use SQL.USER and SQL.DATE for an electronic signature.
>
> 1.  To return a numbered list of parts, use:
> ```sql 
> SELECT SQL.LINE, PARTNAME FROM PART FORMAT;
> ```


## Variables

There are several types of SQL variables:

-   form column variables, determined by the content of a given column
    in a given form
-   parameter variables, determined by the content of a given parameter
    in a given procedure step
-   user-defined variables
-   system variables

## System Variables 

:RETVAL --- the return value of the previous query (**INT** type).

:SCRLINE --- the current form line, in triggers only (**INT** type).

:PAR1, :PAR2 and :PAR3 --- parameters for error and warning message
    commands (**CHAR** type); used in form triggers, step queries (in
    procedures) and load queries; maximum number of characters for each
    parameter is 64.

:PAR4 --- stores the value of the first argument in CHOOSE- triggers
    (**CHAR** type). :PAR4 is not supported in the Priority Web
    Interface.

:FORM_INTERFACE (**INT** type) --- when assigned a value of 1,
    indicates that form records are filled by a form load interface
    rather than the user.



:FORM_INTERFACE_NAME (**CHAR** type) --- when the :FORM_INTERFACE
    variable has a value of 1, the current variable is assigned the name
    of the form interface in question (e.g., see BUF16 in the
    **LOGPART** form; on buffers, see [Using
    Buffers](Including-One-Trigger-in-Another#Using-Buffers )).
    If empty, but :FORM_INTERFACE is 1, the records are filled in using
    the REST API.

:PREFORMQUERY (**INT** type) --- assign it a value of 1 in a
    PRE-FORM trigger to run the trigger after each query.

:ACTIVATEREFRESH (**INT** type) --- assign it a value of 1 in a
    PRE-FORM trigger to refresh all retrieved records after a Direct
    Activation.

:ACTIVATE_POST_FORM (**CHAR** type, width 1) --- assign it a value
    of *Y* in a PRE-FORM trigger to activate the form*s POST-FORM
    trigger upon exiting the form, even if no changes have been made
    (e.g., see PRE-FORM trigger in the **TRANSORDER_H** form).

:KEYSTROKES --- use in a PRE-FORM trigger to store a string
    containing reserved words which imitate keyboard actions.

:HEBREWFILTER (**INT** type) --- for users of ***Priority*** in
    Hebrew. This variable is used to ensure that Hebrew text is
    displayed correctly when exporting data from ***Priority*** using
    an SQL query. When this variable receives a value of 0, the
    characters in exported Hebrew text appear backwards (e.g., םילשורי
    טרוא ס\"יב); assign it a value of 1 to ensure that such characters
    appear in the correct order (e.g., בי\"ס אורט ירושלים).

:HTMLACTION, :HTMLVALUE and :HTMLFIELD --- used in ***Priority
    Lite*** procedures (see [Designing HTML Reports for Priority
    Lite/Dashboards](Designing-HTML-Reports-for-Priority-Lite/Dashboards )).

:\_IPHONE --- used in [***Priority Lite*** 
    procedures](Priority-Lite-and-Dashboards ). This variable
    receives a value of 1 when the procedure in question is run from a
    mobile device (e.g., an iPhone or Android device), and a value of 0
    when the procedure is run from a regular PC or iPad. By referring to
    this variable within the procedure itself (or one of its component
    reports), the procedure can be run differently depending on the type
    device from which it is accessed (e.g., see step 40 in the
    **WWWDB_PORDERS_A** procedure).

:NOHTMLDESIGN --- used in [processed
    reports](Processed-Reports ) and ***Priority Lite*** 
    procedures. When this variable receives a value of 1, reports will
    be produced in non-HTML format, even if HTML design options are
    defined for report columns. This variable is sometimes used in
    conjunction with the previous one (e.g., see step 40 in the
    **WWWDB_PORDERS_A** procedure).

:HTMLMAXROWS --- used in processed reports and ****Priority
    Lite*** procedures to limit the number of results that appear on the
    page. This is useful, for instance, if you want to run a report that
    displays the last 5 sales orders placed by the customer, or if you
    want to enable users to indicate how many results to display on a
    particular page of your ***Priority Lite**** website (e.g., see
    step 40 in the **WWWDB_ORDERS_A** procedure).

:\_CHANGECOUNT (**INT** type) --- stores the number of fields in the
    current form record that have been revised; useful in a PRE-UPDATE
    or POST-UPDATE trigger when you want to perform a check or other
    action only if a single field, or a specific set of fields, has been
    changed.

:PRINTFORMAT (**INT** type) -- stores the print format chosen by the
    user when a document is printed. Print formats are saved in the
    **EXTMSG** table.

:SENDOPTION (**CHAR** type) --- stores the user*s selection in the
    *Print/Send Options* dialogue box when a document is printed.

:ISSENDPDF (**INT** type) --- when a value of 1 is received, creates
    a PDF document rather than an HTML document (used with :SENDOPTION).

:WANTSEDOCUMENT (**INT** type) --- stores the user*s selection in
    the *Are sent e-mails digitally signed by Outlook* column of the
    *Mail Options* dialogue box.

:EDOCUMENT (**INT** type) --- used in e-documents (see [Creating
    E-Documents](Special-Document-Features#A-Special-SQLI-Step:_Creating-E-Documents )).
    When this variable receives a value of 1, sent e-documents will be
    synchronized with ***Priority*** and recorded as a customer task.

:GROUPPAGEBREAK (**INT** type) --- used in processed reports to add
    a page break for the first \"Group by\" set (see [Display of Grouped
    Records](Organizing-Report-Data#Display-of-Grouped-Records )).
    When this variable receives a value of 1, each group of records in
    the report will appear on a new page.

:FIRSTLINESFILL (**INT** type) --- used in forms. When the sub-level
    form is entered, the variable automatically receives a value of 1;
    once the user runs a query in the form, the variable receives a
    value of 0. Useful when you want to run an automated query upon
    entrance into the sub-level form without restricting which records
    can be retrieved by a user-defined query. For example, the condition
    defined for the **CURDATE** column of the **CUSTNOTES** form (in the
    *Form Column Extension* sub-level of the *Form Columns* form) is used
    to retrieve all recent tasks upon first entering the form. Once
    these tasks have been loaded, however, users can run a query to
    retrieve older tasks by pressing F11.


:SQL.NET (**INT** type) --- stores 0 when working in the Windows
    interface and 1 when working in the web interface.

:EXTERNAL.VARNAME -- used in procedures to refer to variables
    inputted as part of the WINRUN command (see [ Executing Priority
    Commands from an External Application
    (WINRUN)](Programs-Interfacing-Priority-with-External-Systems#Executing-Priority-Commands-from-an-External-Application-.28WINRUN.29 )).

:WEBSDK_APP_ID (**INT** type) --- when entities are accessed via
    Priority's Web SDK using a per-application license, this variable
    stores the application ID provided by Priority Software for that
    application. Use this variable to tailor behavior based on the
    specific application used to access the system.

:WEBSDK_APP_NAME (**CHAR** type) --- this variable is filled in when
    an *appname* is specified by the **login** function of the Web SDK.
    Use this variable to tailor behavior based on the specific
    application used to access the system.

:FROM_TTS (**INT** type) --- set to 1 when procedures or reports are
    run via the Tabula Task Scheduler, set to 0 otherwise. This variable
    is useful when you want to set behavior that is relevant only when
    running the program via the TTS (e.g., setting a default value in
    input that is usually provided by the user).

:NETDEFS_WCFURL (**CHAR** type) --- this variable can only be
    accessed from within procedures. It (and the rest of the NETDEFS
    variables) provide data from the settings of the application server
    configured for the system. This one contains the WCF URL of the
    application server.

:NETDEFS_SERVERURL (**CHAR** type) --- this variable can only be
    accessed from within procedures. It (and the rest of the NETDEFS
    variables) provide data from the settings of the application server
    configured for the system. This one contains the Server URL of the
    application server.

:NETDEFS_MARKETGATEURL (**CHAR** type) --- this variable can only be
    accessed from within procedures. It (and the rest of the NETDEFS
    variables) provide data from the settings of the application server
    configured for the system. This one contains the Marketgate URL of
    the application server.

:NETDEFS_SESSIONDIRECTORY (**CHAR** type) --- this variable can only
    be accessed from within procedures. It (and the rest of the NETDEFS
    variables) provide data from the settings of the application server
    configured for the system. This one contains the where session data
    is stored on the application server.

:NETDEFS_SYSTEMIMAGES (**CHAR** type) --- this variable can only be
    accessed from within procedures. It (and the rest of the NETDEFS
    variables) provide data from the settings of the application server
    configured for the system. This one contains where images are stored
    on the application server.

:NETDEFS_SYSTEMMAIL (**CHAR** type) --- this variable can only be
    accessed from within procedures. It (and the rest of the NETDEFS
    variables) provide data from the settings of the application server
    configured for the system. This one contains where mail files (such
    as attachments) are stored on the application server.

:NETDEFS_TMPDIRECTORY (**CHAR** type) --- this variable can only be
    accessed from within procedures. It (and the rest of the NETDEFS
    variables) provide data from the settings of the application server
    configured for the system. This one contains the where temporary
    files are stored by the application server.


:NETDEFS_TMPURL (**CHAR** type) --- this variable can only be
    accessed from within procedures. It (and the rest of the NETDEFS
    variables) provide data from the settings of the application server
    configured for the system. This one contains the TMPURL of the
    application server.


:NETDEFS_NETTABINI (**CHAR** type) --- this variable can only be
    accessed from within procedures. It contains the location of the
    tabula.ini file for the current environment.


## Reserved Words for :KEYSTROKES Variable

:KEYSTROKES should only be used in PRE-FORM triggers.

The following reserved words are useful with the :KEYSTROKES
variable:
- *{Activate}N* (runs the form*s Nth Direct Activation)
- {Exit} (executes the query)
-  {Key Right}, {Key Left}, {Key Up}, {Key Down}, {Page Up}, {Page Down} 
-  *{Sub-level}N* (opens the form*s Nth sub-level form),
-   {Table/Line View} (toggles between multi-record and full-record display).


> **Examples:**
>
> :   KEYSTROKES = *\*{Exit}*; (retrieves all form records)
> 
> :   KEYSTROKES = *{Key Right} 01/01/06 {Exit}* (moves one column to
>     the right and executes a query that retrieves any records with
>     Jan. 1, 2006, in the field).

## Variable Types

All form column variables and parameter variables take on their
respective column types. In all other cases, SQL defines variable type
according to the context. That is, such variables will inherit the type
of any other variable in the expression which is already defined in the
form. For instance, if the **QUANT** and **PRICE** columns in the
**ORDERITEMS** form are defined as **REAL**, then the :totprice variable
in the following expression is assumed to be a real number as well:

> `SELECT :ORDERITEMS.QUANT * :ORDERITEMS.PRICE INTO :totpriceFROM DUMMY;`

or

> `:totprice = :ORDERITEMS.QUANT * :ORDERITEMS.PRICE;`

Similarly, a variable will inherit the type of a constant value
appearing in the expression. For instance, in the expression :i + 5,
*i*is assumed to be an **INT** variable.

Given an expression without a type context, SQL assigns a default
variable type of **CHAR**. However, for a string with a width of 1
(single character), you must specify "*\\0* +" or use a declaration
for that single **CHAR** variable, for example: `:SINCHAR = '\0';.`

To obtain a variable of **REAL** type, create the proper type context by
adding the prefix "0.0 +" to the expression. To obtain a variable of
**INT, DATE, TIME** or **DAY** type, add the prefix "0 +".

For instance, assuming that the variable :j (which contains a real
number) has not yet been defined, you would use the following statement
to select its values:

> `SELECT 0.0 + :j FROM DUMMY FORMAT;`

or

> `:j = 0.0;`

If you need a variable of **REAL** type with more precision than two
decimal places, initialize it as follows:

> `:CONV = 0E-9;`

## Further Reading 

-   [Executing SQL Statements](Executing-SQL-Statements )
-   [Flow Control](Flow-Control )
-   [Additions and Revisions to Standard SQL
    Commands](Additions-and-Revisions-to-Standard-SQL-Commands )
-   [Execution Statements](Execution-Statements )
-   [LINK and UNLINK](LINK-and-UNLINK )
-   [Return Values and Statement
    Failure](Return-Values-and-Statement-Failure )
-   [Non-standard Scalar
    Expressions](Non-standard-Scalar-Expressions )
-   [Viewing Table Structure](Viewing-Table-Structure )
