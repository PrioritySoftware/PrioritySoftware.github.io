Starting with version 21.0, you can create dynamic interfaces from
within the code itself, without having to predefine them in the
interface generator. These interfaces use the file structure in XML or
JSON files to determine the load order when loading data into the
system. Likewise, data can exported to one of these file formats, with
the data to be exported specified explicitly within the interface code.
This allows you to import and export data without having to ensure that
an appropriate interface exists in each Priority system.

## Special Load Parameters for Dynamic Interfaces {#special_load_parameters_for_dynamic_interfaces}

> EXECUTE INTERFACE **\'FORMNAME**\', \'msgfile\', **\'-form**\',
> \[\'-L\', \'link_file\'\], \[\'-stackerr\', \'stackerr_file\'\],
> \[\'-w\'\], \[\'-ns\'\], \[\'-nl\'\], \[\'-nv\'\], \[\'-noskip\'\],
> **\[-ignorewrn\]**, \[\'-enforcebpm\'\], \[\'-t\'\], **\[-J\]**,
> \[\'-W\'\], \[-m\] \[\'-o\' \| \'-ou\'\], \[\'-f\', \'output_file\'\],
> \[\'-debug\', \'debug_file\'\], \[\'-repeat\'\], \[\'-l\',
> \'table_name1\', \'link_file1\' \[, ...\'-l\', table_name10\',
> \'link_file10\'\]\],**\[\'-select\', \'FIELDNAME\'\], \[\'-expand\',
> \'SUBLEVELFORM\'\], \[\'-delete\'\]**, \'-v\';

-   \'FORMNAME\' --- The name of the form for which you are running the
    interface.
-   -form\' -- the use of this parameter indicates that this is a
    dynamic interface.
-   \'-ignorewrn\' -- ignore warnings in a dynamic interface (similar to
    \'-w\').
-   \'-J\' -- export data to a JSON file or import data from one. When
    omitted, the dynamic interface will export/import using XML files.
-   \'-select\', \'FIELDNAME\' -- when exporting data, use select to
    specify which fields to export. You can specify as many fields as
    you want, with commas between them, e.g. \'-select\', \'CUSTNAME\',
    \'CUSTDES\', and so forth.
-   \'-expand\', \'SUBLEVELFORM\' -- when exporting data, use --expand
    to select sub-level forms from which you want to export data. After
    an expand, you can use select to specify which fields in the
    sub-level you want to export. You can specify multiple sub-level
    forms, but have to use --expand for each, e.g. \'-expand\',
    \'ORDERITEMS\', \'-expand\', \'ORDERITEMSTEXT\'.
-   \'-delete\' -- When importing data, indicates that this dynamic
    interface can delete records.

## Dynamic Interface Examples {#dynamic_interface_examples}

### Exporting Data {#exporting_data}

``` priority
SELECT SQL.TMPFILE INTO :TMPFILE FROM DUMMY;
LINK ORDERS TO :TMPFILE;
GOTO 1 WHERE :RETVAL <= 0;
INSERT INTO ORDERS
SELECT * FROM ORDERS ORIG WHERE ORDNAME IN ('SO2000001364','SO2000001365');
EXECUTE INTERFACE 'ORDERS', 'c:/temp/msg.txt', '-form', '-select', 'ORDNAME', 'CUSTNAME', '-ou', '-L', :TMPFILE, '-f', 'C:/temp/o2.txt', '-J',
'-expand', 'ORDERITEMS', '-select', 'PRICE', 'PARTNAME', '-expand', 'ORDERITEMSTEXT';
UNLINK ORDERS;
LABEL 1;
```

In this example, we retrieve two specific orders, then export them to a
JSON file (note the use of **--J**). We only export specific fields (as
denoted by --select), and also export data from the ORDERITEMS sub-level
and its sub-level of ORDERITEMSTEXT (as denoted by --expand).

### Importing Data {#importing_data}

To import data using a dynamic interface, the file must be structured in
a format that matches the Priority hierarchy (form \> sub-level \>
sub-sub-level). Take the following XML file, named in1.txt, for example:

``` xml
<?xml version="1.0" encoding="utf-8"?>
<FORM>
<ORDERS>
<CUSTNAME>84841</CUSTNAME>
<ORDERITEMS>
<PARTNAME>000</PARTNAME>
<DUEDATE>07/11/20</DUEDATE>
</ORDERITEMS>
<ORDERITEMS>
<PARTNAME>002</PARTNAME>
<DUEDATE>07/11/20</DUEDATE>
</ORDERITEMS>
</ORDERS>
<ORDERS>
<CUSTNAME>84841</CUSTNAME>
<ORDERITEMS>
<PARTNAME>000</PARTNAME>
<DUEDATE>08/11/20</DUEDATE>
</ORDERITEMS>
<ORDERITEMS>
<PARTNAME>002</PARTNAME>
<DUEDATE>08/11/20</DUEDATE>
</ORDERITEMS>
</ORDERS>
</FORM>
```

To load it using a dynamic interface, we would use the command: EXECUTE
INTERFACE \'ORDERS\', \'c:/temp/msg.txt\', \'-form\', \'-i\', \'-f\',
\'c:/temp/in1.txt\', \'-ignorewrn\', \'-noskip\';

In this case we use the **--ignorewrn** and **--noskip** options to
ensure that data is loaded regardless of warning messages that crop up.
We recommend adding these options if data isn\'t being loaded as
expected. As in standard interfaces, warning and error messages are
stored in the ERRMSGS table (unless you linked them to a STACKERR
table). While developing in WINDBI, you can easily retrieve them by
running the following query:

SELECT \* FROM ERRMSGS WHERE USER = SQL.USER AND TYPE = \'i\' FORMAT;

### Deleting Data {#deleting_data}

When using the **--delete** option, the file needs to specify the keys
of the records to be deleted. The following example is in JSON format:

``` javascript
{
"ORDERS": [
            {                              
            "ORDNAME": "SO0000001",
            "ORDERITEMS": [
                          {
                           "KLINE": 1
                           },
                          {
                            "KLINE": 3
                           }
                          ]
            },
            {
             "ORDNAME": "SO0000002",
             "ORDERITEMS": [
                           {
                           "KLINE": 1
                            },
                           {
                            "KLINE": 2
                            }
                           ]
             },
             ]
}
```
