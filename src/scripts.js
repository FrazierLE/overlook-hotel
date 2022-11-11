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
import Room from './classes/room'
import Booking from './classes/booking'
import Accounts from './classes/accounts'

const customersURL = 'http://localhost:3001/api/v1/customers'
const roomsURL = 'http://localhost:3001/api/v1/rooms'
const bookingsURL = 'http://localhost:3001/api/v1/bookings'
let customers;
let customer;
let randomCustomer;
let comparedDates;
let chosenDate;
let filteredSearch;
let room;
let accounts
let booking;
let apiCustomers
let apiRooms;
let apiBookings;

const homeButton = document.querySelector('#home-button');
const bookingHistoryButton = document.querySelector('#previous-button');
const previousBookingSection = document.querySelector('#previous-bookings');
const logoutButton = document.querySelector('#logout-button');
const dollarsSpentSection = document.querySelector('#dollars-spent');
const upcomingSection = document.querySelector('#upcoming-bookings');
const bookingSection = document.querySelector('#booking-section');
const title = document.querySelector('#title');
const searchButton = document.querySelector('#search-button');


window.addEventListener('load', fetchData([customersURL, roomsURL, bookingsURL]))
bookingHistoryButton.addEventListener('click', displayBookingHistory);
homeButton.addEventListener('click', goHome);

function fetchData(urls) {
  Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
      .then(data => {
          apiCustomers = data[0]
          apiRooms = data[1]
          apiBookings = data[2]
          customers = new Customers(apiCustomers.customers)
          // room = new Room(apiRooms.rooms)
          // booking = new Booking(apiBookings.bookings)
          accounts = new Accounts(apiBookings.bookings, apiRooms.rooms)
          randomizeCustomer(customers.customers)
          displayHomePage(accounts.rooms, accounts.bookings)
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


function displayHomePage(rooms, bookings) {
  hide([homeButton, previousBookingSection, searchResultsSection])
  show([bookingSection, bookingHistoryButton])
  activateCustomerMethods(accounts.rooms, accounts.bookings)
  upcomingSection.innerHTML = ''
  upcomingSection.innerHTML = `<h2>Upcoming Bookings</h2>`
  customer.upcomingBookings.forEach(element => {
    upcomingSection.innerHTML += `
    <figure class ='upcomingRooms' id='${element.id}' tabindex='0'>
    <img src='#' alt='hotel room'>
    <p>Room Number: ${element.roomNumber}</p>
    <p>Checkin Date: ${element.date}</p>
    </figure>
    `
  })
  dollarsSpentSection.innerHTML = ''
  dollarsSpentSection.innerHTML = `<h2>Total Amount Spent</h2>`
  dollarsSpentSection.innerHTML += `<h2 class="totalDollars">$${customer.totalDollarsSpent}</h2>`
}

function goHome() {
  hide([homeButton, previousBookingSection, searchResultsSection])
  show([bookingSection, bookingHistoryButton])
  resetFilters()
  title.innerText = 'Welcome to the Overlook Hotel'
}

function activateCustomerMethods(rooms, bookings) {
  customer.filterBookings(bookings)
  customer.determineBookings()
  customer.calculateTotal(rooms)
}

function displayBookingHistory() {
  show([homeButton, previousBookingSection])
  hide([bookingHistoryButton, bookingSection, searchResultsSection])
  activateCustomerMethods(accounts.rooms, accounts.bookings)
  previousBookingSection.innerHTML = ''
  title.innerText = 'Previous Bookings';
  customer.previousBookings.forEach(element => {
    previousBookingSection.innerHTML += `
    <figure class ='previousRooms' id='${element.id}' tabindex='0'>
    <img src='#' alt='hotel room'>
    <p>Room Number: ${element.roomNumber}</p>
    <p>Checkin Date: ${element.date}</p>
    </figure>
    `
  })
}

function hide(elementList) {
  elementList.forEach((currentElement) => {
      currentElement.classList.add('hidden')
  })
}

function show(elementList) {
  elementList.forEach((currentElement) => {
      currentElement.classList.remove('hidden')
  })
}

const checkInDate = document.querySelector('#startDate')
checkInDate.addEventListener('change', checkDateAvailability)
function checkDateAvailability() {
  chosenDate = checkInDate.value.split('-').join('/')
  comparedDates = accounts.bookings.filter(booking => {
    return booking.date !== chosenDate
  })
  console.log(comparedDates)
  return comparedDates
}


let roomTypeChoices = document.querySelector('.roomOptions')
roomTypeChoices.addEventListener('change', filterByRoomType)
function filterByRoomType() {
  filteredSearch = accounts.rooms.reduce((acc, room) => {
    const numberOfRoomsBooked = accounts.bookings.reduce((numberBooked, booking) => {
      if(booking.date === chosenDate) {
        numberBooked.push(booking.roomNumber)
      }
      return numberBooked
    }, [])
    if(!numberOfRoomsBooked.includes(room.number)) {
      acc.push(room)
    }
    return acc
  }, []).filter(room => {
    if(roomTypeChoices.value === room.roomType) {
      return room
    }
    else {
      return room
    }
  })
  return filteredSearch
}

const searchResultsSection = document.querySelector('#search-results')
searchButton.addEventListener('click', showAvailableRooms)
function showAvailableRooms() {
  hide([bookingSection])
  show([homeButton, searchResultsSection])
  searchResultsSection.innerHTML = ''
  filteredSearch.forEach(element => {
    searchResultsSection.innerHTML += `
    <figure class ='searchResults' id='${element.id}' tabindex='0'>
      <img src='#' alt='hotel room'>
      <p>Room Number: ${element.number}</p>
      <p>Room Type: ${element.roomType}</p>
      <p>Room Cost: ${element.costPerNight}</p>
      <button type="button" id="${element.number}">Book Room</button>
    </figure>
    `
  })
}

function resetFilters() {
  roomTypeChoices.value = 'Choose Room Type...'
  checkInDate.value = ''
}

let postData;
searchResultsSection.addEventListener('click', (e) => {
  if(e.target.closest('button')) {
    postData = {"userID": customer.id, "date": chosenDate, "roomNumber": Number(e.target.id) }
    console.log('postData', postData)
    bookARoom(postData)
  }
})

function bookARoom(postData) {
  return fetch(bookingsURL, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: { 'Content-Type': 'application/json' }
  })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Sorry, something went wrong. ${response.status}: ${response.statusText}`)
          }
          return response.json()
      })
      .then(test =>
          getData(bookingsURL))
      .then(data => {
        console.log('data', data)
        updateBookings(data.bookings)
      })
      .catch(err => {
          console.log('Fetch Error: ', err)
          errorMessage.innerHTML = `Oops, something went wrong. Try again later.`
      })
}

function updateBookings(data) {
  const updatedBookings = data.find(user => {
    return user.id === user.userID
  })
  customer.allBookings.push(updatedBookings)
}
