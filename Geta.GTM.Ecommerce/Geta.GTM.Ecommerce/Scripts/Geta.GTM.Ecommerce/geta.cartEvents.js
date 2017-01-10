$(function () {

    $(".jsAddToCart").click(function () {
        // locate sku code
        var form = $(this).closest("form");
        var skuCode = $("#code", form).val();

        // do api call
        $.ajax({
            url: "/api/tracking/GetTrackingProductModel",
            data: { skuCode: skuCode }
        }).done(function (data) {
            // push data to dataLayer
            if (data) {
                var productItem = data;
                dataLayer.push({
                    'event': 'addToCart',
                    'ecommerce': {
                        'currencyCode': 'NOK',
                        'add': {
                            'products': [{
                                'name': productItem.Name,
                                'id': productItem.Code,
                                'price': '199',
                                'brand': productItem.Brand,
                                'category': productItem.Category,
                                'variant': productItem.Variant,
                                'quantity': 1
                            }]
                        }
                    }
                });
            }
          });
        
    });

    $(".jsRemoveCartItem").click(function () {
        // locate sku code
        var skuCode = 'TODO';

        // do api call
        $.ajax({
            url: "/api/tracking/GetTrackingProductModel",
            data: { skuCode: skuCode }
        }).done(function (data) {
            // push data to dataLayer
            if (data) {
                var productItem = data;
                dataLayer.push({
                    'event': 'removeFromCart',
                    'ecommerce': {
                        'remove': {                               // 'remove' actionFieldObject measures.
                            'products': [{                          //  removing a product to a shopping cart.
                                'name': productItem.Name,
                                'id': productItem.Code,
                                'price': '199',
                                'brand': productItem.Brand,
                                'category': productItem.Category,
                                'variant': productItem.Variant,
                                'quantity': 1
                            }]
                        }
                    }
                });
            }
        });
        
    });
});