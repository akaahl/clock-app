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
const timeZoneAbbreviation = document.getElementById('timezone-abbreviation');
const regionSection = document.getElementById('region-section');
const weekdaySection = document.getElementById('weekday-section');
const yearDaySection = document.getElementById('yearday-section');
const weekNumberSection = document.getElementById('weeknumber-section');
let degreeRotation = 0; // For refreshQuoteBtn

seeMoreBtn.addEventListener('click', () => {
  mainContainer.classList.toggle('show');
  sideInfo.classList.toggle('show');
});

refreshQuoteBtn.addEventListener('click', () => {
  getQuotes(quoteUrl);
  degreeRotation += 360;
  refreshQuoteBtn.style.transform = `rotate(${degreeRotation}deg)`;
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

  const timeAbbreviation = data.abbreviation;
  timeZoneAbbreviation.innerText = timeAbbreviation;

  const region = data.timezone;
  const dayOfWeek = data.day_of_week;
  const dayOfYear = data.day_of_year;
  const weekNumber = data.week_number;

  regionSection.innerText = region;
  weekdaySection.innerText = dayOfWeek;
  yearDaySection.innerText = dayOfYear;
  weekNumberSection.innerText = weekNumber;
}

getUserTime(timeApi);
// function updateDOM() {}

// Get user geo-location
const geoApi = 'https://freegeoip.app/json/';

async function getUserLocation(url) {
  const res = await fetch(url);
  const data = await res.json();

  const regionName = data.region_name;
  const countryCode = data.country_code;

  userLocation.innerText = `In ${regionName}, ${countryCode}`;
}

getUserLocation(geoApi);

function setTimeAndMode() {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();

  const greetings = {
    morning: `Good morning, it's currently`,
    afternoon: `Good afternoon, it's currently`,
    night: `Good evening, it's currently`,
  };

  userTime.innerText = `${hours < 10 ? '0' : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;

  if (hours < 12) {
    userGreetings.innerText = greetings.morning;
    body.setAttribute('data-theme', 'day');
  }

  if (hours >= 12 && hours < 18) {
    userGreetings.innerText = greetings.afternoon;
    body.setAttribute('data-theme', 'day');
  }

  if (hours >= 18) {
    userGreetings.innerText = greetings.night;
    body.setAttribute('data-theme', 'night');
  }
}

setInterval(setTimeAndMode, 1000);
