---
title: Setting Up the Dev Environment
layout: sdk_nav
group: Setting Up
tags: 'Priority_SDK'
---

Before you start building new ***Priority*** entities, you should ensure your user has the necessary permissions in the development server. Furthermore, if this is a new dev environment, you might need to expose the table generator and add the development utilities folder.

## User Permissions

For the majority of use cases, developer users should be assigned to the *tabula* superuser group. 

**Note:** These instructions need to be performed as the *tabula* user. If you do not have access to the *tabula* user, request that the system administrator perform them.

1. Open the **Users** form (Path: **System Management > System Maintenance > Users > Users**) and retrieve your user.
2. Assign *tabula* as the privilege group leader for your user.
3. Open the **System Constants** form.
4. Ensure the value of the PRIVUSERS constant is set to 1.

If you do not wish to assign superuser permissions to developers, see [below](#development-permissions-for-non-tabula-user-group) for more information on the privileges required by developers.

## Expose the Table Generator

On a fresh installation of **Priority**, the Table Generator is not linked to the menu. If you need to add/modify tables and columns, you will have to link it to the **Generators** menu. If you do not see the **Table Generator** menu in the **Generators** menu:

1. Open the **Menu Generator** form (Path: **System Management > Generators > Menus > Menu Generator**).
2. Retrieve the *Generators* menu.
3. In the **Menu Items** sub-level, add the **TABGEN** menu.

![](https://cdn.priority-software.com/docs/images/SDK_GettingStarted_TableGenerator.png)

**Result:** The table generator menu is now available in the Generators menu.

## Recommended: Add the Util Folder

**Windows Only**

The *Util* folder is an add-on folder that contains utilities that enhance the functionality of the **SQL Development** (WINDBI) environment. Specifically, it allows the use of the tools in the **Queries** and **Dump** menus. 

The folder needs to be placed in the *priority/system* folder on the server.

1. On the Priority server, navigate to the *priority/system* folder.
2. Download the zipped *util* folder from [here](https://cust.priority-software.com/FIX/util/util.zip).
3. Extract the contents of the archive to the *util* folder. If there is no such folder, create it; if such a folder already exists, back up it contents first, then replace the files inside.

## Development Permissions for non-tabula User Group

[22.1]()

The following instructions are for system administrators of development environments.

If you do not wish to assign developers to the *tabula* user group, you should create a new user group for developers, with the following privileges and permissions:

- In the privilege explorer, ensure they have full access to the following menus under **System Management**:
  - Generators
  - Revisions
  - Database Interfaces
  - Dictionaries (optional, useful if you are working with more than one language)
- In the **User Permissions** form (Path: **System Management > System Maintenance > Users > User Permissions**), check the following boxes for each user in the user group:
  - Authorized for SQL
  - Customize Workspace
  - Table Structure Mgmt

