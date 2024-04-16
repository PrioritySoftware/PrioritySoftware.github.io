---
title: Creating your Own Triggers
group: Forms
tags: 'Priority_SDK'
---

## Introduction

Triggers are specified in the *Form Column Triggers* form (a sub-level
of the *Form Generator*) and its sub-level, *Form Column Triggers -
Text*, when they are to be activated by movement out of a given column.
They are specified in the *Row & Form Triggers* form and its sub level,
*Row & Form Triggers - Text*, when they are to be activated by exiting
the line or the form.



**Notes:**

-   Once a trigger has been formulated for any given form column, a
    check mark appears in the *Triggers* column of the *Form Columns*
    form. This flag makes it easy to locate those columns for which
    user-designed triggers have been created.
-   You can track changes to custom triggers once they have been
    included in prepared version revisions. See [Tracking Changes to Queries](Installing-Customizations#Tracking-Changes-to-Queries ).



It is easier to use ***Priority***'s text editor to write trigger text
rather than using the regular form. However, this must be done with
caution. Specifically, it is imperative to make sure the entire trigger
appears in the form before moving to the text editor; otherwise, any
undisplayed lines will be lost! So, if you have cleared any lines in the
form or retrieved only some of the records, be sure to retrieve all
records before you run the text editor.


> To access the text editor, press **F6**.

**Tip:** You can replace the built-in text editor with any editor of
your choosing (e.g., Notepad++). To do so:

- In the Web Environment, simply press F6 within the trigger text. This saves a temporary text file and opens it in the system default text editor. When you save the file and close it, the trigger text is updated in Priority.
- In the Windows interface, run the *Define External Editor* program (*System Management* → *Generators* → *Procedures*), indicating the full path to the file you want to use (e.g., Tabula External Editor= C:\\Windows\\Notepad.exe) in the input screen.
Alternatively, you can open the *tabula.ini* file (in *C:\\Windows*)
and, under the {Environment} section, revise the line for Tabula
External Editor, giving the file path.

See also [Form Triggers](Form-Triggers ).

## Types of Triggers 

The following types of triggers may be created:

  | Trigger Type | Trigger Description
  | --------------------------------------------------| ---------------------------------------------------------------------------------------------------------------------------------------------------- |
  | [CHECK-FIELD](#CHECK-FIELD )     |        Performs verification checks on a value specified for a form column. |
  | [POST-FIELD](#POST-FIELD ) |              Performs operations once form column check is successful. |
  | [PRE-INSERT](#PRE-INSERT )    |           Performs verification checks before a record is inserted into the database.
  | [POST-INSERT](#POST-INSERT )   |          Performs operations once a record is successfully inserted.
  | [PRE-UPDATE](#PRE-UPDATE )      |         Performs verification checks before a record is updated in the database.
  | [POST-UPDATE](#POST-UPDATE )     |        Performs operations once a record is successfully updated.
  | [PRE-DELETE](#PRE-DELETE )        |       Performs verification checks before a record is deleted from the database.
  | [POST-DELETE](#POST-DELETE )       |      Performs operations once a record is successfully deleted.
  | [PRE-FORM](#PRE-FORM )              |     Performs operations before a form is opened.
  | [POST-FORM](#POST-FORM )            |     Performs operations when a form is exited, provided there were,insertions, updates or deletes in the form.
  | [CHOOSE-FIELD](#CHOOSE-FIELD )      |     Creates a list of values from which the user can choose when filling in a,specific field (for short lists).
  | [SEARCH-FIELD](#SEARCH-FIELD )      |     Creates a list through which the user can search for the needed value of a given field (for long lists).
  | [SEARCH-ALL-FIELD](#SEARCH-ALL-FIELD ) |   Creates a list through which the user can search to find a value for a given field. Allows the user to search by multiple criteria simultaneously.


Except for PRE-FORM triggers, which are ***always*** activated,
triggers ***will not be activated*** unless the user has made an addition
or change in the column, row or form. Furthermore, CHOOSE-FIELD and
SEARCH-FIELD triggers are only activated when the user accesses a Choose
list or Search list, respectively.

## Order of Trigger Execution 

Before demonstrating the usage of each of the user-designed triggers, a
brief explanation of their sequence of execution is in order:

-   CHECK-FIELD triggers precede POST-FIELD triggers.
-   [Built-in CHECK-FIELDs](#CHECK-FIELD )
    precede user-designed CHECK-FIELDs.
-   [Built-in POST-FIELDs](#POST-FIELD )
    precede user-designed POST-FIELDs.
-   PRE- triggers precede their respective POST- triggers.
-   [Built-in triggers](Built-in-Triggers) are executed after
    PRE- triggers, before POST- triggers.
-   Standard and custom triggers are sorted alphabetically, so you
    should name your own triggers accordingly. For example, to run your own trigger after a standard POST-INSERT trigger, use
    POST-INSERT_AXXX or ZXXX_POST-INSERT (where XXX is part of the
    prefix you normally use for this customer).

Trigger execution is discontinued when an END or ERRMSG command
succeeds. It is not discontinued if a WRNMSG command succeeds. If a
CHECK-FIELD trigger is discontinued, then the corresponding POST-FIELD triggers (built-in and user-designed) will not be activated. Similarly, if a verification check fails in any of the PRE- triggers, then activation of that trigger is discontinued, and the corresponding built-in and POST- trigger will not be activated.

> **Example:** Suppose the **PARTNAME** column of the **ORDERITEMS** form has been assigned both a CHECK-FIELD and a POST-FIELD trigger. The former ensures that the part number is not updated once it has been successfully inserted in a record (rather, the user must delete the record for the unwanted part number and insert a new record). The POST-FIELD trigger generates a unit price for the ordered part based on the customer's price list. If the CHECK-FIELD should fail (i.e., the user has attempted to update the part number), then the price of the part will not be generated. Nor will the built-in POST-FIELD trigger (which fills in the internal number and part description on the basis of the designated part number) be activated.

## Naming Customized Triggers 

Customized triggers should be given special names (which must be added to the *List of Triggers* form; this form can be accessed by pressing **F6** from the *Row & Form Triggers* form or from the *Form Column Triggers* form). These names have to include key strings which indicate the type of trigger involved, together with additional characters that refer to the customization. For instance, customized CHECK-FIELD triggers must include the strings "CHECK" and "FIELD" (in capital letters). Thus, a customized CHECK-FIELD for an installation at CRR Holding Company might be labelled CRRH_CHECK-FIELD. Customized trigger names must follow a number of rules:

-   They can only contain alphanumeric values, the underline sign (\_)  and the hyphen (-).
-   They must begin with a letter.
-   They must not include spaces.
-   They must include a four-letter prefix or suffix, similar to what you use throughout the system for this customer. The difference is that you will need to choose the appropriate first letter of the prefix (or suffix) for sorting purposes (see example above).
-   They must include the required key strings that identify trigger, separated by hyphens (i.e., PRE-, POST-, -FIELD, -FORM, -INSERT, -UPDATE, -DELETE, CHECK-, CHOOSE-).

**Notes:**

-   Key strings need not be consecutive (e.g., they may be separated by additional strings).
-   You can combine key strings to create, for instance, a customized  trigger that operates both as a POST-INSERT and a POST-UPDATE (e.g., ARRH_POST-INSERT-UPDATE). Combined triggers **cannot** contain cursors, directly or via includes. 
-   SEARCH-FIELD triggers are the exception to the rule. You cannot
    create a customized SEARCH-FIELD, but rather must use the standard trigger. For details, see [Customization Rules](Customization-Rules#forms ).

-------------------------------------------------------------------

## Creating Column Triggers 

### CHECK-FIELD 

CHECK-FIELD triggers perform verification checks on the value specified
for a column. Note that the value must have been inserted or updated by
the user. The check will not be performed if the user simply moves the
cursor through this column, without making any changes in it (even if
the value was filled in by a trigger after record retrieval).

CHECK-FIELD triggers should be used when you wish to restrict the values
that may be specified (in addition to the validation checks built into
the system). The error/warning message is specified in the sub-level
form (*Error and Warning Messages*). It should be assigned a number
greater than 500.

> **Example 1:** The CHECK-FIELD trigger for the **TYPE** column of the
> **PART** form is:
>
> ```sql
> ERRMSG 4 WHERE :$.TYPE NOT IN ('O','R','P');
> ```
>
> This trigger restricts the part type to O,R, or P. If any other value
> is specified, the user will not be able to exit the column, and an
> error message will be generated: "Specify P (part), R (raw material)
> or O (other)."
>
> **Example 2:** The CHECK-FIELD trigger for the **TQUANT** column of
> the **ORDERITEMS** form warns the user if the quantity specified in
> the current column of the current form is less than zero ("The
> designated quantity is a negative number!"):
>
> ```sql
> WRNMSG 105 WHERE :$.@ < 0;
> ```

### POST-FIELD 

POST-FIELD triggers cause operations to be performed once the value
specified for the column has successfully passed the verification
checks. They are particularly useful for filling in values.

> **Example:** The POST-FIELD trigger for the **SUPNAME** column of the
> **PORDERS** form inserts the current date (**SQL.DATE8**, a system
> function) into the **CURDATE** column when opening a new purchase
> order if there is currently no date in that column.



**Note:** When a POST-FIELD trigger changes a value of another form
column, the POST-FIELD of that other column (if there is one) will also
be activated, but its CHECK-FIELD will not.



### CHOOSE-FIELD 

CHOOSE-FIELD triggers create a short list of values from which the user
can choose. Each column in the CHOOSE-FIELD query is restricted to 64
characters.

> **Example:** The CHOOSE-FIELD trigger for the **PARTNAME** column in
> the *Purchase Order Items* form (**PORDERITEMS**) provides a list of
> the vendor's parts (:$$.SUP):
>
> ```sql
> SELECT DISTINCT PARTDES,PARTNAME
> FROM PART WHERE PART = 
> (SELECT PART FROM SUPPART WHERE SUP = :$$.SUP AND VALIDFLAG = 'Y')
> AND PART <> 0
> ORDER BY 1;
> ```

The above type of CHOOSE-FIELD is a regular SQL query where both
arguments must be of **CHAR** type. In order to display a number, you must first convert it into a string using the [ITOA function](Scalar-Expressions#Strings).

The first argument in the query is the description and the second is the value to be inserted in the column where the Choose list is activated. You can also add a third argument for sorting purposes. If you want to display a single value in the Choose list, you must add the empty string to the CHOOSE-FIELD query.

> **Example:** See the CHOOSE-FIELD trigger for the **CPROFNUM** column
> in the **ORDERS** form. Its first argument displays the quote's
> **DETAILS** and **PDATE** columns; the second is the quote number (the
> value that will be filled in); the third determines the sort, which is
> by the quote's expiration date.

If the third argument (the one you wish to sort by) is a numeric value, using the ITOA function alone will not result in correct sorting. For example, 10 would precede 5. To avoid this, you can use the function ITOA(m,4), which will result in 1 becoming 0001, 5 becoming 0005 and 10 becoming 0010, so that the order when sorted will be correct.

<!--- TODO: Move PAR4 to Windows only features --->

The first argument in the query is stored in the :PAR4 system variable, where it can be used by other triggers assigned to the same column.

> **Example:** See the BUF2 trigger for the **SERNUM** column in the **DOCUMENTS_Q** form (called from the CHECK-FIELD trigger for that form column). It uses the :PAR4 variable, containing the part description that corresponds with the chosen serialized part, to determine the corresponding part number.

A CHOOSE-FIELD trigger can also display a list of constant values, taken
from form messages. When using this type of CHOOSE-FIELD, the messages
must be structured as follows: *Value, Description*.

> **Example:** The CHOOSE-FIELD trigger for the **TYPE** column of the
> **LOGPART** form is:
>
> ```sql
> MESSAGE BETWEEN 100 AND 102;
> ```
>
> This trigger will display form messages 100, 101 and 102. Message 100
> (for example) is then defined as: P, \"Make\" item.

You can also create a Choose list from a set of queries. Results are
then combined into a single list, creating a Union Choose. Alternately,
you can define the SELECT statement so that once one of the queries
succeeds, no subsequent queries are run. To do so, use the syntax:
SELECT /\* AND STOP \*/ ...

> **Example:** Use a Union Choose in the **ORDERS** form to create a Choose list comprised of the customer's part list and the representative customer's part list. For an example of SELECT /\* AND STOP */, see the CHOOSE-FIELD trigger for the **PARTNAME** column in the **ORDERITEMS** form.

**Note:** The sort in a Union Choose is determined by the first column that is retrieved. That is, the sort defined for each query, as well as the order of the queries, is ignored. If you want to override this default, using instead the sequence of results retrieved from each query, add the following comment anywhere in the trigger (note the space after the first asterisk and before the second one):\
<code>/* NO SORT */</code>\
For an example of such usage, see the CHOOSE-FIELD trigger for the
**ACTNAME** column in the **ALINE** form.


Finally, you can use a variation of the trigger, called MCHOOSE-FIELD, to create a Multiple Choose. This allows the user to select more than one value from the Choose list at a time.

> **Example:** See the MCHOOSE-FIELD trigger in the **ORDNAME** column of the **DOCORD** form.

**Notes:**

-   If there are no values in the Choose list (e.g., no parts were
    defined for the vendor), or if it contains more records than the number specified in the CHOOSEROWS system constant, a SEARCH-FIELD trigger (if defined) is activated instead.
-   A CHOOSE-FIELD trigger can also be defined for an entire form (see [CHOOSE-FIELD (for form)](#CHOOSE-FIELD-(for-form))).

## Creating Row Triggers 

### PRE-INSERT 

PRE-INSERT triggers perform operations on a new record before it is
inserted in the database (generally verification checks that are not
performed by the built-in Insert triggers). This type of trigger is
useful, for example, for checking the contents of several form columns
before the line is exited.

> **Example:** The PRE-INSERT trigger for the **CASH_CASH** form
> (*Cashiers*) verifies that a GL account is attached to the cashier:
>
> ```sql
> WRNMSG 1 WHERE :$.ACCOUNT = 0;
> ```

### POST-INSERT 

POST-INSERT triggers cause the performance of certain operations once
the record has been successfully inserted in the database.

> **Example:** The POST-INSERT trigger in **DOCUMENTS_Q** inserts a
> record into the **SERVCALLS** table.

### PRE-UPDATE 

PRE-UPDATE triggers perform verification checks before a record is
updated in the database. Generally, they are similar to PRE-INSERT
triggers.

> **Example:** The PRE-UPDATE trigger in the **CASH_CASH** form verifies that a GL account is attached to the cashier:
>
> ```sql
> WRNMSG 1 WHERE :$.ACCOUNT = 0;
> ```

### POST-UPDATE 

POST-UPDATE triggers cause the performance of operations once the record
has been successfully updated.

> **Example:** The POST-UPDATE trigger in the **DOCUMENTS_Q** form
> updates those form columns that come from the **SERVCALLS** table.

### PRE-DELETE 

PRE-DELETE triggers perform verification checks before a record is
deleted from the database (in addition to the checks that are built into
the system).

> **Example:** The PRE-DELETE trigger in the **ORDERITEMS** form warns
> the user that tries to delete a line containing a bonus item:
>
> ```sql
> WRNMSG 334 WHERE :$.BONUSFLAG IN ('Y','F');
> ```

### POST-DELETE 

POST-DELETE triggers cause the performance of operations once a record
has been successfully deleted.

> **Example:** The POST-DELETE trigger in the **ORDERITEMS** form
> deletes the relevant record from the **ORDERITEMSA** table:
>
> ```sql
> DELETE FROM ORDERITEMSA WHERE ORDI = :$.ORDI;
> ```

### CHOOSE-FIELD (for form) 

In addition to creating a CHOOSE-FIELD for a specific form column, you
can also define a CHOOSE trigger at the form level. This ensures that,
whenever the designated table column appears in another form, the Choose
list will be defined by the current form. In fact, in order to override
it and create a different Choose list, you will have to write a new
CHOOSE-FIELD trigger for the form column in question.

> **Example:** The CHOOSE-FIELD trigger in the **ORDSTATUS** form causes
> the Choose list of order statuses to be taken from this form. That is,
> any form that includes the **ORDSTATUSDES** column from the
> **ORDSTATUS** table takes its CHOOSE-FIELD from the **ORDSTATUS**
> form.

### SEARCH-FIELD 

SEARCH-FIELD triggers create a long Search list which the user can use
to search for a desired value (e.g., to select a customer out of a list
of thousands of customers). There are two main types:

-   the SEARCH-NAME-FIELD, which searches by number
-   the SEARCH-DES-FIELD, which searches by name or description.

> **Example:** The SEARCH-NAME-FIELD trigger in the **CUSTOMERS** form
> performs the search on the customer number, whereas the
> SEARCH-DES-FIELD trigger performs it on the customer name.

You can also create a Multiple Search, that is, a trigger that allows
the user to select more than one value from the Search list at a time
(similar to MCHOOSE-FIELD). To do so, include the following comment in
the trigger: /\* MULTI \*/.

**Notes:**

-   A third type (SEARCH-EDES-FIELD) is used only in a non-English
    system, to search by the name/description in English.
-   SEARCH-FIELD triggers are the exception to the rule, as you cannot create a customized trigger of this type. Instead, you must use standard SEARCH-FIELD triggers. For details, see [**Rules for Customizing Forms**](Customization-Rules#forms ).
-   SEARCH-FIELD triggers can only display table columns with a width of up to 59 characters.
-   If the user selects more than one value in a Multiple Search and the form generates a warning or error message, insertion of the selected values will stop.

### SEARCH-ALL-FIELD 

SEARCH-ALL-FIELD also creates a long search list. The critical
difference between it and SEARCH-FIELD is that SEARCH-ALL-FIELD allows the user to search through multiple attributes at once. This is useful for fields where different users might want to search by different criteria.

> **Example:** In the ORDERS form, when searching in Customer Name the SEARCH-DES-FIELD trigger only searches through customer names.However, searching using SEARCH-ALL-FIELD, you can search through both Customer Name and Customer Number simultaneously.

In Priority Web, the SEARCH-ALL-FIELD trigger has additional
functionality, as the same search list can be shared across multiple columns in a form, determined by the columns mentioned in the INCLUDES comment at the start of the trigger.

> **Example:** The SEARCH-ALL-FIELD trigger in the **CUSTOMERS** form is available in both the **Customer Number** and **Customer Name** fields in the **Sales Orders** form. It's appearance in **Customer Name** is governed by the commented line in the trigger: ORDERS.F > CDES.

If the search trigger uses regular expression for ordering results (the ORDER BY section), all components of the expression, including
parentheses (), periods (.), and number denoting order priority, must appear in a single line and without interrupting spaces.

> **Correct Example:** taken from the SEARCH-ALL-FIELD in the LOGPART form

> ```sql
> :ORDERBY > ((.*)PDES(.*)).3, (^(?!.*EPARTDES)(.*PARTDES)).3,
> EPARTDES.2
> ```

> **Inorrect Example:**
>
> ```sql
> :ORDERBY > ((.*)PDES(.*)).3, (^(?!.*EPARTDES)
> (.*PARTDES)).3, EPARTDES.2
> ```

By default, the system will use SEARCH-ALL-FIELD over a regular
SEARCH-FIELD, but users can change this using the SEARCHTYPE system
constant.

**Notes:**

-   Similar to SEARCH-FIELD, you cannot create a customized trigger of
    the type SEARCH-ALL-FIELD. Only use the standard, existing triggers.
-   It is important to distinguish between a multi SEARCH-FIELD, which
    allows the user to select multiple search results, and
    SEARCH-ALL-FIELD, which automatically searches by multiple criteria.


## Creating Form Triggers 

### PRE-FORM 

PRE-FORM triggers perform operations before the form is opened. This
applies to all root forms, as well as sub-level forms for which the
*Automatic Display* column of the *Sub-Level Forms* form (a sub-level of
the *Form Generator*) is blank. This type of trigger may be used, for
example:

-   to reset the value of a user-defined variable
-   to generate a warning or error message concerning retrieved data
-   to retrieve and display all records when the user opens the form <code>
    :KEYSTROKES = '\*{Exit}'; </code>
-   to refresh all retrieved records in a form following an Action <code> :ACTIVATEQUERY = 1; </code>
-   to deactivate data privileges in a form <code> :$.NOCLMNPRIV.T = 1; </code>
-   to deactivate data privileges for a specific table in a form: in a
    new PRE-FORM trigger for the form in question, define the
    <code>:$.NOTBLPRIV.T </code> variable with the name of the desired table; if the
    table you want to exclude has a join ID, this should also be
    specified.

> **Example:** In order to exclude the **AGENTS** table from data
> privilege restrictions defined for the **ORDERS** form, add the
> following line: \<syntaxhighlight lang=\"tsql\" enclose=\"pre>
> ```sql
> :$.NOTBLPRIV.T = 'AGENTS'
> ```

> Or, if there is a join ID of 5: \
> ```sql
> :$.NOTBLPRIV.T = 'AGENTS.5'
> ```


**Tip:** To activate a PRE-FORM trigger after every query, include the
line 
```sql
:PREFORMQUERY = 1;
```

### POST-FORM 

POST-FORM triggers perform operations upon exiting the form (provided
that the user has made at least one change in the database). This type
of trigger is useful, for example, for updating values in the
upper-level form on the basis of values specified in the sub-level form.

> **Example:** The POST-FORM trigger in the **TRANSORDER_K** form
> includes the following lines (among others):
>
> ```sql
> UPDATE SERIAL SET KITFLAG = 'Y' WHERE SERIAL = :$$.SERIAL
> AND EXISTS 
> (SELECT 'X' FROM KITITEMS WHERE SERIAL = :$$.DOC AND TBALANCE > 0 
> AND KITFLAG = 'Y');
> GOTO 1 WHERE :RETVAL > 0;
> ```
>
> This part of the trigger updates the *Missing Components* column in
> the *Work Orders* form upon exiting the *Issues to Kits* sub-level
> form.

{% if site.output == "web" %}
## More on Triggers 

-   [SQL Variables](SQL-Variables )
-   [Built-in Triggers](Built-in-Triggers )
-   [Error and Warning Messages](Errors-and-Warnings )
-   [Sending a Mail Message](Send-Mail )
-   [Changing Column Titles Dynamically](Dynamic-Column-Titles )
-   [Including One Trigger in Another](Include-Triggers )
-   [Trigger Errors and Warnings](Trigger-Errors )
{% endif %}