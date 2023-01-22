const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
wIcon = document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup",e=>{
    //if user pass enter button and input value is not empty
    if(e.key=="Enter" && inputField.value !=""){
    requestApi(inputField.value)
}
});

locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation){ //for suppotr geolocation api
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }
    else{
        alert("your browser not support geolocation api");
    }
});

function onSuccess(position){
    const{latitude, longitude} = position.coords;//for getting lat and lon of the user device from coords object
    api = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${514ac6df0ebc5664bdb3d023b59c2ce8}';
   fetchData();
}

function onError(error){
    infoTxt.innerText=error.message;
    infoTxt.classList.add("error")
}



function requestApi(city){
    api = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${514ac6df0ebc5664bdb3d023b59c2ce8}';
    fetchData();
}
function fetchData(){
    infoTxt.innerText="Getting wether details...";
     infoTxt.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending","error");
        infoTxt.innerText = '${inputField.value} is not valid city name';
    }
    else{
         const city = info.name;
         const country = info.sys.country;
         const {description,id}=info.weather[0];
         const {feels_like,humidity,temp} = info.main;

         if(id == 800){//climate clear id
          wIcon.src = "..//forcast/icon/cloud.svg";
         }else if(id >= 200 && id <= 223){
            wIcon.src = "..//forcast/icon/storm.svg";
         }else if(id >= 600 && id <= 622){
            wIcon.src = "..//forcast/icon/snow.svg";
         }else if(id >= 701 && id <= 781){
            wIcon.src = "..//forcast/icon/haze.svg";
         }else if(id >= 801 && id <= 804){
            wIcon.src = "..//forcast/icon/cloud.svg";
         }else if((id >= 300 && id <= 332) || (id >= 500 && id <= 531)){
            wIcon.src = "..//forcast/icon/rain.svg";
         }

         wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
         wrapper.querySelector(".weather").innerText = description;
         wrapper.querySelector(".location span").innerText = '${city},${country}';
         wrapper.querySelector(".temp .numb-2").innerText =Math.floor (feels_like);
         wrapper.querySelector(".humidity span").innerText = '${humidity}%';

        infoTxt.classList.remove("pending","error");
    wrapper.classList.add("active");
    console.log(info);
}
}

arrowBack.addEventListener("click",()=>{
    wrapper.classList.remove("active"); 
});