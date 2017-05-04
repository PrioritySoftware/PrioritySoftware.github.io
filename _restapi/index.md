---
title: REST API
subjects:
      - name: Introduction
        methods:
           - Service Root URL
           - Authentication
      - name: Requesting Data
        methods:
           - Requesting the Service Root
           - Requesting the Service Metadata
           - Requesting Entity Collections
           - Requesting an Individual Entity by ID
           - Navigating to Related Entities
           - Requesting Full Metadata
      - name: Querying Data
        methods:
           - Filtering a Collection
           - Filtering a Collection with Logic Operators
           - Sorting a Collection
           - Limiting the Number of Entities        
      - name: Modifying Data
        methods:
           - Creating an Entity
           - Creating an Entity Including Deep Inserts
           - Updating an Entity
           - Deleting an Entity
           - Error Handling
layout: restapi
permalink: /restapi/
---

<a name="Introduction"></a>

# Priority OData API Usage Examples

## Introduction

The Priority OData API is based on the Open Data Protocol (OData), a data access protocol built on HTTP and REST. This documentation provides basic examples of the various requests and responses you can make using the Priority OData API. For a more detailed understanding of OData, please refer to ['OData Documentation'](http://www.odata.org/documentation/odata-version-4-0/).

<a name="Service Root URL"></a>
### Service Root URL

All the examples below are based on sample requests made to a Priority OData service. Please replace the <code>serviceRoot</code> below with a service root URL appropriate to your installation of **Priority**. Note that all other URLs in the OData service use this URL as a basis.
Consult with your System Administrator if you are not sure what the service root for your installation is.

<a name="Authentication"></a>
### Authentication

The Priority OData service requires that every HTTP request contain an authentication header according to the Basic-Authentication standard, in order to apply any relevant permission restrictions. HTTP requests that lack such a header will be denied.
Consult with your System Administrator if you do not have a valid user or password.

<a name="Requesting Data"></a>
## Requesting Data

OData services support requests for data via HTTP <code>GET</code> requests.

<a name="Requesting the Service Root"></a>
### Requesting the Service Root

The request below returns a basic list of the resources available through the service. The response includes two types of links:

  1 The $metadata document that describes the schema of the service.
  2 Links to various collections of objects such as CUSTOMERS and ORDERS.

<code>GET serviceRoot/ </code>

Response Payload

```json
{
  "@odata.context": "serviceRoot/$metadata",
  "value": [
    {
      "name": "ABILITIES",
      "kind": "EntitySet",
      "url": "ABILITIES"
    },
  ...
    {
      "name": "CUSTOMERS",
      "kind": "EntitySet",
      "url": "CUSTOMERS"
    },
  ...
  {
      "name": "ORDERS",
      "kind": "EntitySet",
      "url": "ORDERS"
    },
  ...
  ]
}
```

<a name="Requesting the Service Metadata"></a>

### Requesting the Service Metadata

The request below returns the $metadata document for the service. This document contains a machine-readable description of the service model, including entities, type schemas, and properties.

**Note:**  Just as a database schema implies nothing of the business significance of the entities that it represents, the business significance of the entities and properties is not documented here. 

<code>GET serviceRoot/$metadata</code>

Response Payload

```xml
<?xml version="1.0" encoding="utf-8"?>
<edmx:Edmx Version="4.0" xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx">
    <edmx:DataServices>
        <Schema Namespace="Priority.OData" xmlns="http://docs.oasis-open.org/odata/ns/edm">
            <EntityType Name="ABILITIES">
                <Key>
                    <PropertyRef Name="ABILITYCODE" />
                </Key>
                <Property Name="ABILITYCODE" Type="Edm.String" MaxLength="3" />
                <Property Name="ABILITYDES" Type="Edm.String" MaxLength="32" />
                <Property Name="ABILITY" Type="Edm.Int64" />
                <NavigationProperty Name="ABILITYVALUES_SUBFORM" Type="Collection(Priority.OData.ABILITYVALUES)" ContainsTarget="true" />
            </EntityType>
      ...
      <EntityContainer Name="DefaultContainer">
                <EntitySet Name="ABILITIES" EntityType="Priority.OData.ABILITIES" />
                <EntitySet Name="ABILITYVALUECODES" EntityType="Priority.OData.ABILITYVALUECODES" />
                <EntitySet Name="ABSENTCHART" EntityType="Priority.OData.ABSENTCHART" />
                <EntitySet Name="ABSENTCODES" EntityType="Priority.OData.ABSENTCODES" />
        ...
        <EntitySet Name="pDOCSTATS" EntityType="Priority.OData.pDOCSTATS" />
            </EntityContainer>
        </Schema>
    </edmx:DataServices>
</edmx:Edmx>
```

<a name="Requesting Entity Collections"></a>
### Requesting Entity Collections

The request below returns the entity sets in the **Part Families** form, FAMILY_LOG.

<code>GET serviceRoot/FAMILY_LOG</code>

Response Payload

```json
{
    "@odata.context": "serviceRoot/$metadata#FAMILY_LOG",
    "value": [
        {
            "FAMILYNAME": "0",
            "FAMILYDESC": "Default part family",
             ...
            "FAMILY": -1
        },
...
        {
            "FAMILYNAME": "001",
            "FAMILYDESC": "Sound Systems",
    ...
        }
        }
    ]
}
```

<a name="Requesting an Individual Entity by ID"></a>

### Requesting an Individual Entity by ID

To get a particular entity from a collection, append a key segment. Key segments in OData services are bound by parentheses because they may be composite keys, e.g., OrderLine(OrderID=1,LineNumber=1).

The request below returns an individual entity from the **LOGPART** form by the given PARTNAME "111-012".

<code>GET serviceRoot/LOGPART('111-012')</code>

Response Payload

```json
{
  "@odata.context": "serviceRoot/$metadata#LOGPART/$entity",
  "PARTNAME": "111-012",
  "BARCODE": "111-012",
  "PARTDES": "Panasonic Black Blu-ray Disc Theater SCBT100",
  ...
  "EXTPART": 29
}
```


<a name="Navigating to Related Entities"></a>

###Navigating to Related Entities

To access related entities, keep appending segments that represent valid property names as defined in $metadata or in a full metadata response. For example, the request below starts at the service root and navigates to the entity set FAMILY_LOG, then to the resource keyed '001', and finally to the FAMILY_LOGPART_SUBFORM property. Note that the @odata.context URL self-describes the payload.

<code>GET serviceRoot/FAMILY_LOG('001')/FAMILY_LOGPART_SUBFORM</code>

Response Payload

```json
{
  "@odata.context": "serviceRoot/$metadata#FAMILY_LOG('001')/FAMILY_LOGPART_SUBFORM",
  "value": [
    {
      "PARTNAME": "111-001",
      "TYPE": "P",
      "PARTDES": "Sony HT7100DH Home Theater",
      "STATDES": "In Use",
      "PART": 18
    },
    {
      "PARTNAME": "111-002",
      "TYPE": "P",
      "PARTDES": "Sony HT-DDW790 Home-theater",
      "STATDES": "In Use",
      "PART": 19
    },
    {
      "PARTNAME": "111-003",
      "TYPE": "P",
      "PARTDES": "Samsung HT-AS720 Home Theater",
      "STATDES": "In Use",
      "PART": 20
    }
  ]
}
```


<a name="Requesting Full Metadata"></a>

###Requesting Full Metadata

By default, the OData service returns an extremely compact JSON format, by stripping out all the metadata that should be calculable by "smart" OData clients. For generic hypermedia clients, you can request additional metadata by using the Accept header, or <code>$format</code> system query option to request <code>application/json;odata.metadata=full</code>. The request below yields additional annotations in the payload, indicating type information and relationships to other resources.

<code>GET serviceRoot/FAMILY_LOG?$format=application/json;odata.metadata=full</code>

Response Payload

```json
  {
  "@odata.context": "serviceRoot/$metadata#FAMILY_LOG",
  "value": [
    {
      "@odata.type": "#Priority.OData.FAMILY_LOG",
      "@odata.id": "serviceRoot/FAMILY_LOG('0')",
      "@odata.editLink": "FAMILY_LOG('0')",
      "FAMILYNAME": "0",
      "FAMILYDESC": "Default part family",
      ...
      "FAMILY@odata.type": "#Int64",
      "FAMILY": -1,
      "FAMILY_LOGPART_SUBFORM@odata.associationLink": "serviceRoot/FAMILY_LOG('0')/FAMILY_LOGPART_SUBFORM/$ref",
      "FAMILY_LOGPART_SUBFORM@odata.navigationLink": "serviceRoot/FAMILY_LOG('0')/FAMILY_LOGPART_SUBFORM",
      "FAMILYMALF_SUBFORM@odata.associationLink": "serviceRoot/FAMILY_LOG('0')/FAMILYMALF_SUBFORM/$ref",
      "FAMILYMALF_SUBFORM@odata.navigationLink": "serviceRoot/FAMILY_LOG('0')/FAMILYMALF_SUBFORM",
      "FAMILYSERVTYPES_SUBFORM@odata.associationLink": "serviceRoot/FAMILY_LOG('0')/FAMILYSERVTYPES_SUBFORM/$ref",
      "FAMILYSERVTYPES_SUBFORM@odata.navigationLink": "serviceRoot/FAMILY_LOG('0')/FAMILYSERVTYPES_SUBFORM",
      "FAMILYREQLABANALYSES_SUBFORM@odata.associationLink": "serviceRoot/FAMILY_LOG('0')/FAMILYREQLABANALYSES_SUBFORM/$ref",
      "FAMILYREQLABANALYSES_SUBFORM@odata.navigationLink": "serviceRoot/FAMILY_LOG('0')/FAMILYREQLABANALYSES_SUBFORM"
    },
```



<a name="Querying Data"></a>
##Querying Data

OData supports various kinds of query options for querying data. This section will help you go through the common scenarios for these query options.

<a name="Filtering a Collection"></a>
###Filtering a Collection

Use the <code>$filter</code> system query option to filter a collection of resources. The expression specified with <code>$filter</code> is evaluated for each resource in the collection, and only items where the expression evaluates to be true are included in the response.  Note that the response to a filtered collection is a collection of the same type, regardless of the number of matched resources.

For a detailed list of the available logical operators, see the [`OData V4 URL Conventions Document`](http://docs.oasis-open.org/odata/odata/v4.0/odata-v4.0-part2-url-conventions.html).

```
GET serviceRoot/LOGPART?$filter=FAMILYNAME eq '001'
```

Response Payload

```JSON
{
  "@odata.context": "serviceRoot/$metadata#LOGPART",
  "value": [
    {
      "PARTNAME": "111-001",
      "BARCODE": "111-001",
      "PARTDES": "Sony HT7100DH Home Theater",
      "EPARTDES": null,
      "STATDES": "In Use",
    ...
      "EXTPART": 18
    },
    {
      "PARTNAME": "111-002",
      "BARCODE": "111-002",
      "PARTDES": "Sony HT-DDW790 Home-theater",
      ...
    }
  ]
}
```


<a name="Filtering a Collection with Logic Operators"></a>
###Filtering a Collection with Logic Operators

You can use <code>and</code>, <code>or</code>, and <code>not</code> to create more complex filter clauses.
```
GET serviceRoot/LOGPART?$filter=TYPE eq 'P' and LASTPRICE gt 200
```

Response Payload
```
{
  "@odata.context": "serviceRoot/$metadata#LOGPART",
  "value": [
    {
      "PARTNAME": "111-012",
      "BARCODE": "111-012",
      "PARTDES": "Panasonic Black Blu-ray Disc Theater SCBT100",
      ...
      "TYPE": "P",
      ...
      "LASTPRICE": 233.48,
      ...
      "EXTPART": 29
    }
  ]
}
```

<a name="Sorting a Collection"></a>
###Sorting a Collection

Use the <code>$orderby</code> system query option to specify ordering criteria. Qualify the sort direction by using the <code>asc</code> or <code>desc</code> keywords.

```
GET serviceRoot/FAMILY_LOG?$orderby=FAMILYDESC desc
```

Response Payload
```JSON
{
  "@odata.context": "serviceRoot/$metadata#FAMILY_LOG",
  "value": [
    {
      "FAMILYNAME": "0",
      "FAMILYDESC": "Default part family",
    ...
    },
    {
      "FAMILYNAME": "007",
      "FAMILYDESC": "Office Equipments",
     ...
    },
    {
      "FAMILYNAME": "006",
      "FAMILYDESC": "Work Hours",
      ......
    }
  ]
}
```

<a name="Limiting the Number of Entities"></a>
###Limiting the Number of Entities

Use <code>$top</code> to limit the number of requested entities from a collection. 

```
GET serviceRoot/FAMILY_LOG?$top=2
```

Response Payload
```JSON
{
  "@odata.context": "serviceRoot/$metadata#FAMILY_LOG",
  "value": [
    {
      "FAMILYNAME": "0",
      "FAMILYDESC": "Default part family",
      ...
      "FAMILY": -1
    },
    {
      "FAMILYNAME": "001",
      "FAMILYDESC": "Sound Systems",
      ...
      "FAMILY": 5
    }
  ]
}
```

<a name="Modifying Data"></a>
##Modifying Data

The OData service supports Create, Update and Delete operations for some or all exposed entities. Please note that data modification via the API is only available in **Priority** version 17.2 and above.

<a name="Creating an Entity"></a>
###Creating an Entity

To create an entity in a collection, the client sends a POST request to that collection's URL. The POST body MUST contain a single valid entity's information. The request below creates a new part family in the **Part Families** form.
```HTML
POST serviceRoot/FAMILY_LOG 
OData-Version: 4.0
Content-Type: application/json;odata.metadata=minimal
Accept: application/json

{
    "FAMILYNAME": "765",
    "FAMILYDESC": "My OData Family"
}
```

Response Payload
```JSON
{
  "@odata.context": "serviceRoot/$metadata#FAMILY_LOG/$entity",
  "FAMILYNAME": "765",
  "FAMILYDESC": "My OData Family",
  "EFAMILYDES": null,
  "TECHFLAG": null,
  "DEBITFLAG": null,
  "PROJPROCESS": null,
  ...
  "FAMILY": 26
}
```

<a name="Creating an Entity Including Deep Inserts"></a>
### Creating an Entity Including Deep Inserts

To create an entity that includes related entities (for example, an ORDER with the relevant ORDERITEMS), specify the values for the related resources as part of the request.

```HTML
POST serviceRoot/ORDERS 
OData-Version: 4.0
Content-Type: application/json;odata.metadata=minimal
Accept: application/json
{
    "CUSTNAME": "007",
    "ORDERITEMS_SUBFORM": [
        {
            "PARTNAME": "111-001",
            "DUEDATE": "2016-08-01T00:00:00+03:00"
        },
        {
            "PARTNAME": "111-002",
            "DUEDATE": "2016-08-01T00:00:00+03:00"
        }
     ]
}
```

Response Payload
```JSON
{
  "@odata.context": "serviceRoot/$metadata#ORDERS/$entity",
  "CUSTNAME": "007",
  "CDES": "יוסי",
  "NAME": null,
  "POSITIONDES": null,
  "CURDATE": "2016-08-07T00:00:00+03:00",
  "ORDNAME": "SO16000007",
  "BOOKNUM": null,
  "DOCNO": null,
  "PROJDES": null,
  "ORDSTATUSDES": "טיוטא",
  "BOOLCLOSED": null,
  ...
  "PIKORDER": 0,
  "FOLLOWUPIV": 88
}
```


<a name="Updating an Entity"></a>
###Updating an Entity

To update an existing entity, send a PATCH request with the values you wish to modify. You can also use PUT, but the semantics for PUT require all properties to be either sent on the wire or reverted to their default values.

```HTML
PATCH serviceRoot/FAMILY_LOG('765')
OData-Version: 4.0
Content-Type: application/json;odata.metadata=minimal
Accept: application/json

{
    "FAMILYDESC": "My Updated Family"
}
```

Response Payload

```JSON
{
  "@odata.context": "serviceRoot/$metadata#FAMILY_LOG/$entity",
  "FAMILYNAME": "765",
  "FAMILYDESC": "My Updated Family",
  "EFAMILYDES": null,
  "TECHFLAG": null,
  "DEBITFLAG": null,
  "PROJPROCESS": null,
  ...
  "FAMILY": 26
}
```

<a name="Deleting an Entity"></a>
###Deleting an Entity

To remove a resource, send an HTTP Delete to the resource URL.

```
DELETE serviceRoot/FAMILY_LOG('765')
```

<a name="Error Handling"></a>
###Error Handling

Since the API is essentially a wrapper around the **Priority** screens, any errors generated by the screens are included in the response. The example below demonstrates an attempt to create a new FAMILY_LOG entity with an invalid value for the DEBITFLAG field.

```HTML
POST serviceRoot/FAMILY_LOG 
OData-Version: 4.0
Content-Type: application/json;odata.metadata=minimal
Accept: application/json

{
    "FAMILYNAME": "765",
    "FAMILYDESC": "My OData Family"
    "DEBITFLAG": "Q"
}
```

Response Payload

```XML
<FORM
  TYPE="FAMILY_LOG">
    <FAMILY_LOG>
        <FAMILYNAME>790</FAMILYNAME>
        <FAMILYDESC>My invalid OData Family</FAMILYDESC>
        <DEBITFLAG>Q</DEBITFLAG>
        <FAMILY>0</FAMILY>
    </FAMILY_LOG>
    <InterfaceErrors>
        <text>Specify 'N' or 'Y' as the default value that will be filled in the Billable column of the "Reports of Project Hrs/Expenses" form. /n Leave the column blank if you do not want to have a default.</text>
    </InterfaceErrors>
</FORM>
```
