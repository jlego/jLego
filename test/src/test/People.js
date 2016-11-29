export default class People{
	constructor(name){
		this.name = name;
	}
	sayhi(){
		const tmpl = addrs => `
			${ this.name + 'ooooo' }
			${ 1==1 ? this.name : ''}
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