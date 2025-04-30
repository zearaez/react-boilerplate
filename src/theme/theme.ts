// theme/theme.ts
import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles' {
  type ThemeBranding = {
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
    1000?: string;
  };
  interface Palette {
    custom: {
      brand: {
        lime: string;
        plum: string;
        lemon: string;
        charcoal: string;
        sand: string;
        chartreuse?: string;
        mistyWhite?: string;
        milk?: string;
        pastel?: string;
        taupe?: string;
        silverFog?: string;
        skyBlue?: string;
        red?: string;
        blue?: string;
      };
      neutral: ThemeBranding;
      transparent: ThemeBranding;
      boxShadow: ThemeBranding;
    };
  }

  interface PaletteOptions {
    custom?: {
      brand?: {
        lime?: string;
        plum?: string;
        lemon?: string;
        charcoal?: string;
        sand?: string;
        chartreuse?: string;
        mistyWhite?: string;
        milk?: string;
        pastel?: string;
        taupe?: string;
        silverFog?: string;
        skyBlue?: string;
        red?: string;
        lightGray?: string;
        blue?: string;
        lightBlack?: string;
        borderWhite?: string;
        lightGreen?: string;
        lightSilver?: string;
        gray?: string;
      };
      neutral?: ThemeBranding;
      transparent?: ThemeBranding;
      boxShadow: ThemeBranding;
    };
  }
}
const theme = createTheme({
  // spacing: [4, 8, 12, 16, 24, 32, 40, 48, 64, 96],

  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },

    background: {
      default: '#64F099',
      paper: '#f4f4f4',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    },
    success: {
      main: '#64F099',
      100: '#DDFDED',
      200: '#0AC295',
      300: '#09A57F',
      400: '#078364',
      500: '#027357',
    },
    warning: {
      100: '#FEF7B9',
      200: '#FFDA6C',
      300: '#FFB400',
      400: '#E07C02',
      500: '#C33E01',
    },
    error: {
      100: '#FCD2CF',
      200: '#F45532',
      300: '#DF320C',
      400: '#C61A0B',
      500: '#AE0A0A',
    },
    custom: {
      brand: {
        lime: '#64F099',
        plum: '#612DEF',
        lemon: '#FFE86E',
        charcoal: '#413A37',
        sand: '#F7F3F1',
        chartreuse: '#C1DF61',
        mistyWhite: '#FFFFFF73',
        milk: '#E7E0D6',
        pastel: '#CCFFCC',
        taupe: '#E7E0D680',
        silverFog: '#CDD3DD',
        skyBlue: '#6AC4FA',
        red: '#ED1845',
        lightGray: '#BCBCBC',
        gray: '#6E6E6E',
        blue: '#4A49CB',
        lightBlack: '#3F3F3F',
        borderWhite: '#F1F1F1',
        lightGreen: '#79998E',
        lightSilver: '#D9D9D9',
      },
      neutral: {
        100: '#FFFFFF',
        200: '#FBFBFB',
        300: '#FBF9F8',
        400: '#F7F2F1',
        500: '#F2EEED',
        600: '#EDEAE9',
        700: '#CAC7C6',
        800: '#969290',
        900: '#413A37',
        1000: '#000000',
      },
      transparent: {
        100: 'rgba(247, 249, 252, 0.55)',
        200: 'rgba(203, 211, 223, 0.55)',
        300: 'rgba(0, 0, 0, 0.25)',
        400: 'rgba(0, 0, 0, 0.5)',
        500: 'rgba(0, 0, 0, 0.75)',
      },
      boxShadow: {
        100: '0px 2px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: {
      fontFamily: "'Caladea', sans-serif",
      fontSize: '40px',
      fontWeight: 'bold',
      height: '40px',
    },
    h2: {
      fontFamily: "'Caladea', sans-serif",
      fontSize: '26px',
      fontWeight: 'bold',
      height: '34px',
    },
    h3: {
      fontFamily: "'Caladea', sans-serif",
      fontSize: '22px',
      fontWeight: 'bold',
      height: '24px',
    },
    h4: {
      fontFamily: "'Caladea', sans-serif",
      fontSize: '18px',
      fontWeight: 'bold',
      height: '22px',
    },
    body1: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '20px',
    },
    body2: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '14px',
      fontWeight: 'normal',
      lineHeight: '16px',
    },
    subtitle1: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '12px',
      fontWeight: 'normal',
      lineHeight: '16px',
    },
    subtitle2: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '10px',
      fontWeight: 'normal',
      lineHeight: '12px',
    },
  },
});

export default theme;
