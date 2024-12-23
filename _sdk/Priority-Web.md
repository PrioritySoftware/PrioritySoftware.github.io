---
title: Programming for Priority Web
group: PriorityWeb
tags: 'Priority_SDK'
---

## Differences from Priority Windows

Programming for the ***Priority*** web interface is basically
the same as programming for the Windows interface. However, when working with the web interface you must keep in mind the different method used to access the ***Priority*** server. As a result, the following exceptions apply:

-   When working with attachments, only files located in the **system/mail** folder can be interacted with by the user. Any attachments uploaded by code should be stored in this folder if users need to interact with the attachment. 
-   You cannot use the [EXECUTE command](Run-Procedure-SQLI) to run entities that require input from the user or that display output. This is because the entity is executed on the server and any interface opened will be displayed on the server rather than on the local computer. In particular, you cannot use WINACTIV to run entities from a trigger step. \
Instead, add the procedure as a separate step in the procedure, with the the desired *Entity Name* and the Type **P**. Note that you cannot feed in linked temporary tables to procedures run as a step.\
**Note:** This also extends to ACTIVAT and ACTIVATF if they run an entity that requires input, such as the SHVA program.
-   You cannot add the following syntax to a [procedure step](Procedure-Steps) in order to open a form when running a procedure:\
    `EXECUTE WINFORM 'ORDERS';`\
    Instead, add a new procedure step with the desired *Entity Name* and the Type **F**.
-   You cannot use the following syntax in a procedure step in order to
    execute a document when running a procedure:
    ```sql
    EXECUTE WINACTIV '-P', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS;
    ```
    Use WINHTML instead.
-   If the value in the *Application* column is 4 characters long and
    ends in 0 (zero), the entity in question will not be displayed when
    working with the web interface.
-   In procedures that load or export data, add the UPLOAD or DOWNLOAD
    step to upload/download the file in question from the local computer to the server (or vice versa). Specify the file name in the UPLOAD/DOWNLOAD procedure step.

    > **Example:** See the UPLOAD procedure step in the **LOADFNC1**
    > procedure and the DOWNLOAD step in the **ULOADFNC** procedure.


    **Note:** This step is not necessary when opening or saving a file using an INPUT parameter of type **CHAR** that is flagged to display a browse button (in the *Procedure Parameter Extension* sub-level form).

## Saving Debug Files

A common step when debugging code that includes linked temporary tables is dumping the contents of the temporary table to a file. This is used to investigate the values the system was working with at a certain point in the code. This usually follows the structure:

```sql
SELECT COLUMN1, COLUMN2... FROM LINKED_TABLE
TABS :FILENAME;
```

A common question when developing on Priority Web is how to access these files in a situation when there is no access to the server machine.

If you are working on Priority's Cloud, you can use the FilesAPI solution Priority Software provides. For more information, see the FilesAPI documentation.

<!-- Add link when available -->

However, if you are working on a Priority Web installation without access to the server, the following workaround may prove helpful:

1. Use NEWATTACH to create a valid attachment file path in WINDBI and save it.
2. In your code, save the results to a temporary file.
3. Copy the results to the file path you created in step 1.
4. Open a form that has an Attachments subform, such as Tasks (CUSTNOTESA).
5. Add a record with an easily remembered name, such as *DEBUG*.
6. Paste the file path you created in step 1.
   
![Attachment with file path](https://cdn.priority-software.com/docs/images/SDK_Web_DebugFile.png)   


```sql
/* This sample can be run in SQL Development (WINDBI)*/
/* Create a valid file path */
:DEBUGFILE = NEWATTACH('MyDebug', '.txt');
SELECT :DEBUGFILE FROM DUMMY FORMAT;
/* e.g. '../../system/mail/2023/5/xo3rr23l/dummyfile.txt' */
SELECT SQL.TMPFILE INTO :DAYSLINK FROM DUMMY;
LINK DAYS TO :DAYSLINK;
GOTO 999 WHERE :RETVAL <= 0;
INSERT INTO DAYS
SELECT * FROM DAYS ORIG;
/* select into the temporary debug file, then copy 
to the attachment */
:FILEPATH = STRCAT(SYSPATH('TMP', 1), 'MyDebug.txt');
SELECT DAYNUM, DAYNAME FROM DAYS
TABS :FILEPATH;
UNLINK DAYS;
EXECUTE COPYFILE :FILEPATH, :DEBUGFILE;
LABEL 999;
```

{% if site.output == "web" %}

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
{% endif %}