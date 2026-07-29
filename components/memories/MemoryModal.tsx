"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

type MemoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  /** Extra class for per-stage theming. */
  tone?: string;
  children: ReactNode;
};

/** A single viewport-level dialog. Portalling avoids transformed scene layers trapping fixed mobile UI. */
export function MemoryModal({ isOpen, onClose, eyebrow, title, tone = "", children }: MemoryModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    const journeyRoot = document.querySelector<HTMLElement>(".journey-root");
    const wasInert = journeyRoot?.inert ?? false;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    if (journeyRoot) journeyRoot.inert = true;

    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const autofocusTarget = panel?.querySelector<HTMLElement>("[data-autofocus]");
    if (autofocusTarget) autofocusTarget.focus();
    else panel?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], video, input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyStyle.overflow;
      document.body.style.position = bodyStyle.position;
      document.body.style.top = bodyStyle.top;
      document.body.style.width = bodyStyle.width;
      if (journeyRoot) journeyRoot.inert = wasInert;
      window.scrollTo(0, scrollY);
      restoreFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`memory-modal-root ${tone}`.trim()}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.28 }}
        >
          <button type="button" className="memory-modal-scrim" onClick={onClose} aria-label="Đóng kỷ niệm" />
          <motion.div
            ref={panelRef}
            className="memory-modal-panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0.14 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="memory-modal-close" onClick={onClose} aria-label="Đóng" data-autofocus>
              <X size={18} weight="bold" />
            </button>
            {eyebrow && <p className="scene-eyebrow">{eyebrow}</p>}
            <h2 className="memory-modal-title">{title}</h2>
            <div className="memory-modal-body">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}