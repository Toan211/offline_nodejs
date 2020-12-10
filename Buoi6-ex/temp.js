<% 
    filterStatusHelper = (collection, statusFilter,  keyword) => { 
        let xhtmlResult = '';
        statusFilter.forEach((item)=> {
            let link = systemConfig.prefixAdmin + '/' + collection + '/status/' + item.value;
            if(keyword !== "" && keyword !== undefined) link += '?keyword=' + keyword;

            xhtmlResult += `<a class="btn m-b-sm btn-${item.class} btn-sm" href="${link}">
                    ${item.name.toUpperCase() + " (" + item.count +")" }
                </a> `;
        })
        return xhtmlResult;
    } 
%>

<% 
    statusHelper = (collection, status, id) => {
        let xhtmlStatus = '';
        let link       = systemConfig.prefixAdmin + '/' + collection + '/change-status/' + id + '/' + status ;
        if(status === "active") {
            xhtmlStatus = '<span class="label label-success">active</span>';
        }else if (status === "inactive") {
            xhtmlStatus = '<span class="label label-warning">inactive</span>';
        }

        return `<a href="${link}">${xhtmlStatus}</a>`;
    }
%>

<% 
    actionHelper = (collection) => { 
        let actions = [
            { value: "", name: "Bulk Action" },
            { value: "change-status/active", name: "Active" },
            { value: "change-status/inactive", name: "InActive" },
            { value: "change-ordering/", name: "Change Ordering" },
            { value: "delete/", name: "Delete" },
        ];
        let xhtmlAction = '';
        let linkAddNew  = systemConfig.prefixAdmin + '/' + collection + '/form' ;

        actions.forEach((action)=> {
            let link = systemConfig.prefixAdmin + '/' + collection + '/' + action.value;
            xhtmlAction += `<option value="${link}">${action.name}</option>`;
        });

        return `<div class="d-flex flex-wrap align-items-center justify-content-between mb-2">
                <select name="action" class="form-control slbAction">
                    ${xhtmlAction}
                </select>
                <button class="btn btn-info btnAction" type="button" id="btn-action" value="btnAction" disabled>Apply</button>
                <div class="pull-right">
                    <a href="${linkAddNew}" class="btn btn-warning btn-addNew">Add New</a>
                </div>
            </div>`;
    } 
%>

<% arrMenu.forEach((items) =>{ %>
    <li class="nav-item">
            <a href="<%= systemConfig.prefixAdmin %>/<%= items.link %>" class="nav-link" data-active="<%= items.active %>">
                <i class="nav-icon fas <%= items.icon %>"></i>
                    <p><%= items.name %></p>
            </a>
    </li>
<% }) %>






