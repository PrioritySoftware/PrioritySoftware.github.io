The second step in [creating a BPM flow
chart](Creating_BPM_Flow_Charts "wikilink") is to create the statuses
form.

1.  Use the *Form Generator* to create a new form named
    **XXXX_MYDOCSTATS**, based on the**XXXX_MYDOCSTATS**table.
2.  Define the following outer joins (add a question mark in the *Join
    ID* column next to the *Join Table* column):\
    **XXXX_MYDOCSTATS.MYDOCSTAT**=**DOCSTATUSES.ORIGSTATUSID\
    DOCSTATUSES.COLOR**=**HTMLCOLORS.COLOR**
3.  Define the following form columns:\
    **XXXX_MYDOCSTATS.STATDES** -- *Status*\
    **XXXX_MYDOCSTATS.INITSTATSFLAG** -- *Initial Status*
4.  Add all of the flags from the **XXXX_MYDOCSTATS** table.
5.  Add the following flags from the **DOCSTATUSES** table:\
    **DOCOPENED** -- *Include in ToDo List*\
    **INACTIVE** -- *Inactive Status*\
    **ESTATDES** (optional for non-English system) -- Adds a description
    in English.\
    **Note:** When recording these columns, do not fill in the *Column
    Name* or *Table Name* columns; rather, enter the *Form Column
    Extension* sub-level form and enter the table and column names in
    the *Expression/Condition* column (i.e., **DOCSTATUSES.DOCOPENED**).
6.  Add the following hidden columns (listed are the *Form Column Name*,
    *Table Name* and *Column Name*, respectively):\
    **DOCSTATUS, DOCSTATUSES, DOCSTATUS**\
    **SORT, MYDOCSTATUSES, SORT**\
    **STATUSTYPE, DOCSTATUSES, TYPE**\
    **VCOLORNAME, HTMLCOLORS, COLORNAME**\
    **Note:** The **STATUSTYPE** column must have an expression
    \'PRIV_MYBPM\', where \'PRIV_MYBPM\' is a name for the new BPM
    system. This name must begin with a four-letter prefix, similar to
    what you use throughout the system for this customer, and can
    include up to 10 characters.
7.  Move to the line for the **STATDES** column and specify *1* in the
    *Sort Priority* column.

------------------------------------------------------------------------

**Note:** All the names and descriptions of forms, tables, columns, etc.
are given here for demonstration purposes and can be changed as desired.

------------------------------------------------------------------------

## Form Triggers {#form_triggers}

The following form triggers need to be created:

-   A CHECK-FIELD trigger in the**INITSTATFLAG**column that prevents
    users from marking more than one status as an initial status:

> ``` tsql
> ERRMSG 1 WHERE :$.@ = 'Y' AND EXISTS
> (SELECT 'X' FROM XXXX_MYDOCSTATS 
> WHERE INITSTATFLAG = 'Y' AND MYDOCSTAT <> :$.MYDOCSTAT);
> ```

-   A PRE-INSERT/PRE-UPDATE trigger that checks the validity of the
    record. For example, the following checks that the initial status
    allows document revision:

> ``` tsql
> ERRMSG 2 WHERE :$.INITSTATFLAG = 'Y' AND :$.CHANGEFLAG <> 'Y';
> ```

-   A POST-INSERT/POST-UPDATE trigger that handles record insertion into
    **DOCSTATUSES**:

> ``` tsql
> INSERT INTO DOCSTATUSES(TYPE,ORIGSTATUSID)
> VALUES(:$.STATUSTYPE, :$.MYDOCSTAT);
> UPDATE DOCSTATUSES SET STATDES = :$.STATDES,
> ESTATDES = :$.ESTATDES /* only in non-English system */, 
> SORT = :$.SORT, COLOR = :$.VCOLOR, INACTIVE = :$.INACTIVE, 
> DOCOPENED = :$.DOCOPENED
> WHERE TYPE = :$.STATUSTYPE AND ORIGSTATUSID = :$.MYDOCSTAT;
> ```

------------------------------------------------------------------------

:   **Note:** If you don\'t support a non-English environment, don\'t
    update the **ESTATDES** column.

------------------------------------------------------------------------

-   A POST-DELETE trigger, that deletes from **DOCSTATUSES**:

> ``` tsql
> DELETE FROM DOCSTATUSES WHERE TYPE = :$.STATUSTYPE AND ORIGSTATUSID = :$.MYDOCSTAT; 
> ```

-   A PRE-FORM trigger that causes all records to be displayed when the
    form is entered. It should contain the following text:

> ``` tsql
> :statustype = 'PRIV_MYBPM'; /* where 'PRIV_MYBPM' = STATUSTYPE */ 
> :KEYSTROKES = '*{Exit}'; 
> ```

-   A POST-FORM trigger with additional checks (e.g., that a status was
    marked as initial status):

> ``` tsql
> ERRMSG 4 WHERE NOT EXISTS <br />
> (SELECT 'X' FROM XXXX_MYDOCSTATS WHERE INITSTATFLAG = 'Y');
> ```

-   A PRE-INS-UPD-DEL trigger (or an error message in the PRE-INSERT,
    PRE-UPDATE and PRE-DELETE triggers) that prevents any manual changes
    in this form, since all the changes will be made using an interface
    run by the BPM Chart:

> ``` tsql
> ERRMSG 17 WHERE :FORM_INTERFACE <> 1;
> ```

-   A CHOOSE-FIELD trigger that displays the statuses from the
    **DOCSTATUSES** table:

> ``` tsql
> SELECT STATDES, '', ITOA(SORT,3)
> FROM DOCSTATUSES
> WHERE TYPE = 'PRIV_MYBPM'
> AND
> #INCLUDE STATUSARCS/EXP1
> ```

The next step is to [modify the new
document](Modifying_the_New_Document "wikilink").
