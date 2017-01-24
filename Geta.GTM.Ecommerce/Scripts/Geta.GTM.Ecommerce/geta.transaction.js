// GTM tracking of transactions

function GtmTransaction() {

    this.checkIsSent = function (ref) {
        // Prevents double transactions
        // START COOKIE CHECK
        var cookiename = 'gaSaleSent_' + ref;

        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(cookiename + '=') != -1) {
                return true;
            }
        }

        var d = new Date();
        d.setTime(d.getTime() + (90 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cookiename + '=1; ' + expires;

        return false;
        // END COOKIE CHECK
    }
}


GtmTransaction.prototype.track = function (transactionData, products) {

    if (!this.checkIsSent(transactionData.id)) {
        dataLayer.push({
            'event': 'purchase',
            'ecommerce': {
                'purchase': {
                    'actionField': {
                        'id': transactionData.id, // Transaction ID. Required for purchases and refunds.
                        'affiliation': transactionData.affiliation,
                        'revenue': transactionData.total, // Total transaction value (incl. tax and shipping)
                        'tax': transactionData.tax,
                        'shipping': transactionData.shipping,
                        'coupon': transactionData.coupon
                    },
                    'products': products
                }
            }
        });
    }
}

