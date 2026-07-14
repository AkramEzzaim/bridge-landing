"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./site-footer.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FooterLink = { label: string; href?: string };
type SocialLink = {
  label: string;
  icon: "facebook" | "instagram" | "tiktok" | "youtube" | "vk" | "x" | "whatsapp" | "telegram" | "messages";
};

const COURSE_LINKS: FooterLink[] = [
  { label: "For your kids", href: "#kids" },
  { label: "For Adults", href: "#adults" },
  { label: "For Teens", href: "#teens" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { label: "Blog" },
  { label: "FAQs" },
  { label: "Contact", href: "mailto:hello@bridgeway.md" },
];

const BRIDGEWAY_LINKS: FooterLink[] = [{ label: "Why us?", href: "#why-bridgeway" }];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy" },
  { label: "Terms" },
  { label: "Cookies" },
  { label: "Refund" },
];

const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", icon: "facebook" },
  { label: "Instagram", icon: "instagram" },
  { label: "TikTok", icon: "tiktok" },
  { label: "YouTube", icon: "youtube" },
  { label: "VK", icon: "vk" },
  { label: "X", icon: "x" },
];

const MESSAGE_LINKS: SocialLink[] = [
  { label: "WhatsApp", icon: "whatsapp" },
  { label: "Telegram", icon: "telegram" },
  { label: "Messages", icon: "messages" },
];

function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 12h15M14 6l6 6-6 6" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 3 5 6v5c0 4.8 2.7 8.2 7 10 4.3-1.8 7-5.2 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-5" />
    </svg>
  );
}

function FooterIcon({ name }: { name: SocialLink["icon"] }) {
  let content: ReactNode;

  switch (name) {
    case "facebook":
      content = <path d="M13.6 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V4a22 22 0 0 0-2.4-.1c-2.4 0-4.1 1.5-4.1 4.3V10H8v3h2.5v8h3.1Z" fill="currentColor" stroke="none" />;
      break;
    case "instagram":
      content = <><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.7" r=".8" fill="currentColor" stroke="none" /></>;
      break;
    case "tiktok":
      content = <path d="M14 4v10.1a3.9 3.9 0 1 1-3.3-3.8v2.8a1.5 1.5 0 1 0 1 1.4V4h2.3c.4 2.1 1.7 3.4 3.8 3.7v2.4A7.1 7.1 0 0 1 14 8.7" />;
      break;
    case "youtube":
      content = <><rect x="3" y="6" width="18" height="12" rx="3" /><path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" /></>;
      break;
    case "vk":
      content = <text x="3.2" y="16.7" fill="currentColor" stroke="none" fontSize="11" fontWeight="900">VK</text>;
      break;
    case "x":
      content = <path d="m5 4 14 16M19 4 5 20" />;
      break;
    case "whatsapp":
      content = <><path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4.1A8 8 0 1 1 20 11.7Z" /><path d="M9 8.5c.3 3 2 4.8 5.1 5.6l1.4-1.4M9 8.5l1.2-.7M10.2 7.8l1.1 2" /></>;
      break;
    case "telegram":
      content = <><path d="m3.5 11.5 16-6-3 13-5-3.8-3 2.5.4-4.4 7.7-4.6-9.4 3.7-3.7-1.4Z" /><path d="m8.9 12.8 7.7-4.6" /></>;
      break;
    default:
      content = <><path d="M5 5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /><path d="M8 10h8M8 13h5" /></>;
  }

  return <svg aria-hidden="true" viewBox="0 0 24 24">{content}</svg>;
}

function FooterNavColumn({ id, title, links }: { id?: string; title: string; links: FooterLink[] }) {
  return (
    <nav className={styles.topColumn} id={id} aria-label={title}>
      <h2 className={styles.navTitle}>{title}</h2>
      <ul className={styles.navList}>
        {links.map((link) => {
          const content = <><ArrowRight /><span>{link.label}</span></>;

          return <li key={link.label}>
            {link.href ? <a className={styles.navLink} href={link.href}>
              {content}
            </a> : <span className={styles.navLabel}>
              {content}
            </span>}
          </li>;
        })}
      </ul>
    </nav>
  );
}

