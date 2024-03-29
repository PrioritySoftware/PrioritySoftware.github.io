---
title: Deleting Records via an Interface
group: Interfaces
tags: 'Priority_SDK'
---

The [form load](Form-Loads ) can also be used to delete
records from a form. In fact, the very same interface definition can be
used both to insert/update form records and to delete them, the sole
difference being the definition of the record type in the load table or
file.

**Note:** If you use the form load to delete records, make sure that you
don't flag the *Replace Form Data* column in the *Forms to be Loaded*
form, as this will cause the form load to fail.


To delete records from a form, record @ before the number value assigned
to the record type.

> **Example:** See the POST-FORM2 trigger in the **ORDERITEMS** form,
> which deletes irrelevant lines from the form.

{% if site.output == "web" %}
## More on Form Loads 

-   [Loading from/to a Load
    Table](Loading-from-Load-Table )
-   [Loading from/to a File](Loading-from-File )
-   [Executing the Form Load](Execute-FormLoads )
-   [Form Loads](Form-Loads )
{% endif %}