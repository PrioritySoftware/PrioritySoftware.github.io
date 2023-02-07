---
title: Debug Tools
layout: sdk_nav
group: Debug
tags: 'Priority_SDK'
---

## Introduction

***Priority*** gives you the option of executing entities (forms, procedures and interfaces) using debug mode. When you execute the entity in debug mode, SQL queries, server responses, variables used and more are recorded in a file you specify. This is very useful for debugging
forms, procedures and interfaces.

You can also debug simple reports, i.e., reports run from the menu or by Action (as opposed to processed reports, which are executed by a procedure - in which case you debug the procedure). Finally, you need to optimize forms, reports and SQL queries.

[23.0]()

**Important!** Debug commands will not work when the DEBUGRESTRICTED system constant is set to 0.

## Debugging a Form, Procedure or Interface 

You can debug a form or procedure by running it via the *Run Entity* ***Priority***
tool. From the *Tools* top menu in the Windows interface or the *Run*
menu in the web interface, select *Run Entity (Advanced)*. In the command dialog that opens:

To run a form in debug mode in the web interface:\
*FORM_NAME* -trc *debug_file*

To run a form in debug mode in the Windows interface:\
WINFORM *FORM_NAME* -trc *debug_file*

> **Example:**
>
> ```sql
> WINFORM ORDERS -trc ..\..\orders.dbg /* in Windows */ 
> ORDERS -trc c:\tmp\orders.dbg /* in web interface */
> ```

**Note:** You can also use the older version of the debug tool by
specifying *-g* instead of *-trc*. Note however that *-g* provides less
information in the debug file than *-trc*, and is organized less
effectively for the process of debugging.

To run a procedure in debug mode in the Windows interface:\
*WINPROC -P* PROCNAME -trc *debug_file*

To run a procedure in debug mode in the web interface:\
*PROCNAME.P* -trc *debug_file*

> **Example:**
>
> ```sql
> WINPROC -P WWWSHOWORDER -trc ..\..\wwwshoword.dbg /* in Windows */ 
> WWWSHOWORDER.P -trc c:\tmp\wwwshoword.dbg /* in web interface */
> ```

**Note:** You can also run a procedure in debug mode from within the
*Procedure Generator* via an Action.

To run a ***Priority Lite*** procedure in debug mode (in the Windows interface only):
WINHTMLH *PROCNAME* -trc *debug_file*

> **Example:**
>
> ```sql
> WINHTMLH WWWORDERS -trc ..\..\wwworders.dbg
> ```

To execute a [form load](Form-Loads ) in debug mode, you need
to include two additional parameters when running the **INTERFACE**
program: the first must be \'-debug\' and the second must be the name of
the debug file. The program then records all queries that were executed
into the debug file.

> **Example:**
>
> ```sql
> EXECUTE INTERFACE LOADORDERS SQL.TMPFILE, '-debug', '..\..\tmp\dbg.txt'; 
> ```

To execute a [table load](Table-Loads ) in debug
mode, you need to include two additional parameters when running the
**DBLOAD** program: \'-g\', as well as the name of the debug file.
Again, the program records all executed queries into the designated
file.

## Debugging a Simple Report 

To debug a simple report (one ***not*** run from a procedure), dump the
report\'s query using the *SQL Development* (**WINDBI**) program (*System Management → Generators → Procedures*). From the **Dump** menu,
select **Report** and then record the internal name of the report in
question. Results, for example, look like this:

```sql
/*
*
* Report ORDBYPROJMANAGER : Orders per Project Manager
*
*/ 
/*  Orders per Project Manager  */
SELECT USERS.USERLOGIN AS 'Project Manager', CPROFTYPES.TYPECODE AS 'Type of Sale (Code)',
CPROFTYPES.TYPEDES AS 'Type of Sale-Descrip', ORDERS.CURDATE AS 'Order Date', 
ORDERS.ORDNAME AS 'Order', DOCPROJ.PROJDES AS 'Project', 
ORDSTATUS.ORDSTATUSDES AS 'Order Status', ORDERS.DETAILS AS 'Details', 
ORDERS.DISPRICE AS 'Total Price w/o Tax', CURRENCIES.CODE AS 'Curr'
FROM DOCUMENTS, CURRENCIES, ORDSTATUS, DOCPROJ, ORDERS, CPROFTYPES, USERS 
WHERE (ORDSTATUS.MANAGERREPOUT <> 'Y')
AND (ORDERS.ORDSTATUS = ORDSTATUS.ORDSTATUS)
AND (ORDERS.ORDTYPE = CPROFTYPES.CPROFTYPE)
AND (ORDERS.PROJ = DOCUMENTS.DOC)
AND (ORDERS.CURRENCY = CURRENCIES.CURRENCY)
AND (DOCPROJ.MUSER = USERS.USER)
AND (DOCUMENTS.DOC = DOCPROJ.DOC)
AND (1=1) 
ORDER BY1 ASC, 2 ASC, 4 ASC, 5 ASC;
```

