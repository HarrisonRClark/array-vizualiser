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

function formatSQL(sql) {
  const formattedSQL = sqlFormatter.format(sql, {
    language: "tsql",
    keywordCase: "upper",
    linesBetweenQueries: 2,
    indent: "    ",
  });

  return formattedSQL;
}

function initSQLFormatter() {
  const sqlInput = document.getElementById("input-sql");
  const formattedOutput = document.getElementById("formatted-output");
  const copyButton = document.getElementById("copy-button");

  sqlInput.addEventListener("input", () => {
    const formattedSQL = formatSQL(sqlInput.value);
    formattedOutput.value = formattedSQL;
    updateFormattedOutput(formattedSQL);
  });

  copyButton.addEventListener("click", () => {
    formattedOutput.select();
    document.execCommand("copy");
  });
}

function updateFormattedOutput(formattedSQL) {
  const formattedCode = document.getElementById("formatted-code");
  formattedCode.textContent = formattedSQL;
  Prism.highlightElement(formattedCode);
}

// Call the initSQLFormatter function when the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initSQLFormatter();
});
