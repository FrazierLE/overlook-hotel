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
let apiCustomers
let rooms;
let apiRooms;
let bookings;
let apiBookings;

window.addEventListener('load', fetchData([customersURL, roomsURL, bookingsURL]))

function fetchData(urls) {
  Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
      .then(data => {
          apiCustomers = data[0]
          apiRooms = data[1]
          apiBookings = data[2]
          customers = new Customers(apiCustomers.customers)
          rooms = new Rooms(apiRooms)
          bookings = new Bookings(apiBookings)
          randomizeCustomer(apiCustomers.customers)
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