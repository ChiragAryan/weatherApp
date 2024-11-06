const weatherform = document.querySelector(".weatherform");
const carddiv = document.querySelector(".card");
const apikey = "apikey";


weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = document.querySelector(".cityinput").value;
    if (!city.trim()) {
        displayError("Please Enter City Name");
    } else {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
            if (!response.ok) {
                throw new Error("not found");
            }
            const data = await response.json();

            const { name: cityName, main: { temp: cityTemp, humidity: cityHumidity }, weather: [{ description: cityDescription, icon: cityEmoji }] } = data;


            displayWeather(cityName, cityTemp, cityHumidity, cityDescription, cityEmoji);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }




})


async function displayWeather(cityName, temp, humidity, description, emoji) {
    const cityelement = document.createElement("h1");
    const tempelement = document.createElement("p");
    const humidityelement = document.createElement("p");
    const descriptionelement = document.createElement("p");

    cityelement.textContent = cityName;
    tempelement.textContent = `${(temp - 273.15).toFixed(2)}°C`;
    humidityelement.textContent = `Humidity: ${humidity}%`;
    descriptionelement.textContent = description;


    const emojielement = await loadImage(`https://openweathermap.org/img/wn/${emoji}@2x.png`);

    cityelement.classList.add("cityname")
    tempelement.classList.add("temp")
    humidityelement.classList.add("humidity")
    descriptionelement.classList.add("description")
    emojielement.classList.add("emoji")

    carddiv.textContent = "";
    carddiv.appendChild(cityelement);
    carddiv.appendChild(tempelement);
    carddiv.appendChild(humidityelement);
    carddiv.appendChild(descriptionelement);
    carddiv.appendChild(emojielement);
    carddiv.style.display = "flex";


}

function displayError(error) {
    const errorelement = document.createElement("p");
    errorelement.textContent = error;
    errorelement.classList.add("error");
    carddiv.textContent = ""
    carddiv.style.display = "flex";

    carddiv.appendChild(errorelement);

}


function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image"));
    });
}
