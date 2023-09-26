---
title: Removed Entities
group: Release Notes
tags: 'Priority_SDK'
---

This page documents entities that were removed from the system, by version. It lists the following:

- Entities removed from the system - entities that are no longer in use. They may be replaced by new entities.
- Entities removed from the menu - entities that are no longer in use, or were reorganized into different menus
- Sub-level forms that were removed - removed or replaced with a new sub-level.
- Actions removed from a form - removed or replaced with a new action.

## 23.1

### Entities Removed from the System

| Entity | Type | Title |
| --- | --- | --- |
| MANUFPACKS      	| F 	|  Manufactured Packages Details |
| EMAILCATEGORIES 	| F 	|  Main Menu - App Generators |

### Entities Removed from Menus

| Entity               	| Type 	| Title                            	| Menu               	| Menu Title                       	|
|----------------------	|------	|----------------------------------	|--------------------	|----------------------------------	|
| INVDOC_CLIPS         	| M    	| Inventory Transaction Clips      	| TRANSACTIONS       	| Inventory Transactions           	|
| ACCOUNTING_WIZARDS   	| M    	| Financials Wizards               	| ACCOUNTING_MODULE  	| Financials                       	|
| ACCOUNTS_WIZARDS     	| M    	| Chart of Accounts Wizards        	| ACCOUNTS           	| Chart of Accounts                	|
| AP_WIZARDS           	| M    	| Accounts Payable Wizards         	| PAYABLE            	| Accounts Payable                 	|
| AR_WIZARDS           	| M    	| Accounts Receivable Wizards      	| RECEIVABLE         	| Accounts Receivable              	|
| CASH_WIZARDS         	| M    	| Cash Management Wizards          	| CASH               	| Cash Management                  	|
| COSTINGMNF_WIZARDS   	| M    	| Costing for Manufact. Wizards    	| COSTING            	| Cost Analysis for Manufacturers  	|
| CRM_WIZARDS          	| M    	| CRM Wizards                      	| CRM_MODULE         	| CRM                              	|
| CURRENCIES_WIZARDS   	| M    	| Exchange Rate Wizards            	| CURRENCIES         	| Exchange Rates                   	|
| EI_PURCHASE_WIZARDS  	| M    	| Purchasing Wizards               	| EI_PURCHASE_MODULE 	| Purchasing                       	|
| EI_SALES_WIZARDS     	| M    	| Sales Wizards                    	| EI_SALES_MODULE    	| Sales                            	|
| EI_WIZARDS           	| M    	| Wizards                          	| EI_MAIN            	| E-Commerce Main Menu             	|
| FACTORYWIZARDS       	| M    	| Factory Modelling Wizards        	| DB                 	| Factory Modeling                 	|
| FNCDEF2_WIZARDS      	| M    	| Financial Attributes Wizards     	| FNCDEF2            	| Financial Attributes             	|
| FNCREP_WIZARDS       	| M    	| Financial Statement Wizards      	| FNCREP             	| Financial Statements             	|
| FNCTRANS_WIZARDS     	| M    	| Financial Statement Wizards      	| FNCPATTERNS        	| Journal Entry Codes              	|
| FNCTRANS_WIZARDS     	| M    	| Financial Statement Wizards      	| FNCTRANS           	| Entry Journal                    	|
| GL_WIZARDS           	| M    	| General Ledger Wizards           	| BOOKKEEPING        	| General Ledger                   	|
| INVDOC_WIZARDS       	| M    	| Inventory Transaction Wizards    	| TRANSACTIONS       	| Inventory Transactions           	|
| INVENTORY_WIZARDS    	| M    	| Inventory Wizards                	| LOGISTICS_MODULE   	| Inventory                        	|
| INVFACTWIZARDS       	| M    	| Warehouse Inv. Trans. Wizards    	| INVFACT            	| Warehouse Inventory Transactions 	|
| MANAGERREP_WIZARDS   	| M    	| Executive Report Wizards         	| MANAGERREP_MODULE  	| Executive Reports                	|
| OFFICE_WIZARDS       	| M    	| Office Management Wizards        	| OFFICE_MODULE      	| Office Management                	|
| ORDERWIZARDS         	| M    	| Sales Order Wizards              	| CUSTORDERS         	| Orders                           	|
| PARTSWIZARDS         	| M    	| Part Wizards                     	| LOGPART            	| Parts                            	|
| PAYMENTSWIZARDS      	| M    	| Payment Wizards                  	| PAYMENTS           	| Payments                         	|
| PERSONNEL_WIZARDS    	| M    	| HR Wizards                       	| PERSONNEL_MODULE   	| Human Resources                  	|
| PORDERWIZARDS        	| M    	| Purchase Order Wizards           	| SUPPLIERS          	| Purchase Orders                  	|
| PRODUCTIONCONWIZARDS 	| M    	| Production Control Wizards       	| PRODUCTIONCONTROL  	| Production Control               	|
| PROJWIZARDS          	| M    	| Project Wizards                  	| RESOURCES          	| Project Management               	|
| PUBLICATIONS_WIZARDS 	| M    	| Library Wizards                  	| PUBLICATIONS       	| Library                          	|
| PURCHASE_WIZARDS     	| M    	| Purchasing Wizards               	| PURCHASES_MODULE   	| Purchasing                       	|
| RECONCILE_WIZARDS    	| M    	| Reconciliations Wizards          	| RECONCILIATION     	| Reconciliations                  	|
| SALES_WIZARDS        	| M    	| Sales Wizards                    	| SALES_MODULE       	| Sales                            	|
| SERVICE_WIZARDS      	| M    	| Customer Service Wizards         	| SERVICE_MODULE     	| Customer Service                 	|
| SUPPLYWIZARDS        	| M    	| Vendor Wizards                   	| SUPPLY             	| Vendors                          	|
| SYSMAINTEN_WIZARDS   	| M    	| System Maintenance Wizards       	| SYSMAINTEN         	| System Maintenance               	|
| VATREP_WIZARDS       	| M    	| Wizards on Taxes                 	| VATREP             	| Taxes                            	|
| CUSTOMERSWIZARD      	| M    	| Customer Wizards                 	| CUSTOMERS          	| Customers                        	|
| CUSTPRICESWIZARD     	| M    	| Customer Prices Wizards          	| CUSTORDERS         	| Orders                           	|
| CUSTPRICESWIZARD     	| M    	| Customer Prices Wizards          	| PRICECOST          	| Prices and Discounts             	|
| CUSTPRICESWIZARD     	| M    	| Customer Prices Wizards          	| CPROF              	| Price Quotations                 	|
| ECSALESLIST          	| P    	| EC Sales List                    	| INTRASTAT          	| VAT Reports                      	|
| INTRASTAT            	| P    	| Intrastat                        	| INTRASTAT          	| VAT Reports                      	|
| VATREP4              	| P    	| VAT Report - Belgium (by Boxes)  	| INTRASTAT          	| VAT Reports                      	|
| VATREP5              	| P    	| VAT Report (by Boxes)            	| INTRASTAT          	| VAT Reports                      	|
| VATREPGER            	| P    	| VAT Report - Germany (by Boxes)  	| INTRASTAT          	| VAT Reports                      	|
| VATSUP3              	| P    	| Value Added Tax                  	| INTRASTAT          	| VAT Reports                      	|
| VATREP3              	| P    	| VAT Based on Journal Entries     	| INTRASTAT          	| VAT Reports                      	|
| VATCUST_POLAND       	| P    	| Journal of Customer Invoices     	| INTRASTAT          	| VAT Reports                      	|
| VATSUP_POLAND        	| P    	| Journal of Vendor Invoices       	| INTRASTAT          	| VAT Reports                      	|
| VATIMPFILE_POLAND    	| P    	| Shipping/Import Vouchers         	| INTRASTAT          	| VAT Reports                      	|
| OPENVAT              	| P    	| Sums for Transfer to VAT Account 	| INTRASTAT          	| VAT Reports                      	|
| VAT                  	| P    	| Transfer Sums to VAT Account     	| INTRASTAT          	| VAT Reports                      	|
| VATCUST              	| P    	| Check VAT on Income - by Invoice 	| INTRASTAT          	| VAT Reports                      	|
| VATSUP               	| P    	| Check VAT on Expnse - by Invoice 	| INTRASTAT          	| VAT Reports                      	|
| FNCVATREP            	| P    	| VAT by Account                   	| INTRASTAT          	| VAT Reports                      	|
| CHECKVAT             	| P    	| Check for Correct VAT            	| INTRASTAT          	| VAT Reports                      	|
| CHECKVAT2            	| P    	| Check Reconciliations for VAT    	| INTRASTAT          	| VAT Reports                      	|
| CUSTVATNUM           	| P    	| Check Customer VAT Numbers       	| INTRASTAT          	| VAT Reports                      	|
| VATPERIOD            	| P    	| Set VAT Report Period            	| INTRASTAT          	| VAT Reports                      	|
| VATSUPARG            	| P    	| Value Added Tax - Argentina      	| INTRASTAT          	| VAT Reports                      	|
| ECSALESFILEBELGIUM   	| P    	| EC Sales List - Belgium          	| INTRASTAT          	| VAT Reports                      	|
| ECSALESFILEGERMANY   	| P    	| EC Sales List - Germany          	| INTRASTAT          	| VAT Reports                      	|
| INTRASTATBELGIUM     	| P    	| Intrastat - Belgium              	| INTRASTAT          	| VAT Reports                      	|
| INTRASTATGERMANY     	| P    	| Intrastat - Germany              	| INTRASTAT          	| VAT Reports                      	|
| CHECKVATNUMEUALL     	| P    	| Validate VAT File No. - EU(Cust) 	| INTRASTAT          	| VAT Reports                      	|
| CHECKVATNUMEUALLSUP  	| P    	| Validate VAT File No. - EU(Vend) 	| INTRASTAT          	| VAT Reports                      	|
| VATREPITALY          	| P    	| VAT Register - Italy             	| INTRASTAT          	| VAT Reports                      	|
| VATREPITALYDOC       	| P    	| VAT Register - Italy (Printable) 	| INTRASTAT          	| VAT Reports                      	|
| INTRASTATITALY       	| P    	| Intrastat - Italy                	| INTRASTAT          	| VAT Reports                      	|
| INTRASTATNL          	| P    	| Intrastat - Netherlands          	| INTRASTAT          	| VAT Reports                      	|
| INTRASTATFRANCE      	| P    	| Intrastat - France               	| INTRASTAT          	| VAT Reports                      	|
| INV_CUSTSALESBEXML   	| P    	| Annual Sales File - Belgium      	| INTRASTAT          	| VAT Reports                      	|
| DECFORARTICLE21      	| P    	| Declaration for Article 21       	| INTRASTAT          	| VAT Reports                      	|
| GDPDU                	| P    	| GoBD Export - Germany            	| INTRASTAT          	| VAT Reports                      	|
| NLAUDIT              	| P    	| Audit File - Netherlands         	| INTRASTAT          	| VAT Reports                      	|
| ECSALEINDICATORS     	| F    	| EC Sales Indicators              	| INTRASTAT          	| VAT Reports                      	|
| TAXBOXES             	| F    	| Tax Report Boxes                 	| INTRASTAT          	| VAT Reports                      	|
| INTRASTATLOG         	| F    	| Intrastat Creation Log - Italy   	| INTRASTAT          	| VAT Reports                      	|
| TAXBOXDEFS_ONE       	| F    	| Tax Report Box Definitions       	| INTRASTAT          	| VAT Reports                      	|
| VIESLOG              	| F    	| VIES VAT No. Validation Log      	| INTRASTAT          	| VAT Reports                      	|
| INTRASTATFRANCELOG   	| F    	| Intrastat Creation Log - France  	| INTRASTAT          	| VAT Reports                      	|
| GENINVOICESEURO      	| F    	| List of Financial Documents-Eur. 	| INTRASTAT          	| VAT Reports                      	|
| VATLOG               	| F    	| VAT Report Creation/Transmit Log 	| INTRASTAT          	| VAT Reports                      	|
| INTRASTATCODES       	| F    	| Intrastat Definitions            	| INTRASTAT          	| VAT Reports                      	|
| ITALYTAXPAYMENTS     	| M    	| Tax Payments - Italy             	| INTRASTAT          	| VAT Reports                      	|
| HMRCVAT              	| M    	| Online VAT (UK)                  	| INTRASTAT          	| VAT Reports                      	|

