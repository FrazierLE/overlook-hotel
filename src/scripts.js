// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'
import './images/hotel.png'
import './images/hotel-overlook.png'
import './images/hotel-room.png'


// console.log('This is the JavaScript entry file - your code begins here.');
import getData from './apiCalls'
import Customers from './classes/customers'
import singleCustomer from './classes/singleCustomer';
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
let newBooking;
let postData;
let accounts
let booking;
let apiCustomers
let apiRooms;
let apiBookings;
let findUser;
let findCustomer;
let correctUsername = true;
let correctPassword = false;

const homeButton = document.querySelector('#home-button');
const bookingHistoryButton = document.querySelector('#previous-button');
const previousBookingSection = document.querySelector('#previous-bookings');
const logoutButton = document.querySelector('#logout-button');
const dollarsSpentSection = document.querySelector('#dollars-spent');
const upcomingSection = document.querySelector('#upcoming-bookings');
const bookingSection = document.querySelector('#booking-section');
const title = document.querySelector('#title');
const searchButton = document.querySelector('#search-button');
const checkInDate = document.querySelector('#startDate');
let roomTypeChoices = document.querySelector('.roomOptions');
const searchResultsSection = document.querySelector('#search-results');
const inputs = [roomTypeChoices, checkInDate];
const loginPage = document.querySelector('#login');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const loginButton = document.querySelector('#login-button');
const loginInputs = [usernameInput, passwordInput];
const loginMessage = document.querySelector('#login-error-message')

window.addEventListener('load', fetchData([customersURL, roomsURL, bookingsURL]))
bookingHistoryButton.addEventListener('click', displayBookingHistory);
homeButton.addEventListener('click', goHome);
checkInDate.addEventListener('change', checkDateAvailability);
roomTypeChoices.addEventListener('change', filterByRoomType);
searchButton.addEventListener('click', showAvailableRooms);
searchResultsSection.addEventListener('click', bookIt);
loginButton.addEventListener('click', findCustomerInfo);

function fetchData(urls) {
  Promise.all([getData(urls[0]), getData(urls[1]), getData(urls[2])])
      .then(data => {
          apiCustomers = data[0]
          apiRooms = data[1]
          apiBookings = data[2]
          customers = new Customers(apiCustomers.customers)
          booking = new Booking (apiBookings.bookings)
          accounts = new Accounts(apiBookings.bookings, apiRooms.rooms)
          show([loginPage])
          hide([bookingHistoryButton, bookingSection, searchResultsSection, upcomingSection, dollarsSpentSection, bookingSection, previousBookingSection, homeButton, logoutButton])

      })
      .catch(err => {
          console.log('Fetch Error: ', err)
      })
}

function findCustomerInfo() {
  findUser = Number(usernameInput.value.split('username').join(''))
  findCustomer = customers.customers.find(element => element.id === findUser)
  customer = new singleCustomer(findCustomer)
  checkLogin()
}

function checkUsername() {
  if(!inRange(findUser) && usernameInput.value !== 'username' + findUser.toString()) {
    correctUsername = false;
  }
}

function checkPassword() {
  if(passwordInput.value === 'overlook2021') {
    correctPassword = true;
  }
}

function checkLogin() {
  checkUsername()
  checkPassword()
  if(correctPassword && correctUsername) {
    displayHomePage()
    hide([loginPage])
    show([bookingHistoryButton, bookingSection, searchResultsSection, upcomingSection, dollarsSpentSection, bookingSection, logoutButton])
  }
  else {
    show([loginMessage])
    resetLogin()
    setTimeout(() => {
      hide([loginMessage])
    }, 2000)
  }
}

function inRange(x) {
  return ((x-1)*(x-50) <= 0);
}

function resetLogin() {
  passwordInput.value = ''
  usernameInput.value = ''
  loginButton.disabled = true
  loginButton.style.cursor = "not-allowed";
}

loginInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(usernameInput.value !== '' && passwordInput.value !== '') {
      loginButton.disabled = false
      loginButton.style.cursor = "pointer";
  }
  else {
    loginButton.disabled = true
    }
  })
})

passwordInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      event.preventDefault()
      findCustomerInfo()
      checkLogin()
  }
})
usernameInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      event.preventDefault()
      findCustomerInfo()
      checkLogin()
  }
})

logoutButton.addEventListener('click', logout)
function logout() {
  show([loginPage])
  hide([bookingHistoryButton, bookingSection, searchResultsSection, upcomingSection, dollarsSpentSection, bookingSection, previousBookingSection, homeButton, logoutButton])
  resetLogin()
  title.innerText = `Welcome to the Overlook Hotel`
}

function displayHomePage() {
  hide([homeButton, previousBookingSection, searchResultsSection, loginPage])
  show([bookingSection, bookingHistoryButton])
  activateCustomerMethods(accounts.rooms, accounts.bookings)
  displayUpcomingBookings()
  displayDollarsSpent()
  title.innerText = `Welcome to the Overlook Hotel, ${customer.name}`
}

