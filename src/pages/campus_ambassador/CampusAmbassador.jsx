import React, { useRef, useEffect,useContext } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import Header from "../../components/Header";
import { campusAmbassodorAPI } from "../../services/campusAmbassadorAPI";
import { UserContext } from "../../context/user";

function CampusAmbassador() {

    const { userState, tokenState } = useContext(UserContext);
  const [token, setToken] = tokenState;  

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    college: Yup.string().required("Required"),
    yearOfStudy: Yup.number().oneOf([1, 2, 3, 4, 5], "Must be a valid year of study")  
  .required("Required"),
    contactNumber: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("Required"),
    whatsappNumber: Yup.string()
      .max(10, "Must be 10 characters or less")
      .required("Required"),
    emailId: Yup.string()
      .email("Must be a valid email address")
      .required("Required"),
  });

  return (
    <div className="pt-32 bg-gradient-to-b from-black via-zinc-900 to-zinc-800 min-h-screen">
      <Header title={"hestia"} textSize={'200px'} keyC={1} />
      <div className="h-full  p-4 md:px-32 md:pt-16 ">
        <Formik
          initialValues={{
            name: "",
            college: "",
            yearOfStudy: "",
            contactNumber: "",
            whatsappNumber: "",
            emailId: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            (async()=>{
              const response = await campusAmbassodorAPI(token,values);
            })
          }}
        >
          <Form className="   p-12 rounded-lg border-2 border-white">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-serif text-white text-1xl font-bold mb-2"
              >
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-xs mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="college"
                className="block font-serif text-white text-1xl font-bold mb-2"
              >
                College
              </label>
              <Field
                name="college"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
              <ErrorMessage
                name="college"
                component="div"
                className="text-red-500 text-xs mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="yearOfStudy"
                className="block font-serif text-white text-1xl font-bold mb-2"
              >
                Year of Study
              </label>
              <Field
                name="yearOfStudy"
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
              <ErrorMessage
                name="yearOfStudy"
                component="div"
                className="text-red-500 text-xs mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block font-serif text-white text-1xl font-bold mb-2"
              >
                Contact Number
              </label>
              <Field
                name="contactNumber"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
              <ErrorMessage
                name="contactNumber"
                component="div"
                className="text-red-500 text-xs mt-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="whatsappNumber"
                className="block font-serif text-white text-1xl font-bold mb-2"
              >
                Whatsapp Number
              </label>
              <Field
                name="whatsappNumber"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
              <ErrorMessage
                name="whatsappNumber"
                component="div"
                className="text-red-500 text-xs mt-2"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="emailId"
                className="block font-serif text-white text-1xl font-bold mb-2"
              >
                Email ID
              </label>
              <Field
                name="emailId"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
              />
              <ErrorMessage
                name="emailId"
                component="div"
                className="text-red-500 text-xs mt-2"
              />
            </div>
            <div className="border-2 rounded-lg border-white flex items-center justify-center">
              <button type="submit" className="p-2 text-center block font-serif text-white text-1xl font-bold">Submit</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>  
  );
}

export default CampusAmbassador;
