You can execute a
[procedure](Running_a_Procedure#Running_a_Sub-Procedure "wikilink") from
an SQLI step of another procedure by executing any of the following
commands: **WINACTIV**, **ACTIVATE** or **ACTIVATF**. This is useful,
for example, when you want to run a report and [send it to recipients
via e-mail](#Running_a_Report_and_Sending_it_by_E-mail "wikilink").

The difference between the **WINACTIV** command and the **ACTIVATE** and
**ACTIVATF** commands is that **WINACTIV** has a user interface, meaning
that you can define a progress bar and/or messages that require a
response from the user (using a [**PRINTF**, **PRINTCONTF** or
**CHOOSEF** command](Procedure_Steps#Basic_Commands "wikilink")) and
these will be visible to users while the procedure is running, whereas
the **ACTIVATE** and **ACTIVATF** commands will not display these
elements. As such, the **WINACTIV** command cannot be used when working
with the ***Priority*** web interface.

The difference between the **ACTIVATE** and **ACTIVATF** commands is
that **ACTIVATE** runs an *.exe* file whereas **ACTIVATF** runs a *.dll*
file. In other words, a new process is created when the **ACTIVATE**
command is used, whereas a procedure that is activated by the
**ACTIVATF** command is executed in the same process as the form or
procedure from which it is run.

Reports can be executed using the **WINACTIV** command only.

When using the **WINACTIV**, **ACTIVATE** or **ACTIVATF** commands, you
can add two parameters for a linked table: the Table Name and the linked
file.

> **Example -- Executing a Report:** To execute the **OPENORDIBYDOER**
> report for a specific customer, the following code would be used:
>
> ``` priority
> :F = '../..output.txt';
> SELECT SQL.TMPFILE INTO :CST FROM DUMMY;
>
> LINK CUSTOMERS TO :CST;
> GOTO 299 WHERE :RETVAL <= 0;
>
> INSERT INTO CUSTOMERS 
> SELECT * FROM CUSTOMERS O 
> WHERE CUSTNAME = '250';
>
> UNLINK CUSTOMERS;
> EXECUTE WINACTIV '-R', 'OPENORDIBYDOER','CUSTOMERS', :CST;
>
> LABEL 299;
> ```
>
> **Example -- Executing a Procedure:** You have defined a special
> status for price quotes; whenever a quote receives this status, you
> want to open a sales order automatically based on that quote. To do
> so, create a custom [POST-UPDATE
> trigger](Creating_Your_Own_Triggers#Creating_Row_Triggers "wikilink")
> that checks whether the new status assigned to the quote is the
> special status and, if so, executes the *Open Order* procedure
> (**OPENORDBYCPROF**) using any of the three commands mentioned
> earlier. In the current example, the **ACTIVATF** command is used:
>
> ``` priority
> GOTO 10099 WHERE :$. CPROFSTAT <> :SPECIALSTATUS;
>
> SELECT SQL.TMPFILE INTO :FILE FROM DUMMY;
>
> LINK CPROF TO :PAR;
> GOTO 10099 WHERE :RETVAL <= 0;
>
> INSERT INTO CPROF 
> SELECT * FROM CPROF O WHERE PROF = :$.PROF;
>
> UNLINK CPROF;
>
> EXECUTE ACTIVATF '-P', 'OPENORDBYCPROF', 'CPROF', :FILE;
>
> LABEL 10099;
> ```

## Running a Report and Sending it by E-mail {#running_a_report_and_sending_it_by_e_mail}

You might want to create a program that runs a report and sends it to
recipients via e-mail. This is useful, for instance, when you write a
procedure that runs a form interface, you execute this procedure via the
Tabula Task Scheduler, and you want to send one of the users the errors
report created by the form interface.

The following code runs a report and then sends the results in an e-mail
attachment.

``` priority
SELECT SQL.TMPFILE INTO :TMP FROM DUMMY;

LINK ERRMSGS TO :TMP;
GOTO 99 WHERE :RETVAL <= 0;

INSERT INTO ERRMSGS 
SELECT * FROM ERRMSGS O 
WHERE USER = SQL.USER 
AND TYPE = 'i';

GOTO 90 WHERE :RETVAL <= 0;

/* to send the report as an attachment to a Priority mail recipient */
:MAILER = SQL.USER;
EXECUTE WINACTIV '-R', 'INTERFACEERR', 'ERRMSGS', :TMP,'-u', :MAILER;

/* to send the report as an attachment to a Priority group, defined in the UGROUPS form */
:GROUPNAME = 'mailGroup';
EXECUTE WINACTIV '-R', 'INTERFACEERR', 'ERRMSGS', :TMP,'-g', :GROUPNAME;

/* to send the report as an attachment to an external recipient */
:EMAIL = 'example@example.com';
EXECUTE WINACTIV '-R', 'INTERFACEERR', 'ERRMSGS', :TMP,'-e', :EMAIL;

LABEL 90;
UNLINK ERRMSGS;
LABEL 99;
```

Alternatively, you can redirect the report results to a tab-delimited
text file. In this case, you can use **ACTIVATF**. For example, the
following code saves the output of the **OPENORDIBYDOER** report as a
text file (tab-delimited) and then sends the results as an e-mail
attachment.

``` priority
:F = '../..output.txt';
SELECT SQL.TMPFILE INTO :CST FROM DUMMY;

LINK CUSTOMERS TO :CST;
GOTO 299 WHERE :RETVAL <= 0;

INSERT INTO CUSTOMERS 
SELECT * FROM CUSTOMERS O 
WHERE CUSTNAME = '250';

UNLINK CUSTOMERS;

EXECUTE ACTIVATF '-x', :F, '-R', 'OPENORDIBYDOER', 'CUSTOMERS', :CST;

LABEL 299;
MAILMSG 5 TO EMAIL 'demo@demo.com' DATA, :F;
```

You can also redirect the report results to an MS-Excel file. This
command takes two parameters -- the Excel file without a suffix and the
**TEMPLATE** number from the **EXCELTEMPLATES** table. For example, the
following code saves the **OPENORDIBYDOER** report as an Excel file.

``` priority
EXECUTE WINACTIV '-P', 'ORGUNITS', '-X', 'c:\temp\cur', 444; 
```

**Note:** The above code will only work with templates that use the .xlt
extension.

## Further Reading {#further_reading}

[Click](Advanced_Programming_Tools "wikilink") for information on
additional advanced programming tools.
