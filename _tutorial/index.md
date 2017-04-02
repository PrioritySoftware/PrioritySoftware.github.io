---
title: Tutorial
methods:
    - Login and formstart
    - Updating fields
    - Opening Choose list
    - Saving the row
    - Handling Errors/Warnings
    - Direct activations
layout: tutorial
---
# Priority Tutorial

<a name="Login_and_formstart"></a>
### Login and formstart

Create a Html or JavaScript file.
Include the API Library by adding a script tag:
```js
<script src="https://PrioritySoftware.github.io/api/priorityapp/priorityapp.nocache.js"></script>
```
Add a function named priorityReady. This function is the entry point and will be called when the API library has finished loading.
```js
<script>      
function priorityReady() {
}
</script>
```
Now, Let's login to Priority and start the Customers form.
```js
<script>      
    	
var myForm;

function priorityReady() {

   login({
           url: 'url',
           tabulaini: 'tabulaini',
           language : 3,
           username: 'UserName',
           password: 'Password',
           appname:'',
           devicename:'MyPhoneName'
        }    
    ).then(
        function () 
        {
            formStart('CUSTOMERS', onShowMessageFunc,updateFieldsFunc, 'demo').
            then(
               function (form) 
               {
                  myForm = form;
                  drawForm(myForm);
               }
           );
        }
    )
    .catch(
       function (error, isFatal) 
       {
          console.log('An error occured: ' + error);
       }
    );
}

</script>
```
login loads the configuration file, and logins to Priority.
UserName and Password are the user name and password in Priority.
The next two parameters can be used for further identification such as Name of device from which the login was made.

After initialization and login is done, we can easily start the Customers form by calling
formStart('CUSTOMERS', onShowMessageFunc, updateFieldsFunc, 'demo');

onShowMessageFunc and updateFieldsFunc are handler function for handling form Error and Warning messages and fields updates. They will be explained later.
'demo' is the name of the company in Priority in which the form should be run.
Drawing the form

Now, let's draw the form fields using the form's data we received in the response.
Add the container div that will contain the form fields

```
<body>
    <div id="container/>
</body>
```

Add the drawForm(myForm) function:
```js
function addInputField(container, col) {

    var mainDiv = document.createElement("div");
    mainDiv.className = "itemStyle";
    var label = document.createElement("label");
    label.innerText = col.title;
    label.className = "labelStyle";
    mainDiv.appendChild(label);
    var input = document.createElement("input");
    input.id = "input_" + col.name;
    input.name = col.name;
    input.type = "text";
    input.maxLength = col.maxLength;
    input.className = "inputStyle";
    input.onchange = FieldChange;
    mainDiv.appendChild(input);
    if (col.zoom == "Choose") {
        var img = document.createElement("img");
        img.src = "drop-down.png";
        img.className = "imgStyle";
 img.onclick = ChooseClicked;
 img.name = col.name;
        mainDiv.appendChild(img);
    }
    container.appendChild(mainDiv);
}

function drawForm() {

    var container = document.getElementById("container");
    for (var col in myForm.columns) {
        addInputField(container, myForm.columns[col]);
    }
}
```
And some styles:
```
<style>
        .itemStyle {
            margin: 20px 10px 20px 10px;
        }

        .inputStyle {
            width: 200px;
            height: 30px;
            font-size: 16px;
        }

        .imgStyle {
            height: 35px;
            position: absolute;
        }

        .labelStyle {
            font-size: 16px;
            display: inline-block;
            width: 150px;
}
</style>
```
The column Object col has properties that describe its type, length, title, precision, whether it has a choose or a search drop-down etc. (See API for full specification).

After putting it all together and entering the page we can see the created form:

 
<a name="Updating_fields"></a>
### Updating fields

The next step is to handle field updates.

After inserting or updating value in a field, other fields may be automatically filled or changed.
In out example we listen to change events from our input fields. Let's write a handler function for the change event:

```js
function fieldChange(event) {

    var input = event.target;
    myForm.fieldUpdate (input.name, input.value)
    .then(
        function (result) {
            updateFields(result);
        }
    )
    .catch(
        function (error, isFatal) {
            console.log('An error occured: ' + error);
        }
    );
}
```

In the above code we call the API's fieldUpdate function and pass it the field's name and value.

