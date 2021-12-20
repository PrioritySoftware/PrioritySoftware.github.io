---
title: Using Semaphores
layout: sdk_nav
---

If you want to prevent two users from running a given
[procedure](Procedures ) or section of code concurrently, you
can use a semaphore -- a variable that can have one of two values (e.g.,
​​0 or 1).

At the beginning of the code/procedure, check the value of the variable:

-   If it is 0, this means no program is running this code. The variable
    should be updated to 1 and the code can be run. Upon completion, the
    variable should be set back to 0.
-   If the variable value is 1, this means another program is running
    this section of code. You should either skip this section of code or
    have the user wait for the other program to finish.

While a customized table can be used for semaphores, the predefined
**LASTS** table is suitable for this purpose.

**LASTS** has two columns:

-   **NAME** -- **CHAR** column (key)
-   **VALUE** -- **INT** column

In the **NAME** column, record a name for the semaphore, using the same
prefix that you use for customizations.

> **Example:**In the following code, the semaphore is a value in
> **LASTS** and the value in the **NAME** column is SDK_SEMAPHORE:
>
> ``` tsql
> GOTO 1 FROM LASTS WHERE NAME = 'SDK_SEMAPHORE';
>
> INSERT INTO LASTS(NAME) 
> VALUES('SDK_SEMAPHORE');
>
> LABEL 1;
>
> UPDATE LASTS 
> SET VALUE = 1 
> WHERE NAME = 'SDK_SEMAPHORE' 
> AND VALUE = 0;
> GOTO 99 WHERE :RETVAL <= 0;
> .........
> UPDATE LASTS 
> SET VALUE = 0 
> WHERE NAME = 'SDK_SEMAPHORE';
> LABEL 99;
> ```

As there may be cases in which the program starts to run the section of
code in question, but does not finish (e.g., power outage, system
failure), you will need an additional procedure to \"unlock\" the
program. This procedure should consists of a single step that resets the
variable:

``` tsql
UPDATE LASTS SET VALUE = 0 WHERE NAME = 'SDK_SEMAPHORE'; 
```

Alternatively, you can run the code, even if it is \"locked\" by another
user, once a certain span of time has elapsed since the procedure was
\"locked.\" This requires a customized table that contains the variable:

``` tsql
CREATE TABLE SDK_SEMAPHORES 'Semaphores' 0
NAME(CHAR, 48, 'Semaphore Name')
USER(INT, 8, 'User(id)')
UDATE(DATE, 14, 'Date')
UNIQUE(NAME);
```

> **Example:** The following code allows the current user to run the
> section of code, even though the semaphore is set to 1, once 24 hours
> have elapsed since the code was last executed (under the assumption
> that, if locked that long, something must have prevented the program
> from reaching the section of code that resets the semaphore):
>
> ``` tsql
> GOTO 1 FROM SDK_SEMAPHORES WHERE NAME = 'SDK_SEMAPHORE';
> INSERT INTO SDK_SEMAPHORES(NAME) 
> VALUES('SDK_SEMAPHORE');
>
> LABEL 1;
>
> UPDATE SDK_SEMAPHORES
> SET UDATE = SQL.DATE, USER = SQL.USER 
> WHERE NAME = 'SDK_SEMAPHORE' 
> AND UDATE <= SQL.DATE - 24:00;
> GOTO 99 WHERE :RETVAL <= 0;
> .........
> UPDATE SDK_SEMAPHORES
> SET UDATE = 0, USER = 0 
> WHERE NAME = 'SDK_SEMAPHORE';
>
> LABEL 99;
> ```

## Further Reading 

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
