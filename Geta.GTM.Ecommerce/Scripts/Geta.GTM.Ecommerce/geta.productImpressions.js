window.GtmProduct = {
    utils: {}
};

var gtmProduct_DataAttributeName = 'data-gtmproduct';
var gtmProduct_ListDataAttributeName = gtmProduct_DataAttributeName + '-list';
var gtmProduct_CurrencyDataAttributeName = 'data-gtmcurrency';


window.GtmProduct.utils.parseDataAttribute = function (element) {
    var string = element.getAttribute(gtmProduct_DataAttributeName);
    return JSON.parse(string);
}

window.GtmProduct.utils.loadDataFromAttributes = function (elements) {
    var impressions = [];
    for (var i = 0, len = elements.length; i < len; i++) {
        var p = elements[i];
        impressions.push(GtmProduct.utils.parseDataAttribute(p));
    }

    return impressions;
}

window.GtmProduct.utils.findData = function () {
    var selector = '*[' + gtmProduct_DataAttributeName + ']';
    return GtmProduct.utils.loadDataFromAttributes($(selector));
}


window.GtmProduct.loadImpressions = function () {
    var impressions = window.GtmProduct.utils.findData();

    var listNameElement = document.querySelector('['+ gtmProduct_ListDataAttributeName +']');
    var listName = listNameElement != null ? listNameElement.getAttribute(gtmProduct_ListDataAttributeName) : '';

    var currencyElement = document.querySelector('[' + gtmProduct_CurrencyDataAttributeName + ']');
    var currencyCode = currencyElement != null ? currencyElement.getAttribute(gtmProduct_CurrencyDataAttributeName) : '';

    impressions = impressions.map(function (impression, i) {
        impression.position = (i + 1);
        impression.list = listName;
        return impression;
    });

    if (impressions.length > 0) {
        dataLayer.push({
            'event': 'impressions',
            'ecommerce': {
                'currencyCode': currencyCode,
                'impressions': impressions
            }
        });
    }
}


window.GtmProduct.addImpressions = function (newElements, counter) {
    var impressions = [];
    if (newElements.length > 0) {
        impressions = GtmProduct.utils.loadDataFromAttributes(newElements);
        impressions = impressions.map(function (impression, i) {
            impression.position = (i + 1 + counter);
            return impression;
        });

        window.GtmProduct.sendImpressions(impressions, 'NOK');
    }
}

window.GtmProduct.sendImpressions = function (impressions, currencyCode) {
    if (impressions.length > 0) {
        dataLayer.push({
            'event': 'impressions',
            'ecommerce': {
                'currencyCode': currencyCode,
                'impressions': impressions
            }
        });
    }
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