The response is an Object that contains other fields that should be updated and their values.

For example, After writing a new customer "New Test" we will get the response:
 

As you can see all fields in CUSTOMERS form in row no 1 were updated.
We need to write code that reads the new values and puts them in the right fields:

```js
function updateFields(result) {
    if (result["CUSTOMERS"]) {
        for (var field in result["CUSTOMERS"][currow]) {
            var input = document.getElementById("input_" + field);
            if (input) {
                input.value = result["CUSTOMERS"][currow][field];
	     }
        }
    }
} 
```

<a name="Opening_Choose_list"></a>
### Opening Choose list

The next step is to open a Choose list (Choose is a drop down in Priority that shows a list of possible values for the field). We will see how to call the server and receive this list.
Note that this list may change according to current value of the field or other fields, so we need to ask the server for the list each time the user opens it.
```js
function chooseClicked(event) {

    var img = event.target;
    var input = document.getElementById("input_" + img.name);
    myForm.choose (input.name, input.value)
    .then(
        function (result) {
     showChoose(result);
}
    ).catch(
        function (error, isFatal) {
            console.log('An error occured: ' + error);
        }
    );
}
```
The result is an Object that contains the Choose list. For example, after clicking the Choose button next to the Status field, we receive a response that looks like this:
 
ChooseLine Object contain the list of values. Each value has retval field. This is the text that should be inserted into the input field when the user chooses this value.
str1 and str2 fields are the code and description of each value (In the case of the Status field we have only description).
title1 and title2 are the headers of code and description columns.
multi has value of 1 in case of a multi choose, or 0 otherwise.
(chooseid is an internal id and can be ignored).

<a name="Saving_the_row"></a>
### Saving the row

After changing values in a row, you must save the row or discard the changes.
Add a div with save/discard buttons:
```
<div>
    <button onclick="saveRow()">Save</button>
    <button onclick="discardRow()">Discard changes</button>
</div>
```
Add handler functions for saving/discarding changes:
```js
function saveRow() {
    myForm.saveRow (0)
    .then(
        function (result) {
            updateFields(result);
        }
    ).catch(
        function (error, isFatal) {
            console.log('An error occured: ' + error);
        }
    )
}

function discardRow() {
    myForm.undo ()
    .then(
        function (result) {
            updateFields(result);
        }
    ).catch(
        function (error, isFatal) {
            console.log('An error occured: ' + error);
        }
    )
}
```

saveRowAsync has one parameter that indicates whether to exit automatically the sub-form after saving. It applies only to sub forms, and should be used when your application always closes the form after saving. 

<a name="Handling_Errors/Warnings"></a>
### Handling Errors/Warnings

As mentioned above, the formStart function receives two functions as parameters for handling error and warning messages:
onShowMessageFunc and updateFieldsFunc.
The API calls these functions whenever the form wants to present error or warning messages(onShowMessageFunc) or update fields(updateFieldsFunc).
Here is the simple implementation for both functions:
```js
function onShowMessageFunc(messagetype, message) {            
    if (messagetype == "error") {
        alert(message);
    }
    else if (confirm(message)) {
        myForm.warningApproved(
     function (error, isFatal) {
         console.log('An error occured: ' + error);
            }
        );
    }
}

function updateFieldsFunc(result) {
    updateFields(result);
}
```
When an error is shown we don't need to notify the server after the user approves the error message. 

But when a warning is shown, and the user confirms the warning, we need to tell the server to continue running the form triggers.

To do this we call the warningApproved function.

This function is a special function which doesn't have a Promise. The API saves the previous onSuccess, and calls it instead.
So if, for example, the warning is received after calling fieldUpdate API function, then after calling warningApproved, the fieldUpdate onSuccess will be called.

It is possible that the form wants to present an Error or warning, and update field values at the same time. 
The updateFieldsFunc function is used to update the fields.


<a name="Direct_activations"></a>
### Direct activations

