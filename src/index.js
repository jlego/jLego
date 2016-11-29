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
        anyObject.emit("change", "Hello 377 !");
        return tmpl(data);
    }
}

export default Lego;
