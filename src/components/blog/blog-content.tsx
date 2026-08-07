"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
import { Copy } from "lucide-react";
import { createRoot } from "react-dom/client";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const blocks = contentRef.current.querySelectorAll("pre code");

    blocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement);

      const pre = block.parentElement;
      if (!pre || pre.parentElement?.classList.contains("code-sandbox")) return;

      const language =
        Array.from(block.classList)
          .find((cls) => cls.startsWith("language-"))
          ?.replace("language-", "") || "text";

      const wrapper = document.createElement("div");
      wrapper.className = "code-sandbox";

      const header = document.createElement("div");
      header.className = "code-sandbox-header";

      const langSpan = document.createElement("span");
      langSpan.className = "code-lang";
      langSpan.textContent = language;

      const copyContainer = document.createElement("div");
      copyContainer.className = "copy-container";

      header.appendChild(langSpan);
      header.appendChild(copyContainer);

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      const root = createRoot(copyContainer);

      let isCopied = false;
      const CopyButton = () => {
        const handleCopy = () => {
          navigator.clipboard.writeText(block.textContent || "");
          const btn = copyContainer.querySelector("button");
          if (btn) {
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg><span>Copied!</span>`;
            setTimeout(() => {
              btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg><span>Copy</span>`;
            }, 2000);
          }
        };

        return (
          <button
            onClick={handleCopy}
            className="code-copy-btn"
            aria-label="Copy code"
          >
            <Copy size={14} />
            <span>Copy</span>
          </button>
        );
      };

      root.render(<CopyButton />);
    });
  }, [content]);

  return (
    <div
      ref={contentRef}
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
