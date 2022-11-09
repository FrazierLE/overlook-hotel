import { expect } from 'chai'
import Customers from '../src/classes/customers'
import singleCustomer from '../src/classes/singleCustomer'
import { sampleCustomers } from '../data/sample-data'

describe('Customers', () => {
  sampleCustomers
  let customer1, customer2, customer3, customer4, customers

  beforeEach(() => {
    sampleCustomers
    customer1 = new singleCustomer(sampleCustomers[0])
    customer2 = new singleCustomer(sampleCustomers[1])
    customer3 = new singleCustomer(sampleCustomers[2])
    customer4 = new singleCustomer(sampleCustomers[3])
    customers = new Customers(sampleCustomers)
  })

  it('should be a function', () => {
    expect(Customers).to.be.a('function')
  })
  it('should be a create a new instance of customer', () => {
    expect(customers.customers).to.deep.equal([customer1, customer2, customer3, customer4])
  })
  it('should create single customer instances.', () => {
    expect(customers.createCustomers(sampleCustomers)).to.deep.equal([customer1, customer2, customer3, customer4])
  })
})