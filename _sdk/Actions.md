While ***Priority*** entities are generally accessed from the menus,
they may also be activated from within a specific record in a given
form. The form's Direct Activations may include:

-   root form --- the activation loads the form and its sub-levels;
-   report --- runs the report, then allows for display, printout, etc.
-   procedure --- if the procedure includes a program, the program will
    be run; if it entails processing of a report, the report will be
    run.

During activation of a program, report or procedure, input is usually
based on the content of the form line on which the cursor rests
(sometimes [user input](User_Input_in_Procedures "wikilink") is also
allowed). Upon exiting the entity that was activated, the user returns
to his or her original place in the form.

> **Example:** Select *Order Confirmation* from the list of Direct
> Activations in the *Sales Orders* form, and a printout will be created
> for the sales order on which the cursor rests in the form.

Direct activations can be executed in the foreground or the background.
If they are in the background, the user will be able to continue work in
the form while the program/procedure is being executed or while the
report is run, processed (where necessary) and printed. If direct
activation is in the foreground, the user has to wait until it is
completed to continue work in the form; and if the current form record
(i.e., the line on which the cursor rests) has been updated during the
direct activation, any new values will automatically be displayed. Use
background execution to run large programs and to print out reports.
Designate foreground activation when an entity is executed quickly and
sends a response to the waiting user.

To create the link between a form and an entity to be directly
activated, retrieve the form from the *Form Generator* form and specify
the entity in the *Direct Activations* sub-level form. Or enter the
generator for the entity (e.g., the *Report Generator* for a report) and
specify the form from which it is activated in the *Menu/Form Links*
sub-level form.

------------------------------------------------------------------------

**Note:** For more details on direct activation of simple reports, see
[Running a Report](Running_a_Report "wikilink"). For more on processed
reports and other procedures, see [Running a
Procedure](Running_a_Procedure "wikilink").

------------------------------------------------------------------------

## Further Reading {#further_reading}

-   [Forms](Forms "wikilink")
-   [Form Columns](Form_Columns "wikilink")
-   [Sub-level Forms](Sub-level_Forms "wikilink")
-   [Conditions of Record Display and
    Insertion](Conditions_of_Record_Display_and_Insertion "wikilink")
-   [Form Refresh](Form_Refresh "wikilink")
-   [Accessing a Related Form](Accessing_a_Related_Form "wikilink")
-   [Creating a Text Form](Creating_a_Text_Form "wikilink")
-   [Designing a Screen-Painted
    Form](Designing_a_Screen-Painted_Form "wikilink")
-   [Form Triggers](Form_Triggers "wikilink")
-   [Form Preparation](Form_Preparation "wikilink")
-   [Help Messages](Help_Messages "wikilink")
-   [Rules for Customizing](Rules_for_Customizing "wikilink")
