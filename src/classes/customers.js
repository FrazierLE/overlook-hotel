import singleCustomer from './singleCustomer'

class Customers {
  constructor(customers) {
    this.customers = this.createCustomers(customers)
  }
  createCustomers(customers) {
    return customers.map((customerInfo) => {
      return new singleCustomer(customerInfo)
    })
  }
}

export default Customers;