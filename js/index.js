document.documentElement.style.setProperty("--main-background-color", "rgb(18, 20, 15)");
document.documentElement.style.setProperty("--secondary-background-color", "rgb(12, 12, 12)");
document.documentElement.style.setProperty("--main-foreground-color", "rgb(160, 255, 200)");

// Calculate milliseconds in a year
const pSecond = 1000;
const pMinute = pSecond * 60;
const pHour = pMinute * 60;
const pDay = pHour * 24;

const countDownDate = new Date("2022-05-02T18:00:00.000+02:00").getTime();
const originDate = new Date("2022-04-04T21:00:00.000+02:00").getTime();

const h2_1 = "REBOOTING UNIVERSE";
const h2_2 = "PLEASE STAND BY";

async function connect() {
    /*alogin.play();*/
    document.getElementById('connect').remove();

    astartup.play();

    let cursor = document.getElementById('cursor');
    cursor.style.display = 'inline-block';

    let h2 = document.getElementById('h2');
    for (let i = 0; i < h2_1.length; i++) {
        h2.innerHTML += h2_1[i];
        await sleep(50);
    }
    await sleep(200);
    h2.innerHTML += '<br>';
    for (let i = 0; i < h2_2.length; i++) {
        h2.innerHTML += h2_2[i];
        await sleep(50);
    }

    cursor.style.animation = 'blink 0.9s infinite';

    await sleep(1200);
    let progressbar = document.getElementById('progressbar');
    progressbar.style.border = 'solid';
    progressbar.style.width = '18em';

    await sleep(500);
    document.getElementById('percentage').style.display = 'block';

    await sleep(100);
    let p_1 = document.getElementById('p_1');
    p_1.style.opacity = 1;
    await sleep(30);
    p_1.style.background = 'var(--main-background-color)'

    await sleep(100);
    let time = document.getElementById('time');
    time.style.opacity = 1;
    await sleep(100);
    time.style.background = 'var(--main-background-color)'

    startCountDown();
}

function startCountDown() {
    abg.play();

    let lastPercentage = "0%";

    let x = setInterval(() => {
        let now = new Date().getTime();


        // Find the distance between now and the count down date
        let distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(x);
            document.getElementById('h2').innerHTML = 'UNIVERSE REBOOTED<br>THANK YOU FOR WATCHING';
            document.getElementById('cursor').innerText = '♥';      
            document.getElementById("cursor").style.fontSize = '20pt';     

            document.getElementById("percentage").innerText = '100%';            
            document.getElementById("fill").style.width = '100%';
            document.getElementById("p_1").innerText = "THE WEBSITE WILL BE REPURPOSED,";
            document.getElementById("time").innerText = "so don't forget about this place".toUpperCase();
        }
        else {

            // Time calculations for days, hours, minutes and seconds
            let days = Math.floor(distance / pDay);
            let hours = Math.floor((distance % (pDay)) / (pHour));
            let minutes = Math.floor((distance % (pHour)) / (pMinute));
            let seconds = Math.floor((distance % (pMinute)) / pSecond);

            // Display the result in the element with id="demo"
            document.getElementById("time").innerText = days + " DAYS " + hours + " HOURS "
                + minutes + " MINUTES " + seconds + " SECONDS ";

            let percentage = (Math.round((100 - (countDownDate - now) / (countDownDate - originDate) * 100) * 100) / 100) + '%'


            if (percentage != lastPercentage) {
                aupdate.play();
                lastPercentage = percentage;
                let perc1 = document.getElementById("percentage");

                perc1.innerText = percentage;

                document.getElementById("fill").style.width = percentage;
            }

            // If the count down is finished, write some text
        }
    }, 1000);
}

async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
}