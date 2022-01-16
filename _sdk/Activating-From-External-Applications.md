---
title: Activating Priority Entities from an External Application
layout: sdk_nav
group: Programming Tools
tags: 'Priority_SDK'
---

## Open a Record from a Hyperlink
To open a ***Priority***entity from a hyperlink, it should point to the following location
(parameters are explained below):

> *priority:priform\@FORMNAME:DOCUMENTNUM:COMPANY:TABINIFILE:LANG*


-   *FORMNAME* is the name of the ***Priority*** entity you want to
    activate (e.g., **ORDERS**). If this is not a form, it must be
    followed by the initial representing the entity type (P =
    procedure; R = report). For example, to activate the *Project
    Reports* procedure, you would use the following syntax:\
    > priform@WWWDB_TRANSORDER_p.P
-   *DOCUMENTNUM* is the ID number of the **\'\'Priority**\'\' record
    you want to retrieve in the designated form (not relevant when
    activating other types of entities). This is the value of the key
    column in the form\'s base table. For example, in the **ORDERS**
    form this would be the value of the **ORDNAME** column; in the
    **CUSTOMERS** form, it would be the value of the **CUSTNAME**
    column. This can be left blank to simply open the form.
-   *COMPANY* is the name of the ***Priority*** company in which you are
    executing the command.
-   *TABINFILE* is the name of the *tabula.ini* file (for example:
    *tabdev.ini*)
-   *LANG* is the ID number of the language in which you want the form
    to open, as defined in the *Languages* form (e.g., for American
    English, specify 3).

## Open a Record from the Command Prompt (Windows only)
To open a ***Priority*** entity from the command prompt (e.g.,
from within an external application), use the following syntax
(parameters are explained below):

> *x:\\priority\\priform.exe
> priform\@FORMNAME:DOCUMENTNUM:COMPANY:TABINIFILE:LANG*

If you are running this command from an external application,
    *x:\\priority* is the folder in which ***Priority*** client files
    are located on the workstation.

------------------------------------------------------------------------

**Note:** Unlike the Windows client, the web client does not provide a
means of receiving a username and password as parameters when activating
a form. If users are not already logged into ***Priority*** on the
workstation in question, they will need to enter a username and password
before they can view any data.

------------------------------------------------------------------------


