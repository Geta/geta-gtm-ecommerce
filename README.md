# Geta.GTM.Ecommerce

Module for enhanced Ecommerce tracking through Google Tag Manager. 
The enhanced e-commerce tracking is complex and can consist of many different elements. We have therefore created a standard version building on these features: 
-	Add to cart
-	Check out
-	Impressions
-	Product click
-	Products remove from cart
-	All page views

See ##GTM Setup for 
 

![](http://tc.geta.no/app/rest/builds/buildType:(id:TeamFrederik_EPiTracking_EPiTrackingCommerceCreateAndPublishNuGetPackage)/statusIcon)


## GTM Setup
Prerequsites: Google Analytics and Google Tag Manager Account.
You can import predefined tags and events following this recipie:  
1) In GTM, Admin --> Import Container: Choose demo.gtm.container.json as container file
2) Choose 'Existing' (Default Workspace as Workspace and 'merge'
3) In GTM, Workspace --> Variables --> Set value for GAUserId to your Google Analytics tracking id.

Here is how the 'Tags' overview should look like.

Note: If you don't want to import, you need to setup the required tags and event your self. 

## Site setup
