**\'\'Priority***offers two special interface tools. The [form
load](Form_Loads "wikilink") utility (**INTERFACE** program) serves both
to import data directly into a ***Priority**\'\' form (from an external
text or XML/JSON file or an internal load table) and to export form data
to a file or table. In contrast, the [table
load](Table_Loads "wikilink") utility (**DBLOAD**program) imports data
into an interim table from a tab-delimited text file (Excel files can be
converted into tab-delimited files using [a utility
program](Table_Loads#Converting_an_Excel_File_to_a_Tab-delimited_Text_File_for_DBLOAD "wikilink")).
SQL statements (a load query) can be recorded for the load and will be
executed as it is performed. The table data can then be displayed in a
form, in which further manipulations can be made (e.g., by Direct
Activation of a procedure), before it is loaded from the interim table
into the appropriate***Priority*** form using the **INTERFACE** program.
In fact, these two tools are often used together: the table load to add
data to an interim table, and then the form load to load the data into a
regular form.

You ***cannot*** change an existing form load or table load. You can,
however, make use of existing load tables, interim tables and load
procedures. Sometimes it is enough to create your own table load and use
existing entities for the rest.

**Important!** The records stored in ***Priority***tables are always
inserted into those tables via***Priority***forms.***Never***insert
records directly into***Priority*** tables, as this will bypass the
integrity checks and other actions defined in the form triggers. Even if
you repeat all existing logic of the form in question, your code can
cause bugs in the future. For example, if mandatory columns are added to
the table in some future software version, with default values that are
filled in within the form, this will be ignored by your code!

## Further Reading {#further_reading}

-   [Form Loads](Form_Loads "wikilink")
-   [Table Loads](Table_Loads "wikilink")
-   [Combining Table Loads with Form
    Loads](Combining_Table_Loads_with_Form_Loads "wikilink")
-   [Tips for Finding Existing
    Interfaces](Tips_for_Finding_Existing_Interfaces "wikilink")
