---
title: Parameters for Charts
layout: sdk_nav
---


## Introduction

The following explains in detail the various parameters that can be used
to create charts. Refer to the table in [Section 2 of Defining a New
Chart](Creating-Charts#Section-2:_Defining-a-New-Chart ).

## Defining Employees (RESOURCE) 

**Fields to retrieve:** employee identifier, employee name, target
value, a sorting column

**Query variables:** FROMDATE, TODATE.

**Notes:**

-   Always retrieve values for all four fields.
-   You may choose not to use the variables to define your query
    conditions.
-   You may choose not to use the sorting column (in which case you
    retrieve a null value); its purpose is to allow you to sort records
    by something other than the employee name.


> **Example:**
>
> ```sql
> SELECT USER,USERNAME,USERLOGIN,1 FROM USERS
> WHERE USER>0
> ORDER BY USERLOGIN;
> ```

## Retrieving Details of a Specific Employee (RESOURCE_DETAILS) 

**Fields to retrieve:** Any desired employee details from the USERS or
USERSB form.

**Query variables (required):** RESOURCEID.



**Note:** You can dynamically define [procedure
messages](Creating-Charts#Procedure-Messages ) to serve as
field titles for the returned values by using the **\#** symbol for each
field, followed by a message number.


> **Example:**
>
> ```sql
> SELECT USERLOGIN,SNAME,EMAIL,ADDRESS,SQL.DATES AS ‘#20’
> FROM USERS,USERSB
> WHERE USERS.USER = :RESOURCEID
> AND USERS.USER = USERSB.USER;
> ```

## Defining Tasks (TASKS) 

**Fields to retrieve:** task identifier, employee identifier, task
description, from date/time, to date/time, target value, display color

**Query variables**

-   Required: FROMDATE, TODATE
-   Optional: SELECTEDID



**Notes:**

Retrieve values for all of the above fields.\
The date field must also include the time (DATE 14).\
The display color is a value from the **COLORS** table (use 0 for no
color).



> **Example:**
>
> ```sql
> SELECT DIARY,USER,TEXT
> (CUSTNOTE <> 0 ? ITOA(CUSTNOTE,0,USECOMMA): ‘’),
> CURDATE+STIME,CURDATE+ETIME,(DIARY = :SELECTEDID ? 1 : 0)
> FROM DIARIES
> WHERE CURDATE BETWEEN :FROMDATE 
> AND :TODATEAND USER = (SELECT USER FROM USERS !);
> ```

## Retrieving Task Details (TASK_DETAILS) 

**Fields to retrieve:** Any desired task or employee details from the
**DIARIES** or **USERS** form.

**Query variables (required):** TASKID



**Note:**You can dynamically define [procedure
messages](Creating-Charts#Procedure-Messages ) to serve as
field titles for the returned values by using the **\#** symbol for each
field, followed by a message number.



> **Example:**
>
> ```sql
> SELECT DIARIES.TEXT AS ‘#19’,USERS.USERNAME,
> DIARIES.CURDATE,DIARIES.STIME,DIARIES.ETIME
> FROM DIARIES,USERS
> WHERE DIARIES.DIARY = :TASKID
> AND DIARIES.USER = USERS.USER;
> ```

## Retrieving Task Text (TASK_TEXT) 

**Fields to retrieve:** Text, line order (**ORD**)

**Query variables (required):** TASKID

> **Example:**
>
> ```sql
> SELECT TEXT, TEXTORD 
> FROM CUSTNOTESTEXT
> WHERE CUSTNOTE = :TASKID
> AND TEXTLINE > 0
> ORDER BY TEXTORD;
> ```

## Adding Tasks to the Chart (TASK_INSERT) 

Record a trigger that inserts values in the fields of the designated
form when a new task is opened.

**Query variables (required):** RESOURCEID, TASKDATE, TASKETIME,
TASKSTIME, TASK.



**Notes:**

-   If this step is included, it will be possible to add and update
    tasks in the load form designated for the interface used to
    update/add tasks (defined in parameter 6). If it is not, it will
    still be possible to add and update tasks using the dialogue box.
-   In order to add or update tasks using either method, parameters must
    have been defined to permit additions or revisions to the chart
    (parameters 9 and 10, respectively).



> **Example:**
>
> ```sql
> :$.CURDATE = 0+ :TASKDATE;
> :$.STIME = 0+ :TASKSTIME;
> :$.ETIME = 0+ :TASKETIME;
> SELECT USERLOGIN INTO :$.USERLOGIN
> FROM USERS
> WHERE USER = 0+ :RESOURCEID;
> ```

## Defining Input Fields for the Dialogue Box (TASK_EDIT) 

**Fields to retrieve:** Whatever is needed.

**Query variables (required):** RESOURCEID, TASKID, TASKSDATE,
TASKEDATE, TASKSTIME, TASKETIME.



**Notes:**

-   The fields defined in this query automatically become input fields
    in the Add/Update Tasks dialogue box.
-   Before recording the query you must list in a note the fields in the
    **GENERALLOAD** table to which the input values will be transferred.
    Obviously, this list must correspond to the fields retrieved in the
    query.
-   You must make sure that the query does not fail (even when opening a
    new task, when the identifier is 0).
-   You can define mandatory fields by adding the letter M in
    parentheses after the name of the field in the relevant note.



> **Example:**
>
> ```sql
> /* Load fields: TEXT,DATE1(M),INT3,DATE2,INT4,
> TEXT5,TEXT6,TEXT4,TEXT1,TEXT2,TEXT3,TEXT8 */
>
> SELECT CUSTNOTESA.SUBJECT,
> (:TASKID <> 0 ? CUSTNOTES.CURDATE : :TASKSDATE) AS '#20',
> (:TASKID <> 0 ? CUSTNOTES.STIME : :TASKSTIME) AS '#21',
> (:TASKID <> 0 ? CUSTNOTESA.TILLDATE : :TASKEDATE) AS '#27',
> (:TASKID <> 0 ? CUSTNOTES.ETIME : :TASKETIME) AS '#22',
> USERS.USERLOGIN AS '#24',USERS2.USERLOGIN AS '#26',
> CUSTOMERS.CUSTNAME,PHONEBOOK.NAME AS '#25', CUSTNOTESA.LOCATION
> FROM CUSTNOTES, CUSTNOTESA, CUSTOMERS, CUSTNOTETYPES, 
> PHONEBOOK, USERS, USERS USERS2
> WHERE CUSTNOTES.CUSTNOTE = :TASKID
> AND CUSTNOTES.CUSTNOTE = CUSTNOTESA.CUSTNOTE
> AND CUSTNOTES.CUST = CUSTOMERS.CUST
> AND CUSTNOTES.PHONE = PHONEBOOK.PHONE
> AND CUSTNOTES.CUSTNOTETYPE = CUSTNOTETYPES.CUSTNOTETYPE
> AND USERS.USER = 
> (:TASKID = 0 ? 0+ :RESOURCEID : CUSTNOTES.CUSER)
> AND CUSTNOTESA.CUSER2 = USERS2.USER;
> ```

## Updating the Display (TASK_REFRESH) 

**Fields to retrieve:** task description, target value, from date/hour,
to date/hour, color.

**Query variables (required):** RESOURCEID, TASKID

> **Example:**
>
> ```sql
> SELECT D.TEXT,ITOA(CUSTNOTES.CUSTNOTE,0,USECOMMA),
> D.CURDATE+D.STIME,D.CURDATE+D.ETIME,0
> FROM DIARIES D, CUSTNOTES
> WHERE CN.CUSTNOTE = :TASKID
> AND D.CUSTNOTE = CN.CUSTNOTE
> AND D.USER IN (-9999,:RESOURCEID);
> ```

## Adding a Custom Date Label (TASK_CUSTOMDATE) 

**Note:** This step is only available in the Windows interface.

This step adds an additional, custom label to dates, which can be
accessed by users in the Timescale definitions of the chart.

**Query variables:** TASK_CUSTOMDATE_OUT, TASK_CUSTOMDATE_IN

> **Example:**
>
> ```sql
> SELECT DETAILS INTO :TASK_CUSTOMDATE_OUT
> FROM STACK4
> WHERE KEY = :TASK_CUSTOMDATE_IN;
> ```

## Office Hours (WORKHOURS) 

**Fields to retrieve:** day, from hour, to hour

**Query variables (required):** RESOURCEID

> **Example:**
>
> ```sql
> SELECT WDAY,STARTT,ENDT 
> FROM USERTMTBL
> WHERE USER = :RESOURCEID;
> ```

## Non-working Days (DAYSOFF) 

**Fields to retrieve:** from hour

**Query variables (required):** CURDATE



**Notes:**

-   The query acts separately on each day within the designated date
    range.
-   On a regular workday the query should fail.
-   On holidays the query should return 0.
-   On days preceding holidays the query should return the time work
    ends.



> **Example:**
>
> ```sql
> SELECT FROMTIME FROM OFFICECLOSED
> WHERE CURDATE = :CURDATE;
> ```

## Employee Work Hours (RESOURCE_WORKHOURS) 

**Fields to retrieve:** from date/hour, to date/hour

**Query variables (required):** RESOURCEID, FROMDATE, TODATE



**Notes:**

-   The query acts separately on each employee.
-   The query returns all work hours performed by the employee in the
    desired date range (i.e., more than one record).
-   The date field must also include the time (DATE 14).
-   This step can be used in place of the previous two steps (WORKHOURS
    and DAYSOFF).



> **Example:**
>
> ```sql
> SELECT WDATE+FROMTIME, WDATE+TOTIME 
> FROM WORKHOURS
> WHERE USER = :RESOURCEID
> AND WDATE BETWEEN :FROMDATE AND :TODATE;
> ```

## Task Dependencies (RELATIONS) 

Task dependency is defined as a relationship in which the start or
finish date of a task depends on another task.

**Fields to retrieve:** predecessor task identifier, successor task
identifier, display color

**Query variables (required):** FROMDATE, TODATE



**Note:**This step is only applicable in an industrial setting.



## Choose List for Employees (RESOURCE_CHOOSE) 

> **Example:**
>
> ```sql
> SELECT USERNAME,USERLOGIN
> FROM USERS,USERSB
> WHERE USERS.USER = USERSB.USER
> AND USERSB.SERVFLAG = ‘Y’
> AND USERSB.INACTIVE <> ‘Y’
> ORDER BY 1;
> ```

## Additional Choose Lists (RESOURCE_CHOOSE2, RESOURCE_CHOOSE3) 

> **Example:**
>
> ```sql
> SELECT GROUPDES, GROUPNAME
> FROM UGROUPS
> WHERE UGROUP <> 0
> AND INACTIVE <> ‘Y’
> ORDER BY 1;
> ```

## Update After Choosing an Employee (RESOURCE_UPDATE) 

**Query variables:** CHOOSEVALUE, GANTTEXEC

> **Example:**
>
> ```sql
> INSERT INTO USERGANTT(EXEC,USER,RESOURCEID)
> SELECT 0+:GANTTEXEC, SQL.USER, USER 
> FROM USERS
> WHERE USERLOGIN = :CHOOSEVALUE;
> ```

## Update After Additional Choose Lists (RESOURCE_UPDATE2, RESOURCE_UPDATE3) 

**Query variables:** CHOOSEVALUE, GANTTEXEC

> **Example:**
>
> ```sql
> INSERT INTO USERGANTT(EXEC,USER,RESOURCEID)
> SELECT 0+:GANTTEXEC, SQL.USER, USER 
> FROM USERGROUP
> WHERE UGROUP = 
> (SELECT UGROUP 
> FROM UGROUPS
> WHERE GROUPNAME = :CHOOSEVALUE);
> ```

## Preparing the LINK File Before Producing Reports (TASK_PRINT) 

**Query variables:** ZOOMVALUE, TASKID



**Note:** In order to print reports and/or documents from within the
chart, add the print procedures as additional steps in the chart
procedure.



> **Example:**
>
> ```sql
> INSERT INTO CUSTNOTES 
> SELECT * FROM CUSTNOTES ORIG
> WHERE CUSTNOTE = :TASKID;
> ```





