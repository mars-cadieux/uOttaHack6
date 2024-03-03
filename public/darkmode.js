const root = document.querySelector(":root");

function toggleDarkMode(){
    const toggle = document.getElementById("darkModeToggle")
    if(toggle.textContent == "🌙"){
        root.style.setProperty("--backgroundprimary", "#4b331c");
        root.style.setProperty("--backgroundsecondary", "#7d6357");
        root.style.setProperty("--backgroundtertiary", "#ae875e");
        root.style.setProperty("--accentprimary", "#4b736b");
        root.style.setProperty("--accentsecondary", "#f44336");
        root.style.setProperty("--accenttertiary", "#e1bb88");
        root.style.setProperty("--textlight", "#ffdeb4");
        root.style.setProperty("--textdark", "#ffdeb4");
        toggle.textContent = "☀️";
    } else {
        root.style.setProperty("--backgroundprimary", "#ead4b8");
        root.style.setProperty("--backgroundsecondary", "#dbbc93");
        root.style.setProperty("--backgroundtertiary", "#ae875e");
        root.style.setProperty("--accentprimary", "#499c8c");
        root.style.setProperty("--accentsecondary", "#f44336");
        root.style.setProperty("--accenttertiary", "#e1bb88");
        root.style.setProperty("--textlight", "#ead4b8");
        root.style.setProperty("--textdark", "#282828");
        toggle.textContent = "🌙";
    }
}