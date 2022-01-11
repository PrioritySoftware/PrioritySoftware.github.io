---
title: Special Document Features 
layout: sdk_nav
group: Documents
---

## Sending Documents by Automatic Mail 

There are several print/send options to choose from when working with
documents. In addition to the standard options, you can use [calculated
report columns](Calculated-Columns-in-Reports ) to include an
Automatic Mail option (automatically sends the report to the designated
contact as an e-mail attachment).

To enable the Automatic Mail option, include a report column with the
title *#MAIL*. This option opens a customer or vendor task, depending on
the contact in the document. If the contact in question is an external
contact of another company (i.e., is linked to the customer/vendor in
the document via the *External Contacts* form), add a *#CUSTNAME* or
*#SUPNAME* report column that stores the number of the customer/vendor
in the current document. Otherwise, the task will be opened in the name
of the contact\'s company.

## Document Design: Forcing Display of the Line Number 

For HTML printouts that require line numbering, you can prevent users
from hiding the line number by including a report column whose title is
\{#LINE\}. Such a column will not be displayed in the design utility, will
appear untitled in the document and will automatically be assigned the
first column position.


**Notes:**

-   Only one \{#LINE\} column can be included in any given report.
-   Only user designs created in ***Priority*** version 17.3 and higher
    will be affected.

<!-- eDOCs now included in WINHTML documentation 

## A Special SQLI Step: Creating E-Documents 

You can customize [procedures](Procedures ) to send digitally
signed documents (e-documents) to designated customers via e-mail. In
the SQLI step used to go over the records before printing a document,
check whether the following conditions are met:

-   [:SENDOPTION](SQL-Functions-and-Variables#System-Variables )
    = \'AMAIL\' (the user has selected the Automatic Mail option in the
    Print/Send Options dialogue box).
-   [:WANTSEDOCUMENT](SQL-Functions-and-Variables#System-Variables )
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
    variable](SQL-Functions-and-Variables#System-Variables )
    to 1.

> **Example:**See the print formats defined for the **WWWSHOWCIV**
> procedure.

-->

## Further Reading 

-   [Documents](Documents )
-   [Outputting the Document](WINHTML)
-   [The Letter Generator](The-Letter-Generator )
