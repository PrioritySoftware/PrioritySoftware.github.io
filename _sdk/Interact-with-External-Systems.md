---
title: Interacting with External Programs
layout: sdk_nav
group: Programming Tools
tags: 'Priority_SDK'
---

## List of Programs 

The following is a list of programs that may be run within
***Priority*** commands (e.g., [form
triggers](Form-Triggers ), [procedure
steps](Procedure-Steps )), mainly for file management.

Copy a file (COPYFILE):\
<code>EXECUTE COPYFILE :f1,:f2;</code>

Download a file from the Internet (COPYFILE):\
<CODE>EXECUTE COPYFILE '-i', :url, :tofile, timeout, [:msgfile];</CODE>

Move a file (MOVEFILE):\
<CODE>EXECUTE MOVEFILE :f1,:f2;</CODE>

Delete a file (DELWINDOW):\
<CODE>EXECUTE DELWINDOW 'f',:f1;</CODE>

Create a new folder (MAKEDIR):\
<CODE>EXECUTE MAKEDIR :DIR;</CODE>

Display the date of a given file (GETDATE):\
<CODE>EXECUTE GETDATE 'path/file_name', :$.STK;</CODE>

> **Example of use in a procedure step:**
>
> ```sql
> LINK STACK TO :$.STK; 
> ERRMSG 1 WHERE :RETVAL <= 0;
>
> EXECUTE GETDATE 'path/file_name', :$.STK;
>
> :FILEDATE = 0;
> SELECT ELEMENT INTO :FILEDATE 
> FROM STACK 
> WHERE ELEMENT > 0;
>
> UNLINK STACK;
> ```

Display the size of a given file (GETSIZE):\
<CODE>EXECUTE GETSIZE 'path/file_name', :$.STK;</CODE>

> **Example of use in a procedure step:**
>
> ```sql
> LINK STACK TO :$.STK;
> ERRMSG 500 WHERE :RETVAL <= 0;
>
> EXECUTE GETSIZE 'path/file_name', :$.STK;
>
> :FILESIZE = 0;
> SELECT ELEMENT INTO :FILESIZE 
> FROM STACK 
> WHERE ELEMENT > 0;
>
> UNLINK STACK;
> ```

Open a file using the default application for that file type (SHELLEX):
```sql
:file = 'c:\test.doc'; 
EXECUTE SHELLEX :file; /* if MS-Word is the
    default application for files of type *doc*, opens the
    c:\test.doc* file in Word */
:file = 'www.google.com';
 EXECUTE SHELLEX :file`/* will open
    default browser and redirect to the URL specified in :file */
```

Open a folder in Windows Explorer (SHELLEX):
```sql
:file = 'c:\temp'; 
EXECUTE SHELLEX :file;
```

**Note:** The SHELLEX command is not supported in the web client.

Return a random value in decimal or hexadecimal format (PRANDOM):
```sql
EXECUTE PRANDOM :file, :outtype; 
/*to return a hexadecimal, use Y
 as the outtype parameter; to return a decimal, specify anything
 other than Y */