### Removed Subforms

| Subform          	| Subform Title                   	| Upper Form          	| Upper Title     	|
|------------------	|---------------------------------	|---------------------	|-----------------	|
| MANUFPACKS         	| Manufactured Packages Details 	| ALINE           	| Production Details            	|
| MANUFPACKS         	| Manufactured Packages Details 	| ALINE_ONE       	| Reporting Production Details  	|
| EMAILCATEGORIES    	| Main Menu - App Generators    	| CUSTPERSONNEL   	| Customer Contacts             	|
| EMAILCATEGORIES    	| Main Menu - App Generators    	| SUPPERSONNEL    	| Vendor Contacts               	|
| COMPANYWEBWARNINGS 	| Companyweb Warnings           	| COMPANYWEB      	| Business Health by Companyweb 	|
| USERBFUNDS         	| Pension and Training Funds    	| SALARYTEMPLATES 	| Employment Contracts          	|
| PHONEAPP           	| Permissions for Applications  	| PHONEBOOK       	| Contacts                      	|

### Removed Actions

| Action         	| Type 	| Action Title                     	| Form           	| Form Title                    	|
|----------------	|------	|----------------------------------	|----------------	|-------------------------------	|
| LINKPRINTDELIVERY  	| P    	| Print All Documents           	| DLVTRACKS      	| Delivery Tracking Documents       	|

