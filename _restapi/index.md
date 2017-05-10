---
title: Introduction
layout: restapi
permalink: /restapi/
collection-title: REST API
collection: resttutorial
---

<a name="Introduction"></a>

# Priority REST API Usage Examples

## Introduction

The Priority REST API is based on the Open Data Protocol (OData), a data access protocol built on HTTP and REST. This documentation provides basic examples of the various requests and responses you can make using the Priority REST API. For a more detailed understanding of OData, please refer to [OData Documentation](http://www.odata.org/documentation/odata-version-4-0/).

<a class="anchor-link" name="Service_Root_URL"></a>
### Service Root URL

All the examples below are based on sample requests made to a Priority OData service. Please replace the <code>serviceRoot</code> below with a service root URL appropriate to your installation of **Priority**. Note that all other URLs in the OData service use this URL as a basis.
Consult with your System Administrator if you are not sure what the service root for your installation is.

<a class="anchor-link" name="Authentication"></a>
### Authentication

The Priority OData service requires that every HTTP request contain an authentication header according to the Basic-Authentication standard, in order to apply any relevant permission restrictions. HTTP requests that lack such a header will be denied.
Consult with your System Administrator if you do not have a valid user or password.

