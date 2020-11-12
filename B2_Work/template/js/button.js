//toggle collapse add form
function addTask() {
    var x = getEleID("formControl");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
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

var onDeleteTask = (id) => {
    
        listTask.splice(id - 1, 1);
        // Save task
        saveListTask();
        // Render task
        renderListTask();
    
}