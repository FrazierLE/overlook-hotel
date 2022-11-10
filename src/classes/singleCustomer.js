class singleCustomer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.previousBookings = [];
    this.upcomingBookings = [];
    this.currentDate = '2022/11/15';
    this.totalDollarsSpent;
    this.roomsAvailableToBook;
  }
 determineBookings(bookingInfo) {
  const bookingList = bookingInfo.reduce((acc, element) => {
    if(element.userID === this.id) {
      acc.push(element)
    }
    return acc
  }, []).forEach(element => {
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
  this.totalDollarsSpent = total
 } 
 determineAvailableRooms(roomInfo, bookingInfo) {
  const availableRooms = bookingInfo.reduce((acc, roomValue) => {
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