---
title: Print Attachments from a Procedure
layout: sdk_nav
group: Procedures
tags: 'Priority_SDK'
---

To print files (e.g., attachments) from within a
[procedure](Procedures ), include the **PREXFILE** program in
an SQLI step. The **PREXFILE** program receives several parameters:

-   If you want to send the attachments directly to the default printer,
    add the flag '-d\'. If you want to choose a printer, leave this
    parameter empty.
-   The program can receive two optional parameters (**CHAR** type),
    which receive any description that should appear on a cover page, to
    be printed together with the attachment. If both parameters are
    empty, no cover page will be printed.
-   The program receives a linked table (**STACK24** table, **FILE**
    type) which receives the file path(s) of the
    [document(s)](Documents ) to be printed and the order in
    which multiple documents should be printed. This table contains the
    following columns:
-   **SORT_LINE** --- Determines the printing order of the documents.
-   **TEXT1** --- The full path and name of the file to be printed.

> **Examples:** To create a new Action from the *Sales
> Orders* form, which prints any documents that are attached to the
> order, include an INPUT step with a PAR parameter of **LINE** type. In
> the procedure, record the following in the SQLI step:
>
> ```sql
> SELECT SQL.TMPFILE INTO :STK FROM DUMMY;
>
> LINK ORDERS TO :$.PAR;
> ERRMSG 1 WHERE :RETVAL <= 0;
>
> LINK STACK24 TO :STK;
> ERRMSG 1 WHERE :RETVAL <= 0;
>
> INSERT INTO STACK24(SORT_LINE,TEXT1) 
> SELECT EXTFILES.EXTFILENUM, EXTFILES.EXTFILENAME 
> FROM EXTFILES, ORDERS 
> WHERE EXTFILES.IV = ORDERS.ORD
> AND EXTFILES.TYPE = 'O'
> AND EXTFILES.EXTFILENUM > 0
> AND ORDERS.ORD <> 0;
>
> UNLINK STACK24;
> UNLINK ORDERS; 
> ```
>
> To send the documents and cover page to the default printer, continue
> the above code as follows:
>
> ```sql
> EXECUTE PREXFILE '-d', 'description 1', 'description 2', :STK; 
> ```
>
> To open a window to choose a printer from which to print the documents
> and cover page, use the following code instead:
>
> ```sql
> EXECUTE PREXFILE 'description 1', 'description 2', :STK;
> ```
>
> To send the documents to default printer without a cover page, use the
> following code instead:
>
> ```sql
> EXECUTE PREXFILE '-d', '','', :STK; 
> ```

## Further Reading 

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