## 23.0

### Entities Removed from the System

No entities removed.

### Entities Removed from Menus

| Entity           	| Type 	| Title                            	| Menu             	| Menu Title                    	|
|------------------	|------	|----------------------------------	|------------------	|-------------------------------	|
| PCCHARGE         	| M    	| Direct Connect Settings          	| TIV              	| Receipts                      	|
| ENTERPRISESEARCH 	| P    	| Enterprise Search                	| SEARCHDEFS       	| Search Definitions            	|
| VATDATEFNCFILPER 	| P    	| Update VAT Rep.Date in J.Entries 	| FNCPROGS         	| Auxiliary Programs            	|
| VATDATEFILTER    	| P    	| Adjust Tax Report Dates          	| FNCPROGS         	| Auxiliary Programs            	|
| CUSTOMSNUMFILTER 	| P    	| Update VAT File No. in Invoice   	| FNCPROGS         	| Auxiliary Programs            	|
| FNCTAXES_FILTER  	| P    	| Update Tax Compon. in J. Entries 	| FNCPROGS         	| Auxiliary Programs            	|
| ACTDATEFNCFILPER 	| P    	| Update Activ. Date in J. Entries 	| FNCPROGS         	| Auxiliary Programs            	|
| UPDCUSTOMSREF    	| P    	| Upd Customs Manifests in Ledger  	| FNCPROGS         	| Auxiliary Programs            	|
| VPRICEFILTER     	| P    	| Update Price w/Tax in Docs       	| FNCPROGS         	| Auxiliary Programs            	|
| MULTICURFILTER   	| P    	| Exchange Rate Adjustment Filter  	| FNCPROGS         	| Auxiliary Programs            	|
| UPDATECUR3       	| P    	| Update Foreign Curr Sums in Acct 	| FNCPROGS         	| Auxiliary Programs            	|
| DELZEROLINES     	| P    	| Delete J.Entry Items w/Zero Sums 	| FNCPROGS         	| Auxiliary Programs            	|
| FIXCURREGITEMS   	| P    	| Fill in Exchange Rate Gaps       	| FNCPROGS         	| Auxiliary Programs            	|
| OVDIMNET         	| M    	| Interfacing with Ovdimnet        	| PERSONNEL_MODULE 	| Human Resources               	|
| WMSCONTROL       	| F    	| Mobile Device Controller         	| WMS2             	| WMS Application Generator     	|
| PREPWMSCUBE      	| P    	| Prep for Ware Task Analysis (BI) 	| WMSPROCS         	| Auxiliary Programs            	|
| CHANGESTATWTASKS 	| P    	| Revise Warehouse Task Statuses   	| WMSPROCS         	| Auxiliary Programs            	|
| UNLOCKWTASKS     	| P    	| Release Locked Tasks             	| WMSPROCS         	| Auxiliary Programs            	|
| DELWTASKS        	| P    	| Cancel Unreported Tasks          	| WMSPROCS         	| Auxiliary Programs            	|
| WMSPROCS         	| M    	| Auxiliary Programs               	| WMSMAINTEN       	| WMS Maintenance               	|
| WMS2             	| M    	| WMS Application Generator        	| WMSMAINTEN       	| WMS Maintenance               	|
| SOFINITCONF      	| P    	| Set Up Mobile Device Constants   	| WMSDEF           	| WMS Mobile Device Maintenance 	|
| LOADUSATAXES     	| M    	| Load Taxes (US)                  	| FNCDEF           	| Basic Data                    	|
| VATCOMPTYPES     	| F    	| VAT Report Type                  	| ENVIRONMENT      	| Companies                     	|


