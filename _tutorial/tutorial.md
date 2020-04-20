---
title: Tutorial
collection-title: Web SDK Tutorial
methods:
    - Introduction
    - Create the HTML Application
    - Installing Priority into your page
    - Running Server-Side Triggers
    - Opening Choose Lists
    - Handling Server Messages
    - Actions
    - Input Synchronization
layout: docs_nav
permalink: /tutorial/
---
# Priority Web SDK Tutorial
<a class="anchor-link" name="Introduction"></a>
### Introduction
In this tutorial we will write a simple web or mobile application that runs a form in **Priority**.

We will learn how to add a new row, update fields, open a choose list, and run an action.

Our demo application will be based on the **Customers** form and contain the following fields: **Customer Number**, **Customer Name**, **Status**, **Assigned to**, and **Date Opened**. It will also contain the **Convert Potential Cust to Cust** action.

<a class="anchor-link" name="Create_the_HTML_Application"></a>
### Create the HTML Application
Here is the basic HTML and styling needed in order to create a basic form that mirrors the Priority CUSTOMERS form. At this point it does nothing. Note that the element IDs are identical to the form column names in Priority. We will later use these IDs in order to implement a 2-way sync between the app and the server.
```html
<!doctype html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Customer Entry</title>
    <style>
      .item {
        margin: 20px 10px 20px 10px;
      }

      input {
        width: 200px;
        height: 30px;
        font-size: 16px;
      }

      label {
        font-size: 16px;
        display: inline-block;
        width: 150px;
      }
    </style>
  </head>
  <body>
    <div id="container" onchange="fieldChangeHandler(event)">
      <div class="item">
        <label class="labelStyle">Customer Number</label>
        <input id="CUSTNAME">
      </div>
      <div class="item">
        <label>Customer Name</label>
        <input id="CUSTDES">
      </div>
      <div class="item">
        <label>Status</label>
        <input id="STATDES">
      </div>
      <div class="item">
        <label>Assigned to</label>
        <input id="OWNERLOGIN">
      </div>
      <div class="item">
        <label>Date Opened</label>
        <input id="CREATEDDATE">
      </div>
    </div>
    <script>
function fieldChangeHandler(event) {
  console.log("change detected to ", event.srcElement.id);
}
    </script>
  </body>
</html>
```
Before we continue, let's take some time in order to understand what's going on in this page.
The **fieldChangeHandler** function is triggered by the browser whenever a field is changed. We'll be updating it later.
> Note: The form fields are hard-coded. Although not covered in this tutorial, it’s also possible to dynamically generate the form based on the field data. The column Object col has properties that describe its type, length, title, precision, whether it has a choose or a search drop-down and so on (See SDK for full specification).

<a class="anchor-link" name="Installing_Priority_into_your_page"></a>
### Installing Priority into your page
Include the Priority Web SDK library by adding another `<script>` tag above the existing one:
```
<script src="https://cdn.priority-software.com/upgrades/var/api/head/priorityapp.nocache.js"></script>
```
Priority is now installed in your page and ready to use!

<a class="anchor-link" name="Running_Server-Side_Triggers"></a>
### Running Server-Side Triggers
Now, replace the contents of the second `<script>` tag with this:
```javascript
var myForm;

function updateFields(result) {
  if (result["CUSTOMERS"]) {
    var fields = result["CUSTOMERS"][1];
    for (var fieldName in fields) {
      var el = document.getElementById(fieldName);
      if(el) el.value = fields[fieldName];
    }
  }
}

function showMessage(message) {
  if (message.type != "warning") {
    alert(message.message);
  } else {
    if (confirm(message.message)) {
      message.form.warningConfirm(1);
    } else {
      message.form.warningConfirm(0);
    }
  }
}

function fieldChangeHandler(event) {
  myForm.fieldUpdate(event.srcElement.id, event.target.value);
}

function priorityReady() {
  login({
    username: '<username>', password: '<password>', 
    url: '<url>', tabulaini: '<tabula.ini>', 
    language: <language>, company: '<companyName>', appname: 'Customers'})
  .then(function() {
    return formStart('CUSTOMERS', showMessage, updateFields);
  }).then(function(form) {
    myForm = form;
  });
}
```
In the `login` function, change the parameters to a valid user/password and set the rest of the parameters to suit your environment. For the URL parameter, set the URL to your Priority WCF service without the "wcf/wcf/service.svc" part.

