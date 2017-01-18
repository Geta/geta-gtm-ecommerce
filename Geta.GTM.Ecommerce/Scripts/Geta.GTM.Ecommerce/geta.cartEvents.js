$(function () {

    $('.jsAddToCart').click(function () {

        var dataAttributeName = 'data-gtmproductadd';
        
        var tracker = new GtmTrackingProduct();
        var product = tracker.parseDataAttribute(this, dataAttributeName);

        if (product != null) {

            tracker.sendCartEvent([product], "addToCart");
        }
    });
});