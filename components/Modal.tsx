'use client';

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-gray-700 w-full max-w-md relative">
        {/* Animated glow bar */}
        <div className="h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0 animate-pulse"></div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
             <div></div>
            <button 
              onClick={onClose}
              className="text-white w-8 h-8 bg-red-700 p-1 rounded-full "
            >
             X
            </button>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
}