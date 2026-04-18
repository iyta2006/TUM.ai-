"use client";

export default function NewsletterForm() {
  return (
    <form className="flex gap-2 w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 px-4 py-2 rounded-lg text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]"
      />
      <button type="submit" className="bg-[#f97316] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#f97316]/90 transition-colors shrink-0">
        Subscribe
      </button>
    </form>
  );
}
