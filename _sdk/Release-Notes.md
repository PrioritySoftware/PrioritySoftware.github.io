---
title: Release Notes and Change Log
layout: sdk_nav
group: Release Notes
tags: 'Priority_SDK'
---

## SDK 22.0

### August 2022

- User identifcation via Priority Lite is now deprecated and was removed from the SDK.

### May 2022

- Clarified that decimal seperator used in JSON files must be a decimal point.
- Added a note that the WINHTML option [-format](WINHTML#winhtml-parameters) is only available when printing a single document with **-v**.

### April 2022

- Added [NEWATTACH](Scalar-Expressions#strings) - a function that returns a valid name for a new folder.
- Added support for encoding unicode text files as [QR Codes](Report-Columns#displaying-qr-codes).

## SDK 21.1 

### Feb 2022

- Added base64 encode and decode [filters](Interact-with-External-Systems#special-filters)
- Added **delnl** [filter](Interact-with-External-Systems#special-filters)
- Some clarifications on the encoding of the infile used with [WSCLIENT](WSCLIENT)

### Jan 2022

- Published the SDK in the Developer Portal!
- Added site search (powered by Algolia).
- Major rewrite on [outputting documents](Documents), focusing on how to use the WINHTML program and its various parameters.
- Moved some topics from the Advanced Programming Tools into more fitting sections.
- Minor tweaks and corrections.