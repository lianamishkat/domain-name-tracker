const mymap = L.map('map').setView([0, 0], 2.5);
const marker = L.marker([0, 0]).addTo(mymap)
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibGlhbmFtaXNoa2F0IiwiYSI6ImNramRoZzFyMzA3a3QydXA4cW9tMjB4dHAifQ.PScftQY0EHOHYRtASABOOQ'
}).addTo(mymap);

const inputBar = document.querySelector('.input-bar')
const btn = document.querySelector('.input-bar-btn')
let inputDomain = '' 
let ipInfoResult = document.querySelector('.ip-info-result')


btn.addEventListener('click', function(e){
    e.preventDefault()
    inputDomain = inputBar.value.toLowerCase()
    let urlDomain = `https://geo.ipify.org/api/v1?apiKey=at_oHbknqDeYPDsndl3IMvRCczTpEYni&domain=${inputDomain}`
    inputBar.value = ''
    getDomainAPI(urlDomain)
})

async function getDomainAPI(link) {
    let response = await fetch(link)
    let data = await response.json()

    if (response.ok){
        printResult(data)
    } else {
        error()    
    } 
}
 function printResult (data) {

    let domainLat = data.location.lat
    let domainLng = data.location.lng
    marker.setLatLng([domainLat, domainLng])
    mymap.setView([domainLat, domainLng], 9.5) 

    ipInfoResult.innerHTML = `
    <div class="ip-address-info">
        <p class="ip-address-label">ip address</p>
        <h3 class="ip-address-result">${data.ip}</h3>
      </div>
      <div class="location-info">
        <p class="location-label">location</p>
        <h3 class="location-result">${data.location.region}, ${data.location.country}, ${data.location.postalCode}</h3>
      </div>
      <div class="timezone-info">
        <p class="timezone-label">timezone</p>
        <h3 class="timezone-result">${data.location.timezone}</h3>
      </div>
      <div class="isp-info">
        <p class="isp-label">isp</p>
        <h3 class="isp-result">${data.isp}</h3>
      </div>
    </div>
    `
}

function error() {
    ipInfoResult.innerHTML = `
    <h3>${inputDomain.toUpperCase()} does not exist. Please check spelling</h3>
    `
    marker.setLatLng([0, 0])
    mymap.setView([0, 0], 2)   
}