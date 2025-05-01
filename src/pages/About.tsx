
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-hotel-beige">
      <Navbar />
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-hotel-brown text-white">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Rebstock</h1>
              <p className="text-lg opacity-90 mb-8">
                A legacy of luxury hospitality since 1965
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-hotel-brown mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 1965 by the visionary hotelier Richard Rebstock, our establishment began as a boutique 
                  retreat nestled in the heart of the city. What started as a small family business with just 15 rooms 
                  has flourished into an award-winning hospitality brand with properties across three continents.
                </p>
                <p className="text-gray-700 mb-4">
                  Through decades of political changes, economic fluctuations, and evolving travel trends, 
                  Rebstock has remained steadfast in its commitment to exceptional service and authentic experiences.
                </p>
                <p className="text-gray-700">
                  Today, under the leadership of the third generation of the Rebstock family, we continue 
                  to honor our heritage while embracing innovation to meet the needs of the modern traveler.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-xl"
              >
                <img 
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Historic Rebstock Hotel" 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-hotel-beige">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-hotel-brown mb-4">Our Values</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These core principles guide everything we do at Rebstock Hotels
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Excellence",
                  desc: "We are committed to exceeding expectations in every aspect of our service."
                },
                {
                  title: "Authenticity",
                  desc: "We create genuine experiences that reflect the unique character of each destination."
                },
                {
                  title: "Sustainability",
                  desc: "We strive to minimize our environmental footprint while maximizing our positive impact."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-bold text-hotel-brown mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-hotel-brown mb-4">Our Leadership Team</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Meet the dedicated professionals who guide our vision and operations
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Eleanor Rebstock",
                  role: "CEO",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                },
                {
                  name: "Marcus Chen",
                  role: "Operations Director",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                },
                {
                  name: "Sophia Williams",
                  role: "Guest Experience Manager",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-hotel-beige p-6 rounded-xl text-center"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-hotel-brown">{member.name}</h3>
                  <p className="text-hotel-accent">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
