// Course Purchase Confirmation Email
exports.generateCoursePurchaseEmail = (paymentDetails) => {
  const amountPaid = paymentDetails.isEmi ? paymentDetails.monthlyEmiAmount : paymentDetails.amount;
  const remaining = paymentDetails.isEmi ? paymentDetails.amount - paymentDetails.monthlyEmiAmount : 0;

  return `
    <html>
      <head>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            background-color: #f8f9fa; 
            margin: 0; 
            padding: 20px;
          }
          .container { 
            background: white; 
            padding: 0; 
            border-radius: 12px; 
            max-width: 600px; 
            margin: auto;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #28a745, #20c997);
            padding: 25px 20px; 
            text-align: center; 
            color: white;
          }
          .header h2 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .content { 
            padding: 30px; 
          }
          .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          th { 
            background-color: #f8f9fa; 
            padding: 12px; 
            border: 1px solid #dee2e6; 
            text-align: left;
            font-weight: 600;
            color: #495057;
          }
          td { 
            padding: 12px; 
            border: 1px solid #dee2e6; 
            background-color: white;
          }
          .amount-highlight {
            color: #28a745;
            font-weight: bold;
            font-size: 16px;
          }
          .footer { 
            margin-top: 30px; 
            font-size: 0.8em; 
            text-align: center; 
            color: #6c757d;
            padding: 20px;
            background-color: #f8f9fa;
            border-top: 1px solid #dee2e6;
          }
          .regards {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #495057;
          }
          .institute-name {
            color: #28a745;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">🎓</div>
            <h2>Course Purchase Successful!</h2>
          </div>
          <div class="content">
            <p class="greeting">Hi <strong>${paymentDetails.studentName}</strong>,</p>
            <p>Congratulations! Your enrollment for <strong>${paymentDetails.courseId.title}</strong> is confirmed.</p>
            
            <table>
              <tr>
                <th>Course Name:</th>
                <td>${paymentDetails.courseId.title}</td>
              </tr>
              <tr>
                <th>Order ID:</th>
                <td>${paymentDetails.orderId}</td>
              </tr>
              <tr>
                <th>Payment ID:</th>
                <td>${paymentDetails.razorpayPaymentId}</td>
              </tr>
              <tr>
                <th>Amount Paid:</th>
                <td class="amount-highlight">₹${amountPaid}</td>
              </tr>
              ${paymentDetails.isEmi ? `
              <tr>
                <th>Payment Type:</th>
                <td><strong>EMI Plan</strong> - ${paymentDetails.emiDurationMonths} Months</td>
              </tr>
              <tr>
                <th>First Installment:</th>
                <td>₹${paymentDetails.monthlyEmiAmount} (Paid)</td>
              </tr>
              <tr>
                <th>Total Course Amount:</th>
                <td>₹${paymentDetails.amount}</td>
              </tr>
              <tr>
                <th>Remaining Amount:</th>
                <td>₹${remaining}</td>
              </tr>
              <tr>
                <th>Pending Installments:</th>
                <td>${paymentDetails.emiDurationMonths - 1} installments</td>
              </tr>
              ` : `
              <tr>
                <th>Payment Type:</th>
                <td>Full Payment</td>
              </tr>
              `}
              <tr>
                <th>Purchase Date:</th>
                <td>${new Date(paymentDetails.paymentDate).toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</td>
              </tr>
            </table>
            
            <p style="font-size: 16px; color: #28a745; font-weight: 600;">🎉 Welcome to the course! Start learning now.</p>
            
            <div class="regards">
              <p>Best Regards,<br/><span class="institute-name">MentorsDaily Team</span></p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Installment Payment Confirmation Email
exports.generateInstallmentPaymentEmail = (installmentDetails) => {
  const { installment, payment, originalPayment } = installmentDetails;
  const paidInstallments = originalPayment.installmentsCompleted;
  const totalInstallments = originalPayment.emiDurationMonths;
  const remaining = originalPayment.amount - (originalPayment.monthlyEmiAmount * paidInstallments);

  return `
    <html>
      <head>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            background-color: #f8f9fa; 
            margin: 0; 
            padding: 20px;
          }
          .container { 
            background: white; 
            padding: 0; 
            border-radius: 12px; 
            max-width: 600px; 
            margin: auto;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header { 
            background: linear-gradient(135deg, #007bff, #0056b3);
            padding: 25px 20px; 
            text-align: center; 
            color: white;
          }
          .header h2 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
          }
          .success-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .content { 
            padding: 30px; 
          }
          .greeting {
            font-size: 18px;
            color: #333;
            margin-bottom: 20px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 20px 0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          th { 
            background-color: #f8f9fa; 
            padding: 12px; 
            border: 1px solid #dee2e6; 
            text-align: left;
            font-weight: 600;
            color: #495057;
          }
          td { 
            padding: 12px; 
            border: 1px solid #dee2e6; 
            background-color: white;
          }
          .amount-highlight {
            color: #007bff;
            font-weight: bold;
            font-size: 16px;
          }
          .footer { 
            margin-top: 30px; 
            font-size: 0.8em; 
            text-align: center; 
            color: #6c757d;
            padding: 20px;
            background-color: #f8f9fa;
            border-top: 1px solid #dee2e6;
          }
          .regards {
            margin-top: 25px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            color: #495057;
          }
          .institute-name {
            color: #007bff;
            font-weight: bold;
          }
          .progress-bar {
            background-color: #e9ecef;
            border-radius: 10px;
            height: 20px;
            margin: 10px 0;
            overflow: hidden;
          }
          .progress-fill {
            background: linear-gradient(90deg, #007bff, #0056b3);
            height: 100%;
            transition: width 0.3s;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="success-icon">✓</div>
            <h2>EMI Payment Successful!</h2>
          </div>
          <div class="content">
            <p class="greeting">Hi <strong>${payment.studentName}</strong>,</p>
            <p>Your EMI installment payment has been received successfully.</p>
            
            <table>
              <tr>
                <th>Course Name:</th>
                <td>${originalPayment.courseId.title}</td>
              </tr>
              <tr>
                <th>Installment Number:</th>
                <td><strong>${installment.installmentNumber} of ${totalInstallments}</strong></td>
              </tr>
              <tr>
                <th>Amount Paid:</th>
                <td class="amount-highlight">₹${installment.amountDue}</td>
              </tr>
              <tr>
                <th>Payment ID:</th>
                <td>${payment.razorpayPaymentId}</td>
              </tr>
              <tr>
                <th>Payment Date:</th>
                <td>${new Date(installment.paidDate).toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</td>
              </tr>
            </table>

            <h3 style="color: #495057; margin-top: 30px;">Payment Progress</h3>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${(paidInstallments / totalInstallments) * 100}%"></div>
            </div>
            <p style="text-align: center; color: #6c757d; margin-top: 5px;">
              ${paidInstallments} of ${totalInstallments} installments paid (${Math.round((paidInstallments / totalInstallments) * 100)}%)
            </p>

            <table style="margin-top: 20px;">
              <tr>
                <th>Total Course Amount:</th>
                <td>₹${originalPayment.amount}</td>
              </tr>
              <tr>
                <th>Total Paid So Far:</th>
                <td class="amount-highlight">₹${originalPayment.monthlyEmiAmount * paidInstallments}</td>
              </tr>
              <tr>
                <th>Remaining Amount:</th>
                <td>₹${remaining}</td>
              </tr>
              <tr>
                <th>Pending Installments:</th>
                <td>${totalInstallments - paidInstallments} installments</td>
              </tr>
            </table>
            
            ${paidInstallments === totalInstallments ? `
              <p style="font-size: 16px; color: #28a745; font-weight: 600; margin-top: 20px;">
                🎉 Congratulations! All installments completed. Your course is fully paid!
              </p>
            ` : `
              <p style="font-size: 14px; color: #6c757d; margin-top: 20px;">
                💡 <strong>Next installment due:</strong> Please pay your next installment on time to continue your learning journey.
              </p>
            `}
            
            <div class="regards">
              <p>Best Regards,<br/><span class="institute-name">MentorsDaily Team</span></p>
            </div>
          </div>
          <div class="footer">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p>If you have any questions, please contact our support team.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};