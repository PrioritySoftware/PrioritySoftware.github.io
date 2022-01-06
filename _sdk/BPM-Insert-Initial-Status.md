---
title: Insert Initial BPM Status
layout: sdk_nav
---


The final step in [creating a BPM flow
chart](Creating-BPM-Flow-Charts ) is to write a query that
will insert the initial status into the **XXXX_MYDOCSTATS** table:

```sql
:INITSTAT = 'Initial Stat';
:STATUSTYPE = 'PRIV_MYBPM'
INSERT INTO XXXX_MYDOCSTATS
(MYDOCSTAT,STATDES,INITSTATFLAG,CHANGEFLAG)
VALUES(-1,:INITSTAT,'Y','Y');

INSERT INTO DOCSTATUSES (ORIGSTATUSID,TYPE,STATDES, NEWDOCFLAG)
VALUES(-1, :STATUSTYPE, :INITSTAT,'Y');
```
