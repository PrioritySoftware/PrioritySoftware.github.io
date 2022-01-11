---
title: Procedure Steps
layout: sdk_nav
group: Procedures
---

## Introduction

To define the entities/commands in a [procedure](Procedures ),
and the order in which they are accessed, enter the *Procedure
Steps*form, a sub-level of the *Procedure Generator*form.

A procedure is composed of a set of entities and/or commands that are
executed in a fixed order. Each entity, identified by its name and type,
constitutes a separate step in the procedure. The order of execution is
determined by the *Step* column.


**Note:** When modifying the order of execution, it is not sufficient to
modify the value in the *Step* column. You must create an identical step
with a different *Step* value, and delete the step that previously
existed. Similarly, in the version revision you create for the
modification (see [Installing Your
Customizations](Installing-Your-Customizations )), you must
include both the step addition and step deletion.


## Step Types 

There are several different types of procedure steps, each of which is a
valid entity:

-   a [report](Reports ) (*R*), which generates a report after
    data processing
-   a [form](Forms ) (*F*), used to input data
-   a procedure (*P*), which activates a
    [sub-procedure](Running-a-Procedure#Running-a-Sub-Procedure )
-   a Basic command (*B*), used for [parameter
    input](User-Input-in-Procedures ), [message
    output](Procedure-Message-Display ) and [flow
    control](Procedure-Flow-Control )
-   a [form load interface](Interfaces ) (I), used to load
    data into a ***Priority*** form
-   a [table load file](Interfaces ) (*L*), used to import
    external data into the application
-   a compiled program (type *C*), used to manipulate data.

Specify the name of the entity or Basic command that constitutes each
procedure step (in the *Entity Name* column), as well as its type.

## Basic Commands 

The following is a list of useful Basic commands.

-   **BACKGROUND** (*Background Execution*) --- Causes the remainder of
    the procedure to be run in the background.
-   **CHOOSE** (*Select Parameter*) --- Creates a menu of exclusive
    options, one of which must be chosen by the user (by flagging one of
    the radio buttons). This Choose menu will ***not*** be displayed if
    the procedure is run as an Action from a form.
-   **CHOOSEF** (*Select Parameter*) --- Same as CHOOSE, except that the
    menu ***will*** be displayed when the procedure is run as an Action
-   **CONTINUE** (*Continue*) --- Opens a pop-up menu of two exclusive
    options, one of which must be chosen by the user. The procedure will
    continue if the **OK**option is chosen; it will halt if the
    **Cancel**option is selected. This pop-up menu will ***not*** be
    displayed if the procedure is run as an Action from a form.
-   **CONTINUEF** (*Continue*) --- Same as CONTINUE, except that the
    menu ***will*** be displayed when the procedure is run as an Action.
-   **END** (*End of Procedure*) --- Ends execution of the procedure;
    generally used in conjunction with the GOTO command.
-   **GOTO** (*Jump to Step*) --- Causes a jump to a designated
    procedure step (e.g., to repeat the procedure, or a portion of it,
    following a CONTINUE command).
-   **HTMLCURSOR** (*Create HTML Document*) --- Declares the cursor for
    a document. This step first creates a linked file that holds the
    records selected in the PAR input parameter.
-   **HTMLEXTFILES** (*Attach Files*) --- Causes the program that prints
    a document to include a flag in user input which allows the user to
    print attachments (stored in a sub-level of the document) as well.
-   **INPUT** (*Parameter Input*) --- Inputs parameter values; in the
    case of user input, creates a parameter input screen. The input
    screen will ***not*** be displayed if the procedure is run as an Action from a form. In document procedures, this command is also
    used (as a final step) to [display the
    document](Documents#Displaying-the-Document ).

:   **Note:** User input can also be defined for the SQLI program, as
    well as in specific report columns in a processed report (see more
    below).

-   **INPUTF** (*Parameter Input*) --- Same as INPUT, except that the
    parameter input screen ***will*** be displayed when the procedure is
    run as an Action.
-   **MESSAGE** (*Message*) --- Displays a procedure message on screen.
    The message number is stored in an **INT** parameter and the message
    content is recorded in the *Procedure Messages* form. This message
    will ***not*** be displayed if the procedure is run as an Action from a form.
-   **MESSAGEF** (*Message*) --- Same as MESSAGE, except that the
    message ***will*** be displayed when the procedure is run as an Action.
-   **PRINT** (*Print Message*) --- Displays on screen the contents of a
    file. Execution of the procedure continues after the user confirms
    receipt of the message. If the file is empty or does not exist,
    execution of the procedure continues uninterrupted. Alternatively,
    this command displays a designated string of characters. This
    message will ***not*** be displayed if the procedure is run by
    Direct Activation from a form.
-   **PRINTF** (*Print Message*) --- Same as PRINT, except that the
    message ***will*** be displayed when the procedure is run by Direct
    Activation.
-   **PRINTCONT** (*Print Message & Continue/Stop*) --- Like the PRINT
    command, displays on screen the contents of a file, but also offers
    the user the options of continuing execution of the procedure or
    halting. This message will ***not*** be displayed if the procedure
    is run as an Action from a form.
-   **PRINTCONTF** (*Print Message & Continue/Stop*) --- Same as
    PRINTCONT, except that the message ***will*** be displayed when the
    procedure is run as an Action.
-   **PRINTERR** (*Print Error*) --- Displays on screen the contents of
    a file containing an error message and causes procedure failure. If
    the file is empty, or no file exists, the procedure continues
    uninterrupted.
-   **SHOWCOPY** (*Create Certified Copy*) -- Creates a certified copy
    of a document. The command takes two parameters: the document ID and
    the document type (for a financial document, IV and \'I\'; for an
    inventory document, DOC and \'D\'). It must be followed by an END
    step and a BACKGROUND step. See, for example, the **IVSHOWCOPY**
    procedure. For more on certified copies, see [Special Document
    Features](Special-Document-Features ).
-   **URL** (*Open Webpage*) --- Opens a webpage according to a web
    address stored in an ASCII file.
-   **WRNMSG** (*Warning Message*) --- Like the MESSAGE command,
    displays a procedure message on screen. The difference is that a
    **Cancel** button appears as well, allowing the user to halt
    execution of the procedure. This message will ***not*** be displayed
    if the procedure is run as an Action from a form.
-   **WRNMSGF** (*Warning Message*) --- Same as WRNMSG, except that the
    message ***will*** be displayed when the procedure is run by Direct
    Activation.

## Further Reading 

-   [Procedure Parameters](Procedure-Parameters )
-   [User Input in Procedures](User-Input-in-Procedures )
-   [Procedure Step Queries](Procedure-Step-Queries )
-   [Procedure Flow Control](Procedure-Flow-Control )
-   [Procedure Message Display](Procedure-Message-Display )
-   [Processed Reports](Processed-Reports )
-   [Running a Procedure](Running-a-Procedure )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Rules-for-Customizing )
-   [Procedures](Procedures )
