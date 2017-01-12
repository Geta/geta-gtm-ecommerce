window.GtmProduct = {
    utils: {}
};

window.GtmProduct.utils.parseDataAttribute = function (element, dataAttributeName) {
    var string = element.getAttribute(dataAttributeName);
    return JSON.parse(string);
}

window.GtmProduct.utils.getData = function (dataAttributeName) {
    var selector = '[' + dataAttributeName + ']';
    var elements = [].slice.call(document.querySelectorAll(selector));
    return elements.map(function (element) {
        return GtmProduct.utils.parseDataAttribute(element, dataAttributeName);
    });
}


window.GtmProduct.addImpressions = function (options) {
    var dataAttributeName = options.dataAttributeName || 'data-gtmproduct';
    var impressions = window.GtmProduct.utils.getData(dataAttributeName);

    var listNameElement = document.querySelector('[data-gtmproduct-list]');
    var listName = listNameElement != null ? listNameElement.getAttribute('data-gtmproduct-list') : '';
    impressions = impressions.map(function(impression, i) {
        impression.position = (i + 1);
        impression.list = listName;
        return impression;
    });
    dataLayer.push({
        'event': 'impressions',
        'ecommerce': {
            'currencyCode': options.currencyCode,
            'impressions': impressions
        }
    });
}



window.GtmProduct.CartEvent = function (options) {
    options = {
        currencyCode: options.currencyCode || '',
        products: options.products || [],
        eventName: options.eventName || ''
    };

    dataLayer.push({
        'event': options.eventName,
        'ecommerce': {
            'currencyCode': options.currencyCode,
            'add': {
                'products': options.products
            }
        }
    });
};

