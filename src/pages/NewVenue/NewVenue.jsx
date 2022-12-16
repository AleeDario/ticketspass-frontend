import React from "react";
import { Field, Form, Formik } from "formik";
import { Button} from "react-bootstrap";
import { BASE_URL } from "../../api/url";
import axios from "axios";
import "./NewVenue.css";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const initialValues = {
  name: "",
  address: "",
  capacity: 0,
  type: "",
  country: "",
  city: "",
};

export default function NewVenue() {
  const { token } = useSelector(store => store.user);

  const sendData = async (values, resetForm) => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.post(`${BASE_URL}/api/venues`, values, headers);
      Swal.fire({
        title: "Success",
        text: res.data.message,
        icon: "success",
      });
      resetForm(initialValues);
    } catch (error) {
      if (error.response) {
        if (Array.isArray(error.response.data.message)) {
          Swal.fire({
            title: "error",
            html: error.response.data.message.join("<br>"),
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "error",
            text: error.response.data.message || error.response.data,
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div>
      <h1>New Venue</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          sendData(values, resetForm);
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <label htmlFor="name">Name:</label>
              <Field name="name" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <Field name="address" placeholder="Address" />
            </div>
            <div>
              <label htmlFor="capacity">Capacity:</label>
              <Field name="capacity" placeholder="Capacity" type="number" />
            </div>
            <div>
              <label htmlFor="type">Type:</label>
              <Field name="type" placeholder="Type" />
            </div>
            <div>
              <label htmlFor="country">Country:</label>
              <Field name="country" placeholder="Country" />
            </div>
            <div>
              <label htmlFor="city">City:</label>
              <Field name="city" placeholder="city" />
            </div>
            <Button type="submit" variant="success">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
