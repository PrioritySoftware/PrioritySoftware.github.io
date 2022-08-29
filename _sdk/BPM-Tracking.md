---
title:  Enable Document Tracking
group: BPM
tags: 'Priority_SDK'
---


If you want to allow users to add documents from this form to their
Tracking List, add the following hidden columns to the **MYDOC** form
(listed are the *Form Column Name*, *Table Name* and *Column Name*,
respectively):

> **Note:** As these columns are the same in any document that allows
tracking, you can use existing standard forms as a guideline (e.g.
**ORDERS**).



1.  **FOLLOWUPIV, MYDOC, MYDOC**. This column contains the autounique
    key of the **XXXX_MYDOC** table (the same as the **MYDOC** column).
    Add an outer join to the **FOLLOWUPLIST** table (*Join Column*
    **IV**, *Join Table* **FOLLOWUPLIST**, *Join ID* **?** (outer
    join)).
2.  **FOLLOWUPTYPE, TYPE, FOLLOWUPLIST**. In *Form Column Extension*,
    specify the *Column Type* **CHAR**.
3.  **FOLLOWUPUSER, USER, FOLLOWUPLIST**. In *Form Column Extension*,
    specify the *Expression/Condition* **SQL.USER**.

The next step is to [update the STATUSTYPES
table](BPM-Statustypes ).
