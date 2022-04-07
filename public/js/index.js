document.documentElement.style.setProperty("--main-background-color", "rgb(18, 20, 15)");
document.documentElement.style.setProperty("--secondary-background-color", "rgb(12, 12, 12)");
document.documentElement.style.setProperty("--main-foreground-color", "rgb(160, 255, 200)");

// Calculate milliseconds in a year
const pSecond = 1000;
const pMinute = pSecond * 60;
const pHour = pMinute * 60;
const pDay = pHour * 24;

const countDownDate = new Date("2022-05-02T19:00:00.000+02:00").getTime();
const originDate = new Date("2022-04-04T19:00:00.000+02:00").getTime();


async function connect(){
    
}

function startCountDown() {
    let x = setInterval(() => {
        let now = new Date().getTime();

        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / pDay);
        let hours = Math.floor((distance % (pDay)) / (pHour));
        let minutes = Math.floor((distance % (pHour)) / (pMinute));
        let seconds = Math.floor((distance % (pMinute)) / pSecond);

        // Display the result in the element with id="demo"
        document.getElementById("time").innerText = days + " DAYS " + hours + " HOURS "
            + minutes + " MINUTES " + seconds + " SECONDS ";

        let percentage = (Math.round((100 - (countDownDate - now) / (countDownDate - originDate) * 100) * 100) / 100) + '%'
        document.getElementById("percentage").innerText = percentage;
        document.getElementById("fill").style.width = percentage;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("time").innerHTML = "REBOOTED";
        }
    }, 1000);
}