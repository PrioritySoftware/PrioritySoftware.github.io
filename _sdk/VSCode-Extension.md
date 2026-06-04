---
title: VSCode Priority Dev Tools Extension
group: VSCode-Extension
tags: 'Priority_SDK'
---

{% include info.html content="<p>The Priority Dev Tools extension is currently in beta and some features are still in development.</p>" %}

## Introduction

**Priority Dev Tools** is a Visual Studio Code extension that provides an integrated development environment for **Priority** customization work. It enables editing triggers and procedure steps, running SQLI, navigating code, and preparing forms and procedures — all without leaving VS Code.

The extension connects to a **Priority** environment via OData and reflects changes back to **Priority** in real time. It complements **Priority**'s own interface for form design, configuration, and testing.

## Prerequisites

### System Requirements

Before installing **Priority Dev Tools**, verify you have:

- **Priority application server** (version 21.0 or higher recommended)
- **Personal access token (PAT)** — see [Setting Up a Personal Access Token](#setting-up-a-personal-access-token) below
- **APPVSCODE** application included in your **Priority** license

### Verifying Your License

1. Open the [Applications for License](priority:priform@LICAPPS::.:tabula.ini:3) form.
   - Path: **System Management** > **System Maintenance** > **Software Licenses**

2. Locate **APPVSCODE** in the **Application ID** field.

3. If missing, run the [Renew License](priority:priform@GETUPGRADEPWD.P::.:tabula.ini:3) program.

4. Open the **Users for Application** subform and verify your user exists. Add the user if necessary.

![](https://cdn.priority-software.com/docs/images/VSCode_1.png)

### Getting Your OData URL

1. Run the [Send Program Activation Link](priority:priform@MGLINK.P::.:tabula.ini:3) program and select **API**.
   - Path: **System Management** > **System Maintenance** > **Users**

2. Copy the OData service URL — you'll need it during environment setup.

### Preparing Your Workspace

Create a dedicated folder on your PC for your customization project files. Inside the backups folder, create a subfolder for each customization project.

![](https://cdn.priority-software.com/docs/images/VSCode_2.png)

## Installation

### Step 1: Installing VS Code

1. Download from: https://code.visualstudio.com/download

2. Run the installer and follow the prompts.

3. Launch VS Code to verify installation.

**Documentation:** https://code.visualstudio.com/docs

### Step 2: Installing the Priority Dev Tools Extension

1. Visit the [Priority Dev Tools](https://marketplace.visualstudio.com/items?itemName=PrioritySoftware.priority-vscode) marketplace page.

2. Click **Install** and open the installation in Visual Studio Code.

   ![](https://cdn.priority-software.com/docs/images/VSCode_3.png)

3. Click **Install** in VS Code.

   ![](https://cdn.priority-software.com/docs/images/VSCode_4.png)

### Step 3: Adding Your First Environment

1. Click the **Priority** icon in the Activity Bar (on the left) to open the **Environments Explorer**.

   ![](https://cdn.priority-software.com/docs/images/VSCode_5.png)

2. Click **Add environment with OData URL**.

   ![](https://cdn.priority-software.com/docs/images/VSCode_6.png)

3. Enter the following information:

   | Field | Value |
   |-------|-------|
   | Environment name | Descriptive name for this environment |
   | OData URL | Full URL for the OData service |
   | Username | Your personal access token |
   | Password | PAT |

4. Click **Add**.

   ![](https://cdn.priority-software.com/docs/images/VSCode_12.png)

Your environment appears in the Environments Explorer with expandable **FORMS**, **PROCS**, and **TABLES** folders.

![](https://cdn.priority-software.com/docs/images/VSCode_8.gif)

### Step 4: Managing Multiple Environments

To add additional environments:

1. Click the **Open Environment Wizard** icon in the Environments Explorer toolbar.

   ![](https://cdn.priority-software.com/docs/images/VSCode_8.png)

2. Follow the same steps as adding your first environment.

To edit or remove an environment:

1. Open the Environment Wizard.
2. Select the environment from the dropdown.
3. Click **Edit** or **Delete**.

## Setting Up a Personal Access Token

Personal access tokens (PATs) provide secure authentication between VS Code and **Priority** without requiring a password.

### Step 1: Generate Token

1. Navigate to **System Management** > **System Maintenance** > **Users**.

2. Open **REST Interface Access Tokens**.

3. Click to add a new token.

4. Fill in:
   - **Token Description:** "VS Code Integration" (or a descriptive name)
   - **User Name:** Your **Priority** username

5. Mark the **Create Token** checkbox.

6. Click **OK**.

7. **Immediately copy the token** — it is hidden after you leave the line. Save the token securely. You cannot retrieve it again after leaving this screen.

   **Token format example:**
   ```
   223942EB774846A6B7DCDE9E073251D2
   ```

   ![](https://cdn.priority-software.com/docs/images/VSCode_30.png)

   Once you leave the line the record should look like this:

   ![](https://cdn.priority-software.com/docs/images/VSCode_31.png)

### Step 2: Add the User to Your APPVSCODE License

1. Navigate to **System Management** > **System Maintenance** > **Software Licenses**.
2. Open the [Applications for License](priority:priform@LICAPPS::.:tabula.ini:3) form.
3. Search for the **APPVSCODE** application.
4. In the **Users for Application** subform, add your user name.

   ![](https://cdn.priority-software.com/docs/images/VSCode_32.png)

### Step 3: Configure VS Code Authentication

When adding an environment in VS Code:

- **Username:** Paste the token value (e.g., `223942EB774846A6B7DCDE9E073251D2`)
- **Password:** Enter exactly `PAT` (case-sensitive)