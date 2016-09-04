export const Utils = {
	store(namespace, data) {
		if(data) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		}

		let store = localStorage.getItem(namespace);
		return(store && JSON.parse(store)) || [];
	},

	extend() {
		let newObj = {};
		for(let i=0; i<arguments.length;i++)  {
			let obj = arguments[i];
			for(let key in obj) {
				newObj[key] = obj[key];
			}
		}

		return newObj;
	} 
}

