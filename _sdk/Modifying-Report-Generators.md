---
title: Creating and Modifying User Report Generators
layout: sdk_nav
---


## Introduction

The purpose of a user report generator is to enable users to build their
own reports. There are many predefined user report generators in the
system, such as the *Customer Data Report Generator* and the *Customer
Invoices Report Generator*.

If you have created a customized module in ***Priority***, you may find
it useful to design a new report generator. Moreover, if you have added
columns to a form that already has a user report generator (e.g., *Sales
Invoices*), you may want to add the new columns to the existing
generator. In both cases, as you cannot revise a standard report
generator, you have to make copies of all the component entities.

## Components of the Report Generator {#components_of_the_report_generator}

Whether you are creating your own report generator or modifying a
standard one, you have to create three new ***Priority*** entities:

-   A base report, whose columns form the basis of the user report
    (defined in the *Report Generator*).
-   A form with which the report is constructed (defined in the *Form
    Generator*); this form retrieves the records from the generator\'s
    base report.
-   A procedure that runs the user-defined report (defined in the
    *Procedure Generator*).

## Creating Your Own Report Generator {#creating_your_own_report_generator}

### Constructing the Base Report {#constructing_the_base_report}

For your own report generator, you need to construct a new
[report](Reports "wikilink") in the usual way. However, in order for it
to serve as a base report, the following rules must be maintained as
well:

-   Any column that the user can choose to include in the generated
    report must have a revised title.
-   Any column that will be used for grouping must have a value in the
    *Group by* column and an *R* in the *Group Func.* column.
-   For any column that might be used for input, flag the **Input**
    column.

------------------------------------------------------------------------

**Note:** Remember to check all joins, as well as report optimization.

------------------------------------------------------------------------

### Constructing the Form {#constructing_the_form}

To create the form, you first copy the standard **ASSETREP** form and
then make certain adjustments to the copy.

------------------------------------------------------------------------

***Warning!***This is the only circumstance in which it is permissible
to copy a standard***Priority*** form. Copying a form for any other
purpose will have adverse effects.

------------------------------------------------------------------------

1.  To copy the standard **ASSETREP** form to a new form, from the
    *Tools* top menu in the Windows interface or the *Run* menu in the
    web interface, select *Run Entity (Advanced...)* and write the
    command: WINPROC -P COPYFORM\

This will open a new input parameter window, where you need to record
the internal name of the form you want to copy (**ASSETREP**), as well
as the name and title to be assigned to the new form.\
**Note:** If you wish to create a customized user report generator from
a standard report generator form other than **ASSETREP**, make sure to
choose one in which the expression defined for the **TYPE** column is
*r* (in the *Form Column Extension* sub-level of the *Form Generator*).
While different values in the **TYPE** column were once used to
distinguish between different types of user generated reports, newer
report generators all use the same **TYPE** (*r*), and assign each
report name a different prefix instead.

1.  The PRE-FORM trigger in the copied form should look like this:

> ``` tsql
> :REPEXEC = 0;
> SELECT EXEC INTO :REPEXEC FROM EXEC 
> WHERE ENAME = ' ASSETREP' AND TYPE = 'R';
> :PREFIX = 'AST';
> :KEYSTROKES = '%{Exit}'; 
> ```

:   

    :   Make the following changes:\
    :   \(1\) Change **ASSETREP** to the name of the base report you
        created earlier.\
    :   \(2\) Change the value of :PREFIX to another three-letter string
        (e.g., :PREFIX = \'PST\';).

```{=html}
<!-- -->
```

:   3.    In the *Form Columns* sub-level form, move to the **ENAME**
    column. Then enter the *Form Column Extension* sub-level form and
    change the expression from LIKE \'AST%\' to match the string you
    used in the previous step (LIKE \'PST%\').

```{=html}
<!-- -->
```

:   4.    Fix the POST-FIELD triggers for the **TITLE** and **ENAME**
    columns in the same manner. That is, where ENAME LIKE \'AST%\'
    appears, revise this to ENAME LIKE \'PST%\'.

```{=html}
<!-- -->
```

:   5.    Link the **GREPCLMNS** form as a sub-level of your new form.

### Constructing the Procedure That Runs the Report {#constructing_the_procedure_that_runs_the_report}

1.  Copy the standard **RUNCUSTREP** procedure to a new procedure.
2.  In your new procedure, revise the SQLI query in step 10:\
    (1) Change the value of the :TYPE variable from *g* to *r*.\
    (2) Change the value of the :PAT variable to match the prefix in
    your new form (e.g., :PAT = \'PST\';).
3.  If the base report you constructed is to receive input parameters
    from the procedure (e.g., a date range, a flag to display open
    orders only), define these parameters in an input step and in the
    runreport step. (See, e.g., the FDT and TDT parameters in the
    **RUNPROJREP** procedure.)
4.  Change the name of the report in the last procedure step to match
    the new base report you created.

### Allowing User Access to the Report Generator {#allowing_user_access_to_the_report_generator}

-   Link the new form and procedure to the relevant menu.

## Adding New Columns to a Standard Report Generator {#adding_new_columns_to_a_standard_report_generator}

Any revision to a standard report generator -- even if all you want to
do is to add new columns -- requires you to create copies of all
component entities and make revisions to the copies.

The difference between modifying a report generator in this way and
creating a completely new generator lies in the standard entities that
you copy from. Rather than using a new base report, the **ASSETREP**
form and the **RUNCUSTREP** procedure as your sources, you should copy
from the standard base report that you are revising and its accompany
form and procedure.

1.  Copy the standard base report to which you want to add columns,
    creating your own report in which you will make all needed
    customizations (e.g., copy **INVOICEREP** to **XXXX_INVOICEREP**).
2.  Copy the standard form which shares the same name as the standard
    base report (e.g., copy **INVOICEREP** to **XXXX_INVOICEREP**).
    Revise the new form as described above with respect to the ASSETREP
    form.
3.  Copy the relevant **RUN\*REP** procedure of the report you copied
    (e.g., copy **RUNINVOICEREP** to **XXXX_RUNINVOICEREP**), revising
    the appropriate SQLI query line to :TYPE = \'r\'; :PAT = \'XXX\';
    (where XXX is the prefix you assigned in the form) and changing the
    name of the report in the last procedure step. This is similar to
    the case when you construct a new report generator.
4.  Link the new form and procedure to the relevant menu.
