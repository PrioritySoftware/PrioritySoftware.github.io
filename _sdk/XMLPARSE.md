---
title: Parsing XML and JSON
group: Programming Tools
tags: 'Priority_SDK'
---

# Working with XML 

## Parsing an XML File

In addition to reading data from an XML/JSON file via [a form load](Interfaces), you can also use the XMLPARSE command.
When the file contains several instances per tab, include the *--all* parameter to parse the entire file. Omit it to limit results to the first instance of each tab.

<span class="version-highlight">23.1</span>

Starting with version 23.1, XMLPARSE can read up to 45,000 chracters in a single XML tag (make sure you have the latest BIN installed).

In previous versions, XMLPARSE can read a maximum of 1023 characters in a single XML tag. 

**Syntax**: 
```sql
EXECUTE XMLPARSE :XMLFILE, :LINKFILE, 0, :MSGFILE, ['-all'];
```

- **:XMLFILE** - XML file to parse.
- **:LINKFILE** -  Link file into which the parsed data is written.
- **0** - required syntax.
- **:MSGFILE** - Link file into which errors are written, if there are any.
- **'-all'** - Optional. Determines whether to read all tags in the file, or only the first instance of each tag.

**Example:**
This example shows the

```sql
SELECT SQL.TMPFILE INTO :OUTXMLTAB1 FROM DUMMY;
SELECT SQL.TMPFILE INTO :OUTXMLTAB2 FROM DUMMY; 
SELECT SQL.TMPFILE INTO :MSG FROM DUMMY; 
LINK INTERFXMLTAGS I1 TO :OUTXMLTAB1;
GOTO 500 WHERE :RETVAL <= 0; 
LINK INTERFXMLTAGS I2 TO :OUTXMLTAB2;
GOTO 500 WHERE :RETVAL <= 0;

:FILE = STRCAT(SYSPATH('LOAD',1), 'example.xml');

EXECUTE XMLPARSE :FILE, :OUTXMLTAB1, 0, :MSG;
EXECUTE XMLPARSE :FILE, :OUTXMLTAB2, 0, :MSG, '-all';
SELECT LINE, TAG, VALUE, ATTR 
FROM INTERFXMLTAGS I1 WHERE LINE <> 0 FORMAT;
SELECT LINE, TAG, VALUE, ATTR
FROM INTERFXMLTAGS I2 WHERE LINE <> 0 FORMAT;
LABEL 500;
UNLINK INTERFXMLTAGS I1;
UNLINK INTERFXMLTAGS I2; 
```

When the XML file looks like this:

![](https://cdn.priority-software.com/docs/images/XML_file-173.png "XML_file-173.png")

results for the above two EXECUTE commands (without the *--all* parameter and with it) are as follows:

![](https://cdn.priority-software.com/docs/images/XMLPARSE_results-173.png "XMLPARSE_results-173.png")

## Inserting Data into an XML Tag

You can use the **INSTAG** command to insert data into an XML tag in an existing file.

**Syntax:**
```sql
EXECUTE INSTAG 'path_to_xml_file', 'path_to_data_file', 'tag_name';
```

You can provide the file paths and tag name as variables:

```sql
:XMLFILE = 'path_to_xml_file';
:DATAFILE = 'path_to_data_file';
:XMLTAG = 'tag_name';
EXECUTE INSTAG :XMLFILE, :DATAFILE, :XMLTAG;
```

A common use case for this functionality is inserting image data into an XML file as base64:

```sql
:IN_JPG = STRCAT(SYSPATH('TMP', 0), 'my_jpg.jpg'); 
:IN_JPGBASE = STRCAT(SYSPATH('TMP', 0), 'my_jpg.base');
EXECUTE FILTER '-base64', :IN_JPG, :IN_JPGBASE;
:IN_XML = STRCAT(SYSPATH('TMP', 0), 'file.xml');
:IN_TAG = 'attach';
EXECUTE INSTAG :IN_XML, :IN_JPGBASE, :IN_TAG;
```

Note that if there are multiple tags with the same name in the XML file, the contents will be inserted into the first tag found.

# Parsing JSON 

Parsing a JSON file works almost exactly like parsing XML, with the small addition of a **'Y'** to the end of the EXECUTE XMLPARSE command.

**Example:** 
```sql
SELECT SQL.TMPFILE INTO :OUTJSONTAB1 FROM DUMMY; 
SELECT SQL.TMPFILE INTO :OUTJSONTAB2 FROM DUMMY;
SELECT SQL.TMPFILE INTO :MSG FROM DUMMY; 
LINK INTERFXMLTAGS I1 TO :OUTJSONTAB1; 
GOTO 500 WHERE :RETVAL <= 0;
LINK INTERFXMLTAGS I2 TO :OUTJSONTAB2; 
GOTO 500 WHERE :RETVAL <= 0;
:FILE = STRCAT(SYSPATH('LOAD',1), 'example.json');

EXECUTE XMLPARSE :FILE, :OUTJSONTAB1, 0, :MSG, '', 'Y'; /*Note the extra 'Y'*/
EXECUTE XMLPARSE :FILE, :OUTJSONTAB2, 0, :MSG, '-all', 'Y';
SELECT LINE, TAG, VALUE, ATTR FROM INTERFXMLTAGS I1 WHERE LINE > 0 FORMAT;
SELECT LINE, TAG, VALUE, ATTR FROM INTERFXMLTAGS I2 WHERE LINE > 0 FORMAT;
LABEL 500;
UNLINK INTERFXMLTAGS I1;
UNLINK INTERFXMLTAGS I2; 
```

![](https://cdn.priority-software.com/docs/images/JsonParse.png "JsonParse.png")


# Converting Files from Base64

Some APIs may return a response with a file (usually an image/pdf) encoded as text in Base64. The following code demonstrates how you might convert the file back to the original format:

```sql
SELECT SQL.TMPFILE INTO :JSON1 FROM DUMMY;
SELECT SQL.TMPFILE INTO :MSG FROM DUMMY; 
LINK INTERFXMLTAGS I1 TO :JSON1; 
GOTO 500 WHERE :RETVAL <= 0;
/*Parse previously received JSON response*/
EXECUTE XMLPARSE :RESPONSE, :OUTJSONTAB1, 0, :MSG, '', 'Y'; 
/* Manipulation of the file should be done in the
temporary file folder */
SELECT SQL.TMPFILE INTO :PDFBASE64TMP FROM DUMMY;
SELECT SQL.TMPFILE INTO :PDFFILETMP FROM DUMMY;
SELECT SQL.TMPFILE INTO :FILTERTMP FROM DUMMY;
/* Dump the parsed base64 contents into a temporary
file */
SELECT VALUE
FROM INTERFXMLTAGS I1
WHERE LINE > 0
AND TAG = 'pdf'
ASCII UNICODE :PDFBASE64TMP;
UNLINK INTERFXMLTAGS I1;
/* Manipulate file to meet requirements for
converting from base64:
1. Remove new line at end
2. Ensure file ends with Line Feed*/
SELECT '#' FROM DUMMY ASCII UNICODE ADDTO :PDFBASE64TMP;
EXECUTE FILTER '-delnl' ,:PDFBASE64TMP, :FILTERTMP;
EXECUTE FILTER '-filter', '#', '#', '010', :FILTERTMP,
:PDFBASE64TMP;
/* Convert from base64 */
EXECUTE FILTER '-unbase64', :PDFBASE64TMP, :PDFFILETMP,
SQL.TMPFILE;

LABEL 500;
UNLINK INTERFXMLTAGS I1;
```