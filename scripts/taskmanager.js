var isImportant = false;

function togglePanel() {
  $("#split-right").slideToggle("slow");
}

function saveTask() {
  const title = $("#txtTitle").val();
  const desc = $("#txtDescription").val();
  const dueDate = $("#selDueDate").val();
  const duration = $("#txtDuration").val();
  const status = $("#selStatus").val();
  const color = $("#selColor").val();

  let task = new Task(
    title,
    isImportant,
    desc,
    dueDate,
    duration,
    status,
    color
  );
  console.log(task);
  displayTask(task);
}

function displayTask(task) {
  let syntax = `
  <div class="activeTasks" style="border:3px solid ${task.color}">
    <div class="info-left">
      <h4>${task.title}</h4>
      <h6>Due Date: ${task.dueDate}</h6>
      <p><h6>Duration:</h6> ${task.duration}</p>
    </div>
    <div class="info-right">
      <h6>Description:</h6> <p>${task.description}</p>
      <h6>Status:</h6><p>${task.status}</p>
    </div>
  </div>
  `;

  $("#tasks").append(syntax);
}

function toggleImportant() {
  const nonImpClasses = "fa-regular fa-flag not-important";
  const impClasses = "fa-solid fa-flag important";

  if (isImportant) {
    $("#iImportant").removeClass(impClasses).addClass(nonImpClasses);
    isImportant = false;
  } else {
    $("#iImportant").removeClass(nonImpClasses).addClass(impClasses);
    isImportant = true;
  }
}

function init() {
  console.log("Hello World");
  $("#btnContent").click(togglePanel);
  $("#saveTask").click(saveTask);
  $("#iImportant").click(toggleImportant);
}

window.onload = init;
