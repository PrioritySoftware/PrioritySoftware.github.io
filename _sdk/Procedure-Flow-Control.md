---
title: Procedure Flow Control
group: Procedures
tags: 'Priority_SDK'
---

## Introduction

The CONTINUE, GOTO and END commands (usually together with some type of
Choose option) all affect procedure flow. In brief, they serve the
following purposes:

-   **CONTINUE**--- enables the user to continue or exit the procedure
    (see also the PRINTCONT command)
-   **GOTO**--- jumps to another procedure step
-   **Choose option** --- the value of the selected option is passed on
    to the GOTO command, determining the step to which the GOTO jumps
-   **END**--- ends the procedure.

## Continuing/Halting the Procedure 

When a procedure involves heavy data manipulation or has far-reaching
effects on the database, you may wish to offer the user the option of
exiting it prior to data processing. The user may have accidentally
activated the procedure, or may simply have changed his or her mind. The
CONTINUE command (without parameters) is used for that precise purpose.

## Using the GOTO Command 

The GOTO command, which is useful in conjunction with CONTINUE, causes
the procedure to jump forwards or backwards to another procedure step.
The GOTO command always has a single parameter whose value is **the
procedure step at which to continue** and whose type is **INT**.

**Note:** The value of the GOTO parameter may be a constant designated in
the *Value* column of the *Procedure Parameters* form; it may be
determined by an SQL statement; or it may be determined by the user's
choice of one of the CHOOSE options.


## Activating a User-Chosen Option 

You can create a procedure that offers the user several options and then
activates certain subsequent procedure steps based on the chosen option.
To design such a procedure, use the Choose functionality (via an input
step of Choose items or by means of the CHOOSE command) together with
GOTO and END commands. That is, the value of the chosen option can be
used to determine the value of the GOTO command. Simply use the same
parameter name for the GOTO command and leave the *Value* column blank
(remember to specify a type of **INT**). Thus, if the user chooses the
option whose value is 60, the procedure will proceed at step 60. It will
continue until an END command is encountered (or until there are no more
procedure steps).

You can also include a Choose option that simply ends the procedure, in
case the user wants to change his or her mind. This is achieved by
jumping to an END command (e.g., step 50). Note that the END command has
no parameters.

{% if site.output == "web" %}
## Further Reading 

-   [Procedure Steps](Procedure-Steps )
-   [Procedure Parameters](Procedure-Parameters )
-   [User Input in Procedures](Procedure-Input )
-   [Procedure Step Queries](Procedure-Step-Queries )
-   [Procedure Message Display](Procedure-Messages )
-   [Processed Reports](Processed-Report )
-   [Running a Procedure](Run-Procedure )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
-   [Procedures](Procedures )
{% endif %}