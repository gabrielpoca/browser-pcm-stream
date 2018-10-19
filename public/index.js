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
    {value:1, title: '<p>About</p><p>the</p><p>Project</p>', display: `<p>Global Good Mornings is a project by Craig Damrauer. You can look at more of my work at Assorted Bits of Wisdom.</p>
      <p>This project is an outgrowth of something I’ve been pondering for a while. I’m interested in whether I can make something that helps a viewer viscerally intuit the turning of the earth.</p>
      <p>I think a really interesting way to do this is to through people. At every moment on earth someone is waking up and headed into the day ahead. If there’s a way to capture these voices there might be a way to allow us to feel the day’s progress as the earth turns.</p>
      <p>It’s going to need multiple sets of voices from every timezone in the world. I’d love it to represent the young, the old and everybody in between. I’d love it to represent different languages, different points of view, different modes of waking up.</p>
      <p>Drop a line, if you want to talk about this, have ideas or just want to be kept up to date with the progress.</p>
      GlobalGoodMorning @ gmail.com`},
      {value:2, title: 'Credits', display:`
      <p>(this will evolve)</p>
      <p>Site Design: Brian Carley</p>
      <p>Programming: James Goedert</p>
      <p>Antoine xxx</p>
      <p>Photos: Unsplash.com</p>`}
  ]

if(upperSlidePosition === 0) {
document.getElementById("slideTextHI").innerHTML = '<h1 class="HI">HI</h1>';
}
document.getElementById("slideText").innerHTML = slideshowText[upperSlidePosition].display;
document.getElementById("aboutTitle").innerHTML = aboutText[lowerSlidePosition].title;
document.getElementById("about").innerHTML = aboutText[lowerSlidePosition].display;

const changeText=  (pos) => {
    upperSlidePosition = upperSlidePosition + pos;
    console.log('pos', pos, slideshowText[upperSlidePosition].display);
    document.getElementById("slideText").innerHTML = slideshowText[upperSlidePosition].display;
    console.log('changing some texty stuff');
};
const changeAboutText = () => {
  lowerSlidePosition = (lowerSlidePosition - 1) * -1;
  document.getElementById("aboutTitle").innerHTML = aboutText[lowerSlidePosition].title;
  document.getElementById("about").innerHTML = aboutText[lowerSlidePosition].display;
}
