---
title: Built-in Triggers
layout: sdk_nav
group: Forms
tags: 'Priority_SDK'
---

## Introduction

See also [Form Triggers](Form-Triggers ).

Essentially, the built-in triggers perform certain checks and, if the
checks are successful, update the database accordingly. When a new
record has been entered in a form, and an attempt is made to exit the
line, the built-in triggers generate the following events:

-   They check that values have been assigned to all the columns
    comprising any unique key(s).
-   If the check succeeds, the line is successfully exited, the record
    is inserted into the form's base table, and an automatic value is
    given to the autounique key in that record, if there is one
    (increasing the counter by 1).
-   If the check fails, an error message appears and the user cannot
    leave the line without clearing it or adding the missing values from
    the unique key.

When the user designates a unique key that already exists in the
database, the built-in triggers automatically fill in all columns in the
record. This is one way to retrieve an existing record from the
database. There is then an automatic shift from insert mode into update
mode, and the retrieved record can be modified, as desired. If, however,
no such record exists in the database, then you remain in insert mode
and a new record is created.

When the user specifies a new record, the built-in triggers verify that
imported data exist in their respective join tables. If this
verification check is successful, and all columns in any of the join
table's unique keys have been filled in, then the built-in triggers
automatically fill in any other columns in the form that are imported
from that table.

When an existing record is updated in a form, the system performs the
same verification checks that are activated during record insertion.
Once all update checks are successful, the record is updated in the
database.

***Priority***'s built-in triggers also prevent the violation of
referential integrity. That is, they do not allow the deletion of any
record containing a column that is imported into another form (including
the column that links an upper-level form to its sub-level). Once all
deletion checks are successful, the record is deleted from the database.

Finally, built-in triggers perform privilege checks. That is, they check
whether or not the user is authorized to modify the database. Only an
authorized user will be able to insert, update or delete a record.

In sum, there are several types of built-in triggers:

-   field triggers, which fill in and verify column values
-   insert triggers, which verify the values in the row and insert the
    record in the table if the verification check is successful
-   update triggers, which verify the updated values in the row and
    update the record if the verification check is successful
-   delete triggers, which check for referential integrity and delete
    the record if the check is successful.

Field triggers are activated when the form column is exited. The other
built-in triggers are activated when the row is exited.

The built-in insert, update and delete triggers only affect the form's
base table. If the form is to insert, update or delete records of other
tables, you must write your own POST-INSERT, POST-UPDATE and/or
POST-DELETE triggers.

> **Example:** The **STARTDATE** column in the *Service Calls* form
> (**DOCUMENTS_Q**) is from the **SERVCALLS** table (whereas the base
> table of the **DOCUMENTS_Q** form is **DOCUMENTS**). There are
> therefore POST-INSERT, POST-UPDATE and POST-DELETE triggers for this
> form that generate the insert/update/delete of records in the
> **SERVCALLS** table.

## Field Triggers 

If, when in insert mode, you fill in all columns that make up the base
table\'s unique key (which is often a single column, like **ORDNAME** or
**CUSTNAME**), then the entire record is automatically retrieved and
there is an automatic shift from insert mode to update mode. This
function is carried out by ***Priority***\'s built-in field triggers.
The following code displays the built-in POST-FIELD trigger for the
**ORDERS** form.

------------------------------------------------------------------------

**Note:** Examples here and below are taken from a file created by the
*Dump Form* utility (run via the *SQL Development* program, by selecting
**Form** from the **Dump** menu). The result is the SQL queries of the
form, including the triggers of that form, both built-in and
user-defined.

------------------------------------------------------------------------

