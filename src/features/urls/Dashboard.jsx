import React from "react";

import "./Dashboard.css";
import Loader from "@components/Loader";

import CreateShortUrl from "./CreateShortUrl";
import { useAllUrlsQuery } from "./urlApi";

const Dashboard = () => {
  const { data, isLoading, isSuccess } = useAllUrlsQuery(1);
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      <CreateShortUrl
      // onAdd={handleAddUrl}
      />

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
