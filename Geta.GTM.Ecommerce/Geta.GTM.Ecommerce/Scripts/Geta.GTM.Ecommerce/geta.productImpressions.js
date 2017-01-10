$(function () {
    var productImpressions = [];
    var productCards = $("*[data-product='impression']");
    for (var i = 0, len = productCards.length; i < len; i++) {
        var p = productCards[i];
        var id = $(p).find("[data-product-code]").attr('data-product-code');
        var name = $(p).find("[data-product-name]").attr('data-product-name');
        var price = $(p).find("[data-product-price]").attr('data-product-price');
        productImpressions.push(
            {
                'id': id,
                'name': name,
                'price': price,
                'position': (i+1)
            });
    };
    console.log(productImpressions);
    //dataLayer.push({
    //    'event': 'impressions',
    //    'ecommerce': {
    //        'currencyCode': productJson[0].PlacedPrice.Currency.CurrencyCode,
    //        'impressions': productImpressions
    //    }
    //});
});


