# Parsing XML {#parsing_xml}

In addition to reading data from an XML/JSON file via [a form
load](Interfaces "wikilink"), you can also use the XMLPARSE command.
When the file contains several instances per tab, include the *--all*
parameter to parse the entire file. Omit it to limit results to the
first instance of each tab.

> **Example:** \<syntaxhighlight lang=\"tsql\" enclose=\"pre> SELECT
> SQL.TMPFILE INTO :OUTXMLTAB1 FROM DUMMY; SELECT SQL.TMPFILE INTO
> :OUTXMLTAB2 FROM DUMMY; SELECT SQL.TMPFILE INTO :MSG FROM DUMMY; LINK
> INTERFXMLTAGS I1 TO :OUTXMLTAB1; GOTO 500 WHERE :RETVAL \<= 0; LINK
> INTERFXMLTAGS I2 TO :OUTXMLTAB2; GOTO 500 WHERE :RETVAL \<= 0;
>
> :   FILE = \'../../system/load/example.xml\';
>
> EXECUTE XMLPARSE :FILE, :OUTXMLTAB1, 0, :MSG; EXECUTE XMLPARSE :FILE,
> :OUTXMLTAB2, 0, :MSG, \'-all\'; SELECT LINE, TAG, VALUE, ATTR FROM
> INTERFXMLTAGS I1 WHERE LINE \> 0 FORMAT; SELECT LINE, TAG, VALUE, ATTR
> FROM INTERFXMLTAGS I2 WHERE LINE \> 0 FORMAT; LINK INTERFXMLTAGS I1;
> LINK INTERFXMLTAGS I2; LABEL 500;
>
> ```{=html}
> </syntaxhighlight>
> ```

When the XML file looks like this:\
![](XML_file-173.png "XML_file-173.png")\
results for the above two EXECUTE commands (without the *--all*
parameter and with it) are as follows:\
![](XMLPARSE_results-173.png "XMLPARSE_results-173.png")

# Parsing JSON {#parsing_json}

Parsing a JSON file is identical, with a small addition to the end of
the EXECUTE commands.

> **Example:** \<syntaxhighlight lang=\"tsql\" enclose=\"pre> SELECT
> SQL.TMPFILE INTO :OUTXMLTAB1 FROM DUMMY; SELECT SQL.TMPFILE INTO
> :OUTXMLTAB2 FROM DUMMY; SELECT SQL.TMPFILE INTO :MSG FROM DUMMY; LINK
> INTERFXMLTAGS I1 TO :OUTXMLTAB1; GOTO 500 WHERE :RETVAL \<= 0; LINK
> INTERFXMLTAGS I2 TO :OUTXMLTAB2; GOTO 500 WHERE :RETVAL \<= 0;
>
> :   FILE = \'../../system/load/example.xml\';
>
> EXECUTE XMLPARSE :FILE, :OUTJSONTAB1, 0, :MSG, \", \'Y\'; EXECUTE
> XMLPARSE :FILE, :OUTJSONTAB2, 0, :MSG, \'-all\', \'Y\' SELECT LINE,
> TAG, VALUE, ATTR FROM INTERFXMLTAGS I1 WHERE LINE \> 0 FORMAT; SELECT
> LINE, TAG, VALUE, ATTR FROM INTERFXMLTAGS I2 WHERE LINE \> 0 FORMAT;
> LINK INTERFXMLTAGS I1; LINK INTERFXMLTAGS I2; LABEL 500;
>
> ```{=html}
> </syntaxhighlight>
> ```

![](JsonParse.png "JsonParse.png")
