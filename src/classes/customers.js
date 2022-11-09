import singleCustomer from './singleCustomer'

class Customers {
  constructor(customersData) {
    this.customers = this.createCustomers(customersData)
  }
  createCustomers(customers) {
    return customers.map((customerInfo) => {
      return new singleCustomer(customerInfo)
    })
  }
}

export default Customers;