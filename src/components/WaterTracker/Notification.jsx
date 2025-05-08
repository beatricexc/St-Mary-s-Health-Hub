// src/components/Notification.jsx

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeProvider';

/**
 * Notification content for WaterTracker toasts.
 *
 * @param {{ glasses: number, goal?: number }} props
 */
export default function Notification({ glasses, goal = 8 }) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div
        style={{
          background: isDarkMode
            ? 'rgba(167, 139, 250, 0.2)'
            : 'rgba(40, 68, 151, 0.2)',
          width: 32,
          height: 32,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        💧
      </div>
      <div>
        <div
          style={{
            fontWeight: 600,
            color: isDarkMode ? '#F5F5FF' : '#2D3436'
          }}
        >
          Time to hydrate!
        </div>
        <div
          style={{
            fontSize: 12,
            color: isDarkMode
              ? 'rgba(245, 245, 255, 0.7)'
              : 'rgba(45, 52, 54, 0.7)'
          }}
        >
          You&apos;ve had {glasses}/{goal} glasses today
        </div>
      </div>
    </div>
  );
}
