## Introduction

When an imported column appears in a given form, the user can move from
that column to a target form (generally the form which is derived from
the join table). In this way, the user can gain easy and rapid access to
the target form without having to use the menus.

## The Target Form {#the_target_form}

The target form must meet two conditions:

-   it must be a root form (have no upper-level form of its own).
-   its base table must include the column from which the user
    originated.

The move from an imported column to a target form is automatic whenever
the target form and its base table share the same name (the form's title
is irrelevant). As only one form in the entire application meets that
condition (form names are unique), that form is considered the default
target form. However, you may also wish to designate a target form
manually. Generally, this is the case when several application forms
share the same base table. Obviously, only one of those forms have the
same name as that table. Therefore, if you wish the user to access a
different form, you have to do one of the following:

-   make the form in question the main target (record *M* in the
    *Zoom/International* column of the *Form Generator* form); it can be
    reached from any form in the application;
-   make it an application target (record *Z* in the same column); it
    will only be reached from forms having the same application code; or
-   make it a specific target form for a single form column (in the
    *Target Form Name* column of the *Form Column Extension* form); this
    will only affect the move from the column in question.

All manually designated targets always override the default target form.
The target form designated for a specific column overrides all other
target forms. The application target always overrides the main target.

------------------------------------------------------------------------

**Note:** To disable automatic access from a given column, specify the
**NULL** form as the target form in the *Form Column Extension* form.

------------------------------------------------------------------------

Sometimes the table column name in the target form differs from the
table column name in the current form. In such a case, the names of both
columns must be entered into the **ZOOMCOLUMNS** table, so as to
indicate which column in the target form is equivalent to the current
one.

> **Example:** The **LOADLOCATIONSMIG** form includes the
> **SONPARTNAME** column, for which the **LOGPART** form is specified as
> the target form. In order for the correct record to be retrieved when
> entering **LOGPART**, the following is recorded in the *Target Zoom
> Columns* (**ZOOMCOLUMNS**) form: *Source Column* = SONPARTNAME;
> *Target Column* = PARTNAME.

## Dynamic Access {#dynamic_access}

Sometimes you want the target form to vary, based on the data displayed
in a given record. For example, in the *Audit Trail* form (**LOGFILE**),
the target form of the **LOGDOCNO** column (*Doc/Invoice Number*) is the
relevant document (**DOCUMENT_D, DOCUMENTS_N, AINVOICES**, etc.).

This is achieved by defining a special hidden form column, **ZOOM1**, as
well as specifying **ZOOM1** as the target form in the *Form Column
Extension* sub-level form. This hidden form column holds the internal
number (in the current example, **EXEC**) of the relevant form for each
record. The **DOCTYPES** table has a special **EXEC** column that holds
the internal number of the form for that document type. In the PRE-FORM
trigger of the **LOGFILE** form, the variables that hold internal
numbers of the relevant forms are initialized. In some cases the target
form is the form defined in the **DOCTYPES** table; in other cases the
target form is one of the variables initialized in the PRE-FORM trigger
of the **LOGFILE** form.

## Further Reading {#further_reading}

-   [Forms](Forms "wikilink")
-   [Form Columns](Form_Columns "wikilink")
-   [Sub-level Forms](Sub-level_Forms "wikilink")
-   [Conditions of Record Display and
    Insertion](Conditions_of_Record_Display_and_Insertion "wikilink")
-   [Direct Activations](Direct_Activations "wikilink")
-   [Form Refresh](Form_Refresh "wikilink")
-   [Creating a Text Form](Creating_a_Text_Form "wikilink")
-   [Designing a Screen-Painted
    Form](Designing_a_Screen-Painted_Form "wikilink")
-   [Form Triggers](Form_Triggers "wikilink")
-   [Form Preparation](Form_Preparation "wikilink")
-   [Help Messages](Help_Messages "wikilink")
-   [Rules for Customizing](Rules_for_Customizing "wikilink")
