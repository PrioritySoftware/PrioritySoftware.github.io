---
title: Outputting Documents - the WINHTML Program
group: Documents
tags: 'Priority_SDK'
---

Using the WINHTML program, you can output the document in a variety of formats and control document properties. 

In the following syntax, optional parameters are specified in square brackets **[ ]**, while mutually exclusive parameters (i.e., you need to choose one of them) are separated by a pipe symbol **|**
```sql
EXECUTE WINHTML '-d' | '-dQ', 'document_name', 'table', 
'linked_file', '-v', 'record_id', ['-trc', debug_file,] ['-s',] 
['-e',]  ['-edoc' | '-signpdf',] ['output_file',] ['-o' |'-pdf' | 
'-wo' | '-wpdf',] ['-format', format_num,]   ['-lang', lang_num,] 
['-AMAIL']
```
## WINHTML Parameters
- '-d' - create document. 
- '-dQ' - Print document with the default printer. You can only print a single document (i.e., one specified as a record ID) when using this parameter.
- 'document_name' – the internal name of the document, e.g. WWWSHOWORDER.
- 'table, linked_file' – specify this if you are outputting a record from a linked table. Leave as empty quotes if you are outputting from a standard table, e.g.:
EXECUTE WINHTML '-d', 'WWWSHOWORDER', '', '',
- '-v' – use when outputting a single record, such as when using an Action from a form. This will result in faster output, as the program will skip the HTMLCURSOR step. 
- 'record_id' – the unique id of the record you are outputting (e.g. ORD = 100).
- '-trc', debug_file - runs the WINHTML program in debug mode and outputs debugging information to the debug file.
- '-e' – when working in a language other than English, use the English version of the document.
- 'edoc' – output the document as an e-document.
- 'signpdf' – output the document as a PDF and digitally sign it. Please note that a signed PDF is not equivalent to an e-document!.
- '-output_file' - file name + path to file to create.
- '-s' – supresses the notification window that pops up when preparing the document.
- '-o' \|'-pdf' \| '-wo' \| '-wpdf' – select the output format of the document:
  - -o outputs the document as a system document (HTML)
  - -pdf outputs the document as a PDF based on a system document
  - -wo outputs the document based on a Word template (DOCX file)
  - -wpdf outputs the document as a PDF based on a word template
- '-format', format_num – specify the number of the print format (for system documents) or Word template (for template documents). When this parameter is used, the system will ignore the values in the PRINTFORMATS table. 
The *-format* option can only be used when printing a single document, i.e. the **-v** option is also specified.
- '-lang lang_num' – Use this parameter to specify the language of the printout. This is useful if you want to output the document a format defined for a language differing from that of the current UI language of the user (e.g. a user working in the system with the UI in German, who wants to  output a document in French for a customer in France). In this case you need to specify both the format and the language in which the format is defined.
- '-AMAIL' – automatically send the document to the customer/vendor contact, or to the customer/vendor directly (based on whether a contact with an email is defined or not).

### Document Format