```sql
ORDERS/ORDNAME/POST-FIELD TRIGGER:
----------------------------------
#line 1 ORDERS/ORDNAME/POST-FIELD
GOTO 9 WHERE :NEXTPATTERNFLAG = 1;
SELECT CURDATE, BOOKNUM, FORECASTFLAG, DETAILS, REFERENCE, QPRICE, PERCENT, DISPRICE, VAT, 
TOTPRICE, QPROFIT, ADJPRICEFLAG, ADVBAL, ADVPERCENT, BSHN_OPENDATE, TYPE, CLOSED, PCLOSED, 
LEXCHANGE, DOER, AGENT, BRANCH, CURRENCY, CUST, DEAL, DESTCODE, LCURRENCY, ORD, ORD, ORD, ORD,
ORDSTATUS, ORDTYPE, PAY, PHONE, PLIST, PROF, PROJ, SHIPTYPE, USER, WARHS
INTO :ORDERS.CURDATE, :ORDERS.BOOKNUM, :ORDERS.FORECASTFLAG, :ORDERS.DETAILS, 
:ORDERS.REFERENCE, :ORDERS.QPRICE, :ORDERS.PERCENT, :ORDERS.DISPRICE, 
:ORDERS.VAT, :ORDERS.TOTPRICE, :ORDERS.QPROFIT, :ORDERS.ADJPRICEFLAG, :ORDERS.ADVBAL,
:ORDERS.ADVPERCENT, :ORDERS.BSHN_OPENDATE, :ORDERS.TYPE, :ORDERS.CLOSED,
:ORDERS.PCLOSED, :ORDERS.LEXCHANGE, :ORDERS.DOER, :ORDERS.AGENT, :ORDERS.BRANCH, 
:ORDERS.CURRENCY, :ORDERS.CUST, :ORDERS.DEAL, :ORDERS.DESTCODE, :ORDERS.LCURRENCY, 
:ORDERS.LINKDOC, :ORDERS.NSCUST, :ORDERS.ORD, :ORDERS.ORDS, :ORDERS.ORDSTATUS, 
:ORDERS.ORDTYPE, :ORDERS.PAY, :ORDERS.PHONE, :ORDERS.PLIST, 
:ORDERS.PROF, :ORDERS.PROJ, :ORDERS.SHIPTYPE, :ORDERS.USER, :ORDERS.WARHS
FROM ORDERS
WHERE ORDNAME = :ORDERS.ORDNAME;
LABEL 9;
:TABFORM = 22;#line 1 ORDERS/ORDNAME/POST-FIELD
SELECT BRANCH INTO :$.BRANCH FROM USERSA WHERE :$.ORD = 0
AND :$.BRANCH = 0 AND USER = SQL.USER;
COMMIT;
```

When inserting a new record, the built-in triggers verify that imported
data exist in the join table.

> **Example:** Built-in triggers do not allow you to specify an order
> made by a customer that does not appear in the **CUSTOMERS** table.

```sql
#line 1 ORDERS/CUSTNAME/CHECK-FIELD
GOTO 1 WHERE :ORDERS.CUSTNAME = '';
SELECT 'X'
FROM CUSTOMERS
WHERE CUSTNAME = :ORDERS.CUSTNAME;
SELECT 192 INTO :SCREENMSG
FROM DUMMY WHERE :RETVAL = 0;
LABEL 1;
```

Once all columns in any of the join table's unique keys are filled in
(provided that all verification checks are successful), ***Priority***
will automatically fill in any columns in the form that are imported
from that table. Thus, once a valid customer number is designated in the
*Sales Orders* form, the corresponding customer name will be filled in
automatically.

```sql
#line 1 ORDERS/CUSTNAME/POST-FIELD
SELECT CUSTDES, CUST, CUST, CURRENCY, LINKDATE, PAY, SHIPTYPE, MCUST, NSFLAG, PAYCUST, 
SECONDLANGTEXT, VATFLAG
INTO :ORDERS.CUSTDES, :ORDERS.CUST, :ORDERS.CUSTA, :ORDERS.CUSTCURRENCY, 
:ORDERS.CUSTLINKDATE, :ORDERS.CUSTPAY, :ORDERS.CUSTSHIPTYPE, :ORDERS.MCUST, 
:ORDERS.NSFLAG, :ORDERS.PAYCUST, :ORDERS.SECONDLANGTEXT, :ORDERS.VATFLAG
FROM CUSTOMERS
WHERE CUSTNAME = :ORDERS.CUSTNAME;
```



> **Note:** For technical reasons, the **CUSTDES** column is hidden in the
**ORDERS** form, and the **CDES** column is displayed instead. A
POST-FIELD trigger copies the value of **CUSTDES** into **CDES**.



## Insert Triggers 

