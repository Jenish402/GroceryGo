import React from 'react'

function ReturnandRefaund() {
  return (
    <>
      <div className='py-[30px]'>
      <p className="mb-4">
    At GroceryGo, your satisfaction is our priority. If you're not completely satisfied with your order, we're here to help. Please read our return and refund policy carefully.
  </p>

  <h2 className="text-xl font-semibold mt-6 mb-2">1. Eligibility for Returns</h2>
  <ul className="list-disc pl-6 mb-4 space-y-1">
    <li>Returns are accepted within 24 hours of delivery.</li>
    <li>The product must be unused, unopened, and in its original packaging.</li>
    <li>Perishable items (e.g., fruits, vegetables, dairy) are not eligible for return unless damaged or spoiled on delivery.</li>
  </ul>

  <h2 className="text-xl font-semibold mt-6 mb-2">2. Refund Process</h2>
  <ul className="list-disc pl-6 mb-4 space-y-1">
    <li>Once we receive and inspect the returned item, we will notify you of the refund status.</li>
    <li>If approved, your refund will be processed to your original method of payment within 5–7 business days.</li>
    <li>Refunds may take additional time depending on your bank or payment provider.</li>
  </ul>

  <h2 className="text-xl font-semibold mt-6 mb-2">3. Return Request Procedure</h2>
  <ul className="list-disc pl-6 mb-4 space-y-1">
    <li>Contact our support team at support@grocerygo.com within 24 hours of receiving your order.</li>
    <li>Provide your order number, item details, and reason for return.</li>
    <li>Attach a photo if the item is damaged or incorrect.</li>
  </ul>

  <h2 className="text-xl font-semibold mt-6 mb-2">4. Exceptions</h2>
  <ul className="list-disc pl-6 mb-4 space-y-1">
    <li>Items marked as “non-returnable” on the product page are not eligible for return or refund.</li>
    <li>Refunds are not applicable for delays due to natural calamities, or unavoidable delivery disruptions.</li>
  </ul>

  <h2 className="text-xl font-semibold mt-6 mb-2">5. Contact Us</h2>
  <p className="mb-4">
    If you have any questions about our Return & Refund Policy, please contact us at:
  </p>
  <p className="text-gray-700">
    📧 Email: <a href="mailto:support@grocerygo.com" className="text-green-600 underline">support@grocerygo.com</a>
    <br />
    ☎ Phone: +91-1234567890
  </p>
      </div>
</>
  )
}

export default ReturnandRefaund