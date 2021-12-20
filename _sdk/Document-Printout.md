---
title: Print Documents from Within a Procedure
layout: sdk_nav
---

## Introduction

You can create a [procedure](Procedures ) that opens a
[document](Documents ) and embed within it a second procedure
that prints out that document. For instance, you can build a procedure
that opens sales order via a form interface and then displays the
printout of the new sales orders.

## Document Format 

As the printout will be created automatically, there is no user input to
determine the print format; rather you have to set it yourself. You can
do so in one of two ways:

-   By specifying the format as part of the document execution command
    (see **Executing the Document**).
-   By means of the **PRINTFORMAT** table, which always saves the last
    print format utilized by a given user for a given document. Thus,
    when the document runs, the system takes the print format to be
    displayed from this table. In order to ensure that your procedure
    always displays the desired print format, you have to update the
    relevant record in the **PRINTFORMAT** table prior to execution of
    the document.

## Determining Available Print Formats 

To find out which print formats are available for a given document, run
the following SQL commands in **WINDBI**:

``` tsql
/* this code will show all print formats defined for the document */
SELECT * FROM EXTMSG WHERE EXEC = 
(SELECT EXEC 
FROM EXEC 
WHERE TYPE = 'P' 
AND ENAME = 'WWWSHOWORDER') 
AND NUM < 0 FORMAT;
```

## Setting the Print Format 

At this point you should know the **EXEC** of the document you want to
run and the number of the print format you want to display. In the SQLI
step of the procedure that runs the form interface for the *Sales
Orders* form, add the following commands after execution of the form
interface:

``` tsql
/* this code defines the format that will be used to print the document; 
in the current example, it is assumed that we want to use print format -5 */
:EXEC = 0;

SELECT EXEC INTO :EXEC 
FROM EXEC 
WHERE TYPE = 'P' 
AND ENAME = 'WWWSHOWORDER';

:PRINTFORMAT = -5;

UPDATE PRINTFORMAT 
SET VALUE = :PRINTFORMAT
WHERE EXEC = :EXEC 
AND USER = SQL.USER;

SELECT SQL.TMPFILE INTO :TMPORDERS FROM DUMMY;

LINK ORDERS TO :TMPORDERS;
GOTO 199 WHERE :RETVAL <= 0;

INSERT INTO ORDERS 
SELECT * FROM ORDERS O 
WHERE ORD = (SELECT ATOI(KEY1) 
FROM GENERALLOAD 
WHERE RECORDTYPE = '1' 
AND LOADED = 'Y');

/* Remark: In this example I assume the form interface uses the GENERALLOAD table and that 
RECORDTYPE = '1' is the RECORDTYPE used for the ORDERS form. 
Reminder: After a successful load, the AutoUnique value of each new order is saved in the 
KEY1 column of the load table */
```

## Executing the Document 

At this point you can execute the document in one of three ways: you can
display it on screen, you can send it directly to the default printer,
or you can save it as a file (and send as a mail attachment).

-   To display the document on screen in HTML format, continue the above
    code as follows:

``` tsql
EXECUTE WINACTIV '-P', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS [, '-format', :PRINTFORMAT]; 
LABEL 199; 
```

Optionally, if you want to specify the format as part of the command,
add **\'-format**\' and the format number (as a variable or by
specifying the number directly).

------------------------------------------------------------------------

**Note:** The above code will only display a document on screen when it
is run as part of a step in a procedure.

------------------------------------------------------------------------

-   To generate the document as a Word file (-wo), use the following
    code instead:

``` tsql
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPFILE, ['-format', :PRINTFORMAT,]'-wo', 'C:/TEMP/O.docx';
```

-   To generate the document as a pdf file based on a word file (-wpdf),
    use the following code instead:

``` tsql
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPFILE, ['-format', :PRINTFORMAT,] '-wpdf', 'C:/TEMP/O.pdf'
```

------------------------------------------------------------------------

**Notes:**

-   The above code will download the files to your temp folder.

```{=html}
<!-- -->
```
-   This operates similarly to HTML formats where the PRINTFORMAT holds
    USER and EXEC, and VALUE = Word template number. Since Word
    templates are stored as positive values in the PRINTFORMAT table, if
    you based the format on a negative TRIGMSG, convert it to a positive
    value first (multiply by -1).

------------------------------------------------------------------------

To send the document to the default printer, continue the above code as
follows:

``` tsql
EXECUTE WINACTIV '-P', 'WWWSHOWORDER', '-q', 'ORDERS', :TMPORDERS;
LABEL 199; 
```

When sending the document to the default printer, if you want to print
more than 1 copy, use the flag \'--Q\' instead of \'--q\'. For example,
to print 2 copies, continue the above code as follows:

``` tsql
EXECUTE WINACTIV '-P', 'WWWSHOWORDER', '-Q',2, 'ORDERS', :TMPORDERS; 
LABEL 199; 
```

------------------------------------------------------------------------

