$(function () {

    $('[data-gtmcartItem]').click(function (event) {

        var data = GtmProduct.utils.parseDataAttribute(event.currentTarget, 'data-gtmproduct-addToCart');
        data.quantity = 1;

        GtmProduct.CartEvent({
            currencyCode: 'nok',
            products: data,
            eventName: 'addToCart'
        });

    });
});