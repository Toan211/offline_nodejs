

let getParam = (params, property, defaultValue ) => {
    if(params.hasOwnProperty(property) && params[property] !== undefined){
		return params[property];
	}

	return defaultValue;
}

let createParam = (req) => {
	let params	 = {};
	params.keyword		 = getParam(req.query, 'keyword', '');
	params.currentStatus = getParam(req.params, 'status', 'all'); 
	
	params.sortField	 = getParam(req.session, 'sort_field', 'ordering'); 
	params.sortType	 = getParam(req.session, 'sort_type', 'asc'); 
	

	params.pagination 	 = {
		totalItems		 : 1,
		totalItemsPerPage: 3,
		currentPage		 : parseInt(getParam(req.query, 'page', 1)),
		pageRanges		 : 3
	};
	return params;
	
}

module.exports = {
	getParam,
	createParam
}