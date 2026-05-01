import { useEffect, useState } from "react";
import {
  createCoupon,
  deleteCoupon,
  getCoupons,
  getCourses,
  toggleCouponStatus,
} from "../../api/coreService";
import { messageHandler } from "../../utils/messageHandler";
import { useTheme } from "../../contexts/ThemeContext";

const stripHtml = (text = "") => String(text).replace(/<[^>]*>/g, "").trim();

/** datetime-local is wall-clock in the browser; send ISO UTC so the server stores the same instant everywhere. */
function expiryLocalInputToIso(localDatetime) {
  if (!localDatetime) return "";
  const ms = new Date(localDatetime).getTime();
  if (Number.isNaN(ms)) return localDatetime;
  return new Date(ms).toISOString();
}

function isCouponPastExpiry(expiryDate) {
  if (!expiryDate) return true;
  return new Date(expiryDate).getTime() < Date.now();
}
const yearFromCourse = (course) => {
  const source = [course?.slug, course?.title, course?.category].filter(Boolean).join(" ");
  const match = String(source).match(/\b(20\d{2})\b/);
  return match ? String(match[1]) : null;
};

const initialForm = {
  code: "",
  discount_type: "percent",
  discount_value: "",
  max_discount: "",
  min_order_value: "",
  expiry_date: "",
  is_active: true,
  auto_apply: false,
  appliesToAll: false,
  applicable_courses: [],
  applicable_years: [],
};

