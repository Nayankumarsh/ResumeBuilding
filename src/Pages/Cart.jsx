

import React, { useEffect, useState } from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";



function Cart() {
  const [data, setData] = useState([]);
 
  useEffect(() => {
    const storedData = localStorage.getItem("customersData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []);

  console.log(data);

  function removeResume(name) {
    setData((prevData) => {
      const updatedData = prevData.filter((customer) => customer.name !== name);
      localStorage.setItem("customersData", JSON.stringify(updatedData));
      return updatedData;
    });
  }
  
  
function dounloadResume(){

}

  return (
    <div className="bg-primary">
    <div className="gap">
      <h2 className="d-flex justify-content-center text-white">Resume</h2>
      <Link to ="/" className="align-self-end"> <button
        type="button"
        className="text-white bg-dark rounded btn  mr-md-5 p-2"
      >
        View Resume
      </button>
      </Link>
      {data.map((customer, index) => (<div>
        <div key={index} className="container2 m-5">
          <div>
            <h2>{customer.name}</h2>
            <h5 className="desig">{customer.experience[0].designation}</h5>
          </div>
          <div className="d-flex justify-content-around contact">
            <div className="d-flex">
              <div className="mr-2 e">
                <AiTwotoneMail />
              </div>
              <div className="e">{customer.email}</div>
            </div>
            <div className="d-flex">
              <div className="mr-2 e">
                <BsFillTelephoneFill />
              </div>
              <div className="e">{customer.number}</div>
            </div>
          </div>

          <div className="d-flex gap2 px-3">
            <div className="subs1">
              <h4 className="mb-2">Education</h4>
              {customer.education.map((ed, index) => (
                <div key={index}>
                  <div>{ed.institution}</div>
                  <div> {ed.degree}</div>
                  <div className="d-flex gap3">
                    <p className="datet">{ed.sdate}</p>
                    <p className="datet">{ed.edate}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="educw">
              <div className="subs2">
                <h4 className="mb-2">Experience</h4>
                {customer.experience.map((ed, index) => (
                  <div key={index}>
                    <div>{ed.company}</div>
                    <div>{ed.designation}</div>
                    <div className="d-flex gap3">
                      <p className="datet">{ed.sdatex}</p>
                      <p className="datet">{ed.edatex}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h4>Skills</h4>
                <div className="d-flex skills">
                {[...(customer.skill)].map((sk, index) => (
                  <div className="skill" key={index}>{sk}</div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
        <button
                type="button"
                className="btn btn-primary my-3 mx-3"
                onClick={dounloadResume}
              >
                Dounload
              </button>
              <button
  type="button"
  className="btn btn-primary my-3 mx-3"
  onClick={() => removeResume(customer.name)}
>
  Delete
</button>

              </div>
              </div>
      ))}
    </div>
    </div>
  );

}

export default Cart;