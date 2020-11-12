//toggle collapse add form
function addTask() {
    var x = getEleID("formControl");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    resetForm();
  }

  //submit task button
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

  resetForm();
}



var onSubmitTask = () => {
  
    if (count >= 1)
    {
        console.log(globalId);
        let edTaskName = getEleID("taskName").value;
        let edTaskLevel = getEleID("inputDs").value;

        let obj = {
            name: edTaskName,
            level: edTaskLevel
        }

        listTask.splice(globalId - 1, 1, obj);
        saveListTask();

        let table = getEleID("tableBody");
    table.innerHTML +=
        `<tr id="tableId">
            <td id="taskId">${globalId}   </td>
            <td id = "edit__taskName">${edTaskName}</td>
            <td id = "edit__taskLevel"><span ${edTaskLevel == 0 ? `class="Small"` : (edTaskLevel == 1 ? `class="Medium"` : `class"High" `)}>${parseStatus(edTaskLevel)}</span></td>
            <td>
                <button id="editButton" type="button" onclick="onEditTask(${globalId})" class="btn btn-info mr-1">Edit</button>
                <button type="button" class="btn btn-danger" onclick="onDeleteTask(${globalId})">Delete</button>
            </td>
        </tr>`

        resetForm();
        // Save task
        saveListTask();
        // Render task
        renderListTask();
    }
    else if (count == 0)
    {
        submitTask();
    }
    
}


var onDeleteTask = (id) => {
    
        listTask.splice(id - 1, 1);
        
        // Save task
        saveListTask();
        // Render task
        renderListTask();
    
}