---
title: Combining Table Loads with Form Loads
layout: sdk_nav
group: Interfaces
tags: 'Priority_SDK'
---

You will often find it useful to combine [table
loads](Table-Loads ) with [form loads](Form-Loads ).
That is, you create a **DBLOAD** that loads data into an interim table,
and then display such data via a form based on that interim table. Users
can use the interim table form to check the loaded data and to fix
records if necessary. You can also create a
[procedure](Procedures ) to manipulate the data (e.g., to add
a *C* to all customer numbers) and allow users to run it by [Action](Actions ) from the form.

When satisfied with results, a procedure can be run to execute your
**INTERFACE** program load. After the form load is completed, each
record that was loaded successfully is flagged, those that failed to be
loaded can be fixed, and the load program can be executed again with the
\'-repeat\' option.

> **Example:** The **LOADDOCUMENTS_C** procedure (*Load Counts into
> Interim Table*) loads a file into the **LOADDOCUMENTS_C** form
> (*Interim Table - Inventory Counts*). Then, the **LOADDOCUMENTS_C2**
> procedure (*Load Counts from Interim Table*) opens an *Inventory
> Count* document in the **DOCUMENTS_C** form. Note that the
> **LOADDOCUMENTS_C2** procedure executes the load by running the
> **INTERFACE** program, whose first input parameter is the name of the
> form load.

## Further Reading 

-   [Form Loads](Form-Loads )
-   [Table Loads](Table-Loads )
-   [Tips for Finding Existing
    Interfaces](Existing-Interfaces )
-   [Interfaces](Interfaces )
