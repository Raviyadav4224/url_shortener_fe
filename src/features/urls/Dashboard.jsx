import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ReactComponent as DeleteIcon } from "@/assets/icons/delete.svg";
import { api } from "@/store";
import { normalizeUrl } from "@/utils";
import Loader from "@components/Loader";
import "./Dashboard.css";

import CreateShortUrl from "./CreateShortUrl";
import { useAllUrlsQuery, useDeleteUrlMutation, useRedirectUrlMutation } from "./urlApi";
import { useLogoutMutation } from "../auth/authApi";
import { logout } from "../auth/authSlice";

const Dashboard = () => {
  const { data, isLoading, isSuccess } = useAllUrlsQuery();
  const [deleteUrl] = useDeleteUrlMutation();
  const [redirectUrl] = useRedirectUrlMutation();
  const [logOutUser, { isLoading: isLoadingLogout }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteUrl = async (id) => {
    try {
      const res = await deleteUrl(id);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleRedirect = async (url) => {
    try {
      const res = await redirectUrl(normalizeUrl(url)).unwrap();
      toast(res?.message);
      window.open(res?.data?.originalurl, "_blank", "noopener,noreferrer");
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logOutUser().unwrap();
      dispatch(logout());
      toast.success(res?.message);
      navigate("/", { replace: true });
      dispatch(api?.util?.resetApiState()); //Clear api states in rtkq on logout
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="dashboard-container dashboard-bg">
      <h2>Dashboard</h2>

      <CreateShortUrl />

      {(isLoading || isLoadingLogout) && <Loader />}
      {isSuccess && (
        <div className="url-list">
          <div className="user-details">
            <h3>User Details</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
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
                  <th>Created At</th>
                  <th>Expires At</th>
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
                      <a
                        // href={url.shortUrl}
                        data-label="Short URL"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => handleRedirect(url.shortUrl)}
                      >
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
