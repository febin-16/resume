import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import faqText from "../../assets/svgs/faq.svg";
import "../../styles/proshowcard.css"
import "../../styles/home.css";

// import BASE_URL from "../../constants/urls.js";

function FaQElement({ question, answer }) {

  const [visible, setVisible] = useState(false);
  const contentRef = useRef(null);

  const toggleVisibility = () => {
    const content = contentRef.current;
    if (visible) {
      gsap.to(content, { height: 0, opacity: 0 });
    } else {
      gsap.set(content, { height: "auto", opacity: 1 });
      gsap.from(content, { height: 0, opacity: 0 });
    }
    setVisible(!visible);
  };
  return (
    <div className="rounded-lg border border-[#FBF0C2] transition-all ">

      <button onClick={toggleVisibility} className="flex items-center justify-between w-full">
        <h1 className=" px-3 font-extrabold text-left text-[#FBF0C2] lg:text-xl text-general">
          {question}
        </h1>

        <div

          className={` transition-all  bg-accent rounded-md relative ${visible && " rotate-90 "
            }`}
        >
          {!visible ? (
            <span className="text-[#FBF0C2] bg-blue-500 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-[#FBF0C2] rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 12H6"
              />
            </svg>
          )}
        </div>
      </button>
      <div
        ref={contentRef}
        style={{ overflow: "hidden", opacity: 0, height: "0" }}
      >
        <p className="px-3  transition-all mt-6 text-sm text-[#FBF0C2] text-subText  text-left font-normal">
          {" "}
          {answer}
        </p>
      </div>
    </div>
  );
}
export default function FaQ({ questions }) {
  const [branchElement, setBranchElement] = useState();
  const [image, setImage] = useState(faqText);

  if (!questions.length) return <></>;

  return (
    <section className="hero-section px-2 lg:w-11/12 m-auto  relative">
      <img className="absolute -left-[85px] w-[250px] -top-4" src={branchElement} />
      <div className="lg:flex gap-8 lg:px-6 md:px-2 py-12 mx-auto font-Geomanist font-bold">
        <div className=" ">
          <h1 className="text-[#FBF0C2]  text-[100px]" style={{ fontFamily: "bungee" }}>FAQ<span className="text-[50px]" >
            s</span></h1>
        </div>
        <div className="mt-8 space-y-8 lg:mt-12 w-full">
          {questions.map((q, index) => (
            <FaQElement key={index} question={q.question} answer={q.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
