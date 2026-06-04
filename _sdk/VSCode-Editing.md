---
title: Extension Enhancements to the VSCode Editing Environment
group: VSCode-Extension
tags: 'Priority_SDK'
---

The Priority Dev Tools extension adds the following **Priority**-specific capabilities to the VS Code editing environment:

| Feature | Purpose |
|---------|---------|
| [Environments Explorer](#environments-explorer) | Browse and open forms, procedures, and tables |
| [Syntax Highlighting](#syntax-highlighting) | Color-coded Priority SQL and triggers |
| [Syntax Checking](#sqli-syntax-checking) | Real-time SQLI validation |
| [IntelliSense](#code-completion-intellisense) | Auto-complete for tables, fields, keywords, functions |
| [Code Snippets](#code-snippets) | Templates for common Priority functions |
| [Go to Definition](#include-statements) | Navigate to table definitions, includes, labels |
| [Direct Code Editing](#direct-code-editing) | F6 from Priority → opens in VS Code |
| [Inline Error Preview](#inline-error-preview) | View message text next to ERRMSG and WRNMSG calls |

## Environments Explorer

The Environments Explorer is the primary navigation panel for **Priority** entities in VS Code. Click the **Priority** icon in the Activity Bar to open it.

Each connected environment contains three expandable folders:

- **FORMS** — Form definitions and triggers
- **PROCS** — Procedures and steps
- **TABLES** — Table structures

### Opening Entities

Click any item to open it in the editor:

- **Form folder** → Opens form trigger file
- **Form field** → Opens column trigger file
- **Procedure step** → Opens SQLI step file (for query steps)
- **Table** → Opens table definition file

Saving a file updates **Priority** immediately.

![](https://cdn.priority-software.com/docs/images/VSCode_9.gif)

### Active Environment

Before running WINDBI commands or SQLI, select an active environment:

- Click the environment name in the Environments Explorer.
- The active environment appears highlighted.
- The status bar shows the active environment name.

### Breadcrumbs Navigation

When a file is open, breadcrumbs appear at the top of the editor showing the full entity path. Each segment is clickable for quick navigation back through the hierarchy.

![](https://cdn.priority-software.com/docs/images/VSCode_9.png)

## Code Editing Features

### Syntax Highlighting

The extension provides full syntax highlighting for **Priority** SQL code:

- **CURSOR blocks** — Distinct color for SQL cursors
- **System variables** — RETVAL, PAR1, SQL.DATE8, etc.
- **Built-in functions** — ATOI, RTRIM, ENTMESSAGE, etc.
- **Keywords** — SELECT, WHERE, FROM, GOTO, etc.
- **Labels** — GOTO targets clearly marked
- **Strings and numbers** — Standard highlighting
- **Comments** — Dimmed for readability
- **Nested blocks** — Indented blocks slightly dimmed

Highlighting adapts to the active VS Code theme (including Light+, Dark+, One Dark, Dracula, and Quiet Light).

![](https://cdn.priority-software.com/docs/images/Syntax_Highlighting.gif)

### SQLI Syntax Checking

SQLI files (`.pq`) are validated as you type:

- Syntax errors are underlined in red.
- Hover over underlined code to see error details.

![](https://cdn.priority-software.com/docs/images/Syntax_Errors_Detection.gif)

### Code Completion (IntelliSense)

Press `Ctrl+Space` to trigger code completion. The extension suggests:

- **Table Names**
- **Form Names and Fields**
- **Form Triggers**
- **Keywords**
- **#INCLUDE Statements**

![](https://cdn.priority-software.com/docs/images/Entity_Completion.gif)

### Code Snippets

The extension includes ready-made snippets for built-in **Priority** functions. Snippets insert boilerplate structures for common SQLI and trigger operations, working alongside syntax highlighting and code completion.

![](https://cdn.priority-software.com/docs/images/Code_Snippets.gif)

### #INCLUDE Statements

**Go to Definition (`Ctrl+Click`):**

Navigates to table definitions, #INCLUDE targets, and label definitions referenced in GOTO statements.

**Peek Definition (`Alt+F12`):**

Views definitions inline without leaving the current file.

![](https://cdn.priority-software.com/docs/images/VSCode_13.png)

### Line Length Ruler

A vertical ruler appears at column 80 (configurable) to help maintain consistent code formatting for **Priority** procedures and triggers.

## Direct Code Editing

When the **USEVSCODE** system constant is enabled, pressing **F6** from within any trigger or procedure step query in **Priority** opens the corresponding file in VS Code at the exact code line.

### Setup

1. Open the [System Constants](priority:priform@SYSCONST::.:tabula.ini:3) form in **Priority**.
   - Path: **System Management** > **System Maintenance** > **Constant Forms**
2. Search for **USEVSCODE**.
3. Set the value to **1**.

![](https://cdn.priority-software.com/docs/images/VSCode_14.png)

## Inline Error Preview

When enabled, the extension displays the text of **Priority** error and warning messages inline next to ERRMSG and WRNMSG calls, eliminating the need to look up message numbers manually.

### Enabling

1. Open the Command Palette (`F1`).
2. Type **Priority: Editor: Toggle Error Messages**.
3. Select the command to enable or disable.

### Example

```sql
ERRMSG 1 WHERE :RETVAL <= 0;
```

Displays inline as:
```
"The record was not saved. Please try again."  [Message 1]
```

![](https://cdn.priority-software.com/docs/images/VSCode_29.png)