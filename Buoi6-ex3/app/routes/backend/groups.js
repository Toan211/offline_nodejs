var express = require('express');
var router 	= express.Router();
const util = require('util');

const systemConfig  = require(__path_configs + 'system');
const notify  		= require(__path_configs + 'notify');
const GroupsModel 	= require(__path_schemas + 'groups');
const ValidateGroups	= require(__path_validates + 'groups');
const UtilsHelpers 	= require(__path_helpers + 'utils');
const ParamsHelpers = require(__path_helpers + 'params');

const linkIndex		 = '/' + systemConfig.prefixAdmin + '/groups/';
const pageTitleIndex = 'Group Management';
const pageTitleAdd   = pageTitleIndex + ' - Add';
const pageTitleEdit  = pageTitleIndex + ' - Edit';
const folderView	 = __path_views + 'pages/groups/';

// List groups
router.get('(/status/:status)?', async (req, res, next) => {
	let params 		 = {};
	let objWhere	 = {};

	params.keyword		 = ParamsHelpers.getParam(req.query, 'keyword', '');
	params.currentStatus= ParamsHelpers.getParam(req.params, 'status', 'all'); 
	params.sortField  	 = ParamsHelpers.getParam(req.session, 'sort_field', 'name');
	params.sortType 	 = ParamsHelpers.getParam(req.session, 'sort_type', 'asc');
	params.pagination 	 = {
		totalItems	 : 1,
		totalItemsPerPage: 3,
		currentPage		 : parseInt(ParamsHelpers.getParam(req.query, 'page', 1)),
		pageRanges		 : 3
	};

	let statusFilter = await UtilsHelpers.createFilterStatus(params.currentStatus, 'groups');

	let sort 		 = {};
	sort[params.sortField] = params.sortType;

	if(params.currentStatus !== 'all') objWhere.status = params.currentStatus;
	if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');

	await GroupsModel.count(objWhere).then( (data) => {
		params.pagination.totalItems = data;
	});
	
	GroupsModel
		.find(objWhere)
		.select('name status ordering created modified group_acp')
		.sort(sort)
		.skip((params.pagination.currentPage-1) * params.pagination.totalItemsPerPage)
		.limit(params.pagination.totalItemsPerPage)
		.then( (groups) => {
			res.render(`${folderView}list`, { 
				pageTitle: pageTitleIndex,
				titleMenu: 'Groups',
				groups,
				statusFilter,
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
	GroupsModel.updateOne({_id: id}, data, (err, result) => {
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
	GroupsModel.updateMany({_id: {$in: req.body.cid }}, data, (err, result) => {
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
			GroupsModel.updateOne({_id: item}, data, (err, result) => {});
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
		GroupsModel.updateOne({_id: cids}, data, (err, result) => {});
	}

	req.flash('success', notify.CHANGE_ORDERING_SUCCESS, false);
	res.redirect(linkIndex);
});

// Delete
router.get('/delete/:id', (req, res, next) => {
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 	
	GroupsModel.deleteOne({_id: id}, (err, result) => {
		req.flash('success', notify.DELETE_SUCCESS, false);
		res.redirect(linkIndex);
	});
});

// Delete - Multi
router.post('/delete', (req, res, next) => {
	GroupsModel.remove({_id: {$in: req.body.cid }}, (err, result) => {
		req.flash('success', util.format(notify.DELETE_MULTI_SUCCESS, result.n), false);
		res.redirect(linkIndex);
	});
});

// FORM
router.get(('/form(/:id)?'), (req, res, next) => {
	let id		= ParamsHelpers.getParam(req.params, 'id', '');
	let group	= {name: '', ordering: 0, status: 'novalue', group_acp: 'novalue'};
	let errors   = null;
	if(id === '') { // ADD
		res.render(`${folderView}form`, { pageTitle: pageTitleAdd, group, errors});
	}else { // EDIT
		GroupsModel.findById(id, (err, group) =>{
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, group, errors});
		});	
	}
});

// SAVE = ADD EDIT
router.post('/save', (req, res, next) => {
	req.body = JSON.parse(JSON.stringify(req.body));
	ValidateGroups.validator(req);

	let group = Object.assign(req.body);
	let errors = req.validationErrors();

	if(typeof group !== "undefined" && group.id !== "" ){	// edit
		if(errors) { 
			res.render(`${folderView}form`, { pageTitle: pageTitleEdit, group, errors});
		}else {
			GroupsModel.updateOne({_id: group.id}, {
				ordering: parseInt(group.ordering),
				name: group.name,
				status: group.status,
				content: group.content,
				group_acp: group.group_acp,
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
			res.render(`${folderView}form`, { pageTitle: pageTitleAdd, group, errors});
		}else {
			group.created = {
				user_id: "1",
				user_name: "admin",
				time: Date.now()
			}
			new GroupsModel(group).save().then(()=> {
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

// Change group_acp
router.get('/change-group-acp/:id/:group_acp', (req, res, next) => {
	let currentGroupACP	= ParamsHelpers.getParam(req.params, 'group_acp', 'yes'); 
	let id				= ParamsHelpers.getParam(req.params, 'id', ''); 
	let group_acp			= (currentGroupACP === "yes") ? "no" : "yes";
	let data 			= {
		group_acp: group_acp,
		modified: {
			user_id: '2',
			user_name: 'admin',
			time: Date.now()
		}
	}
	GroupsModel.updateOne({_id: id}, data, (err, result) => {
		req.flash('success', notify.CHANGE_GROUP_ACP_SUCCESS, false);
		res.redirect(linkIndex);
	});
});
	

module.exports = router;
