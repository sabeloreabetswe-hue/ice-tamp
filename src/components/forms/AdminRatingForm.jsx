import { useState } from "react";
import Button from "../ui/Button";

const AdminRatingForm = ({
  title = "Admin Rating",
  subtitle = "Record a rating for a partner, shipment, or platform action.",
  submitLabel = "Submit rating",
  onSubmit,
}) => {
  const [form, setForm] = useState({
    target: "Partner",
    rating: "5",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(form);
    }
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#2A3663]">{title}</h2>
        <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Rate for</label>
          <select
            name="target"
            value={form.target}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#B59F78]"
          >
            <option value="Partner">Partner</option>
            <option value="Shipment">Shipment</option>
            <option value="Account">Account</option>
            <option value="Operation">Operation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#B59F78]"
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Fair</option>
            <option value="1">1 - Poor</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Comments</label>
        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          rows="4"
          placeholder="Add your feedback or recommendation"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#B59F78]"
        />
      </div>

      <div className="mt-6">
        <Button type="submit">{submitLabel}</Button>
      </div>

      {submitted && (
        <p className="mt-4 text-sm text-green-600">
          Rating submitted successfully.
        </p>
      )}
    </form>
  );
};

export default AdminRatingForm;
