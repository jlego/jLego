class Lego{
    constructor(name){
        this.name = name;
    }
    sayhi(){
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
        return tmpl(data);
    }
}
export default Lego