import { useEffect, useState } from 'react';
import { CheckCircle, Download, X } from 'lucide-react';

const PaymentReceipt = ({ paymentData, onClose }) => {
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setShowSuccess(true);
  }, [paymentData]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const formatAmount = (amount) => {
    if (!amount) return '₹0';
    return `₹${(amount).toLocaleString('en-IN')}`;
  };
  
  const payment = paymentData?.payment || paymentData;

  const handleDownload = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        // alert('Please allow popups to download receipt');
        return;
      }

      const receiptContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Payment Receipt - MentorsDaily</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Inter', sans-serif;
              }
              body {
                background: white;
                color: #1f2937;
                line-height: 1.6;
                padding: 40px 20px;
                max-width: 800px;
                margin: 0 auto;
              }
              .receipt-container {
                background: white;
                border: 2px solid #2563eb;
                border-radius: 12px;
                padding: 40px;
              }
              .header {
                border-bottom: 2px solid #2563eb;
                padding-bottom: 20px;
                margin-bottom: 24px;
                text-align: center;
              }
              .amount-section {
                text-align: center;
                margin-bottom: 32px;
                padding: 24px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
              }
              .section {
                margin-bottom: 24px;
                padding: 20px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
              }
              .section-title {
                font-size: 16px;
                font-weight: 700;
                color: #1e40af;
                margin-bottom: 16px;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-bottom: 2px solid #93c5fd;
                padding-bottom: 8px;
              }
              .info-grid {
                display: grid;
                gap: 16px;
              }
              .info-item {
                display: grid;
                gap: 4px;
              }
              .info-label {
                font-size: 12px;
                color: #6b7280;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .info-value {
                font-size: 14px;
                font-weight: 700;
                color: #1f2937;
              }
              .transaction-grid {
                display: grid;
                gap: 12px;
              }
              .transaction-item {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 6px;
                padding: 12px;
              }
              .status-success {
                display: inline-flex;
                align-items: center;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 700;
                background: #dcfce7;
                color: #166534;
                border: 1px solid #86efac;
              }
              .footer {
                text-align: center;
                margin-top: 32px;
                padding-top: 24px;
                border-top: 1px solid #e2e8f0;
              }
              .razorpay-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                background: #2563eb;
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                font-weight: 600;
                margin: 16px 0;
              }
              .company-footer {
                margin-top: 16px;
              }
              @media print {
                body {
                  padding: 0;
                }
                .receipt-container {
                  border: none;
                  padding: 0;
                  box-shadow: none;
                }
                @page {
                  margin: 20mm;
                }
              }
            </style>
          </head>
          <body>
            <div class="receipt-container">
              <!-- Header -->
              <div class="header">
                <h1 style="font-size: 28px; font-weight: 700; color: #2563eb; margin-bottom: 8px;">PAYMENT RECEIPT</h1>
                <p style="font-weight: 600; color: #6b7280; margin-bottom: 4px;">MentorsDaily UPSC</p>
                <p style="font-size: 14px; color: #9ca3af;">Official Payment Confirmation</p>
              </div>

              <!-- Amount Section -->
              <div class="amount-section">
                <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Amount Paid</p>
                <p style="font-size: 36px; font-weight: 700; color: #2563eb; margin-bottom: 4px;">${formatAmount(payment?.amount)}</p>
                <p style="font-size: 14px; color: #6b7280;">Indian Rupees (INR)</p>
              </div>

              <!-- Student Information -->
              <div class="section">
                <div class="section-title" style="text-align: center;">Student Information</div>
                <div class="info-grid" style="display: flex; flex-direction: column; gap: 16px;">
                  <div class="info-item" style="display: flex; justify-content: center; align-items: center; gap: 16px; padding: 8px 0;">
                    <span class="info-label" style="font-weight: 600; color: #6b7280; min-width: 80px;">Name:</span>
                    <span class="info-value" style="font-weight: 700; color: #1f2937; text-align: center; flex: 1;">${payment?.studentName || 'N/A'}</span>
                  </div>
                  <div class="info-item" style="display: flex; justify-content: center; align-items: center; gap: 16px; padding: 8px 0;">
                    <span class="info-label" style="font-weight: 600; color: #6b7280; min-width: 80px;">Mobile:</span>
                    <span class="info-value" style="font-weight: 700; color: #1f2937; text-align: center; flex: 1;">${payment?.mobile || 'N/A'}</span>
                  </div>
                  <div class="info-item" style="display: flex; justify-content: center; align-items: center; gap: 16px; padding: 8px 0;">
                    <span class="info-label" style="font-weight: 600; color: #6b7280; min-width: 80px;">Email:</span>
                    <span class="info-value" style="font-weight: 700; color: #1f2937; text-align: center; flex: 1;">${payment?.email || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <!-- Transaction Details -->
              <div class="section">
                <div class="section-title" style="text-align: center;">Transaction Details</div>
                <div class="transaction-grid" style="display: flex; flex-direction: column; gap: 16px;">
                  <div class="transaction-item" style="display: flex; justify-content: center; align-items: center; gap: 16px; padding: 8px 0;">
                    <span class="info-label" style="font-weight: 600; color: #6b7280; min-width: 120px;">Transaction ID:</span>
                    <span class="info-value" style="font-family: monospace; color: #2563eb; font-weight: 700; text-align: center; flex: 1;">${payment?.razorpayPaymentId || payment?.transactionId || 'N/A'}</span>
                  </div>
                  ${payment?.courseId ? `
                  <div class="transaction-item" style="display: flex; justify-content: center; align-items: center; gap: 16px; padding: 8px 0;">
                    <span class="info-label" style="font-weight: 600; color: #6b7280; min-width: 120px;">Course Name:</span>
                    <span class="info-value" style="font-family: monospace; color: #2563eb; font-weight: 700; text-align: center; flex: 1;">${payment?.courseId?.title}</span>
                  </div>
                  ` : ''}
                  <div class="transaction-item" style="display: flex; justify-content: center; align-items: center; gap: 16px; padding: 8px 0;">
                    <span class="info-label" style="font-weight: 600; color: #6b7280; min-width: 120px;">Order ID:</span>
                    <span class="info-value" style="font-family: monospace; color: #2563eb; font-weight: 700; text-align: center; flex: 1;">${payment?.razorpayOrderId || payment?.orderId || 'N/A'}</span>
                  </div>
                  <div class="transaction-item" style="display: flex; justify-content: center; align-items: center; gap: 16px; padding: 8px 0;">
                    <span class="info-label" style="font-weight: 600; color: #6b7280; min-width: 120px;">Status:</span>
                    <div class="status-success" style="flex: 1; display: flex; justify-content: center;">
                      <div class="status-success" style="display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; background: #dcfce7; color: #166534; border: 1px solid #86efac;">
                        <span style="width: 6px; height: 6px; background: #22c55e; border-radius: 50%; margin-right: 6px;"></span>
                        ${payment?.status || 'SUCCESS'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </body>
        </html>
      `;

      printWindow.document.write(receiptContent);
      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 500);
    } catch (error) {
      console.error('Error generating receipt:', error);
      alert('Error generating receipt. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-xl w-full max-w-md mx-auto overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-gray-800 transition-all shadow-md"
        >
          <X className="w-4 h-4" />
        </button>
        <div className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 text-center transform transition-all duration-700 ${showSuccess ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full">
              <CheckCircle className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-bold">Payment Successful!</h2>
              <p className="text-sm opacity-90">Transaction Completed</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="text-center border-b border-blue-200 pb-4">
              <h3 className="text-2xl font-bold text-blue-600">PAYMENT RECEIPT</h3>
              <p className="text-sm text-gray-600 mt-1">MentorsDaily UPSC</p>
              <p className="text-xs text-gray-500 mt-1">Official Payment Confirmation</p>
            </div>
            <div className="text-center bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-gray-600 uppercase tracking-wider mb-2">Amount Paid</p>
              <p className="text-3xl font-bold text-blue-600 mb-1">{formatAmount(payment?.amount)}</p>
              <p className="text-sm text-gray-600">Indian Rupees (INR)</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-blue-700 text-sm uppercase tracking-wide mb-4 border-b border-gray-300 pb-2 text-center">Student Information</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-gray-600 font-medium min-w-[80px]">Name:</span>
                  <span className="font-semibold text-gray-900 text-center flex-1">{payment?.studentName || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-gray-600 font-medium min-w-[80px]">Mobile:</span>
                  <span className="font-semibold text-gray-900 text-center flex-1">{payment?.mobile || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-gray-600 font-medium min-w-[80px]">Email:</span>
                  <span className="font-semibold text-gray-900 text-sm break-all text-center flex-1">{payment?.email || 'N/A'}</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-blue-700 text-sm uppercase tracking-wide mb-4 border-b border-gray-300 pb-2 text-center">Transaction Details</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-gray-600 font-medium min-w-[120px]">Transaction ID:</span>
                  <span className="font-mono text-blue-600 font-semibold text-sm break-all text-center flex-1">
                    {payment?.razorpayPaymentId || payment?.transactionId || 'N/A'}
                  </span>
                </div>
                
                {payment?.courseId && (
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-sm text-gray-600 font-medium min-w-[120px]">Course Name:</span>
                    <span className="font-mono text-blue-600 font-semibold text-sm text-center flex-1">
                      {payment?.courseId?.title}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-gray-600 font-medium min-w-[120px]">Order ID:</span>
                  <span className="font-mono text-blue-600 font-semibold text-sm text-center flex-1">
                    {payment?.razorpayOrderId || payment?.orderId || 'N/A'}
                  </span>
                </div>
                
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-gray-600 font-medium min-w-[120px]">Status:</span>
                  <div className="flex-1 flex justify-center">
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold border border-green-200">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      {payment?.status || 'SUCCESS'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center border-t border-gray-200 pt-4">
              <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg mb-3">
                <span>💳</span>
                <span className="text-sm font-semibold">Secure Payment by Razorpay</span>
              </div>
              <div>
                <p className="font-semibold text-blue-600 text-lg">MentorsDaily UPSC</p>
                <p className="text-sm text-gray-600 mt-1">Thank you for your enrollment!</p>
                <p className="text-xs text-gray-500 mt-1">This is a computer-generated receipt and does not require a signature.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gray-50 border-t flex gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;