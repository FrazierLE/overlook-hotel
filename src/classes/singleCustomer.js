class singleCustomer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.allBookings;
    this.previousBookings = [];
    this.upcomingBookings = [];
    this.date = this.setCurrentDate()
    this.totalDollarsSpent;
  }
  setCurrentDate() {
    const date = new Date()
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      let currentDate = `${year}-${month}-${day}`
      return currentDate.split('-').join('/')
  }
  filterBookings(bookingInfo) {
    const allBookings = bookingInfo.filter(element => element.userID === this.id)
    this.allBookings = allBookings
  }
 determineBookings() {
  this.allBookings.forEach(element => {
    if (new Date(element.date) > new Date(this.date)) {
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
}

export default singleCustomer;