**Note:** The **WINACTIV** command can only be used when programming for
the Windows interface; see [Working with the Priority Web
Interface](Working-with-the-Priority-Web-Interface ) for
details.

------------------------------------------------------------------------

If you want to save the document as a file, you can choose between a few
different file types.

-   To save the document as a standard HTML file (*..\\..\\orders.htm*),
    use the following code instead:

    :   `:TMPOUT = '..\..\orders.htm'; EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS, '-o', :TMPOUT;`
-   To save the document as a pdf file (*..\\..\\orders.pdf*), use the
    following code instead:

    :   `:TMPOUT = '..\..\orders.pdf';EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS, '-pdf', :TMPOUT;`

**In a non-English system:** If the document is in English (i.e., it is
assigned the value *E* in the *HTML Document* column of the *Procedure
Generator*), this should be indicated by adding the flag '-e\' after the
arguments of the linked file (i.e, after \'ORDERS\', :TMPORDERS).

> **Example:**
>
> ``` tsql
> :TMPOUT = '..\..\orders_e.pdf'; 
> EXECUTE WINHTML '-d', 'WWWSHOWORDER_E', 'ORDERS', :TMPORDERS, '-e', '-pdf', :TMPOUT; 
> ```

Once you have generated the file, you can send an e-mail to a
***Priority*** user and attach the file:

``` tsql
:USER = SQL.USER;
MAILMSG 5 TO USER :USER DATA :TMPOUT;
```

Or you can send it to a ***Priority*** mail group:

``` tsql
:GROUPNAME = 'myGroup'; 
MAILMSG 5 TO GROUP :GROUPNAME DATA :TMPOUT;
```

or an external e-mail recipient:

``` tsql
:EMAIL = 'example@example.com';
MAILMSG 5 TO EMAIL :EMAIL DATA :TMPOUT;
LABEL 199;
```

------------------------------------------------------------------------

**Note:** You have to record message number 5 for the procedure.

------------------------------------------------------------------------

## Executing a Document After Direct Activation 

You might want to create a program that executes a document immediately
after [Direct Activation](Direct_Activations ) of a procedure
from within a form. If the desired procedure is run in the foreground
(e.g., in order to display a message when it finishes running), the
document should nevertheless be executed in the background so that users
can continue working in the form during this time, as this process can
take a few seconds. In such a case, the **WINHTML** program must be
executed with the \'-dQ\' parameter.

> **Example:** To print an invoice immediately after finalizing it via
> Direct Activation, include the following command in an SQLI step in
> the procedure (where the :IV variable represents the internal number
> of the invoice you wish to print):
>
> ``` tsql
> EXECUTE BACKGROUND WINHTML '-dQ','WWWSHOWAIV', :IV; 
> ```

## Setting a Number of Copies to Print 

You also might want to create a program that generates multiple copies
of a document by default, so that users need not update the number of
copies each time the document is printed. The number of copies to be
printed can be maintained in a custom form column.

For instance, say you want to create a procedure that prints multiple
copies of a designated warehouse task, in which the number of copies is
defined per warehouse. In order to achieve this, you can add a custom
column to the **WAREHOUSES** form in which to define the desired number
of copies. This value can then be retrieved when executing the document,
in the HTMLCURSOR step of the procedure:

1.  Add a custom column to the WAREHOUSES form (column name =
    **PRIV_NUMCOPIES**; column type = **INT**) that can receive any
    number between 1 and 7.
2.  In the HTMLCURSOR step of the custom procedure, use the **DAYS**
    table to define a loop that generates the designated number of
    copies when executing the document:

> ``` tsql
> SELECT WTASKS.WTASK, WTASKS.WTASKNUM,
> (:$.SRT = 1 ? WTASKS.WTASKNUM :(:$.SRT = 2 ? WAREHOUSES.WARHSNAME : ''))
> FROM WTASKS, WAREHOUSES, DAYS
> WHERE WTASKS.WTASK <> 0
> AND WTASKS.WARHS = WAREHOUSES.WARHS
> AND DAYS.DAYNUM BETWEEN 1 AND MAXOP(1, WAREHOUSES.PRIV_NUMCOPIES)
> ORDER BY 3, 2;
> ```

------------------------------------------------------------------------

**Notes:**

-   If you wish to allow for a number of copies that is greater than 7,
    you can use a custom table rather than the **DAYS** table. However,
    any table you use must contain a fixed number of records, like the
    **DAYS** table.
-   If the user also specifies a number of copies when sending the
    document to the printer (e.g., 2), the total number of copies
    printed will be a product of both numbers (e.g., if
    **PRIV_NUMCOPIES** = 3, a total of 6 copies will be printed).
-   If this mechanism is used to generate multiple copies of a document
    in which only one original can be printed (such as an invoice or
    receipt), this mechanism does not override that restriction. In
    other words, additional copies that are generated in this fashion
    are still marked as copies.

------------------------------------------------------------------------

## Further Reading 

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
