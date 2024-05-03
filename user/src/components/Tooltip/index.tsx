import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'left'>('top');
  const tooltipRef = useRef<HTMLDivElement | null>(null); // Specify explicitly that it can be null
  const targetRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen && tooltipRef.current && targetRef.current) {
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const targetRect = targetRef.current.getBoundingClientRect();

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Check for space at the bottom
        if (tooltipRect.height + targetRect.bottom <= windowHeight) {
          setPosition('top');
        } else {
          setPosition('left');
        }

        // Check for right-side overflow if in left position
        if (position === 'left' && tooltipRef.current) { // Ensure tooltipRef.current is not null
          if (tooltipRect.right > windowWidth) {
            tooltipRef.current.style.left = `${targetRect.left - tooltipRect.width}px`;
          } else {
            tooltipRef.current.style.left = ''; // Reset left style if no overflow
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, position]);

  return (
    <>
      <span ref={targetRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </span>
      {isOpen && (
        <div
          ref={tooltipRef}
          className={`tooltip ${position}`}
          style={{ top: 0, left: 0 }}
        >
          {content}
          <div className="tooltip-arrow" />
        </div>
      )}
      <style jsx>{`
        .tooltip {
          position: absolute;
          background-color: #ddd;
          padding: 5px;
          border-radius: 3px;
          font-size: 14px;
          z-index: 10; /* Ensure tooltip is above other elements */
          opacity: 0.8; /* Optional: Set a semi-transparent background */
          white-space: nowrap; /* Prevent content from wrapping */
          display: none;
        }

        .tooltip.top {
          display: block;
          top: calc(100% + 5px); /* Add spacing between tooltip and target */
        }

        .tooltip.left {
          display: block;
          top: calc(50% - 12px); /* Center vertically */
          left: calc(-100% - 5px); /* Add spacing between tooltip and target */
        }

        .tooltip-arrow {
          position: absolute;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 5px solid #ddd; /* Match tooltip background color */
        }

        .tooltip.top .tooltip-arrow {
          bottom: -5px;
          left: calc(50% - 5px);
        }

        .tooltip.left .tooltip-arrow {
          top: calc(50% - 2.5px); /* Half of arrow height */
          left: -5px;
        }
      `}</style>
    </>
  );
};

export default Tooltip;
