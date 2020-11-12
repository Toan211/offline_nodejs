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
//cho id bắt đầu từ 1, thì các hàm sau nếu lấy mảng thì phải lấy id -1
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
  table.innerHTML = "";
  showListTask();
}


var resetForm = () => {
    let taskName = getEleID('taskName');
    taskName.value = "";
    let taskLevel = getEleID("inputDs");
    taskLevel.value = 0;
    count = 0;
  }

  // Insert new task to table
var onInsertTask = (id, name, level) => {
    
    let table = getEleID("tableBody");
    table.innerHTML +=
        `<tr id="tableId">
            <td id="taskId">${id}   </td>
            <td id = "edit__taskName">${name}</td>
            <td id = "edit__taskLevel"><span ${level == 0 ? `class="Small"` : (level == 1 ? `class="Medium"` : `class"High" `)}>${parseStatus(level)}</span></td>
            <td>
                <button id="editButton" type="button" onclick="onEditTask(${id})" class="btn btn-info mr-1">Edit</button>
                <button type="button" class="btn btn-danger" onclick="onDeleteTask(${id})">Delete</button>
            </td>
        </tr>`
    
       //! data-toggle ="model",  data-target=#modalEdit (mở 1 form mới có id là modalEdit)
}

// Edit Task
var onEditTask = (id) => {

  count++;
  let { name, level } = listTask[id - 1];
  
  let taskID = getEleID("taskId");
  let e_taskName = getEleID("edit__taskName");  
  let e_taskDeadLine = getEleID("edit__taskLevel");

  taskID.value = id;
  e_taskName.value = name;
  e_taskDeadLine.value = level;
    
  globalId = id;
  
  console.log(id, name, level);

  getEleID("taskName").value = name;
  getEleID("inputDs").value = level;




  // let id1 = listTask.length;
  // onDeleteTask(id1);
  
}

