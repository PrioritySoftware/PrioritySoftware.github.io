---
title: Priority Development Features
group: VSCode-Extension
tags: 'Priority_SDK'
---

## Creating and Managing Triggers & Steps

Form triggers and procedure steps can be created and deleted directly from VS Code, without opening the Form or Procedure Generators in **Priority**.

### Creating a Form Trigger

1. In the Environments Explorer, expand **Environment** > **FORMS** > **[Form Name]**.

2. Right-click the form folder.

3. Select **Create Form Trigger**.

   ![](https://cdn.priority-software.com/docs/images/VSCode_15.png)

4. Enter the trigger name according to **Priority** naming conventions.

5. Click **Confirm**.

The trigger is created in **Priority** and opens immediately in VS Code.

### Deleting a Form Trigger

1. Right-click the trigger in the Environments Explorer.

2. Select **Delete Form Trigger**.

3. Confirm deletion.

   ![](https://cdn.priority-software.com/docs/images/VSCode_16.png)

### Creating a Procedure Step

1. In the Environments Explorer, expand **Environment** > **PROCS** > **[Procedure Name]**.

2. Right-click the procedure folder.

3. Select **Create Procedure Step...**.

   ![](https://cdn.priority-software.com/docs/images/VSCode_17.png)

4. Configure the step number and step type.

   ![](https://cdn.priority-software.com/docs/images/VSCode_18.png)

   ![](https://cdn.priority-software.com/docs/images/VSCode_19.png)

5. Confirm.

The step is added to the procedure in **Priority**. For SQLI steps, the file opens in VS Code immediately.

![](https://cdn.priority-software.com/docs/images/Procedure_Step_Creation.gif)

### Deleting a Procedure Step

1. Right-click the step in the Environments Explorer.

2. Select **Delete Procedure Step**.

3. Confirm deletion.

   ![](https://cdn.priority-software.com/docs/images/VSCode_20.png)

## Form and Procedure Preparation

Form and procedure preparation can be run directly from VS Code.

1. Open any form file (`.priform` or `.pq`) or procedure file (`.pripar` or `.pq`).

2. Click the **Preparation** icon in the editor toolbar.

   ![](https://cdn.priority-software.com/docs/images/VSCode_21.png)

VS Code sends a preparation request to the active environment. A progress notification appears during execution.

   ![](https://cdn.priority-software.com/docs/images/VSCode_22.png)

The operation validates the form or procedure definition and rebuilds its metadata in **Priority**. Results appear in the output console.

   ![](https://cdn.priority-software.com/docs/images/VSCode_23.png)

   ![](https://cdn.priority-software.com/docs/images/Saving_Procedure_success.gif)