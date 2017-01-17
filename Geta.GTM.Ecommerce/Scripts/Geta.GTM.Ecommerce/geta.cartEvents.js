$(function () {

    $('.jsAddToCart').click(function () {

        var dataAttributeName = 'data-gtmproductadd';
        
        var tracker = new GtmTrackingProduct();
        var product = tracker.parseDataAttribute(this, dataAttributeName);

        if (product != null) {
            console.log('before add to cart : ' + product);

            tracker.sendCartEvent([product], "addToCart");
        }
    });
});