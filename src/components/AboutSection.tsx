import React from 'react';
import { SiteSettings } from '../types';
import { 
  Users, 
  Target, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  HeartHandshake,
  Compass,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { formatDriveImageUrl } from '../utils/imageHelper';

interface AboutSectionProps {
  settings: SiteSettings;
  onNavigate: (tab: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onNavigate }) => {
  // Ordered explicitly as: 1. Profile/Emblem Icon -> 2. Title -> 3. Details
  const aboutCards = [
    {
      id: 'about-card-1',
      iconEmoji: '🛡️',
      icon: <ShieldCheck className="w-8 h-8 text-emerald-700" />,
      title: '১০০% আমানতদারিতা ও শরিয়াহ স্বচ্ছতা',
      details: 'প্রতিটি দানের অর্থ সম্পূর্ণ শরিয়াহসম্মত খাতে এবং পাই-পাই হিসাবে যথাযথ সুবিধাবঞ্চিত মানুষের কাছে পৌঁছে দেওয়া হয়। আমাদের অভ্যন্তরীণ অডিট ও হিসাব উন্মুক্ত রাখা হয়।'
    },
    {
      id: 'about-card-2',
      iconEmoji: '🎯',
      icon: <Target className="w-8 h-8 text-emerald-700" />,
      title: 'স্থায়ী আত্মনির্ভরশীলতা ও পুনর্বাসন',
      details: 'কেবলমাত্র তাৎক্ষণিক ত্রাণ নয়, অসহায় পরিবারগুলোকে সেলাই মেশিন, ভ্যানগাড়ি, ক্ষুদ্র ব্যবসা ও কারিগরি প্রশিক্ষণের মাধ্যমে আজীবনের জন্য স্বাবলম্বী করাই আমাদের মূল লক্ষ্য।'
    },
    {
      id: 'about-card-3',
      iconEmoji: '📖',
      icon: <BookOpen className="w-8 h-8 text-emerald-700" />,
      title: 'কোরআন ও সুন্নাহর মানবিক আদর্শ',
      details: 'মানবতার মুক্তির দূত হযরত মুহাম্মদ (সা.)-এর পবিত্র সুন্নাহ ও মানবিক শিক্ষার আলোকে জাতি, ধর্ম, বর্ণ নির্বিশেষে প্রতিটি মানুষের মৌলিক অধিকার প্রতিষ্ঠায় আমরা নিবেদিত।'
    },
    {
      id: 'about-card-4',
      iconEmoji: '🤝',
      icon: <HeartHandshake className="w-8 h-8 text-emerald-700" />,
      title: 'নিবেদিতপ্রাণ কর্মী ও স্বেচ্ছাসেবী দল',
      details: 'সারাদেশে যেকোনো দুর্যোগ, বন্যা, অগ্নিকাণ্ড বা জরুরি পরিস্থিতিতে দ্রুততম সময়ে অসহায়দের সহায়তায় প্রস্তুত রয়েছে আমাদের প্রশিক্ষিত ও উদ্যমী স্বেচ্ছাসেবী বাহিনী।'
    },
    {
      id: 'about-card-5',
      iconEmoji: '🕌',
      icon: <Building2 className="w-8 h-8 text-emerald-700" />,
      title: 'দ্বীনি শিক্ষা ও এতিম প্রতিপালন',
      details: 'পিতৃহীন ও দরিদ্র শিশুদের নিরাপদ আবাসন, আদর্শ খাবার, নৈতিক চরিত্র গঠন, আধুনিক শিক্ষা ও হিফজুল কোরআন সম্পন্ন করার যাবতীয় খরচ ফাউন্ডেশন বহন করে।'
    },
    {
      id: 'about-card-6',
      iconEmoji: '🧭',
      icon: <Compass className="w-8 h-8 text-emerald-700" />,
      title: 'দূরদর্শী নেতৃত্ব ও পরিচালনা পর্ষদ',
      details: 'অভিজ্ঞ শিক্ষাবিদ, আলেম-ওলামা, সমাজসেবক ও পেশাজীবীদের দক্ষ দিকনির্দেশনায় সম্পূর্ণ অরাজনৈতিক ও জনকল্যাণমুখী ধারায় ফাউন্ডেশনের যাবতীয় কার্যক্রম পরিচালিত হয়।'
    }
  ];

  const stats = [
    { number: '১৫,০০০+', label: 'সুবিধাবঞ্চিত উপকারভোগী' },
    { number: '৫০+', label: 'সফল মানবিক প্রকল্প' },
    { number: '৫০০+', label: 'সক্রিয় নিবন্ধিত স্বেচ্ছাসেবক' },
    { number: '২৪/৭', label: 'জরুরি সেবা ও হটলাইন' }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold font-serif-bn mb-3 border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>আমাদের পরিচিতি, লক্ষ্য ও দর্শন</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-bn text-slate-900 tracking-tight mb-3">
            আমাদের সম্পর্কে
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans-bn leading-relaxed">
            একটি শোষণহীন, নৈতিক, মানবিক ও আত্মনির্ভরশীল আদর্শ কল্যাণসমাজ বিনির্মাণে আমাদের নিরবচ্ছিন্ন প্রয়াস।
          </p>
        </div>

        {/* Foundation Main Profile Highlight Card: 1. Profile Avatar -> 2. Title -> 3. Details */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl mb-14 border border-emerald-800/60 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 opacity-10 text-[180px] font-arabic select-none pointer-events-none">
            ۞
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            
            {/* 1. প্রথমে ছবি প্রোফাইল টাইপ (Profile Avatar Ring) */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-emerald-400 to-teal-200 shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-2 border-white flex items-center justify-center">
                  {settings.logoUrl ? (
                    <img
                      src={formatDriveImageUrl(settings.logoUrl)}
                      alt={settings.foundationName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl sm:text-5xl font-arabic text-emerald-800 select-none">☪</span>
                  )}
                </div>
              </div>
              <span className="mt-2.5 px-3 py-0.5 rounded-full bg-emerald-800/90 text-amber-300 text-xs font-semibold font-serif-bn border border-emerald-600">
                প্রতিষ্ঠা: {settings.establishedYear || '২০২০'}
              </span>
            </div>

            {/* 2. তারপর টাইটেল এবং 3. শেষে বিস্তারিত */}
            <div className="text-center md:text-left space-y-3 flex-1">
              {/* Title */}
              <h3 className="text-xl sm:text-3xl font-extrabold font-serif-bn text-white leading-tight">
                {settings.foundationName}
              </h3>
              
              <p className="text-xs sm:text-sm font-sans-bn text-amber-300 font-medium">
                {settings.slogan} • {settings.regNumber}
              </p>

              {/* Details */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200 font-sans-bn leading-relaxed pt-1">
                <strong>{settings.foundationName}</strong> একটি সম্পূর্ণ অরাজনৈতিক, অলাভজনক ও দ্বীনি চেতনায় পরিচালিত মানবসেবামূলক প্রতিষ্ঠান। ক্ষুধা, দারিদ্র্য, নিরক্ষরতা ও রোগব্যাধি দূর করে একটি আদর্শ কল্যাণসমাজ বিনির্মাণে আমরা সমাজের সামর্থ্যবান ও শুভাকাঙ্ক্ষীদের সাথে নিয়ে অসহায় তৃণমূল মানুষের পাশে দাঁড়িয়েছি।
              </p>

              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
                <button
                  onClick={() => onNavigate('activities')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-serif-bn text-xs shadow-md transition-all cursor-pointer"
                >
                  আমাদের কার্যক্রমসমূহ
                </button>
                <button
                  onClick={() => onNavigate('volunteer')}
                  className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold font-serif-bn text-xs border border-emerald-600 transition-all cursor-pointer"
                >
                  স্বেচ্ছাসেবক হিসেবে যুক্ত হোন
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Cards Grid: Layout Pattern -> 1. Profile Icon -> 2. Title -> 3. Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {aboutCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col items-center text-center group hover:-translate-y-1"
            >
              {/* 1. প্রথমে প্রোফাইল টাইপ আইকন (Profile-style circular icon with ring) */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-emerald-600 to-amber-300 shadow-md mb-4 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-emerald-50 border-2 border-white flex items-center justify-center">
                  {card.icon}
                </div>
              </div>

              {/* 2. তারপর টাইটেল (Title) */}
              <h4 className="text-base sm:text-lg font-bold font-serif-bn text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                {card.title}
              </h4>

              {/* 3. এবং শেষে বিস্তারিত (Details) */}
              <p className="text-xs sm:text-sm text-slate-600 font-sans-bn leading-relaxed">
                {card.details}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-800">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-700">
            {stats.map((st, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-4 lg:pt-0' : ''}>
                <div className="text-2xl sm:text-4xl font-extrabold font-serif-bn text-amber-300 mb-1">
                  {st.number}
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-sans-bn">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
