---
title: User Input in Procedures
layout: sdk_nav
group: Procedures
tags: 'Priority_SDK'
---

## Introduction

When the values of [parameters](Procedure-Parameters ) are
determined by the user, an *I*is specified in the Input column (or an
*M*, if the input is mandatory). Input does not have to be defined via
an [INPUT command](Procedure-Steps#Basic-Commands ). You can
also specify input in a [CHOOSE
command](Procedure-Steps#Basic-Commands ), a form step or an
SQLI step. In addition, in a [processed
report](Processed-Reports ), columns can be flagged for input
in the report itself (by flagging the *Input Column* in the *Report
Columns* form).

## Inputting a New Value 

If, during input, the user is to specify new values (not in the
database), you must record a parameter (of any type except **ASCII,
FILE** or **LINE**), together with a valid width and a title. In such a
case, an equal sign (=) will appear in the first line of the column in
the parameter input screen.

You can insert a pre-set, revisable value into the input screen --- for
instance, the current date (SQL.DATE8) for a **DATE** parameter. The
user can then choose between using that value or modifying it. To do so,
specify the pre-set value in the *Value* column (of the *Procedure
Parameters* form) for the parameter in question. Of course, the
designated value must match the parameter's data type. Alternatively,
you can specify the name of a variable (e.g., :DATE), provided that its
value has already been defined (e.g., in a previous procedure step).

The pre-set input value appears the first time the user runs the
procedure. If that value is then revised, the revised value will appear
the next time the user runs it. You can, however, ensure that the
pre-set value ***always*** appears. To do so, enter the *Procedure
Parameter Extension* sub-level form and specify *d* in the *Type*
column.

If, instead, you want the input to be Boolean (Y/N) and appear as a
check box, specify *Y* in the *Type* column (of the *Procedure Parameter
Extension* form).

## Choosing Between Several Fixed Options 

If you want the user to choose between several predefined options within
a given input field, create a parameter of **INT** type, and record the
various options in consecutive messages (in the *Procedure Messages*
form). Then enter the *Procedure Parameter Extension* sub-level form and
specify *C* in the *Type* column. Indicate the range of message numbers
in the *From Message* and *To Message* columns.


**Notes:**

-   To use messages recorded for a different procedure, designate its
    name in the *Entity Name* column.
-   The value of this parameter can then be included in subsequent
    procedure steps (e.g., as the value assigned to a [GOTO
    command](Procedure-Steps#Basic-Commands )).

## Choosing Options from a List of Radio Buttons 

Alternately, you can create a separate input screen of options, in which
the user must flag one of the radio buttons. To do so, use the CHOOSE
command. The first parameter of a CHOOSE command stores the result of
the user's choice. Its title appears at the top of the pop-up menu, as
its heading. It is this parameter that may be included in subsequent
procedure steps.

There are two methods for creating the radio buttons: you can define a
list of additional parameters or write a CHOOSE query.

**Method 1:** When you define a list of parameters, assign each one a
unique constant value (an integer), a title and a position. Titles will
appear next to the radio buttons in the order dictated by each
parameter\'s position. The value of the option (i.e., parameter) chosen
by the user will be assigned to the first parameter.

**Method 2:** You can write a CHOOSE query in the *Step Query* sub-level
form of the CHOOSE/CHOOSEF procedure step. This is a regular SQL query
with three arguments in the SELECT clause. All arguments must be of
**CHAR** type (convert numbers to strings using the [ITOA
function](Non-standard-Scalar-Expressions#Strings ).

The first two arguments in the CHOOSE query are displayed next to the
radio button and the third is the value to be assigned to the parameter.
If you want to display a single value as a description next to each
radio button, use the empty string (\' \') as the second argument.

> **Example:** See the **COPYPRICELIST** procedure.


**Note:** Rules for the CHOOSE query are similar to those in
[CHOOSE-FIELD
triggers](Creating-Your-Own-Triggers#CHOOSE-FIELD ).

## Retrieving Records Into a Linked File 

Another type of user input involves retrieval of records from a given
database table into a linked file. This case requires specification of
*Column Name* and *Table Name*. The user can then specify a search
pattern in that column, or access a form which displays the records in
that table and then retrieve desired records.

## Inputting Text Into an HTML Screen 

When the procedure parameter type is **TEXT**, the user keys in an
unlimited number of lines in the text field, and these lines are
returned to the procedure via a file linked to the **PROCTABLETEXT**
table.

> **Example:**
>
> ```sql
> LINK PROCTABLETEXT TO :$.TXT; 
> GOTO 99 WHERE :RETVAL <= 0;
> INSERT INTO GENERALLOAD (LINE,RECORDTYPE,TEXT)
> SELECT 2+KLINE, ‘2’,TEXT FROM PROCTABLETEXT WHERE KLINE > 0;
> UNLINK PROCTABLETEXT;
> ```

## Other Input Options 

Additional columns in the *Procedure Parameter Extension* sub-level form
also affect user input:

-   To allow users to input a file attachment, specify *Y* in the
    *Browse Button* column. A Windows Explorer will open in which the
    user selects the file in question.

    **Note:** The parameter in question must be of **CHAR** type.

-   To allow users to save a new file, specify *S* in the same column.
-   To encode user input (e.g., when a password is given), flag the
    *Hide User Input* column. Anything recorded by the user will appear
    as a row of ++++++ marks.

## Writing a New CHOOSE-FIELD or SEARCH-FIELD Trigger for a Procedure Parameter 

When a parameter is defined as an input column, if the column has a
target form and that form has
[CHOOSE-FIELD](Creating-Your-Own-Triggers#CHOOSE-FIELD-(for-form) )
or [SEARCH-FIELD](Creating-Your-Own-Triggers#SEARCH-FIELD )
triggers, those triggers will be imported to the input screen.

You can also write a specific CHOOSE-FIELD or SEARCH-FIELD for the
procedure. Your trigger can contain references to any input value
specified by the user within the same procedure step. For instance, if
the procedure step contains an input parameter called CST, its value
will be stored in the :PROGPAR.CST variable. This is useful, for
example, if a given procedure step contains an input column for a *Sales
Rep* and another input column for a *Customer*, and you want the Choose
list for the latter column to display only those customers that are
associated with the specified sales rep.

The same restrictions that apply to [form trigger
names](Creating-Your-Own-Triggers#Naming-Customized-Triggers )
apply here as well.

To design a new trigger, use the *Field Triggers* form (a sub-level of
*Procedure Parameters*).

## Accessing a Related Form 

When the parameter is a linked file, the user can specify an exact value
for that database column, stipulate a query pattern for that column or
access a related target form in which to retrieve records.

In the last case, the user normally arrives at a default target form.
This is the form that serves as a "window" into the database table to
which the column in question belongs (i.e., the table specified in the
*Procedure Parameters*form), provided that the table and form share the
same name. However, there are several ways to override this default, so
that the move will be to ***another root form based on the same
table***:

-   by designating a main target form (type *M* in the
    **Zoom/International** column of the *Form Generator* form for the
    form in question);
-   by designating an application target form (type *Z* in the same
    column);
-   by designating a form as a target for this particular parameter
    (specify the name of the relevant form in the *Target Form Name*
    column of the *Procedure Parameter Extension* form).

The last option overrides all other target forms, and the application
target overrides the main target form.

> **Example:** Specify a target form for the parameter when there is
> more than one form linked to the same base table (e.g., **PART** and
> **LOGPART**).

The specified target form must meet two conditions:

-   It must be a root form (have no upper-level forms of its own)
-   Its base table must include the column from which the user
    originates.


**Note:** To disable automatic access from a given column, specify the
**NULL** form as the target form.


## Input During Action 

When a procedure is [activated from within a
form](Actions), input is received from the record
on which the cursor rests. That is, a linked file is created, based on
the form's base table and consisting of that single record. This linked
file is input to the procedure by the PAR parameter. Therefore, any
procedure that is activated from a form must meet the following
conditions:

1.  The PAR parameter must be in the first position of the procedure's
    first step.
2.  It must be of **FILE** type.

If you want to receive additional input from the user, you must create
an input screen (using the INPUTF command) or a menu of choices (using
the CHOOSEF command).

**Tip:** To run the same procedure from a menu, make sure that *Column
Name* and *Table Name* are also recorded.

## Using a Form for Input 

The content of a linked file may also be input by means of a form
(procedure step of type *F*). This form must be the root of a form tree.
It is loaded together with all the sub-level forms in its form tree. A
form step is useful when you wish to allow the user to retrieve several
records that will serve as input, particularly when the query is complex
(entailing several conditions) or when retrieval is not through a key.

> **Example:** See the **CLOSEAIVS** procedure.

## Further Reading 

-   [Procedure Steps](Procedure-Steps )
-   [Procedure Parameters](Procedure-Parameters )
-   [Procedure Step Queries](Procedure-Step-Queries )
-   [Procedure Flow Control](Procedure-Flow-Control )
-   [Procedure Message Display](Procedure-Message-Display )
-   [Processed Reports](Processed-Reports )
-   [Running a Procedure](Running-a-Procedure )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Rules-for-Customizing )
-   [Procedures](Procedures )
