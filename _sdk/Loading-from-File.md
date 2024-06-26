---
title: Load Data from a File or Export Data to a File
group: Interfaces
tags: 'Priority_SDK'
---

## Introduction

Form interfaces can be mapped to match 4 different types of files:

- Fixed-width files
- Tab separated values (TSV)
- XML files
- JSON files

Fixed and TSV files can be grouped together, as mapping is based on position in the file. For XML and JSON files, in contrast, mapping is based on tags or fields, respectively. 

For fixed-width and TSV files, you'll need detailed information regarding the structure and order of the fields. For JSON and XML, you'll need a sample file with the necessary tags or fields.

***Priority***\'s interface tools can import data from either ASCII or Unicode (UTF-16) files, and will automatically recognize the format used.

Data exported from ***Priority*** for use in outgoing interfaces will be saved in Unicode (UTF16) format, unless otherwise specified.

{% if site.output == "web" %}

-   [Loading/Exporting Plain Text](Load-Plain-Text)
-   [Loading/Exporting XML/JSON](Load-XML-JSON)

## More on Form Loads 

-   [Loading from/to a Load Table](Loading-from-Load-Table)
-   [Executing the Form Load](Execute-FormLoads)
-   [Deleting Records from a Form](Interfaces-Deleting-Records)
-   [Form Loads](Form-Loads)
{% endif %}