module.exports = {
  variants: {
    zIndex: ['responsive', 'hover'],
    opacity: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
    visibility: ['responsive', 'hover', 'focus', 'group-hover'],
    translate: ['responsive', 'hover', 'group-hover'],
    maxHeight: ['responsive', 'group-hover'],
    overflow: ['responsive', 'hover', 'group-hover'],
    borderWidth: ['responsive', 'first'],
    textColor: ['responsive', 'hover', 'focus', 'active', 'group-hover']
  },
  theme: {
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.875rem',
      'base': '1rem',
      'md': '1.2rem',
      'lg': '1.4rem',
      'xl': '1.6rem',
      '2xl': '1.875rem',
      '3xl': '2.2rem',
      '4xl': '2.5rem',
      '5xl': '3.2rem',
      '6xl': '3.8rem',
      '7xl': '4.8rem',
      '8xl': '5.8rem',
    },
    screens: {
      'sm': '570px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1199px',
      '2xl': '1499px',
    },
    fontFamily: {
      'display': ['"Manrope"', 'sans-serif'],
      'body': ['"IBM Plex Sans"', 'apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto'],
      'special': ['"IBM Plex Mono"', 'apple-system', 'BlinkMacSystemFont', "Segoe UI", 'Roboto']
    },
    colors: {
      white: '#fff',
      black: '#000',
      primary: {
        100: '#ECEFFC',
        200: '#D9DFF9',
        300: '#C7CFF5',
        400: '#B4BFF2',
        500: '#A1AFEF',
        600: '#8EA0EC',
        700: '#7B90E9',
        800: '#6980E5',
        900: '#5670E2',
        'base': '#4360DF'
      },
      'bad-red': {
        100: '#FFEAEE',
        'base': '#FF2D55'
      },
      'good-green': {
        100: '#EDFBEF',
        'base': '#4EBC60'
      },
      purple: {
        'base': '#887AF9'
      },
      cyan: {
        'base': '#51D0F0'
      },
      violet: {
        'base': '#D37EF4'
      },
      red: {
        'base': '#FA6565'
      },
      orange: {
        'base': '#FE8F59'
      },
      yellow: {
        'base': '#FFCA0F'
      },
      green: {
        'base': '#7CDA00'
      },
      moss: {
        'base': '#26A69A'
      },
      gray: {
        900: '#191919',
        800: '#333333',
        700: '#4C4C4C',
        600: '#666666',
        500: '#808080',
        400: '#999999',
        300: '#B2B2B2',
        200: '#CCCCCC',
        100: '#E5E5E5',
      },
      'blue-gray': {
        'medium': '#939BA1',
        'light': '#EEF2F5'
      }
    },
    extend: {
      borderWidth: {
        '16': '16px',
        '20': '20px',
        '30': '30px'
      },
      inset: {
        '1/2': '50%',
        '1/1': '100%'
      },
      margin: {
        '72': '18rem',
        '80': '20rem',
        '-72': '-18rem',
        '-80': '-20rem'
      },
      backgroundColor: theme => ({
        transparent: 'transparent'
      }),
      maxWidth: {
        'max-w-screen-xl': '1420px'
      },
      maxHeight: {
        '0': '0',
        '150px': '150px'
      },
      listStyleType: {
        roman: 'upper-roman'
      },
      zIndex: {
        '-1': '-1',
      }
    }
  }
}