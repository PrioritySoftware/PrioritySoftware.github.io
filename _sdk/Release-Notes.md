---
title: Release Notes and Change Log
group: Release Notes
tags: 'Priority_SDK'
---

## SDK 24.0

### June 2024

- Documentation: Split file-based interfaces between [plain text](Load-Plain-Text) and [XML/JSON](Load-XML-JSON) files.
- Additional information added on how XML tags are structured and used.
- Added information on how to record [revisions codes](Installing-Customizations#additional-information-for-specific-modification-codes) that are not added automatically - TAKEWORDTMPL and TAKEHELP.

## SDK 23.1

### April 2024

- Added an undocumented mathmatical function POW(m, n) to [Scalar Expressions](Scalar-Expressions). Use it to calculate exponents with REAL numbers.
- Added an explanation of current limitations when exporting with JSON interfaces.
- Added a warning that cursors cannot be used in combined (e.g. POST-UPD-INS) form triggers.
- Clarified that EXL2TXT only works on the first sheet in an Excel file.

### December 2023

- New subsection in [Form Columns](Form-Columns): Adding columns to a reconciliation (split) form.

### October 2023

- <del>New option to upload and download files from an external SFTP using [WSCLIENT](WSCLIENT) </del>
- <ins>New option to upload and download files from an external SFTP with the new [SFTPCLNT](SFTPCLNT) </ins>
- New [section](VSCode-Extension) on installing the new Priority VSCode extension.
- Documented options for running FILELIST against the STACK_ERR table, as well as on changes to how it works on the public cloud (AWS).
- Added a sub-page to release notes listing all entities removed from the system as part of a version upgrade. You can find it [here](Removed-Entities)



## SDK 23.0

### July 2023

- Documented a new option for DTOA parsing - 'WW' for outputting the week in the current year.

### June 2023

- Moved [Filters](Filters) to a separate section and organized them. Added documention of two additional filters - '-replacef' and '-replacestrbase64'.

### May 2023

- Moved the [Priority Web](Priority-Web) section to a stand-alone page. Added a short guide on how a programmer can access files they created via code in cases where the server machine is inaccessible.
{% if site.output == "web" %} - Added a PDF version of the contents of this website. You can find it [here](https://cdn.priority-software.com/docs/PrioritySDK.pdf).
{% endif %}


### April 2023

- New options when using form interfaces to export data to [XML files](Loading-from-File#working-with-the-parsed-xml-file). The documentation of form interfaces has undergone a significant rewrite as part of this.
- [Documents](Documents) now support using NFILE in the input.
- Referenced the new DEBUGRESTRICTED system constant in [Debug Tools](Debug-Tools)
- New page on development considerations when developing for [Priority Cloud](Priority-Cloud)

## SDK 22.1

### March 2023

- Added more information on the behavior of the CHANGECOUNT variable. 
- Added info on showing zero values in reports in cases where the entire column has null values.
- Clarified that the *Skip Lines* field in the report generator is only relevant for splitting groups into pages when used in a simple report (-1 value only). It can be used for more exact line spacing in Documents.

### February 2023

- Added information on server buffering of log writes to the documentation of the [JOURNAL](Debug-Tools#tabulaini-definitions) program.

### November 2022

- Reverted form limitation for number of participating tables back to 80.
- [ODBC](../ODBC) is now available. Added some more information regarding requirements surrounding the use of the module.

### October 2022

- Removed the sections on Oracle and SQL ODBC. Read about the new and improved ODBC [here](../ODBC).
- Added more information on working with XML/JSON interface files in the web interface.
- Several new options added to the [OAuth2 Defintions](WSCLIENT#authenticating-with-oauth2) form.
- Added a new [Setting Up](Setting-Up) page with information on initial setup of a new development environment. It also contains information on the new option for working as a developer without being assigned to the *tabula* user group.
- Added documentation of the [INSTAG](XMLPARSE#inserting-data-into-an-xml-tag) function for inserting data into an XML file.
- Added more examples for [WINHTML](WINHTML#executing-the-document) for outputting a single document.

## SDK 22.0

## September 2022

- Documented the following [SQL Functions](SQL-Functions-Variables) - SQL.CLOUDURL, SQL.REGNAME, SQL.HOSTING, SQL.ORACLE
- Clarification that the *unbase64* filter expects unicode input.
- Added the size limit of tags read by XMLPARSE.

### August 2022

- User identifcation via Priority Lite is now deprecated and was removed from the SDK.

### May 2022

- Clarified that decimal seperator used in JSON files must be a decimal point.
- Added a note that the WINHTML option [-format](WINHTML#winhtml-parameters) is only available when printing a single document with **-v**.

### April 2022

- Added [NEWATTACH](Scalar-Expressions#strings) - a function that returns a valid name for a new folder.
- Added support for encoding unicode text files as [QR Codes](Report-Columns#displaying-qr-codes).

## SDK 21.1 

### Feb 2022

- Added base64 encode and decode [filters](Filters#base64)
- Added **delnl** [filter](Filters#file-formatting)
- Some clarifications on the encoding of the infile used with [WSCLIENT](WSCLIENT)

### Jan 2022

- Published the SDK in the Developer Portal!
- Added site search (powered by Algolia).
- Major rewrite on [outputting documents](Documents), focusing on how to use the WINHTML program and its various parameters.
- Moved some topics from the Advanced Programming Tools into more fitting sections.
- Minor tweaks and corrections.