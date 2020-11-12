var getRamdomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getEleID = id => {
    return document.getElementById(id);
}

var getEleClass = cls => {
    return document.getElementById(cls); 
}

var parseStatus = status => {
    return status == 0 ? "Small" : (status == 1 ? "Medium" :"High");
}

const LIST_TASK_KEY = "LIST_TASK";

var saveDataToStorage = (key, data) => {
    localStorage.setItem(LIST_TASK_KEY, JSON.stringify(data));
}

var getDataFromStorage = key => {
    let listTaskStore = localStorage.getItem(LIST_TASK_KEY);
    if (listTaskStore) {
        return JSON.parse(listTaskStore);
    }
    else {
        return null;
    }
}