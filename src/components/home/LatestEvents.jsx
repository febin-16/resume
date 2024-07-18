import useFetch from "../../hooks/useFetch.js";
import { BASE_URL } from "../../constants/urls.js";

/**
 * React component that displays a list of events with their images, titles, descriptions, and a
 * "Register" button for each event.
 * @param {object} props - The component props (not used in this component).
 * @returns {JSX.Element} - The JSX code to render the component.
 */
function LatestEvents(props) {
  let details = [
    {
      image:
        "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/91eTf8vDyCL.jpg",
      title: "EventCategoryPage 1",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla at turpis rutrum accumsan. Aliquam luctus nibh sit amet nunc faucibus, ac tincidunt mauris bibendum.",
    },
    {
      image:
        "https://rukminim1.flixcart.com/image/416/416/ju4em4w0/poster/m/b/a/large-9346-say-no-to-war-motivational-poster-inspirational-original-imafeuwm2qvm7gcz.jpeg?q=70",
      title: "EventCategoryPage 2",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla at turpis rutrum accumsan. Aliquam luctus nibh sit amet nunc faucibus, ac tincidunt mauris bibendum.",
    },
    {
      image:
        "https://alternativemovieposters.com/wp-content/uploads/2022/07/Erika-Villeda_BreakingBad.jpg",
      title: "EventCategoryPage 3",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nulla at turpis rutrum accumsan. Aliquam luctus nibh sit amet nunc faucibus, ac tincidunt mauris bibendum.",
    },
  ];
  /**
   * Custom React hook that fetches data from an API endpoint.
   * eventDetails will hold the list of the latest events
   * error holds the information if error occured
   */
  const {
    error,
    isPending,
    data: eventDetails,
  } = useFetch(BASE_URL + "/api/v1/event/trending");

  /**
   * @param event object holding the clicked event card
   * redirect to it's detail view
   */
  const handleClick = (event) => {
    window.location = "/events/" + event.title + "/" + event.title;
  };

  return (
    <div className="">
      [Latest Events]
      {details &&
        details.map((event, key) => (
          <div key={key}>
            <img src={event.image} className={"w-96"} />
            <p>{event.title}</p>
            <p>{event.desc}</p>
            <button
              onClick={() => {
                handleClick(event);
              }}
              className={"bg-black text-white"}
            >
              Register
            </button>
          </div>
        ))}
    </div>
  );
}

export default LatestEvents;
