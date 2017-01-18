# QuickSilver examples

Here are more hands on examples using the module in an Episerver QuickSilver demo site.

## Generating the product json 
As specified in the [readme file](./README.md) : the implementation will look for attribute with name *'data-gtmproduct'* and expects the content of the attribute to be serlialized json product data.
The QuickSilver category list page renders _Product.cshtml (with IProductModel as the viewmodel) for each product item in the list.  
Notice the use of **LowercaseContractResolver** to ensure all lower case json. 

Example from _Product.cshtml:
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
	<a href="@Model.Url" class="link--black">
		<!-- .... -->
	</a>
</div>
```

This would typically result in html similar to this:

```html
<!-- a product item in the category list -->
<div class="product" data-gtmproduct="{&quot;id&quot;:&quot;P-38426422&quot;,&quot;name&quot;:&quot;Short Sleeve Crew Tee&quot;,&quot;price&quot;:30.5,&quot;category&quot;:null,&quot;brand&quot;:&quot;Fruit of the Loom&quot;,&quot;variant&quot;:null,&quot;position&quot;:0,&quot;quantity&quot;:0}">
    <a href="/en/fashion/womens/womens-tees/p-38426422/" class="link--black">
        <!-- .... -->
    </a>
</div>
```
