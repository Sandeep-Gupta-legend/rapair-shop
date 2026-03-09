import { useState, useEffect } from 'react';
import { serviceAPI } from '../services/apiService';
import LoadingSkeleton from '../components/LoadingSkeleton';
import WhatsAppButton from '../components/WhatsAppButton';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await serviceAPI.getAll();
      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4 fade-in">Our Services</h1>
          <p className="text-xl fade-in">Professional repair services for all your devices</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No services available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service._id} className="card overflow-hidden fade-in group">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <a
                      href="tel:+919867963398"
                      className="btn btn-primary w-full text-center"
                    >
                      Inquire Now
                    </a>
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

export default Services;
