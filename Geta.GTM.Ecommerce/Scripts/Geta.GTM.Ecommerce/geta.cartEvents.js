$(function () {

    $('.jsAddToCart').click(function () {

        var dataAttributeName = 'data-gtmproductadd';
        
        var product = window.GtmProduct.utils.parseDataAttribute(this, dataAttributeName);

        if (product != null) {
                GtmProduct.sendCartEvent({
                    eventName: 'addToCart',
                    products: [product],
                    currencyCode: 'NOK'
                });    
        }
    });
});