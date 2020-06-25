/*
* A Promised NodeJS Module for connecting with the HotBit.io Restful API
*
* Note:  Pass all market symbols as: ETH_BTC
*/

const request = require("request");
const Big = require('big.js');
const crypto = require("crypto");
const querystring = require("querystring"); 

var hotbitApi = /** @class */ (function () 
{

    function hotbitApi(apiKey = null, apiSecret = null, apiURL) 
    {
        if (apiURL === void 0)
            this.apiURL = 'https://api.hotbit.io/api/v1';
        else
            this.apiURL = apiURL;
        
        this.api_key = apiKey;
        this.sign = apiSecret;

        return this;
    }
    
    hotbitApi.prototype.getApiUrl = function ()
    {
    
        return this.apiURL;
    
    };
    
    ////
    //  Public  (Key & Secret Not Required)

//OK
    hotbitApi.prototype.getSymbols = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/market.list', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result);
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.getSymbol = function (symbol)
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/market.list', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }

                var apiresp = {};

                for (i = 0; i < body.result.length; i++)
                {

                    if (body.result[i].name == symbol.replace("_", ""))
                    {

                        apiresp = body.result[i];

                    }

                }
                
                resolve(apiresp);
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.getCurrencies = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/asset.list', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result);
                                                        
            });
            
        });

    }
    
// OK
    hotbitApi.prototype.getCurrency = function (currency)
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/asset.list', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                var apiresp = {};

                for (i = 0; i < body.result.length; i++)
                {

                    if (body.result[i].name == currency)
                    {

                        apiresp = body.result[i];

                    }

                }
                
                resolve(apiresp);
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.getTickers = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/allticker', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }

                resolve(body.ticker);
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.getTicker = function (symbol)
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/allticker', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }

                var apiresp = {};

                for (i = 0; i < body.ticker.length; i++ )
                {

                    let thisitem = body.ticker[i];

                    if (thisitem.symbol == symbol)
                    {
                        apiresp = thisitem;
                    }

                }
                
                resolve(apiresp);
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.getTrades = function (symbol)
    {

        symbol = symbol.replace("_", "/");

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/market.deals?market=' + symbol + '&limit=50&last_id=1', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result);
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.getOrderBook = function (symbol)
    {

        symbol = symbol.replace("_", "/");

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/order.book?market=' + symbol + '&side=1&offset=0&limit=30', {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }

                var sellorders = body.result.orders;

                request.get(this.apiURL + '/order.book?market=' + symbol + '&side=2&offset=0&limit=30', {json:true}, function (error, response, body2)
                {
    
                    if (error) {
                        reject(error); return;
                    }

                    var buyorders = body2.result.orders;
                    
                    resolve({sell: sellorders, buy: buyorders});
                                                            
                });
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.getCandles = function (symbol, starttime, endtime, interval)
    {

        symbol = symbol.replace("_", "/");

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/market.kline?market=' + symbol + '&start_time=' + startime + '&end_time=' + endtime + '&interval=' + interval, {json:true}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result);
                                                        
            });
            
        });

    }
    
    ////
    //  Private API  (apiKey & apiSecret are REQUIRED)
    
    // Trading
    /* N/A
    hotbitApi.prototype.getOrders = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/order', {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }
    */

