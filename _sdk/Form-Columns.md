---
title: Form Columns
layout: sdk_nav
group: Forms
---

## Introduction

To record attributes for form columns, use the appropriate columns in
the *Form Columns* sub-level form of the [*Form
Generator*](Forms ).

## Column Names and Titles

The form column name serves to identify the form column in the system
and is used mainly in SQL variables in form triggers. Consequently, it
is subject to certain restrictions (which also apply to form names):

-   Only alphanumeric values (uppercase and lowercase letters and
    digits) and the underline sign may be used (no spaces).
-   The column name must begin with a letter.
-   You may not use a reserved word.
-   Any new column must begin with the appropriate four-letter prefix.
-   There can be no more than 330 columns in a form.

Any change in the form column's name will require appropriate changes in
SQL variables which refer to that column. The designated name can be
identical to the name of the table column from which the form column is
derived. However, two different form columns which are derived from the
same table column must be given different names.

> **Example:** The *Warehouse Transfer* form (**DOCUMENTS_T**) refers to
> two different warehouses (sending warehouse and receiving warehouse).
> Though they are both derived from the same table column
> (**WARHSNAME**), they must have different form column names. Hence,
> the form column referring to the sending warehouse is **WARHSNAME**,
> while that referring to the receiving warehouse is **TOWARHSNAME**.

The form column title is utilized in the user interface. That is, it
appears as a column heading in the form itself. The title is
automatically inherited from the relevant table column. It may, however,
be revised (even translated into another language). Moreover, when a
form is [screen-painted](Designing-a-Screen-Painted-Form ),
the title appearing in the screen-painter is displayed instead.

> **Example:** In the **DOCUMENTS_T** form, both **WARHSNAME** and
> **TOWARHSNAME** inherit the title *Warehouse Number* from their common
> table column. To distinguish between them in the form, their titles
> have been changed to *Sending Warehouse* and *Receiving Warehouse*,
> respectively.

## Order of Column Display

The order in which columns appear in the form is determined by their
relative position (an integer). Integers determining column position
need not be consecutive. The column assigned the lowest integer appears
first, that with the next highest integer appears second, and so on.

Obviously, it is unnecessary to be concerned with the position of hidden
columns (see below). Nonetheless, it is helpful to move these columns
out of the way, by assigning them all the same high integer (e.g., 99).

**Notes:**

-   Positions have no effect on screen-painted forms; the designer can
    place each column wherever desired.
-   Users can apply form design (*Organize Fields*) to affect how
    columns are displayed specifically for them.


## Hidden Columns

Not all form columns ought to be displayed. For instance, there is
generally no reason to display the internal number of the table’s
autounique key. You should also hide the internal numbers through which
data are imported from other tables.  

> **Example: ORD** and **CUST** are internal columns hidden from the
> **ORDERS** form

The *Order Items* form (**ORDERITEMS**) exemplifies two other instances
in which data are not displayed. In addition to the **PART** column
(through which data are imported from the **PART** table), the **ORD**
and **LINE** columns are hidden. The former is used to link the form to
its upper-level (**ORDERS**), establishing a one-to-many relationship.
The latter is used to sort the order items (during data retrieval)
according to the order in which they were originally specified; its
value is determined by a trigger. Neither of these columns need to be
displayed in the form.  
**Tip:** Have the system manager use the *Organize Fields* utility to
hide columns from individual users.

## Mandatory Columns

Some of the displayed columns in the form must be filled in; others are
optional. For instance, the user is required to indicate the date of
each sales order, whereas specification of a price quotation is
optional. Similarly, the user cannot place an order without specifying a
customer number, but a sales rep number would not be necessary.
Therefore, the **CURDATE** and **CUSTNAME** columns are mandatory. When
a column is mandatory, built-in triggers will not allow the user to
leave the line without specifying data for this column.


**Note:** Whenever a [form load
interface](Loading-from/to-a-Load-Table ) is used to update a
form, that interface must fill in all mandatory columns. If it does not,
the **INTERFACE** program will fail.



