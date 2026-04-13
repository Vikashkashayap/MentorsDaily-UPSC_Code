/**
 * Resolve course / upload thumbnails: S3 HTTPS URL, legacy /view/:id, or data URL.
 */
export function getApiBase() {
  return (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
}

export function resolveLegacyUploadThumb(thumb) {
  if (!thumb) return null;
  if (typeof thumb === "string") {
    if (/^https?:\/\//i.test(thumb) || thumb.startsWith("data:")) return thumb;
    return null;
  }
  if (thumb.data) {
    return `data:${thumb.contentType || "image/png"};base64,${thumb.data}`;
  }
  if (thumb._id) {
    return `${getApiBase()}/api/v1/view/${thumb._id}`;
  }
  if (thumb.path) return thumb.path;
  return null;
}

/** Course list/card: prefer thumbnailUrl (S3), then legacy thumbnail ref. */
export function resolveCourseThumbnailUrl(source) {
  if (!source || typeof source !== "object") {
    return resolveLegacyUploadThumb(source);
  }
  const raw = source.thumbnailUrl ?? source.thumbnail;
  return resolveLegacyUploadThumb(raw);
}

export function resolveFreeResourcePdfUrl(resource) {
  if (!resource) return null;
  const direct = resource.pdfUrl;
  if (direct && /^https?:\/\//i.test(String(direct).trim())) {
    return String(direct).trim();
  }
  const id = resource.fileId?._id ?? resource.fileId;
  if (id) {
    return `${getApiBase()}/api/v1/download/${id}`;
  }
  return null;
}

/** Blog hero: S3 thumbnailUrl, then legacy populated file. */
export function resolveBlogCoverUrl(blog, fileBase) {
  if (!blog) return null;
  const tu = blog.thumbnailUrl || blog.thumbnail;
  if (tu && /^https?:\/\//i.test(String(tu).trim())) {
    return String(tu).trim();
  }
  if (tu && String(tu).startsWith("data:")) return String(tu);
  const base = (fileBase || getApiBase()).replace(/\/$/, "");
  if (blog.file?._id) {
    return `${base}/api/v1/view/${blog.file._id}`;
  }
  return null;
}

/** PDF or embed URL for blog attachment. */
export function resolveBlogPdfOrViewUrl(blog, fileBase) {
  if (!blog) return null;
  const pu = blog.pdfUrl;
  if (pu && /^https?:\/\//i.test(String(pu).trim())) {
    return String(pu).trim();
  }
  const base = (fileBase || getApiBase()).replace(/\/$/, "");
  if (blog.file?._id) {
    return `${base}/api/v1/view/${blog.file._id}`;
  }
  return null;
}
