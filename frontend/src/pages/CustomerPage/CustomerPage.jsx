import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { WithAuthProtection } from '../../components/withAuthProtection'
import http from '../../helpers/http'
import useAuthStore from '../../store/authStore'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const CustomerPage = () => {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const { user } = useAuthStore()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      if (editingCustomer) {
        await http(user).put(`/customer/${editingCustomer.id}`, {
          nama: name,
          no_telp: phoneNumber,
          alamat: address
        })
        setEditingCustomer(null)
        setName('')
        setPhoneNumber('')
        setAddress('')
        fetchData()
        return
      }

      await http(user).post('/customer', {
        nama: name,
        no_telp: phoneNumber,
        alamat: address
      })
      setName('')
      setPhoneNumber('')
      setAddress('')
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async id => {
    try {
      await http(user).delete(`/customer/${id}`)
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const [editingCustomer, setEditingCustomer] = useState(null)

  const handleEdit = customer => {
    setEditingCustomer(customer)
    setName(customer.nama)
    setPhoneNumber(customer.no_telp)
    setAddress(customer.alamat)
  }

  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await http(user).get('/customer')
      setData(response.data.results)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const generatePDF = () => {
    const doc = new jsPDF()
    const columns = ['No', 'Name', 'Phone Number', 'Address']
    const body = []

    data.forEach(customer => {
      const customerData = [
        customer.id,
        customer.nama,
        customer.no_telp,
        customer.alamat
      ]
      body.push(customerData)
    })

    doc.autoTable({ columns, body, startY: 20 })
    doc.save('report.pdf')
  }

  return (
    <>
      <Header />
      <section className='p-4'>
        <form className='mb-4 space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label
              className='mb-2 font-bold text-lg text-gray-900'
              htmlFor='name'
            >
              Full Name
            </label>
            <input
              className='border p-2'
              id='name'
              type='text'
              placeholder='Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label
              className='mb-2 font-bold text-lg text-gray-900'
              htmlFor='phoneNumber'
            >
              Phone
            </label>
            <input
              className='border p-2'
              id='phoneNumber'
              type='text'
              placeholder='Phone Number'
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label
              className='mb-2 font-bold text-lg text-gray-900'
              htmlFor='address'
            >
              Address
            </label>
            <input
              className='border p-2'
              id='address'
              type='text'
              placeholder='Address'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            {editingCustomer ? 'Update' : 'Submit'}
          </button>
        </form>
        <hr />
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>Customer List</h1>
          <button
            onClick={generatePDF}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
          >
            Generate PDF
          </button>
          <table className='w-full table-auto border'>
            <thead>
              <tr>
                <th className='px-4 py-2'>No</th>
                <th className='px-4 py-2'>Full Name</th>
                <th className='px-4 py-2'>Phone</th>
                <th className='px-4 py-2'>Address</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(customer => (
                <tr key={customer.id}>
                  <td className='border px-4 py-2'>{customer.id}</td>
                  <td className='border px-4 py-2'>{customer.nama}</td>
                  <td className='border px-4 py-2'>{customer.no_telp}</td>
                  <td className='border px-4 py-2'>{customer.alamat}</td>
                  <td className='border px-4 py-2'>
                    <div className='flex space-x-4'>
                      <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => handleEdit(customer)}
                      >
                        Edit
                      </button>
                      <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => handleDelete(customer.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default WithAuthProtection(CustomerPage)
