---
title: Creating Charts
group: Charts
tags: 'Priority_SDK'
---


## Introduction

This section explains how to create and define charts, which provide a
graphic display of scheduled tasks, using the **GANTT** program. These
charts consist of four principal elements:

-   Time range
-   Employees/resources
-   Tasks (any kind of operation (e.g., work order) that can be
    displayed in a chart)
-   Task dependencies (applicable only in an manufacturing setting)

The **GANTT** program supports three kinds of charts:

-   **Gantt:** The X-axis is a variable timeline; the Y-axis consists of
    employees/resources.
-   **Calendar:** The X-axis is a 24-hour timeline; the Y-axis consists
    of a main scale displaying days and a sub-scale displaying
    employees/resources.
-   **Group Schedule:** The X-axis is a 24-hour timeline; the Y-axis
    consists of a main scale displaying employees/resources and a
    sub-scale displaying days.

The user can perform the following operations in a chart:

-   Add new tasks
-   Update/delete existing tasks
-   View task details
-   View employee details
-   Toggle between chart types (Gantt/Calendar/Group Schedule)
-   Vary the timeline
-   Access the task in ***Priority***
-   Access the employee record in ***Priority***

## Defining a New Chart 

To create a new chart, you need to define a procedure that activates the
**GANTT** program. You must also define an interface to the appropriate
form, to be driven by the **GANTT** program when updating or adding
fields.

A [procedure](Procedures ) for building charts consists of two
distinct sections:

**Section 1:** Begins with INPUT and/or SQLI steps and ends with the
activation of the **GANTT** program.

**Section 2:** Query steps for data retrieval.

These two sections are separated by an END step.

### Section 1: User Input and Activation of the GANTT Program 

As in other procedures, this section requires [user
input](Procedure-Input ), to determine which
resources to display and during what time period. When run as an Action, there is no need for an INPUT step, but you do need to initialize the necessary parameters (e.g., display mode, time range) in
an SQLI step.

Whether you run the **GANTT** procedure as an Action or from the
menu, you must define a parameter of **FILE** type, indicating a linked
file of records. This parameter is used to execute a link to the table
on which the procedure will run. All queries executed by the **GANTT**
program, in which data is retrieved from that table, are executed
against the linked table (this is similar to passing a linked table to a
report).

When the procedure is run as an Action, you can define a
specific task as "selected", by passing the task identifier in question
to the **GANTT** program. In such a case, the chart opens with the
specified task displayed. It is recommended to define a distinct and
vivid display color for this task.

The following parameters must be defined for the **GANTT** program, in
the following order:

1.  The current procedure name (in order to retrieve queries from the
    second section).
2.  *From Date*: The date from which chart data should be displayed.
3.  *To Date*: The date until which chart data should be displayed
4.  **LINK** file: Usually the employee/resource table from the
    procedure's INPUT step. You can also execute calculations before
    running the **GANTT** program, and link the table containing the
    calculation results.\
    **Note:** If you indicate the **USERGANTT** table, the procedure
    does not execute a **LINK** to the table, but rather uses the
    original table.
5.  The name of the linked table.
6.  The name of the interface that updates/adds tasks.
7.  The name of the form which the user can access for task details.
8.  The name of the form which the user can access for employee details.
9.  The flag permitting/preventing revisions to the chart (0/1).
10. The flag permitting/preventing additions to the chart (0/1).
11. The default display option (1 = Gantt, 2 = Calendar, 3 = Group
    Schedule, 0 = the last display viewed by the current user, 4 =
    either the Calendar or Group Schedule display, whichever was last
    viewed by the current user).
12. Identifier of the selected task.
13. Identifier of the employee/resource assigned to the selected task.
14. Record null parameter for this position.
15. Record null parameter for this position.
16. Record null parameter for this position.
17. Record null parameter for this position.

18. An additional identifier, whose value appears in the variable
    **OTHERID**.
19. A second additional identifier, whose value appears in the variable
    **OTHERID2**.
20. The chart title.
21. The flag determining whether the chart is multi-company (0 = No, 1 =
    Yes).

### Section 2: Defining Parameters 

