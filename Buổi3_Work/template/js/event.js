//event: các nút bấm onclick

funcResetForm = () => {
    
    areaInputName.value = "";
    areaInputLevel.value = 0;
    areaInputID.value = "";
}

//nút add task
funcAddTask = () => {
    toggleElement(areaForm, "show");
    funcResetForm();
}

//dóng cái form lại
funcCloseForm = () => {
    toggleElement(areaForm, "hide");
    funcResetForm();
}

funcSubmitForm = () => {
    let valueName = areaInputName.value;
    let valueLevel = areaInputLevel.value;
    let valueID = areaInputID.value;

    if( valueName == "")
    {
        alert(`Error: Please input Task Name!`);
        return;
    }

    if (checkName(valueName)) {
        alert(`The name has already existed!`);
        return;
    }   
    
    let items = [];
    if(valueID != "") {
        //nếu trên form có id từ thằng edit, nó sẽ cập nhật
        items = updateItems({name: valueName, level: valueLevel, id: valueID});
    }
    else {
        //nếu ko có, sẽ thêm mới
        items = addItem({name: valueName, level: valueLevel});
    }
    
    showItems(items, areaListTask);

    funcResetForm();
}

funcDeleteTask = (id) => {
    items = deleteItem(id);
    showItems(items, areaListTask);
    funcResetForm();
}

//bấm vào edit, nó sẽ truyền id lên form
funcEditTask = (id) => {
    toggleElement(areaForm, "show");
    let item = getItem(id);
    areaInputName.value = item.name;
    areaInputLevel.value = item.level;
    areaInputID.value = item.id;
}


funcSort = (sortName, col) => {
    showNameSort(sortName, col);
    let items = sortList(sortName, col);
    saveStorage(items);
    showItems(items, areaListTask);

}



funcSearch = () => {
   let str = areaInputSearch;
   let items = listItems(str.value);
   showItems(items, areaListTask);

}

funcClearSearch = ()=>
{   
    areaInputSearch.value = null;
    let str =  areaInputSearch.value;
    let items = listItems(str.value);
    showItems(items, areaListTask);
}