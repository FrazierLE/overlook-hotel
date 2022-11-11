class singleCustomer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.allBookings;
    this.previousBookings = [];
    this.upcomingBookings = [];
    this.currentDate = '2022/11/15';
    this.totalDollarsSpent;
    this.roomsAvailableToBook;
  }
  filterBookings(bookingInfo) {
    const allBookings = bookingInfo.filter(element => element.userID === this.id)
    this.allBookings = allBookings
  }
 determineBookings() {
  this.allBookings.forEach(element => {
    if (new Date(element.date) > new Date(this.currentDate)) {
      this.upcomingBookings.push(element)
    }
    else{this.previousBookings.push(element)}
  })
 }
 calculateTotal(roomsInfo) {
  const total = this.previousBookings.reduce((acc, element) => {
    const roomMatch = roomsInfo.forEach(value => {
      if(value.number === element.roomNumber) {
        acc += value.costPerNight
      }
    })
    return acc
  }, 0)
  this.totalDollarsSpent = Number(total.toFixed(2))
 } 
 determineAvailableRooms(roomInfo) {
  const availableRooms = this.allBookings.reduce((acc, roomValue) => {
    const filteredList = roomInfo.filter(element => {
      if(roomValue.roomNumber !== element.number) {
        return element
      }
    })
   acc = filteredList
    return acc
  }, 0)
  this.roomsAvailableToBook = availableRooms
 }
}

export default singleCustomer;