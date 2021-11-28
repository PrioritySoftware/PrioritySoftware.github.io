The first step in [creating a BPM flow
chart](Creating_BPM_Flow_Charts "wikilink") is to create the statuses
table.

1.  Use the *CreateTable* procedure to create a new table with the
    following attributes:\
    *Table Name* -- **XXXX_MYDOCSTATS**\
    *Table Type* -- **0** (small table)
2.  Define the table's three basic columns:\
    **MYDOCSTAT** -- **INT**, 13, *Status (ID)*\
    **STATDES** -- **CHAR**, 12, *Status*\
    **SORT** -- **INT**, 3, *Display Order*
3.  Add a mandatory flag with the following attributes:\
    **INITSTATFLAG** -- **CHAR**, 1, *Initial Status*.
4.  Add additional flags as you wish (see examples in the standard
    status forms).\
    **Note:** You do not need to add the flags *Include in ToDo List* or
    *Inactive Status*, or provide a column for a status description in
    English (for non-English environments). These columns already exist
    in the **DOCSTATUSES**table, which will be joined to the
    **XXXX_MYDOCSTATS** form.
5.  Define the following columns as keys:\
    AutoUnique -- **MYDOCSTAT**\
    Unique -- **STATDES**

------------------------------------------------------------------------

**Note:** All the names and descriptions of forms, tables, columns, etc.
are given here for demonstration purposes and can be changed as desired.

------------------------------------------------------------------------

The next step is to [create the statuses
form](Creating_the_Statuses_Form "wikilink").
