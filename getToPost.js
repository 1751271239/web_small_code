
    var urlFront =  'http://10.10.10.10:18600' + '/query/list' ;//url前缀
    var url ;//完整的带参数url
    var param = {};//参数
    var result;//解析url后得到的参数
    /**
     * 判断是否是JSON 字符串
     * @param str
     * @returns {boolean}
     */
    function isJson(str) {
        if(typeof str == 'string'){
            try{
                var obj = JSON.parse(str);
                if(typeof obj == 'object' && obj){
                    return true;
                }else{
                    return false;
                }
            }catch (e) {
                return false;
            }
        }
    }
    /**
     *  解析url后得到参数
     */
    function parseParam() {
        var _this = this;
        var result  = {};
        var parseUrl = _this.url;
        if(parseUrl.indexOf('?')> -1){
            var str  = parseUrl.split('?')[1];
            var temp = str.split('&');
            for(var i = 0;i < temp.length;i++){
                var temp2 = temp[i].split('=');
                result[temp2[0]] = JSON.parse(decodeURI(temp2[1]));
            }
            console.log(result);
        }
        _this.result = result;
    }
    //查看url和参数
    function consoleUrl() {
        var _this = this;
        console.log('url:'+ _this.url + ' \n ' );
        console.log(_this.param);
        console.log(_this.result);
    }


/**
 *  get方法得到带不同参数的请求的URL
 */
(function getFn(_this) {
    var eg = {
        condition : JSON.stringify({
            'craUser':'',
            'prduNum': 'PRDU2019100300000681'
        }),
        page:1,
        size:10,
        condition1 :{
            'craUser':'',
            'prduNum': 'PRDU2019100300000681'
        },
        key: 'you'
    };
    var urlLink =  '';
    var link = '';
    Object.getOwnPropertyNames(eg).forEach(function (value) {
        if(_this.isJson(eg[value])){
             link = '&' + value + '=' + encodeURI(eg[value]);
        }else{
             link = '&' + value + '=' + encodeURI(JSON.stringify(eg[value]));
        }
        urlLink += link;
    });
    _this.url = _this.urlFront + '?' + urlLink.substr(1);
    console.log(_this.url.replace(' ',''));
    _this.param = eg;
    _this.parseParam();
    _this.consoleUrl();
})(this);
