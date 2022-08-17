---
title: User Identification for Priority Lite/Dashboards
layout: sdk_nav
group: Priority Lite
tags: 'Priority_SDK'
---

## Introduction

Often, there is a need to identify the user who runs the procedure -- as
a customer, vendor or internal user -- and to display relevant user data
(e.g., address). User identification is carried out via the company
phone book or the list of users (that is, the data in the **PHONEBOOK,
PHONEBOOKA** and **USERS** tables).

To have the procedure identify the user before it runs:

-   In the *Procedure Generator*, choose the appropriate value in the
    *Internet Access* column. Specify *Y* for all (customers, vendors
    and internal users); *T* for walk-in customers (e.g., for the
    Storefront) and *U* for internal users only (e.g., for internal
    reports, data input by users). Or specify *I* for no privilege
    checks.

The value of the first parameter in the cursor is saved in a variable
called HTMLVALUE. This is a system variable of **CHAR** type, and it
must be converted to an integer using the [ATOI
function](Scalar-Expressions#Strings ). Using
HTMLVALUE you can retrieve the relevant record (the one being printed)
from the main table of the document in question.

To identify the user from within the procedure, use the [SQL.WEBID
variable](SQL-Functions-Variables#SystemFunctions ). When
users log in using their e-mail address, this variable receives the
value of the **PHONEBOOK.PHONE** column. In procedures that are defined
for internal users only, users can also log in with their username. In
such a case, the SQL.WEBID variable receives the value of the
**USERS.USER** column, multiplied by -1.

**Tip:** To display report data that is specific to a given
customer/vendor/user, make the appropriate joins in the report to
SQL.WEBID.

> **Example:** To obtain a list of the customer's orders, use the join
>
> ```sql
> WHERE PHONEBOOK.PHONE = SQL.WEBID
> AND PHONEBOOK.CUST = ORDERS.CUST 
> ```


## Further Reading 

-   [Designing HTML Reports for Priority
    Lite/Dashboards](Designing-HTML-Reports-for-Priority-Lite/Dashboards )
-   [Additional Input Options (Priority
    Lite/Dashboards)](Additional-Input-Options-(Priority-Lite/Dashboards) )
-   [Defining a Base Page for HTML Pages (Priority
    Lite/Dashboards)](Defining-a-Base-Page-for-HTML-Pages-(Priority-Lite/Dashboards) )
-   [Writing Dashboard
    Procedures](Writing-Dashboard-Procedures )
-   [Priority Lite and
    Dashboards](Priority-Lite-and-Dashboards )
