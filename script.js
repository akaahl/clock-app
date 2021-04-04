const body = document.getElementsByTagName('body')[0];
const seeMoreBtn = document.getElementById('more-btn');
const mainContainer = document.querySelector('.main-container');
const sideInfo = document.querySelector('.side-info');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const refreshQuoteBtn = document.getElementById('refresh-quote-btn');
const userTime = document.getElementById('user-time');
const userLocation = document.getElementById('user-location');
const userGreetings = document.getElementById('user-greetings');

const backgroundimages = {
  day: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(assets/desktop/bg-image-daytime.jpg);`,
  night: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(assets/desktop/bg-image-nighttime.jpg);`,
};

console.log(body);

seeMoreBtn.addEventListener('click', () => {
  mainContainer.classList.toggle('show');
  sideInfo.classList.toggle('show');
});

refreshQuoteBtn.addEventListener('click', () => {
  getQuotes(quoteUrl);
  refreshQuoteBtn.style.transform = `rotate(360deg)`;
  refreshQuoteBtn.style.transition = `transform 0.5s linear`;
});

// Get random quotes
const quoteUrl = 'https://api.quotable.io/random/';

async function getQuotes(url) {
  const res = await fetch(url);
  const data = await res.json();

  //   console.log(data.content, data.author);

  quoteText.innerText = data.content;
  quoteAuthor.innerText = data.author;
}

getQuotes(quoteUrl);

// Get user time based on api
const timeApi = 'http://worldtimeapi.org/api/ip';

async function getUserTime(url) {
  const res = await fetch(url);
  const data = await res.json();
  const currentTime = data.datetime.slice(11, 16);
  const morningGreetings = `Good morning, it's currently`;
  const nightGreetings = `Good night, it's currently`;

  userTime.innerText = currentTime;

  if (+currentTime.slice(0, 2) >= 18) {
    userGreetings.innerText = nightGreetings;
    body.style.background = backgroundimages.night;
  } else {
    userGreetings.innerText = morningGreetings;
    body.style.background = backgroundimages.day;
  }
}

setInterval(() => {
  getUserTime(timeApi);
}, 1000);

getUserTime(timeApi);
function updateDOM() {}

body.style.background = backgroundimages.night;
