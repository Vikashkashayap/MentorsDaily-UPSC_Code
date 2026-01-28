import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFreeResourceById } from '../../api/freeResourceService';
import { Download, ArrowLeft, FileText } from 'lucide-react';

export default function FreeResourceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResourceDetail();
  }, [id]);

  const fetchResourceDetail = async () => {
    try {
      setLoading(true);
      const response = await getFreeResourceById(id);
      const resourceData = response?.data?.data || response?.data;
      setResource(resourceData);
    } catch (error) {
      console.error('Error fetching resource:', error);
      setError('Failed to load resource details');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (resource?.fileId?._id) {
      const downloadUrl = `${import.meta.env.VITE_API_URL}/api/v1/download/${resource.fileId._id}`;
      window.open(downloadUrl, '_blank');
    }
  };

  const handleView = () => {
    if (resource?.fileId?._id) {
      const viewUrl = `${import.meta.env.VITE_API_URL}/api/v1/view/${resource.fileId._id}`;
      window.open(viewUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Resource Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The resource you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Free Resources
          </button>
        </div>
      </div>

      {/* Resource Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Title */}
          <h1 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: resource.title }}
          />

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
              resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {resource.difficulty}
            </span>
            <span className="text-sm text-gray-600">
              Size: {resource.fileSize}
            </span>
            <span className="text-sm text-gray-600">
              Downloads: {resource.downloadCount || 0}
            </span>
            {resource.uploadedBy?.name && (
              <span className="text-sm text-gray-600">
                Uploaded by: {resource.uploadedBy.name}
              </span>
            )}
          </div>

          {/* Categories */}
          {resource.categories && resource.categories.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {resource.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-200"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
            <div 
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: resource.description }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleView}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              <FileText className="h-5 w-5" />
              View File
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm"
            >
              <Download className="h-5 w-5" />
              Download File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
