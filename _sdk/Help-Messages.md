---
title: Help Messages
layout: sdk_nav
---
<!-- TODO: Update to reflect shift to text form -->
## Forms

You can use the *Form Generator* to create on-line help messages for an
entire form or specific form columns. Form help is specified in the
*Help Text* form, a sub-level of the *Form Generator* form; column help
is designated in the *Help Text* form, a sub-level of the *Form Columns*
form. Whenever help messages (for the entire form or for any column) are
added or modified, the date and time of this revision appear in the
*Help Date* column of the *Form Generator* form.


**Note:** Any modifications of help messages, including the creation of
new ones, will not be seen by the user until the form in question has
been reprepared. Unlike other changes to the form, modifications of help
texts require you to remove the existing form preparation and execute it
again. To do so, run the *Reprepare Form* program by Direct Activation
from the *Form Generator*.

## Reports

Similarly, you can use the *Report Generator* to create on-line help
messages for an entire report and/or any report column appearing in its
parameter input screen. Help for the report itself is specified in the
*Help Text*form, a sub-level of the *Report Generator*form; input column
help is designated in the *Help Text*form, a sub-level of the *Report
Columns*form. Whenever help messages (for the entire report or for any
input column) are added or modified, the date and time of this revision
appear in the *Help Date*column of the *Report Generator*form.

**Note:** Do not write help for any report which is activated from a
procedure; instead, write the help for the procedure.

## Procedures

Finally, you can use the *Procedure Generator* to create on-line help
messages for an entire procedure and/or any parameter appearing in its
input screen. Help for the procedure itself is specified in the *Help
Text*form, a sub-level of the *Procedure Generator*form; parameter help
is designated in the *Help Text*form, a sub-level of the *Procedure
Parameters*form. Whenever help messages (for the entire procedure or
individual parameters) are added or modified, the date and time of this
revision appear in the *Help Date* column of the *Procedure
Generator*form.

## Line Breaking 

Line breaking for help messages is set automatically. Therefore, you can
freely edit the text in the *Help Text* form without having to worry
about the length of lines. You should therefore refrain from the use of
hyphenation. To force the beginning of a line, use the code \\n.

> **Examples:**\
> *The help for the **CPROFSTATS** form says:*\
> Use this form to view statuses of price quotations and their
> attributes. \\n\
> \\n\
> To define statuses, along with their attributes and rules, run
> {VISCPROFSTATS.P} from the list of Direct Activations.
>
> *The help for the **OPENORDIBYDOER** report says:*\
> Run this report to view orders to carry out, sorted by due date. \\n\
> \\n\
> The report displays the name of the user assigned to each order.

## Referring to Other Entities 

Often, you will want to refer to other ***Priority*** entities in your
help text. As entity titles are easily changed (even by the user),
whereas their names are relatively fixed by the time you begin to create
help messages, ***Priority*** offers a mechanism for referring to an
entity by name in the help text; its current title will consequently be
displayed when the help is called up by a user.

To refer to a specific entity in a help message, designate the entity
name followed by a period and its type (as illustrated in the above
example), where *F*=form, *R*=report and *P*=procedure, enclosing all of
this in curved brackets.

When your help messages are more or less complete, you should check that
all designated entity names and types (e.g., {VISCPROFSTATS.P}) are
correct. To do so, run the *Check Entity Names in Msgs/Help* report
(*System Management → Dictionaries → Messages and Help Text*). Any
mistakes that are uncovered will have to be corrected in the appropriate
*Help Text* form.

## Further Reading 

-   [Forms](Forms )
-   [Reports](Reports )
-   [Procedures](Procedures )