```

> **Example of use in a procedure step:**
>
> ```sql
> SELECT SQL.TMPFILE INTO :STK1 FROM DUMMY;
> SELECT SQL.TMPFILE INTO :STK2 FROM DUMMY;
>
> EXECUTE PRANDOM :STK1, 'Y';
> EXECUTE PRANDOM :STK2, '';
>
> LINK STACK4 S1 TO :STK1;
> GOTO 1 WHERE :RETVAL <= 0;
> LINK STACK4 S2 TO :STK2;
> GOTO 1 WHERE :RETVAL <= 0;
>
> SELECT DETAILS AS 'RANDOM HEXA' FROM STACK4 S1 WHERE KEY = 1 FORMAT;
> SELECT DETAILS AS 'RANDOM DECIMAL' FROM STACK4 S2 WHERE KEY = 1 FORMAT;
>
> UNLINK STACK4 S1;
> UNLINK STACK4 S2;
> LABEL 1;
>
> Output:
> RANDOM HEXA
> --------------------------------------------------------------------------------
> 81F5D3AB68A937242E9D888E84924A3C3F22B3261B119A69B49B4936
>
> RANDOM DECIMAL
> --------------------------------------------------------------------------------
> 18921701411761541617713724720340145117226422542353165233
> ```

## Filtering the Contents of a File 

The **FILTER** program performs various manipulations on the contents of
a specified text file. The examples below illustrate the different
functions that the program can perform, such as finding and replacing
all instances of a specific character, changing the character encoding
(e.g., from ASCII to Unicode) and reversing the direction of text in the
file. An explanation of the parameters that are used with this program
appears beneath these examples.

-   **FILTER** -replace *\<\'\'Oldstring\'\'\> \<\'\'Newstring\'\'\>
    {\<\'\'Oldstring\'\'\> \<\'\'Newstring\'\'\>} \[Input Output\]*---
    replaces the specified string or strings in the input file.
-   **FILTER** \[-r\] *\<Fromchar> \<Tochar> \<Targetchar>*\[*Input
    Output*\] \[-M *Msgfile*\] --- converts each character in the input
    file that falls within a designated range of ASCII values (e.g., all
    uppercase letters from A to Z) to a new character, using the
    following formula:\
    new character = original character + (Targetchar -- Fromchar).\
    The input file should always be in ANSI format. Output is also in
    ANSI.

> **Example:** The following command iterates through all characters in
> the input file that fall within the designated range (all uppercase
> letters from A to Z) and adds 32 to the ASCII valu e of these
> characters, thereby converting them to the corresponding lowercase
> letter:
>
> ```sql
> EXECUTE FILTER 'A', 'Z', 'a', :INPUT, :OUTPUT;
> ```
>
> You can also use this option to convert a tab-delimited file into a
> comma-delimited file (where \'09\' represents the ASCII value of the
> tab character):
>
> ```sql
> EXECUTE FILTER '09', '09', ',', :INPUT, :OUTPUT;
> ```

### Special Filters

-   **FILTER** \[-r\] *-filter \<Fromchar> \<Tochar>
    \<Targetchar>*\[*Input Output*\] \[-M *Msgfile*\] --- same as the
    above, use when input file is Unicode. Output will be in Unicode.
-   **FILTER** -unicode2ascii \[*Input Output*\] \[-M *Msgfile*\] ---
    converts the input file from Unicode to ASCII.
-   **FILTER** -ascii2unicode \[*Input Output*\] \[-M *Msgfile*\] ---
    converts the input file from ASCII to Unicode.
-   **FILTER** -unicode2utf8 \[*Input* *Output*\] --- converts a UTF-16
    file to UTF-8.
-   **FILTER** -utf82unicode \[*Input* *Output*\] --- converts a UTF-8
    file to UTF-16.
-   **FILTER** \[-r\] -pc \[*Input Output*\] \[-M *Msgfile*\] ---
    converts the input file from DOS Hebrew to Windows Hebrew.
-   **FILTER** -heb \[*Input Output*\] \[-M *Msgfile*\] --- reverses the
    order of characters in Hebrew text.
-   **FILTER** -addcr \[*Input* *Output*\] --- When using an SQL query
    to export data from ***Priority*** tables, the \'\\n\' (new line)
    character is added automatically to the end of each line. Use this
    option to add the \'\\r\' (carriage return) character, as well,
    throughout the file (so that each line ends with the characters
    \'\\r\\n\').
-   **FILTER** -trim \[*Input* *Output*\] --- trims blank spaces at the
    beginning and end of each line in input file; also removes CR
    (carriage return) at the end of the line.
-   **FILTER** -delnl [*Input* *Output*\] --- Files generated by ***Priority*** generally end with an empty line with a new line (LF) character. This may interfere with external interfaces that expect files to end differently. This filter delete the last empty line in a file.
-   **FILTER** -base64 [*Input* *Output*\] --- encodes a file into base64.
-   **FILTER** -unbase64 [*Input* *Output*\] --- decodes a file from base64.
> **Example**
> ```sql
> :_PDF = '../../f.pdf';
> :_PDF_B = '../../f_base64.txt';
> :_PDF2 = '../../f_new.pdf';
> EXECUTE FILTER '-base64', :_PDF, :_PDF_B, SQL.TMPFILE;
> EXECUTE FILTER '-unbase64', :_PDF_B, :_PDF2, SQL.TMPFILE;
> ```


### FILTER parameters 

-   \'-r\' --- Use this option when you want the **FILTER** program to
    reverse the order of characters in the file (e.g., instead of
    \'abcd\' you receive \'dcba\').
-   *Input*, *Output* --- The input and output files to which the
    **FILTER** program refers.
-   \'-M\', *\'Msgfile\'* --- Use this option when you want the
    **FILTER** program to record error messages in the designated file.

## Browsing the Contents of a Folder 

The **FILELIST** program browses the contents of a specified folder. It
is very useful, for example, when you want to create an automatic
procedure (to be run by the Tabula Task Scheduler) that checks the
contents of a folder and loads certain files from that folder into
***Priority*** tables.

The following code is used when you have an external program that
creates files in one of your system folders, and the files contain data
of new sales orders that you need to load into ***Priority***. It is
assumed that the files to be loaded are named as follows:
*loadorder1201061355.load* (where the number represents the date and
time the file was created).

```sql
:DIR = '../../tmpDir';

