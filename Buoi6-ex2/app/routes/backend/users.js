const { group } = require('console');
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
const pageTitleIndex = 'Users Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';
const folderView	 = __path_views + 'pages/users/';

// List users
router.get('(/status/:status)?', async (req, res, next) => {
	let objWhere	 = {};
	let keyword		 = ParamsHelpers.getParam(req.query, 'keyword', '');
	let currentStatus= ParamsHelpers.getParam(req.params, 'status', 'all'); 
	let statusFilter = await UtilsHelpers.createFilterStatus(currentStatus, 'users');
	let sortField	 = ParamsHelpers.getParam(req.session, 'sort_field', 'ordering'); 
	let sortType	 = ParamsHelpers.getParam(req.session, 'sort_type', 'asc'); 
	let sort		= {};
	sort[sortField]	= sortType;


	let pagination 	 = {
		totalItems		 : 1,
		totalItemsPerPage: 3,
		currentPage		 : parseInt(ParamsHelpers.getParam(req.query, 'page', 1)),
		pageRanges		 : 3
	};

	if(currentStatus !== 'all') objWhere.status = currentStatus;
	if(keyword !== '') objWhere.name = new RegExp(keyword, 'i');

	await UsersModel.count(objWhere).then( (data) => {
		pagination.totalItems = data;
	});
	
	UsersModel
		.find(objWhere)
		.select('name status ordering created modified')
		.sort(sort)
		.skip((pagination.currentPage-1) * pagination.totalItemsPerPage)
		.limit(pagination.totalItemsPerPage)
		.then( (items) => {
			res.render(`${folderView}list`, { 
				pageTitle: pageTitleIndex,
				titleMenu: 'group',
				items,
				statusFilter,
				pagination,
				currentStatus,
				keyword,
				sortField,
				sortType

			});
		});
});

// Change status
router.get('/change-status/:id/:status', (req, res, next) => {
	let currentStatus	= ParamsHelpers.getParam(req.params, 'status', 'active'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	let status			= (currentStatus === "active") ? "inactive" : "active";
	let data = {
		status: status,
		modified: {
			user_id: 1,
			user_name: "Status1",
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

	let data = {
		status: currentStatus,
		modified: {
			user_id: 1,
			user_name: "statusMulti",
			time: Date.now()
		}
	}

	UsersModel.updateMany({_id: {$in: req.body.cid }}, data , (err, result) => {
		req.flash('success', util.format(notify.CHANGE_STATUS_MULTI_SUCCESS, result.n) , false);
		res.redirect(linkIndex);
	});
});

//Sort
router.get(('/sort/:sort_field/:sort_type'), (req, res, next) => {
	req.session.sort_field = ParamsHelpers.getParam(req.params, 'sort_field', 'ordering');
	req.session.sort_type = ParamsHelpers.getParam(req.params, 'sort_type', 'asc'); 

	res.redirect(linkIndex);

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
					user_id: 1,
					user_name: "orderMany",
					time: Date.now()
				}
			}
			UsersModel.updateOne({_id: item}, data, (err, result) => {});
		})
	}else{ 
		let data = {
			ordering: parseInt(orderings),
			modified: {
				user_id: 1,
				user_name: "order1Modified",
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
	let item	= {name: '', ordering: 0, status: 'novalue'};
	let errors   = null;
	let groupsItems = [];

	await GroupsModel.find({}, {_id: 1, name: 1}).then((items)=>
	{
		groupsItems = items;
		groupsItems.unshift({_id:'novalue', name: 'Choose Group'});
	});

	if(id === '') { // ADD
		res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, errors, groupsItems});
	}else { // EDIT
		UsersModel.findById(id, (err, item) =>{
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, errors, groupsItems});
		});	
	}
});

// SAVE = ADD EDIT
router.post('/save', async (req, res, next) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	ValidateUsers.validator(req);

	let item = Object.assign(req.body);
	let errors = req.validationErrors();

	if(typeof item !== "undefined" && item.id !== "" ){	// edit
		if(errors) { 
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, item, errors});
		}else {
			UsersModel.updateOne({_id: item.id}, {
				ordering: parseInt(item.ordering),
				name: item.name,
				status: item.status,
				content: item.content,	
				modified: {
					user_id: 1,
					user_name: "editModified",
					time: Date.now()
				}
				
			}, (err, result) => {
				req.flash('success', notify.EDIT_SUCCESS, false);
				res.redirect(linkIndex);
			});
		}
	}else { // add
		if(errors) { 
			let groupsItems = [];
			await GroupsModel.find({}, {_id: 1, name: 1}).then((items)=>
			{
				groupsItems = items;
				groupsItems.unshift({_id:'novalue', name: 'Choose Group'});
			});
			res.render(`${folderView}form`, { pageTitle: pageTitleAdd, item, errors, groupsItems});
		}else {
			item.created = {
				user_id: 0,
				user_name: "admin",
				time: Date.now()
			}
			new UsersModel(item).save().then(()=> {
				req.flash('success', notify.ADD_SUCCESS, false);
				res.redirect(linkIndex);
			})
		}
	}	
});

module.exports = router;
