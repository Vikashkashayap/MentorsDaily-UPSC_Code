import { useState } from "react";

const CouponApplyBox = ({
  onApply,
  onClear,
  loading = false,
  appliedCoupon,
  errorMessage,
  compact = false,
  isSelected = true,
  onSelect,
  radioName = "coupon-course",
}) => {
  const [code, setCode] = useState("");

  const submit = async () => {
    if (!code.trim()) return;
    await onApply(code.trim());
  };

  return (
    <div className="space-y-2">
      {typeof onSelect === "function" ? (
        <label className="flex items-center gap-2 text-xs text-gray-700">
          <input
            type="radio"
            name={radioName}
            checked={Boolean(isSelected)}
            onChange={() => onSelect()}
          />
          Apply coupon on this course
        </label>
      ) : null}
      {isSelected ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter coupon code"
            disabled={!isSelected}
            className={`flex-1 border border-gray-300 rounded-lg px-3 ${compact ? "py-2 text-sm" : "py-2.5"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="button"
            onClick={submit}
            disabled={loading || !isSelected}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "..." : "Apply"}
          </button>
        </div>
      ) : null}

      {isSelected && appliedCoupon?.code ? (
        <div className="flex items-center justify-between text-xs bg-green-50 border border-green-200 rounded px-2 py-1.5 text-green-700">
          <span>Applied: {appliedCoupon.code}</span>
          <button type="button" onClick={onClear} className="underline">
            Remove
          </button>
        </div>
      ) : null}

      {isSelected && errorMessage ? (
        <p className="text-xs text-red-600">{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default CouponApplyBox;
