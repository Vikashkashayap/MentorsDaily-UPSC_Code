const SectionHeading = ({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  className = "",
  id,
}) => {
  const isCenter = align === "center";

  return (
    <div className={`${isCenter ? "text-center" : "text-left"} mb-10 md:mb-14 ${className}`}>
      {badge && (
        <div className={`${isCenter ? "flex justify-center" : ""} mb-4`}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 rounded-full">
            {badge}
          </span>
        </div>
      )}
      <h2 id={id} className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-gray-900 leading-tight mb-4">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>
      <div
        className={`w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-5 ${
          isCenter ? "mx-auto" : ""
        }`}
      />
      {subtitle && (
        <p className={`text-gray-600 text-base md:text-lg max-w-3xl leading-relaxed ${isCenter ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
