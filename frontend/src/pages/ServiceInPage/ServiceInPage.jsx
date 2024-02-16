import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { WithAuthProtection } from "../../components/WithAuthProtection";
import http from "../../helpers/http";
import useAuthStore from "../../store/authStore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ServiceInPage = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [equipment, setEquipment] = useState([]);
  const { user } = useAuthStore();
  const [customerId, setCustomerId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingServiceIn) {
        await http(user).put(`/service-in/${editingServiceIn.id}`, {
          serial_number: serialNumber,
          tipe: type,
          kelengkapan: equipment,
          customerId,
        });
        setEditingServiceIn(null);
        setSerialNumber("");
        setType("");
        setEquipment([]);
        setCustomerId("");
        fetchData();
        return;
      }

      await http(user).post("/service-in", {
        serial_number: serialNumber,
        tipe: type,
        kelengkapan: equipment,
        customerId,
      });

      setSerialNumber("");
      setType("");
      setEquipment([]);
      setCustomerId("");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await http(user).delete(`/service-in/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const [editingServiceIn, setEditingServiceIn] = useState(null);

  const handleEdit = (serviceIn) => {
    setEditingServiceIn(serviceIn);
    setSerialNumber(serviceIn.serial_number);
    setType(serviceIn.tipe);
    setEquipment(serviceIn.kelengkapan.map((equip) => equip.nama));
    setCustomerId(serviceIn.customerId);
  };

  const handleAddEquipment = () => {
    setEquipment([...equipment, ""]);
  };

  const handleRemoveEquipment = (index) => {
    const newEquipment = [...equipment];
    newEquipment.splice(index, 1);
    setEquipment(newEquipment);
  };

  const handleEquipmentChange = (index, value) => {
    const newEquipment = [...equipment];
    newEquipment[index] = value;
    setEquipment(newEquipment);
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http(user).get("/service-in");
      setData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await http(user).get("/customer");
      setCustomers(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await http(user).put(`/service-in/status/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCustomers();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    const columns = ["No", "Serial Number", "Type", "Equipment", "Customer"];
    const body = [];

    data.forEach((serviceIn) => {
      const serviceInData = [
        serviceIn.id,
        serviceIn.nomor_service,
        serviceIn.serial_number,
        serviceIn.customer.nama,
        serviceIn.tipe,
        serviceIn.kelengkapan.length !== 0
          ? serviceIn.kelengkapan.map((item) => item.nama).join(", ")
          : "No Equipment",
      ];
      body.push(serviceInData);
    });

    doc.autoTable(columns, body);
    doc.save("report.pdf");
  };

  return (
    <>
      <Header />
      <section className="p-4">
        <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="customer"
            >
              Customer
            </label>
            <select
              className="border p-2"
              id="customer"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            >
              <option value="">Select a customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.nama}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="name"
            >
              Serial Number
            </label>
            <input
              className="border p-2"
              id="serialNumber"
              type="text"
              placeholder="SerialNumber"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="type"
            >
              Type
            </label>
            <input
              className="border p-2"
              id="type"
              type="text"
              placeholder="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="equipment"
            >
              Equipment
            </label>
            {equipment?.map((equip, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  className="border p-2 w-full"
                  id={`equipment-${index}`}
                  type="text"
                  placeholder="Equipment"
                  value={equip}
                  onChange={(e) => handleEquipmentChange(index, e.target.value)}
                />
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={() => handleRemoveEquipment(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-1"
              onClick={handleAddEquipment}
            >
              Add Equipment
            </button>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {editingServiceIn ? "Update" : "Submit"}
          </button>
        </form>
        <hr />
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            ServiceIn List
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
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Serial Number</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Equipment</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((serviceIn) => (
                <tr key={serviceIn.id}>
                  <td className="border px-4 py-2">{serviceIn.id}</td>
                  <td className="border px-4 py-2">
                    {serviceIn.nomor_service}
                  </td>
                  <td className="border px-4 py-2">
                    {serviceIn.customer.nama}
                  </td>
                  <td className="border px-4 py-2">
                    {serviceIn.serial_number}
                  </td>
                  <td className="border px-4 py-2">{serviceIn.tipe}</td>
                  <td className="border px-4 py-2">
                    {serviceIn.kelengkapan.length !== 0
                      ? serviceIn.kelengkapan.map((item) => (
                          <ul key={item.id} className="list-disc list-inside">
                            <li>{item.nama}</li>
                          </ul>
                        ))
                      : "No Equipment"}
                  </td>
                  <td className="border px-4 py-2">
                    {serviceIn.status === "Pending" ? (
                      <button
                        className="bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                        disabled
                      >
                        {serviceIn.status}
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded"
                        disabled
                      >
                        {serviceIn.status}
                      </button>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-4">
                      {serviceIn.status === "Pending" && (
                        <button
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleComplete(serviceIn.id)}
                        >
                          Complete
                        </button>
                      )}
                      <button
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                          serviceIn.status === "Complete" && "hover:bg-blue-500"
                        }`}
                        onClick={() => handleEdit(serviceIn)}
                        disabled={serviceIn.status === "Complete"}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(serviceIn.id)}
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

export default WithAuthProtection(ServiceInPage);
