---
title: Flow Control
layout: sdk_nav
---

## Flow Control Commands {#flow_control_commands}

Several ***Priority***commands may be used in SQL statements to affect
execution flow. These are mainly used in long sequences of SQL commands
(e.g., form triggers). They include:

-   **GOTO**--- causes a jump *forward*to a given label when the
    statement is successful
-   **LOOP**--- causes a jump *backward*to a given label when the
    statement is successful
-   **LABEL**--- signifies the place at which to continue execution of
    SQL statements after a GOTO or LOOP command has been encountered.
    The label number must be identical to that specified for the
    appropriate GOTO or LOOP command.
-   **SLEEP**--- signifies the number of seconds to pause before
    continuing; generally, used when waiting for a response from an
    external device
-   **GOSUB**--- causes a jump to a specific sub-routine
-   **SUB**--- signifies the beginning of a sub-routine; no commands
    from here until the next RETURN command will be executed unless
    specifically called by a GOSUB command
-   **RETURN**--- ends the sub-routine and continues with the statement
    following the appropriate GOSUB command
-   **END**--- discontinues execution of SQL statements
-   **ERRMSG**--- causes failure and prints out an error message on
    screen; used in form triggers, step queries (in procedures) and load
    queries
-   **WRNMSG**--- prints out a warning message on screen; used in form
    triggers, step queries and load queries

------------------------------------------------------------------------

**Note:** When used in a step query, this does not necessarily delay the
procedure execution flow in the ***Priority*** web interface. To ensure
interruption of execution flow, use the CONTINUE basic command (see
[Procedure Steps](Procedure_Steps "wikilink")).

------------------------------------------------------------------------

-   **REFRESH**--- refreshes screen with updated values after data
    manipulation; used only in form triggers
-   **MAILMSG**--- sends a message by internal mail to a user or group
    of users, or by external mail to one or more e-mail addresses; can
    include an attachment

## Syntax of the Flow Control Commands {#syntax_of_the_flow_control_commands}

See [**Syntax Conventions**](SQL_Syntax#Syntax_Conventions" "wikilink").

The syntax of each of these commands is as follows:

-   **GOTO** *label_number* \[**WHERE** *condition* \];
-   **LOOP***label_number* \[**WHERE** *condition* \];
-   **LABEL** *label_number*;
-   **SLEEP** *number_of_seconds*;
-   **GOSUB** *sub_number* \[**WHERE** *condition* \];
-   **SUB** *sub_number*;
-   **RETURN**;
-   **END**\[ **WHERE***condition* \];
-   **ERRMSG***msg_number* \[ **WHERE***condition* \];
-   **WRNMSG***msg_number* \[ **WHERE***condition* \];
-   **REFRESH** 1;
-   **MAILMSG***msg_number ***TO **{**USER \| GROUP \| EMAIL **}
    \'\'recipient \'\'\[**DATA **\'\'attachment_filename\'\' \]
    \[**WHERE***condition* \];

Usually, the MAILMSG command retrieves the e-mail\'s subject and content
from the message specified in the *msg_number* argument, and any file
specified in the \[ **DATA***attachment_filename* \] option will be
included as an attachment. However, you can also have the MAILMSG
command create an e-mail on the basis of an existing HTML document by
using a *msg_number* argument that indicates an empty message and using
the \[ **DATA***attachment_filename* \] option to indicate an HTML
attachment.

------------------------------------------------------------------------

**Notes:**

-   If you use this option, the attachment indicated by the
    *attachment_filename*argument must be an HTML file.
-   If you are working on a Unicode installation, the HTML attachment
    should be saved in a Unicode-compliant format.

------------------------------------------------------------------------

\
If a value has been assigned to the :\_REPLYTOEMAIL variable, the
MAILMSG command sends the e-mail using that value as the reply-to e-mail
address*.* This setting overrides any default reply-to e-mail address
defined for the message.

------------------------------------------------------------------------

**Note:** This setting is applied only if you have set up external mail
without Outlook.

------------------------------------------------------------------------

## Examples of Usage {#examples_of_usage}

This example illustrates the following:

-   declare and open a cursor
-   if the open fails, go to end
-   if it succeeds, fetch the next record
-   use of sub routine
-   as long as there are more records to be fetched, execute the
    designated data manipulations on each record
-   once there are no more records, close the cursor
-   end execution.

``` priority
DECLARE C CURSOR FOR ...
OPEN C;
GOTO 9 WHERE :RETVAL = 0; /* Open failed; no record meets condition */
LABEL 1; 
FETCH C INTO ...
GOTO 8 WHERE :RETVAL = 0; /* No more fetched records */

'Database manipulations with the fetched fields; usually updates of some sort'

GOSUB 100 WHERE ...;
LOOP 1;
LABEL 8;
CLOSE C;
LABEL 9;
END;
SUB 100;

'More database manipulations with the fetched fields'

RETURN;
```

------------------------------------------------------------------------

**Note:** In this example the sub-routine is defined at the end. You can
also define the sub-routine at the beginning of the text.

------------------------------------------------------------------------

## Using Sub-routines {#using_sub_routines}

Sub-routines are useful, for example, for loading data. The SUB command
(together with an accompanying integer) marks the beginning of the
sub-routine; the RETURN command signifies its end. Sub-routines are only
executed when specifically called by the appropriate GOSUB command.
Thus, GOSUB 1 calls up SUB 1, GOSUB 2 calls up SUB 2, and so on. Once
RETURN is encountered, execution continues from the statement following
the relevant GOSUB command.

## Further Reading {#further_reading}

-   [Executing SQL Statements](Executing_SQL_Statements "wikilink")
-   [SQL Functions and
    Variables](SQL_Functions_and_Variables "wikilink")
-   [Additions and Revisions to Standard SQL
    Commands](Additions_and_Revisions_to_Standard_SQL_Commands "wikilink")
-   [Execution Statements](Execution_Statements "wikilink")
-   [LINK and UNLINK](LINK_and_UNLINK "wikilink")
-   [Return Values and Statement
    Failure](Return_Values_and_Statement_Failure "wikilink")
-   [Non-standard Scalar
    Expressions](Non-standard_Scalar_Expressions "wikilink")
-   [Viewing Table Structure](Viewing_Table_Structure "wikilink")
