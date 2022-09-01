---
title: Help Messages
group: Forms
tags: 'Priority_SDK'
---

**Important:** Help messages, regardless of type/location, should not exceed 2000 characters in length.
## Forms

You can use the *Form Generator* to create on-line help messages for an entire form or specific form columns. Form help is specified in the *Help Text* form, a sub-level of the *Form Generator* form; column help is designated in the *Help Text* form, a sub-level of the *Form Columns* form. Whenever help messages (for the entire form or for any column) are added or modified, the date and time of this revision appear in the *Help Date* column of the *Form Generator* form.


**Note:** Any modifications of help messages, including the creation of new ones, will not be seen by the user until the form in question has
been reprepared. Unlike other changes to the form, modifications of help texts require you to remove the existing form preparation and execute it
again. To do so, run the *Reprepare Form* program by an Action from the *Form Generator*.

## Reports

Similarly, you can use the *Report Generator* to create on-line help messages for an entire report and/or any report column appearing in its parameter input screen. Help for the report itself is specified in the *Help Text* form, a sub-level of the *Report Generator* form; input column help is designated in the *Help Text* form, a sub-level of the *Report Columns* form. Whenever help messages (for the entire report or for any input column) are added or modified, the date and time of this revision appear in the *Help Date* column of the *Report Generator* form.

**Note:** Do not write help for any report which is activated from a
procedure; instead, write the help for the procedure.

## Procedures

Finally, you can use the *Procedure Generator* to create on-line help messages for an entire procedure and/or any parameter appearing in its input screen. Help for the procedure itself is specified in the *Help Text* form, a sub-level of the *Procedure Generator* form; parameter help is designated in the *Help Text* form, a sub-level of the *Procedure Parameters* form. If you use a procedure parameter of type **HELP**, the contents of the help message will appear as part of the input window (rather than after clicking the help button). Keep in mind that the space in the input window is more limited than that of a help popup, so the message should be kept short.

Whenever help messages (for the entire procedure or individual parameters) are added or modified, the date and time of this revision appear in the *Help Date* column of the *Procedure Generator* form.

## Referring to Other Entities 

Often, you will want to refer to other ***Priority*** entities in your help text. As entity titles are easily changed (even by the user), whereas their names are relatively fixed by the time you begin to create help messages, ***Priority*** offers a mechanism for referring to an entity by name in the help text; its current title will consequently be displayed when the help is called up by a user.

To refer to a specific entity in a help message, designate the entity name followed by a period and its type (as illustrated in the above example), where *F*=form, *R*=report and *P*=procedure, enclosing all of this in curved brackets.


{% if site.output == "web" %}
## Further Reading 

-   [Forms](Forms )
-   [Reports](Reports )
-   [Procedures](Procedures )
{% endif %}