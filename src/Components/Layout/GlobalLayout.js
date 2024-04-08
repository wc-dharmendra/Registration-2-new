import { useTheme } from 'next-themes';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });

const GlobalLayout = ({ children, theme = "minimal", pattern = "Cross", bg = null }) => {
  const { resolvedTheme = "", setTheme } = useTheme();
  return (
    <div id='font-div' style={{backgroundColor: bg}} className={`min-h-screen bg-cover ${inter.className} ${resolvedTheme || theme} ${inter.className} ${pattern}`}>
      {children}
    </div>
  )
};

export default GlobalLayout;
 