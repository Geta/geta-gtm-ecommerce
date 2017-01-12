# Geta.GTM.Ecommerce

Module for enhanced Ecommerce tracking through Google Tag Manager. 
The enhanced e-commerce tracking is complex and can consist of many different elements. We have therefore created a standard version building on these features: 
-	Add to cart
-	Check out
-	Impressions
-	Product click
-	Products remove from cart
-	All page views



![](http://tc.geta.no/app/rest/builds/buildType:(id:TeamFrederik_EPiTracking_EPiTrackingCommerceCreateAndPublishNuGetPackage)/statusIcon)

## How does it work
The implementation will look for product json in a data attributes. 

### Product impressions 
The implementation will look for attributes with name *'data-gtmproduct'* (name can be configured) and expects the content of the attribute to be serlialized json product data. Here is a sample:

Here is an example:
```c
<div class="product" 
 data-gtmproduct='{"id":"P-38426422","name":"Short Sleeve Crew Tee",
    "price":30.5,"category":null,"brand":"Fruit of the Loom",
    "variant":null,"position":0,"quantity":0}'> 
  <!--  html for a product item -->
 </div
```
## How to get started?

Start by installing NuGet package (use [NuGet](http://nuget.episerver.com/)):

    Install-Package Geta.GTM.Ecommerce

## Setting up Google Tag Manager
Prerequsites: Google Analytics and Google Tag Manager Account.
You can import predefined tags and events following this recipie:  
 1. In GTM, Admin --> Import Container: Choose demo.gtm.container.json as container file
 2. Choose 'Existing' (DefaultWorkspace as Workspace and 'merge')
 3. In GTM, Workspace --> Variables --> Set value for GAUserId to your Google Analytics tracking id.

Here is how the 'Tags' overview should look like.

Note: If you don't want to import, you need to setup the required tags and event your self. 
If you do so, make sure you use the follow event names: 'impressions', 'addToCart', 'removeFromCart', 'checkout', 'productClick'

## Site setup
