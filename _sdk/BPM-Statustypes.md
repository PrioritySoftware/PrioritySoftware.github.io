---
title: Update the STATUSTYPES Table
layout: sdk_nav
---


The fourth step in [creating a BPM flow
chart](Creating-BPM-Flow-Charts ) is to update the
**STATUSTYPES** table.

The **STATUSTYPES** table is used by the BPM mechanism to recognize the
forms and columns involved in the workflow process. It is therefore
necessary to find certain values and insert them in this table.

## Finding the Values 

The following values must be determined:

-   **DOCEXEC** -- The **EXEC** value of the **MYDOC** form.

    ```sql
    SELECT EXEC FROM EXEC WHERE ENAME = \'MYDOC\'
    AND TYPE = 'F' FORMAT; 
    ```

-   **STATEXEC** -- The **EXEC** value of the **MYDOCSTATS** form.

    ```sql
    SELECT EXEC FROM EXEC WHERE ENAME = 'XXXX_MYDOCSTATS'
    AND TYPE = 'F' FORMAT; 
    ```


-   **PROCEXEC** - The **EXEC** value of the procedure used for printing the **XXXX_MYDOC** document. This printout can be attached to a mail message sent by the BPM. The following query assumes this procedure is called **XXXX_WWWSHOWMYDOC**:

    ```sql
    SELECT EXEC FROM EXEC WHERE ENAME = 'XXXX_WWWSHOWMYDOC'
    AND TYPE = 'P' FORMAT; 
    ```


-   **STATCNAME** -- The name of the column in the **XXXX_MYDOCSTATS**
    form that holds the autounique key of the **XXXX_MYDOCSTATS** table,
    i.e., **MYDOCSTAT**.


-   **DOCCNAME** -- The name of the column in the **XXXX_MYDOC** form
    that holds the autounique key of the **XXXX_MYDOC** table, i.e.,
    **MYDOC**.


-   **DOCNOCNAME** -- The name of the column in the **XXXX_MYDOC** form
    that contains the number of the document. This is usually the Unique
    key of the **XXXX_MYDOC** table (e.g., **MYDOCNAME**).\
    **Tip:** In the standard *Sales Orders* form, it\'s the **ORDNAME**
    column; in the standard *Shipment Document* form, it\'s the
    **DOCNO** column.


-   **OWNERCNAME** -- The name of the column in the **XXXX_MYDOC** form
    that holds the *Assigned to* login, i.e., **OWNERLOGIN**.


-   **INITSTATCNAME** -- The **INITSTATFLAG** column in the
    **XXXX_MYDOCSTATS** form.


-   **DOCDATENAME** -- The name of the column in the **XXXX_MYDOC** form
    that holds the date the document was recorded (e.g., **CURDATE**).
    <!-- **Note:** This column is used to retrieve the document when
    performing a full text search; for details, see [**Enterprise
    Search**](#Enterprise_Search ). -->


-   **TEXTEXEC** -- If the **XXXX_MYDOC**document has a sub-level text form (e.g., the **ORDERSTEXT** sub-level of the **ORDERS** form), the **EXEC** value of this text form.

    The following query assumes this form is called      **XXXX_MYDOCTEXT**:

    ```sql
     SELECT EXEC FROM EXEC WHERE ENAME = 'XXXX_MYDOCTEXT'
     AND TYPE = 'F' FORMAT; 
    ```


-   **TEXT2EXEC** -- If the **XXXX_MYDOC**document has an additional sub-level text form (e.g., for text in a second language), the **EXEC** value of the second sub-level text form.

    The following query assumes this form is called
    **XXXX_MYDOCTEXT2**:
    ```sql
    SELECT EXEC FROM EXEC WHERE ENAME = 'XXXX_MYDOCTEXT2'
    AND TYPE = \'F\' FORMAT; 
    ```


-   **LOGEXEC** - The **EXEC** of the **DOCTODOLISTLOG** form that was
    linked to **XXXX_MYDOC** as a sub level form.

    ```sql
    SELECT EXEC FROM EXEC WHERE ENAME =
            \'DOCTODOLISTLOG\'
        :   AND TYPE = \'F\'; 
    ```

## Inserting the Data 

Run the following query in order to insert the above data into the
**STATUSTYPES** table:

```sql
INSERT INTO STATUSTYPES (TYPE, DOCEXEC, STATEXEC, PROCEXEC, STATCNAME, DOCCNAME, DOCNOCNAME, 
OWNERCNAME, INITSTATCNAME, DOCDATENAME, TEXTEXEC, TEXT2EXEC, LOGEXEC) 
VALUES('PRIV_MYBPM', DOCEXEC, STATEXEC, PROCEXEC, 'MYDOCSTAT', 'MYDOC', 'MYDOCNAME', 
'OWNERLOGIN', 'INITSTATFLAG', 'DOCDATENAME', TEXTEXEC, TEXT2EXEC, LOGEXEC);
```

where
* \'PRIV_MYBPM\' is the *STATUSTYPE*, 
* *DOCEXEC, STATEXEC, PROCEXEC*, *TEXTEXEC, TEXT2EXEC* are the numeric values from the above queries.

## Search

***Priority***\'s Search tool is used to perform a full text search for
documents and attached files in the system. This search mechanism is
able to search for specific text in all documents that have a BPM status
system (including custom documents), provided these documents are set up
as follows:

-   In the **DOCDATENAME** column of the **STATUSTYPES** table, specify
    which column in the document is the date (used to specify a date
    range for searches; e.g., the **CURDATE** column of the **ORDERS**
    form).

The next step is to [create the necessary
interfaces](Creating-the-Necessary-Interfaces ).
