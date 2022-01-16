---
title: Creating and Modifying BI Reports
layout: sdk_nav
group: BI Reports
tags: 'Priority_SDK'
---

## Introduction

To create a new BI report or modify an existing one, you have to copy
(and then revise) several standard procedures and reports:

-   procedures that prepare the data for the BI
-   the BI report itself
-   the procedure that runs the BI report.

You should use as your point of departure an existing BI report that
yields data similar to the results you wish to obtain. The following
illustrates the process using the *Order Analysis (BI)* report and its
accompanying procedures, using the PRIV prefix to identify the company
in which the customization is made. This should be the same prefix you
use for all entities that you add to ***Priority*** for the customer in
question.

## Procedures that Prepare the Data 

1.  Copy the **PREPORDERSCUBE** and **PREPORDERSCUBE1** procedures and
    create two customized procedures: **PRIV_PREPORDERSCUBE** and
    **PRIV_PREPORDERSCUBE1**.
2.  In the **PRIV_PREPORDERSCUBE** procedure, change the procedure in
    step 20 from **PREPORDERSCUBE1** to **PRIV_PREPORDERSCUBE1**.
3.  In the *Step Query* form for the **PRIV_PREPORDERSCUBE1** procedure,
    make the following revisions:
    -   Change the **TYPE** variable from \'ORDERS\' to \'PRIV_ORDERS\'.

        **Note:** As the length of the **TYPE** column in the
            **EISCUBES** table is 12, assign a value to the **TYPE**
            variable that is less than 12 characters.
    -   Change the query that inserts the records into the **EISCUBES**
        table.
    -   Find the line :ENAME = \'EISORDERSREP\' (near the bottom) and
        change the value of the **ENAME** variable to the name of the
        customized report (**PRIV_EISORDERSREP**).

## The BI Report 

1.  Copy the **EISORDERSREP** report and create the customized
    **PRIV_EISORDERSREP** report.
2.  In the *Report Column Extension* sub-level form, change the value of
    the **TYPE** column from: = \'ORDERS\' to = \'PRIV_ORDERS\' (i.e.,
    the value of the **TYPE** variable in **PRIV_PREPORDERSCUBE1**).
3.  Drill-down options are created by defining the relevant report
    columns for input (I). You can do so for any of the following
    columns:
    -   **CUSTNAME**
    -   **PARTNAME**
    -   **BRANCHNAME**
    -   **CTYPECODE**
    -   **FAMILYNAME**
    -   **ACCFAMILYNAME**
    -   **AGENTCODE**
    -   **TYPECODE**
    -   **COUNTRYCODE**

    :   **Note:** These report columns must have a value in the *Group
        by* column.
4.  In order to provide additional drill-down options for the report,
    you can redefine any of the above report columns, essentially
    \"substituting\" one drill-down option with another. For example,
    suppose you want to enable users to view sales data for a specific
    type of sale, broken down by the unit of sale (e.g., hr, kg, ea).
    Let us further assume that the report in question need not include a
    drill-down option for the country of sale. In such a case, you can
    revise the definitions for the **COUNTRYCODE** column, so that the
    resulting report can display sales data broken down by unit, rather
    than by country. To do so, revise the value of the *Target Form
    Name* column in the *Report Column Extension* sub-level of the
    *Report Columns* form as necessary (e.g., specify **UNIT** as the
    *Target Form Name*). You can then change the revised titles of any
    of these columns as necessary (e.g., for the **COUNTRYCODE** column,
    you can specify the revised title *Part Units*).
5.  Modify the rest of the report to suit your needs (e.g., hide
    unnecessary columns).

    **Note:** Any column you wish to display in a BI report must
        meet at least one of the following conditions:

    -   The table name and table column defined for the report column
        also appear in the **EISCUBES** report.
    -   The report column is assigned the same column expression as one
        of the columns in the **EISCUBES** report.
    -   The report column is assigned the same title as one of the
        columns in the **EISCUBES** report.

## The Procedure that Runs the Report 

1.  Copy the **EISORDERSREP** procedure and create the customized
    **PRIV_EISORDERSREP** procedure.
2.  In step 70 (SQLI), change the value of the **ENAME** variable from
    \'EISORDERSREP\' to \'PRIV_EISORDERSREP\' (the name of the
    customized report).
3.  Change the report in step 200 from **EISORDERSREP** to
    **PRIV_EISORDERSREP**.
4.  Copy the base pages of the original procedure (the html file in
    *system\\html* and, if needed, the html file in
    *system\\html\\lang.*XX, where XX is the language code defined in
    the *Languages* form), and change the file names to match the new
    procedure.

------------------------------------------------------------------------

**Note:** After upgrading the system to a new version, if the customized
report does not work in the same way as the standard report, it is
recommended to copy the base page from the standard BI procedure again.

------------------------------------------------------------------------
