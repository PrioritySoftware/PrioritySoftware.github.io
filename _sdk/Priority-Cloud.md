---
title: Priority Cloud
layout: sdk_nav
group: Cloud
tags: 'Priority_SDK'
---

Development on Priority Cloud is mostly identical to development for [Priority Web](Priority-Web) on a local installation. However, there are some additional restrictions on where files can be saved.

When saving files via code, they can only be saved to the following system folders:

- **system/load**
- **system/tmp**

You cannot save files directly to the attachments directory (*system/mail*). However, you can create the files first in the permitted folders, then use the COPYFILE program to copy it to the attachments directory. For example:

```sql
:MYFILE = '../../system/tmp/demoFile.xls';
EXECUTE WINACTIV '-P', 'ORGUNITS', '-X', :MYFILE, 444;

:SYSMAILPATH = '';
SELECT NEWATTACH('demoFile') INTO :SYSMAILPATH FROM DUMMY;

EXECUTE COPYFILE :MYFILE, :SYSMAILPATH;
```

The exception to this rule is the **WINHTML** program, which *can* save files to *system/mail*:

```sql
  :DOC = 100;
  :FILENAME = 'document.pdf';
  :PATH = '';
  SELECT NEWATTACH(:FILENAME) INTO :PATH FROM DUMMY;
  EXECUTE WINHTML '-d', 'WWWSHOWORD', '', '', '-v', :DOC, '-pdf', :PATH;
```

