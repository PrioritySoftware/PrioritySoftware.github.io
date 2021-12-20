---
title: Return Values and Statement Failure
layout: sdk_nav
---

## Table of Return Values and Statement Failure 

```{=html}
<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0
 style='border-collapse:collapse;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;
 mso-border-insideh:.5pt solid windowtext'>
```
```{=html}
<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'>
```
```{=html}
<td width=139 valign=top style='width:104.4pt;border-top:solid windowtext 1.0pt;
   border-left:none;border-bottom:solid windowtext 1.0pt;border-right:none;
   mso-border-top-alt:solid windowtext .5pt;mso-border-bottom-alt:solid windowtext .5pt;
   background:#F3F3F3;padding:0cm 5.4pt 0cm 5.4pt'>
```
`<b>`{=html}`<span
   style='font-size:11.0pt'>`{=html}Command`</span>`{=html}`</b>`{=html}

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border-top:solid windowtext 1.0pt;
   border-left:none;border-bottom:solid windowtext 1.0pt;border-right:none;
   mso-border-top-alt:solid windowtext .5pt;mso-border-bottom-alt:solid windowtext .5pt;
   background:#F3F3F3;padding:0cm 5.4pt 0cm 5.4pt'>
```
`<b>`{=html}`<span
   style='font-size:11.0pt'>`{=html}Return
Values`</span>`{=html}`</b>`{=html}

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border-top:solid windowtext 1.0pt;
   border-left:none;border-bottom:solid windowtext 1.0pt;border-right:none;
   mso-border-top-alt:solid windowtext .5pt;mso-border-bottom-alt:solid windowtext .5pt;
   background:#F3F3F3;padding:0cm 5.4pt 0cm 5.4pt'>
```
`<b>`{=html}`<span
   style='font-size:11.0pt'>`{=html}Failure
When\...`</span>`{=html}`</b>`{=html}

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:1'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
DECLARE

```{=html}
</td>
```
```{=html}
<td width=168 style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 (success)

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
never

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:2'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
OPEN

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
number of records

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
too many open

` cursors (>100), including recursive opens `

no selected records

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:3'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
CLOSE

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 upon success

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
cursor is not open

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:4'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
FETCH

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 if fetched

0 if end of cursor

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
cursor is not open

no more records in cursor

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:5'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
SELECT

```{=html}
</td>
```
```{=html}
<td width=168 style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
number of selected records

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
no record met WHERE condition

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:6'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
SELECT ... INTO

```{=html}
</td>
```
```{=html}
<td width=168 style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 upon success

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
no record met WHERE condition

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:7'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
INSERT ... SELECT

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
number of inserted records

--1 if no record meets WHERE condition

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
no record met WHERE condition

there were selected records, but none was

` inserted (generally due to unique key constraint or insufficient privileges)`

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:8'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
INSERT_VALUES

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 upon success

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
failed to insert

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:9'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
UPDATE ... WHERE CURRENT OF *cursor_name*

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 upon success

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 valign=top style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
cursor is not open

no more records in cursor

there is a record, but it was not updated

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:10'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
UPDATE

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
number of updated records

0 upon failure to update

--1 if no record meets WHERE condition

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
no record met WHERE condition

there were selected records, but none was

` updated (generally due to unique key constraint or insufficient privileges)`

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:11'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
DELETE ... WHERE CURRENT OF *cursor_name*

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 upon success

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 valign=top style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
cursor is not open

no more records in cursor

there is a record, but it was not deleted

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:12'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
DELETE

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
number of deleted records

0 upon failure to delete

--1 if no record meets WHERE condition

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
no record met WHERE condition

there were selected records, but none was deleted (generally due to
unique key constraint or insufficient privileges)

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:13'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
RUN

```{=html}
</td>
```
```{=html}
<td width=168 style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
returns what the query returns

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:14'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
[ENV](Execution-Statements )

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 upon success

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:15'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
[EXECUTE](Execution-Statements )

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
PID of the child process

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:16'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
[LINK](LINK-and-UNLINK )

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
2 if new file has been created

1 if link to existing file

0 upon failure to link

--1 if more than one link to same table name

```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:17'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
[UNLINK](LINK-and-UNLINK )

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
1 upon success

0 upon failure

```{=html}
</td>
```
```{=html}
<td width=228 valign=top style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:18'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
[GOTO](Flow-Control )

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
no such label found forwards

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:19'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
[LOOP](Flow-Control )

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
no such label found backwards

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:20'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
[LABEL](Flow-Control )

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
never

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
<tr style='mso-yfti-irow:21;mso-yfti-lastrow:yes'>
```
```{=html}
<td width=139 style='width:104.4pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
[END](Flow-Control )

```{=html}
</td>
```
```{=html}
<td width=168 valign=top style='width:126.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
```{=html}
</td>
```
```{=html}
<td width=228 style='width:171.0pt;border:none;border-bottom:solid windowtext 1.0pt;
  mso-border-top-alt:solid windowtext .5pt;mso-border-top-alt:solid windowtext .5pt;
  mso-border-bottom-alt:solid windowtext .5pt;padding:0cm 5.4pt 0cm 5.4pt'>
```
never

```{=html}
</td>
```
```{=html}
</tr>
```
```{=html}
</table>
```
## Further Reading 

-   [Executing SQL Statements](Executing-SQL-Statements )
-   [SQL Functions and
    Variables](SQL-Functions-and-Variables )
-   [Flow Control](Flow-Control )
-   [Additions and Revisions to Standard SQL
    Commands](Additions-and-Revisions-to-Standard-SQL-Commands )
-   [Execution Statements](Execution-Statements )
-   [LINK and UNLINK](LINK-and-UNLINK )
-   [Non-standard Scalar
    Expressions](Non-standard-Scalar-Expressions )
-   [Viewing Table Structure](Viewing-Table-Structure )
