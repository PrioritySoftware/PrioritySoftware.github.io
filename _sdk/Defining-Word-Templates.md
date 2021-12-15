---
title: Defining Word Templates for Specific Records
layout: sdk_nav
---

Suppose you have defined several Word templates in a given
[form](Forms "wikilink"), and you want to use a particular one when
sending specific form records to Word. This can be achieved by adding a
form column of **INT** type, whose name contains the string **AWORD**
(e.g., **PRIV_AWORD**). This column receives the number of one of the
Word templates defined for the form in question.

------------------------------------------------------------------------

**Note:** Word templates are saved as form messages and assigned a
negative number (hence, they do not appear in the *Error & Warning
Messages* sub‑level of the *Form Generator* form).

------------------------------------------------------------------------

In the following example, several Word templates have been defined for
the *Tasks* form, and you want to use the designated *Task Code* to
determine which template is used for each task.

1.  Add a new column to the **CUSTTOPICS** table: **PRIV_AWORD** --
    **INT**, 8, *Word Template*.

```{=html}
<!-- -->
```
1.  \# Add the following columns to the **CUSTTOPICS** form:
    +---------+---------+---------+---------+---------+---------+---------+
    | ```     | ```     | ```     | ```     | ```     | ```     | ```     |
    | {=html} | {=html} | {=html} | {=html} | {=html} | {=html} | {=html} |
    | <       | <       | <       | <       | <       | <       | <       |
    | center> | center> | center> | center> | center> | center> | center> |
    | ```     | ```     | ```     | ```     | ```     | ```     | ```     |
    | **Form  | *       | **Table | *       | **Join  | **Join  | **Join  |
    | Column  | *Column | Name**  | *Column | C       | Table** | ID**    |
    | Name**  | Name**  |         | ID**    | olumn** |         |         |
    |         |         | ```     |         |         | ```     | ```     |
    | ```     | ```     | {=html} | ```     | ```     | {=html} | {=html} |
    | {=html} | {=html} | </      | {=html} | {=html} | </      | </      |
    | </      | </      | center> | </      | </      | center> | center> |
    | center> | center> | ```     | center> | center> | ```     | ```     |
    | ```     | ```     |         | ```     | ```     |         |         |
    +---------+---------+---------+---------+---------+---------+---------+
    | PRI     | PRI     | CUS     | ```     | ```     | TRIGMSG | ```     |
    | V_AWORD | V_AWORD | TTOPICS | {=html} | {=html} |         | {=html} |
    |         |         |         | <       | <       |         | <       |
    |         |         |         | center> | center> |         | center> |
    |         |         |         | ```     | ```     |         | ```     |
    |         |         |         | 0       | NUM     |         | 5?      |
    |         |         |         |         |         |         |         |
    |         |         |         | ```     | ```     |         | ```     |
    |         |         |         | {=html} | {=html} |         | {=html} |
    |         |         |         | </      | </      |         | </      |
    |         |         |         | center> | center> |         | center> |
    |         |         |         | ```     | ```     |         | ```     |
    +---------+---------+---------+---------+---------+---------+---------+
    | PRIV_   | MESSAGE | TRIGMSG | ```     |         |         | ```     |
    | MESSAGE |         |         | {=html} |         |         | {=html} |
    |         |         |         | <       |         |         | <       |
    |         |         |         | center> |         |         | center> |
    |         |         |         | ```     |         |         | ```     |
    |         |         |         | 5       |         |         | 0       |
    |         |         |         |         |         |         |         |
    |         |         |         | ```     |         |         | ```     |
    |         |         |         | {=html} |         |         | {=html} |
    |         |         |         | </      |         |         | </      |
    |         |         |         | center> |         |         | center> |
    |         |         |         | ```     |         |         | ```     |
    +---------+---------+---------+---------+---------+---------+---------+
    | PR      | EXEC    | TRIGMSG | ```     |         |         | ```     |
    | IV_EXEC |         |         | {=html} |         |         | {=html} |
    |         |         |         | <       |         |         | <       |
    |         |         |         | center> |         |         | center> |
    |         |         |         | ```     |         |         | ```     |
    |         |         |         | 5       |         |         | 0       |
    |         |         |         |         |         |         |         |
    |         |         |         | ```     |         |         | ```     |
    |         |         |         | {=html} |         |         | {=html} |
    |         |         |         | </      |         |         | </      |
    |         |         |         | center> |         |         | center> |
    |         |         |         | ```     |         |         | ```     |
    +---------+---------+---------+---------+---------+---------+---------+

    ------------------------------------------------------------------------

    **Note:** The **TRIGMSG** table is outer-joined because a Word
    template can be deleted.

    ------------------------------------------------------------------------
2.  Hide the **PRIV_EXEC** column and mark the **PRIV_MESSAGE** column
    as read‑only.
3.  Create a PRE-FORM trigger (PRIV_PRE-FORM) in the **PRIV_EXEC**
    column, which retrieves the internal number of the **CUSTNOTESA**
    form:\
    `:PRIV_EXEC = 0;`\
    `SELECT EXEC INTO :PRIV_EXEC`\
    `FROM EXEC WHERE ENAME = 'CUSTNOTESA'`\
    `AND TYPE = 'F';`
4.  Set the value of the **PRIV_EXEC** form column in the *Form Column
    Extension* sub-level form, in the *Expression/Condition* column:\
    `= :PRIV_EXEC /* the variable was initiated in PRIV_PRE-FORM */`
5.  In the *Error & Warning Messages* form, add message 501:\
    \"Select a value from the Choose list.\"
6.  Add the following 3 triggers to the **PRIV_AWORD** form column:
    -   PRIV_CHECK-FIELD\
        `ERRMSG 501 WHERE :$.@ <> 0 AND NOT EXISTS`\
        `(SELECT * FROM TRIGMSG WHERE EXEC = :PRIV_EXEC`\
        `AND NUM = :$.@`\
        `AND NUM < 0);`
    -   PRIV_CHOOSE-FIELD\
        /\* List of Word templates defined for Tasks (CUSTNOTESA) form
        \*/\
        `SELECT MESSAGE, ITOA(NUM) FROM TRIGMSG`\
        `WHERE EXEC = :PRIV_EXEC`\
        `AND NUM < 0`\
        `ORDER BY 2;`
    -   PRIV_POST-FIELD\
        `:$.PRIV_EXEC = :PRIV_EXEC;`
7.  Add a hidden column to the **CUSTNOTESA** form:\
      ---------------------- ----------------- ----------------
      **Form Column Name**   **Column Name**   **Table Name**
      PRIV_AWORD             PRIV_AWORD        CUSTTOPICS
      ---------------------- ----------------- ----------------

This column is filled in with the number of the template defined for the
task code of the current task. Thereafter, when a user chooses to send a
task to Word, if the task code of the task in question has been assigned
a Word template, the information is sent directly to the designated
template.

If the user flags the **All Displayed Records** option, those records
with a different Word template than that defined for the current record
are not sent to Word.

## Further Reading {#further_reading}

[Click](Advanced_Programming_Tools "wikilink") for information on
additional advanced programming tools.
