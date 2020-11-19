//modal: mô hình, cơ sở, hình mẫu, thành phần dùng chung
var ITEMS = [];
const LIST_TASK_KEY = "LIST_TASK";

saveStorage = (items) => {
    localStorage.setItem(LIST_TASK_KEY, JSON.stringify(items));
}

loadStorage = () => {
    return JSON.parse(localStorage.getItem(LIST_TASK_KEY));
}

//cho các items từ local store vào mảng, r return nó ra
listItems = ( key = null) => {
    let items = loadStorage();
    if(items == null) {
        items = [];
    }
    if (key !==null)
    {
        if(items !== null)
        {

            items = items.filter((item)=> item.name.indexOf(key)>-1);
            
        }
    }
    return items;
}

//lấy item ở vị trí id từ LocalStore, 
getItem = id => {
    let items = loadStorage();
    for(var index in items) {
        if(items[index].id == id){
            return items[index];
        }
    }
}

//tạo và push ID thêm lên localStore
addItem = (SingleItem) => {
    let items = listItems();
    SingleItem.id = makeID(10);
    items.push(SingleItem);
    saveStorage(items);
    return items;
}

//cập nhật lại ở tại chỗ item id
updateItems = (SingleItem) => {
    let items = loadStorage();
    for (let i in items) {
        if(items[i].id == SingleItem.id) {
            items[i].name = SingleItem.name;
            items[i].level = SingleItem.level;
            break;
        }
    }
    saveStorage(items);
    return items;
}

deleteItem = (id) => {
    let items = listItems();
    items = items.filter((item) => {
        return item.id !== id;
    });
    saveStorage(items);
    return items;
}

//check thằng name, nếu nó trùng, return true, nếu ngc lại thì return false
var checkName = (name) => {
    let items = listItems();
    for (let singleItem of items) {
        if (singleItem.name == name) {
            return true;
        }
    }
    return false;
}