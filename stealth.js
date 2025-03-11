// Stealth Dashboard Activation Script

document.addEventListener("keydown", function(event) {
    if (event.key === "A" || event.key === "a") {
        let input = prompt("Enter command:");
        if (input === "Awaken Zyphyrr") {
            activateStealthDashboard();
        }
    }
});

function activateStealthDashboard() {
    let dashboard = document.getElementById("stealth-dashboard");
    if (dashboard) {
        dashboard.style.display = "block";
        console.log("Stealth Dashboard Activated!");
    } else {
        console.warn("Stealth Dashboard element not found!");
    }
}
