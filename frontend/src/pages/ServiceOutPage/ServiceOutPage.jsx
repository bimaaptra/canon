import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { WithAuthProtection } from "../../components/withAuthProtection";
import http from "../../helpers/http";
import useAuthStore from "../../store/authStore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ServiceOutPage = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [tipe, setTipe] = useState("");
  const [kelengkapan, setKelengkapan] = useState("");
  const { user } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPenawaran) {
        const response = await http(user).put(
          `/service-out/${editingPenawaran.id}`,
          {
            serialnumber: serialNumber,
            tipe,
            kelengkapan,
          }
        );
        setEditingPenawaran(null);
        setSerialNumber("");
        setTipe("");
        setKelengkapan("");
        fetchData();
        return;
      }

      const response = await http(user).post("/service-out", {
        serialnumber: serialNumber,
        tipe,
        kelengkapan,
      });
      setSerialNumber("");
      setTipe("");
      setKelengkapan("");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await http(user).delete(`/service-out/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const [editingPenawaran, setEditingPenawaran] = useState(null);

  const handleEdit = (penawaran) => {
    setEditingPenawaran(penawaran);
    setSerialNumber(penawaran.serialnumber);
    setTipe(penawaran.tipe);
    setKelengkapan(penawaran.kelengkapan);
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http(user).get("/service-out");
      console.log(response.data.results);
      setData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    const columns = [
      "Number",
      "Receipt Number",
      "Service In Receipt Number",
      "Customer",
      "Serial Number",
      "Type",
      "Equipments",
    ];
    const body = [];

    data.forEach((serviceOut) => {
      const serviceOutData = [
        serviceOut.id,
        serviceOut.nomor_service,
        serviceOut.ServiceIn.nomor_service,
        serviceOut.ServiceIn.customer.nama,
        serviceOut.ServiceIn.serial_number,
        serviceOut.ServiceIn.tipe,
        serviceOut.ServiceIn.kelengkapan.length !== 0
          ? serviceOut.ServiceIn.kelengkapan.map((item) => item.nama).join(", ")
          : "No Equipment",
      ];
      body.push(serviceOutData);
    });

    doc.autoTable({ columns, body, startY: 20 });
    doc.save("report.pdf");
  };

  return (
    <>
      <Header />
      <section className="p-4">
        {/* <form className='mb-4 space-y-4' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label
              className='mb-2 font-bold text-lg text-gray-900'
              htmlFor='name'
            >
              Serial Number
            </label>
            <input
              className='border p-2'
              id='serialNumber'
              type='text'
              placeholder='SerialNumber'
              value={serialNumber}
              onChange={e => setSerialNumber(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label
              className='mb-2 font-bold text-lg text-gray-900'
              htmlFor='tipe'
            >
              Tipe
            </label>
            <input
              className='border p-2'
              id='tipe'
              type='text'
              placeholder='Tipe'
              value={tipe}
              onChange={e => setTipe(e.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <label
              className='mb-2 font-bold text-lg text-gray-900'
              htmlFor='kelengkapan'
            >
              Kelengkapan
            </label>
            <input
              className='border p-2'
              id='kelengkapan'
              type='text'
              placeholder='Kelengkapan'
              value={kelengkapan}
              onChange={e => setKelengkapan(e.target.value)}
            />
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            type='submit'
          >
            {editingPenawaran ? 'Update' : 'Submit'}
          </button>
        </form>
        <hr /> */}
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Service Out List
          </h1>
          <button
            onClick={generatePDF}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Generate PDF
          </button>
          <table className="w-full table-auto border">
            <thead>
              <tr>
                <th className="px-4 py-2">Number</th>
                <th className="px-4 py-2">Receipt Number</th>
                <th className="px-4 py-2">Service In Receipt Number</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Serial Number</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Equipments</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((serviceOut) => (
                <tr key={serviceOut.id}>
                  <td className="border px-4 py-2">{serviceOut.id}</td>
                  <td className="border px-4 py-2">
                    {serviceOut.nomor_service}
                  </td>
                  <td className="border px-4 py-2">
                    {serviceOut.ServiceIn.nomor_service}
                  </td>
                  <td className="border px-4 py-2">
                    {serviceOut.ServiceIn.customer.nama}
                  </td>
                  <td className="border px-4 py-2">
                    {serviceOut.ServiceIn.serial_number}
                  </td>
                  <td className="border px-4 py-2">
                    {serviceOut.ServiceIn.tipe}
                  </td>
                  <td className="border px-4 py-2">
                    {serviceOut.ServiceIn.kelengkapan.length !== 0
                      ? serviceOut.ServiceIn.kelengkapan.map((item) => (
                          <ul key={item.id} className="list-disc list-inside">
                            <li>{item.nama}</li>
                          </ul>
                        ))
                      : "No Equipment"}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEdit(serviceOut)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(serviceOut.id)}
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
  );
};

export default WithAuthProtection(ServiceOutPage);
