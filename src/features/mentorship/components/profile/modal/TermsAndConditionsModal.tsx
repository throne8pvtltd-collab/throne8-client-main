import React from "react";
import { X, CheckCircle } from "lucide-react";

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function TermsAndConditionsModal({
  isOpen,
  onClose,
  onAccept,
}: TermsAndConditionsModalProps) {
  if (!isOpen) return null;

  const termsContent = [
    {
      title: "Acceptance of Terms",
      content:
        "By accessing and using the Throne8 platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.",
    },
    {
      title: "User Responsibilities",
      content:
        "You are responsible for maintaining the confidentiality of your Throne8 account credentials. You agree not to share your login information with any third party. All activities performed under your account are your sole responsibility.",
    },
    {
      title: "Privacy Policy",
      content:
        "Thronet Technology Private Limited collects and processes your personal data in accordance with our Privacy Policy. Your information is used solely to provide and improve Throne8's services. We do not sell or share your personal data with third parties without your consent.",
    },
    {
      title: "Payment Terms",
      content:
        "All payments made on the Throne8 platform are final and non-refundable unless stated otherwise. You agree to provide accurate billing information and authorize Thronet Technology Private Limited to charge applicable fees for services you purchase.",
    },
    {
      title: "Community Guidelines",
      content:
        "Throne8 is a professional networking platform for students, freshers, and working professionals. All users must engage respectfully. Any form of harassment, abuse, hate speech, or illegal activity is strictly prohibited and may result in immediate account termination.",
    },
    {
      title: "Platform Rules",
      content:
        "You agree not to misuse the Throne8 platform, attempt unauthorized access, or engage in any activity that disrupts platform services. Thronet Technology Private Limited reserves the right to suspend or terminate accounts that violate these rules.",
    },
    {
      title: "Changes to Terms",
      content:
        "Thronet Technology Private Limited reserves the right to modify these Terms & Conditions at any time. Continued use of the Throne8 platform after changes constitutes your acceptance of the updated terms.",
    },
    {
      title: "Contact Us",
      content:
        "For any questions regarding these Terms & Conditions, please contact our support team:",
      contact: true,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col border-2" style={{ borderColor: '#e0d8cf' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b-2" style={{ borderColor: '#e0d8cf' }}>
          <div>
            <h2 className="text-3xl font-bold" style={{ color: '#4a3728' }}>
              Terms & Conditions
            </h2>
            <p className="text-sm mt-1" style={{ color: '#8a7a6a' }}>
              Throne8 (Thronet Technology Private Limited)
            </p>
            <p className="text-xs mt-1" style={{ color: '#9a8a7a' }}>
              Last Updated: February 21, 2026
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300"
          >
            <X className="w-6 h-6" style={{ color: '#4a3728' }} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {termsContent.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#4a3728' }}>
                <span className="w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-bold" style={{ backgroundColor: '#7a5c3e' }}>
                  {idx + 1}
                </span>
                {section.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#7a5c3e' }}>
                {section.content}
              </p>
              {section.contact && (
                <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: '#fbf7f3', borderLeft: '4px solid #7a5c3e' }}>
                  <p className="text-sm font-semibold mb-2" style={{ color: '#4a3728' }}>
                    📧 support@throne8.com
                  </p>
                  <p className="text-sm" style={{ color: '#7a5c3e' }}>
                    🏢 Thronet Technology Private Limited, Bhopal, Madhya Pradesh, India
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Important Notice */}
          <div className="mt-8 p-4 rounded-xl border-2" style={{ borderColor: '#e0d8cf', backgroundColor: '#fbf7f3' }}>
            <p className="text-xs leading-relaxed" style={{ color: '#8a7a6a' }}>
              By using the Throne8 platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. Your continued use of the platform constitutes your acceptance of any updates to these terms.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 p-8" style={{ borderColor: '#e0d8cf' }}>
          <button
            onClick={() => {
              onAccept();
              onClose();
            }}
            className="w-full px-6 py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300" style={{ backgroundColor: '#4a3728' }}>
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
}
