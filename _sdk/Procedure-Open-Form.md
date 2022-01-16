---
title: Open Form Record from within a Procedure
layout: sdk_nav
group: Procedures
tags: 'Priority_SDK'
---

You can use SQL commands to open a given form and retrieve a given
record. This is useful, for instance, when you want to create a new
Action from the *Sales Orders* form that will open a customer
shipment. In this example, once the document is successfully opened, the
*Customer Shipments* form opens and the new document is retrieved
automatically.

The following gives some basic guidelines for creating such an Action:

1.  Define an [interface](Interfaces ) (e.g.,
    **YUVV_OPENDOC_D**) using the **GENERALLOAD** load table to open the
    **DOCUMENTS_D** form. In the interface definition, the **TEXT1**
    column will update the **ORDNAME** column in the **DOCUMENTS_D**
    form.
2.  Create a [procedure](Procedures ) that runs the interface,
    and make it a Direct Activation from the **ORDERS** form. The
    procedure should include an INPUT step with a PAR parameter of
    **LINE** type, taken from the **ORDERS** table (where *Column Name*
    = **ORDNAME**). In the procedure, record the following in the SQLI
    step:

> ```sql
> LINK ORDERS TO :$.PAR;
> ERRMSG 1 WHERE :RETVAL <= 0;
>
> :ORDNAME = '';
> SELECT ORDNAME INTO :ORDNAME 
> FROM ORDERS 
> WHERE ORD <> 0;
>
> UNLINK ORDERS;
> ERRMSG 2 WHERE :ORDNAME = '';
>
> LINK GENERALLOAD TO :$.GEN;
> ERRMSG 1 WHERE :RETVAL <= 0;
>
> INSERT INTO GENERALLOAD(LINE,RECORDTYPE,TEXT1)
> VALUES(1,'1',:ORDNAME);
>
> EXECUTE INTERFACE 'YUVV_OPENDOC_D',SQL.TMPFILE,'-L',:$.GEN;
>
> :DOCNO = '';
> SELECT DOCNO INTO :DOCNO 
> FROM DOCUMENTS 
> WHERE TYPE = 'D' 
> AND DOC = (SELECT ATOI(KEY1) 
> FROM GENERALLOAD 
> WHERE LINE = 1 
> AND LOADED = 'Y');
>
> UNLINK GENERALLOAD;
> ERRMSG 3 WHERE :DOCNO = '';
> 
> :$.DNO = :DOCNO; /* :$.DNO will be used in the next step to open the ORDERS form in a 
> web client - see below */
>
> GOTO 9 WHERE :SQL.NET = 1;
>
> /* to open the form and retrieve newly created record in Windows client: */
> EXECUTE WINFORM 'DOCUMENTS_D','',:DOCNO, '','2';
>
> LABEL 9;
> ```

<!-- TODO: Fix example and text for Web oriented development -->
If you are working with the ***Priority*** web interface, add another
procedure step that is not executed in the Windows client (use the GOTO
procedure step to skip it). In this additional step, the *Entity
Name* = **ORDERS** and the *Type* = **F**. In the *Procedure Parameters*
sub-level form, add the parameter DNO (with type **CHAR**).

## Further Reading 

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