The columns that make up the base table’s unique key are a special case:
they must always contain data (either filled in automatically by the
system or manually by the user), regardless of whether they are flagged
as mandatory. If data are missing from any of these columns, the record
will be incomplete and the built-in triggers will not allow the user to
leave the line. It is therefore recommended that, when the user is
supposed to fill in the needed data, you flag the column(s) in question
as mandatory. In this way, users will know in advance that data must be
designated here. Otherwise, they will not find out until they try to
leave the line and receive an error message.



**Note:** The *Privilege Explorer* can be used to make columns mandatory
for specific users. See the *Privilege Explorer Wizard* for details.



## Read-only Columns

Not all displayed form columns should be updatable. Usually, columns
whose values are determined automatically (generally by a trigger)
should be read-only. For instance, the **QPRICE** column of the
**ORDERS** form is determined by the sum of the prices of its order
items (as designated in the sub-level **ORDERITEMS** form). Another
example is the **AGENTDES** column. Owing to built-in fill triggers, the
sales rep name is filled in automatically once the sales rep number is
specified in the **ORDERS** form. This is because (1) the rep’s name is
imported from the **AGENTS** table, and (2) the rep’s number
(**AGENTCODE**) is a unique key in that table.



**Notes:**

-   If you want the entire form to be read-only, you can make it a
    [query form](Forms#Query-Forms ), thereby blocking all
    record insertions, updates and deletions.
-   The *Privilege Explorer* can be used to make updateable columns
    read-only for specific users. See the *Privilege Explorer Wizard*
    for details.



### Balances: Special Read-only Columns

**''Priority***offers the option of a***balance**'' column — a special
read-only column that displays financial balances. In order to
distinguish between credit and debit balances, one is displayed within
parentheses while the other appears in regular format. By default, it is
the debit balances that are displayed in parentheses, both in forms and
in reports. If you want credit balances to be displayed that way
instead, use the CREDITBAL system constant. First add it to the
**SYSCONST** table using an INSERT statement and then assign it a value
of 1.

You can also display a ***cumulative balance*** in a form. To do so, add
two columns to the form:

-   A balance column — Specify *B* in the *Read/Mandatory/Bal* column.
    This must be a numerical column (**INT** or **REAL**); its value
    will be added to the cumulative balance column.
-   A cumulative balance column — Specify *A* in the
    *Read/Mandatory/Bal* column. In the *Form Column Extension* form,
    record the type (**INT** or **REAL**), and in the
    *Expression/Condition* column, record 0 or 0.0, respectively.

In addition, you can include an ***opening balance*** column, if you
want cumulative balance calculations to start from something other than
0. In that case, specify *C* in the *Read/Mandatory/Bal* column.

> **Example:** See the **BAL_BASE**, **BAL** and **OPENNBAL** columns in
> the **ACCFNCITEMS** form.

## Boolean Columns

In order for a form column to be defined as Boolean, it must be of
**CHAR** type and have a width of 1. When a Boolean column is flagged,
the value of that field in the table is *Y*; when it is blank, the value
in the table is '\\0'. Users see a box which they can flag or leave
empty (just like the one you use to define Boolean columns).

## Attachment Columns

**''Priority***offers the option of an attachment column — a special
form column that is used to attach a file to the current record. Such
columns are displayed together with a paper clip icon, which can be used
to open the Windows Explorer and navigate to the file in question.
Alternatively, users can record the file path manually. An example of
this type of column is the*File Name*column of the*Customer Documents
for Task*form, a sub-level of the*Tasks'' form. In order for a form
column to be defined as an attachment column, it must be of **CHAR**
type and the form column name must contain the string **EXTFILENAME**
(e.g., **PRIV\_ EXTFILENAME**).

## Address Columns

Another option is to allow users to open Google Maps from within a form.
For example, by selecting Map (in the Windows interface, from *Tools* in
the top menu; in the web interface, from *Run*) from the address column
in the *Customers* form, the user can open Google Maps to see the
customer's location. In order for a form to have the option of opening a
map, it must contain a special column named **ADDRESSMAP**. You can add
this column to a customized form using your standard prefix
(**XXXX_ADDRESSMAP**).  

 **Note:** It is not possible to add such a column to a standard
form.



## Special Date Columns

As mentioned earlier, dates are stored in **''Priority***as integers,
which correspond to the number of minutes elapsed since Jan. 1, 1988
(for example, Dec. 31, 1987 = -1440). Hence, the date 01/01/1988 is
stored as "0". Since***Priority**'' forms do not generally display zero
values, this date is not displayed in form columns. If you want the
value 01/01/1988 to be displayed in a particular column, the form column
name must contain the string **BIRTHDATE** (e.g., the **BIRTHDATE10**
column in the **USERSB_ONE** form).



**Note:** When a new record is inserted into the database and the date
column is empty, the system assigns a default value of 0 (i.e.,
01/01/1988). If you use the above technique to display the date
01/01/1988, this value will appear in the date column of all such
records. In this case, you may want to define another trigger, such that
when a new record is inserted into the database and the date column in
question is empty, the column receives a different default value (e.g.,
01/01/1900).



## Sorting Data

***Priority*** allows you to control the default order of records
appearing in a given form. That is, you may assign sort priorities to
one or more columns, and you may designate the type of sort. A given
form column’s sort priority (an integer) determines how records are
sorted on screen. The lower the integer assigned to a given column, the
higher its priority in a sort. In addition to sort priority, you can
also indicate the type of sort. There are four options:

-   ascending (the default sort)
-   descending
-   alphanumeric ascending
-   alphanumeric descending.

An alphanumeric sort operates strictly according to the ASCII table.
Thus, A13 will come before A2 and B200 will precede B39 (in ascending
order). In contrast, the regular sort treats consecutive digits as a
number (rather than individual characters). Hence, in ascending order,
A2 precedes A13 and B39 precedes B200.



**Note:** The designated sort priority and type constitute the default
sort. A different sort order may be imposed by the user during data
retrieval (see the *User Interface Guide*).



## Imported Data

In addition to the columns derived from its base table, a form can also
display information that is stored in another table. This table is known
as a join table. A form can have several join tables from which it
imports data.

> **Example:** The **ORDERS** form imports data from several tables,
> among them **CUSTOMERS** and **AGENTS**. Thus, the customer number and
> the sales rep (among other things) have been added to the form.

To add a column, specify a form column name, abiding by the
above-mentioned restrictions (e.g., **XXXX_CUSTNAME**). The table to
which that column belongs (e.g., **CUSTOMERS**) will be filled in
automatically, unless the same column name appears in more than one
table. In that case, designate the table name yourself. Next, assign the
new form column a position. Finally, flag the imported columns as
read-only or mandatory where desired. In general, all imported columns
except for those belonging to the join table’s unique key should be
read-only, as their values are automatically filled in by built-in fill
triggers.

There is one exception to the above: when the data imported from another
table is updated in the form. In such a case, you do not specify a
column name (or table name) in this form, nor do you designate a join
column and join table (see below). Instead you need to use the *Form
Column Extension* sub-level form, in a similar manner as you record
calculated columns. For more details, see [Calculated
Columns](#Calculated-Columns )).

> **Example:** See the **STARTDATE** column in the *Service Calls* form
> (**DOCUMENTS_Q**).

## Join Columns

The customer who places a given order is stored in the **ORDERS** table
solely by means of the internal customer number (**CUST**). This
internal number is derived from the **CUST** column in the **CUSTOMERS**
table.

When an order is recorded in the *Sales Orders* form, the number of the
customer who placed that order must be specified as well.
**''Priority**'' then uses that number to obtain the customer’s internal
number. The internal number is then stored in the appropriate record in
the **ORDERS** table.

Let’s say, for instance, that the user records Order 1000 for customer
P600. As the internal number assigned to this customer is 123, this
internal number will be stored for Order 1000. This connection — or join
— between the internal customer number in the **ORDERS** table and the
internal customer number in the **CUSTOMERS** table is not automatic. It
must be explicitly specified in the *Form Columns* form. You must
indicate the column by which the join is made (*Join Column*) and the
table to which it belongs (*Join Table*).

There are certain restrictions on the column(s) through which the join
is executed:

-   These columns must appear in the join table’s unique (or autounique)
    key.
-   They must include all key columns.



**Note:** The column comprising an autounique key meets both conditions
required of a join column.



### Special Joins

There are two special types of joins:

-   multiple joins — where imported form columns are derived from the
    same table column
-   outer joins — that allow for unmatched rows between the base and
    join tables.

A good example of a multiple join is found in the **DOCUMENTS_T** form,
based on the **DOCUMENTS** table, which includes two different
warehouses: the sending warehouse and the receiving one. The
**DOCUMENTS** table stores the internal numbers of the sending and
receiving warehouses in the **WARHS** and **TOWARHS** columns,
respectively. Both of these internal numbers are joined to the same join
column: **WARHS** from the **WAREHOUSES** table. That is, the join is
made to the same table twice — once to import data regarding the sending
warehouse, and again to import data with respect to the receiving
warehouse. A distinction is made between the two joins by means of the
Join ID: the join for the sending warehouse is assigned a Join ID of 0,
while the join for the receiving warehouse is assigned a Join ID of 1.

Similarly, a distinction must be made between the form columns that are
imported through each join. For instance, the numbers of both these
warehouses (**WARHSNAME** and **TOWARHSNAME**, respectively) are
imported from the same table column: **WARHSNAME** from the
**WAREHOUSES** table. It is essential that the number of the sending
warehouse be imported through join 0, whereas the number of the
receiving warehouse be imported through join 1. Thus, the former is
assigned a *Column ID* of 0, whereas the latter is assigned a *Column
ID* of 1. Any other value imported from the **WAREHOUSES** table (e.g.,
the warehouse description, the bin number) is likewise assigned the
appropriate *Column ID*.



**Important note:** When creating your own multiple joins, use a join ID
and column ID greater than 5.



As opposed to regular joins, an ***outer join***allows for unmatched
rows between the base and join tables. To designate the outer join, add
a question mark (?) in the relevant*Column ID*or*Join ID*column, next to
the number of the ID. The decision as to where to put the question mark
(column ID? join ID?) depends on where the null record is expected to be
encountered. If it is in the table from which the form column is derived
(i.e., the one appearing in the*Table Name*column of the*Form
Columns*form), then add the question mark to the column ID. If the null
record is expected to appear in the join table, attach the question mark
to the join ID. In the case of an additional join between the outer join
table and another table, the question mark should appear in***each*** of
these join IDs.  

> **Example:** The **FNCITEMS** table, which stores journal entry items,
> is linked to **FNCITEMSB**, a table that (among other things) stores
> profit/cost centers from groups 2-5. An outer join is required, as not
> all records in **FNCITEMS** have values in **FNCITEMSB** (that is, a
> given journal entry item may not necessarily include profit/cost
> centers from groups 2-5). Moreover, as access to the **COSTCENTERS**
> table is via **FNCITEMSB**, it is necessary to create an outer join
> there as well (for instance, via the **COSTC2** column).



**Note:** Outer-joined tables are accessed after regular join tables.



## Calculated Columns

In addition to form columns derived from the base table, as well as form
columns imported from other tables, you can also create columns which
display data derived from other form columns. These data are not stored
in or retrieved from any database table. They are filled in when the
form row is exited. The value of a calculated column is determined on
the basis of other columns in the form, as defined in an expression.

> **Example:** The **ORDERITEMS** form includes the **VATPRICE** column,
> which displays the line item’s extended price after tax is added. The
> value of this column (of **REAL** type) is determined by the part
> price as well as the percentage of tax that applies to the part in
> question.

Finally, an imported column that is updated in the form is created just
like a calculated column. In this case, the expression does not
calculate the column value, but rather defines the join table and join
column.

To add a calculated column to a given form, take the following steps:

1.  Designate a unique column name in the *Form Column Name* column of
    the *Form Columns* form (abiding by all [column name
    restrictions](#Column-Names-and-Titles )).
2.  Specify its position within the form in the *Pos* column.
3.  If a calculated column displays a value that should not be revised,
    specify *R* in the *Read-only/Mandatory* column. Leave the column
    blank in the case of an imported column that is updated in the form
    (e.g., the **STARTDATE** column in the **DOCUMENTS_Q** form) or when
    the value in the calculated column updates a value in another column
    (e.g., the **BOOLCLOSED** column in the **ORDERS** form).
4.  Designate the column’s width in the *Width* column. In the case of a
    real number or a shifted integer, designate decimal precision as
    well.
5.  Specify the column title in the *Revised Title* column. Unlike
    regular form columns, which inherit titles from their respective
    table columns, calculated columns have to be assigned titles. If you
    forget to do so, the column will remain untitled when the form is
    accessed by a user.
6.  Enter the sub-level form, *Form Column Extension*.
7.  Write the expression that determines the value of the column in the
    *Expression/Condition* column, using [SQL
    syntax](SQL-Syntax ). If there is not enough room for the
    entire expression, continue it in the sub-level form.
8.  Designate the column type (e.g., **CHAR, INT, REAL**) in the *Column
    Type* column of the *Form Column Extension* form. Note that the
    *Type* column in the *Form Columns* form will ***not*** display the
    type of a calculated column.



**Note:** Once you exit the sub-level form, a check mark will appear in
the *Expression/Condition* column of the *Form Columns* form. This flag
helps you to find any calculated columns in the form at a glance.



Sometimes you may wish to include a column that sets a condition for the
entire record. In that case, do not create a calculated column, as
described above. Instead, add a dummy column to the form (column name =
**DUMMY**; table name = **DUMMY**) and assign ***it*** the desired
condition. The condition itself must be preceded by “=1 AND.”

> **Example:** See the **DUMMY** column in the **FNCIFORQIV** form.

## Custom Columns: Data Authorization

***Priority***'s Data Authorization mechanism enables you to restrict
the content that users can access, based on attributes such as the
branch in which a document was recorded and/or the sales rep who
performed the transaction.

If you have created a custom table column for a piece of data that is
normally subject to data authorizations, you will need to apply the same
Data Authorization settings defined for the standard table column to the
custom table column as well.

In order for the custom column to inherit data privileges defined for an
existing system column, the two columns need to be linked. To do so:

1.  Enter the *Data Privileges* form (*System Management → System
    Maintenance → Privileges → Auxiliary Programs (Privileges) → Data
    Privileges*).
2.  Add a line for the custom table column, specifying the name of the
    custom *Column* and the *Table* in which it appears, and the names
    of the *Main Column* and *Main Table* to which it should be linked.
    Consequently, the custom *Column* inherits the data privileges
    defined for the *Main Column*.

> **Example:** If data privileges have been defined for the *Main
> Column* **BRANCH** in the *Main Table* **BRANCHES**, you can add a
> line to the *Data Privileges* form for a second branch column
> **BRANCH2** in the **ORDERS** table. As a result, the **BRANCH2**
> column inherits the data privileges defined for the *Main Column*
> (**BRANCH**).

To grant data authorization to a given user, add one or more lines to
the **USERCLMNPRIV** table, as follows:

1.  Record the relevant username in the **USER** column.
2.  In the **COLUMNA** column, specify the name of the column for which
    data privileges have been defined, as recorded in the **MAINCOLUMN**
    column of the **CLMNPRIV** table.
3.  Do one of the following:
    -   If the user in question is authorized to see all data, insert a
        single line for this user in the **USERCLMNPRIV** table and
        record '\*' in the **VALUE** column.
    -   If the user in question is authorized to see specific data only,
        insert a separate line in the **USERCLMNPRIV** table for each
        value in the designated column for which the user is authorized.

## Further Reading

-   [Forms](Forms )
-   [Sub-level Forms](Sub-level-Forms )
-   [Conditions of Record Display and
    Insertion](Conditions-of-Record-Display-and-Insertion )
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
