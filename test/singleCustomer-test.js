import { expect } from 'chai'
import singleCustomer from '../src/classes/singleCustomer'
import { sampleCustomers, sampleBookings } from '../data/sample-data'


describe('Single Customer', () => {
  sampleCustomers
  sampleBookings
  let customer1, customer2

  beforeEach(() => {
    sampleCustomers
    sampleBookings
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
  it('should have a list of bookings', () => {
    expect(customer1.bookings).to.deep.equal([])
    expect(customer2.bookings).to.deep.equal([])
  })
  it('should hold a list of bookings', () => {
    customer1.determineBookings(sampleBookings)
    expect(customer1.bookings).to.deep.equal([sampleBookings[3]])
    customer2.determineBookings(sampleBookings)
    expect(customer2.bookings).to.deep.equal([])
  })
})