### Removed Subforms

| Subform          	| Subform Title                   	| Upper Form          	| Upper Title     	|
|------------------	|---------------------------------	|---------------------	|-----------------	|
| FNCTAXES | Tax Calculation Details |  TAXTOTALBELGIUM | Total Tax |

### Removed Actions

| Action         	| Type 	| Action Title                     	| Form           	| Form Title                    	|
|----------------	|------	|----------------------------------	|----------------	|-------------------------------	|
| DIRECTCONNECT  	| P    	| Send to Direct Connect           	| EPAYMENT2      	| Other Forms of Payment        	|
| DIRECTCONNECT  	| P    	| Send to Direct Connect           	| TPAYMENT2      	| Other Forms of Payment        	|
| DIRECTCONNECT2 	| P    	| Get Token from Direct Connect    	| PAYMENTDEF     	| Account/Credit Card to Charge 	|
| DIRECTCONNECT2 	| P    	| Get Token from Direct Connect    	| PAYMENTDEF_ONE 	| Account/Credit Card to Charge 	|
| DIRECTCONNECT2 	| P    	| Get Token from Direct Connect    	| PAYMENTDEF_TWO 	| Credit Card to Charge         	|
| SOFINITCONF    	| P    	| Set Up Mobile Device Constants   	| WMSDEF         	| WMS System Definitions        	|
| SESTATUSCHECK  	| P    	| ShipEngine Track Shipment Online 	| DOCUMENTS_D    	| Customer Shipments            	|

