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
};

//submit task button
var onSubmitTask = () => {
  if (count >= 1) {
    console.log(globalId);
    let edTaskName = getEleID("taskName").value;
    let edTaskLevel = getEleID("inputDs").value;

    let obj = {
      name: edTaskName,
      level: edTaskLevel,
    };

    listTask.splice(globalId - 1, 1, obj);
    saveListTask();

    onInsertTask(globalId, edTaskName, edTaskLevel);

    resetForm();
    // Save task
    saveListTask();
    // Render task
    renderListTask();
  } else if (count == 0) {
    submitTask();
  }
};

var onDeleteTask = (id) => {
  listTask.splice(id - 1, 1);

  // Save task
  saveListTask();
  // Render task
  renderListTask();
  resetForm();
};



