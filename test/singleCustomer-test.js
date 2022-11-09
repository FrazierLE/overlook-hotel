import { expect } from 'chai'
import singleCustomer from '../src/classes/singleCustomer'
import { sampleCustomers } from '../data/sample-data'


describe('Single Customer', () => {
  sampleCustomers
  let customer1, customer2

  beforeEach(() => {
    sampleCustomers
    customer1 = new singleCustomer(sampleCustomers[0])
    customer2 = new singleCustomer(sampleCustomers[1])
  })
  
  it('should be a function', () => {
    expect(singleCustomer).to.be.a('function')
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