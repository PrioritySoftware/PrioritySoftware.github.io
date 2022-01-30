---
title: Table Keys
layout: sdk_nav
group: Tables
tags: 'Priority_SDK'
---

## Introduction

The last step in table construction is to specify the keys attached to
the table, the columns that make up each key, and the priority of each
column within the key. Keys are also assigned priorities, but this is
only relevant for certain types (see [Rules for
Keys](#Rules-for-Keys )). The order in which keys and key
columns are designated determines their priorities.

Keys are used to provide access to records in the table. Autounique and
unique keys ensure that no two records in a given table will have
identical values in the columns making up these keys.

## The Autounique Key 

The autounique key is similar to the identity column in MSSQL or
sequence in Oracle. It allows you to create a column that will
automatically distinguish between all records in the table. This column
automatically receives a unique integer each time a record is added.

> **Example:** The autounique key comprised of the **CUST** column
> assigns a unique internal number to each customer. This is
> distinguished from the user-assigned customer number (**CUSTNAME**)
> that appears in the forms.

The autounique key is an effective means of joining tables in a form.
For example, the customer number appears both in the *Customers* form
and the *Orders* form. Rather than joining the **CUSTOMERS** and
**ORDERS** tables through the customer number, they are joined through
the **CUST** column. The advantage is twofold: First, the unique value
of the **CUST** column, which joins the tables, always remains constant,
while the customer number, which is only stored in a single table
(**CUSTOMERS**), may be changed at will. Thus, if at some stage, a
decision is made to add a "P" to the numbers of preferred customers, the
revision will only be made in the records of the **CUSTOMERS** table.
The **ORDERS** table will not be affected at all.

Similarly, a decision to modify the width of the **CUSTNAME** column
would only require a change in the **CUSTOMERS** table. Had the join
been made through the **CUSTNAME** column, then any changes would have
to be made in all the appropriate records in the **ORDERS** table, as
well as in the **CUSTOMERS** table.

Of course, the situation is aggravated manifold, as customer data are
imported into other tables as well.

A parallel example concerns the one-to-many relationship between the
**ORDERS** and the **ORDERITEMS** table (the latter stores details
regarding the ordered parts). It is better to join these tables via the
internal order number (the autounique key) than the user-designated
order number. In that way, the user can update the order number where
needed, without having to update each of the order items as well.

An autounique key should be included in any tables which contain basic
elements. The reference is to data which remain relatively constant and
which are likely to be imported into other tables (e.g., customers,
parts, warehouses). Hence, it is included in the **CUSTOMERS**, **PART**
and **WAREHOUSES** tables.

Furthermore, an autounique key should be assigned to tables whose
records have a one-to-many relationship with the records of another
table.

> **Example:** As there are several order items for each order, there is
> an autounique key in the **ORDERS** tables.

## Unique Keys 

A unique key allows for rapid data retrieval via the columns that make
up the key. Moreover, it ensures that no two records in a given table
will have identical values in those columns. Every table must include at
least one unique key.

> **Example:** If a unique key includes **FIRSTNAME** and **LASTNAME**
> columns, then there will only be one record in the **EMPLOYEES** table
> for John Smith, although there can also be a record for John Doe or
> Jane Smith.

It should be emphasized that the modification of unique keys can be
problematic if care is not taken. There are three ***danger zones***:
adding a unique key, deleting a column from a unique key and reducing
the width of a column in the unique key. In all three cases, records can
be deleted inadvertently from the database.

Before adding a unique key, ensure that values have been specified for
the columns which comprise it; otherwise, all existing records will have
the same value in the columns comprising the unique key. As this is not
permitted, all but one of the records will automatically be erased!

A similar situation may arise from the deletion of a column from a
unique key. If the deletion causes more than one record to contain the
same values in its unique key (which is now made up of one less column),
all but one of the records in question will be deleted from the
database.

> **Example:** If the unique key contains the columns **FIRSTNAME** and
> **LASTNAME**, then the record for Samuel Brown is distinguished from
> the record for Samuel Black. If you delete the **LASTNAME** column
> from the key, both records will have the same value ("Samuel") in the
> key, and one will be deleted.

Finally, you may lose records by reducing the width of one of the
columns that make up the unique key.

> **Example:** The **CUSTDES** column, which is part of a unique key,
> was originally assigned a width of 12 and you reduce this to 8. If
> there is already data in this column, then the customers "North Stars"
> and "North Street" will both become "North St". Consequently, these
> two records would have the same unique key, and one of them would be
> deleted.

## Nonunique Key 

The nonunique key is used to provide rapid access to data in the table.
It should include columns which are frequently used to retrieve data and
which contain highly diversified data.

Consider the difference between the following two columns in the
**ORDERS** table: **CUST**, which stores a wide variety of internal
customer numbers, and **ORDTYPE**, which classifies orders by type of
sale. Obviously, the internal customer number distinguishes between
records much better than the sale type. Moreover, it is much more likely
that data will be retrieved by customer number than by sale type. In
fact, you might design a query form (a sub-level of the *Customers*
form, linked to it by the customer's internal number) which displays all
orders for each customer. Entrance into that form would be extremely
slow if **CUST** were not a nonunique key.

Note that the header of any key is automatically treated as a nonunique
key by the system. In this context, "header" is defined as a group of
consecutive key columns starting from the first key column. This is true
of unique and nonunique keys alike. This can be understood by
considering the example of a phone book. Assuming that (1) entries are
sorted first by last names and then by first names, (2) no person listed
has more than one entry, and (3) no two persons listed share the same
last and first names, then the unique key is comprised of two columns:
**LASTNAME** and **FIRSTNAME**. So, if you know both a person's last
name and first name, you can find the telephone number rapidly by
skipping forward and backward. However, if you only know the last name
(the header of the unique key) and the address, you can skip to this
last name and then move through all entries until you find the correct
address. Moreover, you can stop checking when you have finished scanning
the entries with this last name. On the other hand, if you only know the
person's first name and address, you would have no means of finding his
or her telephone number without checking every single entry! Hence, the
header of the key (**LASTNAME** in the above example) is helpful in
accessing data, whereas the rest of the key, without the header, is of
little use.

For a table with a unique key comprised of: internal order number
(**ORD**), internal part number (**PART**) and date (**CURDATE**), both
the ORD column and the pair **ORD/PART** would be considered nonunique.
Another example is one of the nonunique keys of the **ORDERS** table,
which is comprised of two columns: **CUST** and **CLOSED**. In this
case, the **CUST** column is also treated as a nonunique key in its own
right.

## Rules for Keys 

-   There may only be one autounique key per table. It must comprise a
    single column of **INT** type which does not appear in any other of
    the table's keys, and it must be of first priority.
-   A table must have at least one unique key.
-   If there is an autounique key, it must be the first key (1) in the
    table and a unique key must be second. If there is no autounique
    key, one of the unique keys must have first priority.
-   The order in which key columns are designated determines their
    priorities.
-   The column to be included in the key must be included in the table
    to which the key is assigned.
-   If you add a column to a key without specifying column priority, it
    will automatically be assigned the last available priority (e.g., if
    the key includes two columns, the added column will receive a
    priority of 3).
-   Changing a key column's priority will affect the priority of the
    other columns in the key.

**Note:** You can check the consequences of assigning key column
priority by means of the SQL optimizer (see [Executing SQL
Statements](Executing-SQL-Statements )).

> **Example:** In a key comprised of the columns **FIRSTNAME** and
> **LASTNAME** in an **EMPLOYEES** table, you would give highest
> priority to **LASTNAME** and second priority to **FIRSTNAME**.\
> This would allow for rapid retrieval by **LASTNAME**:\
> `SELECT * FROM EMPLOYEES WHERE LASTNAME = ’Brown’;`

## Keys and Record Links 

Unique and Autounique keys also determine how record links are generated
in forms that are based on them:

-   If the table has an autounique key and a single unique key, the
    record link will be based on the unique key column.
-   If the table has an autounique key and more than one unique key, and
    the autounique key column is displayed in the form, the record link
    will be based on the autounique key column.

> **Example:** In the **Sales Orders** form (based on **ORDERS**), the
> link is based on the contents of ORDNAME, which is the unique key for
> the table. However, in the **Contacts** form (based on **PHONEBOOK**),
> the link is based on the autounique PHONE column.

## Further Reading 

-   [Tables](Tables )
-   [Table Columns](Table-Columns )
-   [Options for Creating and Modifying Tables, Columns and
    Keys](Create-Modify-Tables )
-   [Viewing Tables in the
    Database](View-Tables )
-   [DBI Syntax](DBI-Syntax )
