import { useTheme } from '../context/ThemeContext';

export function useThemeColor() {
  const { getActiveTheme } = useTheme();
  const activeTheme = getActiveTheme();
  
  const isDark = activeTheme === 'dark';
  
  return {
    primary: '#6C5CE7',
    secondary: isDark ? '#A8A8A8' : '#6C5CE7',
    background: isDark ? '#121212' : '#F8F9FA',
    card: isDark ? '#1E1E1E' : '#FFFFFF',
    text: isDark ? '#FFFFFF' : '#2D3436',
    border: isDark ? '#333333' : '#E9ECEF',
    notification: '#FF7675',
    success: '#00B894',
    warning: '#FDCB6E',
    error: '#FF7675',
  };
}
