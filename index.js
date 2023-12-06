let data;
const url_main_data = 'https://ghibliapi.vercel.app/films';
const main_show = document.querySelector('.excShows');
const allMoviez = document.getElementById('allMoviez');
const btn_left= document.getElementById('btn_left')
const btn_right = document.getElementById('btn_right')
let searchBar = document.getElementById('searchBar')


btn_left.addEventListener('click',()=>{
  main_show.scrollBy({
    right: main_show.clientWidth,
    behavior: "smooth"
  })
})

btn_right.addEventListener('click',()=>{
  main_show.scrollBy({
    left: +main_show.clientWidth,
    behavior: 'smooth',
  })
})


searchBar.addEventListener('keyup',()=>{
  const movieName = searchBar.value 
  console.log(data)
  let filteredData = data.filter((element)=>element.title.toLowerCase().trim()==movieName.toLowerCase().trim())
  if(filteredData.length>0){
    start_Injection(filteredData)
  }
  if(movieName==''||filteredData.length==0){
    start_Injection(data)
  }
})


btn_left.addEventListener('click',function(){
  main_show.scrollBy({
    left: main_show.clientWidth,
    behavior:"smooth",
  })
})
btn_right.addEventListener('click',function(){
  main_show.scrollBy({
    right: main_show.clientWidth,
    behavior:"smooth",
  })
})

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was an error fetching the data:', error);
    return null;
  }
}

function animate_main_show(...filmsExclusive) {
  const elements = document.querySelectorAll('.show');
  elements.forEach((element, index) => {
    let decorator = document.getElementById(`show_${index}`);
    decorator.style.backgroundImage = `url(${filmsExclusive[index].movie_banner})`;
    decorator.style.backgroundPosition = 'center';
    decorator.style.backgroundSize = 'cover';
    element.children[0].innerHTML = filmsExclusive[index].title;
    element.children[1].innerHTML = filmsExclusive[index].release_date;
    element.children[2].innerHTML = filmsExclusive[index].description;
  });
}


function components(title, backImage,id) {
  return `
    <div class="movieCard" id=${id} style="background: url('${backImage}') center center/cover;">
        <div class="hideOptions">
            <div>
                <button><i class="fa-solid fa-share"></i></button>
                <button><i class="fa-solid fa-heart"></i></button>
            </div>
            <div>
                <button><i class="fa-solid fa-play"></i></button>
            </div>
        </div>
        <div><h3 class=showtitle style="color: white; margin: .75rem .25rem;">${title}</h3></div>
    </div>
  `;
}


window.addEventListener('load', async () => {
  try {
    data = await getData(url_main_data);
    if (data) {
      animate_main_show(data[1], data[2], data[3], data[4]);
      start_Injection(data);
    } else {
      console.error('Data is null or empty.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
let container = document.getElementById('containerNew')
let bigShow=document.getElementById('bigShow')
container.addEventListener('click',(e)=>{
  if(e.target===container){
    quit()
  }
})
container.addEventListener('click',(e)=>{
  e.stopPropagation()
})

function quit(){
  container.style.zIndex=-3;
  container.style.opacity=0;
}

function start_Injection(bigdata) {
  allMoviez.innerHTML='';
  bigdata.forEach((element) => {
    const cardHTML = components(element.title, element.image,element.id);
    const cardElement = document.createElement('div');
    cardElement.classList.add('hover-card');
    cardElement.innerHTML = cardHTML;
    cardElement.addEventListener('click',()=>{
      let poster = document.getElementById('poster')
      let difinition = document.getElementById('difinition')
      let private = data.filter((element)=>element.id==cardElement.children[0].getAttribute("id"))
      difinition.children[0].innerHTML=private[0].title
      difinition.children[1].innerHTML=private[0].riginal_title_romanised
      difinition.children[2].innerHTML=private[0].release_date
      difinition.children[3].innerHTML=private[0].description
      
      poster.style=`${cardElement.children[0].getAttribute('style')}`
      container.style.opacity=1;
      container.style.zIndex=500;
    })
    cardElement.addEventListener('mouseenter', (e) => {
      e.target.children[0].children[0].setAttribute('class','opMovie')
      e.target.children[0].children[1].children[0].style.opacity='1'
      
    });
    cardElement.addEventListener('mouseleave', (e) => {
      e.target.children[0].children[0].setAttribute('class','hideOptions')
      e.target.children[0].children[1].children[0].style.opacity='0'

      
    });

    allMoviez.appendChild(cardElement);
  });
}