function SocialIconRow({ label, items }: { label: string; items: SocialLink[] }) {
  return (
    <div className={styles.socialGroup}>
      <p>{label}</p>
      <div className={styles.socialRow}>
        {items.map((item) => (
          <span key={item.label} className={styles.socialIcon} role="img" aria-label={item.label}>
            <FooterIcon name={item.icon} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const card = root.querySelector<HTMLElement>(`.${styles.card}`);
      const glow = root.querySelector<HTMLElement>(`.${styles.bottomGlow}`);
      const wordmark = root.querySelector<HTMLElement>(`.${styles.wordmarkLogo}`);
      if (!card || !glow || !wordmark) return;

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top 94%",
          end: "top 16%",
          scrub: 1.35,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .fromTo(
          card,
          { autoAlpha: 0, y: 150, rotateX: 6, rotateZ: -1.2, scale: 0.96, transformOrigin: "50% 100%" },
          { autoAlpha: 1, y: 0, rotateX: 0, rotateZ: 0, scale: 1, duration: 0.66 },
          0,
        )
        .fromTo(
          glow,
          { scale: 0.72, yPercent: 22, autoAlpha: 0.25 },
          { scale: 1, yPercent: 0, autoAlpha: 1, duration: 1.1 },
          0,
        )
        .fromTo(
          `.${styles.topColumn}`,
          { autoAlpha: 0, y: 70, rotateY: -8, rotateZ: -2 },
          { autoAlpha: 1, y: 0, rotateY: 0, rotateZ: 0, stagger: 0.1, duration: 0.42 },
          0.18,
        )
        .fromTo(
          wordmark,
          { autoAlpha: 0, y: 170, rotateX: 9, scale: 0.94, filter: "blur(12px)", transformOrigin: "50% 100%" },
          { autoAlpha: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)", duration: 0.68 },
          0.5,
        )
        .fromTo(
          `.${styles.bottomItem}`,
          { autoAlpha: 0, y: 34, rotateZ: -2 },
          { autoAlpha: 1, y: 0, rotateZ: 0, stagger: 0.09, duration: 0.34 },
          0.78,
        );
    },
    { scope },
  );

  return (
    <footer ref={scope} className={styles.shell} id="site-footer" aria-labelledby="site-footer-heading">
      <div className={styles.card}>
        <h2 className={styles.visuallyHidden} id="site-footer-heading">Bridgeway</h2>
        <div className={styles.background} aria-hidden="true" />
        <div className={styles.bottomGlow} aria-hidden="true" />

        <div className={styles.rail}>
          <div className={styles.topGrid}>
            <div className={styles.topColumn}>
              <a className={styles.contactCard} id="footer-contact" href="mailto:hello@bridgeway.md">
                <span className={styles.contactIcon}><MailIcon /></span>
                <span>
                  <span className={styles.contactLabel}>Contact Us</span>
                  <strong>hello@bridgeway.md</strong>
                </span>
              </a>

              <SocialIconRow label="Follow us" items={SOCIAL_LINKS} />
              <SocialIconRow label="Message us" items={MESSAGE_LINKS} />
            </div>

            <FooterNavColumn title="English Courses" links={COURSE_LINKS} />
            <FooterNavColumn id="resources" title="Resources" links={RESOURCE_LINKS} />
            <FooterNavColumn title="Bridgeway" links={BRIDGEWAY_LINKS} />
          </div>
        </div>

        <a className={styles.wordmark} href="#" aria-label="Bridgeway home">
          <Image
            className={styles.wordmarkLogo}
            src="/bridgeway-footer-wordmark.svg"
            alt=""
            width={1298}
            height={430}
            sizes="(max-width: 560px) calc(100vw - 52px), (max-width: 1600px) calc(100vw - 128px), 1545px"
            unoptimized
          />
        </a>

        <div className={`${styles.bottomBar} ${styles.rail}`}>
          <div className={`${styles.legal} ${styles.bottomItem}`} aria-label="Legal information">
            {LEGAL_LINKS.map((link) => <span key={link.label}>{link.label}</span>)}
          </div>

          <div className={`${styles.payment} ${styles.bottomItem}`}>
            <span className={styles.shield}><ShieldIcon /></span>
            <span>
              <strong>100% Secure Payment</strong>
              <small>SSL Encrypted</small>
            </span>
          </div>

          <p className={`${styles.copyright} ${styles.bottomItem}`}>
            © {new Date().getFullYear()} Bridgeway. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
