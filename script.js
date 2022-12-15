// Write your JavaScript code here!

window.addEventListener("load", function() {
    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let copilotNameInput = document.querySelector("input[name=copilotName]");
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        let cargoMassInput = document.querySelector("input[name=cargoMass]");
        let pilotStatus = document.getElementById("pilotStatus");
        let copilotStatus = document.getElementById("copilotStatus");
        let fuelStatus = document.getElementById("fuelStatus");
        let cargoStatus = document.getElementById("cargoStatus");
        let launchStatus = document.getElementById("launchStatus");
        let faultyItems = document.getElementById("faultyItems");
        let pilotName = pilotNameInput.value;
        let copilotName = copilotNameInput.value;
        let fuelLevel = fuelLevelInput.value;
        let cargoMass = cargoMassInput.value;
        if (pilotName === "" || copilotName === "" || fuelLevel === "" || cargoMass === "") {
            alert("All fields are required!");
            // stop the form submission
            event.preventDefault();
        } else if (!isNaN(pilotName) || !isNaN(copilotName) || isNaN(fuelLevel) || isNaN(cargoMass)) {
            alert("Make sure to enter valid information for each field!");
            // stop the form submission
            event.preventDefault();
        } else {
            faultyItems.style.visibility = "visible";
            pilotStatus.innerHTML = `${pilotName} is ready for launch`;
            copilotStatus.innerHTML = `${copilotName} is ready for launch`;
            if (fuelLevel < 10000) {
                launchStatus.innerHTML = "Shuttle not ready for launch";
                launchStatus.style.color = "red";
                fuelStatus.innerHTML = "Fuel level too low for launch";
            } else if (cargoMass > 10000) {
                launchStatus.innerHTML = "Shuttle not ready for launch";
                launchStatus.style.color = "red";
                cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            } else {
                launchStatus.innerHTML = "Shuttle is ready for launch";
                launchStatus.style.color = "green";
            }
        }
        fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
            response.json().then(function(json  ) {
                const div = document.getElementById("missionTarget");
                let i = Math.floor(Math.random() * json.length);
                div.innerHTML = `
                    <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${json[i].name}</li>
                        <li>Diameter: ${json[i].diameter}</li>
                        <li>Star: ${json[i].star}</li>
                        <li>Distance from Earth: ${json[i].distance}</li>
                        <li>Number of Moons: ${json[i].moons}</li>
                    </ol>
                    <img src="${json[i].image}">
                `;
            }); 
        });
    });
});
