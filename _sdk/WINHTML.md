---
title: Outputting Documents - the WINHTML Program
layout: sdk_nav
---

Using the WINHTML program, you can output the document in a variety of formats and control document properties. 

In the following syntax, optional parameters are specified in square brackets **[ ]**, while mutually exclusive parameters (i.e., you need to choose one of them) are separated by a pipe symbol **|**
```
EXECUTE WINHTML '-d' 'document_name', 'table', 'linked_file', '-v', 'record_id', ['-g',] ['-s',] ['-e',] ['-edoc' | '-signpdf',] [''output_file',] ['-o' |'-pdf' | '-wo' | '-wpdf',] ['-format' format_num,] ['-lang lang_num'] ['-AMAIL']
```
## WINHTML Parameters
- 'document_name' – the internal name of the document, e.g. WWWSHOWORDER.
- 'table, linked_file' – specify this if you are outputting a record from a linked table. Leave as empty quotes if you are outputting from a standard table, e.g.:
EXECUTE WINHTML '-d', 'WWWSHOWORDER', '', '',
- '-v' – use when outputting a single record, such as when using an Action from a form. This will result in faster output, as the program will skip the HTMLCURSOR step. 
- 'record_id' – the unique id of the record you are outputting (e.g. ORD = 100).
- '-e' – when working in a language other than English, use the English version of the document.
- 'edoc' – output the document as an e-document.
- 'signpdf' – output the document as a PDF and digitally sign it. Please note that a signed PDF is not equivalent to an e-document!.
- '-output_file' - file name + path to file to create.
- '-s' – save as attachment in document form.
- '-o' \|'-pdf' \| '-wo' \| '-wpdf' – select the output format of the document:
  - -o outputs the document as a system document (HTML)
  - -pdf outputs the document as a PDF based on a system document
  - -wo outputs the document based on a Word template (DOCX file)
  - -wpdf outputs the document as a PDF based on a word template
- '-format' format_num – specify the number of the print format (for system documents) or Word template (for template documents). When this parameter is used, the system will ignore the values in the PRINTFORMATS table.
- '-lang lang_num' – Use this parameter to specify the language of the printout. This is useful if you want to output the document in a language other than that of the current user (e.g. a user in a German system outputting a document in French for a customer in France).
- '-AMAIL' – automatically send the document to the customer/vendor contact, or to the customer/vendor directly (based on whether a contact with an email is defined or not).

### Document Format

