---
title: Programming for Priority Web
layout: sdk_nav
group: Programming Tools
tags: 'Priority_SDK'
---

Advanced programming for the ***Priority*** web interface is basically
the same as programming for the Windows interface. However, when working
with the web interface you must keep in mind the different method used
to access the ***Priority*** server. As a result, the following
exceptions apply:

-   When working with attachments, only files located in the **system/mail** folder can be interacted with by the user. Any attachments uploaded by code should be stored in this folder if users need to interact with the attachment. 
-   You cannot use the [EXECUTE
    command](Execution-Statements ) to run entities that
    require input from the user or that display output. This is because
    the entity is executed on the server and any interface opened will
    be displayed on the server rather than on the local computer.

    **Note:** This also extends to ACTIVAT and ACTIVATF if they run an entity that requires input, such as the SHVA program.
-   You cannot add the following syntax to a [procedure
    step](Procedure-Steps ) in order to open a form when
    running a procedure:\
    `EXECUTE WINFORM 'ORDERS';`\
    Instead, add a new procedure step with the desired *Entity Name* and
    the Type **F**.
-   You cannot use the following syntax to a procedure step in order to
    execute a document when running a procedure:\
    `EXECUTE WINACTIV '-P', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS;`\
    `LABEL 199;`\
    Use WINHTML instead.
-   If the value in the *Application* column is 4 characters long and
    ends in 0 (zero), the entity in question will not be displayed when
    working with the web interface.
-   In procedures that load or export data, add the UPLOAD or DOWNLOAD
    step to upload/download the file in question from the local computer
    to the server (or vice versa). Specify the file name in the
    UPLOAD/DOWNLOAD procedure step.

    > **Example:** See the UPLOAD procedure step in the **LOADFNC1**
    > procedure and the DOWNLOAD step in the **ULOADFNC** procedure.


    **Note:** This step is not necessary when opening or saving a file using
    an INPUT parameter of type **CHAR** that is flagged to display a browse
    button (in the *Procedure Parameter Extension* sub-level form).

## Further Reading 

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
