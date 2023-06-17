import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  const [educationAdd, setEducationAdd] = useState(1);
  const [experienceAdd, setExperienceAdd] = useState(1);
  const Navigate = useNavigate();
  

  const [customersData, setCustomersData] = useState({
    name: "",
    email: "",
    address: "",
    number: "",
    education: [
      {
        institution: "",
        degree: "",
        sdate: "",
        edate: "",
      },
    ],
    experience: [
      {
        company: "",
        designation: "",
        sdatex: "",
        edatex: "",
      },
    ],
    skill: [],
  });

  function changeHandler(event) {
    const { name, value } = event.target;

    if (name.startsWith("education")) {
      const updatedEducation = [...customersData.education];
      const index = name.split(".")[1];
      const educationField = name.split(".")[2];
      updatedEducation[index][educationField] = value;

      setCustomersData((prev) => ({
        ...prev,
        education: updatedEducation,
      }));
    } else if (name.startsWith("experience")) {
      const updatedExperience = [...customersData.experience];
      const index = name.split(".")[1];
      const experienceField = name.split(".")[2];
      updatedExperience[index][experienceField] = value;

      setCustomersData((prev) => ({
        ...prev,
        experience: updatedExperience,
      }));
    } else if (name === "skill") {
      setCustomersData((prev) => ({
        ...prev,
        skill: value.split(",").map((skill) => skill.trim()),
      }));
    } else {
      setCustomersData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  function submitHandler(event) {
    event.preventDefault();
  
    // Retrieve existing data from local storage
    const storedData = localStorage.getItem("customersData");
    let existingData = [];
  
    if (storedData) {
      try {
        existingData = JSON.parse(storedData);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }
      } catch (error) {
        console.error("Error parsing existing data:", error);
      }
    }
  
    // Add new customersData to the array
    const updatedData = [...existingData, customersData];
  
    // Store updated data in local storage
    localStorage.setItem("customersData", JSON.stringify(updatedData));
  
    console.log(customersData);
    Navigate("/cart");
  }
  
  
  

  function addEducation() {
    setEducationAdd(educationAdd + 1);
    setCustomersData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          sdate: "",
          edate: "",
        },
      ],
    }));
  }

  function removeEducation(index) {
    if (educationAdd > 1) {
      setEducationAdd(educationAdd - 1);
      setCustomersData((prev) => ({
        ...prev,
        education: prev.education.filter((_, i) => i !== index),
      }));
    }
  }

  function addExperience() {
    setExperienceAdd(experienceAdd + 1);
    setCustomersData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          designation: "",
          sdatex: "",
          edatex: "",
        },
      ],
    }));
  }

  function removeExperience(index) {
    if (experienceAdd > 1) {
      setExperienceAdd(experienceAdd - 1);
      setCustomersData((prev) => ({
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index),

      }));
    }
  }


  return (
    <div className="wrapper bg-dark p-3 flex d-flex flex-column align-items-center">
      <h1 className="text-white heading text-center">RESUME BUILDER</h1>
     <Link to ="/cart" className="align-self-end"> <button
        type="button"
        className="text-white bg-primary rounded btn  mr-md-5 p-2"
      >
        View Resume
      </button>
      </Link>
      <div className="bg-white form w-70">
        <form onSubmit={submitHandler} className="d-flex-column gap-8px">
          {/* Basic Information */}
          <div>
            <h4 className="mb-3">Basic Information</h4>
            <div className="form-group d-flex justify-content-between ne">
              <div className="form-group w-100">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={changeHandler}
                  name="name"
                  value={customersData.name}
                  required
                  placeholder="Enter Name"
                />
              </div>
              <div className="form-group w-100">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={changeHandler}
                  name="email"
                  value={customersData.email}
                  required
                  placeholder="Enter email"
                />
              </div>
            </div>
            <div className="form-group d-flex justify-content-between ne">
              <div className="form-group w-100">
                <label htmlFor="Address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="Address"
                  onChange={changeHandler}
                  name="address"
                  value={customersData.address}
                  required
                  placeholder="Enter Address"
                />
              </div>
              <div className="form-group w-100">
                <label htmlFor="number">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  onChange={changeHandler}
                  name="number"
                  value={customersData.number}
                  required
                  placeholder="9124587632"
                />
              </div>
            </div>
          </div>
  
          {/* ADD EDUCATION */}
          <div className="my-5">
            <h4 className="mb-3">Add Education</h4>
            {[...Array(educationAdd)].map((_, index) => (
              <div key={index}>
                <div className="d-flex education ne">
                  <div className="form-group w-100">
                    <label htmlFor="institution">Institution/College/School</label>
                    <input
                      type="text"
                      className="form-control"
                      id="institution"
                      onChange={changeHandler}
                      name={`education.${index}.institution`}
                      value={customersData.education[index].institution}
                      required
                      placeholder="Enter the Institution"
                    />
                  </div>
                  <div className="form-group w-100">
                    <label htmlFor="degree">Degree/Stream</label>
                    <input
                      type="text"
                      className="form-control"
                      id="degree"
                      onChange={changeHandler}
                      name={`education.${index}.degree`}
                      value={customersData.education[index].degree}
                      required
                      placeholder="Enter Degree"
                    />
                  </div>
                </div>
                <div className="d-flex education ne">
                  <div className="form-group w-100">
                    <label htmlFor="sdate">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="sdate"
                      onChange={changeHandler}
                      name={`education.${index}.sdate`}
                      value={customersData.education[index].sdate}
                      required
                    />
                  </div>
                  <div className="form-group w-100">
                    <label htmlFor="edate">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="edate"
                      onChange={changeHandler}
                      name={`education.${index}.edate`}
                      value={customersData.education[index].edate}
                      required
                    />
                  </div>
                </div>
                <div className="h-3 d-flex justify-content-center">
                  <hr className="bg-black w-50 h-5" />
                </div>
              </div>
            ))}
  
            {educationAdd < 3 && (
              <button
                type="button"
                className="btn btn-primary my-3 md-3"
                onClick={addEducation}
              >
                Add More
              </button>
            )}
            {educationAdd > 1 && (
              <button
                type="button"
                className="btn btn-primary my-3 mx-3"
                onClick={() => removeEducation(customersData.education.index)}
              >
                Remove
              </button>
            )}
          </div>
  
          {/* Experience */}
  
          <div className="mt-3">
            <h4 className="mb-3">Add Experience</h4>
            {[...Array(experienceAdd)].map((_, index) => (
              <div key={index}>
                <div className="d-flex education ne">
                  <div className="form-group w-100">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      id="company"
                      onChange={changeHandler}
                      name={`experience.${index}.company`}
                      value={customersData.experience[index].company}
                      required
                      placeholder="Enter the Company Name"
                    />
                  </div>
                  <div className="form-group w-100">
                    <label htmlFor="designation">Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      id="designation"
                      onChange={changeHandler}
                      name={`experience.${index}.designation`}
                      value={customersData.experience[index].designation}
                      required
                      placeholder="Enter Designation"
                    />
                  </div>
                </div>
                <div className="d-flex education ne">
                  <div className="form-group w-100">
                    <label htmlFor="sdatex">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="sdatex"
                      onChange={changeHandler}
                      name={`experience.${index}.sdatex`}
                      value={customersData.experience[index].sdatex}
                      required
                    />
                  </div>
                  <div className="form-group w-100">
                    <label htmlFor="edatex">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      id="edatex"
                      onChange={changeHandler}
                      name={`experience.${index}.edatex`}
                      value={customersData.experience[index].edatex}
                      required
                    />
                  </div>
                </div>
  
                <div className="h-3 d-flex justify-content-center">
                  <hr className="bg-black w-50 h-5" />
                </div>
              </div>
            ))}
  
            {experienceAdd < 3 && (
              <button
                type="button"
                className="btn btn-primary my-3 md-3"
                onClick={addExperience}
              >
                Add More
              </button>
            )}
  
            {experienceAdd > 1 && (
              <button
                type="button"
                className="btn btn-primary my-3 mx-3"
                onClick={() => removeExperience(customersData.experience.index)}
              >
                Remove
              </button>
            )}
          </div>
  
          {/* skills */}
          <div className="my-4">
            <h4 className="mb-3">Add Skills</h4>
            <div className="form-group w-100 my-3">
              <label htmlFor="skill">Skills</label>
              <input
                type="text"
                className="form-control"
                id="skill"
                onChange={changeHandler}
                name="skill"
                value={customersData.skill} // Update the value attribute
                required
                placeholder="Enter the Skills you are good at"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary my-3">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  }
  
  export default Home;
  