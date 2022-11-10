class singleCustomer {
  constructor(customerData) {
    this.id = customerData.id;
    this.name = customerData.name;
    this.bookings = [];
  }
 determineBookings(bookingInfo) {
  const bookingList = bookingInfo.reduce((acc, element) => {
    if(element.userID === this.id) {
      acc.push(element)
    }
    return acc
  }, [])
  this.bookings = bookingList
 }
}

export default singleCustomer;