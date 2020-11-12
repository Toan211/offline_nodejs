var listTask = [];

//Save list task to storage
var saveListTask = () => {
  saveDataToStorage(LIST_TASK_KEY, listTask);
}

// Get/load list task from storage
var getListTask = () => {
  let listTaskStore = getDataFromStorage(LIST_TASK_KEY);
  if (listTaskStore == null) {
      return [];
  }
  return listTaskStore;
}

// Show task in table upon open window (data from local storage)
var showListTask = () => {
  listTask = getListTask();
  if (listTask.length > 0) {
      let id = 0;
      for (let task of listTask) {
          let { name, level } = task;
          id++;
          onInsertTask(id, name, level);
      }
  }
}

// Render list task 
var renderListTask = () => {
  let table = getEleID("tableBody");
  //table.innerHTML = "";
  showListTask();
}


var resetForm = () => {
    let taskName = getEleID('taskName');
    taskName.value = "";
    let taskLevel = getEleID("inputDs");
    taskLevel.value = 0;
  }

  // Insert new task to table
var onInsertTask = (id, name, level) => {
    
    let table = getEleID("tableBody");
    table.innerHTML +=
        `<tr>
            <td>${id}</td>
            <td>${name}</td>
            <td><span ${level == 0 ? `class="Small"` : (level == 1 ? `class="Medium"` : `class"High" `)}>${parseStatus(level)}</span></td>
            <td>
                <button type="button" onclick="onEditTask(${id})" class="btn btn-info mr-1" data-toggle="modal" data-target="#modalEdit">Edit</button>
                <button type="button" class="btn btn-danger" onclick="onDeleteTask(${id})">Delete</button>
            </td>
        </tr>`
}

