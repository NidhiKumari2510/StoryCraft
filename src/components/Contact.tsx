import React, { useState } from 'react';
import { Mail, MessageCircle, Send, Star } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    alert('Thank you for your message! We\'ll get back to you soon! 🌟');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">
          Let's Chat! 💌
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-3xl mx-auto">
          We love hearing from our magical story families! Send us your thoughts, ideas, or just say hello!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-purple-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Your Name 👋
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="What should we call you?"
                required
                className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-purple-50/50 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Email Address 📧
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-purple-50/50 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                What's this about? 🤔
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-purple-50/50 text-lg"
              >
                <option value="">Choose a topic...</option>
                <option value="story-feedback">Story Feedback 📚</option>
                <option value="feature-request">New Feature Idea 💡</option>
                <option value="technical-help">Technical Help 🔧</option>
                <option value="partnership">Partnership 🤝</option>
                <option value="other">Just Saying Hi! 👋</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-2">
                Your Message 💭
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us what's on your mind..."
                required
                rows={5}
                className="w-full p-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-purple-50/50 text-lg resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <Send className="w-6 h-6" />
              <span>Send Message ✨</span>
            </button>
          </form>
        </div>

        {/* Contact Info & Fun Elements */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-lg border-2 border-blue-200">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4 shadow-lg">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Quick Response</h3>
              <p className="text-blue-700 text-lg leading-relaxed mb-4">
                We typically respond within 24 hours because we're as excited to hear from you 
                as kids are to read new stories!
              </p>
              <div className="flex justify-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl p-8 shadow-lg border-2 border-pink-200">
            <h3 className="text-2xl font-bold text-pink-800 mb-6 text-center">Other Ways to Reach Us 🌈</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 bg-white/50 rounded-xl p-4">
                <div className="text-2xl">📧</div>
                <div>
                  <p className="font-semibold text-pink-800">Email</p>
                  <p className="text-pink-700">hello@magicalstorymaker.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white/50 rounded-xl p-4">
                <div className="text-2xl">🐦</div>
                <div>
                  <p className="font-semibold text-pink-800">Twitter</p>
                  <p className="text-pink-700">@MagicalStories</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white/50 rounded-xl p-4">
                <div className="text-2xl">📘</div>
                <div>
                  <p className="font-semibold text-pink-800">Facebook</p>
                  <p className="text-pink-700">MagicalStoryMaker</p>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Section */}
          <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-3xl p-8 shadow-lg border-2 border-yellow-200 text-center">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4">We'd Love to Hear About... 🎯</h3>
            <div className="space-y-3 text-yellow-700 font-medium">
              <p>🌟 Your favorite stories we've created</p>
              <p>🎨 New art styles you'd like to see</p>
              <p>🦄 Character ideas for future stories</p>
              <p>💡 Cool features that would make stories even better</p>
              <p>📸 Photos of kids enjoying their stories!</p>
            </div>
            <div className="flex justify-center space-x-4 mt-6 text-3xl">
              <div className="animate-pulse">🌟</div>
              <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
              <div className="animate-pulse" style={{ animationDelay: '1s' }}>💫</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;