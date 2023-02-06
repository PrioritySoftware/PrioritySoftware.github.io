---
title: Dynamic SQL
layout: sdk_nav
group: Programming Tools
tags: 'Priority_SDK'
---

## Executing SQL Queries Dynamically 

The **EXECUTE SQLI** command can be used to run SQL commands:

```sql
:FILENAME = '..\..\tmp\sqlfile.txt';
EXECUTE SQLI :FILENAME;
```

This command can be used to run both static (pre-written) or dynamic code.

Note that EXECUTE SQLI will ignore INSERT/UPDATE/DELETE operations unless it is run by users in the *tabula* user group, for both dynamic and static code.

> **Example:** See step 20 of the **LOADMIGUSERS** procedure.


