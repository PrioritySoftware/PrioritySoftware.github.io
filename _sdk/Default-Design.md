---
title: Default Designs for Forms
layout: sdk_nav
---

# What is a Default Design for a Form? {#what_is_a_default_design_for_a_form}

Most of the frequently used upper-level forms are pre-designed. That is,
they display a single record organized into sets of vertical columns
within tabs. The number of tabs, their titles, how columns are organized
and the like, are all determined by the designer. Users can then use the
Organize Field utility to rearrange tabs and their columns, hide
columns, change titles and so forth.

# Creating a Default Design {#creating_a_default_design}

To create a default design:

1.  Open the form (e.g. **Sales Orders**) in **Priority** and design it
    using the system\'s *Organize Fields* utility. You can design both
    the single-record view (with tabs and columns) and the table view
    (rearranging the order of columns). More information on using this
    utility can be found in the User Interface Guide.
2.  Once you are satisfied with your design, open the form in question
    in the *Form Generator*, and run the *Set My Design as Default*
    program from the Actions menu.

The new design will be set as the default for that installation of
Priority -- users will revert to it after clicking *Restore Default* in
the *Organize Fields* utility.

**Note:** Default Designs replace screen-painting as a method to design
a form. However, an existing screen-painting takes precedence over a
default design. If you have changed the default design and see no effect
in the form for other users, check if there is an existing
screen-painting file in the system/document folder. If there is one,
delete it (save a backup) or move it, and check if the default design
has taken effect.

The screen-painting files use internal form numbers for the file name.
To find the internal number of a given form, run the following query via
the *SQL Development* program (fill in the form name):

> \<syntaxhighlight lang=\"tsql\" enclose=\"pre> SELECT EXEC FROM EXEC
> WHERE ENAME = *formname* AND TYPE = 'F' FORMAT;
>
> ```{=html}
> </syntaxhighlight>
> ```

# Distributing a Default Design in a Revision {#distributing_a_default_design_in_a_revision}

If you are creating a new form or design in your test environment, you
can distribute it as part of a revision:

1.  Open the **Version Revisions** form and add a revision.
2.  A step with code TAKEENTHEADER is automatically recorded for the
    form which you designed. Flag it for inclusion in the revision.
3.  Return to the upper level form and enter **S** in the **Designed
    Form** field.
4.  Prepare the revision.
