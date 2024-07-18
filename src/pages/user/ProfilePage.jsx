import React, { useState, useContext, useRef, useEffect } from "react";
import "../../styles/button.css";
import { Tooltip } from "primereact/tooltip";
import { Badge } from "primereact/badge";
// import { LoaderContext } from '../../context/loader.jsx';
// import { PopUpContext } from '../../context/popup.jsx';
import { Button } from "primereact/button";
//css
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, useFormik } from "formik";
// import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { Checkbox } from "primereact/checkbox";
import * as yup from "yup";
//import ProfileCard from "../../components/dashboard/ProfileCard.jsx";
import { ErrorMessage } from "formik";
import { UserReg } from "../../apis/UserReg.js";
import useFetchAuth from "../../hooks/useFetchAuth.js";
import { BASE_URL } from "../../constants/urls.js";
import { UserContext } from "../../context/user.jsx";
import { submitUserDetails } from "../../services/user.js";
import { campusAmbassodorAPI } from "../../services/campusAmbassadorAPI.js";
//import "primereact/resources/primereact.min.css";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../../constants/key.js";
import "../../styles/hero.css"
import "../../styles/home.css"
const KErrorMessage = ({ name }) => {
    return (
        <div className="absolute text-xs left-40  md:pr-10 md:relative md:left-0 md:right-80 text-red-300">
            <ErrorMessage name={name} />
        </div>
    );
};

