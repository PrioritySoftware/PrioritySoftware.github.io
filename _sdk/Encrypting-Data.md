------------------------------------------------------------------------

**Note:** To use the encryption feature, make sure to update your BIN.95
folder to the latest version.

------------------------------------------------------------------------

In certain cases, or due to legal requirements, you might need to
encrypt sensitive data in your system and only show the decrypted data
to users for a limited time. To encrypt data, use the CRPTUTIL program:

EXECUTE CRPTUTIL \[MODE\] -1 \[TABLE\]

**MODE** is an integer with value 2 or 3. **2** will encrypt the data,
while **3** will decrypt it. The -1 is for the encryption method (AES).
The encryption key is unique to each Priority installation; you cannot
transfer encrypted data from one installation and decrypt it in another.

**TABLE** is the table to encrypt. Note that if you are encrypting long
strings, the encrypted data may be longer than can fit in a single
field; you may have to allow for overflow into another line. This is
demonstrated with the INTDATA1 field in the example below.

The following example demonstrates encryption and decryption. You can
run it in WINDBI to better understand the functionality.

``` tsql
SELECT SQL.TMPFILE INTO :TST_STK FROM DUMMY;
LINK STACK_ERR TST_CRPSTK TO :TST_STK;
GOTO 9 WHERE :RETVAL <= 0;
:TST_CRPTMODE = 2; /* EnCrypt */
:TST_STRING1 = 'First very long confidential string 1 in var string1'; 
:TST_STRING2 = 'Second very long confidential string 1 in var string1'; 
DELETE FROM STACK_ERR TST_CRPSTK
;
INSERT INTO STACK_ERR TST_CRPSTK (LINE, MESSAGE)
VALUES(1, :TST_STRING1)
;
INSERT INTO STACK_ERR TST_CRPSTK (LINE, MESSAGE)
VALUES(2, :TST_STRING2)
;
EXECUTE CRPTUTIL :TST_CRPTMODE, -1, :TST_STK
;
SELECT LINE, MESSAGE, INTDATA1 FROM STACK_ERR TST_CRPSTK
WHERE LINE > 0 FORMAT
;
:TST_CRPTMODE = 3; /* DeCrypt */
EXECUTE CRPTUTIL :TST_CRPTMODE, -1, :TST_STK
;
SELECT INTDATA1, LINE, MESSAGE
FROM STACK_ERR TST_CRPSTK 
WHERE LINE > 0 FORMAT
;
LABEL 9;
UNLINK STACK_ERR TST_CRPSTK
;
```
