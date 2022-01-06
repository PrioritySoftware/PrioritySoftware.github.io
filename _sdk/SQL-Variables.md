---
title: SQL Variables
layout: sdk_nav
---

## Introduction

***Priority***'s form preparation mechanism recognizes the following as
SQL variables in form triggers; anything else will generate a warning
message:

-   a form column variable --- e.g., :ORDERS.QUANT (see below)
-   any variable preceded by a semi-colon, which does not include a
    period --- e.g., :QUANT
-   system variables.

See also [Form Triggers](Form-Triggers ).

## Form Column Variables 

***Priority*** defines three SQL variables for each form column:

:   *:form_name.form_column_name* --- stores the column's current value
    on screen (note the required semi-colon and period)
:   *:form_name1.form_column_name* --- stores its value in the table
    (note the addition of "1" before the period)
:   *:form_name.form_column_name.***TITLE** --- stores the form column
    title.

Thus, :ORDERITEMS.QUANT refers to the ordered quantity currently
designated in the **ORDERITEMS** form. In contrast, :ORDERITEMS1.QUANT
refers to the ordered quantity stored in the **ORDERITEMS** table. If
you are updating an existing record and have not left the current line
in the form, then these variables will hold two different values --- the
updated value and the previous one, respectively. Along the same lines,
:ORDERITEMS.QUANT.TITLE refers to the title of this column. This is
useful, for instance, as a parameter in [error or warning messages for
triggers](Error-and-Warning-Messages ). These form column
variables may be used in creating expressions and triggers for the form.

## Wildcards

Generally, expressions and triggers refer to the current form (e.g.,
**ORDERITEMS**) or to its upper-level form (e.g., **ORDERS**).
***Priority*** allows you to use the dollar sign as a wildcard in place
of these form names. Use one dollar sign (\$) for the current form, two
(\$\$) for the next level up, three (\$\$\$) for the next level, and so
on.

Consider the following trigger in the **ORDERITEMS** form, which
computes the *Extended Price* of an order item:

```sql
:$.QPRICE = REALQUANT(:$.TQUANT) 
* :$.PRICE * (100.0 - :$.PERCENT) / 100.0
* (:$$.CURRENCY = -1 ? :$.IEXCHANGE : 1.0);
```

Another example (this time of how to use the previous value of a
specific column) is found in the CHECK-FIELD trigger for the
**PARTNAME** column in the same form:

```sql
GOTO 1 WHERE :$1.PARTNAME = '' OR :$.ORDI = 0; 
GOTO 1 WHERE :$.@ = :$1.PARTNAME;
```

Sometimes a trigger employing a dollar sign may refer to a non-existing
form (e.g., \$\$ when there is no upper-level form). This sometimes
happens when the trigger is included in more than one form. In such a
case, ***Priority*** will consider the wildcard as representing the next
form level down (the current form, to continue the above example).

Expressions and Column triggers often refer to the current form column.
You can therefore use @ as a wildcard in place of this form column name
(see example above). For instance, the link between sub-level and
upper-level forms is generally made between columns having identical
names. This linkage can be expressed using the @ wildcard.

The use of these wildcards makes it easier to read the trigger. They are
also useful when employing an **#INCLUDE** command in a trigger (see
[Including One Trigger in
Another](Including-One-Trigger-in-Another )).

------------------------------------------------------------------------

**Note:** The use of @ in a Row or Form trigger will stand for the name
of that trigger (e.g., POST-FORM).

------------------------------------------------------------------------

## User-defined Variables 

In addition to form-column variables, whose values are determined by the
data in the form (or table) column, you may also define your own
variables. For example, the following SQL statement employs a :CNT
variable that counts the number of work orders opened for a given order
item (see the CHECK-FIELD trigger for the **DUEDATE** column of the
**ORDERITEMS** form):

```sql
:CNT = 0;
SELECT COUNT(*) INTO :CNT
FROM ORDSERIAL, SERIAL
WHERE ORDSERIAL.ORDI = :$.ORDI
AND ORDSERIAL.SERIAL = SERIAL.SERIAL
AND SERIAL.PEDATE > :$.DUEDATE
AND SERIAL.CLOSEDATE = 0;
```

When naming a variable, use the following rule of thumb:

-   If the variable is included in a trigger in a standard form, use the
    appropriate four-letter prefix, so as to easily distinguish it from
    standard variables.