const AdminCoupons = () => {
  const { isDark } = useTheme();
  const [form, setForm] = useState(initialForm);
  const [courses, setCourses] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [yearOptions, setYearOptions] = useState([]);

  const loadData = async () => {
    try {
      const [courseRes, couponRes] = await Promise.all([getCourses(), getCoupons()]);
      const courseList = Array.isArray(courseRes?.data)
        ? courseRes.data
        : Array.isArray(courseRes?.data?.data)
          ? courseRes.data.data
          : [];
      const couponList = Array.isArray(couponRes?.data?.data)
        ? couponRes.data.data
        : Array.isArray(couponRes?.data)
          ? couponRes.data
          : [];
      setCourses(courseList);
      const years = Array.from(
        new Set(courseList.map((course) => yearFromCourse(course)).filter(Boolean))
      ).sort();
      setYearOptions(years);
      setCoupons(couponList);
    } catch (err) {
      messageHandler.error("Failed to load coupons.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !form.appliesToAll &&
        form.applicable_courses.length === 0 &&
        form.applicable_years.length === 0
      ) {
        messageHandler.error("Please select at least one course or year for this coupon.");
        return;
      }
      setLoading(true);
      await createCoupon({
        code: form.code,
        discount_type: form.discount_type,
        discount_value: Number(form.discount_value || 0),
        max_discount: form.max_discount ? Number(form.max_discount) : null,
        min_order_value: form.min_order_value ? Number(form.min_order_value) : null,
        expiry_date: expiryLocalInputToIso(form.expiry_date),
        is_active: form.is_active,
        auto_apply: form.auto_apply,
        applicable_courses: form.appliesToAll ? "all" : form.applicable_courses,
        applicable_years: form.appliesToAll ? [] : form.applicable_years,
      });
      messageHandler.success("Coupon created successfully.");
      setForm(initialForm);
      await loadData();
    } catch (err) {
      messageHandler.error(
        err?.response?.data?.data?.message ||
          err?.response?.data?.message ||
          "Failed to create coupon."
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (coupon) => {
    if (!coupon.is_active && isCouponPastExpiry(coupon.expiry_date)) {
      messageHandler.error("This coupon has expired. Create a new one with a future expiry.");
      return;
    }
    try {
      await toggleCouponStatus(coupon._id, !coupon.is_active);
      await loadData();
    } catch (err) {
      messageHandler.error(
        err?.response?.data?.data?.message ||
          err?.response?.data?.message ||
          "Failed to toggle coupon status."
      );
    }
  };

  const handleDeleteCoupon = async (coupon) => {
    const ok = window.confirm(`Delete coupon "${coupon.code}"? This action cannot be undone.`);
    if (!ok) return;
    try {
      setDeletingId(coupon._id);
      await deleteCoupon(coupon._id);
      messageHandler.success("Coupon deleted successfully.");
      await loadData();
    } catch {
      messageHandler.error("Failed to delete coupon.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg shadow-sm p-6 border`}>
        <h3 className={`text-xl font-semibold mb-1 ${isDark ? "text-white" : "text-gray-900"}`}>Create Coupon</h3>
        <p className={`text-sm mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Set target courses/years and control coupon availability.
        </p>
        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input className="border rounded-lg px-3 py-2 uppercase" placeholder="Code" value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))} required />
          <select className="border rounded-lg px-3 py-2" value={form.discount_type} onChange={(e) => setForm((p) => ({ ...p, discount_type: e.target.value }))}>
            <option value="percent">Percent</option>
            <option value="flat">Flat</option>
          </select>
          <input className="border rounded-lg px-3 py-2" type="number" placeholder="Discount value" value={form.discount_value} onChange={(e) => setForm((p) => ({ ...p, discount_value: e.target.value }))} required />
          <input className="border rounded-lg px-3 py-2" type="number" placeholder="Max discount (optional)" value={form.max_discount} onChange={(e) => setForm((p) => ({ ...p, max_discount: e.target.value }))} />
          <input className="border rounded-lg px-3 py-2" type="number" placeholder="Min order value (optional)" value={form.min_order_value} onChange={(e) => setForm((p) => ({ ...p, min_order_value: e.target.value }))} />
          <input
            className="border rounded-lg px-3 py-2"
            type="datetime-local"
            title="Coupon is valid until this date and time (your local time), then it deactivates."
            value={form.expiry_date}
            onChange={(e) => setForm((p) => ({ ...p, expiry_date: e.target.value }))}
            required
          />

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.appliesToAll} onChange={(e) => setForm((p) => ({ ...p, appliesToAll: e.target.checked, applicable_courses: [] }))} />
            Applicable to all courses
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.auto_apply} onChange={(e) => setForm((p) => ({ ...p, auto_apply: e.target.checked }))} />
            Auto apply
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))} />
            Active
          </label>

          {!form.appliesToAll ? (
            <select
              multiple
              className={`border rounded-lg px-3 py-2 md:col-span-3 min-h-28 ${isDark ? "bg-gray-900 text-white border-gray-700" : ""}`}
              value={form.applicable_courses}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  applicable_courses: Array.from(e.target.selectedOptions).map((o) => o.value),
                }))
              }
            >
              {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                  {stripHtml(course.title)}
                </option>
              ))}
            </select>
          ) : null}
          {!form.appliesToAll ? (
            <select
              multiple
              className={`border rounded-lg px-3 py-2 md:col-span-3 min-h-24 ${isDark ? "bg-gray-900 text-white border-gray-700" : ""}`}
              value={form.applicable_years}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  applicable_years: Array.from(e.target.selectedOptions).map((o) => o.value),
                }))
              }
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  Year {year}
                </option>
              ))}
            </select>
          ) : null}

          <button type="submit" disabled={loading} className="md:col-span-3 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-60">
            {loading ? "Creating..." : "Create Coupon"}
          </button>
        </form>
      </div>

      <div className={`${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} rounded-lg shadow-sm p-6 border`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Coupons</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Code</th>
                <th className="py-2">Type</th>
                <th className="py-2">Value</th>
                <th className="py-2">Expiry</th>
                <th className="py-2">Scope</th>
                <th className="py-2">Status</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => {
                const expired = isCouponPastExpiry(coupon.expiry_date);
                return (
                <tr key={coupon._id} className="border-b">
                  <td className="py-2 font-semibold uppercase">{coupon.code}</td>
                  <td className="py-2">{coupon.discount_type}</td>
                  <td className="py-2">{coupon.discount_value}</td>
                  <td className="py-2">{new Date(coupon.expiry_date).toLocaleString("en-IN")}</td>
                  <td className="py-2">
                    {coupon.applies_to_all
                      ? "All Courses"
                      : `${coupon.applicable_courses?.length || 0} courses, ${coupon.applicable_years?.length || 0} years`}
                  </td>
                  <td className="py-2">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        expired
                          ? "bg-amber-100 text-amber-800"
                          : coupon.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {expired ? "Expired" : coupon.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => toggleStatus(coupon)}
                      disabled={expired && !coupon.is_active}
                      className="text-blue-600 underline disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
                    >
                      {coupon.is_active ? "Deactivate" : "Activate"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteCoupon(coupon)}
                      disabled={deletingId === coupon._id}
                      className="text-red-600 underline disabled:opacity-50"
                    >
                      {deletingId === coupon._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCoupons;
