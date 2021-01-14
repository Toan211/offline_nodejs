const ItemsModel 	= require(__path_schemas + 'items');

module.exports = {
    listItems: (params, options = null) => {
        let objWhere	 = {};
        if(params.currentStatus !== 'all') params.objWhere.status = currentStatus;
        if(params.keyword !== '') params.objWhere.name = new RegExp(params.keyword, 'i');

        let sort		= {};
	    sort[params.sortField]	= params.sortType;

    
       return ItemsModel
		.find(objWhere)
		.select('name status ordering created modified')
		.sort(sort)
		.skip((params.pagination.currentPage-1) * params.pagination.totalItemsPerPage)
		.limit(params.pagination.totalItemsPerPage)
    },

    countItems: (params, options = null) => {
        let objWhere	 = {};
        if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
        if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

        return ItemsModel.count(objWhere);
    },

    changeStatus: (id, currentStatus, option = null) => {
        let status			= (currentStatus === "active") ? "inactive" : "active";
        let data = {
            status: status,
            modified: {
                user_id: 1,
                user_name: "Status1",
                time: Date.now()
            }
        }

        if(option.task == 'update-one'){
            data.status = status;
            return ItemsModel.updateOne({_id: id}, data);
        } 
        
        if(option.task == 'update-multi'){
            data.status = currentStatus;
            return ItemsModel.updateMany({_id: {$in: id}}, data);
        }
        
    }
}