SELECT SQL.TMPFILE INTO :ST6 FROM DUMMY;
SELECT SQL.TMPFILE INTO :MSG FROM DUMMY;

EXECUTE FILELIST :DIR,:ST6,:MSG;

/* In the linked file of the STACK6 table, you will find all files and folders under the 
input directory :DIR. */
LINK STACK6 TO :ST6;
GOTO 99 WHERE :RETVAL <= 0;

DECLARE NEWFILES CURSOR FOR
SELECT TOLOWER(NAME) 
FROM STACK6 
WHERE TOLOWER(NAME) LIKE ' loadorder*';

OPEN NEWFILES;
GOTO 90 WHERE :RETVAL <= 0;

:FILENAME = '';
:TOFILENAME = '../../system/load/Example.load';

LABEL 10;

FETCH NEWFILES INTO :FILENAME;
GOTO 85 WHERE :RETVAL <= 0;

:PATH = STRCAT(:DIR,'/',:FILENAME); /* now the variable :path holds the filename */

/* there are 2 options to execute the DBLOAD */

/* option 1: */
EXECUTE COPYFILE :PATH, :TOFILENAME;

/* here you need to make sure you define the load Example.load */
EXECUTE DBLOAD '-L', 'Example.load';

/* option 2: add two more parameters to the DBLOAD program; these parameters tell the 
DBLOAD program to load the file that comes after the -i option */
EXECUTE DBLOAD '-L', 'Example.load', -i, :PATH;