This is all you need in order to synchronize between this HTML form and the Priority CUSTOMERS form on the server. See it in action by entering a value into the Customer Name field. When you move the to another field, you'll notice that all the fields have been populated. Moving to another field triggered the "onchange" event which caused Priority to run the server-side POSTINSERT trigger for the updated field. This trigger generates values for the other fields and Priority updated them for you.

Here's how it works:
#### The `priorityReady` function
This function is called by Priority when the SDK has finished loading. Use it as the entry point for your client side logic.

#### The `login` function
Logs in to Priority.

*username* and *password* are a valid Priority username and password in Priority. Typically, these will come from a login form.

#### Promises
Almost all of the functions in the JavaScript library are asynchronous. This is because they execute code on the server. The library utilizes JavaScript Promises in order to assist in correctly working with them.
Make sure to add a `catch()` clause wherever you use promises. In this tutorial we skip this in order to keep the code brief.

#### The `formStart` function
Once initialization and login is done, we create a client-side instance of the Priority **Customers** form. The first function parameter is the name of a Priority form.
The second and third parameters are callbacks for message display and field updates. They will be explained shortly. The final parameter is the company name.
This function is also asynchronous. Once it is resolved, we assign the return value, a form object, to a local variable called myForm. We'll be using this object in order to further interact with this form.

#### Updating fields – the `fieldUpdate` callback
As noted before, the `fieldChangeHandler` listens for changes to the form data. In our example we update it to notify Priority whenever a value was changed. This is done using the `fieldUpdate` function.  Call this function in order to tell Priority to change the value of one of the form’s fields. The function receives the field name and the new value as parameters.

Inserting or updating a field causes the POSTINSERT trigger for that field to run on the server. As a result, other fields may receive values. In order to inform you which fields were updated, the callback you specified in formStart is invoked with a *result* object as a parameter. This object contains the names and values of fields whose values have changed. In our example, if we enter a value into the Customer Name field, the *result* object looks like this:
```JSON
{
   CUSTOMERS:{
      1:{
         CUSTNAME:"T000032",
         CUSTDES:"Acme Inc.",
         STATDES:"Draft",
         OWNERLOGIN:"ng",
         CREATEDDATE:"2017-05-03T00:00:00.000Z",
         CODE: "USD",
         TAXCODE:"001",
         TAXDES:"Sales Tax"
      }
   }
}
```
As you can see, some fields in row #1 of the CUSTOMERS form were updated.

The code in the example reads the new values from the *result* object and updates the relevant fields using the `updateFields` function.

### Saving the Row
After changing values in a row, you must save the row or discard the changes so that all the other users in the system can see it. Here’s how it’s done:

Add the following `div` element with save and discard buttons, just above the first `<script>` tag:
```html
    <div>
      <button onclick="saveHandler()">Save</button>
    </div>
```
Inside the code block, add a handler function for saving changes:
```javascript
function saveHandler() {
  myForm.saveRow(0);
}
```
That’s it! Enter a value in the Customer Name field and hit save. You can verify using the Priority UI that the record was indeed created.

`saveRow` accepts a single parameter which applies only to sub-forms. It indicates whether to exit the sub-form automatically after saving and should be used when your application always closes the form after saving.

> Note: The API also includes an `undo` function for when you need to tell Priority (before saving a row) to revert all changes that were made to the row.

