import React from 'react';
import { Link } from 'react-router-dom';
import {
  MdOutlineMedicalServices, MdCalendarMonth, MdPets, MdStore, MdCampaign, MdChat, MdCheckCircle, MdStar, MdLocationOn, MdPhone, MdEmail
} from 'react-icons/md';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const CheckIcon = () => (
  <MdCheckCircle className="w-5 h-5 text-green-600" />
);

const Landing = () => {
  const features = [
    { title: 'Find Trusted Vets', desc: 'Browse a verified directory of veterinarians, view ratings and profiles.', icon: <MdOutlineMedicalServices className="text-3xl text-yellow-700" />, to: '/vets' },
    { title: 'Easy Appointments', desc: 'Book and manage appointments directly from your dashboard.', icon: <MdCalendarMonth className="text-3xl text-yellow-700" />, to: '/my-appointments' },
    { title: 'Adoption & Care', desc: 'Discover pets for adoption and access essential care services.', icon: <MdPets className="text-3xl text-yellow-700" />, to: '/adoption' },
    { title: 'Pet Store', desc: 'Shop for food, toys, and supplies tailored for your pet.', icon: <MdStore className="text-3xl text-yellow-700" />, to: '/store' },
    { title: 'Lost & Found', desc: 'Help reunite lost pets with their families in your community.', icon: <MdCampaign className="text-3xl text-yellow-700" />, to: '/lostfound' },
    { title: '24/7 Chatbot', desc: 'Get quick answers and guidance any time with our chatbot.', icon: <MdChat className="text-3xl text-yellow-700" />, to: '/chatbot' },
  ];

  const steps = [
    { title: 'Create your account', desc: 'Sign up and choose your role: Owner/Buyer, Seller, or Veterinarian.', badge: 'Step 1' },
    { title: 'Explore & connect', desc: 'Search vets, browse services, or list pets/products to sell.', badge: 'Step 2' },
    { title: 'Book & manage', desc: 'Schedule appointments, manage consultations and requests.', badge: 'Step 3' },
    { title: 'Care & grow', desc: 'Track reviews, build your profile, and care for your pets with ease.', badge: 'Step 4' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-gray-50">
      {/* Hero */}
      <header className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-white">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-24 md:pb-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-3 bg-orange-50 text-orange-900 px-4 py-2 rounded-full border border-orange-200 shadow-sm">
                <img src="/logo.png" alt="PetConnect" className="w-6 h-6" />
                <span className="font-bold text-orange-800">PetConnect</span>
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
                Your all-in-one platform for 
                <span className="text-orange-500">pet care</span> and connections
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                Discover trusted vets, book appointments, adopt pets, and shop essentials—all in one place.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Now
                  </Button>
                </Link>
                <a href="#how">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    See how it works
                  </Button>
                </a>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2 font-medium"><CheckIcon /> Verified vets</span>
                <span className="inline-flex items-center gap-2 font-medium"><CheckIcon /> Secure platform</span>
                <span className="inline-flex items-center gap-2 font-medium"><CheckIcon /> 24/7 support</span>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-orange-50 to-orange-100 p-8 shadow-2xl border border-orange-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <MdOutlineMedicalServices className="text-3xl text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Find Vet</div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <MdCalendarMonth className="text-3xl text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Book</div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <MdChat className="text-3xl text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Consult</div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <MdPets className="text-3xl text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Adopt</div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <MdStore className="text-3xl text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Shop</div>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <MdChat className="text-3xl text-orange-600 mx-auto mb-2" />
                      <div className="font-semibold text-gray-800">Support</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg px-4 py-3 border border-orange-200 text-sm font-medium">
                <div className="flex items-center gap-1 text-orange-600">
                  <MdStar className="text-orange-400" />
                  <span>4.9</span>
                  <span className="text-gray-600">average rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* How it works */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold">How PetConnect works</h2>
          <p className="mt-3 text-yellow-800/90">We bring everything your pet needs into a single, friendly workflow.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          {steps.map((s, index) => (
            <Card key={s.title} className="border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 relative">
              <CardHeader>
                <div className="absolute -top-3 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {s.badge}
                </div>
                <CardTitle className="text-gray-900 mt-2">{s.title}</CardTitle>
                <CardDescription className="text-gray-600">{s.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/register">
            <Button size="lg" className="px-8">
              Create your free account
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-yellow-50/60 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold">Everything in one place</h2>
            <p className="mt-3 text-yellow-800/90">From finding vets to shopping for your pet—navigate with ease.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Link to={f.to} key={f.title} className="group">
                <Card className="border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="text-4xl mb-3">{f.icon}</div>
                    <CardTitle className="text-gray-900 group-hover:text-orange-600 transition-colors">{f.title}</CardTitle>
                    <CardDescription className="text-gray-600">{f.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-sm font-semibold text-orange-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Explore <span>→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Ready to get started?
                </h3>
                <p className="text-lg text-gray-700">
                  Join PetConnect today and experience smarter pet care.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg" className="w-full sm:w-auto px-8">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="PetConnect" className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">PetConnect</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MdEmail className="text-orange-500" />
                <span>support@petconnect.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MdPhone className="text-orange-500" />
                <span>+1 (555) 123-PETS</span>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} PetConnect. All rights reserved. Made with ❤️ for pet lovers.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
