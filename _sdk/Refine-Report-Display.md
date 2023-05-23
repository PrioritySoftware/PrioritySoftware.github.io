---
title:  Refining Report Data Display
group: Reports
tags: 'Priority_SDK'
---

## Spacing Between Report Rows 

In a [report](Reports) with fixed positions, you can use a
hidden column with the title *#LINEHEIGHT* (**INT** type) to add a fixed amount of space between all rows of the report.

> **Example:** See the **BTLFORM100_DET** report.

## Width, Decimal Precision and Column Title 

[Report columns](Report-Columns ) inherit the widths, decimal
precisions and titles of the table columns whose data they display.
These values may be revised, where desired.

**Note:** Because of this option of modifying report attributes, any
changes in the width or decimal precision of a given table column
***will not affect*** existing report columns. In contrast, changes in
the title of the table column ***will*** be reflected in existing
reports, provided that no *Revised Title* has been assigned.

Widths are adjusted by deleting the inherited column width from the
*Width* column of the *Report Columns* form and specifying the desired
width. Decimal precision is adjusted by deleting the inherited decimal
precision from the *Display Mode* column of the same form and specifying
the revised one. However, you should be very careful when changing the
display mode for an **INT** column. Finally, inherited column titles are
overridden by specifying a new title in the *Revised Title* column of
the same form.


**Note:** Whereas a decimal precision of 0 (for a **REAL** column)
creates varied precision in a form, it rounds off the real number to an
integer in a report. Thus, you may wish to change decimal precision for
any **REAL** column with a precision of 0.


## Date Displays 

Dates may be displayed in a variety of formats. First of all, the user
will see dates according to either the American (MM/DD/YY) or European
(DD/MM/YY) convention, depending on the language which is being used.
Most examples in this manual are in American date format. 

In addition, date formats are determined by the display mode and width
assigned to the report column. You must ensure that there is sufficient
column width for the display mode you have chosen. For instance, to
display the day of the week alongside the date, specify a *Display Mode*
of 1 and a *Width* of at least 12. To display time as well as date,
specify a column width of between 14 and 19, depending on the display
mode. Finally, you can designate a date format of your own via a
calculated column (see below).

## Non-display of Zero Values 

You have the option of displaying or withholding the display of zero values with respect to **TIME**(00:00), **INT**(0) and **REAL**(0.0) columns. Depending on the value specified in the *Don\'t Display 0 Val* column of the *Report Columns* form, you can choose to:

-   display zero values in all columns (default);
-   leave the report column blank in case of zero values (*Y*);
-   when using a group function to calculate group and/or report totals, leave both report columns and totals blank when value is zero (*A*).

If a column contains all NULL values for the report, it will be omitted. For cases where you want to force the column to show even if all the values are empty, use a ternary expression to show a default NULL value when there is no value stored in the database. For example, if we want to show the Remarks for a sales order:

```sql
(ORDERS.DETAILS <> '' ? ORDERS.DETAILS : '&nbsp')
/* '&nbsp' is a non-breaking space in HTML, and can be
used as a null value for CHAR column */
```

## Displaying HTML Text in Reports 

There are several types of reports that can display HTML text:

-   A fixed component report that displays only text (e.g.,
    **WWWORD_4**).
-   A fixed component report in which all fields but the text appear in the first line as "Group By" fields, and the text appears in the second line (e.g., **CUSTNOTESSUM**).
-   A tabular component report in which all fields but the text appear as \"Group By\" fields, and the text appears in the second line under the column title (e.g., **WWWORD_2X**). In such a case, the following conditions must be met:
    -   A join of the **DAYS** table with the expression DAYS.DAYNUM BETWEEN 0 AND 1.
    -   A real join of the text table when DAYS.DAYNUM = 1; a join of the zero record in the text table when DAYS.DAYNUM = 0.
    -   Inclusion of an expression field (width = 68) that displays the title when DAYS.DAYNUM = 0, and displays the text when DAYS.DAYNUM = 1.

## HTML Design 

Various options are offered for revising the default HTML design of
reports. Some affect specific report columns, while others affect the
entire report. This facility is particularly useful when you want to
enhance the headers of printed documents (e.g., the way the company
name, address and date appear in the **WWWLOGO** report) or any other
one-record report. The following describes a number of the simpler, more
useful options.

To design individual report columns, use the *Report Columns-HTML
Design* sub-level of the *Report Columns* form.

-   *Design* tab: You can change the font and/or font color of a
    specific report column, as well as determine its background color.
    This can be defined directly in the report, or indirectly, by
    designating another report column whose value determines the font or
    color. For example, use the *Font Color Def. Column* to specify the
    *Col.* *Number* of the report column whose value sets the font
    color. If the designated report column is hidden, that column must
    have a value in the *Sort Priority* column.


