// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/hotel.png'
import './images/hotel-overlook.png'


// console.log('This is the JavaScript entry file - your code begins here.');
import getData from './apiCalls'
import Customers from './classes/customers'
import singleCustomer from './classes/singleCustomer';
import Rooms from './classes/rooms'
import Bookings from './classes/bookings'

const customersURL = 'http://localhost:3001/api/v1/customers'
const roomsURL = 'http://localhost:3001/api/v1/rooms'
const bookingsURL = 'http://localhost:3001/api/v1/bookings'
let customers;
let customer;
let randomCustomer;
let rooms;
let user;
let bookings;
let apiCustomers
let apiRooms;
let apiBookings;

const homeButton = document.querySelector('#home-button');
const bookingHistory = document.querySelector('#previous-button');
const logoutButton = document.querySelector('#logout-button');
export const dollarsSpentSection = document.querySelector('#money-section');
const upcomingSection = document.querySelector('#upcoming-bookings');


window.addEventListener('load', fetchData([customersURL, roomsURL, bookingsURL]))

function fetchData(urls) {
  Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
      .then(data => {
          apiCustomers = data[0]
          apiRooms = data[1]
          apiBookings = data[2]
          customers = new Customers(apiCustomers.customers)
          rooms = new Rooms(apiRooms.rooms)
          bookings = new Bookings(apiBookings.bookings)
          randomizeCustomer(apiCustomers.customers)
          displayTotalDollarsSpent(apiRooms.rooms, apiBookings.bookings)
      })
      .catch(err => {
          console.log('Fetch Error: ', err)
      })
}

function randomizeCustomer(data) {
  randomCustomer = data[Math.floor(Math.random() * data.length)]
  customer = new singleCustomer(randomCustomer)
  return customer
}


function displayTotalDollarsSpent(rooms, bookings) {
  activateCustomerMethods(rooms, bookings)
  upcomingSection.innerHTML = ''
  customer.upcomingBookings.forEach(element => {
    upcomingSection.innerHTML += `
    <figure class ='upcomingRooms' id='${element.id}' tabindex='0'>
    <img src='#' alt='hotel room'>
    <p>Room Number: ${element.roomNumber}</p>
    <p>Checkin Date: ${element.date}</p>
    </figure>
    `
  })
  // dollarsSpentSection.innerText = 'Hello'
  // dollarsSpentSection.innerHTML += `<p>${customer.previousBookings}</p>`
}

function activateCustomerMethods(rooms, bookings) {
  customer.filterBookings(bookings)
  customer.determineBookings()
  customer.calculateTotal(rooms)
}

// function displayHomePage() {
//   activateCustomerMethods()
//   displayTotalDollarsSpent(rooms, bookings)
//   customer.upcomingBookings.forEach(element => {
//     console.log('element', element)
//   })
// }