The following is the list of parameters to be defined in the second
section of the procedure (all steps are Type *C*; their order is not
important).

  | Name of the Step  |   Returns |
  |--------------------|-------------------------------|
  | RESOURCE           | The list of employees to display
  | RESOURCE_DETAILS   | The details of a specific employee
  | TASKS              |   The list of tasks to display
  | TASK_DETAILS       |   The details of a specific task
  | TASK_TEXT          |  The text of a specific text
  | TASK_INSERT        |  Opening/updating a task via a form
  | TASK_EDIT          |  Query to define input fields in the dialogue box
  | TASK_REFRESH       |  Updated display of task details
  | TASK_CUSTOMDATE    |  Adds a custom date label to the chart View Definitions (Windows | interface only)
  | WORKHOURS          |  Office hours for each day of the week
  | DAYSOFF            |  Non-working days
  | RESOURCE_WORKHOURS |  Work hours per employee (instead of the previous two steps)
  | RELATIONS          |  Task dependencies (applicable only in an manufacturing setting)
  | RESOURCE_CHOOSE    |  Employee Choose list
  | RESOURCE_CHOOSE2   |  Additional Choose list (2)
  | RESOURCE_CHOOSE3   |  Additional Choose list (3)
  | RESOURCE_UPDATE    |  Update after choosing an employee
  | RESOURCE_UPDATE2   |  Update after additional Choose list (2)
  | RESOURCE_UPDATE3   |  Update after additional Choose list (3)
  | TASK_PRINT         |  Preparation of a **LINK** file before producing reports



**Note:** [Click here](Chart-Parameters) for a
detailed explanation of each step.

## Procedure Messages 

You can dynamically define procedure messages to serve as field titles
for retrieved task or employee details. Such messages should be assigned
numbers greater than 20.

Messages 1 through 20 are already used by the GANTT program for various
display titles. Consequently, when defining a new procedure you should
always start by filling in the first twenty messages. The following
table explains how these messages are used:

 | No.  | Explanation                                             |  Example
  | ----- | --------------------------------------------------------- |-------------------------- |
  | 1     | Chart name                                                | Calendar
  | 2     | Chart title                                               | Calendar
  | 3     | Title while initializing employees                        | Loading employees...
  | 4     | Title while initializing tasks                            | Loading tasks...
  | 5     | Title while initializing dependencies                     | Loading dependencies...
  | 6     | Title for adding a task                                   | New Appointment
  | 7     | Title for updating a task                                 | Update Appointment
  | 8     | Title for the subject field when updating/adding a task   | Subject
  | 9     | Title for employees/resources                             | Employees
  | 10    | Error message when adding a new task                      | Do not add a task
  | 11    | Error message when updating a task                        | Do not update a task
  | 12    | Error message when deleting a task                        | Do not delete a task
  | 13    | Title for the *Resource Search* dialogue box              | Search for Employee / Date
  | 14    | Title for the *Resource Search* field                     | Employee
  | 15    | Title for the employee Choose list                        | Employees
  | 16    | Title for additional Choose list (2)                      | Groups\*
  | 17    | Title for additional Choose list (3)                      | Team leaders\*
  | 18    | Title for activating the employee Choose list             | Choose an employee
  | 19    | Title for activating additional Choose list (2)           | Choose a group\*
  | 20    | Title for activating additional Choose list (3)           | Choose a team leader\*

\* Different lists may be defined, at the discretion of the programmer.
For example, in charts used to schedule technicians, you can allow users
to retrieve records by service call type, rather than by team leader
name.

## Defining the Interface for Updating/Adding Tasks 

The interface is defined against the **GENERALLOAD** table. Define an
interface for any form against this table, and record the name of the
interface as an argument in the call to the **GANTT** program. The
interface will always run when the table contains a single record whose
code is 1 (in the *Form Load Designer*).

The values for adding/updating a task appear in the table in the
following fields:

|  Field |  Value |
|  ------|  ------------------------------------------------------ |
|  INT1   | Task identifier
|  INT2   | Employee/resource identifier
|  INT3   | From hour
|  INT4   | To hour
|  INT5   | Previous employee/resource identifier (before update)
|  DATE1  | From date (DATE 8)
|  DATE2  | To date (DATE 8)
|  DATE3  | From date/hour (DATE 14)
|  DATE4  | To date/hour (DATE 14)



**Notes:**

-   You can use either separate fields for date and time, or a single
    field for both.
-   When the user adds a new task to the chart, the interface runs with
    task identifier **0**.
-   In addition to the constant fields, which appear in the above chart,
    values are transferred to additional fields, as defined in the
    TASK_EDIT step.


