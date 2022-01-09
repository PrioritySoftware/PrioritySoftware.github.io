---
title: Dashboard Procedures
layout: sdk_nav
---

## Introduction

The [procedures](Procedures ) used to display
***Priority*** Dashboards in ***Priority*** and on Outlook (***Priority on
Outlook***) are very similar to other HTML procedures. Dashboard
procedures, however, are assigned a different value in the
*Rep/Wizard/Dashboard* column of the *Procedure Generator*:

There are three types of Dashboard procedures:

-   \"Basic Dashboards\" display live data in a single window without
    any internal procedures (e.g., **WWWCUSTINFO**). This type of
    procedure is almost identical to a regular ***Priority Lite***
    procedure. However, in the *Rep/Wizard/Dashboard* column of the
    *Procedure Generator*, make sure to assign the value *D*, indicating
    that this is a Dashboard procedure.
-   \"Multi-part Dashboards\" consist of a number of smaller Internet
    procedures, or web parts, arranged within a main window (e.g.,
    **WWWDB_SERVICEMNGR**). When creating internal procedures for this
    type of Dashboard, assign them the value *d* in the
    *Rep/Wizard/Dashboard* column of the *Procedure Generator*.
-   Like basic dashboards, \"Portlets\" display live data in a single
    window without any internal procedures, but on the home page (in the
    web interface). In the *Rep/Wizard/Dashboard* column of the
    *Procedure Generator*, assign them the value *p*.

## Creating a New Multi-Part Dashboard 

1.  Create a copy of an existing procedure (e.g.,
    **WWWDB_SERVICEMNGR**).
2.  Revise any HTML pages (stored in the *system\\html* directory) in
    your new procedure as follows:\
    Locate the line:\
    <code>onload= <javascript:DashboardLoad(WWWDB_SERVICEMNGR)></code>
    and replace the procedure name (**WWWDB_SERVICEMNGR**) with the name
    of the new procedure (e.g., **PRIV_NEWDASHBOARD**).
3.  Customize the new procedure (**PRIV_NEWDASHBOARD**) as desired, and
    attach the desired internal procedures (i.e., procedures with the
    *Rep/Wizard/Dashboard* value *d*).\
    **Note:** See [Rules for Customizing](Rules-for-Customizing#Procedures ).

## Adding a Dashboard Procedure to Outlook 

Once you have finished preparing the new Dashboard procedure, you can
add it to Outlook from the **Mail** menu in ***Priority*** (**Mail →
Mail Options → Outlook → Priority on Outlook**). ***Priority***
Dashboards appear in Outlook under the heading **Priority Dashboards**
 (in the Shortcuts pane).

## CRM Dashboards 

A CRM Dashboard is a special type of basic Dashboard procedure, which
displays a report of live CRM data. This type of Dashboard procedure is
created in much the same way as a basic Dashboard procedure, and should
be assigned the value *CRM* in the *Application* column of the
*Procedure Generator*. CRM Dashboards that are added to Outlook appear
under the heading **Priority CRM**.

## Further Reading 

-   [User Identification for Priority
    Lite/Dashboards](User-Identification-for-Priority-Lite/Dashboards )
-   [Designing HTML Reports for Priority
    Lite/Dashboards](Designing-HTML-Reports-for-Priority-Lite/Dashboards )
-   [Additional Input Options (Priority
    Lite/Dashboards)](Additional-Input-Options-(Priority-Lite/Dashboards) )
-   [Defining a Base Page for HTML Pages (Priority
    Lite/Dashboards)](Defining-a-Base-Page-for-HTML-Pages-(Priority-Lite/Dashboards) )
-   [Priority Lite and
    Dashboards](Priority-Lite-and-Dashboards )
