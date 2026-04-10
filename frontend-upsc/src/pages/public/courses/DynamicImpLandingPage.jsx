import React from "react";
import { useParams } from "react-router-dom";
import IntegratedMentorship2027 from "./IntegratedMentorship2027";
import { IMP_2027_SLUG } from "./imp2027DetailDefaults";

export default function DynamicImpLandingPage() {
  const { slug } = useParams();

  // Keep this dynamic route future-ready; currently only IMP 2027 is configured.
  if (slug === IMP_2027_SLUG) {
    return <IntegratedMentorship2027 />;
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center bg-[#F8F9FB] px-6 text-center">
      <div>
        <h1 className="text-2xl font-bold text-[#1A3C6E] mb-2">Program not found</h1>
        <p className="text-[#6B7280]">Please check the URL or explore available programs.</p>
      </div>
    </div>
  );
}
