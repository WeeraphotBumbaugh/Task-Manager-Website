function togglePanel() {
  $("#form").slideToggle("slow");
}

function saveTask() {
  console.log("Save task clicked");
  $("#tasks").append("content");
}
function toggleImportant() {
  const nonImpClasses = "fa-regular fa-flag not-important";
  const impClasses = "fa-solid fa-flag important";
  $("#iImportant").removeClass(nonImpClasses);
  $("#iImportant").addClass(impClasses);
}
function init() {
  console.log("Hello World");
  $("#btnContent").click(togglePanel);
  $("#saveTask").click(saveTask);
  $("#iImportant").click(toggleImportant);
}

window.onload = init;
