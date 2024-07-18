
function NotificationCard({ title, link1, link2,description, users }) {

    return (
        <div onClick={(e) => { e.preventDefault(); if(link1){window.location=link1} }} className="card w-full bg-primary-dark text-neutral-content">
        <div className="card-body items-center text-center">
            <h2 className="card-title text-secondary-dark">{title}</h2>
            <p className="text-small text-secondary-light">{description}</p>
        </div>
        </div>
      );
    }


export default NotificationCard;
