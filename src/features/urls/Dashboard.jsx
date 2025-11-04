import React from "react";
import { toast } from "react-toastify";

import { ReactComponent as DeleteIcon } from "@/assets/icons/delete.svg";
import Loader from "@components/Loader";
import "./Dashboard.css";

import CreateShortUrl from "./CreateShortUrl";
import { useAllUrlsQuery, useDeleteUrlMutation } from "./urlApi";

const Dashboard = () => {
  const { data, isLoading, isSuccess } = useAllUrlsQuery(1);
  const [deleteUrl] = useDeleteUrlMutation();
  const handleDeleteUrl = async (id) => {
    try {
      const res = await deleteUrl(id);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <CreateShortUrl />

      {isLoading && <Loader />}
      {isSuccess && (
        <div className="url-list">
          <h3>Your Shortened URLs</h3>
          {data?.data?.length === 0 ? (
            <p>No URLs yet. Create one above!</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Original URL</th>
                  <th>Short URL</th>
                  <th>created At</th>
                  <th>expires At</th>
                  <th>Click Count</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((url) => (
                  <tr key={url.id}>
                    <td>{url.id}</td>
                    <td>{url.originalUrl}</td>
                    <td>
                      <a href={url.shortUrl} target="_blank" rel="noreferrer">
                        {url.shortUrl}
                      </a>
                    </td>
                    <td>{url.createdAt}</td>
                    <td>{url.expiresAt}</td>
                    <td>{url.clickCount}</td>
                    <td>
                      <DeleteIcon className="delete-icon" onClick={() => handleDeleteUrl(url.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
