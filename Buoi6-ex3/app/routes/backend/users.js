var express = require('express');
var router 	= express.Router();
const util = require('util');

const systemConfig  = require(__path_configs + 'system');
const notify  		= require(__path_configs + 'notify');
const UsersModel 	= require(__path_schemas + 'users');
const GroupsModel 	= require(__path_schemas + 'groups');
const ValidateUsers	= require(__path_validates + 'users');
const UtilsHelpers 	= require(__path_helpers + 'utils');
const ParamsHelpers = require(__path_helpers + 'params');

const linkIndex		 = '/' + systemConfig.prefixAdmin + '/users/';
const pageTitleIndex = 'User Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';
const folderView	 = __path_views + 'pages/users/';

// List users
router.get('(/status/:status)?', async (req, res, next) => {
	let params 		 = {};
	let objWhere	 = {};

	params.keyword		 = ParamsHelpers.getParam(req.query, 'keyword', '');
	params.currentStatus= ParamsHelpers.getParam(req.params, 'status', 'all'); 
	params.sortField  	 = ParamsHelpers.getParam(req.session, 'sort_field', 'name');
	params.sortType 	 = ParamsHelpers.getParam(req.session, 'sort_type', 'asc');
	params.groupID 	 = ParamsHelpers.getParam(req.session, 'group_id', '');
	params.pagination 	 = {
		totalItems		 : 1,
		totalItemsPerPage: 3,
		currentPage		 : parseInt(ParamsHelpers.getParam(req.query, 'page', 1)),
		pageRanges		 : 3
	};

	let statusFilter = await UtilsHelpers.createFilterStatus(params.currentStatus, 'users');

	let sort 		 = {};
	sort[params.sortField] = params.sortType;

	if(params.groupID !== 'allvalue' && params.groupID !== '') objWhere['group.id'] = params.groupID;
	if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
	if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

	let groupItems = [];
	await GroupsModel.find({}, {_id: 1, name: 1}).then( (items) => {
		groupItems = items;
		groupItems.unshift({_id: 'allvalue', name: 'All group'});
	});

	await UsersModel.count(objWhere).then( (data) => {
		params.pagination.totalItems = data;
	});
	
	UsersModel
		.find(objWhere)
		.select('name status ordering created modified group.name')
		.sort(sort)
		.skip((params.pagination.currentPage-1) * params.pagination.totalItemsPerPage)
		.limit(params.pagination.totalItemsPerPage)
		.then( (items) => {
			res.render(`${folderView}list`, { 
				pageTitle: pageTitleIndex,
				titleMenu: 'Users',
				items,
				statusFilter,
				groupItems,
				params
			});
		});
});

// Change status
router.get('/change-status/:id/:status', (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	let status			= (currentStatus === "active") ? "inactive" : "active";
	let data 			= {
		status: status,
		modified: {
			user_id: '2',
			user_name: 'admin',
			time: Date.now()
		}
	}
	UsersModel.updateOne({_id: id}, data, (err, result) => {
		req.flash('success', notify.CHANGE_STATUS_SUCCESS, false);
		res.redirect(linkIndex);
	});
});

// Change status - Multi
router.post('/change-status/:status', (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	let data 			= {
		status: currentStatus,
		modified: {
			user_id: '3',
			user_name: 'admin',
			time: Date.now()
		}
	}
	UsersModel.updateMany({_id: {$in: req.body.cid }}, data, (err, result) => {
		if (err) {
			console.log(err);
			return;
		}
		req.flash('success', util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, result.n) , false);
		res.redirect(linkIndex);
	});
});

// Change ordering - Multi
router.post('/change-ordering', (req, res, next) => {
	let cids 		= req.body.cid;
	let orderings 	= req.body.ordering;
	
	if(Array.isArray(cids)) {
		cids.forEach((item, index) => {
			let data = {
				ordering: parseInt(orderings[index]),
				modified: {
					user_id: '4',
					user_name: 'admin',
					time: Date.now()
				}
			}
			UsersModel.updateOne({_id: item}, data, (err, result) => {});
		})
	}else{ 
		let data = {
			ordering: parseInt(orderings),
			modified: {
				user_id: '4',
				user_name: 'admin',
				time: Date.now()
			}
		}
		UsersModel.updateOne({_id: cids}, data, (err, result) => {});
	}

	req.flash('success', notify.CHANGE_ORDERING_SUCCESS, false);
	res.redirect(linkIndex);
});

