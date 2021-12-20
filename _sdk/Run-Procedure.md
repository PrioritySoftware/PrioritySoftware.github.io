---
title: Running the Procedure
layout: sdk_nav
---

## Using a Program to Run the Procedure 

You can use the *Run Procedure*program (accessed from the *Procedures*
menu) or the *Run Report/Procedure* program (run by Direct Activation
from the *Procedure Generator* form) to execute a procedure. This method
is particularly useful when testing a newly developed procedure for
bugs.

## Activation from a Menu 

In order for a procedure to be activated from a menu, it must be linked
to that menu. To create that linkage, take the following steps:

1.  Enter the *Menu/Form Link*form, a sub-level of the *Procedure
    Generator*form.
2.  Indicate the name of the menu in question and specify *M*in the
    *Type* column.
3.  Specify an integer to determine the order of the procedure within
    the menu.
4.  Disregard the *Background Execution* column. This is only relevant
    for procedures activated from within a form.

------------------------------------------------------------------------

**Note:**The *Menu Items*form, a sub-level of the *Menu Generator*,
serves a similar purpose.

------------------------------------------------------------------------

## Direct Activation from a Form 

[Direct Activation](Direct-Activations ) of a procedure from
within a form can take place in either the foreground or the background.
If it is in the background, the user will be able to continue work in
the form while the procedure is being executed. Indeed, printouts of
processed reports and documents are generally run in the background. In
contrast, in a procedure executed in the foreground, the user has to
wait until it is completed to continue work in the form.

When a procedure is run by Direct Activation, the form record on which
the cursor rests is input into the procedure's PAR parameter (thus, you
must label the input parameter "PAR"). Additional steps in the procedure
can then use this parameter.

> **Example:** In the third SQLI step of the **ADDPARTTREE** procedure,
> there is a link to the PAR variable (which is defined as an input
> column in the first SQLI step).

To allow for Direct Activation of a procedure from within a form, take
the following steps:

1.  Enter the *Menu/Form Link*form, a sub-level of the *Procedure
    Generator*form.
2.  Indicate the name of the form in question and specify *F*in the
    *Type* column.
3.  Specify an integer to determine the order of the procedure within
    the form's list of Direct Activations.
4.  If the procedure is to be executed in the background, flag the
    *Background Execution* column.

------------------------------------------------------------------------

**Note:**The *Direct Activations*form, which is a sub-level of the *Form
Generator*form, serves a similar purpose.

------------------------------------------------------------------------

## Running a Sub-Procedure 

A procedure can be included as part of another procedure. This is
useful, for instance, when you wish to use the same set of steps within
several related procedures, or when you wish to repeat the same set of
steps several times within a single procedure.

To include one procedure within another, use the *Procedure Link*form, a
sub-level of the *Procedure Generator*.

## Further Reading 

-   [Procedure Steps](Procedure-Steps )
-   [Procedure Parameters](Procedure-Parameters )
-   [User Input in Procedures](User-Input-in-Procedures )
-   [Procedure Step Queries](Procedure-Step-Queries )
-   [Procedure Flow Control](Procedure-Flow-Control )
-   [Procedure Message Display](Procedure-Message-Display )
-   [Processed Reports](Processed-Reports )
-   [Help Messages](Help-Messages )
-   [Rules for Customizing](Rules-for-Customizing )
-   [Procedures](Procedures )
