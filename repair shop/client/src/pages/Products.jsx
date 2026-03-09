import { useState, useEffect } from 'react';
import { productAPI } from '../services/apiService';
import LoadingSkeleton from '../components/LoadingSkeleton';
import WhatsAppButton from '../components/WhatsAppButton';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productAPI.getAll();
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="relative text-white py-16 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1800&q=80"
          alt="Mobile accessories"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/65"></div>
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-4 fade-in relative z-10">Our Products</h1>
          <p className="text-xl fade-in relative z-10">Quality mobile accessories at affordable prices</p>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <p className="text-gray-700 text-center">
            All accessories are tested before delivery. For bulk orders and latest stock, contact us on WhatsApp.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products available at the moment.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="card overflow-hidden fade-in group">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                    </div>
                    <a
                      href={`https://wa.me/919867963398?text=Hi, I'm interested in ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-full text-center text-sm"
                    >
                      Order via WhatsApp
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

export default Products;
