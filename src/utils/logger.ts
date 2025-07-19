type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: any;
}

export class Logger {
  private static isDevelopment = import.meta.env.MODE === 'development';
  private static logs: LogEntry[] = [];
  private static maxLogs = 100;

  private static addLog(level: LogLevel, message: string, data?: any): void {
    const entry: LogEntry = {
      level,
      message: this.sanitizeMessage(message),
      timestamp: new Date(),
      data: this.sanitizeData(data)
    };
    
    this.logs.push(entry);
    
    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  private static sanitizeMessage(message: string): string {
    // Remove potentially sensitive information
    return message
      .replace(/password[s]?[:\s]*[^\s]+/gi, 'password: [REDACTED]')
      .replace(/token[s]?[:\s]*[^\s]+/gi, 'token: [REDACTED]')
      .replace(/key[s]?[:\s]*[^\s]+/gi, 'key: [REDACTED]')
      .replace(/secret[s]?[:\s]*[^\s]+/gi, 'secret: [REDACTED]');
  }

  private static sanitizeData(data: any): any {
    if (!data) return data;
    
    try {
      const sanitized = JSON.parse(JSON.stringify(data));
      this.recursiveSanitize(sanitized);
      return sanitized;
    } catch {
      return '[Unparseable Data]';
    }
  }

  private static recursiveSanitize(obj: any): void {
    if (typeof obj !== 'object' || obj === null) return;
    
    const sensitiveKeys = ['password', 'token', 'key', 'secret', 'auth'];
    
    for (const key in obj) {
      if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object') {
        this.recursiveSanitize(obj[key]);
      }
    }
  }

  static debug(message: string, data?: any): void {
    this.addLog('debug', message, data);
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  }

  static info(message: string, data?: any): void {
    this.addLog('info', message, data);
    if (this.isDevelopment) {
      console.info(`[INFO] ${message}`, data);
    }
  }

  static warn(message: string, data?: any): void {
    this.addLog('warn', message, data);
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data);
    }
  }

  static error(message: string, data?: any): void {
    this.addLog('error', message, data);
    console.error(`[ERROR] ${message}`, data);
  }

  static getLogs(): LogEntry[] {
    return [...this.logs];
  }

  static clearLogs(): void {
    this.logs = [];
  }
}
