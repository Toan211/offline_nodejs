//show item level, paste color and design 
showItemLevel = (level) => {
    let classLevel = "";
    if(level == 2) {
        classLevel = "danger";
        levelValue = "High";
    } else if(level == 1) {
        classLevel = "info";
        levelValue = "Medium";
    } else if(level == 0){
        classLevel = "default";
        levelValue = "Small";
    }
    return `<span class="label label-`+ classLevel + `">` + levelValue + `<span>`;
}

//dành cho thg add button, cho nó ẩn or hiện
toggleElement = (ele, typeDisplay) => {
    if(typeDisplay == "show"){
        ele.style.display = "block";
    } else {
        ele.style.display = "none";
    }
}

//đưa thg item lên bảnh
showItems = (items, element) => {
    areaListTask.innerHTML = "";
    let xhtml = ``;
    var indexRow = 0;
    let searchValue = areaInputSearch.value;
    if(items.length == 0) xhtml = "";
    else {
        items.forEach(item => {
            let itemName = item.name;
            if(searchValue !== "") {
                itemName = highlightName(item.name, searchValue);
            }
            xhtml += `<tr>
                <td class="text-center">` + ++indexRow + `</td>
                <td>` + itemName + `</td>
                <td class="text-center">` + showItemLevel(item.level) + `</td>
                <td>
                    <button onclick="funcEditTask('` + item.id + `')" type="button" class="btn btn-warning">Edit</button>
                    <button onclick="funcDeleteTask('` + item.id + `')" type="button" class="btn btn-danger">Delete</button>
                </td>
            </tr>`;
        });
    }
    element.innerHTML = xhtml;
}


showNameSort = (name, col) => {
    if(col == 1) {
        if(name == 'asc' ) {
        areaNameSort.innerHTML = "NAME - ASC";
        } else if(name == 'desc') {
            areaNameSort.innerHTML = "NAME - DESC";
        }
    } else if(col == 2) {
        if(name == 'asc' ) {
            areaNameSort.innerHTML = "LEVEL - ASC";
        } else if(name == 'desc') {
            areaNameSort.innerHTML = "LEVEL - DESC";
        }
    }
}

sortList = (nameSort, col) => {
    let items = listItems();

    if(col === 1) {
        items.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }        
              return 0;
        });
    } else if(col === 2) {
        items.sort(function (a, b) {
            return a.level - b.level;
        });
    }
    
    if(nameSort === "asc") {
        return items
    } else if(nameSort ==="desc") {
        return items.reverse();
    }   
}
