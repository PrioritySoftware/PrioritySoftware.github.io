---
title: ODBC
layout: default
permalink: /ODBC
tags: "ODBC"
---

<style type="text/css">
    
    ul {
        list-style-type: disc;
    }

    #main_content_wrap {
        font-size: 120%;
        width: 60%;
    }

</style>



## Introduction

[22.1]
The Priority ODBC driver allows 3rd party applications to access data on the Priority server using SQL statements.

The driver does not provide direct access to the underlying database (MSSQL or Oracle), but rather to a wrapper which presents the same data available in Priority forms via the UI. Each form is represented as a table, and form fields are columns in this table.

## Database Schema

Each Priority company is treated a seperate database, with the database name taken from the company name. If you want to view data from more than one company, you need to establish multiple connections.

The tables of top level forms share the same internal name. For example, the **ORDERS** form is reprsented in the ODBC as the *ORDERS* table.
The relationship between upper-level and subforms can be complex, with certain subforms having more than one possible upper-level parent. To circumvent this, when accessing a subform, the upper-level form must be stated explicitly, in the structure *upperLevelForm*\_sep\_*subform*, e.g. **ORDERS\_sep\_ORDERITEMS**. 

Attempting to access just the subform (e.g., just **ORDERITEMS**) will generate an error.

The data available via ODBC is subject to the data permissions of the user making the connection. Records which you are not authorized to view in the Priority UI are also unavailable via ODBC.

## Defining Forms as Available via ODBC

The Priority system has a large number of forms (over 3,000), but you generally only want to access a handful of them via ODBC. Therefore, only forms which are specified in the **Define ODBC Forms** form are actually exposed via ODBC.

**To define forms as available in ODBC:**

1. Open the **Define ODBC Forms** form (System Management > System Maintenance > Internet Definitions > Define ODBC Forms).
2. Select any forms you want exposed through ODBC in the **Form** field. If it is a subform, also specify the **Upper-level Form**. Add another line for each seperate upper-level form under which you want to access the subform.

The changes made in this form will take effect when you next connect with the ODBC Driver.

## Installing the ODBC Driver

1. Download the Priority ODBC Driver Package (priodbc.zip).
2. Extract the contents of the zip file to a folder of your choice. For example, if you extracted it in the root C:\ drive, you'd have a new folder *C:\\priodbc*.
3. Run the installation script *install.bat* as an administrator.

### Verifying the Installation

You can check whether the installation was successful by running **ODBC Data Sources (64-bit)** (%windir%\system32\odbcad32.exe) and checking under the Drivers tab.\
**Note:** Not to be confused with the 32-bit version (%windir%\\**syswow64**\odbcad32.exe). The driver is only available in 64-bit. 

Alternatively, you can check whether the driver is installed in the registry.

## Connecting to the Database



### Local Server


### Cloud Server


## ODBC Functions

Using Priority ODBC Driver 3rd party application can retrieve list of databases, tables, primary keys, foreign keys, etc.
See below list of functions currently supported in v1:

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

NOTE: in v1 ODBC direct execution method only is supported. Prepared execution (SQLPrepareW and SQLExecute), procedures and catalog functions are not supported


The ODBC only supports SELECT statements - the data is read-only and cannot be manipulated.
Create files and download/save them to a specific location?


## Code Example?