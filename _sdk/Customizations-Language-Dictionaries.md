---
title: Customization - Language Dictionaries
layout: sdk_nav
---

## Introduction

When [installing
customizations](Installing-Your-Customizations ), if users at
a customer site use a language other than English, you will need to
install the revisions in more than one language. This requires, for
instance, that any revision is translated to the desired language in the
language dictionaries provided by ***Priority*** (*System Management →
Dictionaries → Translation*).

## Preparing Upgrades for Other Languages 

1.  ***Before you even begin programming for this customer***, enter the
    *System Constants* form (*System Management → System Maintenance →
    Constant Forms*) and change the value of the UPGTITLES constant
    to 0. Consequently, no titles (in any language) will be stored in
    the upgrade file; rather, they will be inserted into a second file
    (based on the upgrade file) via another program.
2.  After every run of the *Prepare Upgrades* program, run the *SQL
    Development* program and record the following query:

```sql
    EXECUTE INSTITLE `fromfile` `tofile`;
```
where:
- *fromfile* is the upgrade file you have just created
        (i.e., ..\\*system\\upgrades*\\NN.*sh*, where NN is the version
        number), 
- *tofile* is the output file that will include the
        titles in all languages (the base language of English and any
        languages for which there are translations in the dictionaries).

**Important!** When preparing an upgrade for a system that has a
        different base language than your own system (e.g., yours is a
        Hebrew installation, while the customer\'s is an English
        installation), you will want the titles to be taken from the
        translation (*System Management → Dictionaries → Translation*).
        In this case, record the following query instead:
```
EXECUTE INSTITLE '-l', langcode, `fromfile,` `tofile`;
```
where:
- *langcode* is the code of the language from which to take
        the titles (e.g., 3 for American English)
- *fromfile* is the upgrade file you have just created, 
- *tofile* is the output file that will include the titles in the target language.
3.  From the **Execute** menu, select **SQLI Interpreter**.

> **Examples:** For version revision number 34, the following command would be
> recorded:
>
> ```sql
> EXECUTE INSTITLE '..\..\system\upgrades\34.sh','..\..\system\upgrades\34-inst.sh'; 
> ```
>
> The new file in system\\upgrades, **34-inst.sh**, will contain the titles
> of the upgrade you created.
>
> For the same version, when upgrading from your own Hebrew installation
> to the customer\'s English installation, the following command would
> be recorded:
>
> ```sql
> EXECUTE INSTITLE -l', '3', '..\..\system\upgrades\34.sh','..\..\system\upgrades\34-inst.sh ';
> ```

## Modifying DBI Operations in the Revision 

If you began programming for the customer without first updating the
UPGTITLES constant, you will have to modify all DBI operations in the
revision as follows:

### Creating a New Table 

Instead of:

```sql
CREATE TABLE PRIV_NEWTABLE 'New Table Title' 1
COL1(CHAR,3,'Column 1')
COL2(CHAR,32,'Column 2)
UNIQUE(COL1);
```

Use the following:

```sql
CREATE TABLE PRIV_NEWTABLE '[Ktitle : PRIV_NEWTABLE]' 1
COL1(CHAR,3,'[Column: PRIV_NEWTABLE/COL1]')
COL2(CHAR,32,'[Column: PRIV_NEWTABLE/COL2]')
UNIQUE(COL1);
```

### Creating a New Table Column 

Instead of:

```sql
FOR TABLE MYTABLE INSERT MYNEWCOL
(INT,13,'My New Column Title'); 
```

Use the following:

```sql
FOR TABLE MYTABLE INSERT MYNEWCOL
(INT,13,'<nowiki>[Column: MYTABLE/MYNEWCOL]</nowiki>'); 
```

### Changing a Table Title 

Instead of:

```sql
FOR TABLE MYTABLE CHANGE TITLE TO 'New Title'; 
```

Use the following:

```sql
FOR TABLE MYTABLE CHANGE TITLE TO '<nowiki>[Ktitle : MYTABLE]</nowiki>';
```

### Changing a Table Column Title 

Instead of:

```sql
FOR TABLE MYTABLE COLUMN MYCOL 
CHANGE TITLE TO 'New Title'; 
```

Use the following:

```sql
FOR TABLE MYTABLE COLUMN MYCOL 
CHANGE TITLE TO <nowiki>[Column: MYTABLE /MYCOL]; </nowiki>
```

When you finish modifying all DBI steps for the revision in question,
continue with steps 2 and 3 under [Preparing Upgrades for Other
Languages](#Preparing-Upgrades-for-Other-Languages ).
