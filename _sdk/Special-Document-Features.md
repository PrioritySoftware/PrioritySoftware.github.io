## Sending Documents by Automatic Mail or Automatic Fax {#sending_documents_by_automatic_mail_or_automatic_fax}

There are several print/send options to choose from when working with
documents. In addition to the standard options, you can use [calculated
report columns](Calculated_Columns_in_Reports "wikilink") to include an
Automatic Mail option (automatically sends the report to the designated
contact as an e-mail attachment) and an Automatic Fax option
(automatically faxes the report to the designated contact).

To enable the Automatic Mail option, include a report column with the
title *#MAIL*. This option opens a customer or vendor task, depending on
the contact in the document. If the contact in question is an external
contact of another company (i.e., is linked to the customer/vendor in
the document via the *External Contacts* form), add a *#CUSTNAME* or
*#SUPNAME* report column that stores the number of the customer/vendor
in the current document. Otherwise, the task will be opened in the name
of the contact\'s company.

To enable the Automatic Fax option, include a report column with the
title *#FAX*. You also have the option of adding a *#DEST* column, which
will cause the contents of this field to appear at the top of the fax
alongside \"**Attn**.\"

## Document Design: Forcing Display of the Line Number {#document_design_forcing_display_of_the_line_number}

For HTML printouts that require line numbering, you can prevent users
from hiding the line number by including a report column whose title is
{#LINE}. Such a column will not be displayed in the design utility, will
appear untitled in the document and will automatically be assigned the
first column position.

------------------------------------------------------------------------

**Notes:**

-   Only one {#LINE} column can be included in any given report.
-   Only user designs created in ***Priority*** version 17.3 and higher
    will be affected.

------------------------------------------------------------------------

## A Special SQLI Step: Creating E-Documents {#a_special_sqli_step_creating_e_documents}

You can customize [procedures](Procedures "wikilink") to send digitally
signed documents (e-documents) to designated customers via e-mail. In
the SQLI step used to go over the records before printing a document,
check whether the following conditions are met:

-   [:SENDOPTION](SQL_Functions_and_Variables#System_Variables "wikilink")
    = \'AMAIL\' (the user has selected the Automatic Mail option in the
    Print/Send Options dialogue box).
-   [:WANTSEDOCUMENT](SQL_Functions_and_Variables#System_Variables "wikilink")
    = 1 (the user has flagged *Are sent e-mails digitally signed by
    Outlook* in the Mail Options dialogue box).
-   In the **CUSTOMERS** table, the value of the **EDOCUMENTS** column
    for the designated customer is *Y*.
-   The record in question has received a final status.
-   The document has not yet been printed (the *Printed* column is not
    flagged for the record in question).

If the above conditions are met:

-   add the words \" - Digitally Signed\" to the document\'s header.
-   flag the document as *Printed.*
-   to flag the e-mail for synchronization with ***Priority***
    (optional), set the value of the [:EDOCUMENT
    variable](SQL_Functions_and_Variables#System_Variables "wikilink")
    to 1.

> **Example:**See the print formats defined for the **WWWSHOWCIV**
> procedure.

## Creating a Digitally Signed PDF Document using Procedure Code {#creating_a_digitally_signed_pdf_document_using_procedure_code}

Assuming that the user running the procedure has been granted the
privileges required for digitally signing PDF documents, an HTML
document may be converted into a PDF and digitally signed from within
the procedure itself. This is done by adding the *--signpdf* option to
the WINHTML command.

> **Example:**The following code will create a digitally signed PDF of
> the sales order in which ORD = 100:
>
> ``` tsql
> :ORD = 100;
> :PDFFILE = '../../SOMEFILENAME.pdf';
> EXECUTE WINHTML '-d', 'WWWSHOWORDER','','','-v', :ORD, '-signpdf', '-pdf', :PDFFILE; 
> ```

## Creating an E-Document using Procedure Code {#creating_an_e_document_using_procedure_code}

If you are required to create a digitally signed E-Document, for
instance, when printing financial documents, you can create a digitally
signed E-Document from within the procedure itself. This is done by
adding the --edoc option to the WINHTML command.

> **Example:**The following code will create a digitally signed
> E-Document of an Invoice/Credit Memo:
>
> ``` tsql
> EXECUTE WINHTML '-d', 'WWWSHOWCIV', '', '', '-v', :IV, '-g', '-edoc', '-pdf', :FILE2, '-s'; 
> ```

To automate the mailing of the E-Document that you created, use the
following code:

> ``` tsql
> EXECUTE WINHTML '-d', 'WWWSHOWCIV', '', '', '-v', :IV, '-g', '-edoc,', '-pdf', '-AMAIL', '-s'; 
> ```

## Saving a Certified Copy when Printing a Document {#saving_a_certified_copy_when_printing_a_document}

You can define a procedure so that, when the document is printed or sent
by e-mail (:SENDOPTION = \'PRINT\' or \'AMAIL\'), a certified copy is
saved that can be printed later (using the *Create Certified Copy*
program).

In order to save a copy:

-   Include an [HTMLEXTFILES
    step](Procedure_Steps#Basic_Commands "wikilink") which goes over the
    attached files.
-   In the first INPUT step, set the :HTMLPRINTORIG variable to 1.
-   In the SQLI step after the HTMLCURSOR step, set the :SAVECOPY
    variable to 1.

These variables are updated during runtime, so that if several documents
are being printed together, the variables will be set for each
individual document, depending on its status.

> **Example:**See the **WWWSHOWCIV** procedure.

------------------------------------------------------------------------

**Note:** See also the [SHOWCOPY
command](Procedure_Steps#Basic_Commands "wikilink").

------------------------------------------------------------------------

## Further Reading {#further_reading}

-   [Documents](Documents "wikilink")
-   [The Letter Generator](The_Letter_Generator "wikilink")
