import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'button' | 'icon' | 'switch';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'button' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const buttonSizeClasses = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className={`btn btn-outline-secondary ${buttonSizeClasses[size]} ${className}`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className={sizeClasses[size]} />
        ) : (
          <Sun className={sizeClasses[size]} />
        )}
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <div className={`form-check form-switch ${className}`}>
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="themeSwitch"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
        <label className="form-check-label" htmlFor="themeSwitch">
          <span className="d-flex align-items-center gap-2">
            {theme === 'light' ? (
              <>
                <Sun className={sizeClasses[size]} />
                Light
              </>
            ) : (
              <>
                <Moon className={sizeClasses[size]} />
                Dark
              </>
            )}
          </span>
        </label>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`btn btn-outline-secondary d-flex align-items-center gap-2 ${buttonSizeClasses[size]} ${className}`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <>
          <Moon className={sizeClasses[size]} />
          Dark Mode
        </>
      ) : (
        <>
          <Sun className={sizeClasses[size]} />
          Light Mode
        </>
      )}
    </button>
  );
};

export default ThemeToggle;