Direct activation is a Procedure that runs in the context of the current row in a form.
We will see an example of running a simple direct activation that doesn't require any input.
The direct activation we will use in our example is the Convert Potential Cust to Cust Procedure that runs from the Customers form.
```js
function convertPotentialCustToCust() {

    myForm.activateStart("MAKECUST", "P", onProgressFunc)               
    .then(
        function (result) {
            //Here you should place code to handle all possible Procedure 
            //steps.
            //For example: input, new report dialog etc.
            //See API for more details
                    
            return myForm.activateEnd ();                    
 }
    ).then(
        function (result) {
            updateFields(result);
        }
    ).catch(
        function (error, isFatal) {
            console.log('An error occured: ' + error);
        }
    )
}
```
activateStart starts the procedure. It receives the name of the procedure, the type (P for procedure, R for report), and a function to handle progress.
function onProgressFunc(proc, percent)

The progress function is called usually when a procedure runs a program that takes long time to execute. The function receives the procedure object and the percentage of the progress.
activateEnd API function should be called when the procedure ends. It notifies the form that the procedure has ended. 

Then, the form may present a message (and therefore the onShowMessageFunc) and/or ask to update certain fields that have changed by the procedure.
In our example, the Customer number which was a temporary code starting with T, is replaced by a permanent code.

One approach to input synchronization

The input in the example we build, may come simultaneously from the user and the server.
For example, the user fills field X and then quickly fills field Y. At the time the user fills field X it also notifies the server about changing the field. The server then activates a trigger that puts value in field Y.
In this case the value the user typed in field Y may be overrun by the value received from the server, or the other way around, the user may overrun the value came from the server by mistake.
One approach for avoiding such scenarios may be to wait after field change, and not allow the focus to move to the next field. The disadvantage of this approach is that the user may not notice that the field hasn't receive focus yet, and type anyway, in which case the input will be ignored.
In the following section we will see a simple implementation to this approach.
We will mark all input fields as read-only, and bring focus to a field when the user clicks it. If clicking a field caused a change event of another field, we will wait until the server finishes handling the change, and then pass the focus to the clicked field. 
Add two global variables 
var fieldChanging = false;
var lastClickedInput = null;

when inserting the input field add the following lines (in bold):
```js
function addInputField(container, col) {

    var mainDiv = document.createElement("div");
    mainDiv.className = "itemStyle";
    var label = document.createElement("label");
    label.innerText = col.title;
    label.className = "labelStyle";
    mainDiv.appendChild(label);
    var input = document.createElement("input");
    input.id = "input_" + col.name;
    input.name = col.name;
    input.type = "text";
    input.maxLength = col.maxLength;
    input.className = "inputStyle";
    input.onchange = FieldChange;
    input.readOnly = true; 
    input.onclick = inputClicked; 
    input.onblur = inputBlur; 
    mainDiv.appendChild(input);
    if (col.zoom == "Choose") {
        var img = document.createElement("img");
        img.src = "drop-down.png";
        img.className = "imgStyle";
 img.onclick = ChooseClicked;
 img.name = col.name;
        mainDiv.appendChild(img);
    }
    container.appendChild(mainDiv);
}

Add functions to handle click and blur event on the field:
function inputFocus(input) {            
    input.readOnly = false;
    input.focus();
    input.select();
    lastClickedInput = null;
}

function inputClicked(event) {
    if (fieldChanging) {
        lastClickedInput = event.target;
    }
    else {
        inputFocus(event.target);                                
    }
}

function inputBlur(event) {
    event.target.readOnly = true;
}
```

Change fieldChange function to move foucs to the last clicked field, after all fields were updated by the server response  (in bold):
```js
function fieldChange(event) {

    fieldChanging = true;
    var input = event.target;
    myForm.fieldUpdate (input.name, input.value)
    .then(
        function (result) {
            fieldChanging = false;
            updateFields(result);
            if (lastClickedInput != null) {                    
                inputFocus(lastClickedInput);
            }
        }
    )
    .catch(
        function (error, isFatal) {
            fieldChanging = false;
            if (lastClickedInput != null) {
                inputFocus(lastClickedInput);                                           
            }
            console.log('An error occured: ' + error);
        }
    );
}
```
On error/warning initialize the global variables (in bold):
```js
function onShowMessageFunc(messagetype, message) {            

    fieldChanging = false;
    lastClickedInput = null;
    if (messagetype == "error") {
        alert(message);
    }
    else if (confirm(message)) {
        myForm.warningApproved(
     function (error, isFatal) {
         console.log('An error occured: ' + error);
            }
        );
    }
}
```
<br>
<br>