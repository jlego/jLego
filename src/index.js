import EventClass from "events";

class Lego {
    constructor(name) {
        this.name = name;
    }
    sayhi() {
            const tmpl = addrs => `
          <table>
          ${addrs.map(addr => `
            <tr><td>${addr.first}</td></tr>
            <tr><td>${addr.last}</td></tr>
          `).join('')}
          </table>
        `;
        const data = [
            { first: 'aaaa', last: 'Bond' },
            { first: 'Lars', last: 'bbbb' },
        ];

        let anyObject = new EventClass();

        anyObject.on("change", (data) => {
            console.log("change event :", data);
        });
        anyObject.emit("change", "Hello 3778 !");
        return tmpl(data);
    }
    /**
     * [createXMLHTTPRequest description]
     * @return {[type]} [description]
     */
    createXMLHTTPRequest() {
        var xmlHttpRequest;
        if (window.XMLHttpRequest) {
            xmlHttpRequest = new XMLHttpRequest();
            if (xmlHttpRequest.overrideMimeType) {
                xmlHttpRequest.overrideMimeType("text/xml");
            }
        } else if (window.ActiveXObject) {
            var activexName = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
            for (var i = 0; i < activexName.length; i++) {
                try {
                    xmlHttpRequest = new ActiveXObject(activexName[i]);
                    if (xmlHttpRequest) {
                        break;
                    }
                } catch (e) {}
            }
        }
        return xmlHttpRequest;
    }
    /**
     * [ajax description]
     * @param  {[type]} options [description]
     * @param  {[type]} context [description]
     * @return {[type]}         [description]
     */
    ajax(options, context) {
        let options = options || {},
            defaults = {};
        if (options.url && options.success) {
            defaults = {
                url: options.url || '',
                data: options.data || {},
                type: options.type || 'GET',
                dataType: options.dataType || 'json',
                headers: options.headers || {},
                success: options.success || function(e) {},
                error: options.error || function(e) {}
            };
        } else {
            console.error('参数对象不正确');
            return false;
        }
        let xhr = this.createXMLHTTPRequest();
        if (xhr) {
            xhr.open(defaults.type, defaults.url, true);
            for (var key in defaults.headers) {
                xhr.setRequestHeader(key, defaults.headers[key]);
            };
            if (defaults.type === 'POST') {
                xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
                xhr.withCredentials = true;
                var dataArr = [];
                for (var val in defaults.data) {
                    dataArr.push(val + '=' + defaults.data[val]);
                };
                xhr.send(dataArr.join('&'));
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        console.warn("success");
                        if (typeof defaults.success === 'function') {
                            var resp = xhr.response;
                            if (defaults.dataType === 'json') {
                                resp = JSON.parse(resp);
                            }
                            defaults.success(resp, context);
                        }
                    } else {
                        console.warn("error");
                        if (typeof defaults.error === 'function') {
                            defaults.error(xhr.responseText);
                        }
                    }
                }
            }
            if (defaults.type === 'GET') {
                xhr.send(null);
            }
        }
    }
}

export default Lego;