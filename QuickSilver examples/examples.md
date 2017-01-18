# QuickSilver examples

Here are more hands on examples using the module in an Episerver QuickSilver demo site.

## Generating the product json 
As specified in the [readme file](../README.md) : the implementation will look for attribute with name *'data-gtmproduct'* and expects the content of the attribute to be serlialized json product data.
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
<div class="product" data-gtmproduct="{"id":"P-38426422","name":"Short Sleeve Crew Tee",
      "price":30.5,"category":null,"brand":"Fruit of the Loom","variant":null,"position":0,"quantity":0}">
    <a href="/en/fashion/womens/womens-tees/p-38426422/" class="link--black">
        <!-- .... -->
    </a>
</div>
```

## Handling autoscroll and product impressions
The QuickSilver demo site loads more products into a category page using auto scroll functionality. This is handled by the **infinityScroll** function inside Search.js. Below is an example of how you can track the new products fetched from the server, by adding a few lines to Search.js:

```js
 // inside the infinityScroll function, on $.ajax success
 success: function (result) {
                        Search.fetchingNewPage = false;
                        if ($(result).find('.product').length > 0) {
                            var impressionsSent = $("*[data-gtmproduct]").length;

                            $('.jsSearchPage').replaceWith($(result).find('.jsSearchPage'));
                            $('.jsSearch').append($(result).find('.jsSearch').children());
                            $('.jsSearchFacets').replaceWith($(result).find('.jsSearchFacets'));

                            var elements = $(result).find('.jsSearch').children().find('[data-gtmproduct]');
                            if (elements.length > 0) {
                                var tracker = new GtmTrackingProduct();
                                tracker.addImpressions(elements, impressionsSent);
                            }

                        } else {
                            Search.lastPage = true;
                        }
                    }
```