As the printout will be created automatically, there is no user input to determine the print format; rather you have to set it yourself. 
You can do so in one of two ways:
- 	By specifying the format as part of the document execution command, using the -format parameter. (see [Executing the Document](#executing-the-document)).
- 	By means of the PRINTFORMAT table, which always saves the last print format utilized by a given user for a given document. Thus, when the document runs, the system takes the print format to be displayed from this table. In order to ensure that your procedure always displays the desired print format, you have to update the relevant record in the PRINTFORMAT table prior to execution of the document. 

### Determining Available Print Formats
To find out which print formats are available for a given document, run the following SQL commands in WINDBI:
```sql
/* this code will show all printsystem print formats defined for the document */
SELECT * FROM EXTMSG WHERE EXEC = (
SELECT EXEC FROM EXEC WHERE TYPE = 'P' AND ENAME = 'WWWSHOWORDER') AND NUM < 0 FORMAT;
/* this code will show word templates defined for the document */
SELECT * FROM TRIGMSG WHERE EXEC = (
SELECT EXEC FROM EXEC WHERE TYPE = 'P' AND ENAME = 'WWWSHOWORDER') FORMAT;
```

### Setting the Print Format
At this point you should know the EXEC of the document you want to run and the number of the print format you want to display. 

 In the SQLI step of the procedure that runs the form interface for the Sales Orders form, add the following commands after execution of the form interface:

```sql
/* this code defines the format that will be used to print the document; in the current example, it is assumed that we want to use print format -5 */
:EXEC = 0;
SELECT EXEC INTO :EXEC FROM EXEC WHERE TYPE = 'P' AND ENAME = 'WWWSHOWORDER';
:PRINTFORMAT = -5;
UPDATE PRINTFORMAT SET VALUE = :PRINTFORMAT
WHERE EXEC = :EXEC AND USER = SQL.USER;
SELECT SQL.TMPFILE INTO :TMPORDERS FROM DUMMY;
LINK ORDERS TO :TMPORDERS;
GOTO 199 WHERE :RETVAL <= 0;
INSERT INTO ORDERS SELECT * FROM ORDERS O 
WHERE ORD = (
SELECT ATOI(KEY1) FROM GENERALLOAD 
WHERE RECORDTYPE = '1' AND LOADED = 'Y');
/* Remark: In this example I assume the form interface uses the GENERALLOAD table and that RECORDTYPE = '1' is the RECORDTYPE used for the ORDERS form. 
Reminder: After a successful load, the AutoUnique value of each new order is saved in the KEY1 column of the load table */
```

## WINHTML Examples

### Executing the Document
- 	To display the document on screen in HTML format, continue the above code as follows:
```sql
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPORDERS [,'-format',:PRINTFORMAT]; 
LABEL 199;
```
    Optionally, if you want to specify the format as part of the command, add '-format' and the format number (as a variable or by specifying the number directly).

    **Note:** The above code will only display a document on screen when it is run as part of a step in a procedure.
- 	To display the document as a Word file (-wo), use the following code instead:

```sql
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPFILE, '-wo', '../../TEMP/O.docx';
```
- 	To display the document as a pdf file based on a word file (-wpdf), use the following code instead:
```sql
EXECUTE WINHTML '-d', 'WWWSHOWORDER', 'ORDERS', :TMPFILE, '-wpdf', '../../TEMP/O.pdf'; 
```

------------------
**Notes:**

The above code will download the files to your temp folder. 

Both HTML formats and Word templates behave in a similar way, where the value of *'-format'* needs to match that of a HTML format or Word template. Since Word templates are stored as positive values in the PRINTFORMAT table, if you based the format on a negative TRIGMSG, convert it to a positive value first (multiply by -1). 

----

### Creating a Digitally Signed PDF Document using Procedure Code
Assuming that the user running the procedure has been granted the privileges required for digitally signing PDF documents, an HTML document may be converted into a PDF and digitally signed from within the procedure itself. This is done by adding the –signpdf option to the WINHTML command.

Example: The following code will create a digitally signed PDF of the sales order in which ORD = 100:
```sql
:ORD = 100;
:PDFFILE = '../../SOMEFILENAME.pdf';
EXECUTE WINHTML '-d', 'WWWSHOWORDER', '', '', '-v', :ORD, '-g', '-signpdf', '-pdf', :FILE1, '-s';
```

### Creating an E-Document using Procedure Code 
If you are required to create a digitally signed E-Document, for instance, when printing financial documents, you can create a digitally signed E-Document from within the procedure itself. This is done by adding the –signpdf -edoc option to the WINHTML command.

Example: The following code will create a digitally signed E-Document of an Invoice/Credit Memo:
```sql
EXECUTE WINHTML '-d', 'WWWSHOWCIV', '', '', '-v', :IV, '-g', '-signpdf' '-edoc', :FILE2, '-s'; 
```

To automate the mailing of the E-Document that you created, use the following code:
```sql
EXECUTE WINHTML '-d', 'WWWSHOWCIV', '', '', '-v', :IV, '-g', '- signpdf' '-edoc', '-AMAIL', '-s'; 
```
### Saving a Certified Copy when Printing a Document
You can define a procedure so that, when the document is printed or sent by e-mail (:SENDOPTION = 'PRINT' or 'AMAIL'), a certified copy is saved that can be printed later (using the Create Certified Copy program). 
In order to save a copy:
- 	Include an HTMLEXTFILES step which goes over the attached files.
- 	In the first INPUT step, set the :HTMLPRINTORIG variable to 1.
- 	In the SQLI step after the HTMLCURSOR step, set the :SAVECOPY variable to 1.
These variables are updated during runtime, so that if several documents are being printed together, the variables will be set for each individual document, depending on its status.

    Example: See the **WWWSHOWCIV** procedure.

Note: See also the SHOWCOPY command in [Procedures](Procedures).

## Windows Interface Only – Printing with WINACTIV
If the user is working in the windows interface and has a default printer defined, you can send documents to the default printer:
```sql
EXECUTE WINACTIV '-P', 'WWWSHOWORDER', '-q', 'ORDERS', :TMPORDERS;
LABEL 199;
```
When sending the document to the default printer, if you want to print more than 1 copy, use the flag '–Q' instead of '–q'. For example, to print 2 copies, continue the above code as follows:
```sql
EXECUTE WINACTIV '-P', 'WWWSHOWORDER', '-Q',2, 'ORDERS', :TMPORDERS; LABEL 199;
```
