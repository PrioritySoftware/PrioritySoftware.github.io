---
title: Procedure Messages
layout: sdk_nav
---

## PRINT, PRINTCONT and PRINTERR {#print_printcont_and_printerr}

The PRINT, PRINTCONT, and PRINTERR commands are very similar. However,
whereas the PRINT command only displays a message, the PRINTCONT command
also allows the user the options of continuing execution of the
procedure or stopping. In this sense, it is similar to the CONTINUE
command. PRINTERR command causes procedure failure; thus, it should be
used to display error messages which explain that the procedure cannot
be successfully completed.

## Printing a Fixed Message {#printing_a_fixed_message}

In addition to their usage for printing messages from a message file,
the PRINT and PRINTCONT commands can be used to print out a fixed
message on screen. To use the PRINT or PRINTCONT command in this manner,
assign **CHAR** type to its parameter and specify the message to be
printed in the *Title* column of the *Procedure Parameters* form.

Alternatively, you can use the MESSAGE and WRNMSG commands to display a
message; in the latter case, the user can opt to halt execution of the
procedure. The message number must be stored in an **INT** parameter
(either via the *Value* column or defined in an earlier procedure step);
its content is recorded in the *Procedure Messages* form.

## Further Reading {#further_reading}

-   [Procedure Steps](Procedure_Steps "wikilink")
-   [Procedure Parameters](Procedure_Parameters "wikilink")
-   [User Input in Procedures](User_Input_in_Procedures "wikilink")
-   [Procedure Step Queries](Procedure_Step_Queries "wikilink")
-   [Procedure Flow Control](Procedure_Flow_Control "wikilink")
-   [Processed Reports](Processed_Reports "wikilink")
-   [Running a Procedure](Running_a_Procedure "wikilink")
-   [Help Messages](Help_Messages "wikilink")
-   [Rules for Customizing](Rules_for_Customizing "wikilink")
-   [Procedures](Procedures "wikilink")
