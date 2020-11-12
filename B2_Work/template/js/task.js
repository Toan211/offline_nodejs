var listTask = [];

//Save list task to storage
var saveListTask = () => {
  saveDataToStorage(LIST_TASK_KEY, listTask);
}

// Get list task from storage
var getListTask = () => {
  let listTaskStore = getDataFromStorage(LIST_TASK_KEY);
  if (listTaskStore == null) {
      return [];
  }
  return listTaskStore;
}

//toggle collapse add form
function addTask() {
    var x = getEleID("formControl");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  var resetForm = () => {
    let taskName = getEleID('taskName');
    taskName.value = "";
    let taskLevel = getEleID("inputDs");
    taskLevel.value = "";
  }

  // Insert new task to table
var onInsertTask = (id, name, level) => {
    
    let table = getEleID("table_body");
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

//add task
var submitTask = () => {

    let taskName = getEleID("taskName").value;
    let taskLevel = getEleID("inputDs").value;
    
    let obj = {
      name: taskName,
      level: taskLevel
     
  }
  listTask.push(obj);

  // Save task
  saveListTask();

  let id = listTask.length;
  onInsertTask(id, taskName, taskLevel);

}