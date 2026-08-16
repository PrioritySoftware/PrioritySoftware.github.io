# REST API Documentation Conventions

## Function Syntax

- REST API functions that take no input parameters are written without parentheses.
  - Correct: `GetLoginName`
  - Incorrect: `GetLoginName()`
- Functions that take input parameters use parentheses with named parameters.
  - Example: `GetMetadataFor(entity='CUSTOMERS')`