<a class="anchor-link" name="Opening_Choose_Lists"></a>
### Opening Choose Lists
In Priority, Choose fields are special fields that contain a list of possible values. In this step, we’ll retrieve the list of values possible for the STATDES field.
> Note: Since the list might depend on the value of the current field, or any other field, it’s a good idea to get this list from Priority whenever the user indicates that he might want to change its value.

First, add a button that when clicked will retrieve the possible values for the field. Paste this right after the `<input>` elements for STATDES:
```html
        <button onClick="chooseHandler('STATDES')">Get values</button>
```
You can also add a similar button for OWNERLOGIN if you like.

Add the `chooseHandler` function, like this:
```javascript
function chooseHandler(targetField, someObj) {
  var targetValue = document.getElementById(targetField).value;
  myForm.choose(targetField, targetValue).then(function(result) {
    console.log(result);
  });
}
```
The result is an object which is structured as follows:
- The *ChooseLine* object contains the list of possible values for the list.
    - Each value has a retval field which is the text that should be inserted into the input field when the user chooses this value.
    - *string1* and *string2* fields are the code and description of each value. Some fields only have descriptions.
- *title1* and *title2* are the headers of the code and description columns.
- *multi* has value of 1 in case of a multi-choose, or 0 otherwise.

<a class="anchor-link" name="Handling_Server_Messages"></a>
### Handling Server Messages
As mentioned prevously, the `formStart` function receives a function as parameter for handling error and warning messages: `showMessage`.

The API calls this function whenever form errors or warning messages need to be presented.

When the API wants to inform the application that an error occurred, no further action is required after showing the error message. However, if it’s a warning message (not an error), we need to indicate to the API if the user canceled the transaction as a result of the warning, or approved it – meaning that the server should continue running the form triggers.

You can see how this is done in the `showMessage` function.

> The `warningConfirm` function is special because it doesn’t return a Promise. Instead, the API saves the previous onSuccess or onError, and calls them instead.

So if, for example, the warning is received while executing the `fieldUpdate` API function, then after calling `warningConfirm`, the `fieldUpdate` onSuccess will be called.

<a class="anchor-link" name="Actions"></a>
### Actions
In Priority, an *action* is a procedure that runs in the context of the current row in a form.

In this step, we’ll add a simple action for the Customers form - the **Convert Potential Cust to Cust** procedure.

```html5
        <button onClick="convertPotentialCustToCust()">Save Customer</button>
```
```javascript
function convertPotentialCustToCust() {
  myForm.activateStart("MAKECUST", "P")
    .then(function () {
      return myForm.activateEnd();
    });
}
```
`activateStart` starts the procedure. It receives the name of the procedure and the type (P for procedure, R for report).

> The function can optionally be given a progress function which can be used for long activations. The function will be periodically called by the API. See the API documentation for more details.

The `activateStart` function returns a Promise object which is resolved whenever a procedure step requiring user input is reached. See the API documentation for more details. It is also called at the end of the procedure. At this point, the `activateEnd` API function should be called in order to notify the form that the procedure has ended. Then, the form may present a message (and therefore the `onShowMessageFunc` function will be called) and/or ask to update certain fields that have changed by the procedure.

In our example, the Customer number which was a temporary code starting with **T**, is replaced by a permanent code.

<a class="anchor-link" name="Input_Synchronization"></a>
### Input Synchronization

The input in our example may come simultaneously from the user and the server.

For example, the user fills field X and then quickly fills field Y. At the time the user fills field X it also notifies the server about changing the field. The server then activates a trigger that puts value in field Y.

In this case the value the user typed in field Y may be overrun by the value received from the server, or the other way around, the user may overrun the value from the server by mistake.

One approach for avoiding such scenarios may be to wait after field change, and not allow the focus to move to the next field. The disadvantage of this approach is that the user may not notice that the field hasn't received focus yet, and type anyway, in which case the input will be ignored.
