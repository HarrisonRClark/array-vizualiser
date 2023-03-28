const inputArrayElement = document.getElementById("input-array");
const outputElement = document.getElementById("output");

inputArrayElement.addEventListener("input", () => {
  const inputString = inputArrayElement.value;
  const arrayString = inputString.trim().replace(/'/g, '"');

  try {
    const array = JSON.parse(arrayString);
    outputElement.innerHTML = "";

    if (Array.isArray(array)) {
      const cards = document.createElement("div");
      cards.style.display = "flex";
      cards.style.flexWrap = "wrap";
      cards.style.alignItems = "stretch";
      cards.style.gap = "20px";

      for (let i = 0; i < array.length; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.style.flex = "0 0 auto";

        const cardTitle = document.createElement("div");
        cardTitle.className = "card-title";
        cardTitle.textContent = `${i}`;

        const cardContent = document.createElement("div");

        if (typeof array[i] === "object") {
          const pre = document.createElement("pre");
          pre.textContent = JSON.stringify(array[i], null, 2);
          cardContent.appendChild(pre);
        } else {
          cardContent.textContent = array[i];
        }

        card.appendChild(cardTitle);
        card.appendChild(cardContent);
        cards.appendChild(card);
      }
      outputElement.appendChild(cards);
    } else {
      outputElement.textContent =
        "Invalid array format. Please paste a valid array.";
    }
  } catch (error) {
    outputElement.textContent =
      "Error: Unable to parse the input. Make sure it is a valid array.";
  }
});

function initThemeToggle() {
  const themeToggleButton = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.remove("dark-theme", "light-theme");
    body.classList.add(savedTheme);
  } else {
    body.classList.add("dark-theme");
  }

  themeToggleButton.addEventListener("click", function () {
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      localStorage.setItem("theme", "light-theme");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      localStorage.setItem("theme", "dark-theme");
    }
  });
}

document.addEventListener("DOMContentLoaded", initThemeToggle);
