import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { WithAuthProtection } from "../../components/WithAuthProtection";
import http from "../../helpers/http";
import useAuthStore from "../../store/authStore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const ClaimWarrantyPage = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [tipe, setTipe] = useState("");
  const [part, setPart] = useState("");
  const { user } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPenawaran) {
        const response = await http(user).put(
          `/claim-garansi/${editingPenawaran.id}`,
          {
            serialnumber: serialNumber,
            tipe,
            part,
          }
        );
        setEditingPenawaran(null);
        setSerialNumber("");
        setTipe("");
        setPart("");
        fetchData();
        return;
      }

      const response = await http(user).post("/claim-garansi", {
        serialnumber: serialNumber,
        tipe,
        part,
      });
      setSerialNumber("");
      setTipe("");
      setPart("");
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await http(user).delete(`/claim-garansi/${id}`);
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
    setPart(penawaran.part);
  };

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await http(user).get("/claim-garansi");
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
    const columns = ["No", "Serial Number", "Tipe", "Part"];
    const body = [];

    data.forEach((penawaran) => {
      const penawaranData = [
        penawaran.id,
        penawaran.serialnumber,
        penawaran.tipe,
        penawaran.part,
      ];
      body.push(penawaranData);
    });

    doc.autoTable({ columns, body, startY: 20 });
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
              htmlFor="tipe"
            >
              Tipe
            </label>
            <input
              className="border p-2"
              id="tipe"
              type="text"
              placeholder="Tipe"
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="part"
            >
              Part
            </label>
            <input
              className="border p-2"
              id="part"
              type="text"
              placeholder="Part"
              value={part}
              onChange={(e) => setPart(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            {editingPenawaran ? "Update" : "Submit"}
          </button>
        </form>
        <hr />
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Penawaran List
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
                <th className="px-4 py-2">Nomor</th>
                <th className="px-4 py-2">Serial Number</th>
                <th className="px-4 py-2">Tipe</th>
                <th className="px-4 py-2">Part</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((penawaran) => (
                <tr key={penawaran.id}>
                  <td className="border px-4 py-2">{penawaran.id}</td>
                  <td className="border px-4 py-2">{penawaran.serialnumber}</td>
                  <td className="border px-4 py-2">{penawaran.tipe}</td>
                  <td className="border px-4 py-2">{penawaran.part}</td>
                  <td className="border px-4 py-2">
                    <div className="flex space-x-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleEdit(penawaran)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(penawaran.id)}
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

export default WithAuthProtection(ClaimWarrantyPage);
