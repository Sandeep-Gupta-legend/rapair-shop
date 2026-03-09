import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { reviewAPI } from '../services/apiService';
import { toast } from 'react-toastify';
import LoadingSkeleton from '../components/LoadingSkeleton';
import WhatsAppButton from '../components/WhatsAppButton';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    rating: 5
  });
  const [submitting, setSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await reviewAPI.getAll();
      setReviews(response.data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      await reviewAPI.create(formData);
      toast.success('Thank you for your review!');
      setFormData({ name: '', message: '', rating: 5 });
      setHoveredRating(0);
      fetchReviews();
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4 fade-in">Customer Reviews</h1>
          <p className="text-xl fade-in">See what our customers say about us</p>
          {!loading && reviews.length > 0 && (
            <div className="mt-6 flex items-center space-x-4">
              <div className="flex text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < Math.round(calculateAverageRating()) ? '' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-2xl font-bold">{calculateAverageRating()}</span>
              <span className="text-lg">({reviews.length} Reviews)</span>
            </div>
          )}
        </div>
      </section>

      {/* Add Review Form */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">Share Your Experience</h2>
          <form onSubmit={handleSubmitReview} className="max-w-2xl mx-auto card p-8">
            {/* Name Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                disabled={submitting}
              />
            </div>

            {/* Review Message Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Your Review *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Share your experience with Samarth Mobile..."
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
                disabled={submitting}
              />
            </div>

            {/* Rating Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-3">Rating *</label>
              <div className="flex space-x-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={submitting}
                    className="transition transform hover:scale-110 disabled:opacity-50"
                  >
                    <FaStar
                      size={40}
                      className={`cursor-pointer transition ${
                        star <= (hoveredRating || formData.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {hoveredRating ? `Rating: ${hoveredRating} stars` : `Current: ${formData.rating} stars`}
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">What Customers Say</h2>
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No reviews yet. Be the first to review us!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review._id} className="card p-6 fade-in">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-2xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 text-lg">{review.message}</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-800">{review.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
};

export default Reviews;