-   If the variable is included in a trigger in your own form, the
    prefix is unnecessary.

For more details, see [Rules for Customizing
Forms](Rules-for-Customizing-Forms ).

------------------------------------------------------------------------

**Note:** Variable names are limited to 50 characters. When naming
variables, keep in mind that a variable defined in a trigger for a
standard form also includes: the company prefix (see
[below](#Global-Variables-in-Forms )), two underlines (\_),
and a period (.).

------------------------------------------------------------------------

User-defined variables (such as :CNT) do not have an automatic starting
value; rather, this must be set by a trigger. Consider, for instance,
the following SQL statement in the first line of the POST-INSERT trigger
for the **TRANSTRIG** form (this trigger is included in POST-INSERT
triggers for the **TRANSORDER_D** form and many other forms like it),
which sets the value of the :QUANT and :TQUANT variables on the basis of
the quantity of shipped items:
`SELECT 0 + :$.TQUANT,0 + :$.QUANT INTO :TQUANT,:QUANT FROM DUMMY;`

------------------------------------------------------------------------

**Note:** Alternatively, you could use
`:TQUANT = :$.TQUANT and :QUANT = :$.QUANT`, respectively.

------------------------------------------------------------------------

## Global Variables in Forms 

Some forms are used to work with data that is relevant to more than one
company, i.e., they refer to one of the companies defined in the
**ENVIRONMENT** table or contain a trigger with a loop that runs for all
companies (e.g., the *Itemized Rates* form). When defining your own
variables for use in a multi-company form, you need to make sure to
define them accordingly.

When a trigger is activated in a multi-company form, any user-defined
variables included in the trigger automatically receive a prefix
referring to the relevant company. For example, if a trigger that
contains a variable called :SOMEVAR is activated from a record that is
defined for the comp1 company, then while the trigger is running the
variable will be renamed :\_comp1.SOMEVAR. If the same trigger is
activated from a record that is defined for the comp2 company, then
while the trigger is running the variable will be renamed
:\_comp2.SOMEVAR.

In order to define a global variable for a multi-company form (i.e., a
variable that receives the same value for all companies, regardless of
the current record), add the prefix "GLOBAL." to the variable name
(e.g., :GLOBAL.SOMEVAR). This prefix ensures that no company-specific
prefix will be added when a trigger containing that variable is
activated (and the variable can be used globally within the form).

Global variables are particularly useful when you want to define a loop
that runs for all companies and updates records in each company (such as
the loop in the *Itemized Rates* form). In such a case, you need to
define a global variable that stores the name of the company from which
the loop starts. If you use a local variable to store the company name,
this variable will receive the prefix defined for the original company
upon completing the loop and will subsequently be empty.

## The DUMMY Table 

You will note that the SELECT statements illustrated above refer to the
**DUMMY** table. This is a single-record, single-column table which may
be included in an SQL statement whenever values are assigned to a
variable. While the SELECT statements in the above triggers could have
referred to an ordinary database table, this would have caused the SQL
mechanism to travel through all the table's records, which would take
some time. It is therefore much faster to execute the SELECT via the
**DUMMY** table. In fact, in **\'\'Priority**\'\' any SELECT \... FROM
DUMMY statement does not even access the **DUMMY** table; hence,
execution is even faster.

### Text Form Variables 

Using a form trigger, you can define a given text form as read-only when
its upper-level form has a particular status, and you can prevent users
from opening the text editor in non-HTML format. In the former case, set
the :\$.READONLY.T variable to 1; in the latter, set the :\$.NOEDITOR.T
variable to 1.

> **Example:** See the PRE-FORM trigger in the **ORDERSTEXT** form.

By default, all text forms in ***Priority*** are HTML text forms. If you
need to create a plain text form, set the :\$.NOHTML.T variable to 1.

> **Example:** See the PRE-FORM trigger in the **FTRIGTEXT** form.

## More on Form Triggers 

-   [Built-in Triggers](Built-in-Triggers )
-   [Creating Your Own Triggers](Creating-Your-Own-Triggers )
-   [Error and Warning Messages](Error-and-Warning-Messages )
-   [Sending a Mail Message](Sending-a-Mail-Message )
-   [Changing Column Titles
    Dynamically](Changing-Column-Titles-Dynamically )
-   [Including One Trigger in
    Another](Including-One-Trigger-in-Another )
-   [Trigger Errors and
    Warnings](Trigger-Errors-and-Warnings )
