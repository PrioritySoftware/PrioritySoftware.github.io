---
title: Dynamic SQL
layout: sdk_nav
group: Programming Tools
tags: 'Priority_SDK'
---

## Executing SQL Queries Dynamically 

SQL queries can be created and executed dynamically in forms or
procedures using the command EXECUTE SQLI -- which takes an ASCII file
as a parameter.

Only the *tabula* user can run the EXECUTE SQLI command.

> **Example:** See step 20 of the **LOADMIGUSERS** procedure.

## Executing SQL Server Code from Priority 

SQL Server code can be executed from within **Priority** using
the **SQLRUN** program. The program takes as a parameter an ASCII file
containing the SQL Server code.

> **Example:** See the **SQLCHECK** procedure.

