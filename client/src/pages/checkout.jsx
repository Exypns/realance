import CheckoutForm from "@/components/CheckoutForm";
import { CREATE_ORDER } from "../utils/constant";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const stripePromise = loadStripe(
  "pk_test_51OVF2FFtPsf5aAn48nrpw7nIvRYiB1Hp0j0hGHgT66sGLLQd5ULD0S5fXEHXVwWHAOWN0kzJVoQxaeQ7p8z2EL4700h7nBOJRN"
);

function checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [cookies] = useCookies();

  const router = useRouter();
  const { gigId } = router.query;

  useEffect(() => {
    const createOrder = async () => {
      try {
        const { data } = await axios.post(
          CREATE_ORDER,
          { gigId },
          { headers: { Authorization: `Bearer ${cookies.jwt}` } }
        );
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    if (gigId) {
      createOrder();
    }
  }, [gigId]);

  const appearance = { theme: "stripe" };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <div className=" min-h-[80vh] max-h-full mx-20 flex flex-col gap-10 items-center">
      <h1 className=" text-3xl">
        Please complete the payment to place the order
      </h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default checkout;
