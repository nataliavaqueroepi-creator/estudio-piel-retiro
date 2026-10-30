import React from 'react';

interface QrCodeProps {
  value: string;
  size?: number;
  className?: string;
  includeLogo?: boolean;
}

export const QrCodeSvg: React.FC<QrCodeProps> = ({
  value,
  size = 200,
  className = '',
  includeLogo = true
}) => {
  // Deterministic SVG QR pattern representation for high-fidelity counter stand
  return (
    <div
      className={`relative inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-sm border border-stone-200 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 29 29"
        className="w-full h-full shape-rendering-crispEdges text-stone-900"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-Left Finder Pattern */}
        <rect x="0" y="0" width="7" height="7" />
        <rect x="1" y="1" width="5" height="5" fill="white" />
        <rect x="2" y="2" width="3" height="3" />

        {/* Top-Right Finder Pattern */}
        <rect x="22" y="0" width="7" height="7" />
        <rect x="23" y="1" width="5" height="5" fill="white" />
        <rect x="24" y="2" width="3" height="3" />

        {/* Bottom-Left Finder Pattern */}
        <rect x="0" y="22" width="7" height="7" />
        <rect x="1" y="23" width="5" height="5" fill="white" />
        <rect x="2" y="24" width="3" height="3" />

        {/* Timing Patterns */}
        <rect x="6" y="8" width="1" height="1" />
        <rect x="6" y="10" width="1" height="1" />
        <rect x="6" y="12" width="1" height="1" />
        <rect x="6" y="14" width="1" height="1" />
        <rect x="6" y="16" width="1" height="1" />
        <rect x="6" y="18" width="1" height="1" />
        <rect x="6" y="20" width="1" height="1" />

        <rect x="8" y="6" width="1" height="1" />
        <rect x="10" y="6" width="1" height="1" />
        <rect x="12" y="6" width="1" height="1" />
        <rect x="14" y="6" width="1" height="1" />
        <rect x="16" y="6" width="1" height="1" />
        <rect x="18" y="6" width="1" height="1" />
        <rect x="20" y="6" width="1" height="1" />

        {/* Alignment Pattern */}
        <rect x="20" y="20" width="5" height="5" />
        <rect x="21" y="21" width="3" height="3" fill="white" />
        <rect x="22" y="22" width="1" height="1" />

        {/* Data Matrix Simulated Blocks for Estudio Piel Retiro */}
        <rect x="8" y="1" width="2" height="1" />
        <rect x="12" y="0" width="1" height="2" />
        <rect x="15" y="1" width="2" height="1" />
        <rect x="19" y="0" width="2" height="1" />
        <rect x="8" y="3" width="1" height="2" />
        <rect x="11" y="3" width="2" height="1" />
        <rect x="14" y="4" width="1" height="2" />
        <rect x="17" y="3" width="2" height="1" />
        <rect x="20" y="4" width="1" height="1" />

        <rect x="1" y="8" width="2" height="1" />
        <rect x="4" y="9" width="1" height="2" />
        <rect x="9" y="8" width="2" height="2" />
        <rect x="13" y="9" width="1" height="1" />
        <rect x="15" y="8" width="2" height="1" />
        <rect x="18" y="9" width="1" height="2" />
        <rect x="23" y="8" width="2" height="1" />
        <rect x="27" y="9" width="1" height="1" />

        <rect x="0" y="11" width="2" height="1" />
        <rect x="3" y="12" width="2" height="1" />
        <rect x="8" y="11" width="1" height="2" />
        <rect x="10" y="12" width="2" height="1" />
        <rect x="16" y="11" width="2" height="2" />
        <rect x="22" y="11" width="1" height="2" />
        <rect x="25" y="12" width="2" height="1" />

        <rect x="1" y="14" width="1" height="2" />
        <rect x="4" y="15" width="2" height="1" />
        <rect x="9" y="14" width="2" height="1" />
        <rect x="12" y="15" width="2" height="2" />
        <rect x="15" y="14" width="1" height="2" />
        <rect x="19" y="15" width="2" height="1" />
        <rect x="24" y="14" width="2" height="1" />
        <rect x="27" y="15" width="1" height="2" />

        <rect x="2" y="18" width="2" height="1" />
        <rect x="8" y="17" width="2" height="1" />
        <rect x="11" y="18" width="1" height="2" />
        <rect x="14" y="17" width="2" height="1" />
        <rect x="18" y="18" width="1" height="1" />
        <rect x="21" y="17" width="2" height="1" />
        <rect x="26" y="18" width="2" height="1" />

        <rect x="8" y="22" width="1" height="2" />
        <rect x="11" y="23" width="2" height="1" />
        <rect x="14" y="22" width="1" height="2" />
        <rect x="17" y="23" width="2" height="1" />
        <rect x="8" y="26" width="2" height="1" />
        <rect x="12" y="25" width="1" height="2" />
        <rect x="15" y="26" width="2" height="1" />
        <rect x="18" y="27" width="1" height="1" />
        <rect x="26" y="24" width="2" height="2" />
      </svg>

      {includeLogo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-white p-1 shadow-md border border-stone-200 flex items-center justify-center">
            {/* Google "G" Icon */}
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
