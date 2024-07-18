import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPaymentRedirectionUrl } from "../../services/user.js";

export default function PaymentUrlHandler() {
    const { link } = useParams()

    useEffect(() => {
        getPaymentRedirectionUrl(link).then(r => {
            if (r.status === 200) {
                r.json().then(body => {
                    window.location = body?.redirect_link;
                })
            }
        })
    }, [])
    return <p>Loading..</p>;
}