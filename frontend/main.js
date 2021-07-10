let page_number = 1;

const api_url = 'http://localhost:3333/customers/list';
const countries_select = document.getElementById("country");
const status_select = document.getElementById("status");
const phones_table = document.getElementById("phones");
const prev_table_btn = document.getElementById('prev_table');
const next_table_btn = document.getElementById('next_table');

const countries = [
  {country_code: '237', name: 'Cameroon'},
  {country_code: '251', name: 'Ethiopia'},
  {country_code: '212', name: 'Morocco'},
  {country_code: '258', name: 'Mozambique'},
  {country_code: '256', name: 'Uganda'},
];

const getCountryName = country_code => countries.find(country => country.country_code === country_code)?.name;

function resetPaginate() { page_number = 1; }

prev_table_btn.onclick = () => {
  if (page_number > 1) {
    page_number--;
    loadCustomers();
  }
}

next_table_btn.onclick = () => {
  if (phones_table.rows.length > 0) {
    page_number++;
    loadCustomers();
  }
}

countries_select.onchange = () => {
  resetPaginate();
  loadCustomers();
}

status_select.onchange = () => {
  resetPaginate();
  loadCustomers();
}

function createCountriesSelect() {    
  countries.forEach(country => {
    const option = new Option(country.name, country.country_code);
    countries_select.options.add(option);
  });
}

function createCustomerTable(elements) {
  phones_table.innerHTML = null;
  elements.forEach(element => {
    const row = phones_table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    cell1.innerHTML = getCountryName(element.country_code) ?? 'N/D';
    cell2.innerHTML = element.valid ? 'OK' : 'NOK';
    cell3.innerHTML = '+'+element.country_code;
    cell4.innerHTML = element.phone;
  });
  
}

function loadCustomers() {
  const selected_country = countries_select.value;
  const selected_status = status_select.value;

  const xhttp = new XMLHttpRequest();
  
  xhttp.onload = data => {    
    const elements = data.currentTarget.status == 200 ? JSON.parse(data.currentTarget.response) : [];
    createCustomerTable(elements);
  }

  xhttp.onerror = data => {
    createCustomerTable([]);
  }

  xhttp.open("GET", `${api_url}/${selected_country}/${selected_status}/${page_number}`, true);
  xhttp.send();
}

createCountriesSelect()
loadCustomers();