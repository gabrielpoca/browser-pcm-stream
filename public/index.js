 images = [1, 2, 3].map(() => `../assets/images/CraigD-Image-TopRight.jpg`);
  // images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  let upperSlidePosition = 0;
  let lowerSlidePosition = 0;
  const slideshowText = [
    {value:1, display:'Global Good Morning is a project <br/> Collecting good mornings from <br/> around the world'},
    {value:2, display:'We hope to hear as many people, <br/> languages, time zones and voices <br/> as possible. When we get enough, <br/> we’ll make a sculpture that helps a <br/> viewer feel the turning of the <br/> earth. '},
    {value:3, display:'It doesn’t matter when you wake <br/> up or when your morning is. We <br/> just want to hear your voice, know <br/> the time and where you are in the\b world.'},
];
  const aboutText = [
    {value:1, title: '<p>About</p><p>the</p><p>Project</p>', display: `<p>Global Good Mornings is a project by Craig Damrauer. You can look at more of my work at <a href="https://assortedbitsofwisdom.com/">Assorted Bits of Wisdom</a>.</p>
      <p>This project is an outgrowth of something I’ve been pondering for a while. I’m interested in whether I can make something that helps a viewer viscerally intuit the turning of the earth.</p>
      <p>I think a really interesting way to do this is to through people. At every moment on earth someone is waking up and headed into the day ahead. If there’s a way to capture these voices there might be a way to allow us to feel the day’s progress as the earth turns.</p>
      <p>It’s going to need multiple sets of voices from every timezone in the world. I’d love it to represent the young, the old and everybody in between. I’d love it to represent different languages, different points of view, different modes of waking up.</p>
      <p>Drop a line, if you want to talk about this, have ideas or just want to be kept up to date with the progress.</p>
      GlobalGoodMorning @ gmail.com`},
      {value:2, title: 'Credits', display:`
      <p>(this will evolve)</p>
      <p>Site Design: Brian Carley</p>
      <p>Programming: James Goedert</p>
      <p>Antoine Claval</p>
      <p>Photos: Unsplash.com</p>`}
];
(function () {
  var clockElement = document.getElementById( 'clock' );

  function updateClock ( clock ) {
    // let currentTime = '0' + new Date().toLocaleTimeString().slice(0,6) + '0';
    let currentTime = new Date().toTimeString('en-US').slice(0,5);
    document.getElementById( "appt-time" ).value = currentTime;
  }

  setInterval(function () {
    console.log('hittinginterval');
      updateClock( clockElement );
  }, 60000);

  updateClock(clockElement);
}());

if(upperSlidePosition === 0) {
  document.getElementById('slideTextHI').innerHTML = '<h1 class="hi-style">Hi</h1>';
}
 document.getElementById("slideText").innerHTML = slideshowText[upperSlidePosition].display;
// document.getElementById("aboutTitle").innerHTML = aboutText[lowerSlidePosition].title;
// document.getElementById("about").innerHTML = aboutText[lowerSlidePosition].display;

const changeText=  (pos) => {
  upperSlidePosition = upperSlidePosition + pos;
  if (upperSlidePosition === 0) {
    document.getElementById("slideTextHI").innerHTML = '<h1 class="hi-style">Hi</h1>';
    document.getElementById("leftArrow").style.display = "none";
    document.getElementById("rightArrow").style.display = "block";
  }  else if (upperSlidePosition === 1) {
    document.getElementById("rightArrow").style.display = "block";
    document.getElementById("leftArrow").style.display = "block";
    document.getElementById("slideTextHI").innerHTML = '<h1 class="hi-style"></h1>';
  } else if (upperSlidePosition === 2) {
    document.getElementById("rightArrow").style.display = "none";
    document.getElementById("leftArrow").style.display = "block";
  } else { document.getElementById("slideTextHI").innerHTML = '<h1 class="hi-style"></h1>';
  }
  console.log('pos', pos, slideshowText[upperSlidePosition].display);
  document.getElementById("slideText").innerHTML = slideshowText[upperSlidePosition].display;
  console.log('changing some texty stuff');
};
const changeAboutText = () => {
  lowerSlidePosition = (lowerSlidePosition - 1) * -1;
  document.getElementById("aboutTitle").innerHTML = aboutText[lowerSlidePosition].title;
  document.getElementById("about").innerHTML = aboutText[lowerSlidePosition].display;
}

const toSteps = () => {
   currentSlideNumber++;
   nextItem();
};

// ------------- VARIABLES ------------- //
var ticking = false;
var isFirefox = (/Firefox/i.test(navigator.userAgent));
var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
var scrollSensitivitySetting = 30; //Increase/decrease this number to change sensitivity to trackpad gestures (up = less sensitive; down = more sensitive) 
var slideDurationSetting = 600; //Amount of time for which slide is "locked"
var currentSlideNumber = 0;
var totalSlideNumber = $(".background").length;

// ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
function parallaxScroll(evt) {
  if (isFirefox) {
    //Set delta for Firefox
    delta = evt.detail * (-120);
  } else if (isIe) {
    //Set delta for IE
    delta = -evt.deltaY;
  } else {
    //Set delta for all other browsers
    delta = evt.wheelDelta;
  }

  if (ticking !== true) {
    if (delta <= -scrollSensitivitySetting) {
      //Down scroll
      ticking = true;
      if (currentSlideNumber !== totalSlideNumber - 1) {
        currentSlideNumber++;
        nextItem();
      }
      slideDurationTimeout(slideDurationSetting);
    }
    if (delta >= scrollSensitivitySetting) {
      //Up scroll
      ticking = true;
      if (currentSlideNumber !== 0) {
        currentSlideNumber--;
      }
      previousItem();
      slideDurationTimeout(slideDurationSetting);
    }
  }
}

// ------------- SET TIMEOUT TO TEMPORARILY "LOCK" SLIDES ------------- //
function slideDurationTimeout(slideDuration) {
  setTimeout(function() {
    ticking = false;
  }, slideDuration);
}

// ------------- ADD EVENT LISTENER ------------- //
function throttle(callback, wait, context = this) {
  let timeout = null 
  let callbackArgs = null
  
  const later = () => {
    callback.apply(context, callbackArgs)
    timeout = null
  }
  
  return function() {
    if (!timeout) {
      callbackArgs = arguments
      timeout = setTimeout(later, wait)
    }
  }
}

var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
window.addEventListener(mousewheelEvent, throttle(parallaxScroll, 60), false);

// ------------- SLIDE MOTION ------------- //

function nextItem() {
  var $previousSlide = $(".background").eq(currentSlideNumber - 1);
  $previousSlide.removeClass("up-scroll").addClass("down-scroll");
}

function previousItem() {
  var $currentSlide = $(".background").eq(currentSlideNumber);
  $currentSlide.removeClass("down-scroll").addClass("up-scroll");
}
