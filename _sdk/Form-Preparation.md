## Introduction

A form which has been constructed or revised cannot be accessed on
screen until it is prepared as an executable file. In most cases, form
preparation is activated automatically when you attempt to open an
unprepared form. You can also activate it manually:

-   Run the *Form Preparation* (**FORMPREP**) program (*System
    Management → Generators → Forms → Form Preparation*), which can
    prepare multiple forms simultaneously.
-   Run the *Prepare Form* program by Direct Activation from the *Form
    Generator* for a specific form.

Form preparation will fail if errors are encountered (and you will be
referred to an *Errors Report*, located in the same menu). There are
several types of major errors: trigger errors, problems with form
content and problems with form display.

Examples of possible problems:

-   A column in the base table's [autounique or unique
    key](Keys "wikilink") is missing from the form
-   A [calculated
    column](Form_Column_Attributes#Calculated_Columns "wikilink") has
    been assigned a width that is unsuitable for its column type (e.g.,
    a width of 11 for a **DATE** column)
-   A form column is neither derived from a table column nor defined by
    an expression.

------------------------------------------------------------------------

**Note:** In rare cases, the *Form Preparation* program fails to replace
the older version of the form. If that occurs, retrieve the form in
question in the *Form Generator* and run the *Reprepare Form* program by
Direct Activation.

------------------------------------------------------------------------

## Loading a Form {#loading_a_form}

The *Load Form* program (*System Management → Generators → Forms*)
allows you to access a form on screen without going through any menus. A
similar program (*Open Form*) can be run by Direct Activation from the
*Form Generator*. These interchangeable programs are particularly useful
during the form's development stages.

------------------------------------------------------------------------

**Note:** An unprepared form cannot be opened in this manner; it must
first be prepared.

------------------------------------------------------------------------

When loading a form, **the designated form may not be linked to any
upper-level form**. To access a sub-level form, load the most
upper-level form in its tree (the root form) and use that form to access
sub-level forms.

> **Example:** To access the **ORDERITEMS** form, load the upper-level
> **ORDERS** form and then access the sub-level form via a record in the
> *Sales Orders* form.

## Further Reading {#further_reading}

-   [Forms](Forms "wikilink")
-   [Form Columns](Form_Columns "wikilink")
-   [Sub-level Forms](Sub-level_Forms "wikilink")
-   [Conditions of Record Display and
    Insertion](Conditions_of_Record_Display_and_Insertion "wikilink")
-   [Direct Activations](Direct_Activations "wikilink")
-   [Form Refresh](Form_Refresh "wikilink")
-   [Accessing a Related Form](Accessing_a_Related_Form "wikilink")
-   [Creating a Text Form](Creating_a_Text_Form "wikilink")
-   [Designing a Screen-Painted
    Form](Designing_a_Screen-Painted_Form "wikilink")
-   [Form Triggers](Form_Triggers "wikilink")
-   [Help Messages](Help_Messages "wikilink")
-   [Rules for Customizing](Rules_for_Customizing "wikilink")