## 22.1

### Entities Removed from the System

| Entity | Type | Title |
| --- | --- | --- |
| PORDUSERCODES    	| F 	|   Approval Lists for Purch Order	|
| PDUSERCODES      	| F 	|   Approval Lists for PRs	|
| PDUSERCODELIST   	| F 	|   Approvers	|
| PDEALULIST       	| F 	|   Blanket Purchase Ord Approvers	|
| ECOUSERLIST      	| F 	|   ECO Approvers	|
| ECOUSERCODES     	| F 	|   ECO Approval Lists	|
| PORDERUSERLIST   	| F 	|   Order Approvers	|
| PDEALUSERCODES   	| F 	|   Blnkt Purch Ords Approval Lists	|
| PYINVUSERCODES   	| F 	|   Purch. Invoice Approval Lists	|
| PYINVUSERLIST    	| F 	|   Purchase Invoice Approvers	|
| PORDI_CHANGE_LOG 	| F 	|   Purchase Order Item Changes-OLD	|
| CPROFUSERCODES   	| F 	|   Approval Lists for Price Quotes	|
| CPROFUSERLIST    	| F 	|   Price Quotations Approvers	|
| ECOUSERCODES     	| F 	|   ECO Approval Lists	|
| ECOUSERLIST      	| F 	|   ECO Approvers	|
| ORDERUSERCODES   	| F 	|   Approval Lists - Sales Orders	|
| ORDERUSERLIST    	| F 	|   Sales Order Approvers	|
| PDEALULIST       	| F 	|   Blanket Purchase Ord Approvers	|
| PDEALUSERCODES   	| F 	|   Blnkt Purch Ords Approval Lists	|
| PDUSERCODELIST   	| F 	|   Approvers	|
| PDUSERCODES      	| F 	|   Approval Lists for PRs	|
| PORDERUSERLIST   	| F 	|   Order Approvers	|
| PORDUSERCODES    	| F 	|   Approval Lists for Purch Order	|
| PYINVUSERCODES   	| F 	|   Purch. Invoice Approval Lists	|
| PYINVUSERLIST    	| F 	|   Purchase Invoice Approvers	|
| ECO_2_3          	| R 	|   ECO Approvers	|
| ECO_2_3          	| D 	|   ECO Approvers	|

