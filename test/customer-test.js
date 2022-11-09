import { expect } from 'chai'
import Customer from '../src/classes/customer'
import { sampleCustomers } from '../data/sample-data'


describe('Customer', () => {
  sampleCustomers
  let customer1, customer2

  beforeEach(() => {
    sampleCustomers
    customer1 = new Customer(sampleCustomers[0])
    customer2 = new Customer(sampleCustomers[1])
  })
  
  it('should be a function', () => {
    expect(Customer).to.be.a('function')
  })
  it('should have an id', () => {
    expect(customer1.id).to.equal(1)
    expect(customer2.id).to.equal(2)
  })
  it('should have an name', () => {
    expect(customer1.name).to.equal("Leatha Ullrich")
    expect(customer2.name).to.equal("Rocio Schuster")
  })
})