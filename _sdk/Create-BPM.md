---
title: Create BPM
layout: sdk_nav
group: BPM
tags: 'Priority_SDK'
---

This section explains how to create a BPM status system for a new
document. Assuming the new document is called **XXXX_MYDOC**, the
following explains how to:

-   Create a form called **XXXX_MYDOCSTATS** (and its accompanying
    table).
-   Modify the **XXXX_MYDOC** form to support statuses.
-   Create a procedure for the BPM flow chart (and accompanying
    interfaces).



**Notes:**

-   BPM flow charts cannot be created for standard forms.
-   A BPM flow chart can only be created for an upper-level form.
-   All the names and descriptions of forms, tables, columns, etc. are
    given here for demonstration purposes and can be changed as desired.
-   For the purposes of this procedure, the first two keys of the base
    table of the **XXXX_MYDOC** form should be:
    1.  An autounique key
    2.  A unique key, comprising a single column of **CHAR** or **INT**
        type.



The steps to take (in order) are as follows:

1.  [Create the statuses table](Creating-the-Statuses-Table )
2.  [Create the statuses form](Creating-the-Statuses-Form )
3.  [Modify the new document](Modifying-the-New-Document )
4.  [Enable tracking of documents
    (optional)](Enabling-Document-Tracking )
5.  [Update the **STATUSTYPES**
    table](Updating-the-STATUSTYPES-Table )
6.  [Create the necessary
    interfaces](Creating-the-Necessary-Interfaces )
7.  [Create the procedure for the BPM
    chart](Creating-the-Procedure-for-the-BPM-Chart )
8.  [Debug the BPM](Debugging-the-BPM )
9.  [Insert the initial status into the status
    table](Inserting-the-Initial-Status-into-the-Status-Table )