### Entities Removed from Menus

| Entity   Name       	| Type 	| Title                          	| Menu Name          	| Menu Title                      	|
|---------------------	|------	|--------------------------------	|--------------------	|---------------------------------	|
| CUSTAGENT 	| R    	| Customers and Their Sales Reps  | CUSTREPORTS | Customer Reports |
| CLIPCUSTOMERS | P | Open Customer Clip | CUSTOMERS | Customers |
| CLIPDOCUMENTS_D | P | Record Customer Shipment Clip |  INVSALES | Sales Inventory Transactions |
| CLIPDOCUMENTS_D | P | Record Customer Shipment Clip |  INVDOC_CLIPS | Inventory Transaction Clips |
| CLIPDOCUMENTS_H | P | Warehouse Assembly Clip |  INVDOC_CLIPS | Inventory Transaction Clips |
| CLIPDOCUMENTS_H | P | Warehouse Assembly Clip |  WAREASSM | Warehouse Assemblies |
| CLIPDOCUMENTS_P  	| P    	| Record GRV Clip                 	| INVDOC_CLIPS    	| Inventory Transaction Clips      	|
| CLIPDOCUMENTS_P  	| P    	| Record GRV Clip                 	| INVPURCHASES    	| Purchase Inventory Transactions  	|
| CLIPDOC_C        	| P    	| Inventory Count Clip            	| INVCOUNT        	| Inventory Count                  	|
| CLIPINVOICES_H   	| P    	| Check Payment Clip              	| PRINTCHECKS     	| Check Printing                   	|
| CLIPINVOICES_Q   	| P    	| Bank Transfers Clip             	| QIV             	| Bank Transfers                   	|
| CLIPMASAV        	| P    	| Payment by ITP Clip             	| QIV             	| Bank Transfers                   	|
| CLIPMASAV        	| P    	| Payment by ITP Clip             	| MSVINTERFACE    	| Payment Interface Payables       	|
| CLIPORDERS       	| P    	| Record Sales Order Clip         	| CUSTORDERS      	| Sales Orders                     	|
| CLIPPART         	| P    	| Open Part Clip                  	| PART            	| Parts                            	|
| CLIPPART         	| P    	| Open Part Clip                  	| LOGPART         	| Part Catalogue                   	|
| CLIPPORDERS      	| P    	| Record Purchase Order Clip      	| SUPPLIERS       	| Purchase Orders                  	|
| CLIPPRICECOST    	| P    	| Prices and Discounts Clip       	| PRICECOST       	| Prices and Discounts             	|
| CLIPPRICECOST    	| P    	| Prices and Discounts Clip       	| CUSTOMERS       	| Customers                        	|
| CLIPPRIVTREE     	| P    	| Users and Privileges Clip       	| USERS           	| Users                            	|
| CLIPPRIVTREE     	| P    	| Users and Privileges Clip       	| PRIVILEGES      	| Privileges                       	|
| CLIPSUPPLIERS    	| P    	| Open Vendor Clip                	| SUPPLY          	| Vendors                          	|
| CLIPVAT          	| P    	| VAT Clip                        	| VAT             	| Value Added Tax (Israel)         	|
| CLIPENDOFYEAR    	| P    	| Year-End Clip                   	| FNCBAL          	| Fiscal Periods                   	|
| CLIPINVOICES_H   	| P    	| Check Payment Clip              	| HIV             	| Payments by Check                	|
| PROFILEOUT       	| P    	| Export System Profile           	| PROGDESIGNTOOLS 	| Design Programs                  	|
| PROFILEIN        	| P    	| Import System Profile           	| PROGDESIGNTOOLS 	| Design Programs                  	|
| PYINVUSERCODES   	| F    	| Purch. Invoice Approval Lists   	| PINVOICES       	| Purchase Invoices                	|
| ECOUSERCODES     	| F    	| ECO Approval Lists              	| ECO             	| Engineering Change Orders (ECO)  	|
| CPROFUSERCODES   	| F    	| Approval Lists for Price Quotes 	| CPROFSETTING    	| Defs & Aux Programs-Price Quotes 	|
| PORDUSERCODES    	| F    	| Approval Lists for Purch Order  	| PORDERTABLES    	| Purchase Order Maintenance       	|
| ORDERUSERCODES   	| F    	| Approval Lists - Sales Orders   	| ORDSTATUS       	| Defs & Aux Programs-Sales Orders 	|
| PDEALUSERCODES   	| F    	| Blnkt Purch Ords Approval Lists 	| PORDERTABLES    	| Purchase Order Maintenance       	|
| PDUSERCODES      	| F    	| Approval Lists for PRs          	| PURDEMANDS      	| Purchase Demands                 	|
| LOCATEAUTHORIZER 	| P    	| Locate Approver in Open Docs    	| REPLACEUSER     	| User Replacement                 	|
| ECOUSERLISTDATE  	| F    	| ECO Approval History            	| ECO             	| Engineering Change Orders (ECO)  	|
| CUSTTEMPLATES    	| M    	| Employment Contracts for Cust.  	| SALARY          	| Time and Attendance              	|
| MRPDEMAND        	| R    	| Analysis of MRP Results (ATP)   	| MRPREPORTS      	| MRP Reports                      	|
| WWWSHOWDOC_h     	| P    	| Print Rental                    	| RENTALS         	| Rentals                          	|
| RENTAVAIL        	| P    	| Rental Item Availability        	| RENTALS         	| Rentals                          	|
| RENTALPAYREP     	| P    	| Upcoming Payments for Rentals   	| RENTALS         	| Rentals                          	|
| FINASTRASTART    	| P    	| Set Up Finastra Banking         	| DIGITALBANKS    	| Digital Banking                  	|
| COMPCERTFINASTRA 	| F    	| Finastra Digital Banking Defs.  	| DIGITALBANKS    	| Digital Banking                  	|

