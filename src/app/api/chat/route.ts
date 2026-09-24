import { NextResponse } from "next/server";
import { queryKnowledgeBase, getFallbackResponse, KYBER_KNOWLEDGE_TOPICS } from "@/lib/aiKnowledgeBase";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, language = "auto" } = body as {
      messages: ChatMessage[];
      language?: "th" | "en" | "auto";
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    const latestUserMessage = [...messages].reverse().find((m) => m.role === "user");
    if (!latestUserMessage || !latestUserMessage.content.trim()) {
      return NextResponse.json(
        { error: "No user message content found." },
        { status: 400 }
      );
    }

    const userText = latestUserMessage.content.trim();
    const containsThai = /[\u0E00-\u0E7F]/.test(userText);
    const resolvedLang = language === "auto" ? (containsThai ? "th" : "en") : language;

    // Check if GEMINI_API_KEY or OPENAI_API_KEY is available in environment
    const geminiKey = process.env.GEMINI_API_KEY;

    if (geminiKey) {
      try {
        const systemPrompt = `You are the official AI Support Assistant for KYBER & MARSLOQ (KYBER Technology Co., Ltd. - บริษัท ไคเบอร์ เทคโนโลยี จำกัด).
You assist prospective customers and IT managers in both Thai and English.
Company products:
1. KYBER HCI: Hyper-Converged Infrastructure (KSV virtualization, KSAN distributed storage, KNET SDN, KSEC microsegmentation).
2. MARSLOQ: High-throughput Log Management, SIEM, syslog, compliant with Thailand Computer Crime Act (พ.ร.บ. คอมพิวเตอร์) and PDPA.
3. VMware Migration: Seamless V2V live migration tool with minimal downtime and up to 60-70% lower TCO.
4. Contact info: Phone 099-105-3888, 064-642-3617, Email supawat@kyber-it.com, office located in Nonthaburi, Thailand.
Always be polite, professional, concise, and helpful. Format your response cleanly with markdown bullet points and links where helpful.
Reply in ${resolvedLang === "th" ? "Thai language (ภาษาไทย)" : "English language"}.`;

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemPrompt}\n\nUser Question: ${userText}` }]
                }
              ],
              generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 800
              }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (generatedText) {
            return NextResponse.json({
              reply: generatedText,
              lang: resolvedLang,
              source: "gemini"
            });
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini API call failed, falling back to local engine:", geminiErr);
      }
    }

    // Default fast, deterministic, reliable Knowledge Engine
    const { matchedTopic, detectedLang } = queryKnowledgeBase(userText, resolvedLang);

    if (matchedTopic) {
      const answer = detectedLang === "th" ? matchedTopic.answerTh : matchedTopic.answerEn;
      return NextResponse.json({
        reply: answer,
        lang: detectedLang,
        links: matchedTopic.relatedLinks || [],
        actions: matchedTopic.suggestedActions?.map(a => ({
          label: detectedLang === "th" ? a.labelTh : a.labelEn,
          query: detectedLang === "th" ? a.queryTh : a.queryEn
        })) || [],
        source: "knowledge_engine"
      });
    }

    // Fallback response with helpful support pointers
    const fallbackText = getFallbackResponse(userText, detectedLang);
    return NextResponse.json({
      reply: fallbackText,
      lang: detectedLang,
      links: [
        { label: detectedLang === "th" ? "ติดต่อเรา" : "Contact Sales", href: "/contact" },
        { label: detectedLang === "th" ? "ผลิตภัณฑ์ KYBER" : "KYBER Products", href: "/products/hci" }
      ],
      actions: [
        { label: detectedLang === "th" ? "KYBER HCI คืออะไร" : "What is KYBER HCI?", query: detectedLang === "th" ? "KYBER HCI คืออะไร" : "What is KYBER HCI?" },
        { label: detectedLang === "th" ? "MARSLOQ Log พ.ร.บ." : "MARSLOQ Log features", query: detectedLang === "th" ? "MARSLOQ Log มีฟีเจอร์อะไรบ้าง" : "What are MARSLOQ features?" },
        { label: detectedLang === "th" ? "ย้ายจาก VMware" : "VMware Migration", query: detectedLang === "th" ? "ย้ายระบบจาก VMware มา KYBER" : "How to migrate from VMware?" }
      ],
      source: "fallback"
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat message." },
      { status: 500 }
    );
  }
}
