"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle, X, Minimize2 } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { initChatbotContext } from "@/lib/chatbot-context";
import { getTireById } from "@/lib/data/tires";

interface ChatbotWidgetProps {
  currentProductId?: string;
}

export default function ChatbotWidget({ currentProductId }: ChatbotWidgetProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { items, addItem } = useCartStore();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentProduct = currentProductId ? getTireById(currentProductId) ?? null : null;
    initChatbotContext({
      currentPage: pathname,
      currentProduct,
      cart: items,
      addToCart: (tireId, quantity) => {
        const tire = getTireById(tireId);
        if (tire) addItem(tire, quantity);
      },
      navigateTo: (path) => router.push(path),
    });
  }, [pathname, items, currentProductId, router, addItem]);

  return (
    <>
      {/* Floating button (mobile / closed) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1e3a8a] text-white rounded-full shadow-lg px-4 py-3 hover:bg-[#1e3a8a]/90 transition-colors"
          aria-label="Open tire advisor"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">AI Tire Advisor</span>
        </button>
      )}

      {/* Widget panel */}
      {open && (
        <div
          ref={containerRef}
          className="fixed bottom-6 right-6 z-50 flex flex-col w-[360px] sm:w-96 h-[600px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] overflow-hidden"
        >
          {/* Widget header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1e3a8a] text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <div>
                <p className="text-sm font-semibold leading-tight">AI Tire Advisor</p>
                <p className="text-xs text-blue-200 leading-tight">powered by HappyRobot</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded">
                <Minimize2 className="w-4 h-4" />
              </button>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/10 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* HappyRobot widget injection target */}
          <div
            id="happyrobot-widget-container"
            className="flex-1 flex flex-col items-center justify-center bg-[#f8fafc] p-6"
          >
            {/* ──────────────────────────────────────────────────────────────
                HappyRobot Widget is injected here.

                Integration:
                1. In /app/layout.tsx add the HappyRobot script:
                   <Script src="https://widget.happyrobot.ai/embed.js"
                           data-agent-id="YOUR_AGENT_ID"
                           data-container="#happyrobot-widget-container"
                           strategy="afterInteractive" />

                2. The agent can access all tire data via window.tireShopContext
                   (see /lib/chatbot-context.ts).
                ─────────────────────────────────────────────────────────── */}
            <div className="text-center space-y-3 border-2 border-dashed border-[#e2e8f0] rounded-xl p-6 w-full">
              <div className="w-12 h-12 bg-[#1e3a8a]/10 rounded-full flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6 text-[#1e3a8a]" />
              </div>
              <div>
                <p className="font-medium text-[#0f172a] text-sm">HappyRobot Chatbot</p>
                <p className="text-xs text-[#64748b] mt-1">Widget will be injected here</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-left text-xs text-[#1e3a8a] space-y-1">
                <p className="font-semibold">Context available:</p>
                <p>✓ {pathname === "/" ? "Home" : pathname} active</p>
                {currentProductId && <p>✓ Product: {currentProductId}</p>}
                <p>✓ {items.length} product(s) in cart</p>
                <p>✓ 43 tires in database</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
