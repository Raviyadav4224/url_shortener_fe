import React, { useState } from "react";
import { toast } from "react-toastify";

import "./Dashboard.css";
import Loader from "@components/Loader";

import { useShortenMutation } from "./urlApi";

export default function CreateShortUrl() {
  const [form, setForm] = useState({ original: "" });

  const [shortenUrl, { isLoading }] = useShortenMutation();
  const handleChange = (e) => {
    setForm({ ...form, original: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.original.trim()) return;
    const { data: result } = await shortenUrl({ originalUrl: form.original });
    toast.success(result?.message);
    setForm({ original: "" });
  };

  return (
    <div className="create-url-box">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          name="original"
          placeholder="Enter long URL..."
          value={form.original}
          onChange={handleChange}
        />
        <button type="submit">Shorten</button>
      </form>
    </div>
  );
}
