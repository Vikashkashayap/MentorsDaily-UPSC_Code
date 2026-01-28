import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchCurrentAffairs, fetchCurrentAffairById } from "../../../api/coreService";
import SEOHead from "../../../components/SEO/SEOHead";
import { slugify, decodeHtmlEntities } from "../../../utils/seoUtils";
import { formatDate } from "../../../utils/dateUtils";

const CurrentAffairDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [affairs, setAffairs] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  // Clean HTML comment fragments (like StartFragment/EndFragment from Word)
  const cleanHtmlFragments = (html = "") => {
    if (!html) return "";
    try {
      return html
        // Remove HTML comment fragments from Word/Office
        .replace(/<!--\s*StartFragment\s*-->/gi, '')
        .replace(/<!--\s*EndFragment\s*-->/gi, '')
        // Remove other common HTML comment patterns
        .replace(/<!--[\s\S]*?-->/g, '')
        .trim();
    } catch {
      return html;
    }
  };

  // Compact HTML utility reused from list page
  const compactHtml = (html = "") => {
    try {
      // First clean HTML fragments, then apply styling
      const cleaned = cleanHtmlFragments(html);
      return cleaned
        .replace(/<p(?![^>]*style=)/gi, '<p style="margin:4px 0; line-height:1.5"')
        .replace(/<ul(?![^>]*style=)/gi, '<ul style="margin:8px 0; padding-left:20px; line-height:1.5; list-style-type:disc"')
        .replace(/<ol(?![^>]*style=)/gi, '<ol style="margin:8px 0; padding-left:20px; line-height:1.5; list-style-type:decimal"')
        .replace(/<li(?![^>]*style=)/gi, '<li style="margin:4px 0; line-height:1.5; display:list-item"')
        .replace(/<table(?![^>]*style=)/gi, '<table style="border-collapse:collapse; width:100%; margin:16px 0; border:1px solid #ddd"')
        .replace(/<tbody(?![^>]*style=)/gi, '<tbody')
        .replace(/<tr(?![^>]*style=)/gi, '<tr')
        .replace(/<th(?![^>]*style=)/gi, '<th style="border:1px solid #ddd; padding:8px 12px; background-color:#f2f2f2; font-weight:bold; text-align:left"')
        .replace(/<td(?![^>]*style=)/gi, '<td style="border:1px solid #ddd; padding:8px 12px"');
    } catch {
      return html;
    }
  };

  // Helper function to check if a field has actual content (strips HTML and checks for non-empty text)
  const hasContent = (html) => {
    if (!html) return false;
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    return textContent.trim().length > 0;
  };

  // Helper function to get plain text from HTML
  const getPlainText = (html) => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return (tempDiv.textContent || tempDiv.innerText || '').trim();
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        // If we received only slug in the URL
        if (!id && slug) {
          const listRes = await fetchCurrentAffairs();
          const all = Array.isArray(listRes?.data?.data) ? listRes.data.data : [];
          setAffairs(all);
          const match = all.find((a) => slugify(a.title) === slug);
          if (match) {
            setPost(match);
            // Ensure canonical slug-only URL
            const canonical = `/currentAffairs/${slugify(match.title)}`;
            if (location.pathname !== canonical) {
              navigate(canonical, { replace: true });
            }
            return;
          }
          throw new Error("Not found");
        }
        

        // Back-compat: id + slug in URL
        if (id) {
          // also load list for sidebar
          try {
            const listRes = await fetchCurrentAffairs();
            setAffairs(Array.isArray(listRes?.data?.data) ? listRes.data.data : []);
          } catch {}
          const res = await fetchCurrentAffairById(id);
          const data = res?.data || null;
          setPost(data);
          if (data?.title) {
            const canonical = `/currentAffairs/${slugify(data.title)}`;
            if (location.pathname !== canonical) {
              navigate(canonical, { replace: true });
            }
          }
          return;
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, slug, navigate, location.pathname]);

  const pathname = useMemo(() => {
    const s = post?.title ? slugify(post.title) : (slug || "");
    return `/currentAffairs/${s}`;
  }, [slug, post]);

  const seoData = useMemo(() => {
    if (!post) return {};
    const title = `${post.title} | Current Affairs for UPSC`;
    const description = (post.description || post.content || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160);
    return {
      title,
      description,
      canonical: pathname,
      ogImage: post.thumbnailUrl || "/images/hero.png",
      keywords: `current affairs, upsc, ${post.subject || "general studies"}`
    };
  }, [post, pathname]);

  const filteredAffairs = useMemo(() => {
    if (!selectedDate) return affairs;
    try {
      const target = new Date(selectedDate);
      return affairs.filter((item) => {
        if (!item?.date) return false;
        const d = new Date(item.date);
        return (
          d.getUTCFullYear() === target.getUTCFullYear() &&
          d.getUTCMonth() === target.getUTCMonth() &&
          d.getUTCDate() === target.getUTCDate()
        );
      });
    } catch {
      return affairs;
    }
  }, [affairs, selectedDate]);

  return (
  <div className="relative min-h-screen w-full py-8 px-4 bg-gradient-to-br from-sky-50 via-white to-indigo-50" style={{ marginBottom: '-64px' }}>
    <SEOHead pathname={pathname} customData={seoData} />

    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-8">
      {/* Sidebar Filter */}
      <aside className="md:col-span-1.5">
        <div className="sticky top-24 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-gray-100 h-[calc(100vh-6rem)] overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <h2 className="text-lg font-semibold text-gray-800">Current Affairs</h2>
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {selectedDate && (
            <button onClick={() => setSelectedDate("")} className="mt-3 text-xs text-blue-600 hover:text-blue-800">
              Clear date
            </button>
          )}

          {/* List of posts */}
          <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1">
            {filteredAffairs.map((item) => (
              <button
                key={item._id}
                onClick={() => navigate(`/currentAffairs/${slugify(item.title || "")}`)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-base transition ${
                  post && post._id === item._id
                    ? "bg-blue-100 text-blue-800 font-medium"
                    : "hover:bg-blue-50 text-gray-700"
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: item.title }} />
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <section className="md:col-span-3 md:col-start-2 md:col-end-6">
        {/* Back button */}
        <div className="mb-3">
          <button
            onClick={() => navigate('/currentAffairs')}
            className="inline-flex items-center gap-1 text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md text-sm font-semibold"
          >
            ← Back
          </button>
        </div>

        {loading && <div className="w-full py-10 text-center">Loading...</div>}
        {error && <div className="w-full py-10 text-center text-red-600">{error}</div>}

        {post && !loading && !error && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 w-full md:w-[98%] ml-auto mr-0">
            <h1 
              className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: cleanHtmlFragments(post.title) }}
            />

            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span>{formatDate(post.date)}</span>

              {hasContent(post.paperName) && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-emerald-100 text-emerald-800 rounded-md">
                  <span className="mr-1">📚</span>
                  {decodeHtmlEntities(getPlainText(post.paperName))}
                </span>
              )}
              {hasContent(post.subject) && (
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-md">
                  <span className="mr-1">📖</span>
                  {decodeHtmlEntities(getPlainText(post.subject))}
                </span>
              )}
            </div>

            {post.thumbnailUrl && (
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                className="w-full max-h-[60vh] object-contain rounded-xl shadow mb-6"
              />
            )}

            {post.description && (
              <div
                className="text-base text-gray-700 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm mb-6"
                dangerouslySetInnerHTML={{ __html: compactHtml(post.description) }}
              />
            )}

            {post.content && (
              <div className="prose max-w-none">
                <div
                  className="text-gray-800 text-base md:text-lg"
                  dangerouslySetInnerHTML={{ __html: compactHtml(post.content) }}
                />
              </div>
            )}

            {post.source && (
              <a
                href={post.source}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-blue-600 hover:underline"
              >
                Source Link
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  </div>
);

};

export default CurrentAffairDetail;


