## Introduction

The *Letter Generator* allows users to design letters that can be sent
to a third party (e.g., a customer or vendor) using dynamically
populated data fields. In the *Letter Generator*form, users can assign
the letter a name and choose which [procedure](Procedures "wikilink") is
used to create it. This procedure creates letters for a specific
recipient or group, using a linked form record (e.g., a record in the
*Customers* or *Vendors* form) to populate any data fields.

The *Letter Generator*form has two sub-levels:

-   *Remarks* --- Used to design and edit the content of the letter
    (including data fields).
-   *Attachments*--- Used to attach relevant files to the letter.

## Creating a Letter {#creating_a_letter}

Procedures used to create and send letters are like other procedures
that generate HTML documents, and use a similar structure. A procedure
of this type should contain the following steps, in this order:

-   [INPUT](Procedure_Steps#Basic_Commands "wikilink")
-   [HTMLCURSOR](Procedure_Steps#Basic_Commands "wikilink")
-   An SQLI step to retrieve the record for which the letter is being
    created (by means of the [HTMLVALUE
    variable](Documents#Going_Over_the_Records "wikilink")) and insert
    values from this record and related records into the **LETTERSTACK**
    table (see below).
-   Any reports that should appear at the top of the letter (e.g., the
    company logo and document number).
-   A MAILMERGE step, which populates any fields in the formatted text
    with the corresponding values. The MAILMERGE program receives the
    following parameters:
    -   A linked table which receives the formatted text, after all
        fields have been replaced by the corresponding values.
    -   A variable of **INT** type that holds the autounique value of
        the relevant record.
    -   A variable of **CHAR** type that holds the name of the column
        containing the record\'s autounique value (e.g.,
        **CUSTOMERS.CUST** or **SUPPLIERS.SUP**).
-   The LETTERSTEXT report. Like other reports that are run with
    processed data, this report receives two parameters:
    -   A linked table containing the processed data (in this case, the
        linked table from the MAILMERGE step, in which all fields have
        been replaced by the corresponding values).
    -   An **ASCII** parameter with the value \"OUTPUT\", which receives
        the report\'s output.

:   This report can be defined once and then reused as is for any
    procedures used to create letters, with no need for further
    modification.

-   Any reports that should appear at the bottom of the letter (e.g.,
    the user\'s signature).
-   The INPUT command, which combines all the text file parameters that
    were sent to the reports in the procedure into a single HTML file.
-   The END command (which ends the procedure).
-   The source report for the letter. This report lists all data fields
    that can be included in the letter, and is based on the
    **LETTERSTACK** table (see below).

> **Example:**See the standard **CUSTLETTER** procedure.

**Note:** If you are creating a procedure used to create and send
letters by copying an existing procedure, make sure to delete the
letters defined for the original procedure (in the **Print Formats**
sub-level form) from the copied procedure. Then, assign new letters to
the new procedure.

## The LETTERSTACK Table {#the_letterstack_table}

This table is used as a basis for the procedure\'s source report. The
table\'s unique key contains the following 4 columns:

-   **USER**
-   **STATUSTYPE**
-   **KEY1**
-   **KEY2**

During the SQLI step, this table is populated with values taken from the
record for which the letter is being created (and related records), as
follows:

-   **USER ---**Receives the name of the current user.
-   **STATUSTYPE ---**Receives the type of document for which the letter
    is being created, represented by the [BPM
    system](Creating_BPM_Flow_Charts "wikilink") assigned to that
    document type. For example, for letters to customers, this column
    receives the value *5*.
-   **KEY1 ---**Receives the autounique value of the record for which
    the letter is being created (e.g., **CUSTOMERS.CUST**). This is
    usually the value of the HTMLVALUE variable in the procedure.
-   **KEY2 ---**This column can receive the autounique value of a
    related record used in the letter\'s source report (e.g., for
    letters to customers, this column can receive the autounique value
    of the customer\'s main contact).

------------------------------------------------------------------------

**Notes:**

-   To offer users the option of sending a letter using the [Automatic
    Mail and Automatic
    Fax](Special_Document_Features#Sending_Documents_by_Automatic_Mail_or_Automatic_Fax "wikilink")
    print/send options, the letter\'s source report must include columns
    with the revised title *#MAIL* and *#FAX*, respectively.
-   To offer users the option of sending attachments together with the
    letter, include the HTMLEXTFILES command after the HTMLCURSOR step,
    recording a step query for it.
-   Letters can also be attached to mail messages sent by the BPM
    mechanism, provided the same document type is assigned to both the
    letter and the BPM flow chart.
-   A single letter can be linked to more than one procedure (in the
    *Letter Generator*form). In such a case, users will be able to
    choose the desired procedure in the Print/Send Options dialogue box.

------------------------------------------------------------------------

## Further Reading {#further_reading}

-   [Documents](Documents "wikilink")
-   [Special Document Features](Special_Document_Features "wikilink")
