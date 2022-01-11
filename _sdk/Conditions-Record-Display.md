---
title: Conditions of Record Display and Insertion
layout: sdk_nav
group: Forms
---

## Introduction

***Priority*** allows for two types of condition:

-   a simple query condition, which restrict the records from the base
    table that can be retrieved into the form
-   an Assign condition, which both restricts record display in the form
    and assigns the designated value to new records.

To specify a condition (regardless of type), use the
*Expression/Condition* column of the *Form Column Extension* form (a
sub-level of *Form Columns*). If it is too long to fit in that column,
continue in the sub-level form.

Once the *Form Column Extension* form is exited, a check mark appears in
the *Expression/Condition* column of its upper-level form, *Form
Columns*. This flag makes it easy to find any form column with a
condition.

## Query Condition --- Record Display 

Query conditions restrict the records from the base table that can be
accessed by the form in question. The condition must begin with a
comparative operator (\<, \>, \<=, \>=, \<\>, =). Only records that
comply with the prescribed condition will appear in the form.

Of course, users can add their own query conditions from within the
form. Yet, whereas user stipulations change for each data retrieval (in
keeping with the current situation), the predefined query conditions
will always apply.

> **Example:** To restrict the display of records in the **WARHSBAL**
> form to parts with actual balances in the warehouse, the following
> condition would be written for the **TBALANCE** column: >0. This
> condition should be written in any form that displays such balances.
> Hence, while the **WARHSBAL** table will include records with a
> balance of 0, only those records which meet the condition will appear
> in each of the forms.

As mentioned earlier, you should also use a simple query condition to
link a query sub-level to its upper-level form. For instance, the
condition linking a balance to its respective warehouse
(=:WAREHOUSES.WARHS) restricts displayed balances to those for this
particular warehouse. Without this restriction, balances for all
warehouses would appear.

You include the operator (=) in this condition so that the user can
delete records from the upper-level form even though records appear in
the sub-level. The reason for this usage is that the built-in delete
triggers do not allow the deletion of any records in an upper-level form
when there are records with ***assigned values*** in the sub-level form.
As opposed to Assign conditions, which assign values into each record in
the sub-level, a simple query condition does not. Hence, deletion will
not be blocked.

## Assign Condition --- Record Display and Insertion 

An Assign condition is distinguished from a simple query condition in
that no comparative operator is used. This type of condition not only
restricts record display in the form to those records that hold a
certain value, but also assigns that value to each new record. You are
already familiar with one Assign condition --- the one that links an
updatable sub-level form to its upper-level (e.g., ORDERS.ORD). This
condition, written in this case for the **ORD** column of the
**ORDERITEMS** form, has a two-fold effect:

-   It assigns an internal value (the value of **ORD** in the **ORDERS**
    form) to the **ORD** column of the **ORDERITEMS** form, whenever a
    new record is added.
-   It restricts record display to those ordered items which contain
    that value in their **ORD** column.

> **Example:** All order items in order 0998 will receive a value of
> "13" in their **ORD** column, whereas all items in order 1010 will
> receive an internal value of "22." Consequently, the former set of
> ordered goods will appear in the **ORDERITEMS** form under order 0998,
> while the latter set will appear under order 1010.

Another use of an Assign condition is to distinguish between data
records that are stored in the same table but displayed in different
forms.

> **Example:** Consider the following forms, all based on the
> **DOCUMENTS** table: *Customer Shipments* (**DOCUMENTS_D**), *Goods
> Receiving Vouchers* (**DOCUMENTS_P**) and *Warehouse Transfers*
> (**DOCUMENTS_T**). The records in these three forms are distinguished
> by their type (*D* for shipment, *P* for GRV and *T* for transfer).
> Thus, for example, the condition 'D' is written for the **TYPE**
> column of the **DOCUMENTS_D** form. Consequently, whenever a new
> record is inserted in the form, the hidden **TYPE** column is
> automatically assigned a value of *D*. Moreover, data retrieval will
> only retrieve records from the **DOCUMENTS** table that have a type of
> *D*. Similar conditions are written for the **TYPE** columns of
> **DOCUMENTS_P** and **DOCUMENTS_T** (*P* and *T*, respectively).

## Further Reading 

-   [Forms](Forms )
-   [Form Columns](Form-Columns )
-   [Sub-level Forms](Sub-level-Forms )
-   [Direct Activations](Direct-Activations )
-   [Form Refresh](Form-Refresh )
-   [Accessing a Related Form](Accessing-a-Related-Form )
-   [Creating a Text Form](Creating-a-Text-Form )
-   [Designing a Screen-Painted
    Form](Designing-a-Screen-Painted-Form )
-   [Form Triggers](Form-Triggers )
-   [Form Preparation](Form-Preparation )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Rules-for-Customizing )
