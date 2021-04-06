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
const quoteApi = 'https://api.quotable.io/random/',
  timeApi = 'http://worldtimeapi.org/api/ip',
  geoApi = 'https://freegeoip.app/json/';
let degreeRotation = 0; // For refreshQuoteBtn

seeMoreBtn.addEventListener('click', () => {
  mainContainer.classList.toggle('show');
  sideInfo.classList.toggle('show');
});

refreshQuoteBtn.addEventListener('click', () => {
  getDataFromApis(quoteApi, timeApi, geoApi);
  degreeRotation += 360;
  refreshQuoteBtn.style.transform = `rotate(${degreeRotation}deg)`;
});

// Get data from multiple APIs
async function getDataFromApis(apiOne, apiTwo, apiThree) {
  // Get random quotes
  const responseOne = await fetch(apiOne);
  const dataOne = await responseOne.json();

  quoteText.innerText = dataOne.content;
  quoteAuthor.innerText = dataOne.author;

  // Get user timezone informations
  const responseTwo = await fetch(apiTwo);
  const dataTwo = await responseTwo.json();

  const timeAbbreviation = dataTwo.abbreviation;
  timeZoneAbbreviation.innerText = timeAbbreviation;

  const region = dataTwo.timezone;
  const dayOfWeek = dataTwo.day_of_week;
  const dayOfYear = dataTwo.day_of_year;
  const weekNumber = dataTwo.week_number;

  regionSection.innerText = region;
  weekdaySection.innerText = dayOfWeek;
  yearDaySection.innerText = dayOfYear;
  weekNumberSection.innerText = weekNumber;

  // Get user geo-location info
  const responseThree = await fetch(apiThree);
  const dataThree = await responseThree.json();

  const regionName = dataThree.region_name;
  const countryCode = dataThree.country_code;

  userLocation.innerText = `In ${regionName}, ${countryCode}`;
}

getDataFromApis(quoteApi, timeApi, geoApi);

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
