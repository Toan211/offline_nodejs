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
    let numberRow = items.length;
    var indexRow = 0;
    if(numberRow == 0) xhtml = "";
    else {
        items.forEach(item => {
            xhtml += `<tr>
                <td class="text-center">` + ++indexRow + `</td>
                <td>` + item.name + `</td>
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
