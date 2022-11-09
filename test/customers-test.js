import { expect } from 'chai'
import Customers from '../src/classes/customers'
// import rooms from '../src/classes/bookings'
import { sampleCustomers, sampleRooms, sampleBookings } from '../data/sample-data'


describe('Customers', () => {
  sampleCustomers
  let customer1, customer2

  beforeEach(() => {
    sampleCustomers
    customer1 = new Customers(sampleCustomers[0])
    customer2 = new Customers(sampleCustomers[1])
  })
  
  it('should be a function', () => {
    expect(Customers).to.be.a('function')
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