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
layout: restapi
permalink: /restapi/
---

<a name="Introduction"></a>

## Introduction

The Priority REST API is based on the Open Data Protocol (OData), a data access protocol built on HTTP and REST. This documentation provides basic examples of the various requests and responses you can make using the Priority REST API. For a more detailed understanding of OData, please refer to [OData Documentation](http://www.odata.org/documentation/).

<a class="anchor-link" name="Service Root URL"></a>
### Service Root URL

All the examples below are based on sample requests made to a Priority OData service. Please replace the <code>serviceRoot</code> below with a service root URL appropriate to your installation of **Priority**. Note that all other URLs in the OData service use this URL as a basis.
Consult with your System Administrator if you are not sure what the service root for your installation is.

<a class="anchor-link" name="Authentication"></a>
### Authentication

The Priority OData service requires that every HTTP request contain an authentication header according to the Basic-Authentication standard, in order to apply any relevant permission restrictions. HTTP requests that lack such a header will be denied.
Consult with your System Administrator if you do not have a valid user or password.

<a name="Requesting Data"></a>
## Requesting Data

OData services support requests for data via HTTP <code>GET</code> requests.

<a class="anchor-link" name="Requesting the Service Root"></a>
### Requesting the Service Root

The request below returns a basic list of the resources available through the service. The response includes two types of links:

1.  The $metadata document that describes the schema of the service.
2.  Links to various collections of objects such as CUSTOMERS and ORDERS.

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

<a class="anchor-link" name="Requesting the Service Metadata"></a>

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

<a class="anchor-link" name="Requesting Entity Collections"></a>
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

<a class="anchor-link" name="Requesting an Individual Entity by ID"></a>

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


<a class="anchor-link" name="Navigating to Related Entities"></a>
=======

### Navigating to Related Entities

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


<a class="anchor-link" name="Requesting Full Metadata"></a>
=======

### Requesting Full Metadata

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
    ......
```




