---
title: Finding Form Interfaces
group: Interfaces
tags: 'Priority_SDK'
---

## Introduction

You may find it useful to peruse (and possibly use) various components of the standard interfaces provided with ***Priority***. The following helps you to locate these interfaces.

## Interfaces for a Specific Form 

One helpful tool is the *Form Interfaces* (**FORMINTERFACES**) form,
which is a sub-level of the *Form Generator*. This form displays any
interfaces in which the form participates. This is not only useful when looking for interfaces, but also important information when you want to revise the form in a way that impacts the interface (e.g., add a mandatory column).

## Interfaces for a Specific Form Column 

You can also view a list of all interfaces built for a given form column in the *Interfaces for Column* (**FCLMNINTER**) form, which is a sub-level of the *Form Columns* form (itself a sub-level of the *Form Generator*). This is not only useful when looking for interfaces, but also important information when you want to revise the form column in a way that impacts the interface (e.g., change its width).

## Existing INTERFACE and DBLOAD Programs 

There are a number of ways to find available form loads and table loads, both standard and customized:

-   Run the *Procedure Steps* (**PROGREP**) report (*System Management → Generators → Procedures → Procedure Reports*). In the input screen, designate steps of type I (for form loads) or type L (for table loads).
-   Form load only: Run the same report for procedures that have the
    **INTERFACE** program as a step.
-   Run the *SQL Development* (**WINDBI**) program (*System Management → Generators → Procedures*) to find the query that runs the form load or table load. From the **Queries** menu, select **Find String** and then record \'EXECUTE INTERFACE\' or \'EXECUTE DBLOAD\' in the input screen.

## Interfaces in General 

There are a number of interface menus (e.g., for inventory counts, for sales invoices) that include a table load procedure, an interim table form and a form load procedure. You may find that the interim table form and form load procedure already meet your needs (e.g., if you want to load an inventory count file of data collected from a peripheral device), so that you only have to create a **DBLOAD** program. To find such interface components, retrieve by LOAD\* in the various generators (for forms, procedures and/or menus).

## Further Reading 

-   [Form Loads](Form-Loads )
-   [Table Loads](Table-Loads )
-   [Combining Table Loads with Form
    Loads](Combining-Table-Loads-with-Form-Loads )
-   [Interfaces](Interfaces )
