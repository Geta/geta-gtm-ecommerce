function GtmTrackingProduct() {
    this.gtmProduct_DataAttributeName = 'data-gtmproduct';
    var currencyDataAttributeName = 'data-gtmcurrency';
    var categoryListDataAttributeName = 'data-gtmproduct-list';

    var currencyElement = document.querySelector('[' + currencyDataAttributeName + ']');
    this.currencyCode = currencyElement != null ? currencyElement.getAttribute(currencyDataAttributeName) : '';

    var listNameElement = document.querySelector('[' + categoryListDataAttributeName + ']');
    this.listName = listNameElement != null ? listNameElement.getAttribute(categoryListDataAttributeName) : '';

    this.findData = function () {
        var selector = '*[' + this.gtmProduct_DataAttributeName + ']';
        return this.loadDataFromAttributes($(selector));
    }

    this.loadDataFromAttributes = function (elements) {
        var impressions = [];
        for (var i = 0, len = elements.length; i < len; i++) {
            var p = elements[i];
            impressions.push(this.parseDataAttribute(p, this.gtmProduct_DataAttributeName));
        }

        return impressions;
    }

    this.parseDataAttribute = function (element, attributeName) {
        var string = element.getAttribute(attributeName);
        return JSON.parse(string);
    }

    this.addPositionAndPushData = function (impressions, counter) {
        for (var i = 0, len = impressions.length; i < len; i++) {
            var impr = impressions[i];
            impr.position = (i + 1 + counter);
            impr.list = this.listName;
        }

        if (impressions.length > 0) {
            dataLayer.push({
                'event': 'impressions',
                'ecommerce': {
                    'currencyCode': this.currencyCode,
                    'impressions': impressions
                }
            });
        }

    }

}

GtmTrackingProduct.prototype.loadImpressions = function () {

    var impressions = this.findData();
    this.addPositionAndPushData(impressions, 0);

}

GtmTrackingProduct.prototype.addImpressions = function (newElements, counter) {

    var impressions = [];
    if (newElements.length > 0) {
        impressions = this.loadDataFromAttributes(newElements);
        this.addPositionAndPushData(impressions, counter);
    }
}

GtmTrackingProduct.prototype.sendCartEvent = function (products, eventName) {

    if (products.length > 0) {
        if (eventName == 'addToCart') {
            // add to cart
            dataLayer.push({
                'event': eventName,
                'ecommerce': {
                    'currencyCode': this.currencyCode,
                    'add': {
                        'products': products
                    }
                }
            });
        } else {
            // remove from cart
            dataLayer.push({
                'event': eventName,
                'ecommerce': {
                    'remove': {
                        'products': products
                    }
                }
            });
        }
    }
}
