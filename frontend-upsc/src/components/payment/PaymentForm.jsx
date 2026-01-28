import { useState } from "react";
import {
  initiateCoursePayment,
  verifyCoursePayment,
} from "../../api/coreService";
import PaymentReceipt from "./PaymentReceipt";

const PaymentForm = ({ course, onPaymentSuccess, onClose }) => {
  const [studentName, setStudentName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("idle");

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      }
    });
  };

  const handlePayment = async () => {
    if (!studentName || !mobile || !email) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setPaymentStatus("processing");

    try {
      const rawResponse = await initiateCoursePayment({
        studentName,
        mobile,
        email,
        courseId: course._id,
        paymentMethod: "UPI",
      });

      let orderData;
      if (rawResponse && rawResponse.data) {
        orderData = rawResponse.data;
      } else if (
        rawResponse &&
        rawResponse.payment &&
        rawResponse.razorpayOrder
      ) {
        orderData = rawResponse;
      } else {
        console.error("Invalid response structure:", rawResponse);
        alert("Failed to initiate payment. Please try again.");
        setLoading(false);
        setPaymentStatus("failed");
        return;
      }

      if (!orderData || !orderData.razorpayOrder || !orderData.payment) {
        console.error("Missing required data in orderData");
        alert("Failed to initiate payment. Please try again.");
        setLoading(false);
        setPaymentStatus("failed");
        return;
      }

      const isLoaded = await loadRazorpay();

      if (!isLoaded || !window.Razorpay) {
        alert("Failed to load payment gateway. Please try again.");
        setLoading(false);
        setPaymentStatus("failed");
        return;
      }
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.razorpayOrder.amount,
        currency: orderData.razorpayOrder.currency || "INR",
        name: import.meta.env.VITE_RAZORPAY_PAYMENT_SCREEN_NAME,
        description: course.title,
        order_id: orderData.razorpayOrder.id,
        handler: async function (razorpayResponse) {
          try {
            setPaymentStatus("success");
            const verifyResponse = await verifyCoursePayment({
              paymentId: orderData.payment._id,
              razorpayPaymentId: razorpayResponse.razorpay_payment_id,
              razorpayOrderId: razorpayResponse.razorpay_order_id,
              razorpaySignature: razorpayResponse.razorpay_signature,
            });
            let verifiedPayment;

            if (verifyResponse?.data?.payment) {
              verifiedPayment = verifyResponse.data.payment;
            } else if (verifyResponse?.payment) {
              verifiedPayment = verifyResponse.payment;
            } else if (verifyResponse?.data && !verifyResponse.data.payment) {
              verifiedPayment = verifyResponse.data;
            } else {
              verifiedPayment = verifyResponse;
            }
            if (verifiedPayment && verifiedPayment._id) {
              const completePaymentData = {
                ...verifiedPayment,
                studentName: verifiedPayment.studentName || studentName,
                mobile: verifiedPayment.mobile || mobile,
                email: verifiedPayment.email || email,
                amount: verifiedPayment.amount || course.sellingPrice,
                status: verifiedPayment.status,
                razorpayPaymentId: razorpayResponse.razorpay_payment_id,
                razorpayOrderId: razorpayResponse.razorpay_order_id,
              };
              setPaymentData(completePaymentData);
              setShowReceipt(true);
            } else {
              console.error(" Payment verification failed");
              setPaymentStatus("failed");
            }
          } catch (error) {
            console.error("Verification error:", error);
            setPaymentStatus("failed");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setPaymentStatus("idle");
          },
        },
        prefill: {
          name: studentName,
          email,
          contact: mobile,
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(
          "Payment failed: " + (response.error.description || "Unknown error")
        );
        setLoading(false);
        setPaymentStatus("failed");
      });

      rzp.open();
    } catch (error) {
      console.error("Payment process error:", error);
      alert("An error occurred while processing payment. Please try again.");
      setLoading(false);
      setPaymentStatus("failed");
    }
  };
  if (showReceipt && paymentData) {
    return (
      <PaymentReceipt
        paymentData={paymentData}
        onClose={() => {
          setShowReceipt(false);
          setPaymentData(null);
          if (onClose) {
            onClose();
          }
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full mx-auto overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Complete Enrollment
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-6">
            <div 
              className="text-lg text-gray-600 mb-4 prose max-w-none prose-lg"
              dangerouslySetInnerHTML={{ __html: course.title }}
            />

            <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 border-2 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                  <p className="text-4xl font-bold text-orange-600">
                    ₹{course.sellingPrice?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-400"
              />
            </div>

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Proceed to Pay ₹{course.sellingPrice?.toLocaleString()}
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
              <svg
                className="w-4 h-4 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secure payment powered by Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
