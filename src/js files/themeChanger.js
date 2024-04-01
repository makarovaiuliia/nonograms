const body = document.querySelector("body");

function createThemeChanger() {
    const themeChanger = document.querySelector(".button-theme");
    themeChanger.addEventListener("click", toggleTheme);
    body.append(themeChanger);
}

function toggleTheme() {
    body.classList.toggle("theme-dark");
}

export { createThemeChanger };
