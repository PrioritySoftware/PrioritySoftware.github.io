---
title: Sub-level Forms
layout: sdk_nav
group: Forms
tags: 'Priority_SDK'
---

## Introduction

***Priority*** forms are grouped within logical contexts into a
tree-like configuration, representing one-to-many or one-to-one
relationships. The root of the tree is the form which is accessed
directly from a menu (e.g., *Sales Orders*); that is, it has no
upper-level forms of its own. The branches of the tree are the sub-level
forms of the root form, their sub-levels and so on. Any given form can
have several sub-levels on the same level.

> **Example:** *Order Items* and *Tasks* are both sub-levels of the
> *Sales Orders* form.

## Relationships Between Upper- and Sub-level Forms

The relationship between an upper-level form and its sub-level may be:

-   *one-to-many* — multiple records in the sub-level form are linked to
    a single record in the upper-level form
-   *one-to-one* — a single record in the sub-level is linked to the
    record in the upper-level form.

Generally, the relationship between forms is one-to-many. For instance,
each sales order can have several different order items. Sometimes,
however, you wish to limit the sub-level form to a single record.

To obtain a one-to-one relationship, specify *N* in the *One-to-Many*
column of the *Form Generator* form at the record for the sub-level
form.

## Linking Upper-level and Sub-level Forms

A sub-level form is used to display data that are relevant for a single
record in its upper-level form. This linkage between the upper and
sub-level form is executed through one or more columns. If the
upper-level form has an autounique key, the link is made through the
column comprising that key. Otherwise, the link is made through each
column of its unique key.

> **Example:** It is important to ensure that the parts ordered in Order
> 1000 are linked to the record of that order in the *Sales Orders*
> form, while the parts ordered in Order 1007 are linked to the record
> of that order. Thus, the **ORD** column in the *Order Items* form is
> equated with the **ORD** column in the *Sales Orders* form.

The linkage is created by means of a condition written for the relevant
column in the sub-level form (e.g., the **ORD** column in the *Order
Items* form).

In the case of an ***updatable*** sub-level (like *Order Items*), use
the following format:

  
*:formname.columnname*

That is, begin with a colon, followed by the name of the upper-level
form, a period, and finally the name of the column in the upper-level
form to which the linkage is made (e.g., :ORDERS.ORD).

If the sub-level is a ***query*** form (like *Warehouse Balances*), add
an equal sign to the beginning of the condition:

  
*=:formname.columnname*

The addition of the equal sign allows users to delete records from the
upper-level form even though records appear in the sub-level.

Specify this condition in the *Expression/Condition* column of the *Form
Column Extension* form, a sub-level of the *Form Columns* form.


**Notes:**

-   You can use the double dollar sign ($$) as a wildcard in place of
    the upper-level form name (e.g., :$$.ORD). Moreover, if the link is
    made between columns having identical names, you can use the @ sign
    as a wildcard in place of the form column name (e.g., :$$.@).  
-   For a detailed explanation of conditions, see [Conditions of Record
    Display and
    Insertion](Conditions-Record-Display ).


## Creating a Form Tree

In addition to linking a sub-level form to its upper-level via their
common record, you also have to locate them within a form tree. As a
given upper-level form can have several sub-levels, you need to
determine the order in which sub-levels appear (e.g., in the list of
sub-levels). Each sub-level form’s position is defined by an integer:
the lower the integer, the higher the position. Assign the lowest
integer to the most frequently used sub-level form, which will then
serve as the default sub-level. Integers need not be consecutive.

To link a sub-level form to its upper-level form and to define its
position, use either the *Sub-level Forms* form or the *Upper-level
Forms* form. Both are sub-levels of the *Form Generator* form.

## Linking the Tree to a Menu

In addition, the root form of a form tree should be linked to a menu,
from which it will be loaded (alternatively, the root form can be
activated from within another form via an [Action](Actions)). As a menu generally
contains several items, you are required to indicate the position of the
root form within the menu (specify an integer). Again, the lower the
integer, the higher the position of the form in relation to other items
appearing in the menu.

Linkage between a root form and its menu is stored in the **MENU**
table.

To link a root form to a menu and to define its position, use either the
*Menu/Form Link* form, a sub-level of the *Form Generator* form, or the
*Menu Items* form, a sub-level of the *Menu Generator* form.

## Further Reading

-   [Forms](Forms )
-   [Form Columns](Form-Columns )
-   [Conditions of Record Display and
    Insertion](Conditions-Record-Display )
-   [Actions](Actions)
-   [Form Refresh](Form-Refresh )
-   [Accessing a Related Form](Accessing-Related-Form )
-   [Creating a Text Form](Create-Text-Form )
-   [Designing a Screen-Painted
    Form](Designing-a-Screen-Painted-Form )
-   [Form Triggers](Form-Triggers )
-   [Form Preparation](Form-Preparation )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
