function initThemeToggle() {
  const themeToggleButton = document.querySelector("#theme-toggle");
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

function initJSONFormatter() {
  const jsonInput = document.getElementById("input-json");
  const formattedOutput = document.getElementById("formatted-output");
  const copyButton = document.getElementById("copy-button");

  function formatJSON(jsonString) {
    try {
      const parsedJSON = JSON.parse(jsonString);
      return JSON.stringify(parsedJSON, null, 2);
    } catch (error) {
      console.error("Invalid JSON input:", error);
      return "Invalid JSON input";
    }
  }
  function updateFormattedOutput(formattedJSON) {
    const formattedCode = formattedOutput.querySelector("code");
    formattedCode.innerHTML = `${formattedJSON}`;
    Prism.highlightElement(formattedCode);
  }

  jsonInput.addEventListener("input", () => {
    const formattedJSON = formatJSON(jsonInput.value);
    updateFormattedOutput(formattedJSON);
  });

  copyButton.addEventListener("click", () => {
    const formattedCode = formattedOutput.querySelector("code");
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(formattedCode);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
  });
}

// Call the initThemeToggle and initJSONFormatter functions when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initJSONFormatter();
});
