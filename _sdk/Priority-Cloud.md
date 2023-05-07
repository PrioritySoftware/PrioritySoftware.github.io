---
title: Priority Cloud
layout: sdk_nav
group: Cloud
tags: 'Priority_SDK'
---

Development on Priority Cloud is mostly identical to development for [Priority Web](Priority-Web) on a local installation. However, there are some additional restrictions on where files can be saved.

When saving files via code, they can only be saved to the temporary file system folder:

- **system/tmp**

You cannot save files directly to the attachments directory (*system/mail*) or interface directory (*system/load*). However, you can create the files first in the permitted folder, then use the COPYFILE program to copy it to the relevant directory. For example:

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

