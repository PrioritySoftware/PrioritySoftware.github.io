## Introduction

To record SQL statements, use the *Step Query* form, a sub-level of the
*Procedure Steps*form (itself a sub-level of the *Procedure Generator*).

INPUT, SQLI, HTMLCURSOR and HTMLEXTFILES commands can be accompanied by
SQL statements that serve as step queries. Such queries are carried out
after parameter input.

------------------------------------------------------------------------

**Notes:**

-   SQLI is a procedure step that executes SQL statements.
-   HTMLCURSOR and HTMLEXTFILES are Basic commands used in creating
    [documents](Documents "wikilink").

------------------------------------------------------------------------

## Error and Warning Messages {#error_and_warning_messages}

The SQL statements in step queries resemble those in form triggers. For
instance, they can generate [error or warning
messages](Error_and_Warning_Messages "wikilink") (by means of ERRMSG and
WRNMSG statements). The contents of these messages are generally
specified in the *Procedure Messages*form, a sub-level of the *Step
Query*form. Long messages (taking up more than one line) can be
continued in the next sub-level, *Procedure Messages (cont.)*.
Alternatively, [message
content](Error_and_Warning_Messages#Specifying_the_Message_Content "wikilink")
can be taken from an external file.

In any given error or warning message, you can include a message
parameter (`<P1>`{=html}, `<P2>`{=html}, `<P3>`{=html}). The values to
be assigned to these parameters are defined in the query that generates
the message, by means of the system variables :PAR1, :PAR2 and :PAR3.

You can also refer to a specific **\'\'Priority**\'\'entity in the
message, using the format **{*entity_name*.**{ **F**\| **R**\| **P**}
**}**, where F = form, R = report and P = procedure. That is, you
designate the entity name and type, and the entity's title will appear
in their place. This format is useful because entity names are rarely
changed, whereas titles are rather likely to be modified in upgraded or
customized versions. In this way, the most up-to-date title will appear
in your message.

You can also send a mail message via a step query, using the [MAILMSG
command](Sending_a_Mail_Message "wikilink").

When activating the MAILMSG command from an SQLI step in a procedure,
messages are not actually sent until the SQLI step is completed. In the
interim, the MAILMSG command stores any messages being sent in that SQLI
step in a buffer. This buffer is limited to 100 messages, meaning you
cannot send more than 100 messages in the same SQLI step.

If you wish to send more than 100 messages, you can bypass this limit by
creating an internal loop between procedure steps, using the [GOTO Basic
command](Procedure_Steps#Basic_Commands "wikilink"). Finish the SQLI
step and, in the next procedure step, use the GOTO command to return to
that SQLI step (or to continue to the next procedure step, once all
messages have been sent). In each iteration, up to 100 messages will be
sent.

------------------------------------------------------------------------

**Note:** Use this option carefully and avoid creating an infinite loop.

------------------------------------------------------------------------

## Parameter Variables {#parameter_variables}

Step queries can include SQL variables that refer to specific
parameters. The system defines an SQL variable for each parameter, which
stores its value (:*ProcedureName.ParameterName*). Similar to the case
of form variables, the procedure name can be replaced by the wildcard
"\$" if reference is to the current procedure (i.e.,
:\$.*ParameterName*).

## Procedures With Heavy Processing {#procedures_with_heavy_processing}

In a procedure that requires heavy processing via a cursor, you can
display a progress bar that indicates to the user how far the program
has progressed. To do so, use the following step query:

``` tsql
DECLARE mycursor CURSOR FOR …;
OPEN mycursor;
:N = :RETVAL; 
:I = 0;
GOTO 9 WHERE :N <= 0;
LABEL 1;
FETCH mycursor INTO …;
GOTO 8 WHERE :RETVAL <= 0;
:I = :I + 1;
DISPLAY :I OF :N; {processing of current record}
LOOP 1;
LABEL 8;
CLOSE mycursor;
LABEL 9;
```

***Important!*** You can use the same cursor more than once within a
given procedure or form trigger, but the declaration can be done only
once. If, for example, you write a buffer that contains a cursor, and
you want to use that buffer more than once in a procedure, you must
write the declaration section in a separate buffer.

## Checking SQL Syntax {#checking_sql_syntax}

You can check the SQL statements in the step query for syntax errors,
prior to activation of the procedure itself, by running the *Syntax
Check* program by Direct Activation from within the *Procedure
Generator*form.

## Tracking Changes in Step Queries {#tracking_changes_in_step_queries}

You can track changes to step queries once they have been included in
prepared version revisions. See [Tracking Changes to
Queries](Installing_Your_Customizations#Tracking_Changes_to_Queries "wikilink").

## Further Reading {#further_reading}

-   [Procedure Steps](Procedure_Steps "wikilink")
-   [Procedure Parameters](Procedure_Parameters "wikilink")
-   [User Input in Procedures](User_Input_in_Procedures "wikilink")
-   [Procedure Flow Control](Procedure_Flow_Control "wikilink")
-   [Procedure Message Display](Procedure_Message_Display "wikilink")
-   [Processed Reports](Processed_Reports "wikilink")
-   [Running a Procedure](Running_a_Procedure "wikilink")
-   [Help Messages](Help_Messages "wikilink")
-   [Rules for Customizing](Rules_for_Customizing "wikilink")
-   [Procedures](Procedures "wikilink")