### Removed Subforms

| Subform          	| Subform Title                   	| Upper Form          	| Upper Title     	|
|------------------	|---------------------------------	|---------------------	|-----------------	|
| PORDI_CHANGE_LOG 	| Purchase Order Item Changes-OLD 	| PORDERITEMS         	| Order Items     	|
| PORDI_CHANGE_LOG 	| Purchase Order Item Changes-OLD 	| PORDERITEMS_CHANGES 	| Order Items     	|
| CUSTCHECKLIST    	| Checklist for New Customer      	| CTYPE               	| Customer Groups 	|
| SUPCHECKLIST     	| Checklist for Vendors           	| SUPTYPES            	| Vendor Groups   	|
| PARTCHECKLIST    	| Checklist for Parts             	| FAMILY_LOG          	| Part Families   	|

### Removed Actions

No actions removed.


## 22.0

### Entities Removed from the System

| Entity | Type | Title |
| --- | --- | --- |
| ECOUSERCODES | F | ECO Approval Lists |
| SERNFILE | F | History of Components|
| SERNUMBERSTRANS | F | Audit Trail for Item|
| SONSERN | F | Serialized Components of Part |
| SERNUMHISTORY | F | Service Calls for Serial Number |

### Entities Removed from Menus

| Entity   Name       	| Type 	| Title                          	| Menu Name          	| Menu Title                      	|
|---------------------	|------	|--------------------------------	|--------------------	|---------------------------------	|
| ECOUSERLIST         	| F    	| ECO Authorizers                	| ECO                	| Engineering Change Orders (ECO) 	|
| RRFVABYHEADERFILTER 	| P    	| Update FVA Components for Doc. 	| REVRECDATA         	| Revenue Recognition             	|
| RRFVABYHEADERFILTER 	| P    	| Update FVA Components for Doc. 	| FNCPROGS           	| Auxiliary Programs              	|
| SHIPMANIFESTS       	| P    	| Create Manifest                	| INVSALES           	| Sales Inventory Transactions    	|
| CUSTTEMPLATES       	| M    	| Employment Contracts for Cust. 	| SALARY             	| Time and Attendance             	|
| SAVETITLES          	| P    	| Save for Transl-Before Upgrade 	| LANGOTHER          	| Miscellaneous                   	|
| DELTITLECHGS        	| P    	| Delete Changes After Revision  	| LANGOTHER          	| Miscellaneous                   	|
| SDIGETPENDING       	| P    	| Get Pending SDI Invoices       	| ELECTRONICINVOICES 	| Electronic Invoices             	|

