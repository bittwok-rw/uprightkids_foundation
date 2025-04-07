import { useEffect } from 'react';

const SuccessPage = () => {
  useEffect(() => {
    const getSession = async () => {
      const session_id = new URLSearchParams(window.location.search).get('session_id');
      const res = await fetch(`/api/checkout_sessions/${session_id}`);
      const data = await res.json();
      console.log(data); // You can display a confirmation message or receipt here
    };

    getSession();
  }, []);

  return (
    <div className="result-page text-center min-h-[80vh] grid place-items-center">
      <div><h1>Payment Successful!</h1>
      <p className='text-black'>Thank you for your purchase. Your payment was successfully processed.</p>
      </div></div>
  );
};

export default SuccessPage;