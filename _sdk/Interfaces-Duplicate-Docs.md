---
title: Duplicating Documents with an Interface
group: Interfaces
tags: 'Priority_SDK'
---

Suppose you want to copy an entire sales order in order to create the
same one for another customer. You can use the [form interface](Form-Loads) to do this. In the following example,
a new sales order is opened for a customer that is received as input,
copying the order items, unit price, discount, ordered quantity, order
item remarks and order remarks.

Begin by defining the following in the *Form Load Designer* and its
sub-level forms (*System Management → Database Interface → Form Load
(EDI)*):

| Form Name      	| Title                  	| Code (Record Type) 	|
|----------------	|------------------------	|--------------------	|
| ORDERS         	| Sales Orders           	| 1                  	|
| ORDERSTEXT     	| Sales Orders - Remarks 	| 2                  	|
| ORDERITEMS     	| Order Items            	| 3                  	|
| ORDERITEMSTEXT 	| Order Items - Remarks  	| 4                  	|

\
For the **ORDERS** form:

| Load Table Column 	| Form Column Name 	| Order 	|
|-------------------	|------------------	|-------	|
| TEXT1             	| CUSTNAME         	| 1     	|
| TEXT2             	| DETAILS          	| 2     	|

\
For the **ORDERSTEXT** form:

| Load Table Column 	| Form Column Name 	| Order 	|
|-------------------	|------------------	|-------	|
| TEXT            	| TEXT         	| 1     	|

\
For the **ORDERITEMS** form:

| Load Table Column 	| Form Column Name 	| Order 	|
|-------------------	|------------------	|-------	|
| TEXT1             	| PARTNAME         	| 1     	|
| REAL1             	| PRICE            	| 2     	|
| REAL2             	| PERCENT          	| 3     	|
| INT1              	| TQUANT           	| 4     	|

\
For the **ORDERITEMSTEXT** form:

| Load Table Column 	| Form Column Name 	| Order 	|
|-------------------	|------------------	|-------	|
| TEXT            	| TEXT         	| 1     	|

\
Next, create a new procedure with 2 input parameters. The first will be
the customer for which you want to open the new order; the second will
be the order you want to copy. The procedure will have 2 steps:

-   An INPUT step with 2 input parameters:

| Parameter Name 	| Pos 	| Width 	| Input (I/M) 	| Type 	| Column Name 	| Table Name 	|
|----------------	|-----	|-------	|-------------	|------	|-------------	|------------	|
| CST            	| 0   	| 0     	| I           	| LINE 	| CUSTNAME    	| CUSTOMERS  	|
| ORD            	| 5   	| 0     	| I           	| LINE 	| ORDNAME     	| ORDERS     	|

\
\* An SQLI step. Define a parameter called GEN (**FILE** type). The step
query should look like this:

> ```sql
> LINK CUSTOMERS TO :$.CST;
> ERRMSG 1 WHERE :RETVAL <= 0;
>
> :CUSTNAME = '';
> SELECT CUSTNAME INTO :CUSTNAME 
> FROM CUSTOMERS 
> WHERE CUST <> 0;
>
> UNLINK CUSTOMERS;
> ERRMSG 2 WHERE :CUSTNAME = '';
>
> /* The following commands run the interface defined above,
> storing the output in a linked 
> file of the GENERALLOAD table, :$.GEN */
> EXECUTE INTERFACE 'TEST_OPENSALESORD', SQL.TMPFILE, 
> '-o', '-L', :$.ORD, '-l', 'GENERALLOAD', :$.GEN;
>
> LINK GENERALLOAD TO :$.GEN;
> ERRMSG 1 WHERE :RETVAL <= 0;
>
> UPDATE GENERALLOAD 
> SET TEXT1 = :CUSTNAME 
> WHERE LINE = 1;
>
> UNLINK GENERALLOAD;
>
> EXECUTE INTERFACE 'TEST_OPENSALESORD',:$.MSG,'-L',:$.GEN;
>
> LINK GENERALLOAD TO :$.GEN;
> ERRMSG 1 WHERE :RETVAL <= 0;
>
> :ORD = 0;
> SELECT ATOI(KEY1) INTO :ORD 
> FROM GENERALLOAD
> WHERE LINE = 1 
> AND LOADED = 'Y';
>
> UNLINK GENERALLOAD;
> ERRMSG 3 WHERE :ORD = 0;
>
> :ORDNAME = '';
> SELECT ORDNAME INTO :ORDNAME 
> FROM ORDERS 
> WHERE ORD = :ORD;
>
> /* Windows: The next command opens the Sales Orders form. 
> In Priority Web, add the ORDERS form as a separate step
> in the procedure*/
> EXECUTE BACKGROUND WINFORM 'ORDERS','',:ORDNAME, '','2';
> ```

{% if site.output == "web" %}
## Further Reading 

[Click](Advanced-Programming-Tools ) for information on
additional advanced programming tools.
{% endif %}