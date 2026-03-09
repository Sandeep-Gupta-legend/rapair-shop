import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { serviceAPI, reviewAPI } from '../services/apiService';
import LoadingSkeleton from '../components/LoadingSkeleton';
import WhatsAppButton from '../components/WhatsAppButton';

const Home = () => {
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, reviewsRes] = await Promise.all([
        serviceAPI.getAll(),
        reviewAPI.getAll()
      ]);
      setServices(servicesRes.data.data.slice(0, 3));
      setReviews(reviewsRes.data.data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1800&q=80"
          alt="Mobile repair workspace"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/70"></div>
        <div className="container-custom">
          <div className="max-w-3xl fade-in relative z-10">
            <h1 className="text-5xl font-bold mb-4">
              Samarth Mobile
            </h1>
            <p className="text-3xl mb-4">समर्थ मोबाईल</p>
            <p className="text-xl mb-6">
              Professional Mobile & Laptop Repair Services in Mira Road
            </p>
            <div className="flex items-center space-x-2 mb-8">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < 4 ? '' : 'text-gray-300'} />
                ))}
              </div>
              <span className="text-lg">4.6 (189 Reviews)</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+919867963398" className="btn bg-white text-primary hover:bg-gray-100">
                <FaPhone className="inline mr-2" />
                Call Now
              </a>
              <Link to="/contact" className="btn bg-transparent border-2 border-white hover:bg-white hover:text-primary">
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-4xl font-bold mb-6 text-gray-800">About Us</h2>
              <p className="text-lg text-gray-600 mb-4">
                Welcome to Samarth Mobile, your trusted partner for all mobile and laptop repair needs in Mira Road. With years of experience and expertise, we provide fast, reliable, and affordable repair services.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our skilled technicians use the latest tools and genuine parts to ensure your devices work like new. We pride ourselves on excellent customer service and quick turnaround times.
              </p>
              <div className="flex items-start space-x-3 text-gray-700">
                <FaMapMarkerAlt className="text-primary text-2xl mt-1" />
                <div>
                  <p className="font-semibold">Visit Us:</p>
                  <p>Shop no B 54, Shanti Shopping Centre, B Wing</p>
                  <p>Opposite Mira Road Station, Mira Road East</p>
                  <p>Mumbai, Maharashtra 401107</p>
                </div>
              </div>
            </div>
            <div className="fade-in">
              <img
                src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
                alt="Technician repairing smartphone"
                className="w-full h-[420px] object-cover rounded-2xl shadow-xl mb-6"
              />
              <div className="bg-white p-8 rounded-lg shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Why Choose Us?</h3>
                <ul className="space-y-4">
                  {[
                    'Expert Technicians',
                    'Genuine Parts',
                    'Fast Service',
                    'Affordable Prices',
                    'Warranty on Repairs',
                    'Free Diagnosis'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                        ✓
                      </div>
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Services</h2>
            <p className="text-lg text-gray-600">Expert repair services for all your devices</p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service._id} className="card p-6 fade-in">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Customer Reviews</h2>
            <p className="text-lg text-gray-600">What our customers say about us</p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review._id} className="card p-6 fade-in">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{review.message}</p>
                  <p className="font-semibold text-gray-800">- {review.name}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/reviews" className="btn btn-primary">
              View All Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Find Us</h2>
            <p className="text-lg text-gray-600">Visit our shop for the best mobile repair services</p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.0847387472864!2d72.8642!3d19.2812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE2JzUyLjMiTiA3MsKwNTEnNTEuMSJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Samarth Mobile Location"
            ></iframe>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
};

export default Home;
