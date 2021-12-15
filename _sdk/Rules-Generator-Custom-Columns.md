---
title: Using Custom Form Columns in the Business Rules Generator
layout: sdk_nav
---

The Business Rules Generator enables users to set up error, warning,
e-mail or text messages (SMS) that are triggered automatically when
certain conditions are met. When the action selected is *Send e-mail* or
*Send text msg*, users can choose to send the e-mail/text message to any
of the form columns appearing in the provided Choose list. If you want a
custom form column to appear in this Choose list, it must meet one of
the following conditions:

-   The name of a [calculated form
    column](Form_Columns#Calculated_Columns "wikilink") must contain the
    following string: **EMAIL** (e.g., **PRIV_ORDEMAIL**). The e‑mail or
    text message will be sent to the address or phone number defined in
    that form column.
-   A regular form column must be taken from one of the following
    tables/table columns:
    -   \'\'\'CUSTOMERS (CUSTNAME)
    -   \'\'\'SUPPLIERS (SUPNAME)
    -   \'\'\'AGENTS (AGENTNAME )
    -   \'\'\'USERSB (SNAME)
    -   \'\'\'PHONEBOOK (NAME)
    -   \'\'\'USERS (USERLOGIN)
    -   **UGROUPS (GROUPNAME)**

In such a case, the Business Rules Generator uses the e-mail address or
phone number defined in the specified table: **CUSTOMERS.EMAIL/PHONE,
SUPPLIERS.EMAIL/PHONE, AGENTS.EMAIL/PHONE, USERSB.EMAIL/CELLPHONE,
PHONEBOOK.EMAIL/CELLPHONE**. For form columns taken from the **USERS**
table, the e-mail/text message will be sent to the employee associated
with the specified user (in the *Personnel File* form). For form columns
taken from the **UGROUPS** table, the e-mail/text message will be sent
to the members of the specified group.

## Further Reading {#further_reading}

[Click](Advanced_Programming_Tools "wikilink") for information on
additional advanced programming tools.
