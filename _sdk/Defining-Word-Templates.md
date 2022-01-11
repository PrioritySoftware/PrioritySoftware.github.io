---
title: Defining Word Templates for Specific Records
layout: sdk_nav
group: Programming Tools
---

Suppose you have defined several Word templates in a given
[form](Forms ), and you want to use a particular one when
sending specific form records to Word. This can be achieved by adding a
form column of **INT** type, whose name contains the string **AWORD**
(e.g., **PRIV_AWORD**). This column receives the number of one of the
Word templates defined for the form in question.

**Note:** Word templates are saved as form messages and assigned a
negative number (hence, they do not appear in the *Error & Warning
Messages* sub‑level of the *Form Generator* form).

In the following example, several Word templates have been defined for
the *Tasks* form, and you want to use the designated *Task Code* to
determine which template is used for each task.

1.  Add a new column to the **CUSTTOPICS** table: **PRIV_AWORD** --
    **INT**, 8, *Word Template*.

2.  \# Add the following columns to the **CUSTTOPICS** form:

  
    |     Form Column Name    	|     Column Name    	|     Table Name    	|     Column ID    	|     Join Column    	|     Join Table    	|     Join ID    	|
    |-------------------------	|--------------------	|-------------------	|------------------	|--------------------	|-------------------	|----------------	|
    |     PRIV_AWORD          	|     PRIV_AWORD     	|     CUSTTOPICS    	|     0            	|     NUM            	|     TRIGMSG       	|     5?         	|
    |     PRIV_MESSAGE        	|     MESSAGE        	|     TRIGMSG       	|     5            	|                    	|                   	|     0          	|
    |     PRIV_EXEC           	|     EXEC           	|     TRIGMSG       	|     5            	|                    	|                   	|     0          	|

    **Note:** The **TRIGMSG** table is outer-joined because a Word  template can be deleted.


1.  Hide the **PRIV_EXEC** column and mark the **PRIV_MESSAGE** column
    as read‑only.
2.  Create a PRE-FORM trigger (PRIV_PRE-FORM) in the **PRIV_EXEC**
    column, which retrieves the internal number of the **CUSTNOTESA**
    form:
    ```sql
    `:PRIV_EXEC = 0;`
    `SELECT EXEC INTO :PRIV_EXEC`
    `FROM EXEC WHERE ENAME = 'CUSTNOTESA'`
    `AND TYPE = 'F';`
    ```
3.  Set the value of the **PRIV_EXEC** form column in the *Form Column
    Extension* sub-level form, in the *Expression/Condition* column:\
    <code> = :PRIV_EXEC /* the variable was initiated in PRIV_PRE-FORM */</code>
4.  In the *Error & Warning Messages* form, add message 501:\
    "Select a value from the Choose list."

5.  Add the following 3 triggers to the **PRIV_AWORD** form column:
    -   PRIV_CHECK-FIELD\
        ```sql
        ERRMSG 501 WHERE :$.@ <> 0 AND NOT EXISTS
        (SELECT * FROM TRIGMSG WHERE EXEC = :PRIV_EXEC
        AND NUM = :$.@
        AND NUM < 0);
        ```
    -   PRIV_CHOOSE-FIELD\
        List of Word templates defined for Tasks (CUSTNOTESA) form
        ```sql
        SELECT MESSAGE, ITOA(NUM) FROM TRIGMSG
        WHERE EXEC = :PRIV_EXEC
        AND NUM < 0
        ORDER BY 2;
        ```
    -   PRIV_POST-FIELD
        ```sql
        :$.PRIV_EXEC = :PRIV_EXEC;
        ```
6.  Add a hidden column to the **CUSTNOTESA** form:
    |     Form   Column Name    	|     Column   Name    	|     Table   Name    	|
    |---------------------------	|----------------------	|---------------------	|
    |     PRIV_AWORD            	|     PRIV_AWORD       	|     CUSTTOPICS      	|

This column is filled in with the number of the template defined for the
task code of the current task. Thereafter, when a user chooses to send a
task to Word, if the task code of the task in question has been assigned
a Word template, the information is sent directly to the designated
template.

If the user flags the **All Displayed Records** option, those records
with a different Word template than that defined for the current record
are not sent to Word.
