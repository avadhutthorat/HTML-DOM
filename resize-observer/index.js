const box = document.getElementById("box");
const text = document.getElementById("text");

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.target.id === "box") {
      if (entry.contentRect.width < 200) {
        entry.target.style.backgroundColor = "blue";
      }
    }
  });
});

observer.observe(box);
observer.observe(text);
