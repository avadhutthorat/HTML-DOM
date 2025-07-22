const drag = document.getElementById("drag-item");
const drop = document.getElementById("drop");

drag.addEventListener("dragstart", (e) => {
  console.log("Drag started");
  e.dataTransfer.setData("mydata", "This is dragged item");
});

drop.addEventListener("dragenter", () => {
  console.log("target entered in drop zone");
});

drop.addEventListener("dragover", (e) => {
  e.preventDefault();
  console.log(
    "target is over in drop zone - content -",
    e.dataTransfer.getData("mydata")
  );
  drop.style.backgroundColor = "#e0e0e0";
});

drop.addEventListener("dragleave", (e) => {
  e.preventDefault();
  console.log(
    "target is over in drop zone - content -",
    e.dataTransfer.getData("mydata")
  );
  drop.style.backgroundColor = "";
});

drop.addEventListener("drop", (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("mydata");
  drop.textContent = "Dropped: " + data;
  drop.style.backgroundColor = "";
});