// OK
    hotbitApi.prototype.getMarketOrders = function (symbol)
    {

        return new Promise((resolve, reject) => {

            symbol = symbol.replace("_", "/");

            var postbody = 'api_key=' + this.api_key + '&sign=' + this.sign + '&market=' + symbol + '&offset=0&limit=100';
        
            request.post(this.apiURL + '/order.pending', {json:true, form: postbody}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result.records);
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.createOrder = function (symbol, side, amount, price)
    {

        var postbody = {
            api_key: this.api_key,
            sign: this.sign,
            market: symbol.replace("_", "/"),
            side: (side.toLowerCase() == 'sell'?1:2),
            amount: Big(amount).toFixed(8),
            price: Big(price).toFixed(10),
            isfee: 0
        };

        var postbody = 'api_key=' + this.api_key + '&sign=' + this.sign + '&market=' + symbol + '&offset=0&limit=100';

        
        return new Promise((resolve, reject) => {
        
            request.post(this.apiURL + '/order.put_limit', {json:true, form: postbody}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result);
                                                        
            });
            
        });

    }

    /* N/A
    hotbitApi.prototype.cancelAllOrders = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.delete(this.apiURL + '/order', {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }
    */

// OK
    hotbitApi.prototype.cancelAllMarketOrders = function (symbol)
    {

        return new Promise((resolve, reject) => {
            
            symbol = symbol.replace("_", "/");

            var postbody = 'api_key=' + this.api_key + '&sign=' + this.sign + '&market=' + symbol + '&offset=0&limit=100';
        
            request.post(this.apiURL + '/order.pending', {json:true, form: postbody}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                for (i = 0; i < body.result.records.length; i++)
                {

                    var orderdata = body.result.records[i];

                    var cpostbody = 'api_key=' + this.api_key + '&sign=' + this.sign + '&market=' + symbol + '&order_id=' + orderdata.id;

                    request.post(this.apiURL + '/order.cancel', {json:true, form: cpostbody}, function (error, response, body2) {});

                }
                resolve(true);
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.getOrderById = function (symbol, clientOrderId)
    {

        symbol = symbol.replace("_", "/");

        return new Promise((resolve, reject) => {

            var postbody = 'api_key=' + this.api_key + '&sign=' + this.sign + '&market=' + symbol + '&offset=0&limit=100';
        
            request.post(this.apiURL + '/order.pending', {json:true, form: postbody}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }

                for (i = 0; i < body.result.length; i++)
                {
                    if (body.result[i].id == clientOrderId)
                    {

                        resolve(body.result[i]);
                        return;

                    }


                }
                        
                var postbody2 = 'api_key=' + this.api_key + '&sign=' + this.sign + '&market=' + symbol + '&start_time=0&end_time=1999999999&offset=0&limit=100&side=1';

                request.post(this.apiURL + '/order.finished', {json:true, form: postbody}, function (error, response, body2)
                {
    
                    if (error) {
                        reject(error); return;
                    }
                    
                    for (i = 0; i < body2.result.length; i++)
                    {
                        if (body2.result[i].id == clientOrderId)
                        {
    
                            resolve(body2.result[i]);
                            return;
    
                        }
    
    
                    }

                    var postbody3 = 'api_key=' + this.api_key + '&sign=' + this.sign + '&market=' + symbol + '&start_time=0&end_time=1999999999&offset=0&limit=100&side=2';

                    request.post(this.apiURL + '/order.finished', {json:true, form: postbody}, function (error, response, body3)
                    {
        
                        if (error) {
                            reject(error); return;
                        }
                        
                        for (i = 0; i < body3.result.length; i++)
                        {
                            if (body3.result[i].id == clientOrderId)
                            {
        
                                resolve(body3.result[i]);
                                return;
        
                            }
        
        
                        }

                        resolve({});
                                                                
                    });
                                                            
                });
                                                        
            });
            
        });

    }

// OK
    hotbitApi.prototype.cancelOrderById = function (symbol, clientOrderId)
    {

        return new Promise((resolve, reject) => {

            symbol = symbol.replace("_", "/");

            var postbody = 'api_key=' + this.api_key + '&sign=' + this.sign + '&market=' + symbol + '&order_id=' + clientOrderId;

            request.post(this.apiURL + '/order.cancel', {json:true, form: postbody}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result);
                                                        
            });
            
        });

    }
    
    /*
    hotbitApi.prototype.getTradingBalances = function ()
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/trading/balance', {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }
    */

    /* N/A
    hotbitApi.prototype.getTradingFee = function (symbol)
    {

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/trading/fee/' + symbol, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }    
    */

    // Trading History
    
    hotbitApi.prototype.getTradeHistory = function (symbol = null, sort = 'DESC', by = 'timestamp', from = null, till = null, limit = 100, offset = 0)
    {

        var querystring = "";
        
        if (symbol !== undefined && symbol != null) querystring += 'symbol=' + symbol + "&";
        if (sort !== undefined && sort != null) querystring += 'sort=' + sort + "&";
        if (by !== undefined && by != null) querystring += 'by=' + by + "&";
        if (from !== undefined && from != null) querystring += 'from=' + from + "&";
        if (till !== undefined && till != null) querystring += 'till=' + till + "&";
        if (limit !== undefined && limit != null) querystring += 'limit=' + limit + "&";
        if (offset !== undefined && offset != null) querystring += 'offset=' + offset + "&";

        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/history/trades?' + querystring, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  

    hotbitApi.prototype.getOrderHistory = function (symbol = null, historytype = 'filled', sort = 'DESC', by = 'timestamp', from = null, till = null, limit = 100, offset = 0, clientOrderId = null)
    {

        var querystring = "";
        
        if (symbol !== undefined && symbol != null) querystring += 'symbol=' + symbol + "&";
        if (sort !== undefined && sort != null) querystring += 'sort=' + sort + "&";
        if (by !== undefined && by != null) querystring += 'by=' + by + "&";
        if (from !== undefined && from != null) querystring += 'from=' + from + "&";
        if (till !== undefined && till != null) querystring += 'till=' + till + "&";
        if (limit !== undefined && limit != null) querystring += 'limit=' + limit + "&";
        if (offset !== undefined && offset != null) querystring += 'offset=' + offset + "&";
        if (clientOrderId !== undefined && clientOrderId != null) querystring += 'clientOrderId=' + clientOrderId + "&";
        if (historytype !== undefined && historytype != null) querystring += 'historytype=' + historytype + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/history/trades?' + querystring, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  

// OK
    hotbitApi.prototype.getTradesByOrderId = function (orderId)
    {

        return new Promise((resolve, reject) => {

            var postbody = 'api_key=' + this.api_key + '&sign=' + this.sign + '&order_id=' + orderId + '&offset=0&limit=100';
        
            request.post(this.apiURL + '/order.deals/', {json:true, form: postbody}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result.records);
                                                        
            });
            
        });

    } 
    
    // Account

// OK
    hotbitApi.prototype.getAccountBalances = function (assets)
    {

        return new Promise((resolve, reject) => {

            var qs1 = 'api_key=' + this.api_key + '&assets=' + assets;

            var qs2 = qs1 + '&secret_key=' + this.sign;

            var hash = crypto.createHash('md5').update(qs2).digest('hex').toUpperCase();

            var postbody = qs1 + '&sign=' + hash

            console.log(postbody);

            request.post(this.apiURL + '/balance.query', {json:true, form: postbody}, function (error, response, body)
            {

                console.log(body);

                if (error) {
                    reject(error); return;
                }
                
                resolve(body.result);
                                                        
            });
            
        });

    }

    /* N/A
    hotbitApi.prototype.getTransactionHistory = function (currency = null, sort = 'DESC', by = 'timestamp', from = null, till = null, limit = 100, offset = 0)
    {

        var querystring = "";
        
        if (currency !== undefined && currency != null) querystring += 'currency=' + currency + "&";
        if (sort !== undefined && sort != null) querystring += 'sort=' + sort + "&";
        if (by !== undefined && by != null) querystring += 'by=' + by + "&";
        if (from !== undefined && from != null) querystring += 'from=' + from + "&";
        if (till !== undefined && till != null) querystring += 'till=' + till + "&";
        if (limit !== undefined && limit != null) querystring += 'limit=' + limit + "&";
        if (offset !== undefined && offset != null) querystring += 'offset=' + offset + "&";
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/account/transactions?' + querystring, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  
    
    hotbitApi.prototype.getTransactionByTransactionId = function (transactionid)
    {
        
        return new Promise((resolve, reject) => {
        
            request.get(this.apiURL + '/account/transactions/' + transactionid, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  
    
    hotbitApi.prototype.accountWithdraw = function (currency = null, amount = 0, address = null, paymentId = null, includeFee = false, autoCommit = false)
    {
        
        return new Promise((resolve, reject) => {
            
            var body = {};
            if (currency !== undefined && currency != null) body.currency = currency;
            if (amount !== undefined && amount != null) body.amount = amount;
            if (address !== undefined && address != null) body.address = address;
            if (paymentId !== undefined && paymentId != null) body.paymentId = paymentId;
            if (includeFee !== undefined && includeFee != null) body.includeFee = includeFee;
            if (autoCommit !== undefined && autoCommit != null) body.autoCommit = autoCommit;
        
            request.post(this.apiURL + '/account/crypto/withdraw', {json:true, headers:{"Authorization" : this.auth}, body:body}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  
    
    hotbitApi.prototype.commitWithdraw = function (withdrawId = null, confirmCode = null)
    {
        
        return new Promise((resolve, reject) => {
            
            var body = {};
            if (confirmCode !== undefined && confirmCode != null) body.confirmCode = confirmCode;
        
            request.put(this.apiURL + '/account/crypto/withdraw/' + withdrawId, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  

    hotbitApi.prototype.cancelWithdraw = function (withdrawId = null)
    {
        
        return new Promise((resolve, reject) => {
            
            request.delete(this.apiURL + '/account/crypto/withdraw/' + withdrawId, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  
    
    hotbitApi.prototype.getDepositAddress = function (currency = null)
    {
        
        return new Promise((resolve, reject) => {
            
            request.get(this.apiURL + '/account/crypto/address/' + currency, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  
    
    hotbitApi.prototype.getNewDepositAddress = function (currency = null)
    {
        
        return new Promise((resolve, reject) => {
            
            request.post(this.apiURL + '/account/crypto/address/' + currency, {json:true, headers:{"Authorization" : this.auth}}, function (error, response, body)
            {

                if (error) {
                    reject(error); return;
                }
                
                resolve(body);
                                                        
            });
            
        });

    }  
    */

    return hotbitApi;
    
}());

exports.default = hotbitApi;
