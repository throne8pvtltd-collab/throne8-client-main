"use client";

import React from "react";

export default function GlobalStyles() {
    return (
        <style jsx global>{`
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      @keyframes marquee-reverse {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }

      .animate-marquee {
        display: flex;
        width: fit-content;
        animation: marquee 35s linear infinite;
      }
      .animate-marquee-reverse {
        display: flex;
        width: fit-content;
        animation: marquee-reverse 35s linear infinite;
      }
      .group:hover .animate-marquee,
      .group:hover .animate-marquee-reverse {
        animation-play-state: paused;
      }
      .pause-animation {
        animation-play-state: paused !important;
      }

      @keyframes float {
        0%,
        100% {
          transform: translateY(0) scale(1);
        }
        50% {
          transform: translateY(-20px) scale(1.05);
        }
      }
      @keyframes float-slow {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-8px);
        }
      }
      @keyframes pulse-slow {
        0%,
        100% {
          opacity: 0.5;
          transform: scale(1);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
      }
      .animate-float {
        animation: float 8s ease-in-out infinite;
      }
      .animate-float-delayed {
        animation: float 8s ease-in-out infinite 2s;
      }
      .animate-float-slow {
        animation: float-slow 6s ease-in-out infinite;
      }
      .animate-float-slow-delayed {
        animation: float-slow 6s ease-in-out infinite 1s;
      }
      .animate-pulse-slow {
        animation: pulse-slow 4s ease-in-out infinite;
      }

      @keyframes slide-up {
        from {
          transform: translate(-50%, 150%);
          opacity: 0;
        }
        to {
          transform: translate(-50%, 0);
          opacity: 1;
        }
      }
      .animate-slide-up {
        animation: slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
      }

      @keyframes fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .animate-fade-in {
        animation: fade-in 0.3s ease-out;
      }

      @keyframes slide-up-modal {
        from {
          transform: translateY(50px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .animate-slide-up-modal {
        animation: slide-up-modal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }

      .reveal-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal-active {
        opacity: 1;
        transform: translateY(0);
      }

      ::-webkit-scrollbar {
        width: 5px;
      }
      ::-webkit-scrollbar-thumb {
        background: #4a3728;
        border-radius: 10px;
      }

      .perspective-1000 {
        perspective: 1000px;
      }
      .transform-gpu {
        transform: translateZ(0);
      }
      .rotate-y-3 {
        transform: rotateY(3deg);
      }
      .rotate-y-5 {
        transform: rotateY(5deg);
      }
    `}</style>
    );
}