// Delete
router.get('/delete/:id', (req, res, next) => {
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 	
	UsersModel.deleteOne({_id: id}, (err, result) => {
		req.flash('success', notify.DELETE_SUCCESS, false);
		res.redirect(linkIndex);
	});
});

// Delete - Multi
router.post('/delete', (req, res, next) => {
	UsersModel.remove({_id: {$in: req.body.cid }}, (err, result) => {
		req.flash('success', util.format(notify.DELETE_MULTI_SUCCESS, result.n), false);
		res.redirect(linkIndex);
	});
});

// FORM
router.get(('/form(/:id)?'), async (req, res, next) => {
	let id		= ParamsHelpers.getParam(req.params, 'id', '');
	let user	= {name: '', ordering: 0, status: 'novalue', group_id: '', group_name: ''};    // add group
	let errors  = null;
	let groupItems = [];
	await GroupsModel.find({}, {_id: 1, name: 1}).then( (items) => {
		groupItems = items;
		groupItems.unshift({_id: 'allvalue', name: 'Choose group'});
	});
	if(id === '') { // ADD
		res.render(`${folderView}form`, { pageTitle: pageTitleAdd, user, groupItems, errors });
	}else { // EDIT
		UsersModel.findById(id, (err, user) =>{
			user.group_id = user.group.id;
			user.group_name = user.group.name;
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, user, groupItems, errors });
		});	
	}
});

// SAVE = ADD EDIT
router.post('/save', async (req, res, next) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	ValidateUsers.validator(req);

	let user = Object.assign(req.body);
	let errors = req.validationErrors();
	if(typeof user !== "undefined" && user.id !== "" ){	// edit
		if(errors) {
			let groupItems = [];
			await GroupsModel.find({}, {_id: 1, name:1}).then( (items) => {
				groupItems = items;
				groupItems.unshift({_id: 'allvalue', name: 'Choose group'});
			});
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, user, errors, groupItems});
		}else {
			UsersModel.updateOne({_id: user.id}, {
				ordering: parseInt(user.ordering),
				name: user.name,
				status: user.status,
				group: {
					id: user.group_id,
					name: user.group_name
				},
				content: user.content,
				modified: {
					user_id: '5', 
					user_name: 'admin',
					time: Date.now()
				}
			}, (err, result) => {
				req.flash('success', notify.EDIT_SUCCESS, false);
				res.redirect(linkIndex);
			});
		}
	}else { // add
		if(errors) { 
			let groupItems = [];
			await GroupsModel.find({}, {_id: 1, name:1}).then( (items) => {
				groupItems = items;
				groupItems.unshift({_id: 'allvalue', name: 'Choose group'});
			});
			res.render(`${folderView}form`, { pageTitle: pageTitleAdd, user, errors, groupItems});
		}else {
			user.created = {
				user_id: "1",
				user_name: "admin",
				time: Date.now()
			},
			user.group = {
				id: user.group_id,
				name: user.group_name
			}
			new UsersModel(user).save().then(()=> {
				req.flash('success', notify.ADD_SUCCESS, false);
				res.redirect(linkIndex);
			})
		}
	}	
});


// SORT
router.get(('/sort/:sort_field/:sort_type'), (req, res, next) => {
	req.session.sort_field		= ParamsHelpers.getParam(req.params, 'sort_field', 'ordering');
	req.session.sort_type		= ParamsHelpers.getParam(req.params, 'sort_type', 'asc');
	res.redirect(linkIndex);
});

// FILTER-GROUP
router.get(('/filter-group/:group_id'), (req, res, next) => {
	req.session.group_id		= ParamsHelpers.getParam(req.params, 'group_id', '');
	res.redirect(linkIndex);
});

module.exports = router;
