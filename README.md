# Geta.GTM.Ecommerce

Module for enhanced Ecommerce tracking through Google Tag Manager. 
The enhanced e-commerce tracking is complex and can consist of many different elements. We have therefore created a standard version building on these features: 
-	Impressions
-	Add to cart
-   Remove from cart
-	Check out
-	Product click

![](http://tc.geta.no/app/rest/builds/buildType:(id:TeamFrederik_EPiTracking_EPiTrackingCommerceCreateAndPublishNuGetPackage)/statusIcon)

## Installation - How to get started?

Start by installing NuGet package (use [NuGet](http://nuget.episerver.com/)):

    Install-Package Geta.GTM.Ecommerce
    
Step two is to add two partials to your Layout file (see details below). These partials wraps the two js-sections described in [Google's Quick Start Guide](https://developers.google.com/tag-manager/quickstart). Make sure you replace **GTM-XXXXXXX** with your Google Tag Manger code (container id).

```C#
<!-- Add the following as close to the opening <head> tag as possible, replacing GTM-XXXX with your container ID -->
@Html.Partial("_GoogleTagManagerStart", "GTM-XXXXXXX")
```

```C#
<!-- Add the following immediately after the opening <body> tag, replacing GTM-XXXX with your container ID. -->
@Html.Partial("_GoogleTagManagerNoScript", "GTM-XXXXXXX")
```
    
Next step is to add the following at the bottom of your layout file (after jquery): 
```html
<script src="~/Scripts/Geta.GTM.Ecommerce/geta.cartEvents.js"></script>
<script src="~/Scripts/Geta.GTM.Ecommerce/geta.productImpressions.js"></script>
```


## How does it work
The implementation picks up product data by reading certain data attributes in the html. This way the module can be reused for different view model and view technologies (Razor view, Angular, React etc..)

### Product impressions 
The implementation will look for attribute with name **data-gtmproduct** and expects the content of the attribute to be serlialized json product data.
Refer to [Google developer documentation] (https://developers.google.com/analytics/devguides/collection/analyticsjs/enhanced-ecommerce#ecommerce-data) for details about the different fields.

Here is an example:
```json
{"id":"P-38426422", 
 "name":"Short Sleeve Crew Tee",
 "price":30.5,
 "category":null,
 "brand":"Fruit of the Loom",
 "variant":null,
 "position":0,
 "quantity":0}
```

In addition, the implementation will look for two more attributes: **data-gtmcurrency** and **data-gtmproduct-list**:

```html
<!-- the selected currency -->
<div data-gtmcurrency="NOK">
```
```html
<!-- the current list category name -->
<h1 data-gtmproduct-list="Womens">Womens</h1>
```
By default, products visible on page load are sent as impressions to google. If you add more items, typically through auto-scroll or paging functionality you can call the **addImpressions** util method. 
```js
 var tracker = new GtmTrackingProduct();
 tracker.addImpressions(newElements, counter); 
```
The method has two parameters:

**newElements** - typically a selection of elements with data-gtmproduct 
```js
 var newElements = $(result).find('[data-gtmproduct]');
```
 **counter** - nr of products already visible on the page (previously sent)
```js
 var counter = $("*[data-gtmproduct]").length;
```


## Setting up Google Tag Manager
Prerequsites: Google Analytics and Google Tag Manager Account.
You can import predefined tags and events following this recipie:  
 1. In GTM, Admin --> Import Container: Choose demo.gtm.container.json as container file
 2. Choose 'Existing' (DefaultWorkspace as Workspace and 'merge')
 3. In GTM, Workspace --> Variables --> Set value for GAUserId to your Google Analytics tracking id.

Here is how the 'Tags' overview should look like.

Note: If you don't want to import, you need to setup the required tags and event your self. 
If you do so, make sure you use the follow event names: 'impressions', 'addToCart', 'removeFromCart', 'checkout', 'productClick'


