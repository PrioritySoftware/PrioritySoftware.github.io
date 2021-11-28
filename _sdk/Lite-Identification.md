## Introduction

Often, there is a need to identify the user who runs the procedure -- as
a customer, vendor or internal user -- and to display relevant user data
(e.g., address). User identification is carried out via the company
phone book or the list of users (that is, the data in the **PHONEBOOK,
PHONEBOOKA** and **USERS** tables).

To have the procedure identify the user before it runs:

-   In the *Procedure Generator*, choose the appropriate value in the
    *Internet Access* column. Specify *Y* for all (customers, vendors
    and internal users); *T* for walk-in customers (e.g., for the
    Storefront) and *U* for internal users only (e.g., for internal
    reports, data input by users). Or specify *I* for no privilege
    checks.

The value of the first parameter in the cursor is saved in a variable
called HTMLVALUE. This is a system variable of **CHAR** type, and it
must be converted to an integer using the [ATOI
function](Non-standard_Scalar_Expressions#Strings "wikilink"). Using
HTMLVALUE you can retrieve the relevant record (the one being printed)
from the main table of the document in question.

To identify the user from within the procedure, use the [SQL.WEBID
variable](SQL_Functions_and_Variables#SystemFunctions "wikilink"). When
users log in using their e-mail address, this variable receives the
value of the**\'PHONEBOOK.PHONE** column. In procedures that are defined
for internal users only, users can also log in with their username. In
such a case, the SQL.WEBID variable receives the value of the
**USERS.USER** column, multiplied by -1.

**Tip:** To display report data that is specific to a given
customer/vendor/user, make the appropriate joins in the report to
SQL.WEBID.

> **Example:** To obtain a list of the customer's orders, use the join
>
> ``` tsql
> WHERE PHONEBOOK.PHONE = SQL.WEBID
> AND PHONEBOOK.CUST = ORDERS.CUST 
> ```

## Automated User Identification for Priority Lite Websites {#automated_user_identification_for_priority_lite_websites}

If the procedure can only be run by an internal user (i.e., the value of
the *Internet Access* column is *U*), you can also set up automated
identification for a particular user via the DOS command prompt.

To do so, first copy the setuser.exe application from the
*x\\priority\\bin.95\\* directory to the local C drive on the
workstation from which ***Priority Lite***will be run (where*x*is the
network drive on which***Priority*** is installed).

In a DOS command line, enter the following commands (where
*myWebsite.com* is the URL of your ***Priority Lite***website,*myuser*is
the relevant username on***Priority*** and *mypassword* is that user\'s
password):

``` tsql
set TABULAPORTALURL=http://myWebsite.com
c:\setuser myuser mypwd Y  3
c:\setuser myuser mypwd Y  4 /* for clients running Windows Vista and higher*/
```

Subsequently, when the user in questions runs a ***Priority Lite***
procedure, he or she should include the following parameter:
&\_portal=1.

> **Example:** To run a procedure called **WWWMYPROC**, enter the URL as
> follows:
> <http://myWebsite.com/priority/prihtml.dll?WWWMYPROC&_tabulaini=tabula.ini&_portal=1>

If the PC from which this user works keeps track of Cookies, then this
login information will be applied whenever he or she enters the web
site. Otherwise, the DOS command must be run again each time the user
leaves the browser.

## Client Identification for Priority Lite Websites {#client_identification_for_priority_lite_websites}

In addition to SQL.WEBID, which receives a value only after the user
logs in, another variable of identification --
[SQL.CLIENTID](SQL_Functions_and_Variables#SystemFunctions "wikilink")
-- is created automatically by the system whenever a new user enters the
web site. This variable is of **CHAR** type, with a width of 20.

If the PC from which this user works keeps track of Cookies, then this
user will receive the same ID whenever he or she enters the web site.
Otherwise, the SQL.CLIENTID is saved only until the user leaves the
browser.

## Further Reading {#further_reading}

-   [Designing HTML Reports for Priority
    Lite/Dashboards](Designing_HTML_Reports_for_Priority_Lite/Dashboards "wikilink")
-   [Additional Input Options (Priority
    Lite/Dashboards)](Additional_Input_Options_(Priority_Lite/Dashboards) "wikilink")
-   [Defining a Base Page for HTML Pages (Priority
    Lite/Dashboards)](Defining_a_Base_Page_for_HTML_Pages_(Priority_Lite/Dashboards) "wikilink")
-   [Writing Dashboard
    Procedures](Writing_Dashboard_Procedures "wikilink")
-   [Priority Lite and
    Dashboards](Priority_Lite_and_Dashboards "wikilink")
