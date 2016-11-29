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

        function namedFunction(data){
            console.log("change event :", data);
        }

        anyObject.on("change", namedFunction);
        anyObject.emit("change:attribute", "Hello 3 !");
        return tmpl(data);
    }
}

export default Lego;