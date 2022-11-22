---
title: Add BPM Interfaces
layout: sdk_nav
group: BPM
tags: 'Priority_SDK'
---


The fifth step in [creating a BPM flow
chart](Creating-BPM-Flow-Charts ) is to create the necessary
interfaces.

## BPM Interface 

Create a form interface to the **XXXX_MYDOCSTATS** form. Changes in the
BPM chart will update the form using this interface.

1.  Open the *Form Load Designer*.
2.  In the *Load Name* column, write the name of the interface:
    "BPMPRIV_MYBPM", where "PRIV_MYBPM" is the name of the
    **STATUSTYPE**.
3.  In the *Load Table* column, write "GENERALLOAD".
4.  In the *Record Size* column, specify "500" (this should be large
    enough).
5.  Enter the *Forms to be Downloaded* sub-level form.
6.  In the *Form Name* column, write "XXXX_MYDOCSTATS".
7.  In the *Code (Record Type)* column, write "1".

------------------------------------------------------------------------

**Note:** You don't need to fill in the *Link Form Cols to Load Tbl Cols*
form (a sub-level of the *Forms to be Downloaded* form), as this form
will be filled in automatically when you run the BPM procedure.

------------------------------------------------------------------------

## Update Status/Assigned User 

The **STATUSMAIL** interface is used by the BPM to change the status and
assigned user of the **XXXX_MYDOC** form.

1.  In the *Form Load Designer*, write the name of the interface in the
    *Load Name* column: "STATUSMAILPRIV_MYBPM", where "PRIV_MYBPM" is
    the name of the STATUSTYPE.
2.  In the *Load Table* column, write "GENERALLOAD".
3.  In the *Record Size* column, specify "500" and flag the *Ignore
    Warnings* column.
4.  Enter the *Forms to be Downloaded* sub-level form.
5.  In the *Form Name* column, write "XXXX_MYDOC".
6.  In the *Code (Record Type)* column, write "1".
7.  Enter the *Link Form Cols to Load Tbl Cols* sub-level form, and
    create three records, indicating the following *Load Table Column*,
    *Form Column Name* and *Order*, respectively:

    **INT1**, **MYDOC**, **1**

    **TEXT1**, **OWNERLOGIN**, **2**

    **TEXT2**, **STATDES**, **3**
    
    where:

    -   **MYDOC** is the *Form Column Name* of the column in the
        **XXXX_MYDOC** form that contains the autounique key of the
        **XXXX_MYDOC** table.
    -   **OWNERLOGIN** is the *Assigned to* column in the **XXXX_MYDOC**
        form.
    -   **STATDES** is the *Form Column Name* of the column in the
        **XXXX_MYDOC** form that contains the status description.

The next step is to [create the procedure for the BPM
chart](BPM-Create-Procedure ).
