import {motion, AnimatePresence} from 'motion/react';
import {X} from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'privacy' | 'terms' | 'cookie' | null;
}

const content = {
  privacy: {
    title: "Privacy Policy",
    body: "Your privacy is important to us. It is Vansh Tejnani's policy to respect your privacy regarding any information we may collect from you across our website. We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used."
  },
  terms: {
    title: "Terms of Service",
    body: "By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
  },
  cookie: {
    title: "Cookie Policy",
    body: "This site uses cookies to provide you with a great experience and to help our website run effectively. By using this website, you agree to our use of cookies as described in this policy. We use analysis cookies to track website performance and usage."
  }
};

export default function LegalModal({ isOpen, onClose, type }: LegalModalProps) {
  if (!type) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg p-8 rounded-[2.5rem] glass-dark border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/40" />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-white">{content[type].title}</h3>
            <div className="prose prose-invert prose-sm">
              <p className="text-white/60 leading-relaxed">
                {content[type].body}
              </p>
              <p className="text-white/40 mt-4 text-xs">
                Last Updated: May 2026.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
