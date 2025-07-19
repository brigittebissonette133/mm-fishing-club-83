
import React, { useEffect } from 'react';

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  useEffect(() => {
    // Add security headers via meta tags (for development)
    const addSecurityMeta = () => {
      // Content Security Policy
      const cspMeta = document.createElement('meta');
      cspMeta.httpEquiv = 'Content-Security-Policy';
      cspMeta.content = "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; font-src 'self';";
      document.head.appendChild(cspMeta);

      // X-Content-Type-Options
      const noSniffMeta = document.createElement('meta');
      noSniffMeta.httpEquiv = 'X-Content-Type-Options';
      noSniffMeta.content = 'nosniff';
      document.head.appendChild(noSniffMeta);

      // X-Frame-Options
      const frameMeta = document.createElement('meta');
      frameMeta.httpEquiv = 'X-Frame-Options';
      frameMeta.content = 'DENY';
      document.head.appendChild(frameMeta);

      // Referrer Policy
      const referrerMeta = document.createElement('meta');
      referrerMeta.name = 'referrer';
      referrerMeta.content = 'strict-origin-when-cross-origin';
      document.head.appendChild(referrerMeta);
    };

    // Security event logging
    const logSecurityEvent = (event: string, details?: any) => {
      console.warn(`🔒 Security Event: ${event}`, details);
    };

    // Monitor for suspicious activity
    const securityMonitor = () => {
      // Monitor localStorage access patterns
      let localStorageAccess = 0;
      const originalSetItem = localStorage.setItem;
      const originalGetItem = localStorage.getItem;

      localStorage.setItem = function(key: string, value: string) {
        localStorageAccess++;
        if (localStorageAccess > 50) { // Threshold for suspicious activity
          logSecurityEvent('Excessive localStorage access detected');
        }
        return originalSetItem.call(this, key, value);
      };

      localStorage.getItem = function(key: string) {
        localStorageAccess++;
        return originalGetItem.call(this, key);
      };

      // Reset counter every minute
      setInterval(() => {
        localStorageAccess = 0;
      }, 60000);
    };

    // Initialize security measures
    addSecurityMeta();
    securityMonitor();

    // CSP violation reporting
    const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
      logSecurityEvent('CSP Violation', {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy
      });
    };

    document.addEventListener('securitypolicyviolation', handleCSPViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    };
  }, []);

  return <>{children}</>;
};
