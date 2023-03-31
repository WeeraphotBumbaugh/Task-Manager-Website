var isImportant = false;
const serverUrl = "http://fsdiapi.azurewebsites.net";

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
  const cost = $("#txtCost").val();

  let task = new Task(
    title,
    isImportant,
    desc,
    dueDate,
    duration,
    status,
    color,
    cost
  );

  $.ajax({
    type: "POST",
    url: serverUrl + "/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (response) {
      const list = JSON.parse(response);
      console.log(list);
    },
    error: function (error) {
      console.log("Error:", error);
      alert("Unexpected error, task was not saved");
    },
  });
  displayTask(task);
  clearForm();
}

function clearForm() {
  $("input").val("");
  $("textarea").val("");
  $("select").val("N/A");
  $("#selColor").val("#00000");
}

function formatDate(date) {
  let dateObject = new Date(date);
  return (
    dateObject.toLocaleDateString() + " " + dateObject.toLocaleTimeString()
  );
}

function displayTask(task) {
  let syntax = `
  <div class="activeTasks" style="border:3px solid ${task.color}">
    <div class="info">
      <h5>${task.title}</h5>
      <p>${task.description}</p>
    </div>
    <label>${task.status}</label>
    <label>$${task.cost || "0"}</label>
    <div class="dates">
      <label>${formatDate(task.dueDate)}</label>
      <label>${task.duration}</label>
    </div>
  </div>`;
  // let syntax = `
  // <div class="activeTasks" style="border:3px solid ${task.color}">
  //   <div class="info-left">
  //     <h4>${task.title}</h4>
  //     <h6>Due: ${formatDate(task.dueDate)}</h6>
  //     <p><h6>Duration</h6> ${task.duration}</p>
  //   </div>
  //   <div class="info-right">
  //     <h6>Description</h6> <p>${task.description}</p>
  //     <h6>Status</h6><p>${task.status}</p>
  //     <h6>Cost</h6><p>$${task.cost || "0"}</p>
  //   </div>
  // </div>
  // `;

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

function fetchTasks() {
  $.ajax({
    type: "GET",
    url: serverUrl + "/api/tasks/",
    success: function (response) {
      const list = JSON.parse(response);
      for (let i = 0; i < list.length; i++) {
        let record = list[i];
        if (record.name === "Will") {
          displayTask(record);
        }
      }
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}

function init() {
  fetchTasks();
  $("#btnContent").click(togglePanel);
  $("#saveTask").click(saveTask);
  $("#iImportant").click(toggleImportant);
}

window.onload = init;
