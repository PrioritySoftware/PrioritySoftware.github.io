## What is a Screen-Painted Form? 

Most of the frequently used upper-level forms are screen-painted. That
is, they display a single record organized into sets of vertical columns
within tabs. The number of tabs, their titles, how columns are organized
and the like, are all determined by the designer. Users can then use the
*Organize Field* utility to rearrange tabs and their columns, hide
columns, change titles and so forth.

------------------------------------------------------------------------

**Note:** To the user, any form in full-record display format looks
screen-painted. The difference is that, in a form that is not
screen-painted, tabs and their contents are created automatically.
Screen-painted forms are created by the *Screen Painter* program, which
can be run from the *Forms* menu or (by Direct Activation) from the
*Form Generator*. Each screen-painted form is stored in a file in the
system\\document\\lang.XX directory (where XX is the language code, as
defined in the *Languages* form). The filename is dNNNN.scr, where NNNN
is the form's internal number (the value of its autounique key).

------------------------------------------------------------------------

**Tip:** To find the internal number of a given form, run the following
query via the *SQL Development* program (fill in the form name):
\<syntaxhighlight lang=\"tsql\" enclose=\"pre> SELECT EXEC FROM EXEC
WHERE ENAME = *formname* AND TYPE = 'F' FORMAT;

```{=html}
</syntaxhighlight>
```
Once a user runs the *Organize Fields* utility, he or she views a
"private" version of the screen-painted form. Thereafter, most changes
you make in the *Screen Painter* will not be visible (with the exception
of added columns, which will appear in the **Misc** tab --- for more
details, see
[below](#Revising_a_Standard_Screen-Painted_Form )). To remove
the "private" version of the screen-painted form, the user must select
*Restore Defaults* (within the *Organize Fields* window).

## Creating Your Own Screen-Painted Forms 

Before you begin to design your own forms, you should look at existing
forms in the *Screen Painter* (e.g., **ORDERS, CUSTOMERS**). It may also
be helpful to copy an existing file of a screen-painted form to a new
file (whose name includes the internal number of the form you are
designing) and then make revisions via the *Screen Painter*.

The tool itself is relatively intuitive. The following are some basic
guidelines for using it:

-   To begin, from the **Form** menu, select **Open Release** and record
    the internal name of the form in question. A blank screen should
    appear.
-   To set the background color, from the **View** menu, select **Paper
    Color**.
-   Use the **Draw** menu (or the respective icons) to create needed
    geometric shapes:
    -   Use a large rectangle for the form itself.
    -   Use smaller ones to hold sets of form columns.
    -   Use a round rectangle to hold the form title. To add the title
        within the rectangle, record it in the **Text Properties**
        window that opens automatically.
    -   Click **Select Tool** (or press **Esc**) when done.
-   Right-click on a rectangle to change font, font size, font color,
    line color, fill color, etc.
-   To insert form columns:
    -   Click the **Import Form Column** icon (or select **Column** from
        the **Draw** menu).
    -   Select the desired column.
    -   Click and drag to define the column's location.
    -   The column and its title appear.
    -   Repeat to import another column.
    -   Click **Select Tool** (or press **Esc**) when done.
-   To add a form tab:
    -   Click the **Insert a Tab** icon (or select **Tab** from the
        **Draw** menu).
    -   Click and drag to define its size.
    -   Assign a tab title in the **Text Properties** window.
    -   Repeat to add another tab.
    -   Click **Select Tool** (or press **Esc**) when done.
-   To revise a title, double-click on it and make the necessary changes
    in the **Text Properties** window.
-   To align a set of titles and/or columns, select them all (click
    while holding down the **Shift** key) and, from the **Format** menu,
    select **Align** and then the desired direction (e.g., **Left**).
-   To distribute a set of titles and/or columns evenly, lining them up
    one under the other, select them all and, from the **Format** menu,
    select **Spacing**, then **Vertical**, then specify 0.
-   To obtain shapes (e.g., rectangles) of equal sizes, select them both
    and, from the **Format** menu, select **Size** and then the desired
    value (e.g., **Tallest**).
-   To move objects, select and drag. By default, movement is tied to
    the grid; to free it temporarily, from the **View** menu, select
    **Snap to Grid** (so it is not flagged) and make any needed
    adjustments. When done, reselect it (so it is flagged again).
-   To add free text (such as the form title), click the **T** icon; to
    include a picture (like in the **LOGPART** form), click the **P**
    icon.
-   To rearrange tabs or insert a tab in the middle:
    -   Make sure the screen (with the grid) is open to full size.
    -   Move all tabs, beginning with the last one and ending at the
        point that you want to make the revision, down to the grid area.
    -   Insert a new tab, as needed.
    -   Return the tabs to the large rectangle, in the desired order.
-   To save all changes, click the **Save Form Release** icon. It is
    recommended that you do so regularly, as there is no undo tool.

## Rules for Creating a Screen-Painted Form 

The following rules must be followed in order to obtain proper results
in the form interface:

-   Each tab must be comprised of a set of column titles next to a set
    of columns.
-   Each set of columns must be located within a single rectangle (the
    rectangle must be added to the tab).
-   You cannot include more than two sets of titles + columns in a
    single tab.
-   Each set of columns and each set of column titles must be properly
    aligned (use the **Align** tool described above).

## Revising a Standard Screen-Painted Form 

It is not necessary to use the *Screen Painter* when you add customized
columns to a standard form. Any added column will automatically be
included in the **Misc** tab when the user opens the form. The user can
then use the *Organize Fields* utility to move it to another tab. If the
**Misc** tab gets filled up to capacity, any additional columns will not
be accessible. In such a case, the user must move the columns appearing
in the **Misc** tab to another tab and then return to the **Misc** tab
to see the additional columns.

If you use the *Form Generator* to hide a column that appeared in an
existing screen-painted form, users will continue to see the column
title, but will see an empty box in place of the column data. In such a
case, they should use the *Organize Fields* utility to hide the column
in question.

## Creating a \"Totals\" Form 

A "Totals" form is a sub-level of a given document's itemization form.
It is a query form used to display selected columns (usually prices)
from the root form, as well as text recorded for the document in
question.

> **Example:** The **ORDERSTOTAL** form, which displays sales order
> totals, is a sub-level of **ORDERITEMS**, which in turn is a sub-level
> of the root form, **ORDERS**.

-   To create a "Totals" form:
    -   Use the base table of the root form (e.g., **ORDERS**) as the
        base table of the "Totals" form.
    -   Include all columns that you wish to display in the form.
    -   Make the "Totals" form the first sub-level of the root form's
        first sub-level.
-   To display the document's text:
    -   Add a hidden **CHAR** column to the "Totals" form with a width
        of 20.
    -   In the *Expression/Condition* of that column, record the name of
        the form from which the text should be displayed (e.g.,
        \'ORDERSTEXT\').

------------------------------------------------------------------------

**Note:** Use the *Screen Painter* to design the form. To display the
document text, add an \"Html Viewer\" element.

------------------------------------------------------------------------

## Further Reading 

-   [Forms](Forms )
-   [Form Columns](Form_Columns )
-   [Sub-level Forms](Sub-level_Forms )
-   [Conditions of Record Display and
    Insertion](Conditions_of_Record_Display_and_Insertion )
-   [Direct Activations](Direct_Activations )
-   [Form Refresh](Form_Refresh )
-   [Accessing a Related Form](Accessing_a_Related_Form )
-   [Creating a Text Form](Creating_a_Text_Form )
-   [Form Triggers](Form_Triggers )
-   [Form Preparation](Form_Preparation )
-   [Help Messages](Help_Messages )
-   [Rules for Customizing](Rules_for_Customizing )
