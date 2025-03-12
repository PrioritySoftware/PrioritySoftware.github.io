---
title: Access SFTP with SFTPCLNT
group: Programming Tools
tags: 'Priority_SDK'
---

<span class="version-highlight">23.1</span> - Included starting with BIN95 version 9. Backports available for version 22.1 (BIN V. 90) and 23.0 (BIN V. 32) that add the SFTP Definitions form. These backports are available on [Priority Xpert](https://support.priority-software.com/).

The SFTPCLNT utility can be used to access an SFTP server and perform the following actions:

- Upload a file
- Download a file
- List the contents of a folder on the server.

## Defintions for SFTP

Before you can work with SFTP, you must first set up a record in the **Definitions for SFTP** form (System Management > System Maintenance > Internet Definitions > Definitions for SFTP).

In this form, you need to fill in the following details:
- **Code** - The identifying code of the SFTP server/folder. This will be filled in that CONFIGID when using WSCLIENT.
- **SFTP Folder Desc** - a short description of this server/folder.
- **Path** - the URL/IP of the server. This should begin with <code>sftp://</code> and end with a port number (generally, port 22). For example: *sftp://20.0.0.195:22*
- **User** - the username for accessing the server.
- **Password**  - the password for accessing the server.

**Note**: SFTP functionality only supports authentication with a username and password.


## Uploading/Downloading a File

```sql
EXECUTE SFTPCLNT 'CONFIGID', '-u[pload]' || '-d[ownload]', 'SOURCEFILE',
'DESTINATIONFILE', ['-msg MSGFILE'], [-timeout miliseconds]
```

- CONFIGID - the identifier of the SFTP configuration in the **Definitions for SFTP** form (System Management > System Maintenance > Internet Definitions > Definitions for SFTP).
- -u *or* -d - determines whether you are uploading a file to the SFTP server or downloading a file from it.
- SOURCEFILE - The file to upload from Priority, or to download from the SFTP server.
- DESTINATIONFILE - the name of the file to create on the SFTP server (when uploading) or on the Priority server (when downloading). Note that you cannot create folders on the SFTP server as part of the upload.
- *\[, \'-msg\', :msgFile\]* -- The file in which error messages will
    be recorded.
- *\['-timeout' miliseconds\] - determines the time in miliseconds before a connection timeout is reported.



### Examples

```sql
/* In this example, we upload a file to the sftp server 
from Priority */
SELECT SQL.TMPFILE INTO :SOURCE FROM DUMMY;
SELECT 'THIS IS A TEST' FROM DUMMY
ASCII :SOURCE;
/* filepaths on the SFTP server are relative to the path
 provided in the Defintions for SFTP form */
:DEST = 'destinationTest.txt';

/* 'ch1' is the code of the SFTP server in the Defintions 
for SFTP form */
EXECUTE SFTPCLNT 'ch1' '-u', :SOURCE, :DEST;

/* In the second example, we download a file from a folder 
on the server to Priority */
:SRC = 'TestFolder/GrabTest.txt';
:TRGT = STRCAT(SYSPATH('LOAD', 1), 'GrabTarget.txt');

EXECUTE SFTPCLNT 'ch1' '-d', :SRC, :TRGT;
```

## Listing the Contents of a Folder

```sql
EXECUTE SFTPCLNT 'CONFIGID' '-l[ist]' 'DIR', 'TABLEFILE',
 ['-msg MSGFILE'], [-timeout miliseconds]
```

When working in list mode, SFTPCLNT is very similar to the FILELIST program for viewing the contents of a local folder.

- CONFIGID - the identifier of the SFTP configuration in the **Definitions for SFTP** form (System Management > System Maintenance > Internet Definitions > Definitions for SFTP).
- *-l* indicates that the client should return the contents of the specified directory.
- DIR - The directory on the SFTP server whose contents you wish to view.
- TABLEFILE - a temporary file variable that will list the contents of the directory on the server.
- *\[, \'-msg\', :msgFile\]* -- The file in which error messages will
    be recorded.
- *\['-timeout' miliseconds\] - determines the time in miliseconds before a connection timeout is reported.

### Example

```sql
SELECT SQL.TMPFILE INTO :ST6 FROM DUMMY;
EXECUTE SFTPCLNT 'vg1', '-l', 'pub/example', :ST6;
LINK STACK6 TO :ST6;
GOTO 99 WHERE :RETVAL <= 0;
SELECT NAME, TYPE, 01/01/88 + NUM FROM STACK6 WHERE NAME <> '' FORMAT;
UNLINK STACK6;
LABEL 99;
```

**Results**

```text
NAME                                T NUM           
----------------------------------- - ------------- 
KeyGenerator.png                    F  02/10/23 12:45
KeyGeneratorSmall.png               F  12/10/23 08:15
ResumableTransfer.png               F  02/10/23 10:13 
```