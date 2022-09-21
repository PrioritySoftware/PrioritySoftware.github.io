---
title: ODBC
layout: default
permalink: /ODBC
class: nomenu
tags: "ODBC"
---

<style type="text/css">
    
    ul {
        list-style-type: disc;
    }

    /* #main_content_wrap {
        font-size: 120%;
        width: 60%;
    } */

</style>


## Introduction

[22.1]()

The Priority ODBC driver allows 3rd party applications to access data on the Priority server using SQL statements.

The driver does not provide direct access to the underlying database (MSSQL or Oracle), but rather to a wrapper which presents the same data available in Priority forms via the UI. Each form is represented as a table, and form fields are columns in this table.

## Database Schema

Each Priority company is treated a seperate database, with the database name taken from the company name. If you want to view data from more than one company, you need to establish multiple connections.

The tables of top level forms share the same internal name. For example, the **ORDERS** form is reprsented in the ODBC as the *ORDERS* table.
The relationship between upper-level and subforms can be complex, with certain subforms having more than one possible upper-level parent. To circumvent this, when accessing a subform, the upper-level form must be stated explicitly, in the structure *upperLevelForm*\_sep\_*subform*, e.g. **ORDERS\_sep\_ORDERITEMS**. 

Attempting to access just the subform (e.g., just **ORDERITEMS**) will generate an error.

The data available via ODBC is subject to the system privileges of the user making the connection. Forms which you are not authorized to view in the Priority UI are also unavailable via ODBC.

## Defining Forms as Available via ODBC

The Priority system has a large number of forms (over 3,000), but you generally only want to access a handful of them via ODBC. Therefore, only forms which are specified in the **Define ODBC Forms** form are actually exposed via ODBC.

**To define forms as available in ODBC:**

1. Open the **Define ODBC Forms** form (System Management > System Maintenance > Internet Definitions > Define ODBC Forms).
2. Select any forms you want exposed through ODBC in the **Form** field. If it is a subform, also specify the **Upper-level Form**. Add another line for each seperate upper-level form under which you want to access the subform.

The changes made in this form will take effect when you next connect with the ODBC Driver.

In order to improve performance, the ODBC driver caches to memory all metadata once it is received from the server. If there were server side changes to the metadata (columns added/removed/changed to a form, or added/removed forms), priodbc.dll should be reloaded (by restarting the client application).

## Installing the ODBC Driver

1. Download the Priority ODBC Driver Package (priodbc.zip).
2. Extract the contents of the zip file to a folder of your choice. For example, if you extracted it in the root C:\ drive, you'd have a new folder *C:\\priodbc*.
3. Run the installation script *install.bat* as an administrator.

### Verifying the Installation

You can check whether the installation was successful by running **ODBC Data Sources (64-bit)** (%windir%\system32\odbcad32.exe) and checking under the Drivers tab.\
**Note:** Not to be confused with the 32-bit version (%windir%\\**syswow64**\odbcad32.exe). The driver is only available in 64-bit. 

