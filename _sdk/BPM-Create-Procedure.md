---
title: Add BPM Chart Procedure
layout: sdk_nav
---


The sixth step in [creating a BPM flow
chart](Creating-BPM-Flow-Charts ) is to create a procedure
called **XXXX_VISMYDOCSTATS** in the *Procedure Generator*.

The procedure steps should be as follows:

-   Step 5

:   Entity Name: **SQLI**
:   Type: *C*
:   Step Query (in the sub-level form): #INCLUDE WEBCONST/NotFromJava

-   Step 10

:   Entity Name: **BPM**
:   Type: *C*
:   Procedure Parameters (in the sub-level form):

    :   Parameter Name: CHR
    :   Pos: 10
    :   Width: 20
    :   Value: PRIV_MYBPM (**STATUSTYPE**)
    :   Type: **CHAR**

-   Step 90

:   Entity Name: \'\'\'END
:   Type: *B*

-   Step 91

:   Entity Name: **XXXX_MYDOCSTATS** (Status form)
:   Type: *F*

------------------------------------------------------------------------

**Note:** The names of entities are given here for demonstration
purposes and can be changed as desired.

------------------------------------------------------------------------

The next step is to [debug the BPM chart](Debugging-the-BPM ).
