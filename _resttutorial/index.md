---
title: REST Client App Tutorial
methods:
    - Install the OData Client Code Generator
    - Generate the Service Proxy
    - Use the Service Proxy to Call the OData Service
layout: tutorial
collection-title: REST API
collection: resttutorial
---

Based on [`this post`](http://www.asp.net/web-api/overview/odata-support-in-aspnet-web-api/odata-v4/create-an-odata-v4-client-app) by Mike Wasson

In this tutorial, we'll create a .NET client for the Priority OData service.

Start a new instance of Visual Studio and create a new console application project. In the **New Project** dialog, select **Installed** > **Templates** >**Visual C#** > **Windows Desktop**, and select the **Console Application** template. Name the project RESTClient.

![RESTClient Project Creation](https://www.eshbelsaas.co.il/eshbel/primail/201705/18j7j/restclient%20new%20project.png)

<a class="anchor-link" name="Install_the_OData_Client_Code_Generator"></a>
## Install the OData Client Code Generator

From the **Tools** menu, select **Extensions and Updates**. Select **Online** > **Visual Studio Gallery**. In the search box, search for "OData Client Code Generator". Click **Download** to install the VSIX. You might be prompted to restart Visual Studio.

![Install Code Generator](https://www.eshbelsaas.co.il/eshbel/primail/201705/ae94t/install%20code%20generator.png)

<a class="anchor-link" name="Generate_the_Service_Proxy"></a>
## Generate the Service Proxy

The service proxy is a .NET class that defines methods for accessing the OData service. The proxy translates method calls into HTTP requests. You will create the proxy class by running a [`T4 template`](https://msdn.microsoft.com/en-us/library/bb126445.aspx).
Right-click the project. Select **Add** > **New Item**.

In the **Add New Item** dialog, select **Visual C# Items** > **Code** > **OData Client**. Name the template RESTProxy.tt. Click **Add**.

![Generate Service Proxy](https://www.eshbelsaas.co.il/eshbel/primail/201705/vkd07/generate%20service%20proxy.png)


Visual Studio automatically runs the template, but since the template needs some configuration settings you’ll see an error in the Error List tab. You can ignore it.

![Ignore this error](https://www.eshbelsaas.co.il/eshbel/primail/201705/tt6ot/error%20to%20ignore.png)

+   Save the metadata.xml file from your Priority installation ($metadata endpoint) to your local filesystem. 
+   Since the file is too large for the proxy generator to process, remove all of the <code>EntityType</code> and <code>EntitySet</code> elements that are not necessary for your project. For this tutorial I removed:
    +   All <code>EntityType</code> elements except LOGPART.
    +   All of the <code>NavigationProperty</code> elements inside the <code>EntityType</code>.
    +   All <code>EntitySet</code> elements except LOGPART.
+   Open the file RESTProxy.odata.config. In the <code>Parameter</code> element, paste the location of your modified metadata file:

```xml
<Parameter Name="MetadataDocumentUri" Value="C:\\RESTClient\\metadata.xml" />
```

Save the template. Visual Studio will once again automatically run the template, this time without errors.
The result is a code file named RESTProxy.cs that defines the proxy.

![RESTProxy.cs](https://www.eshbelsaas.co.il/eshbel/primail/201705/6e4yx/rest%20proxy_cs.png)

<a class="anchor-link" name="Use_the_Service_Proxy_to_Call_the_OData_Service"></a>
## Use the Service Proxy to Call the OData Service

Open the file Program.cs and replace the boilerplate code with the following.

```
using System;
using System.Linq;
using System.Text;

namespace RESTClient
{
  class Program
  {
    static void Main(string[] args)
    {
      var uri = new Uri("https://localhost:port/");  // Replace with your Service Root URL
      var container = new DefaultContainer(uri);
      container.SendingRequest2 += SendBaseAuthCredsOnTheRequest;

      // Add a new LOGPART
      var product = new LOGPART()
      {
        PARTNAME = "1351-12315",
        PARTDES = "Klipsch HDT-600 Home Theater System"
      };
      container.AddToLOGPART(product);
      var serviceResponse = container.SaveChanges();

      foreach (var operationResponse in serviceResponse)
      {
        Console.WriteLine("Response: {0}", operationResponse.StatusCode);
      }

      // Fetch some LOGPARTs, filtering using the LINQ operators.
      foreach (var p in container.LOGPART.Where(p => p.FAMILYNAME == "001"))
      {
        Console.WriteLine(String.Format("{0}\t{1}", p.PARTNAME, p.PARTDES));
      }
    }

    private static void SendBaseAuthCredsOnTheRequest(object sender, Microsoft.OData.Client.SendingRequest2EventArgs e)
    {
      // Replace with your user/password
      var authHeaderValue = Convert.ToBase64String(Encoding.ASCII.GetBytes("user:password"));  
      e.RequestMessage.SetHeader("Authorization", "Basic " + authHeaderValue);

      // Console.WriteLine("{0} {1}", e.RequestMessage.Method, e.RequestMessage.Url);
    }
  }
}
```

When you run the program, it should output the following:

```
Response: 201
111-001 Sony HT7100DH Home Theater
111-002 Sony HT-DDW790 Home-theater
111-003 Samsung HT-AS720 Home Theater
111-004 The Klegg M6 501 Surround
111-005 Samsung HTTX72 Home Theater
111-006 Sony 2.1 surround
111-007 Kenwood PW612 - Subwoofer and Ampilifier
111-008 Yamaha YAS-70 Front Surround
111-009 Boston Acoustics Horizon MCS100 Surround
111-010 Sony HT-DDW790 Home Theater
111-011 Yamaha YHT-590 Home Theater Surround
111-012 Panasonic Black Blu-ray Disc Theater SCBT100
111-013 Onkyo HT-S790 Home Theater Surround
111-999 Klipsch HDT-600 Home Theater System
```