**Note:** You can also run a report in debug mode from within the
*Report Generator* via an Action


## Optimization

Whenever you customize a ***Priority*** entity, it is important to
optimize that entity:

-   After adding columns to an existing form, you must check the
    optimization of the form.
-   After customizing a simple report or creating a new one, you should
    check the report.
-   When writing any SQL query (inside a form trigger, procedure step or
    load query), you should check optimization of the query you wrote.

To optimize, run the *SQL Development* (**WINDBI**) program. From the
**Optimization** menu, select the appropriate option.

**Note:** For SQL queries, you can also select **+ optimizer** from the
**Execute** menu. Or you can select **+ execution** (from the same
menu), which executes the query and show the steps of execution; for
each step, it also indicates how many records where retrieved.

### Table Access 

There are three methods of table access:

-   **Direct** --- One specific record is retrieved.
-   **Skip** --- Some records are retrieved according to keys.
-   **Sequential** --- All records are retrieved.

Generally speaking, in form optimization, only one table should have a
sequential access (the form\'s base table). All other tables should have
direct access.

> **Example:** If you check the optimization of the **ORDERS** form,
> only the **ORDERS** table should have sequential access. The rest
> should have direct access.

If the form is a sub-level (e.g., **ORDERITEMS**), the form\'s base
table should have skip access. In this context, if a table has a key
with more than one column (e.g., {ORD, KLINE} in the **ORDERITEMS**
table), a condition on the first column of the key will create skip
access. Optimization of the entity will determine how quickly it will be
executed (how quickly records are going to be displayed in a form or how
long execution of a report or procedure will take).

Note that the query is actually passed to the database engine (SQL),
which determines the actual order of tables. Nonetheless, the
optimization can help you to easily detect a query that misses some
joins or a table that lacks some keys. You should try to avoid
sequential access to the tables, as that usually means the query will be
slow.

## Advanced Debugging 

In addition to the above debugging options available from within
***Priority***, you may occasionally wish to inspect the queries being
sent to the database itself (SQL Server or Oracle).

If no profiler is installed, you can open ***Priority*** in trace mode,
so that all queries sent to the database are written to one or more
trace files.

To open ***Priority*** in this mode, you must first set the directory in
which trace files will be saved (e.g.,*C:\\tmp*). To do so, open a
command line and execute one of the following commands:

When working with a SQL Server installation:
    SET SSDEBUG=C:\\tmp

When working with an Oracle installation:
    SET ORADEBUG=C:\\tmp

**Note:** You must specify an existing folder.

Next, open ***Priority*** from the command line. The easiest way to do
this is to record the target path of your desktop shortcut
for ***Priority*** (e.g., *D:\\priority\\bin.95\\WINMENU.exe*).

All queries that are sent to the database while working in this
environment will be written to trace files, which are saved in the
specified folder.

## Logging

### Message Severity Levels 

The following is the list of message severities, in ascending order (1
being the lowest severity, 6 being the highest).

  | Severity          |  Level  |
  | ----------------- | ------- |
  | JOURNAL_DEBUG     |  1      |
  | JOURNAL_TRACE     |  2      |
  | JOURNAL_INFO      |  3      |
  | JOURNAL_WARNING   |  4      |
  | JOURNAL_ERROR     |  5      |
  | JOURNAL_FATAL     |  6      |

### Usage in *Priority* Procedures 

`EXECUTE JOURNALP 'level', 'message';`

> **Example:** The following code will cause a message of a given
> severity level to be written to the server log.
>
> ```sql
> :MSG = "Statement failed to execute. Please help.";     
> /*message to be written to server log */
>
> :SEV = 4; 
> /*message severity level */
>
> [Some group of SQL statements that will fail]
> /* on failure */
>
> EXECUTE JOURNALP :SEV, :MSG; 
> ```

### Tabula.ini Definitions

In order to control which messages will be recorded to the server log,
define the following \[Log\] section in the *tabula.ini* file:

    [Log]
    Server Path='path_to_server_log' (e.g., S:\\Priority\\log)
    Server Level='minimum_level'(e.g., 4)
    Client Path='path_to_client_log'(e.g., C:\\tmp\\priority\\log)
    Client Level='minimum_level'(e.g., 4) 


All messages (both automatic and manual) having a severity
level greater than or equal to the *\'minimum_level\'* will be recorded
in the log. Specifying 0 is equivalent to 5; that is, messages with
levels 5 or 6 will be recorded in the log. To record messages of any
severity, specify a *\'minimum_level\'* of 1.

If you have added JOURNAL commands but are not seeing the results immediately, it may be related to server buffering. When buffering is on, the server delays log writes until the process is over (e.g. procedure ends or form is closed).

You can disable server buffering by setting the **Server Buffered** option to 0 under the *\[Log\]* section of the *tabula.ini* file.

```txt
Server Buffered=0
```