// React router
import { useState, useEffect } from "react";
// Sass
import css from "./SignUp.module.scss";
// Axios
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleForm = (e) => {
    e.preventDefault();

    // console.log(formData.name, formData.email);

    sendData()

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const sendData = async()=>{
    try {
      const response = await axios.post('/user?ID=12345', {
        name: formData.name,
        email: formData.email
      });
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className={css.container}>
      <h1>Sign up</h1>

      <form onSubmit={handleForm}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary submit">
          Submit
        </button>
      </form>
    </div>
  );
}
