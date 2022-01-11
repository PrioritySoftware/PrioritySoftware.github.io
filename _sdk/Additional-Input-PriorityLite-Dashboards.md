---
title: Additional Input Options (Priority Lite/Dashboards)
layout: sdk_nav
group: Priority Lite
---

## Procedures That Work Like Forms (Input Screens) 

In addition to procedures that display reports, you can create
procedures that enable user input and have the "look" of a form.

To avoid replication of code (which leads to bugs), load the data into
***Priority*** via an interface to the desired form, using the [form
load utility](Form-Loads).

1.  Using **GENERALLOAD** as your load table, create a linked file of
    all data.
2.  Activate the form load interface.
3.  Check that all records in the table were loaded.
4.  If they were not, display the error message returned by the load
    program.

**Example:**
```sql
LINK GENERALLOAD TO :$.LNK;
/* Insert one or more lines into the linked file */
INSERT INTO GENERALLOAD (LINE,RECORDTYPE,…) VALUES(…);
/* Run the interface on the linked file */ 
EXECUTE INTERFACE ‘MYINTERFACE’, SQL.TMPFILE, ‘-L’, :$.LNK;
/* Insert the message that the interface gave to :PAR1 */
SELECT MESSAGE INTO :PAR1 FROM ERRMSGS
WHERE USER = ATOI(RSTRIND(SQL.CLIENTID,1,9)) 
AND TYPE = ‘i’ AND LINE = 1;

/* Display the message if any lines were not loaded successfully */
ERRMSG1 WHERE EXISTS (SELECT ‘X’ FROM GENERALLOAD
WHERE LOADED <> ‘Y’ AND LINE > 0);
UNLINK GENERALLOAD;
```

## User Input Validation and Messages 

### Input Validation 

In many cases, there is a need to validate user input, whether of
procedure parameters or of input report columns. To validate user input:

-   Add an SQL check (step query) to the INPUT step in the procedure. In
    the event of an error (i.e., ERRMSG that does not fail), the
    procedure will display the same HTML page as before, together with
    the appropriate error message.

### Resetting Variables and/or Generating the Reports Again 

Sometimes, before the page is re-displayed, you may want to send the
procedure back to a step prior to INPUT, so as to reset variables or to
generate the same reports anew. To go back to an earlier step:

-   Assign an appropriate value, in the INPUT step in question, to the
    :HTMLGOTO variable ***before*** the code for the error messages.

------------------------------------------------------------------------

**Note:** If no error messages are generated, the procedure ignores the
:HTMLGOTO variable and continues with the step that follows INPUT.

------------------------------------------------------------------------

### Another Way to Display Messages 

To display any type of message (including error messages) on the HTML
page:

1.  Add a MESSAGE step to the procedure, prior to the INPUT step.
2.  Record the message number as the value of its (single) parameter.

## Adding Explanatory Text 

In many procedures, especially those requiring user input, it is helpful
to add brief text that guides the user through the actions he or she has
to perform. While this text can be written on the base page itself, it
is more efficient to record it as set text directly in
**\'\'Priority**\'\'. For this purpose, a standard report called
**HTMLTEXT** has been created.

To include set text in the procedure:

-   Add a REPORT step for **HTMLTEXT** to the procedure (before the
    INPUT step). Use a single parameter: OUTPUT (as in any other
    report).

To record the set text itself:

1.  Enter the *Set Text for Internet Screens* form (*System Management*
    → *System Maintenance* → *Internet Definitions*). This form displays
    all Internet procedures, with a line for each REPORT step that runs
    **HTMLTEXT**.
2.  Move to the proper line (find the right procedure title and step
    number).
3.  In the *Set Text* sub-level form, write the explanatory text that
    will appear on the HTML page.

## Input of Text 

To enable the user to input text in the HTML screen, use a procedure
parameter of **TEXT** type. The user keys in an unlimited number of
lines in the text field, and these lines are returned to the procedure
via a file linked to the **PROCTABLETEXT** table. For an example, see
[Inputting Text Into an HTML
Screen](User-Input-in-Procedures#Inputting-Text-Into-an-HTML-Screen ).

## Input of Attachments 

The input of attachment files is another special type of procedure
input. Use a **CHAR** parameter and specify *Y* in the *Browse Button*
column of the *Procedure Parameter Extension* form.

In the HTML screen, the user records the attachment filename. After he
or she clicks **Go**, the procedure automatically copies this file to
the server in the *system\\mail* directory and records the new filename
in the procedure parameter. That is, after the INPUT step, the value in
the attachment parameter will not be the filename that the user keyed
in, but rather the filename in the server.

## Further Reading 

-   [User Identification for Priority
    Lite/Dashboards](User-Identification-for-Priority-Lite/Dashboards )
-   [Designing HTML Reports for Priority
    Lite/Dashboards](Designing-HTML-Reports-for-Priority-Lite/Dashboards )
-   [Defining a Base Page for HTML Pages (Priority
    Lite/Dashboards)](Defining-a-Base-Page-for-HTML-Pages-(Priority-Lite/Dashboards) )
-   [Writing Dashboard
    Procedures](Writing-Dashboard-Procedures )
-   [Priority Lite and
    Dashboards](Priority-Lite-and-Dashboards )