![ODBC Data Source Administrator](https://cdn.priority-software.com/docs/images/ODBC_data_sources.png)

Alternatively, you can check whether the driver is installed in the registry.

## Connecting to the Data Source

You can either pre-configure the data source, in the **ODBC Data Sources (64-bit)** utility, or add the configuration as part of the connection string in your code.

**To preconfigure your data source:**

![ODBC Data Source Administrator](https://cdn.priority-software.com/docs/images/ODBC_data_source_config.png)

1. In the **ODBC Data Sources (64-bit)** (%windir%\system32\odbcad32.exe) utility, switch to the **User DSN** tab.
2. Click **Add**.
3. Choose **Priority ODBC Unicode Driver**** and click **Finish**.
4. Configure the connection properties:
   - Data Source Name: Priority (or another name of your choice)
   - Server: <netgate_ip>:8005 (IP address or name of the Priority Application server where the netgate.exe process is running)
   - Tabula.ini: *tabula.ini* (name of configuration file in Priority server)
   - Language: 1 for Hebrew, 3 for English \
   **Note:** Language codes for other languages can be found in **System Management > Dictionaries > Translation > Languages**.
   - User: <priority_user>
   - Password: <priority_password>
   - Database: <company_name> \
    **Note:** You can find the company names in **System Management > System Maintenance > Companies > Companies**.

5. Press the **Test** button to check the connection.

### Connecting with a Connection String

Alternatively, you can fill in this data as part of the connection string:

```
Driver=Priority ODBC Unicode Driver;Server=<netgate_ip>:8005;Tabulaini=tabula.ini;Database=<my_company>;Lang=3;User=<pri_user>;Pwd=<pri_password>
```

## ODBC Functions

Using the Priority ODBC Driver 3rd party application can retrieve list of databases, tables, primary keys, foreign keys, etc.
Currently, the ODBC only supports the direct execution method. Prepared execution (SQLPrepareW and SQLExecute), procedures and catalog functions are not yet supported.
The following is a list of functions supported in v1 of the ODBC driver:

```
SQLAllocConnect 
SQLAllocEnv 
SQLAllocStmt 
SQLAllocHandle
SQLBindCol
SQLBindParameter
SQLBrowseConnectW
SQLCancel
SQLCancelHandle
SQLCloseCursor
SQLColAttributeW
SQLColAttributesW
SQLColumnPrivilegesW
SQLColumnsW
SQLConnectW
SQLCopyDesc
SQLDescribeColW
SQLDescribeParam
SQLDisconnect
SQLDriverConnectW
SQLEndTran
SQLErrorW
SQLExecDirectW
SQLExtendedFetch
SQLFetch
SQLFetchScroll
SQLFreeConnect
SQLFreeEnv
SQLFreeStmt
SQLFreeHandle
SQLForeignKeysW
SQLGetConnectAttrW
SQLGetConnectOptionW
SQLGetCursorNameW
SQLGetDescFieldW
SQLGetDescRecW
SQLGetDiagFieldW
SQLGetDiagRecW
SQLGetData
SQLGetEnvAttr
SQLGetFunctions
SQLGetInfoW
SQLGetStmtAttrW
SQLGetStmtOption
SQLGetTypeInfoW
SQLMoreResults
SQLNativeSqlW
SQLNumParams
SQLNumResultCols
SQLParamData
SQLParamOptions
SQLPrimaryKeysW
SQLRowCount
SQLSetCursorNameW
SQLSetDescFieldW
SQLSetDescRecW
SQLSetEnvAttr
SQLSetConnectAttrW
SQLSetConnectOptionW
SQLSetParam
SQLSetPos
SQLSetScrollOptions
SQLSetStmtAttrW
SQLSetStmtOption
SQLSpecialColumnsW
SQLStatisticsW
SQLTablesW
SQLTablePrivilegesW
SQLTransact
```

## Debugging

There are a number of tools you can use to debug ODBC calls to the server:

**Client Side**

On the client side, you can enable tracing in **ODBC Data Source Administrator (64-bit)**:

![ODBC Tracing](https://cdn.priority-software.com/docs/images/ODBC_data_source_trace.png)

**Server Side**

ODBC requests are tracked in *nrest.exe.log* in the Priority logs folder.


## Rules and Constraints

- only SELECT statements are supported (no INSERT/UPDATE etc.)

- only one SELECT statement per request is supported

- 'database.table' notation is not supported, only table names should be used in SELECT statements

- The following special characters can not be used in the names of objects (database, table, columns, etc.): @, #, $

- Subquery (select from select) is not supported :
    ```sql
    SELECT OTBL.ACTNAME, OTBL.ACT, OTBL.WORKC, OTBL.C1, OTBL.C2, ITBL.WORKPATNAME, ITBL.WORKPATDES FROM ( SELECT OTBL.ACTNAME, OTBL.ACT, OTBL.WORKC, ITBL.WORKCNAME as C1, ITBL.WORKCDES as C2, ITBL.WORKPAT FROM ACT as OTBL left outer join WORKC as ITBL on (OTBL.WORKC = ITBL.WORKC) ) as OTBL;
    ```

- IS NULL / IS NOT NULL expression should replaced by **=** or **<>** **''** for string values, or **=** or **<> 0** for numeric values

- The COUNT(X) function is replaced by COUNT(DISTINCT X)

- You can not use an expression in ORDER BY:
    ```sql
    SELECT COUNT(ACTNAME) as c0, ACT.WORKC as c1 FROM ACT GROUP BY c1 ORDER BY COUNT(ACTNAME) DESC;
    But there is workaround: expression should be replaced by alias or index:
    SELECT COUNT(ACTNAME) as c0, ACT.WORKC as c1 FROM ACT GROUP BY c1 ORDER BY c0 DESC;
    SELECT COUNT(ACTNAME) as c0, ACT.WORKC as c1 FROM ACT GROUP BY c1 ORDER BY 1 DESC;
    ```

- ORDER BY/GROUP BY column must appear in SELECTed columns:
    ```sql
    SELECT ACTNAME FROM ACT ORDER BY ACT; 
    ```
    the above statement will not work since ACT column is absent from the  SELECT columns; it should be:
    ```sql
    SELECT ACT, ACTNAME FROM ACT ORDER BY ACT;
    ```
- You can not select by TOP PERCENT:
    ```sql
    SELECT TOP 50 PERCENT VARNAME AS c0, ACT AS c1, PARAM AS c2, VAR AS c3 FROM ACT_sep_ACTVAR;
    ```

- COUNT(X) doesn't work for calculated fields:
    ```sql
    SELECT COUNT(CINVOICES_sep_CINVOICEITEMS.DISPRICE) AS c2 FROM CINVOICES_sep_CINVOICEITEMS;
    ```

- text forms are not supported

- picture fields are not supported

- Privileges for individual fields in a form, or for records by data authorization, are not yet supported.
