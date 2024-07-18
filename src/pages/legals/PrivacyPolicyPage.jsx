import React from "react";
import "../../styles/home.css";

const PrivacyPolicyPage = () => {
  return (
    <div className="flex grid-background justify-center text-center font-Geomanist">
      <div
        className="container mt-[10rem] mx-3 md:mt-32 mb-2 bg-black h-full md:w-3/4 p-5 border-[0.2px] rounded-xl min-w-sm bg-clip-padding backdrop-filter backdrop-blur-sm opacity-80 "
        style={{ color: "#FBF0C2" }}
      >
        <h1 className="text-4xl text-[#FBF0C2] font-bold no-underline ">
          Privacy Policy
        </h1>
        <hr className="m-2 w-half"></hr>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          At Hestia 24, we value the privacy and security of our users' personal
          information. This Privacy Policy outlines the types of personal
          information we collect, how we collect it, how we use it, and how we
          protect it.
        </p>
        <h1 className="text-2xl text-[#FBF0C2] font-semibold p-2 text-left no-underline ">
          Information We Collect
        </h1>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          We may collect the following personal information from our users for
          registration related activities and payment purposes:
        </p>
        <ul>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            1.Name
          </li>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            2.Email address
          </li>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            3.Phone number
          </li>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            4.College name
          </li>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            5.Payment information (credit card details or other payment
            information)
          </li>
        </ul>
        <h1 className="text-2xl text-[#FBF0C2] p-2 font-semibold text-left no-underline ">
          How We Collect Information
        </h1>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          We collect personal information through online registration forms and
          payment gateways. We may also collect information from social media
          platforms if users choose to connect their social media accounts with
          our registration platform.
        </p>
        <h1 className="text-2xl text-[#FBF0C2] font-semibold p-2 text-left no-underline ">
          How We Use Information
        </h1>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          We use the collected personal information to:
        </p>
        <ul>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            1.Register users for events
          </li>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            2. Process payments for event registrations
          </li>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            3.Send notifications and updates about events
          </li>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            4.Send marketing communications about Hestia 24 or related events
          </li>
          <li className="text-lg text-[#FBF0C2] p-2 text-left leading-4">
            5.Conduct research and analysis to improve our events and services
          </li>
        </ul>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          We do not share or sell personal information to third parties for any
          purpose other than those listed above.
        </p>
        <h1 className="text-2xl text-[#FBF0C2] font-semibold p-2 text-left no-underline ">
          How We Protect Information
        </h1>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          We take reasonable measures to protect users' personal information
          from unauthorized access, use, or disclosure. We use industry-standard
          encryption methods to protect payment information and limit access to
          personal information to authorized personnel only.
        </p>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          However, we cannot guarantee the security of user data transmitted
          over the internet, as no method of transmission or storage is 100%
          secure. Users acknowledge and agree that they provide personal
          information at their own risk.
        </p>
        <h1 className="text-2xl text-[#FBF0C2] font-semibold p-2 text-left no-underline ">
          Retention of Information
        </h1>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          We retain user information only for as long as necessary to fulfill
          the purposes for which it was collected or as required by law. When
          personal information is no longer needed, we securely dispose of it.
        </p>
        <h1 className="text-2xl text-[#FBF0C2] font-semibold p-2 text-left no-underline ">
          User Rights
        </h1>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          Users have the right to access, correct, or delete their personal
          information, subject to applicable laws and regulations. Users can
          exercise these rights by contacting us at the email address provided
          below.
        </p>
        <h1 className="text-2xl text-[#FBF0C2] font-semibold p-2 text-left no-underline ">
          Updates to Privacy Policy
        </h1>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          We reserve the right to update this Privacy Policy at any time without
          prior notice. We encourage users to review this page periodically for
          any changes.
        </p>
        <h1 className="text-2xl text-[#FBF0C2] font-semibold p-2 text-left no-underline ">
          Contact Us
        </h1>
        <p className="text-lg text-[#FBF0C2] p-2 text-left leading-9">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <a
            className="text-blue-700  animate-pulse duration-75 delay-75"
            href="mailto:mail@hestiatkmce.in"
          >
            mail@hestiatkmce.in
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