function displayUpcomingBookings() {
  upcomingSection.innerHTML = ''
  upcomingSection.innerHTML = `<h2>Upcoming Bookings</h2>`
  if(customer.upcomingBookings.length === 0) {
    upcomingSection.innerHTML = `<p class="errorMessage">${customer.name}, you have no upcoming bookings.</p>`
  }
  else {
    customer.upcomingBookings.forEach(element => {
      upcomingSection.innerHTML += `
      <figure class ='upcomingRooms' id='${element.id}' tabindex='0'>
      <img src='./images/hotel-room.png' class="hotelRooms" alt='hotel room'>
      <p class="roomNumber">Room Number: ${element.roomNumber}</p>
      <p class="checkIn">Checkin Date: ${element.date}</p>
      </figure>
      `
    })
  }
}

function displayDollarsSpent() {
  dollarsSpentSection.innerHTML = ''
  dollarsSpentSection.innerHTML = `<h2 class="dollarHeading">Total Amount Spent</h2>`
  dollarsSpentSection.innerHTML += `<h2 class="totalDollars">$${customer.totalDollarsSpent}</h2>`
}

function goHome() {
  hide([homeButton, previousBookingSection, searchResultsSection])
  show([bookingSection, bookingHistoryButton])
  resetFilters()
}

function activateCustomerMethods(rooms, bookings) {
  customer.filterBookings(bookings)
  customer.determineBookings()
  customer.calculateTotal(rooms)
}

function displayBookingHistory() {
  show([homeButton, previousBookingSection])
  hide([bookingHistoryButton, bookingSection, searchResultsSection])
  previousBookingSection.innerHTML = ''
  title.innerText = 'Previous Bookings';
  if(customer.previousBookings.length === 0) {
    upcomingSection.innerHTML = `<p class="errorMessage">${customer.name}, you have no upcoming bookings.</p>`
  }
  else {
    customer.previousBookings.forEach(element => {
      previousBookingSection.innerHTML += `
      <figure class ='previousRooms' id='${element.id}' tabindex='0'>
      <img src='./images/hotel-room.png' class="hotelRooms" alt='hotel room'>
      <p class="roomNumber">Room Number: ${element.roomNumber}</p>
      <p class="checkIn">Checkin Date: ${element.date}</p>
      </figure>
      `
    })
  }
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

function checkDateAvailability() {
  chosenDate = checkInDate.value.split('-').join('/')
  comparedDates = accounts.bookings.filter(booking => {
    return booking.date !== chosenDate
  })
  return comparedDates
}

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

function showAvailableRooms() {
  hide([bookingSection])
  show([homeButton, searchResultsSection])
  searchResultsSection.innerHTML = ''
  if(filteredSearch.length === 0) {
    searchResultsSection.innerHTML = `<p class="errorMessage">${customer.name}, no rooms available for either room type or date. Adjust your search</p>`
    setTimeout( () => {
      hide([searchResultsSection])
      show([bookingSection])
      resetFilters()
    }, 2000)
  }
  else {
    filteredSearch.forEach(element => {
      searchResultsSection.innerHTML += `
      <figure class ='searchResults' id='${element.number}' tabindex='0'>
        <img src='./images/hotel-room.png' class="hotelRooms" alt='hotel room'>
        <p class="roomNumber">Room Number: ${element.number}</p>
        <p class="roomType">Room Type: ${element.roomType}</p>
        <p class="roomCost">Room Cost: $${element.costPerNight}</p>
        <button class="bookButton"type="button" id="${element.number}">Book Room</button>
      </figure>
      `
    })
  }
}

function resetFilters() {
  roomTypeChoices.value = 'Choose Room Type...'
  checkInDate.value = ''
  searchButton.disabled = true;
  searchButton.style.cursor = "not-allowed";
}

function bookIt(e) {
  if(e.target.closest('button')) {
    postData = {"userID": customer.id, "date": chosenDate, "roomNumber": Number(e.target.id) }
    bookARoom(postData)
  }
  if(e.target.id.includes(postData.roomNumber.toString())) {
    e.target.parentElement.remove();
    confirmBooking()
    removeRoom()
  }
}

function removeRoom() {
  const filtered = filteredSearch.find(element => element.number === postData.roomNumber) 
    const index = filteredSearch.indexOf(filtered)
    filteredSearch.splice([index], 1)
    return filteredSearch
}

function confirmBooking() {
  searchResultsSection.innerHTML = `<p>${customer.name}, room booked!</p>`
  setTimeout( () => {
    showAvailableRooms()
      }, 2000)
}

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
        updateBookings()
        displayUpcomingBookings()
        displayDollarsSpent()
      })
      .catch(err => {
          console.log('Fetch Error: ', err)
          errorMessage.innerHTML = `Oops, something went wrong. Try again later.`
      })
}

function updateBookings() {
  newBooking = {id: Date.now().toString(), userID: postData.userID, date: postData.date, roomNumber: postData.roomNumber}
  customer.upcomingBookings.push(newBooking)
  accounts.bookings.push(newBooking)
}

inputs.forEach(input => {
  input.addEventListener('input', () => {
    if(checkInDate.value !== '' && roomTypeChoices.value !== 'Choose Room Type...') {
      searchButton.disabled = false
      searchButton.style.cursor = "pointer";
  }
  else {
    searchButton.disabled = true
    }
  })
})