As the printout will be created automatically, there is no user input to determine the print format; rather you have to set it yourself. 
You can do so in one of two ways:
- 	By specifying the format as part of the document execution command, using the -format parameter. (see [Executing the Document](#executing-the-document)). This option can only be used when printing a single document, i.e. the **-v** option is also specified.
- 	By means of the PRINTFORMAT table, which always saves the last print format utilized by a given user for a given document. Thus, when the document runs, the system takes the print format to be displayed from this table. In order to ensure that your procedure always displays the desired print format, you have to update the relevant record in the PRINTFORMAT table prior to execution of the document. 

### Determining Available Print Formats
To find out which print formats are available for a given document, run the following SQL commands in WINDBI:
```sql
/* this code will show all system document print formats defined
 for the Order Confirmation document */
SELECT * FROM EXTMSG WHERE EXEC = (
SELECT EXEC FROM EXEC WHERE TYPE = 'P' 
AND ENAME = 'WWWSHOWORDER') 
AND NUM < 0 FORMAT;
/* this code will show word templates defined for the document */
SELECT * FROM TRIGMSG WHERE EXEC = (
SELECT EXEC FROM EXEC WHERE TYPE = 'P' 
AND ENAME = 'WWWSHOWORDER') FORMAT;
```

### Setting the Print Format
At this point you should know the EXEC of the document you want to run and the number of the print format you want to display. 

```sql
/* this code defines the format that will be used to print the 
document; in the current example, it is assumed that we want to 
use print format -5 */
:EXEC = 0;
SELECT EXEC INTO :EXEC FROM EXEC WHERE TYPE = 'P' 
AND ENAME = 'WWWSHOWORDER';
:PRINTFORMAT = -5;
UPDATE PRINTFORMAT SET VALUE = :PRINTFORMAT
WHERE EXEC = :EXEC AND USER = SQL.USER;
```

## WINHTML Examples

### Executing the Document

The following examples come in pairs. The first example is for outputting a single document (with '-v'), the second one is for outputting multiple documents:

- 	To output the document as an HTML system document (-o), use the following code:
```sql
/*single document*/
:ORD = 100;
:HTMLFILE = '../../tmp/SOMEFILENAME.html';
EXECUTE WINHTML '-d', 'WWWSHOWORDER', '', '', '-v', :ORD, '-s', 
'-o', :HTMLFILE;
```
```sql
/*multiple documents*/
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS, '-o', 
'../../TMP/O.html';
```
- 	To output the document as PDF based on a system document (-pdf), use the following code:
```sql
/*single document*/
:ORD = 100;
:PDFFILE = '../../tmp/SOMEFILENAME.pdf';
EXECUTE WINHTML '-d', 'WWWSHOWORDER', '', '', '-v', :ORD, '-s', 
'-pdf', :PDFFILE;
```
```sql
/*multiple documents*/
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS, 
'-pdf', '../../TMP/O.html';
```
- 	To output the document as a Word file (-wo), use the following code:
```sql
/*single document*/
:ORD = 100;
:WORDFILE = '../../tmp/SOMEFILENAME.docx';
EXECUTE WINHTML '-d', 'WWWSHOWORDER', '', '', '-v', :ORD, '-s', 
'-wo', :WORDFILE;
```
```sql
/*multiple documents*/
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS, '-wo', 
'../../TMP/O.docx';
```
- 	To output the document as a pdf file based on a word file (-wpdf), use the following code:
```sql
/*single document*/
:ORD = 100;
:PDFFILE = '../../tmp/SOMEFILENAME.pdf';
EXECUTE WINHTML '-d', 'WWWSHOWORDER', '', '', '-v', :ORD, '-s', 
'-wpdf', :PDFFILE;
```
```sql
/*multiple documents*/
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS, 
'-wpdf', '../../TMP/O.pdf'; 
```

**Notes:**

The above code will download the files to your temp folder. 

Both HTML formats and Word templates behave in a similar way, where the value of *'-format'* needs to match that of a HTML format or Word template. Since Word templates are stored as positive values in the PRINTFORMAT table, if you based the format on a negative TRIGMSG, convert it to a positive value first (multiply by -1). 

### Printing the Document using the Default Printer

If you want to print the document, use **'-dQ'** instead of '-d'. In this example we assume our order has an id of 100. Remember that you must specify the document as a record ID in this case.

```sql
:ORD = 100;
EXECUTE WINHTML '-dQ', 'WWWSHOWORDER', :ORD
```



### Creating a Digitally Signed PDF Document using Procedure Code
Assuming that the user running the procedure has been granted the privileges required for digitally signing PDF documents, a HTML document may be converted into a PDF and digitally signed from within the procedure itself. This is done by adding the **–signpdf** option to the WINHTML command. Remember that a digital signature is not the same as an e-document!

Example: The following code will create a digitally signed PDF of the sales order in which ORD = 100:
```sql
:ORD = 100;
:PDFFILE = '../../tmp/SOMEFILENAME.pdf';
EXECUTE WINHTML '-d', 'WWWSHOWORDER', '', '', '-v', :ORD, '-s', 
'-signpdf', '-pdf', :PDFFILE;
```

### Creating an E-Document using Procedure Code 
If you are required to create a digitally signed E-Document, for instance, when printing financial documents, you can create a digitally signed E-Document from within the procedure itself. This is done by adding the  **-edoc** option to the WINHTML command.

Example: The following code will create a digitally signed E-Document of an Invoice/Credit Memo:
```sql
EXECUTE WINHTML '-d', 'WWWSHOWCIV', '', '', '-v', :IV, '-s', 
'-edoc', '-pdf', :FILE2; 
```

To automate the mailing of the E-Document that you created, use the following code:
```sql
EXECUTE WINHTML '-d', 'WWWSHOWCIV', '', '', '-v', :IV, '-g', 
'-edoc', '-AMAIL', '-s'; 
```

**Note:** When using the -AMAIL parameter, do not specify a path/filename, as the file will be renamed automatically and saved in the relevant invoice's attachments.

### Saving a Certified Copy when Printing a Document
You can define a procedure so that, when the document is printed or sent by e-mail (:SENDOPTION = 'PRINT' or 'AMAIL'), a certified copy is saved that can be printed later (using the Create Certified Copy program). \
In order to save a copy:
- 	Include an HTMLEXTFILES step which goes over the attached files.
- 	In the first INPUT step, set the :HTMLPRINTORIG variable to 1.
- 	In the SQLI step after the HTMLCURSOR step, set the :SAVECOPY variable to 1.
These variables are updated during runtime, so that if several documents are being printed together, the variables will be set for each individual document, depending on its status.

    Example: See the **WWWSHOWCIV** procedure.

**Note:** See also the SHOWCOPY command in [Procedures](Procedures).


## Displaying the Document 

[22.0]()

If you are executing WINHTML from a procedure, you can combine it with a **URL** step in order to display the document in the browser or download the docx file.

1. Add a SQLI step, with a paramter of type ASCII that will contain the url for the file. In this example, we'll use ADD (short for address).
2. Add the following code:
  ```sql
  :DOC = 100;
  :FILENAME = 'document.pdf';
  :PATH = '';
  /* We use the NEWATTACH function to create a path in the system/
  mail folder*/
  SELECT NEWATTACH(:FILENAME) INTO :PATH FROM DUMMY;
  EXECUTE WINHTML '-d', 'WWWSHOWORD', '', '', '-v', :DOC, '-pdf', 
  :PATH;
  SELECT SQL.TMPFILE INTO :$.ADD FROM DUMMY; /*This file will 
  contain our URL */
  /* You can find out the start of the URL by opening an existing 
  attachment on the server and copying the start of the address up
   to "primail" */
  :URLSTART =  'https://exampleserver.com/comp/primail/';
  /* Cut the previously generated path to only the subfolder and
   filename */
  SELECT SUBSTR(:PATH, 19, STRLEN(:PATH)) INTO :PATH FROM DUMMY;
  /* Combine the url together into the ADD url file */
  SELECT STRCAT(:URLSTART, :PATH)  FROM DUMMY
  ASCII :$.ADD;
  ```
3. Add a URL step to the procedure, with the ADD parameter.

When run, the procedure will generate the document in the specified format (in our case PDF), then open it in the browser.

