import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AdminTable from "../../utils/AdminTable/AdminTable";
import adminConcertsActions from "../../redux/actions/adminConcertsActions";
import "./AdminConcerts.css";
import { Spinner } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AdminConcerts() {
  const dispatch = useDispatch();
  const { token } = useSelector(store => store.user);
  const { getInitialData, deleteConcert } = adminConcertsActions;
  const { concerts, message, loading } = useSelector(store => store.adminConcerts);

  useEffect(() => {
    dispatch(getInitialData());
    // eslint-disable-next-line
  }, []);

  const deleteOnClick = async (id, name) => {
    try {
      let confirmation = await Swal.fire({
        title: "Confirmation",
        text: `Are you sure do you want to delete ${name}?`,
        icon: "question",
        showConfirmButton: true,
        showDenyButton: true,
        denyButtonColor: "blue",
        confirmButtonText: "Yes",
        confirmButtonColor: "red",
      });
      if (confirmation.isConfirmed) {
        let headers = { headers: { Authorization: `Bearer ${token}` } };
        let res = await dispatch(deleteConcert({ id, headers })).unwrap();
        console.log(res);
        if (!res.success) {
          Swal.fire({
            title: "Error",
            text: res.message,
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };
  return (
    <div>
      <Link to="/admin/concerts/new">
        <Button variant="success" className="mb-4">
          New Concert
        </Button>
      </Link>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner className="text-center" />
        </div>
      ) : concerts.length > 0 ? (
        <AdminTable
          title="Concerts"
          collection={concerts}
          editRoute="/admin/concerts/edit/"
          deleteOnClick={deleteOnClick}
        />
      ) : (
        <h2 className="text-center text-main">{message}</h2>
      )}
    </div>
  );
}