LOOP 10;
LABEL 85;
CLOSE NEWFILES;
LABEL 90;
UNLINK STACK6;
LABEL 99;
```

## Running an External Application (WINAPP) 

The **WINAPP** command allows you to run any application (.exe file) and
to define parameters for it (e.g., a ***Priority***field). The command
must be included in an SQLI step of a***Priority*** procedure and should
have the following structure:

-   EXECUTE WINAPP
-   The full path in which the external program is located

    **Note:** In the web interface, the **WINAPP** command can only run
    external programs if they are located in the BIN.95 folder of the server.

-   The **-w** parameter (optional). This parameter causes **WINAPP** to
    wait until the external program is completed before returning to
    ***Priority***.
-   The command that runs the application (i.e., the program name, with
    or without the .exe suffix)
-   Any desired parameter for the external program
-   Any ***Priority*** parameters that serve as input to the external
    program.

Strict attention must be paid to the proper punctuation in the command
line (see examples below):

-   Use a comma ( , ) to separate command segments.
-   Record single quote marks ( \' ) before and after each command
    segment.
-   Add a semi-colon (; ) at the end of the command line.

> **Examples:**
>
> To run MS-Word:
>
> ``` priority
> EXECUTE WINAPP 'C:\Program Files\Microsoft Office\Office', 'WINWORD.EXE';
> ```
>
> To open the *tabula.ini*file in Notepad and return to ***Priority***
> only after Notepad is exited:
>
> ``` priority
> EXECUTE WINAPP 'C:\Windows', '-w','notepad','tabula.ini';
> ```


<!-- TODO: Move to Windows only section -->

## Executing Priority Commands from an External Application (WINRUN) 

Using the **WINRUN** command, you can execute any ***Priority*** entity
from the DOS command prompt. To do so, use the following syntax
(parameters are explained below):

> *x*:\\priority\\bin.95\\winrun \"\" *username password*
> x:\\priority\\system\\prep *company* -nbg ‑err errfile *command
> arguments* --var:*VARA* \"*first var value*\" --var:*VARB* \"*second
> var value*\"

-   *x* is the drive on which ***Priority***is located. If you are not
    running this command from the server, *x* is the *network* drive on
    which***Priority*** is located on the server.
-   The second parameter is two double quote marks ( \" ).
-   *company* is the name of the ***Priority*** company in which you are
    executing the command.
-   **-nbg** --- Use this option if you want the entity to run in the
    foreground, rather than the background.
-   **-err** *errfile* --- Use this option when executing a procedure
    using the **WINPROC** or **WINACTIV** commands if you want to have
    error messages sent to the specified error file instead of being
    displayed on screen.
-   The command that runs the entity (e.g., **WINFORM, WINACTIV**),
    followed by the argument(s) required for the specified command. For
    example:
    -   To open a [form](Forms ), use the **WINFORM** command,
        where the argument is the internal name of the form to be
        opened.
    -   To run a [procedure](Procedures ) or
        [report](Reports ), use the **WINACTIV** or
        **WINPROC** commands, where the first argument is either **-P**
        for a procedure or **-R** for a report that is run without an
        accompanying procedure, and the second argument is the internal
        name of the procedure/report.
    -   To run an [interface](Interfaces ), use the
        **INTERFACE** command, where the first argument is the name of
        the interface and the second is the name of the temporary file
        in which to store load messages.
-   **-var** *VARNAME* \"*var value*\" ---- Use this option when
    executing a procedure to input a variable for use by the procedure.
    To access this variable, the procedure must contain an
    :EXTERNAL.*VARNAME* variable that matches the specified *VARNAME*.

------------------------------------------------------------------------

**Notes:**

-   The **WINRUN** command will run on the ***Priority*** installation
    referred to in the *C:\\Windows\\tabula.ini* file on the workstation
    from which the command is run. To work with a different *tabula.ini*
    file, add the command:

> ```cmd
> set TABULAINIORIG=xxx.ini
> ```
>
> where *xxx* is the name of the file in question.

-   When executing the **WINACTIV** command with the **-err** *errfile*
    option, only preliminary messages will be written to the specified
    file (i.e., messages that are not generated by the procedure itself,
    but from preliminary programs, such as those that check for problems
    with your license and/or user privileges). Messages generated by the
    procedure during runtime are written to the **ERRMSGS** table.
    Messages are recorded to this table for the **USER** that executed
    the **WINRUN** command and with the **TYPE** = \'V\'.

------------------------------------------------------------------------

> **Examples:**
>
> In the following examples, **\'\'Priority**\'\' is installed on the
> server in the **d** drive, which is mapped on the workstation as drive
> **p**. The **WINRUN** command is run in the **demo** company for the
> **tabula** user, whose password is **XYZabc1**.
>
> To open the *Sales Orders* form from the workstation:
>
> ``` priority
> p:\priority\bin.95\winrun "" tabula XYZabc1 p:\priority\system\prep demo 
> WINFORM ORDERS
> ```
>
> To run the *Overnight Backflush-New Transact* program from the server:
>
> ``` priority
> d:\priority\bin.95\winrun "" tabula XYZabc1 d:\priority\system\prep demo 
> WINACTIV -P BACKFLUSH_ONNEW
> ```
>
> To run the interface that loads sales orders from the server:
>
> ``` priority
> d:\priority\bin.95\winrun "" tabula XYZabc1 d:\priority\system\prep demo 
> INTERFACE LOADORDERS d:\priority\tmp\messages.txt
> ```

## Further Reading 

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
