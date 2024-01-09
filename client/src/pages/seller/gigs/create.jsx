import { categories } from "../../../utils/categories.js";
import React, { useState } from "react";
import ImageUpload from "../../../components/ImageUpload.jsx";
import axios from "axios";
import { ADD_GIG_ROUTE } from "../../../utils/constant.js";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

function create() {
  const [cookies] = useCookies();
  const router = useRouter();
  const [files, setFile] = useState([]);
  const [features, setfeatures] = useState([]);
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    time: 0,
    revisions: 0,
    feature: "",
    price: "",
    shortDesc: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addFeature = () => {
    if (data.feature) {
      setfeatures([...features, data.feature]);
      setData({ ...data, feature: "" });
    }
  };

  const removeFeature = (index) => {
    const clonedFeatures = [...features];
    clonedFeatures.splice(index, 1);
    setfeatures(clonedFeatures);
  };

  const addGig = async () => {
    const { category, description, price, revisions, time, title, shortDesc } =
      data;
    if (
      category &&
      description &&
      title &&
      features.length &&
      files.length &&
      price > 0 &&
      shortDesc.length &&
      revisions > 0 &&
      time > 0
    ) {
      const formData = new FormData();
      files.forEach((file) => formData.append("images", file));
      const gigData = {
        title,
        description,
        category,
        features,
        price,
        revisions,
        time,
        shortDesc,
      };

      const response = await axios.post(ADD_GIG_ROUTE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        Authorization: `Bearer ${cookies.jwt}`,
        params: gigData,
      });

      if (response.status === 201) {
        router.push("/seller/gigs");
      }
    }
  };

  const inputClassName =
    " block p-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500";
  const labelClassName =
    " mb-2 text-lg font-medium text-gray-900 dark:text-slate-700";

  return (
    <div className=" min-h-[80vh] my-10 mt-10 px-32">
      <h1 className=" text-6xl text-gray-900 mb-5">
        Buat halaman pekerjaan baru
      </h1>
      <h3 className=" text-3xl text-gray-900 mb-5">
        Tambahkan detail untuk layanan pekerjaan
      </h3>
      <div className=" flex flex-col gap-5 mt-10">
        <div className=" grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="title" className={labelClassName}>
              Judul Layanan Pekerjaan
            </label>
            <input
              type="text"
              name="title"
              value={data.title}
              onChange={handleChange}
              id="title"
              className={inputClassName}
              placeholder="eg. I will do something I really good at"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className={labelClassName}>
              Pilih Kategori
            </label>
            <select
              name="category"
              id="category"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
              onChange={handleChange}
            >
              {categories.map(({ name }) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className={labelClassName}>
            Deskripsi Layanan Pekerjaan
          </label>
          <textarea
            name="description"
            id="description"
            className=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a short description"
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className=" grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="delivery" className={labelClassName}>
              Waktu Pengiriman
            </label>
            <input
              type="number"
              name="time"
              value={data.time}
              onChange={handleChange}
              id="delivery"
              className={inputClassName}
              placeholder="Minimum delivery time"
              required
            />
          </div>
          <div>
            <label htmlFor="revision" className={labelClassName}>
              Revisi
            </label>
            <input
              type="number"
              name="revisions"
              value={data.revisions}
              onChange={handleChange}
              id="revision"
              className={inputClassName}
              placeholder="Max number of revisions"
              required
            />
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="features" className={labelClassName}>
              Fitur Layanan Pekerjaan
            </label>
            <div className=" flex gap-3 items-center mb-5">
              <input
                type="text"
                name="feature"
                value={data.feature}
                onChange={handleChange}
                id="features"
                className={inputClassName}
                placeholder="Enter a Feature Name"
                required
              />
              <button
                className=" focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium text-lg px-10 py-3 rounded-md"
                onClick={addFeature}
              >
                Tambah
              </button>
            </div>
            <ul className=" flex gap-2 flex-wrap">
              {features.map((feature, index) => (
                <li
                  key={index + feature}
                  className=" flex gap-2 items-center py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-red-700 cursor-pointer hover:border-red-200"
                >
                  <span>{feature}</span>
                  <span
                    className=" text-red-700"
                    onClick={() => removeFeature(index)}
                  >
                    X
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="image" className={labelClassName}>
              Gambar Pekerjaan
            </label>
            <div>
              <ImageUpload files={files} setFile={setFile} />
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-2 gap-11">
          <div>
            <label htmlFor="shortDesc" className={labelClassName}>
              Deskripsi Singkat
            </label>
            <input
              type="text"
              name="shortDesc"
              value={data.shortDesc}
              onChange={handleChange}
              id="shortDesc"
              className={inputClassName}
              placeholder="Enter a short description"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className={labelClassName}>
              Harga Layanan Pekerjaan (Rp)
            </label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={handleChange}
              id="price"
              className={inputClassName}
              placeholder="Enter a price"
              required
            />
          </div>
        </div>
        <div>
          <button
            className=" border text-lg font-semibold px-5 py-3 border-[#427D9D] bg-[#427D9D] text-white rounded-md mb-10"
            type="button"
            onClick={addGig}
          >
            Buat Pekerjaan
          </button>
        </div>
      </div>
    </div>
  );
}

export default create;