### Subforms Removed

| Subform         	| Type 	| Subform Title                   	| Upper Form    	| Upper Title                      	|
|-----------------	|------	|---------------------------------	|---------------	|----------------------------------	|
| SONSERN         	| F    	| Serialized Components of Part   	| SERNUMBERS    	| Catalogue of Parts w/Serial Nos. 	|
| SERNUMHISTORY   	| F    	| Service Calls for Serial Number 	| SERNUMBERS    	| Catalogue of Parts w/Serial Nos. 	|
| SERNFILE        	| F    	| History of Components           	| SERNUMBERS    	| Catalogue of Parts w/Serial Nos. 	|
| SERNUMBERSTRANS 	| F    	| Audit Trail for Item            	| RENTITEMS     	| Rental Items                     	|
| SERNUMBERSTRANS 	| F    	| Audit Trail for Item            	| RENTSERNTRANS 	| Serial Numbers                   	|
| SERNUMBERSTRANS 	| F    	| Audit Trail for Item            	| SERNRENTS     	| List of Equipment for Rent       	|
| SERNUMBERSTRANS 	| F    	| Audit Trail for Item            	| SERNUMBERS    	| Catalogue of Parts w/Serial Nos. 	|
| CHANGE_LOG      	| F    	| History of Changes              	| PART          	| Parts                            	|
| CHANGE_LOG      	| F    	| History of Changes              	| PRDPART       	| Purchase/MRP Parameters for Part 	|
| CHANGE_LOG      	| F    	| History of Changes              	| FNCPART       	| Financial Parameters for Parts   	|
| CHANGE_LOG      	| F    	| History of Changes              	| LOGPART       	| Part Catalogue                   	|

### Removed Actions

No actions removed.