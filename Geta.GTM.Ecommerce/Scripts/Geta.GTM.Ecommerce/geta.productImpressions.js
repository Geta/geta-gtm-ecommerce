window.GtmProduct = {
    utils: {}
};

window.GtmProduct.utils.parseDataAttribute = function (element, dataAttributeName) {
    var string = element.getAttribute(dataAttributeName);
    return JSON.parse(string);
}

window.GtmProduct.utils.findData = function (dataAttributeName) {
    var selector = '*[' + dataAttributeName + ']';
    var elements = $(selector);

    var impressions = [];
    for (var i = 0, len = elements.length; i < len; i++) {
        var p = elements[i];
        impressions.push(GtmProduct.utils.parseDataAttribute(p, dataAttributeName));
    }

    return impressions;
}


window.GtmProduct.loadImpressions = function (options) {
    var dataAttributeName = 'data-gtmproduct';
    if (options)
        dataAttributeName = options.dataAttributeName || dataAttributeName;
    var impressions = window.GtmProduct.utils.findData(dataAttributeName);

    var listNameElement = document.querySelector('[data-gtmproduct-list]');
    var listName = listNameElement != null ? listNameElement.getAttribute('data-gtmproduct-list') : '';
    impressions = impressions.map(function (impression, i) {
        impression.position = (i + 1);
        impression.list = listName;
        return impression;
    });

    if (impressions.length > 0) {
        dataLayer.push({
            'event': 'impressions',
            'ecommerce': {
                'currencyCode': options.currencyCode,
                'impressions': impressions
            }
        });
    }
}


window.GtmProduct.addImpressions = function (jsonElements, productCountStart) {
    var impressions = [];
    jsonElements.each(function (i, el) {
        impressions.push(GtmProduct.utils.parseDataAttribute(el, 'data-gtmproduct'));
    });

    impressions = impressions.map(function (impression, i) {
        impression.position = (i + 1 + productCountStart);
        return impression;
    });
}


window.GtmProduct.sendCartEvent = function (options) {
    if (options) {
        options = {
            products: options.products || [],
            eventName: options.eventName || '',
            currencyCode: options.currencyCode || ''
        };

        if (options.eventName == 'addToCart') {
            // add to cart
            dataLayer.push({
                'event': options.eventName,
                'ecommerce': {
                    'currencyCode': options.currencyCode,
                    'add': {
                        'products': options.products
                    }
                }
            });
        } else {
            // remove from cart
            dataLayer.push({
                'event': options.eventName,
                'ecommerce': {
                    'remove': {
                        'products': options.products
                    }
                }
            });
        }


    }
};