When a line is exited, ***Priority***'s built-in insert triggers check
that values have been assigned to all the columns comprising any unique
key(s); they provide an automatic value to that table's autounique key
(increasing the autounique counter by 1); and they insert the new record
into the form's base table.

```sql
ORDERS INSERT TRIGGER:
INSERT INTO ORDERS ( CURDATE, ORDNAME, BOOKNUM, FORECASTFLAG, DETAILS, REFERENCE, QPRICE, PERCENT,
DISPRICE, VAT, TOTPRICE, QPROFIT, ADJPRICEFLAG, ADVBAL, ADVPERCENT, TYPE, CLOSED, PCLOSED, 
LEXCHANGE, DOER, AGENT, BRANCH, CURRENCY, CUST, DEAL, DESTCODE, LCURRENCY, ORD, ORD, ORD, ORD,
ORDSTATUS, ORDTYPE, PAY, PHONE, PLIST, PROF, PROJ, SHIPTYPE, USER, WARHS)
VALUES ( :ORDERS.CURDATE, :ORDERS.ORDNAME, :ORDERS.BOOKNUM, :ORDERS.FORECASTFLAG, :ORDERS.DETAILS,
:ORDERS.REFERENCE, :ORDERS.QPRICE, :ORDERS.PERCENT, :ORDERS.DISPRICE, :ORDERS.VAT, :ORDERS.TOTPRICE,
:ORDERS.QPROFIT, :ORDERS.ADJPRICEFLAG, :ORDERS.ADVBAL, :ORDERS.ADVPERCENT, :ORDERS.TYPE, 
:ORDERS.CLOSED, :ORDERS.PCLOSED, :ORDERS.LEXCHANGE, :ORDERS.DOER, :ORDERS.AGENT, :ORDERS.BRANCH,
:ORDERS.CURRENCY, :ORDERS.CUST, :ORDERS.DEAL, :ORDERS.DESTCODE, :ORDERS.LCURRENCY, :ORDERS.LINKDOC,
:ORDERS.NSCUST, :ORDERS.ORD, :ORDERS.ORDS, :ORDERS.ORDSTATUS, :ORDERS.ORDTYPE, :ORDERS.PAY,
:ORDERS.PHONE, :ORDERS.PLIST, :ORDERS.PROF, :ORDERS.PROJ, :ORDERS.SHIPTYPE, :ORDERS.USER,
:ORDERS.WARHS);
SELECT 189 INTO :SCREENMSG FROM DUMMY WHERE :RETVAL = 0;
SELECT ORD, ORD, ORD, ORD
INTO :ORDERS.LINKDOC, :ORDERS.NSCUST, :ORDERS.ORD, :ORDERS.ORDS
FROM ORDERS
WHERE ORDNAME = :ORDERS.ORDNAME;
```

## Update Triggers 

In addition to most of the functions performed by the insert triggers,
***Priority***'s built-in update triggers ensure that no column which
links one form to another form has been updated.

> **Example:** If the **PART** form were linked to the **PARTARC** form
> (which stores child parts) via the part catalogue number
> (**PARTNAME**), then that number could not be changed once a child
> part was assigned. This problem is easily resolved by linking the
> forms through the autounique key (**PART**), as the column in that key
> is not updateable. Rather, its value is automatically assigned by the
> system.

## Delete Triggers 

***Priority***'s delete triggers prevent the violation of referential
integrity. That is, they do not allow the deletion of any record
containing a column that is imported into another form (including the
column that links an upper-level form to its sub-level).

```sql
ORDERS/DELETE TRIGGER:
#line 1 ORDERS/DELETE
SELECT ENTMESSAGE('ORDERITEMS','F',0) INTO :PROGPARAM FROM DUMMY;
SELECT 94 INTO :PROGMSG 
FROM ORDERITEMS WHERE (:$1.ORD <> 0 AND ORD = :$1.ORD );
```

## More on Triggers 

-   [SQL Variables](SQL-Variables )
-   [Creating Your Own Triggers](Creating-your-Triggers )
-   [Error and Warning Messages](Errors-and-Warnings )
-   [Sending a Mail Message](Send-Mail )
-   [Changing Column Titles
    Dynamically](Dynamic-Column-Titles )
-   [Including One Trigger in
    Another](Include-Triggers )
-   [Trigger Errors and
    Warnings](Trigger-Errors )
