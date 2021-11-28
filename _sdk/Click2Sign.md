Version 20.1 introduced the Click2Sign feature, which allows a contact
to add their signature digitally to a document.

## Click2Sign General Requirements {#click2sign_general_requirements}

To work with Click2Sign the following conditions must be met:

-   Priority version 20.1 and up.
-   The document printout must be as a template document (Word).
-   The document only requires a single singature (one signature tag
    appears in the Word template).
-   The Priority installation must have a Click2Sign application license
    (APP016).

## Form Requirements {#form_requirements}

You can only add Click2Sign in documents for forms that fulfil the
following conditions:

-   The form is managed with a BPM flow chart
-   The uppermost level form contains a customer or vendor

## Adding Click2Sign to the Document {#adding_click2sign_to_the_document}

To add Click2Sign support, copy the standard document printout procedure
(or modify an existing private one), and add the following code to the
SQLI stage directly after the first HTMLCURSOR stage:

``` tsql
:IVC = document identifier
:TYPEC = flowchart type
#INCLUDE func/click2sign
```

You can find an example of this code in the system in the WWWSHOWCPROF
program.
