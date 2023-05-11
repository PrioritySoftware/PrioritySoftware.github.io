---
title: Forms
group: Forms
tags: 'Priority_SDK'
---


## Introduction

Forms are constructed and modified in the *Form Generator* form and its
sub-levels (*System Management → Generators → Forms*). They serve a
variety of purposes:

-   They insert records into the database.
-   They retrieve records from the database.
-   They allow for the updating of retrieved records.

All three functions can be simultaneously served by the very same form.
Moreover, you can construct a read-only query form in virtually the same
manner that you design an updateable form.

Forms can be seen as windows into specific database tables. In this
context, there are two types of tables: the form’s base table and its
join tables. Each form is derived from a single base table. Data stored
in any columns of that table can be viewed and modified in the form.
Moreover, new entries in the form will add records to the base table. In
contrast, join tables contain imported data — i.e., data that can be
displayed in the form, but not modified there. A given form can display
data from several different tables; therefore, it can have any number of
join tables.

A form is characterized by:  
-   a unique name
-   a title
-   a base table
-   a set of form columns derived from the columns of the base table
-   additional form columns imported from other tables
-   calculated columns whose values are determined by other columns;
    their values are not stored in any table
-   a set of triggers, which execute commands during form use.

To open a new form and record its attributes, use the appropriate
columns in the *Form Generator*.

## Form Name

The form name is a short name by which the form is identified by the
system. As this name is used in SQL variables in form triggers, there
are certain restrictions (which also apply to form column names):  

- Only alphanumeric values (upper- and lower-case letters and digits)
and the underscore may be used (no spaces).
-   The name must begin with a letter.
-   You may not used a reserved word. A list of reserved words is
    available in the *Reserved Words* form (*System Management →
    Dictionaries*).
-   The name assigned to any newly created forms must begin with a
    common four-letter prefix. This should be the same for all entities
    added to the customer's **Priority** installation (e.g.,
    **ACME_ORDERS**).  

------------------------------------------------------------------------

**Notes:**  
- It is advisable to assign the form the same name as its base table.

- Because SQL variables are based on the form name, any changes in the name must be accompanied by changes in the appropriate SQL statements.

------------------------------------------------------------------------

## Form Title

The form title is the means of identifying the form in the user
interface. The designated title will appear in menus and at the top of
the form when it appears on screen. Changes in form titles do not affect
triggers in any way.

## Base Table

Each form is derived from a single table, known as its base table. The
form serves two interrelated purposes. First, it acts as a window into
the table, displaying the data stored there. Second, it updates the base
table whenever records are added to, deleted from or revised in the
form. The form inherits its columns (including their names, widths,
titles and types) from the base table.

------------------------------------------------------------------------

**Note:** When creating a new form, you should also create a new base
table for it (see [Tables](Tables)).

------------------------------------------------------------------------

## Application

Each form is assigned an application, which is used to classify forms by
the type of data they access (e.g., FNC for the Financials module). When
creating a new form, specify a code word that aids in retrieval.

------------------------------------------------------------------------

**Note:** The application code can be used to define a [target
form](Accessing-Related-Form#The-Target-Form) to be reached
from a given form column.

------------------------------------------------------------------------

## Module

Each form belongs to a given ***Priority*** module. As different modules
are included in each type of ***Priority*** package, users are restricted
to those forms whose modules that have purchased. When creating a new
form, specify “Internal Development.” This way you (and your customers)
will be able to use your own forms no matter which modules
of ***Priority*** have been purchased.

## Query Forms

A query form is one in which the user is not permitted to add, modify or
delete records. Such a form is meant solely to display information
retrieved from the database.

> **Example:** *Warehouse Balances* (**WARHSBAL**) is a query form the
> displays balances per part for the warehouse in question, calculated
> automatically on the basis of recorded warehouse transactions.

It is not necessary to flag any of the columns in a query form as
read-only. In fact, it is advisable to make the columns in the unique
key updateable for the user’s convenience.  
**Tip:** To create a form in which records cannot be inserted or updated, but deletions are allowed, assign [read-only status](Form-Columns#read-only-columns) to all the
form’s columns.

## Blocking Record Deletion

Sometimes you wish to restrict user operations in a given form to
inserts and updates, disallowing record deletions.  

> **Example:** Forms in which constants are defined do not allow for
> record deletion.

## Blocking Definition of a Multi-Company Form

To prevent users from defining a given form as a multi-company form,
specify *x* in the *One-to-many* column.

## When Creating a New Form

When you are designing your own form, once the above attributes have
been designated, the form may be prepared as an executable file and
loaded on screen, and values may be filled in its columns. All [built-in
triggers](Built-in-Triggers) will be activated.  
The result, of course, will be very rough. All columns (including
internal numbers) will be displayed and updateable. Form column
position, which determines the order of form column display, will be
based on the order in which columns were assigned to the table. Thus, it
is likely that you will want to make modifications. And you will
probably wish to import data from other tables. In addition, you will
sometimes need to establish one-to-many relationships (between an
upper-level form and its sub-levels). Finally, you may wish to create
your own triggers.

## Form Capacities

The following list provides the maximum number of various properties of
forms:

-   Form columns - 600
-   Actions - 100
-   Sub-level forms - 100
-   Drilldown (zoom) depth - 10 forms
-   Auto-refresh of upper-level forms when updating a sub-level - up to
    10 form levels above the current form.
-   Sort columns - 10
-   Tables participating in form - 78

The system can prepare up to 25000 forms simultaneously.

{% if site.output == "web" %}
## Further Reading

-   [Form Columns](Form-Columns)
-   [Sub-level Forms](Sub-level-Forms)
-   [Conditions of Record Display and Insertion](Conditions-Record-Display)
-   [Actions](Actions)
-   [Form Refresh](Form-Refresh)
-   [Accessing a Related Form](Accessing-Related-Form)
-   [Creating a Text Form](Create-Text-Form)
-   [Creating a Default Design for a Form](Default-Design)
-   [Form Triggers](Form-Triggers)
-   [Form Preparation](Form-Preparation)
-   [Help Messages](Help-Messages)
-   [Rules for Customizing](Customization-Rules)
{% endif %}