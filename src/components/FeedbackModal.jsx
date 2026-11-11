import React, { useState } from 'react';
import { X, Star, Send } from 'lucide-react';

export default function FeedbackModal({ onClose }) {
  const [category, setCategory] = useState('Feature Request');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans text-xs">
      <div className="bg-[#12141c] border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative text-gray-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer">
          <X size={18} />
        </button>

        <h3 className="text-base font-bold text-purple-400 mb-1">📝 Share Your Feedback</h3>
        <p className="text-gray-400 text-[11px] mb-4">Help us improve AlphaTrade Pro terminal experience.</p>

        {submitted ? (
          <div className="bg-green-950/40 border border-green-500/40 p-6 rounded-xl text-center space-y-2 my-4">
            <p className="text-green-400 font-bold text-sm">✓ Thank You for Your Feedback!</p>
            <p className="text-gray-300 text-[11px]">Your response has been recorded successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1 font-semibold">FEEDBACK CATEGORY</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-600 font-medium cursor-pointer"
              >
                <option value="Feature Request">Feature Request</option>
                <option value="Bug Report">Bug Report</option>
                <option value="UI/UX Suggestion">UI/UX Suggestion</option>
                <option value="General Feedback">General Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-semibold">RATE YOUR EXPERIENCE</label>
              <div className="flex space-x-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`cursor-pointer transition-transform hover:scale-110 ${star <= rating ? 'text-amber-400' : 'text-gray-600'}`}
                  >
                    <Star size={22} fill={star <= rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-1 font-semibold">YOUR COMMENTS</label>
              <textarea 
                rows="3" 
                placeholder="Write your suggestions or report issues here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#0b0e14] border border-gray-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-purple-600 resize-none"
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg text-xs tracking-wide shadow-lg transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Send size={14} />
              <span>Submit Feedback</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}