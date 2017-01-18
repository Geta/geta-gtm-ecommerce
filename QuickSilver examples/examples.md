# QuickSilver examples

Here are more hands on examples using the module in an Episerver QuickSilver demo site.

## Generating the product json 
As specified in the [readme file](../readme.md) : the implementation will look for attribute with name *'data-gtmproduct'* and expects the content of the attribute to be serlialized json product data.
The QuickSilver category list page renders _Product.cshtml (with IProductModel as the viewmodel) for each product item in the list.  

Generating the json object:
```cshtml
@model EPiServer.Reference.Commerce.Site.Features.Shared.Models.IProductModel

@{    

    if (Model == null)
    {
        return;
    }
    var settings = new JsonSerializerSettings();
    settings.ContractResolver = new LowercaseContractResolver();
    var product = new TrackingProduct()
    {
        Id = Model.Code,
        Name = Model.DisplayName,
        Price = Model.DiscountedPrice.GetValueOrDefault().Amount,
        Brand = Model.Brand,
        Category = Model.Category
    };
}

<div class="@productLevelClass"  data-gtmproduct="@JsonConvert.SerializeObject(product,settings)">
	<!-- the html for product display -->
</div>
```

This would typically result in html similar to this:

```html
<!-- a product item in the category list -->

```
