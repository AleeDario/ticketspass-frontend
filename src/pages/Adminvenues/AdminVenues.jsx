import React, { useEffect} from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import adminVenuesActions from "../../redux/actions/AdminVenuesActions";
import AdminTable from "../../utils/AdminTable/AdminTable";
import "./AdminVenues.css";

export default function AdminVenues() {
  const dispatch = useDispatch();
  const { token } = useSelector(store => store.user);
  const { getInitialData, deleteVenue } = adminVenuesActions;
  const { venues, message, loading } = useSelector(store => store.adminVenues);

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
        let res = await dispatch(deleteVenue({ id, headers })).unwrap();
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
      <Link to="/admin/venues/new">
        <Button variant="success" className="mb-4">
          New Venue
        </Button>
      </Link>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner className="text-center" />
        </div>
      ) : venues.length > 0 ? (
        <AdminTable title="Venues" collection={venues} editRoute="/admin/venues/edit/" deleteOnClick={deleteOnClick} />
      ) : (
        <h2 className="text-center text-main">{message}</h2>
      )}
    </div>
  );
}
