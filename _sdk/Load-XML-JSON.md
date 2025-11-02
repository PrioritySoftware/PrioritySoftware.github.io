---
title: Import/Export Data with XML/JSON Files
group: Interfaces
tags: 'Priority_SDK'
---

## Parsing a File

### Parsing File Tags/Fields
If you are loading to or from an XML/JSON file, you must define the tags/properties in the system. The easiest way to do so is to import a file with the tags/properties and let the system parse it:

**In the Web Interface**

1. In the *Form Load Designer* form, record a default **File Name** (e.g. *example.xml* or *demo.json*). This filename will be used when exporting the interface.
2. Run the **Import XML/JSON Interfc Template** Action and upload the template file.
3. Run the **Prepare Tags by File Defs**  Action. The structure of the file
is analyzed and transferred to the *Tags for Interface* sub-level form.

**In the Windows Interface**

1. Save the file in the *system\\load\\company* directory, where *company* is the name of the current company (SQL.ENV).
1. In the *Form Load Designer* form, record in **File Name** the location of the file (e.g. *example.xml* or *demo.json*). This filename will also be used when exporting the interface.
3. Run the **Prepare Tags by File Defs** Action. The structure of the file
is analyzed and transferred to the *Tags for Interface* sub-level form.

## XML

### XML Tags Structure

{% include info.html content="<p><b>Additions in Version 23.0</b></p>" %}

Enter the *Tags for Interface* form and check the results. The form should show all tags that are present in the XML file. You can delete tags that are not necessary. You can also add/revise tag names.

XML tag definitions uses a syntax similar to file paths to specify the location of nodes in
an XML document. Each part of the path represents an element or a step
in the document's hierarchy.

`/root/element`

```XML
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <element></element>
</root>
```
When mapping an XML path to a column name in a table, data from that table column will be routed to the XML element.

You can also map data to an XML attribute with the following structure:

`/root/element>attribute`

In this case the data will be output to the XML attribute:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<root>
    <element attribute="[here will be data]"></element>
</root>
```

There are four types of tags:

- '' (blank) - normal tag.
- 'C' - constant value. Value will always be taken from the **Tags for Interface** form, rather than from the database table. For a parsed document, the value may be filled in based on the first appearance of the tag.
- 'E' - a structural tag, it marks the end of a tag group.
- 'R' -  structural tag, it marks the end of a repeating tag group.

So, for example, XML tags with the following settings:

```bash
`mainTag/valueTag`
`mainTag/groupL1/groupL2f/data1`
`mainTag/groupL1/groupL2f/data2`
`mainTag/groupL1/groupL2f` - type E
`mainTag/groupL1/groupL2s/data1`
`mainTag/groupL1/groupL2s/data2`
`mainTag/groupL1/groupL2s` - type E
`mainTag/groupL1` - type R
```

Would output a result as follows (export is from the **Sales Orders** form):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<mainTag>
 <valueTag>SO24000726</valueTag>
 <groupL1>
  <groupL2f>
   <data1>000</data1>
   <data2>2000.00</data2>
  </groupL2f>
  <groupL2s>
   <data1>000</data1>
   <data2>2000.00</data2>
  </groupL2s>
 </groupL1>
 <groupL1>
  <groupL2f>
   <data1>000-12</data1>
   <data2>1000.00</data2>
  </groupL2f>
  <groupL2s>
   <data1>000-12</data1>
   <data2>1000.00</data2>
  </groupL2s>
 </groupL1>
</mainTag>
```

To more clearly illustrate how repeating tags work, lets look at a simplified example:

<code>/Order/OrderItems/OrderItem</code> type **R**

Notice how *OrderItem* repeats in the result.

```xml
<Order>
     <OrderItems>
         <OrderItem>
             <part>001</part>
         </OrderItem>
         <OrderItem>
             <part>002</part>
         </OrderItem>
     </OrderItems>
 </Order>
```

### Mapping Form Data to XML Tags

Go to the *Forms to be Loaded* form and its sub-level *Position of Column in File*. Use the next sub-level, *Tag Definitions*, to link each form column to the appropriate tag/field. 

- If the tag is a date, you can also define the *Date Format*, indicating how the date value will be displayed. You can use any of the available [SQL date formats](ATOD-and-DTOA), such as MMDDYY or MM/DD/YY.

- You can skip tags when there is no data to fill them. Select the *Without Empty Tags* option in **Tag Definitions** sub-level.

- To add a tag, but ensure that it is always empty, you can map a tag to a column, and then set it as a constant (**C**) value that is left empty.

{% include alert.html content = "<p>While you can use data from multiple forms in one tag group, you should do so in an ordered fashion. That is, maintain the export order so that data from one table comes first, then the second, then the third, and so on.</p>" %}

**Note:**  Windows only: Once you have created a form load design that uses an XML file, ***Priority*** automatically enables users to export data from the main form of this load design to an XML file. In this case the *XML File* option in the *Mail* top menu of the relevant form will be enabled. When it is selected, the user gets a choice of interfaces to run. The system indicates where the output file has been saved.


### JSON Files

<span class="version-highlight">25.1</span>

Starting with version 25.1, JSON exports will follow the structure of the parsed file, same as in XML exports.

 The *Tags for Interface* form shows the results of the file parse. The form should show all properties that are present in the JSON file. You can delete properties that are not necessary. You can also add/revise property names.

1. For parsed properties, the data in the first record appears in the *Value* column. If you want this (or any other value) to be used in all records, regardless of definitions in the file, specify *C* in the *Type of Value* column. Revise the values as necessary.

2. A repeating property (indicated as an *R*) will be output as an array []. If your parsed file only contained one instance of the sub-object / properties, you may have to record this manually.

3. While JSON has no attributes, you can use the Attribute column  to override the name of the outputted property. For example, if the parsed property is called *currency*, and you would the output to be *currencyCode*, you could use the Attribute column to rename the output while keeping a record of the originally parsed properties.

3. To map JSON properties to a form, move the *Forms to be Loaded* form and its sub-level *Position of Column in File*. Use the next sub-level, *Tag Definitions*, to link each form column to the appropriate property. If the property is a date, you can also define the *Date Format*, indicating how the date value will be displayed. You can use any of the available [SQL date formats](ATOD-and-DTOA), such as MMDDYY or MM/DD/YY.

**Note:** Decimal data in JSON files loaded into the system must always use a decimal point as the decimal separator, even if the decimal separator configured for the ***Priority*** system locale is a different symbol.

#### Exports in Versions Prior to 25.1

In versions prior to 25.1, JSON exports do not support renaming and nesting, and will just follow the structure of the form. So, for example, an export of ORDERS will look like this:

```json
{  "ORDERS": [
    { "ORDNAME": "SO2400021",
      "CUSTNAME": "John Doe"
      },
      { "ORDNAME": "SO2400022",
      "CUSTNAME": "Jane Doe"
      }
]}
```

{% if site.output == "web" %}

-   [File Import/Export](Loading-from-File)
-   [Loading/Exporting Plain Text](Load-Plain-Text)

## More on Form Loads 

-   [Loading from/to a Load Table](Loading-from-Load-Table)
-   [Executing the Form Load](Execute-FormLoads)
-   [Deleting Records from a Form](Interfaces-Deleting-Records)
-   [Form Loads](Form-Loads)
{% endif %}