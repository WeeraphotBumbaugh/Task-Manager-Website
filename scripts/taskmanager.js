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

  if (!title || !desc || !dueDate || !status) {
    isValid = false;
    $("#alertPanel").slideToggle("slow");
    setTimeout(() => {
      $("#alertPanel").slideToggle("slow");
    }, 2000);
    return;
  }

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
      displayTask(task);
      clearForm();

      $("#successPanel").slideToggle("slow");
      setTimeout(() => {
        $("#successPanel").slideToggle("slow");
      }, 2000);
    },
    error: function (error) {
      console.log("Error:", error);
      alert("Unexpected error, task was not saved");
    },
  });
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

function getIcon(savedAsImportant) {
  if (savedAsImportant) {
    return `<i class="fa-solid fa-flag important"></i>`;
  } else {
    return `<i class="fa-regular fa-flag not-important"></i>`;
  }
}

function formatCost(cost) {
  if (!cost) {
    return "0.00";
  } else {
    return parseFloat(cost).toFixed(2);
  }
}

function displayTask(task) {
  let syntax = `
  <div id="${task._id}" class="activeTasks" style="border:3px solid ${
    task.color
  }">
  ${getIcon(task.important)}
    <div class="info">
      <h5>${task.title}</h5>
      <p>${task.description}</p>
    </div>
    <label>${task.status}</label>
    <label>$${formatCost(task.cost)}</label>
    <div class="dates">
      <label>${formatDate(task.dueDate)}</label>
      <label>Duration: ${task.duration || "N/A"}</label>
    </div>
    <i onclick="deleteTask('${
      task._id
    }')" class="fa-solid fa-trash-can iDelete"></i>
  </div>`;
  $("#tasks").append(syntax);
}

function deleteTask(id) {
  $.ajax({
    type: "DELETE",
    url: serverUrl + `/api/tasks/${id}/`,
    success: function () {
      $("#" + id).remove();
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
}
function deleteAllTasks() {
  $.ajax({
    type: "DELETE",
    url: serverUrl + `/api/tasks/clear/Will/`,
    success: function () {
      $("#tasks").html("");
    },
    error: function (error) {
      console.log("Error:", error);
    },
  });
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
