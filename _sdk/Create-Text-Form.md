---
title: Creating a Text Form
group: Forms
tags: 'Priority_SDK'
---

## Introduction

A text form is a one-column form of **CHAR** type which allows the user
to write unlimited comments applicable to a given record in a given
form. ***Priority*** provides a program that enables you to
automatically construct text forms (and their corresponding tables) and
link them to the proper upper-level form. The text form will inherit the
name of the upper-level form, with the addition of the characters
**TEXT**, as well as its application code. Moreover, it will receive the
title *Remarks*. You may, of course, revise any of these (in the *Form
Generator* form).

> **Note:** The newly created table will inherit the name of the base
table for the upper-level form, with the addition of the characters
**TEXT**, as well as its table type.

To automatically create a text form and link it to its upper-level form,
run the *Create Text Form* program (*System Management → Generators →
Forms*).

The newly created text form will appear in the *Form Generator* form,
and its linkage to the upper-level form will be displayed through the
appropriate forms (*Sub-level Forms* and *Upper-level Forms*). Its base
table will appear in the *Table Dictionary*. See also [Text Form
Variables](SQL-Variables#Text-Form-Variables ).

## Removing HTML Tags from a Text Table 

All text tables in **\'\'Priority***(e.g., **PARTTEXT**, **ORDERSTEXT**)
contain HTML tags. Sometimes, however, you may want to receive the
content of these tables without the HTML tags --- for example, when exporting ***Priority*** data to an external database. You can use the **DELHTML** compiled program to delete HTML tags from any text table that has the structure defined below.



> **Important note:** Do ***not*** run this program on the original table.
Instead, create a linked table on which the program can run, so that the
original table will not be affected.



You can run the **DELHTML** program on any text table that is composed
of the following columns and unique key:\
**Table Columns:**

1.  **IDCOLUMN1**
2.  **IDCOLUMN2**
3.  **IDCOLUMN3**
4.  **IDCOLUMN4**
5.  **TEXT**
6.  **TEXTORD**
7.  **TEXTLINE**

**Unique Key:**

1.  **IDCOLUMN1**
2.  **IDCOLUMN2**
3.  **IDCOLUMN3**
4.  **IDCOLUMN4**
5.  **TEXTLINE**



> **Note:** **IDCOLUMN1** - **IDCOLUMN4** refer to identifying columns
included in the table\'s unique key, such as **PART, ORD, ORDI**.
**IDCOLUMN2, IDCOLUMN3**, and **IDCOLUMN4** apply to tables whose unique
key comprises more than two columns, such as **USEREDUCATIONTEXT**.



The **DELHTML** program receives a table name and a linked table as
input. Its output is the linked table in which all HTML tags have been
removed from the **TEXT** column.



**Example:** To delete HTML tags from the **PARTTEXT** table for Part
'010', the following code would be used:

```sql
:PART = 0;
SELECT PART INTO :PART FROM PART WHERE PARTNAME = '010';
SELECT SQL.TMPFILE INTO :TXT FROM DUMMY;
LINK PARTTEXT TO :TXT;
GOTO 99 WHERE :RETVAL <= 0;
INSERT INTO PARTTEXT SELECT * FROM PARTTEXT ORIG 
WHERE PART = :PART AND TEXT <> ''; 
/* Don't insert empty lines into the link table */
UNLINK PARTTEXT;
/* text with HTML tags */
SELECT TEXT FROM PARTTEXT WHERE PART = :PART FORMAT;
EXECUTE DELHTML 'PARTTEXT', :TXT;
LINK PARTTEXT TO :TXT;
GOTO 99 WHERE :RETVAL <= 0;
/* same text without HTML tags */
SELECT TEXT FROM PARTTEXT WHERE PART = :PART FORMAT;
UNLINK PARTTEXT;
LABEL 99;
```

{% if site.output == "web" %}
## Further Reading 

-   [Forms](Forms )
-   [Form Columns](Form-Columns)
-   [Sub-level Forms](Sub-level-Forms)
-   [Conditions of Record Display and Insertion](Conditions-Record-Display)
-   [Actions](Actions)
-   [Form Refresh](Form-Refresh)
-   [Accessing a Related Form](Accessing-Related-Form)
-   [Form Triggers](Form-Triggers)
-   [Form Preparation](Form-Preparation)
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules)
{% endif %}