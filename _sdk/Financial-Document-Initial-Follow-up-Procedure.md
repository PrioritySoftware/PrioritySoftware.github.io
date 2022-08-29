---
title: Financial Documents - Initial and Follow-up Procedures
group: Programming Tools
tags: 'Priority_SDK'
---

In the IVTYPES (Financial Documents) form you can set initial procedures
and follow-up procedures to help ensure that financial documents meet
your requirements and that additional actions are taken once a document
is finalized (e.g. updating privately created fields).

These procedures do not receive input. They are run on the server and do not display error/warning messages.

## Initial Procedures 

In the **PREENAME** (Initial Procedure) column of the **IVTYPES** form,
you can set an initial procedure to check data and ensure that the
financial document meets your requirements before it is finalized.

The following information may be useful when working with initial
procedures:

1.  An initial procedure cannot include input/output.
2.  A list of invoices that are about to be finalized will be added to
    the **STACK2USER** table when the **STACK2USER.ELEMENT** field
    contains the **INVOICES.IV** column and the current user appears in
    the **STACK2USER.USER** field.
3.  If you want to include an error message, specify the message number
    in the **STACK2USER.TYPE** field. The message itself should be part
    of the initial procedure. You can use the parameters 1,2,3 in the
    message, which contain the following values:
    1.  Parameter 1 -- Customer/Vendor Number
    2.  Parameter 2 -- Invoice Date
    3.  Parameter 3 -- Invoice Number

## Follow-up Procedures 

In the **CONTENAME** (Follow-Up Procedure) column of the **IVTYPES**
form, you can set a follow-up procedure to perform additional actions
once a document is finalized.

The follow-up procedure runs regardless of whether a document was
finalized successfully or not. Therefore, you should first check which
invoices were finalized:

1.  The follow-up procedure receives the same link file for the Invoice
    (**INVOICES** table) that is sent to the Finalize Invoice program.
    The file is located in the **PAR** variable (**FILE** type).
2.  You can cross-reference the invoices in the file with invoices in
    the table to check which of the invoices was finalized and which
    remain pending.

**Example:**

```sql
LINK INVOICES TO :$.PAR;
ERRMSG 1 WHERE :RETVAL <= 0;
SELECT IV,IVNUM,TYPE,DEBIT FROM INVOICES FORMAT '../../iv.txt';
SELECT IV,IVNUM,TYPE,DEBIT FROM INVOICES ORIG
WHERE IV = (SELECT IV FROM INVOICES) FORMAT ADDTO '../../iv.txt';
UNLINK INVOICES;
```
