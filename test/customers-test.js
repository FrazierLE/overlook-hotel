import { expect } from 'chai'
import Customers from '../src/classes/customers'
import rooms from '../src/classes/bookings'
import { sampleCustomers, sampleRooms, sampleBookings } from '../data/sample-data'


describe('Customers', () => {
  sampleCustomers
  let customers

  beforeEach(() => {
    sampleCustomers
    customers = new Customers(sampleCustomers)
  })
  
  it('should be a function', () => {
    expect(Customers).to.be.a('function')
  })
})