function ProfilePage() {


    const [ref, setRef] = useState(null);
    const [values, setValues] = useState(null);
    // const { setLoader } = useContext(LoaderContext);
    const toast = useRef(null);
    // const { showDialog } = useContext(DialogPopup);


    const { userState, tokenState } = useContext(UserContext);
    // eslint-disable-next-line no-unused-vars
    const [userDetails, setUserDetails] = userState;
    // eslint-disable-next-line no-unused-vars
    const [token, setToken] = tokenState;

    const navigate = useNavigate();

    const {
        error,
        isPending,
        data: profile,
    } = useFetchAuth(BASE_URL + "/api/users/me/", token);
    const validationSchema = yup.object({
        name: yup.string().required("Required"),
        phone_number: yup
            .number()
            .required("Required")
            .lessThan(10000000000)
            .moreThan(999999999),
        college_name: yup.string().required("Required"),
        dept_name: yup.string().required("Required"),
        gender: yup.string().required("Please select a gender"),
    });

    useEffect(() => {
        const data = localStorage.getItem("referral");
        if(data)
        {
            const dat = JSON.parse(data);
            setRef(dat);
        }
        else if(profile&&profile.is_ca!==null)
        {
            async function CA()
            {
                const loggedInUserToken = localStorage.getItem(TOKEN_STORAGE_KEY);
                const data = await campusAmbassodorAPI(loggedInUserToken);
                const referral = await data.json();
                const keys = Object.keys(referral);
                const secondKey = keys[1];
                const code = referral[secondKey];
                setRef(code);   
            }
            CA();
        }
    }, [profile]);
    // const isFormFieldInvalid = (name) =>
    //     !!(formik.touched[name] && formik.errors[name]);
    const [accomodation, setAccomodation] = useState(false);
    const handleSubmit = async (values) => {
        // setLoading(true);
        // console.log(values);
        if (values) {
            //setLoader(true);
            const response = await submitUserDetails(
                token,
                {
                    ...values,
                    phone_number: "+91" + values.phone_number.toString(),
                    profile_image: profile.profile_image,
                    name: values.name,
                    college_name: values.college_name,
                    dept_name: values.dept_name,
                    username: profile.username,
                    url: profile.url,
                    email: profile.email,
                    accommodation: accomodation,
                    gender: values.gender,
                    is_ca: profile.is_ca
                },
                profile.username
            );
            // setLoading(false);
            //console.log(response);
            if (response.status === 200) {
                // showPopup('success', 'Form Submitted', 'Profile updated successfully');

                setValues(values);
                alert("Profile updated successfully", "Success");
            } else if (response.status === 409) {
                // showPopup('Failed', 'Form not Submitted', 'Registration with this Email already exists');
                alert("Registration with this Email already exists", "Failed");
            } else if (response.status === 400) {
                // showPopup('Failed', 'Form not Submitted', 'Registration with this Email already exists');
                const resp = await response.json();
                alert(
                    `${JSON.stringify(resp)}`
                );
            } else if (response.status < 500) {
                // showPopup('Failed', 'Form not Submitted', 'Registration with this Email already exists');
                const resp = await response.json();
                alert(`${JSON.stringify(resp)}`, "Failed");
            } else {
                // showPopup('Failed', 'Form not Submitted', 'Something went wrong');

                alert(`${JSON.stringify(resp)}`, "Failed");
            }
            //setLoader(false)
        }
        //setPopUp(true);
    };

    function handleLogout() {
        setToken(null);
        setUserDetails(null);
        navigate("/");
        localStorage.setItem("hestiaUser", "");
        localStorage.setItem("hestiaUserToken", "");
        localStorage.setItem("referral", "");
    }

    async function applyForCa() {
        console.log(values);
        if (
            values !== null &&
            values.name !== null &&
            values.phone_number !== null &&
            values.college_name !== null &&
            values.gender !== null &&
            values.dept_name !== null
        ) {
            try {
                const loggedInUserToken = localStorage.getItem(TOKEN_STORAGE_KEY);
                const data = await campusAmbassodorAPI(loggedInUserToken);
                const referral = await data.json();
                const keys = Object.keys(referral);
                const secondKey = keys[1];
                const code = referral[secondKey];
                setRef(code);
                alert(`Your Referal Code - ${code}`, "Success");
                localStorage.setItem("referral",JSON.stringify(code));
            } catch (error) {
                // console.log(error);
            }
        } else {
            alert("Please complete the profile to apply");
        }
    }

    return (
        <div className="w-full text-general min-h-[100vh]  py-8 px-4 md:px-8 bg-black grid-background ">
            <div className="hero-section flex flex-col items-center justify-start w-full h-full rounded-3xl relative">
                {/* <ProfileCard /> */}
                {/* <Toast ref={toast} /> */}

                <div className="  h-fit px-8 w-full bg-bg  flex flex-col   mt-20 my-5 rounded-md">
                    <div className="mt-5 flex flex-row justify-between ">
                        <div className="flex justify-center md:justify-start">
                            {profile && (
                                <div className="flex flex-col md:flex-row md:items-center">
                                    <img
                                        src={profile?.profile_image}
                                        className="rounded-full bg-white h-16 w-16 md:h-36 md:w-36 mx-2"
                                    />

                                    <h1 className=" text-white">{profile.email}</h1>
                                </div>
                            )}

                        </div>
                        <div className="">
                            <button
                                type="reset"
                                onClick={handleLogout}
                                className="text-white bg-blue-500 px-5 py-1 my-4 rounded mx-2 hover:bg-blue-100 hover:text-black transition-all "
                            >
                                Logout
                            </button>


                        </div>
                    </div>
                    <Formik
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                        initialValues={{
                            name:
                                profile !== null && profile.name !== null ? profile?.name : "",
                            phone_number:
                                profile !== null && profile?.phone_number !== null
                                    ? profile?.phone_number.slice(3)
                                    : "",
                            college_name:
                                profile !== null && profile?.college_name !== null
                                    ? profile?.college_name
                                    : "",
                            dept_name:
                                profile !== null && profile?.dept_name !== null
                                    ? profile?.dept_name
                                    : "",
                            accommodation: false,
                            gender:
                                profile !== null && profile?.gender !== null
                                    ? profile?.gender
                                    : "",
                        }}
                        className="w-full "
                    >
                        {(formProps) => (
                            <Form className="flex  rounded py-3  flex-col items-center md:items-start mt-8">
                                {ref ? (
                                    <div>
                                        <label className="mt-10 pb-2 w-full 2 text-md text-[#888]">
                                            # Referral Code
                                        </label>
                                        <div className="py-2   outline-none  rounded-md  px-4   placeholder-slate-500 placeholder-opacity-50   outline  bg-transparent hover:shadow-sm hover:border-secondary-light hover:border-opacity-40 border border-general border-opacity-20 text-white ">
                                            {ref}
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            type="reset"
                                            onClick={applyForCa}
                                            className=" text-white border border-white border-opacity-20  hover:border-opacity-80 animate-pulse-slow  bg-blue-500 p-2 my-4 rounded mx-2 hover:bg-blue-100 hover:text-black transition-all "
                                        >
                                            Apply For Campus Ambassador
                                        </button>

                                    </>
                                )}

                                <div className="md:w-1/2">
                                    <label className="  2 text-md text-[#888]">
                                        # Name
                                    </label>
                                    <div className="w-full py-2">
                                        <Field
                                            id="name"
                                            required={true}
                                            className="   w-full  outline-none  rounded-md py-2 px-4   placeholder-slate-500 placeholder-opacity-50   outline  bg-transparent hover:shadow-sm hover:border-secondary-light hover:border-opacity-40 border border-general border-opacity-20 text-white "
                                            name="name"
                                            type="text"
                                        />
                                        <KErrorMessage name="name" />
                                    </div>
                                </div>

                                <div className="md:w-1/2">
                                    <label className="w-full text-md text-[#888]"># Gender</label>

                                    <div className="w-full py-2">
                                        <div>
                                            <label className="text-white pr-4">
                                                <Field type="radio" name="gender" value="M" />
                                                Male
                                            </label>
                                            <label className="text-white">
                                                <Field type="radio" name="gender" value="F" />
                                                Female
                                            </label>
                                        </div>
                                        <ErrorMessage name="gender" component="div" />
                                    </div>
                                </div>

                                <div className="md:w-1/2">
                                    <label className="w-full text-md text-[#888]">
                                        # Phone Number
                                    </label>

                                    <div className="w-full py-2">
                                        <Field
                                            // onChange={formik.handleChange}
                                            // value={formik.values.phone_number || ""}
                                            id="phone_number"
                                            required={true}
                                            className="  w-full  outline-none  rounded-md py-2 px-4   placeholder-slate-500 placeholder-opacity-50   outline  bg-transparent hover:shadow-sm hover:border-secondary-light hover:border-opacity-40 border border-general border-opacity-20  text-white"
                                            name="phone_number"
                                            type="number"
                                        />
                                        <KErrorMessage name="phone_number" />
                                    </div>
                                </div>

                                <div className="md:w-1/2">
                                    <label className="text-md text-[#888]"># College name</label>
                                    <div className="w-full py-2">
                                        <Field
                                            // onChange={formik.handleChange}
                                            // value={formik.values.college_name || ""}
                                            id="college_name"
                                            required={true}
                                            className="  w-full  outline-none  rounded-md py-2 px-4   placeholder-slate-500 placeholder-opacity-50   outline  bg-transparent hover:shadow-sm hover:border-secondary-light hover:border-opacity-40 border border-general border-opacity-20 text-white "
                                            name="college_name"
                                            type="text"
                                        />
                                        <KErrorMessage name="college_name" />
                                    </div>
                                </div>
                                <div className="md:w-1/2">
                                    <label className=" w-full text-md text-[#888]">
                                        # Department
                                    </label>
                                    <div className="w-full py-2">
                                        <Field
                                            // onChange={formik.handleChange}
                                            // value={formik.values.dept_name || ""}
                                            id="dept_name"
                                            required={true}
                                            className=" w-full outline-none  rounded-md py-2 px-4   placeholder-slate-500 placeholder-opacity-50   outline  bg-transparent hover:shadow-sm hover:border-secondary-light hover:border-opacity-40 border border-general border-opacity-20  text-white"
                                            name="dept_name"
                                            type="text"
                                        />
                                        <KErrorMessage name="dept_name" />
                                    </div>
                                </div>
                                <div className="flex flex-row ml-3  mb-4 items-center justify-between  ">
                                    <label className="cursor-pointer flex flex-row items-center">
                                        <h1 className="w-fit font-medium text-white">
                                            Is accommodation required ?
                                        </h1>

                                        <input
                                            id="accommodation"
                                            onChange={(event) => {
                                                setAccomodation(event.target.checked);
                                            }}
                                            name="accommodation"
                                            defaultChecked={profile && profile.accommodation}
                                            type="checkbox"
                                            className="checkbox checkbox-secondary-light bg-primary-light  ml-5  outline-none  rounded-md py-2 px-4   placeholder-slate-500 placeholder-opacity-50   outline  bg-transparent hover:shadow-sm hover:border-secondary-light hover:border-opacity-40 border border-general border-opacity-20 "
                                        />
                                    </label>
                                </div>
                                <i className="text-xs text-gray-400 text-center my-2 mb-4">
                                    * Accommodation will be only confirmed after the event
                                    charting
                                </i>
                                <div className="w-full flex flex-row justify-center">
                                    <div className=" md:mt-5 flex flex-row ">
                                        <div style={{ textAlign: "center" }}>
                                            <button
                                                className="text-white bg-green-500 p-2 rounded mx-2 hover:bg-green-100 hover:text-black transition-all"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>

                                        <button
                                            type="reset"
                                            onClick={Formik.resetForm}
                                            className="text-white bg-blue-500 p-2 rounded mx-2 hover:bg-blue-100 hover:text-black transition-all "
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

        // </UseContextProvider>
    );
}
export default ProfilePage;
