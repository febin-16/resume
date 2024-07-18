import React from "react";
import "../../styles/home.css";
const TermsAndConditionsPage = () => {
  return (
    <div
      className="flex justify-center text-center font-Geomanist grid-background"
      style={{ color: "#FBF0C2" }}
    >
      <div className="max-w-4xl mx-2 md:mx-auto p-5 my-32  border-[0.2px] border-gradient-to-tr from-white-700 to-transparent rounded-xl   bg-black opacity-80">
        <h1 className="text-xl font-semibold mb-4">Terms and Conditions</h1>
        <p className="mb-2">
          For the purpose of these Terms and Conditions, The term "we", "us",
          "our" used anywhere on this page shall mean Hestia24, whose
          registered/operational office is TKM COLLEGE OF ENGINEERING, KARICODE,
          KOLLAM, KERALA 691005. "you", “your”, "user", “visitor” shall mean any
          natural or legal person who is visiting our website and/or agreed to
          purchase from us.
        </p>

        <h2 className="text-lg font-semibold mt-4 mb-2">
          Your use of the website and/or purchase from us are governed by
          following Terms and Conditions:
        </h2>
        <ul className="list-disc ml-5">
          <li className="mb-1">
            The content of the pages of this website is subject to change
            without notice.
          </li>
          <li className="mb-1">
            Neither we nor any third parties provide any warranty or guarantee
            as to the accuracy, timeliness, performance, completeness or
            suitability of the information and materials found or offered on
            this website for any particular purpose.
          </li>
          <li className="mb-1">
            Your use of any information or materials on our website and/or
            product pages is entirely at your own risk, for which we shall not
            be liable.
          </li>
          <li className="mb-1">
            Our website contains material which is owned by or licensed to us.
            This material includes, but is not limited to, the design, layout,
            look, appearance and graphics.
          </li>
          <li className="mb-1">
            Unauthorized use of information provided by us shall give rise to a
            claim for damages and/or be a criminal offense.
          </li>
          <li className="mb-1">
            From time to time our website may also include links to other
            websites. These links are provided for your convenience to provide
            further information.
          </li>
        </ul>

        <p className="mt-4">
          You may not create a link to our website from another website or
          document without Hestia24’s prior written consent.
        </p>

        <p className="mt-4">
          Any dispute arising out of use of our website and/or purchase with us
          and/or any engagement with us is subject to the laws of India.
        </p>

        <p className="mt-4">
          We, shall be under no liability whatsoever in respect of any loss or
          damage arising directly or indirectly out of the decline of
          authorization for any Transaction, on Account of the Cardholder having
          exceeded the preset limit mutually agreed by us with our acquiring
          bank from time to time.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
