---
title: Installing your Customizations
layout: sdk_nav
group: Installation
tags: 'Priority_SDK'
---

## Steps for Creating Version Revisions 

Version revisions are a built-in tool for moving customizations from one
***Priority*** installation to another. ***Priority*** automatically keeps
track of any modifications you make to any entity. All you need to do is
group these revisions together and prepare a shell file using standard
forms and programs.

1.  Enter the *Version Revisions* form (*System Management →
    Revisions*). Record a short description of the customization in
    question and fill in the mandatory columns in this form. A number
    will be assigned to the revision automatically.
2.  Enter the sub-level form, *Revision Steps*. A detailed list of
    modifications appears by code. Flag whichever modifications you wish
    to include in the shell file. They should all be related to the
    customization in question. The order in which you link these lines
    determines their order in the upgrade file.

    **Note:** The lines in the *Revision Steps* form are recorded in
        the name of the user who made the modification. This way, if you
        have more than one programmer, each can track his/her own
        changes.
3.  Once you have linked all the relevant modifications, create the
    shell file by running the *Prepare Upgrade* program by Action from the *Version Revisions* form. The shell file will be
    called *NN*.sh (where NN is the number assigned to the revision) and
    stored in the *system\\upgrades* directory.
4.  If you are creating a version revision for a system in another language, see the instructions in [Customizations: Installing the Language
    Dictionaries](Customizations-Language-Dictionaries )

## Explanation of the Modification Codes 

| Modification Code | Description |
  |--------------- | ------------ |
  | DBI            | Update of the database (tables, table columns, keys). |
  | DELDIRECTACT   | Deletion of a Action.
  | DELFORMCOL     | Deletion of a form column.
  | DELFORMLINK    | Deletion of the link between a form and its sub-level.
  | DELMENULINK    | Deletion of the link between a menu and its menu item.
  | DELPROCMSG     | Deletion of a procedure message.
  | DELPROCSTEP    | Deletion of a procedure step.
  | DELREPCOL      | Deletion of a report column.
  | DELTRIG        | Deletion of a form trigger.
  | DELTRIGMSG     | Deletion of a trigger message.
  | TAKEDIRECTACT  | Link an Action to a form.
  | TAKEENTHEADER  | Revision to the attributes of an entity (form, report, menu, procedure, interface), such as its title; in the case of a form, also revision to its default design.
  | TAKEFORMCOL    | Any type of revision to a form column (e.g., title, sorting, joins).
  | TAKEFORMLINK   | Linking of a form to its sub-level.
  | TAKEMENULINK   | Linkage of a menu item to its menu.
  | TAKEPROCMSG    | Addition/revision of a procedure message.
  | TAKEPROCSTEP   | Addition/revision of any part of a procedure step (e.g., parameters, step queries).
  | TAKEREPCOL     | Any type of revision to a report column (e.g., title, sorting, grouping).
  | TAKESINGLEENT  | Addition/revision of an entire entity.
  | TAKETRIG       | Addition/revision of a form trigger.
  | TAKETRIGMSG    | Addition/revision of a trigger message.
  | TAKEHELP       |  Addition/revision of online help for the designated entity.


## Tips for Working with Revisions 

-   Do not create a version revision until you have finished
    programming. This ensures that all revisions are numbered in the
    correct sequence (i.e., when multiple programmers are working in
    parallel).
-   Complete modifications on an entity before linking to the
    TAKESINGLEENT line. This is because, if you create a new entity, you
    will find a relevant record with the TAKESINGLEENT code in the
    *Revision Steps* form. Once you link this record to the version
    revision, any additional modification to that entity will receive a
    separate record with a separate code.

    > **Example:** You create a new form and link the relevant modification
    > to a TAKESINGLEENT line. If you then continue to add columns to the
    > form, you will receive additional TAKEFORMCOL lines for each new
    > column. However, you should not wait more than a working day. When
    > programming takes more than one day, try to prepare the upgrade at the
    > end of each day. This way, at the end of the programming, you will not
    > have to deal with a very large number of records in the *Revision
    > Steps* form.

-   There are also situations in which the order of the lines in the
    revision is important. Here are some examples:
    -   If you create a new document, the reports included in the
        document must appear before the procedure itself.
    -   When a procedure step includes a new form interface, the
        interface must be included in the revision before the procedure.
    -   When you add a new column to a table and then use this column in
        a form, you must first flag the DBI operation and only then flag
        the TAKEFORMCOL line.
-   Do not prepare the same upgrade twice. If a version revision needs
    to be modified after the upgrade has been prepared, create a new
    version revision with your modifications and run the **Prepare Upgrade** program for the new revision.

## Tracking Changes to Queries 

Several form and reports allow you to keep track of changes in queries
appearing in form triggers, SQLI procedure steps and load definitions,
once they have been included in a prepared version revision.

**Note:** Query changes are maintained per version revision. After
making your changes, open and prepare a new version revision. If you
reprepare an existing one, the previous change will not be saved, as the
new query text will overwrite the old one.

To view previous versions of a column trigger, a row or form trigger, an
SQLI step or a load definition:

1.  Enter the relevant form (*Form Column Triggers*, *Row & Form
    Triggers*, *Procedure Steps* or *Characteristics for Download*,
    respectively) and retrieve the appropriate record.
2.  Enter the *Previous Versions* sub-level form. This displays details
    of all version revisions that include the current query: the date of
    the revision, its number, a short description, the version number
    and the signature of the programmer.

    **Note:** Only revisions created after ***Priority*** version
        17.3 is installed will appear.
3.  Enter the next sub-level form, *Previous Versions -- Text*, to view
    the version of the query.

To view differences between the selected version of the query and other
versions:

1.  Return to the *Previous Versions* form and select *Track Changes*
    from the list of Actions.
2.  In the input screen, under *Text to Compare*, choose between the
    *Current Version* (the latest version in effect) and the *Previous
    Version* (the one immediately prior to the selected revision). Additions are marked in blue; deletions are marked
    in red strikethrough.

## Installing the Revision

**Caution:** If your revision includes changes to tables (DBI steps), you should ensure all users exit the system before installing the revision.

To install the revision:

1. If installing in the Windows interface, open Priority as an administrator.
2. Run the System Management > Revisions > **Install Upgrade** program.
3. In the input, browse to the shell file you created.

## Further Reading 

-   [Customizations: Installing the Language Dictionaries](Customizations-Language-Dictionaries )
