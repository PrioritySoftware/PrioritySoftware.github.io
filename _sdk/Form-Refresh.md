---
title:  Form Refresh
layout: sdk_nav
group: Forms
tags: 'Priority_SDK'
---

Generally, the data retrieved in any given form are relatively static.
That is, changes are usually made by one user at a time. Sometimes,
however, the data displayed in a form are highly dynamic --- updated
periodically by the system. In the former case, it is enough to retrieve
records once; in the latter, a periodic refresh of the form is in order.

If you want a form to be refreshed periodically by the system, you need
to fill in the *Refresh Form* form, a sub-level of the *Form Generator*
form. Indicate the number of seconds that should pass without user input
between one form refresh and the next. Also indicate whether all
existing records should be retrieved during the refresh (this is
important if new records have been added since the last update) or only
those that were retrieved previously. The form refresh works per node on
the form tree. That is, it only affects the specific form for which it
is designated; it does not affect any sub-levels. As the automatic
refresh involves access to the server, it should be used sparingly and
with caution. When it is employed, the TIMEOUT constant is disabled.

Additional ways of forcing a form refresh are:

-   Include the REFRESH command in a form trigger.
    Do not include the REFRESH command in POST-UPDATE or POST-INSERT triggers in froms that include a BPM chart, as these can negatively interact with business rules.
-   To refresh all retrieved records following an Action,
    include :ACTIVATEREFRESH = 1 in the PRE-FORM trigger of the form in
    question.

## Further Reading 

-   [Forms](Forms )
-   [Form Columns](Form-Columns )
-   [Sub-level Forms](Sub-level-Forms )
-   [Conditions of Record Display and
    Insertion](Conditions-Record-Display )
-   [Actions](Actions)
-   [Accessing a Related Form](Accessing-Related-Form )
-   [Creating a Text Form](Create-Text-Form )
-   [Designing a Screen-Painted
    Form](Designing-a-Screen-Painted-Form )
-   [Form Triggers](Form-Triggers )
-   [Form Preparation](Form-Preparation )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Customization-Rules )
