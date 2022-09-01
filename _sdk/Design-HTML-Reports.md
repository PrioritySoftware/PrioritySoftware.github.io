---
title: Designing HTML Reports
group: Reports
tags: 'Priority_SDK'
---

## Introduction

Any ***Priority*** report can be displayed on the Internet or
in ***Priority*** Dashboards, provided that it is run from within an HTML
procedure.

Nonetheless, a few forms in the *Report Generator* enhance its
capabilities in two main directions:

-   You can specially design the HTML report, so that it has the "look"
    of a form.
-   You can define input columns and links in the report.

The basic idea of specially designed reports is to be able to place the
fields that appear in the report wherever you want on the HTML page.
That is, you select and place the report fields on the output page
(hereafter "form"). To place the fields in the form, you logically
divide the form into table cells, and then place each report field in
its respective cell. For a detailed explanation, see [Displaying HTML
Text in
Reports](Refine-Report-Display#Displaying-HTML-Text-in-Reports ).

## Input Columns and Links in the Report 

There are several types of input for a report:

-   strings, including hidden character input fields (for password
    input)
-   integers
-   real numbers
-   Choose lists, including radio buttons, check boxes, Multiple Choose
    lists and Multiple Check boxes.

Three types of links can also be defined:

-   to a URL (web link)
-   internal link back to the current procedure (the procedure will
    continue to run from the step where it left off)
-   internal link to another procedure (which will be activated by the
    link).

Input columns and links are defined in the *Link/Input* tab of the
*Report Columns--HTML Design* form. Any report column can be made into
an input or link column. To choose the type of input or link, use the
*Link/Input Type* column.

The number of characters that can be recorded in a given input column is
determined either by the width of the report column or by the value of
the MAXHTMLWIDTH system constant, whichever is greater. For example, if
the width of the report column is defined as 32 and the value of the
MAXHTMLWIDTH constant is 20, users will only be able to see 20
characters at a time, but will be able to record up to 32 characters in
the column in question. Users can view any data that exceeds 20
characters by scrolling within the input column.

### Defining Choose Lists 

When an input column is a Choose list, you have to define the query for
retrieving the values that will appear in that list. You can do so in
one of two ways:

-   Via a target form: In the *Report Columns--HTML Design* form, define
    a target form in the *Target Form (Choose)* column.
-   Via a query: Create a trigger and record an SQL query for the list
    in the *Field Triggers* form, another sub-level of the *Report
    Columns* form.

The Choose query is very similar to a CHOOSE-FIELD form trigger. You
retrieve two or three values, where the first retrieved value is
displayed in the Choose list, while the second is returned to the
:HTMLFIELD variable in the procedure. The third value (optional) is used
solely for sorting purposes. (Of course, you can also sort by each of
the other two fields.)

**Tip:** To make the retrieval conditional upon the values of other
fields in the same report, use a variable beginning with **\#** followed
by the column number (e.g., :#75 for column 75).

### Maintenance of Input and Links 

Any HTML page that the user accesses can include a number of reports.
Each of these reports may have a number of input columns and links. When
the user clicks on one of the links, the procedure runs anew (assuming,
of course, that the link entails a return to the procedure). When this
happens, the procedure needs to know which link the user has activated
and what values he or she specified in the input columns.

In most cases, the report has the format of a table (columns and rows).
In order to identify a given field, the system needs to know which
column and which row are involved, as well as the value of that field.
For this purpose, three variables have been specially created:

-   :HTMLACTION -- to identify the column (a fixed string)
-   :HTMLVALUE -- to identify the row (a value returned by one of the
    report fields other than the current field)
-   :HTMLFIELD -- to return the value of the current field (relevant for
    input columns, but not for links).

**Note:** Of course, for a report that displays only one record, it is
sufficient to identify the column (:HTMLACTION).

> **Example:** In the list of parts appearing in the Storefront, each
> part has at least two links:\
> (1) a link from the part description (or its picture), which opens a
> screen displaying more detailed information about the part;\
> (2) a link which adds the item to the shopping cart.

The procedure needs to receive the correct value for the :HTMLACTION
variable in order to know which action to take (e.g., "DETAILS" to
display part information or "SHOPPINGCART" to add the item to the cart).
In both cases, the value of :HTMLVALUE will be the same (the desired
part, i.e., **PART.PART**).

To identify the table column:

-   Specify the string which identifies the table column in the *Return
    Value Name (:HTMLACTION)* column of the *Report Columns--HTML
    Design* form. This becomes the :HTMLACTION variable in the procedure
    (see more below).

To identify the table row:

-   Specify the number of the column identifying the table row in the
    *Return Value Column# (:HTMLVALUE)* column. This becomes the
    :HTMLVALUE variable in the procedure.\
    ***Important!*** This report column must be either a displayed
    column or a sort column.

### Defining Links in the Report 

As explained above, a link in a report can be to a URL or to a procedure
(the current one or a new one). To create a web link (URL):

1.  Select *W* or *w* in the *Link/Input Type* column.
2.  Indicate the number of the column in which the URL is stored in the
    *Return Value Column# (:HTMLVALUE)* column.

To link back to the same procedure:

1.  Select *P, p, b, H* or *N* in the *Link/Input Type* column
    (depending on the type of window you want to generate).
2.  Indicate the columns that determine the return values (**HTMLVALUE**
    and **HTMLACTION**).

To create a link to a new procedure:

1.  Select *P, p, b, H* or *N* in the *Link/Input Type* column.
2.  Indicate the columns that determine the return values (**HTMLVALUE**
    and **HTMLACTION**).
3.  Record the column that defines the procedure in the *Internal Link
    Column \#* column. Ensure that the value in this column is the name
    (**ENAME**) of the procedure.\
    ***Important!*** This must be a sort column in the report.
4.  Return to the *Report Columns* form and move to the column specified
    in the preceding step.
5.  Enter the *Report Column Extension* sub-level form and, in the
    *Expression/Condition* column, record the name of the procedure you
    want to activate.

To link to multiple procedures:

-   Ensure that the column defining the procedure includes the name of
    the procedure that needs to be activated for each of the report
    records (similar to the same process in a form).

> **Example:** In order to display the financial document by its
> reference number in the journal entry, you need to activate one
> procedure in the case of an invoice, another procedure in the case of
> a customer receipt and a third procedure in the case of payment to a
> vendor.

## Handling Input From Report Columns in the Procedure 

Three variables help to determine input from report columns:

-   :HTMLACTION -- a fixed string identifying the column
-   :HTMLVALUE -- a value returned by a report field (other than the
    current one) that identifies the row
-   :HTMLFIELD -- returns the value of the current report field.

When the procedure is run anew (by the Internet user), the :HTMLACTION
and :HTMLVALUE variables contain the values from the field that the user
clicked to activate the link.

To access the values input by the user:

-   Create a cursor-like mechanism that passes through all the report's
    input columns, using the DISPLAY command within SQL code. Each time
    the command is activated, the values of a different input column are
    filled in from the report with the three variables.

**Notes:**

-   If several reports are displayed by the INPUT step, the values of
    input columns will be returned for ***all*** the reports.
-   If you include a Multiple Choose list or Multiple Check box field in
    the report, each of the user\'s selections is stored in a different
    :HTMLFIELD variable, but only one :HTMLACTION variable is defined
    (since all values were selected in a single column).

**Example:**
```sql
LABEL 1;
DISPLAY;
GOTO 2 WHERE :RETVAL <= 0;
…
LOOP 1;
LABEL 2;
```

{% if site.output == "web" %}
## Further Reading 

-   [User Identification for Priority Lite/Dashboards](User-Identification-for-Priority-Lite/Dashboards )
-   [Additional Input Options (Priority Lite/Dashboards)](Additional-Input-Options-(Priority-Lite/Dashboards) )
-   [Defining a Base Page for HTML Pages (Priority Lite/Dashboards)](Defining-a-Base-Page-for-HTML-Pages-(Priority-Lite/Dashboards) )
-   [Writing Dashboard Procedures](Writing-Dashboard-Procedures )
-   [Priority Lite and Dashboards](Priority-Lite-and-Dashboards )
{% endif %}