
const data = JSON.parse(document.getElementById("dashboardData").textContent);


const map = L.map('map').setView([26.4478, 78.5699], 8); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


data.all_trains.forEach(train => {
  L.marker([train.lat, train.lng])
    .addTo(map)
    .bindPopup(`<b>${train.train_name}</b><br>Train No: ${train.train_number}<br>Status: ${train.status}`)
    .openPopup();
});


const ft = data.featured_train;
document.getElementById("trainName").textContent = ft.train_name;
document.getElementById("trainNumber").textContent = ft.train_number;
document.getElementById("trainStatus").textContent = ft.status;
document.getElementById("trainLocation").textContent = `Lat: ${ft.current_location.lat}, Lng: ${ft.current_location.lng}`;


const trainTable = document.getElementById("trainTableBody");
data.all_trains.forEach(train => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${train.train_name}</td>
    <td>${train.train_number}</td>
    <td>${train.status}</td>
    <td>${train.lat}</td>
    <td>${train.lng}</td>
  `;
  trainTable.appendChild(row);
});


const fatakTable = document.getElementById("fatakTableBody");
data.fatak_status.forEach(fatak => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${fatak.fatak_id}</td>
    <td class="${fatak.status === 'Open' ? 'status-open' : 'status-closed'}">${fatak.status}</td>
    <td>${fatak.next_open}</td>
  `;
  fatakTable.appendChild(row);
});
