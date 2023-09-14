---
title: VSCode Priority Dev Tools Extension
group: VSCode-Extension
tags: 'Priority_SDK'
---

{% include info.html content="<p> The Priority Dev Tools extension is currently in beta and some features are still in development.</p>" %}

## Introduction

Priority has a dedicated Dev Tools extension available for Visual Studio Code, currently in beta. This extension will assist you in developing quickly and productively in the Visual Studio Code environment.

## Features

-	Edit, create, and delete **Priority** form/field triggers
-	Edit SQLI steps in procedures
-	Syntax check for SQLI
-	Code completion for table names, keywords, form fields, and #INCLUDE statements
-	Code snippets for most built-in **Priority** functions
-	WINDBI (SQL Development program)
-	Navigation between entities using breadcrumbs
-	"Go to definition" for #INCLUDE statements and table definitions
-	Form and Program preparation
-	Code folding
-	Vertical ruler

## Working Assumptions

To start working the extension, ensure that:

-	You have a **Priority** application server.
-	You have an active user in a working **Priority** Web environment.
-	You have a license for the **APPVSCODE** application (check the [Applications for License](priority:priform@LICAPPS::.:tabula.ini:3) form).
-	You know the URL to access the OData service (run the [Send Program Activation Link](priority:priform@MGLINK.P::.:tabula.ini:3) program).
-	Visual Studio Code is installed on your computer.

## Setups

1.	In **Priority**, add your username to the **APPVSCODE** application:

	a.	Open the [Personnel File](priority:priform@USERSB::.:tabula.ini:3) form and retrieve your username. If you do not have an **API User Name**, define one now. The user name must be composed of English characters only.

	b.	Open the [Applications for License](priority:priform@LICAPPS::.:tabula.ini:3) form.

	c.	Locate the **APPVSCODE** application in the **Application ID** field. If **APPVSCODE** does not appear, run the [Renew License](priority:priform@GETUPGRADEPWD.P::.:tabula.ini:3) program.

	d.	Move to the **Users for Application** subform and add your username.

2.	Create an empty folder on your PC. This folder will be used for intermediate WINDBI files.

## Add an Environment

1.	Go to [this link](https://marketplace.visualstudio.com/items?itemName=PrioritySoftware.priority-vscode) to install the Priority Dev Tools extension.

2.	Click the **Install** button and open the installation in Visual Studio Code.

	![](https://cdn.priority-software.com/docs/images/VS_ins.png)

3.	In Visual Studio Code, click the **Install** button.

	![](https://cdn.priority-software.com/docs/images/VS_ins1.png)

4.	Navigate to the **File** menu from the menu bar. Click on **Open Folder** and select the folder you created in the Setups stage.

5.	Press **F1** to show the **Command Palette**.

6.	Find and run the command **Priority: Open Environments Wizard...**.

	![](https://cdn.priority-software.com/docs/images/VS_pal.png)

7.	Click on **Add environment with OData URL**.

	![](https://cdn.priority-software.com/docs/images/VS_add.png)

8.	In the Wizard, enter the following information:

	|     **Field**    |                                                   **Explanation**                                                  |
	|:----------------:|:------------------------------------------------------------------------------------------------------------------:|
	| Environment name | Assign a name for the environment.                                                                                  |
	| OData URL        | Full URL for the OData service, for example, https://s.priority-connect.online/odata/Priority/tabula.ini/mycompany/ |
	| Username         | Your API username                                                                                                  |
	| Password         | Your password                                                                                                      |

    Alternatively, you can use personal access tokens instead of Username/Password:
	-	Open the [REST Interface Access Tokens](priority:priform@PATOKENS::.:tabula.ini:3) form in **Priority**, assign a Personal Access Token to your user, and take note of the token.

	-	Enter the token in the **Username** field and **PAT** as the password.
	
	![](https://cdn.priority-software.com/docs/images/VS_details.png)
	
9.	Click on **Add**.
	
## Using the Extension

-	In the Activity Bar (on the left), click the **Priority** icon ![](https://cdn.priority-software.com/docs/images/VS_logo.png) to see the **Environments Explorer**. All your environments will appear here.

-	Expand an environment to view its tables, forms, and programs.

-	Selecting an object will open it in a new editor window as a file.

-	Saving a file will update **Priority**.

-	To prepare a form or procedure, run the relevant **Prepare** operation using the command palette (F1).

-	Press **F12** to view the contents of an #INCLUDE statement or a table definition or **Alt+F12** to peek into it.

-	Code completion: Press **Ctrl+Space** to trigger code completion for table names, keywords, form fields, and #INCLUDE statements. If you\'re unfamiliar with VS Code, click [here](https://code.visualstudio.com/docs/getstarted/tips-and-tricks) for general tips.

## Using WINDBI

-	Right-click on an environment in the **Environments Explorer** and select **New SQLI** to open a new WINDBI window for that environment.

-	In the **Environments Explorer**, select a company in the **Companies** panel.

-	To run the SQLI code, click the **Run SQLI** button in the top-right corner or use the default keyboard shortcut **Alt+X**.

-	All WINDBI actions are available if you right-click on the environment name in the **Environments Explorer**.