-   *Location* tab: The default HTML design creates a regular report,
    with a title at the head of each vertical column. You can use the
    fields in this tab to divide the page into cells and to determine
    how each column is positioned within a cell (for more details, see
    [Displaying the
    Document](Documents#Displaying-the-Document )).
    -   Indicate the number of the row(s) and column(s) in which the
        field will be located.
    -   Designate the percentage of the *Column Width* when the field
        should not take up the entire cell.
    -   Choose a type of *Title Design*, if desired. For instance, if
        you want a different font for the column title (bold type) than
        for the displayed value (regular type), specify *D* and define
        the title\'s font in the sub-level form.
    -   Select one of the available *Data Display* options to determine
        how the field will be separated from the previous one. Or choose
        *W* to prevent line breaking of the displayed field value when
        there is insufficient room for all columns on the page.
    -   Use the *Horizontal Align* and *Vertical Align* columns in the
        *Display* tab to determine how the field is positioned within
        its cell.


-   *Picture* tab: You can use a specific report column to display a
    picture. Select the appropriate value in the *Picture* column and
    define the picture\'s width and height in pixels. Alternatively, you
    can determine the picture to be displayed based on other data
    appearing in the report (specify *D* in the *Picture* column and use
    the *Dynamic Picture Definition* column).

To affect the design of the entire report, use the *HTML Definitions*
sub-level of the *Report Generator* form.

-   *Outside Border/Inside Border* tabs: Use the columns in these tabs
    to change the definitions of report borders, including space between
    boxes (columns or cells). Outside borders usually separate data
    between groups (e.g., in a report of orders per customer, they
    separate data for different customers). Inside borders usually
    separate data within a group (e.g., customer number and customer
    name).


-   *More Defs* tab: You can define the number of columns to appear on
    each page, as well as indicate whether the report title will be
    displayed. The former feature allows you to display several reports
    next to each other (each appearing as a separate column on the
    page).

> **Example:** For border definitions, see the **WWWORD_2** report. For
> use of the *Design* and *Location* tabs, see column #50 in the same
> report. For inclusion of a picture, see column #170 in that report.

## Designing Reports Using CSS Classes 

***Priority*** reports are designed using predefined CSS classes and
IDs, which are maintained in a system file named *style.htm* (located in
the *system\\html* directory). This means that it is also possible to
revise the default HTML design of reports by defining additional classes
and applying them to the desired HTML object.

To do so, create a copy of the existing *style.htm* file (in the same
directory) with the filename *style2.htm* and use this file to define
your custom CSS classes. The system will automatically add the content
of this file (together with the content of the *style.htm* file) to the
header of every HTML report generated by the system (i.e., inside the
\<head> \</head> tags).

***Important!*** Do not modify the standard *style.htm* file, as changes
to this file may be overwritten by future ***Priority*** releases.
Instead, make any desired changes in the *style2.htm* file only.

CSS classes can be applied to any of the following objects in
***Priority***:

-   An entire report: Use the *Class* column (in the *HTML Definitions*
    sub-level of the *Report Generator* form) to apply a class to the
    entire report.
-   A specific report column: Use the *Class Definition Column* column
    (in the *Report Columns-HTML Design* sub-level of the *Report
    Columns* form) to apply a class to the current report column.
-   A specific font: Use the *Class* column in the *Font Definitions*
    form to apply a class to a specific font.

> **Example:** For report definitions, see the **WWWTABS2** report. For
> report column definitions, see columns #5 and #108 in the same report.

## Tips for Advanced Users 

Setting the column width is particularly useful when you display two
reports on the same HTML page, as it helps you line up the fields in the
second report directly below the fields in the first report. To use this
feature, assign corresponding columns in the two reports the same width.

To create a larger cell, place the field in question within a number of
cells, indicating the range of rows and/or columns (e.g., line 2 to 4).
These will then be combined into a larger cell.

To include more than one field in the same cell:

1.  Assign the same row(s) and column(s) to these fields.
2.  For each field involved, in the *Data Display* column, indicate how
    these fields should be situated (fields are ordered according to
    their position):
    -   one underneath the other (*Y*)
    -   next to each other, separated by commas (leave blank)
    -   next to each other, run on (*N*).
3.  For each field, in the *Title Design* column, indicate how to
    display its title:
    -   next to the field (*Y*)
    -   do not display (leave blank)
    -   in a separate table cell (*D*). Define the location of that cell
        in the next sub-level, *Column Title--HTML Design*.

{% if site.output == "web" %}
## Further Reading 

-   [Report Columns](Report-Columns )
-   [Organizing Report Data](Organize-Report-Data)
-   [Calculated Columns in Reports](Calculated-Columns-Reports)
-   [Types of Reports](Report-Types )
-   [Running a Report](Run-Report )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
-   [Reports](Reports )
{% endif %}