---
title: Get Data from the Client INI File
layout: sdk_nav
group: Programming Tools
tags: 'Priority_SDK'
---

When the user is working in the Windows interface of **\'\'Priority***,
you can retrieve information from the user\'s*.ini\'\' file, by means of
the **TABINI** program (which can be run from a [form
trigger](Form-Triggers ) or a
[procedure](Procedures )).

Note the following:

-   The first parameter is the section in the *.ini* file from which you
    want to retrieve data. For example, to retrieve data from
    \[Environment\], pass \'Environment\' as the first parameter.
-   The second parameter is the line that you want to retrieve. For
    example, to get the path of the ***Priority*** directory, pass
    \'Priority Directory\' as the second parameter.
-   The third parameter is a LINK file of **GENERALLOAD** to which the
    program writes the retrieved data -- in the first line (LINE = 1),
    in the **TEXT** column.
-   If you pass empty strings as the first two parameters, the program
    will return the name of the *.ini* file itself.

> **Example:**
>
> ```sql
> SELECT SQL.TMPFILE INTO :A FROM DUMMY;
> EXECUTE TABINI 'Environment', 'Tabula Host', :A;
> LINK GENERALLOAD TO :A;
> SELECT TEXT FROM GENERALLOAD WHERE LINE = 1 FORMAT;
> UNLINK GENERALLOAD;
> ```

## Further Reading 

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
