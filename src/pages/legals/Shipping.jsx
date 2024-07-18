/**
 * Render the About Us section of the application.
 * Action button either leads to use the campus ambassador page/detail-view page depending on the coming soon/ production
 * @function
 * @param {string} content - About Us content
 * @param {string} actionRoute - Redirection Route for Action button,
 * @returns {JSX.Element} The JSX element representing the About Us section.
 */
import "../../styles/home.css"
function Shipping({ content, actionRoute }) {
  return (
    <div
      // ref={containerRef}
      className=" grid-background h-[70vh] md:h-screen  flex justify-center text-center font-Geomanist "
    >
      <div className="h-48 md:h-72 container mt-[10rem] m-10 bg-black  md:w-3/4 p-5 border-[0.2px] rounded-xl min-w-sm bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 ">
        <h1 className='lg:text-4xl md:text-3xl text-2xl  uppercase font-footer text-[#FBF0C2]  md:font-bold font-anton'>

          <b className='text-4xl lg:leading-[100px] md:leading-[70px] leading-[60px] tracking-wide md:tracking-widest'>
            Shipping
          </b>
        </h1>
        <p className="text-[#FBF0C2]  font-Geomanist my-2 text-center">
     Last updated on Mar 18th 2024

Shipping is not applicable for business.
        </p>
        {/* <p>{content}</p> */}


      </div>



    </div>
  );
}

export default Shipping;
