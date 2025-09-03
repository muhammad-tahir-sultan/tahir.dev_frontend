import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { shareBlog } from '../../redux/actions/comment';
import toast from 'react-hot-toast';

const ShareButtons = ({ blog, darkMode }) => {
    const dispatch = useDispatch();
    const [shareCount, setShareCount] = useState(blog?.shareCount || 0);
    const [copied, setCopied] = useState(false);
    
    // Current URL for sharing
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    // Share content
    const shareTitle = blog?.title || 'Check out this blog post';
    const shareText = blog?.shortDescription || 'I found this interesting article';
    
    // Handle share action
    const handleShare = async (platform) => {
        try {
            let shareUrl;
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + currentUrl)}`;
                    break;
                case 'copy':
                    navigator.clipboard.writeText(currentUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                    toast.success('Link copied to clipboard!');
                    break;
                default:
                    shareUrl = null;
            }
            
            // Open share dialog for social media platforms
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
            
            // Update share count in the backend
            const response = await dispatch(shareBlog(blog._id, platform));
            if (response.payload.shareCount) {
                setShareCount(response.payload.shareCount);
            }
            
        } catch (error) {
            console.error('Error sharing:', error);
            toast.error('Failed to share. Please try again.');
        }
    };
    
    return (
        <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Article
                {shareCount > 0 && (
                    <span className={`ml-2 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        ({shareCount})
                    </span>
                )}
            </h3>
            <div className="flex flex-wrap gap-2">
                {/* Twitter */}
                <button 
                    onClick={() => handleShare('twitter')}
                    className="p-2 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                    aria-label="Share on Twitter"
                    title="Share on Twitter"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                </button>
                
                {/* Facebook */}
                <button 
                    onClick={() => handleShare('facebook')}
                    className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                    aria-label="Share on Facebook"
                    title="Share on Facebook"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                </button>
                
                {/* LinkedIn */}
                <button 
                    onClick={() => handleShare('linkedin')}
                    className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors"
                    aria-label="Share on LinkedIn"
                    title="Share on LinkedIn"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </button>
                
                {/* WhatsApp */}
                <button 
                    onClick={() => handleShare('whatsapp')}
                    className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                    aria-label="Share on WhatsApp"
                    title="Share on WhatsApp"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                </button>
                
                {/* Copy Link */}
                <button 
                    onClick={() => handleShare('copy')}
                    className={`p-2 rounded-full ${
                        copied 
                            ? 'bg-green-500 text-white' 
                            : darkMode 
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    } transition-colors`}
                    aria-label="Copy link"
                    title="Copy link to clipboard"
                >
                    {copied ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ShareButtons;
