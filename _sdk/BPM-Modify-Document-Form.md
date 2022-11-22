---
title: Modify the New Document
layout: sdk_nav
group: BPM
tags: 'Priority_SDK'
---

The third step in [creating a BPM flow
chart](Creating-BPM-Flow-Charts ) is to modify the new
document.

## Assigned to 

Add an *Assigned to* column to the new document (**XXXX_MYDOC**).
Consequently, when a user changes the status of the document to a status
flagged *Include in ToDo List*, a new record will be opened in the *To
Do List* form for that user.

1.  Use the *Column Generator* to add a new column to the **MYDOC**
    table: **OWNER** -- **INT**, 13, *Owner (ID)*.
2.  Add a column to the **MYDOC** form called **OWNER**, with a join to
    the **USERS** table: MYDOC.OWNER = USERS.USER
3.  Add a third column with the following *Form Column Name*, *Table
    Name* and *Column Name*: **OWNERLOGIN**, **USERS**, **USERLOGIN**.     Assign the revised title *Assigned to*. This column should be mandatory (Type *M*); it is filled automatically by the BPM when a status is changed.
4.  Add the following messages to the **XXXX_MYDOC** form (you can use the same numbered messages for standard forms such as ORDERS as inspiration):
    -   Message 400: This message will be used to alert users of a
        change in the status of a document (when the document is in
        their tracking list).
    -   Message 401: This message will be used when BPM rules are set to
        send an alert when a document remains in a certain status for a
        certain amount of time.
    -   Message 402: This message should consist of a brief description
        of the document (e.g., Price Quote, Blanket Sales Order), which
        will appear as the *Document Type* in the *To Do List* form.

## The Status Column 

1.  Add another column to the **MYDOC** table: **MYDOCSTAT**, type **INT**, width
    **13**, title *Status (ID)*. This column must have the same name as the column  of the autounique key in the **XXXX_MYDOCSTATS** table.
2.  Add the following columns to the **XXXX_MYDOC** form:

    - **MYDOCSTAT** (joined): XXXX_MYDOC.MYDOCSTAT =
        XXXX_MYDOCSTATS.MYDOCSTAT
    -   **STATDES** (mandatory, not joined): **XXXX_MYDOCSTATS.STATDES**
    -   **STATUSTYPE** (calculated, Type **CHAR**, Width 20): Assign column expression \'PRIV_MYBPM\', where \'PRIV_MYBPM\' is the
        STATUSTYPE. 
3.  Add a POST-FIELD trigger to the **STATDES** column:
    ```sql
    :$.STATUSTYPE = 'PRIV_MYBPM'; {where 'PRIV_MYBPM' = STATUSTYPE}
    ```
4.  Add a POST-FIELD trigger to one of the columns that will fill in the initial status. For example, if you have a **MYDOCNAME** column in **XXXX_MYDOC**, add the following POST-FIELD to that column:
    ```sql
    SELECT MYDOCSTAT INTO :$.MYDOCSTAT
    FROM XXXX_MYDOCSTATS
    WHERE INITSTATFLAG = 'Y' 
    AND :$.MYDOC = 0; 
    ```
5.  Add POST-INSERT and POST-UPDATE triggers with the text:

    ```sql
    GOTO 51 WHERE :$.MYDOCSTAT =:$1.MYDOCSTAT
    :doc = :$.MYDOC;
    :status = :$.MYDOCSTAT;
    :statustype = 'PRIV_MYBPM';
    #INCLUDE STATUSAUTOMAIL/SendStatusMail
    LABEL 51;
    ```
    **Note: MYDOC** should be the *Form Column Name* of the
        autounique key of the **XXXX_MYDOC** table.
6.  If you have an *Allow Revisions* flag for the status, add the **XXXX_MYDOCSTATS.CHANGEFLAG** column to the form, as well as PRE-INSERT, PRE-UPDATE and PRE-DELETE triggers that print an error if the status doesn\'t allow changes.

## Connecting the New Document to the To Do List 

1.  Add the following hidden column to **XXXX_MYDOC**(listed are the *Form Column Name*, *Table Name* and *Column Name*, respectively):
    **NSCUST**, **MYDOC**, **MYDOC**. This column contains the autounique key of the **XXXX_MYDOC** table (the same as the **MYDOC** column).
2.  Add POST-FIELD triggers, in both the **MYDOC** and **NSCUST** columns, to copy the values from one column to the other. For example, in the **MYDOC** column, the trigger would be:

    ```sql
    :$.NSCUST = :$.@;
    ```

3.  If two or more forms share the same base table (e.g., both the
    **CUSTNOTES** and **CUSTNOTESA** forms are based on the
    **CUSTNOTES** table), add the following hidden column to those forms
    that do not appear in the **DOCEXEC** column of the **STATUSTYPES**
    table: **STATMAILSTATUSTYPE** (Type **CHAR**, Width 1). Assign the
    column expression <code>PRIV_MYBPM</code>, where PRIV_MYBPM is the
    STATUSTYPE.
4.  Link the **DOCTODOLISTLOG** and **DOCTODOLIST** forms as sub-levels
    of the **XXXX_MYDOC** form.
5.  Run the following query to enable activation of the **XXXX_MYDOC**
    form from the *To Do List*:

    ```sql
    INSERT INTO ZOOMCOLUMNS(NAME, TONAME, POS) VALUES('TODOREF', 'MYDOCNAME', X); /* where X = some number */
    ```
6.  Every change in the status or user assigned to your document is documented in the **TODOLIST** table. You should also decide whether users will be able to delete records from the document. For example, you cannot delete records in the **ORDERS** form, you can only change their status to one which is flagged as **Canceled**.
    If you decide to allow record deletion in your document, you must ensure that any deleted records are deleted from the **TODOLIST** table as well. To do so, add a POST-DELETE trigger to the **XXXX_MYDOC** form:

    ```sql
    DELETE FROM TODOLIST WHERE TYPE = 'PRIV_MYBPM' AND IV = :$.MYDOC;
    ```

The next step is to [update the STATUSTYPES
table](BPM-Statustypes ). Optionally, you can
[enable document tracking for this
form.](BPM-Tracking )
