---
title: Defining a Base Page for HTML Pages (Priority Lite/Dashboards)
layout: sdk_nav
group: Priority Lite
tags: 'Priority_SDK'
---

## Defining the Base Page 

As HTML pages are generated by each INPUT step in the procedure, you
have to construct ***a separate base page*** for each INPUT step. To
create base pages automatically:

-   Run the *Create HTML Pg for Step* program, which is an Action from the *Procedure Steps* form, sub-level of the
    *Procedure Generator*.

The resultant base page will be in ASCII format and can be found in the
*system\\html* directory of the ***Priority*** server. Its name is the
procedure name followed by the step number.

**Example:** If you run the program for the **MYPROG** procedure at
step 50, you will create a page called MYPROG-50.htm.

It is advisable to include as little text as possible in base pages, in
order to facilitate localization to different languages (not including
bi-directional languages such as Hebrew and Arabic) using the same base
page.

To this end, it is possible to automatically insert a document\'s header
as the title of the HTML page, using the following syntax:

`<TITLE><!--| Priority Title |--></TITLE>`

Similarly, you can insert procedure messages directly into the base page
when the document is produced.

**Example:** To insert message 5 of the **WWWDOCUMENTS_Q** procedure
in a base page, add the following HTML tag:\
\<!\--\| Priority Message (WWWDOCUMENTS_Q 5) \|\--\>

***Important!*** Whenever you add a new report or input parameter to a
given INPUT step, you must ***re-create the base page*** (i.e., run the
program again).

------------------------------------------------------------------------

**Note:** If you are working in Hebrew, the program will prepare the
base page in both Hebrew (right-to-left) and English (left-to-right),
where the former is stored in the *system\\html* directory and the
latter is stored in the *system\\html\\lang3* directory.

------------------------------------------------------------------------

## Revising the Base Page 

Once the base page has been created, you can revise it using any
standard editor for HTML page design. You can add pictures, links and
text, and you can change the order and position of the reports,
parameters and messages that are input into the template.

## Further Reading 

-   [User Identification for Priority
    Lite/Dashboards](User-Identification-for-Priority-Lite/Dashboards )
-   [Designing HTML Reports for Priority
    Lite/Dashboards](Designing-HTML-Reports-for-Priority-Lite/Dashboards )
-   [Additional Input Options (Priority
    Lite/Dashboards)](Additional-Input-Options-(Priority-Lite/Dashboards) )
-   [Writing Dashboard
    Procedures](Writing-Dashboard-Procedures )
-   [Priority Lite and
    Dashboards](Priority-Lite-and-Dashboards )