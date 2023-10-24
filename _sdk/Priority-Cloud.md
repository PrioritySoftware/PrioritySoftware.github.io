---
title: Priority Cloud
group: Cloud
tags: 'Priority_SDK'
---

Development on Priority Cloud is mostly identical to development for [Priority Web](Priority-Web) on a local installation. However, there are some additional restrictions on where files can be saved.

When saving files via code, they can only be saved to the temporary file system folder:

- **system/tmp**

You cannot save files directly to the attachments directory (*system/mail*) or the cloud interface directory (*system/sync*). However, you can create the files first in the permitted folder, then use the COPYFILE program to copy it to the relevant directory. For example:

```sql
/* Create a valid filename target in system/mail */
SELECT NEWATTACH('aaa1', 'txt') INTO :FOUT FROM DUMMY;
/* Create a temporary file to work with */
SELECT SQL.TMPFILE INTO :F FROM DUMMY;
SELECT * FROM DAYS WHERE DAYNUM BETWEEN 1 AND 4 TABS :F;
SELECT * FROM DAYS WHERE DAYNUM > 4 TABS ADDTO :F;
EXECUTE COPYFILE :F, :FOUT;
```

The exception to this rule is the **WINHTML** program, which *can* save files to *system/mail*:

```sql
  :DOC = 100;
  SELECT NEWATTACH('document.pdf') INTO :PATH FROM DUMMY;
  EXECUTE WINHTML '-d', 'WWWSHOWORD', '', '', '-v', :DOC, '-pdf', :PATH;
```

## system/sync

The **system/sync** folder is a special folder available in Priority installations on the public cloud. It provides a location, accessible by SFTP, where users can upload files from an external source.

The folder behaves a bit differently than regular Priority folders. THe following considerations should be taken into account when using it in code and uploading to it:

1. Priority expects all files and folders in this folder to be entirely in lowercase. If you upload files with capital letters, Priority cannot interact with them.
2. If you use COPYFILE to copy files to this folder, the name of the created file will automatically be changed to lowercase.
3. When using COPYFILE, you can specify a subdirectory as part of the name of the file. If necessary, a directory (in lowercase) with that name will be created. There is no need to use MAKEDIR beforehand to create the directory.