import React, { useState } from 'react';
import { useBusiness } from '../../context/BusinessContext';
import { Store, Phone, Mail, MapPin, Clock, Edit2, Check, Info, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BusinessProfile: React.FC = () => {
  const { business, updateBusiness } = useBusiness();
  const [isEditing, setIsEditing] = useState(false);

  // Edit states
  const [name, setName] = useState(business.name);
  const [type, setType] = useState(business.type);
  const [phone, setPhone] = useState(business.phone);
  const [email, setEmail] = useState(business.email);
  const [address, setAddress] = useState(business.address);
  const [workingHours, setWorkingHours] = useState(business.workingHours);
  const [about, setAbout] = useState(business.about);

  const [feedback, setFeedback] = useState('');

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback('');

    updateBusiness({
      name,
      type,
      phone,
      email,
      address,
      workingHours,
      about
    });

    setFeedback('Profile details saved successfully!');
    setIsEditing(false);

    // Timeout alert
    setTimeout(() => {
      setFeedback('');
    }, 4000);
  };

  const businessTypes = ['Restaurant', 'Store / Shop', 'Pharmacy', 'Supermarket', 'Delivery Company'];

  return (
    <div id="profile-view-wrapper" className="space-y-5 pb-24 text-left">
      {/* Header Info */}
      <div className="flex justify-between items-center bg-zinc-950/60 py-2">
        <div>
          <h1 id="profile-main-title" className="text-xl font-bold font-sans text-zinc-100">Merchant Settings</h1>
          <p className="text-[11px] text-zinc-400 font-sans mt-0.5">Control store visibility parameters and identity files</p>
        </div>

        <button
          id="btn-edit-profile-toggle"
          onClick={() => {
            if (!isEditing) {
              // Reset values on click in case they modified something
              setName(business.name);
              setType(business.type);
              setPhone(business.phone);
              setEmail(business.email);
              setAddress(business.address);
              setWorkingHours(business.workingHours);
              setAbout(business.about);
            }
            setIsEditing(!isEditing);
          }}
          className="p-2.5 bg-zinc-900 border border-zinc-850 rounded-xl hover:bg-zinc-800 text-zinc-200 hover:text-amber-400 transition-colors cursor-pointer flex items-center justify-center"
          title={isEditing ? 'Cancel modification' : 'Edit profile details'}
        >
          {isEditing ? <Check className="w-4 h-4 text-emerald-400 stroke-[3px]" /> : <Edit2 className="w-4 h-4" />}
        </button>
      </div>

      {feedback && (
        <div id="profile-success-banner" className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-[11px] font-medium leading-relaxed font-sans">
          ✅ {feedback}
        </div>
      )}

      {/* 1. Header Profile Container card */}
      <div id="branding-cover-block" className="relative p-5 rounded-2xl bg-zinc-900 border border-zinc-850/70 overflow-hidden flex flex-col items-center text-center">
        {/* Background visual cover blend */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-amber-500/20 to-yellow-500/15" />
        
        <div id="profile-picture-container" className="relative mt-5 mb-2">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 p-[2px] shadow-lg shadow-amber-500/10">
            <img
              id="avatar"
              src={business.logo}
              alt={business.name}
              className="w-full h-full object-cover rounded-[14px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-900 shadow-md animate-pulse" />
        </div>

        <h2 id="merchant-title" className="text-base font-extrabold text-zinc-150 font-sans tracking-tight">
          {business.name}
        </h2>
        <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider font-sans mt-1">
          {business.type}
        </span>
      </div>

      {/* 2. Interactive Edit form vs Info view list */}
      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form
            id="profile-editing-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleUpdateProfile}
            className="space-y-4 rounded-2xl p-5 bg-zinc-900 border border-zinc-850/80 font-sans text-xs"
          >
            <h3 className="text-sm font-bold text-zinc-200 mb-3 block">Modifying parameters</h3>

            {/* Name */}
            <div id="edit-field-name" className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Business Name</label>
              <input
                id="edit-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 focus:outline-none focus:border-amber-400 placeholder-zinc-550"
              />
            </div>

            {/* Type SELECT */}
            <div id="edit-field-type" className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Merchant Category</label>
              <select
                id="edit-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-200 focus:outline-none focus:border-amber-400"
              >
                {businessTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Phone & Email in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div id="edit-field-phone" className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Phone Contact</label>
                <input
                  id="edit-phone"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-205 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div id="edit-field-email" className="space-y-1.5 text-left">
                <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Email Address</label>
                <input
                  id="edit-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-205 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Address */}
            <div id="edit-field-address" className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Physical Address</label>
              <input
                id="edit-address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-205 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Hours */}
            <div id="edit-field-hours" className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Working Hours</label>
              <input
                id="edit-workingHours"
                type="text"
                required
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-205 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* About bio */}
            <div id="edit-field-about" className="space-y-1.5 text-left">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">Description / Bio</label>
              <textarea
                id="edit-about"
                required
                rows={2}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full bg-zinc-950/80 border border-zinc-850 rounded-xl py-2.5 px-3.5 text-zinc-205 focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            {/* Save line */}
            <div className="pt-2.5 flex gap-3">
              <button
                id="btn-cancel-edit-profile"
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-zinc-950 hover:bg-zinc-850 border border-zinc-800 py-3 rounded-xl font-bold cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                id="btn-save-profile"
                type="submit"
                className="flex-1 bg-amber-400 hover:bg-amber-500 text-black py-3 rounded-xl font-bold font-sans cursor-pointer transition-colors shadow shadow-amber-400/5"
              >
                Save Details
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            id="profile-info-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Business Information List Card */}
            <div id="info-details-card" className="p-5 rounded-2xl bg-zinc-900 border border-zinc-850/80 space-y-4 font-sans text-xs">
              <h3 className="text-xs tracking-wider uppercase font-bold text-zinc-400 border-b border-zinc-805 pb-2">
                Business Information
              </h3>

              <div id="info-row-type" className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium flex items-center gap-2">
                  <Store className="w-4 h-4 text-zinc-600" />
                  Business Type
                </span>
                <span id="label-type" className="font-bold text-zinc-200 text-right">{business.type}</span>
              </div>

              <div id="info-row-phone" className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4 text-zinc-600" />
                  Phone Contact
                </span>
                <span id="label-phone" className="font-bold text-zinc-202 text-right">{business.phone}</span>
              </div>

              <div id="info-row-email" className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-zinc-600" />
                  Email Support
                </span>
                <span id="label-email" className="font-bold text-zinc-202 text-right">{business.email}</span>
              </div>

              <div id="info-row-address" className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-zinc-600" />
                  Store Location
                </span>
                <span id="label-address" className="font-bold text-zinc-202 text-right max-w-[180px] truncate" title={business.address}>
                  {business.address}
                </span>
              </div>

              <div id="info-row-hours" className="flex items-center justify-between">
                <span className="text-zinc-500 font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-600" />
                  Working Hours
                </span>
                <span id="label-hours" className="font-bold text-zinc-202 text-right">{business.workingHours}</span>
              </div>
            </div>

            {/* About / Bio Panel */}
            <div id="bio-card" className="p-5 rounded-2xl bg-zinc-900 border border-zinc-850/80 space-y-2 font-sans text-xs">
              <h3 className="text-xs tracking-wider uppercase font-bold text-zinc-400 flex items-center gap-1.5 mb-1">
                <Info className="w-4 h-4 text-amber-400" />
                About Our Store
              </h3>
              <p id="label-about text" className="text-zinc-400 leading-relaxed font-sans mt-1">
                {business.about}
              </p>
            </div>

            {/* Edit button big shortcut */}
            <button
              id="btn-edit-profile-shortcut"
              onClick={() => setIsEditing(true)}
              className="w-full bg-zinc-90 w-full py-3 px-4 rounded-xl text-xs font-bold font-sans text-amber-400 border border-zinc-800 hover:bg-zinc-850/60 transition-colors cursor-pointer text-center"
            >
              Configure Store Profiles
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
