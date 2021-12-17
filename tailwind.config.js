module.exports = {
  purge: ['./src/**/*.html', './src/**/*.vue', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Quicksand', 'Helvetica', 'Sans-serif']
    },
    extend: {
      colors: {
        primary: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#EFF5F5',
          300: '#CFE2E2',
          400: '#AFCFCE',
          500: '#8FBCBB',
          600: '#6FA9A8',
          700: '#568F8E',
          800: '#436F6E',
          900: '#304F4F'
        },
        secondary: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#F6FAFB',
          300: '#D1E7ED',
          400: '#ADD3DE',
          500: '#88C0D0',
          600: '#63ADC2',
          700: '#4596AD',
          800: '#367789',
          900: '#285764'
        },
        tertiary: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#E8EDF3',
          300: '#C5D4E3',
          400: '#A3BAD2',
          500: '#81A1C1',
          600: '#5F87B0',
          700: '#496E93',
          800: '#385471',
          900: '#273B4F'
        },
        success: {
          100: '#F5FAF8',
          200: '#E7F2EE',
          300: '#D8EAE3',
          400: '#BADACF',
          500: '#9DCABA',
          600: '#8DB6A7',
          700: '#5E7970',
          800: '#475B54',
          900: '#2F3D38'
        },
        warning: {
          100: '#FDF7EA',
          200: '#F9ECCB',
          300: '#F5E0AB',
          400: '#EEC86D',
          500: '#E6B12E',
          600: '#CF9F29',
          700: '#8A6A1C',
          800: '#685015',
          900: '#45350E'
        },
        danger: {
          100: '#F7EBEA',
          200: '#EBCECC',
          300: '#DFB1AD',
          400: '#C8766F',
          500: '#B03B31',
          600: '#9E352C',
          700: '#6A231D',
          800: '#4F1B16',
          900: '#35120F'
        },
        dark: {
          100: '#E6ECEC',
          200: '#BFD0CF',
          300: '#99B3B1',
          400: '#4D7B77',
          500: '#00423D',
          600: '#003B37',
          700: '#002825',
          800: '#001E1B',
          900: '#001412'
        },
        medium: {
          100: '#F8F9F9',
          200: '#EEF0F0',
          300: '#E4E7E7',
          400: '#CFD6D5',
          500: '#BBC4C3',
          600: '#A8B0B0',
          700: '#707675',
          800: '#545858',
          900: '#383B3B'
        },
        light: {
          100: '#FDFEFE',
          200: '#FAFBFB',
          300: '#F7F9F9',
          400: '#F0F5F5',
          500: '#EAF0F0',
          600: '#D3D8D8',
          700: '#8C9090',
          800: '#696C6C',
          900: '#464848'
        }
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar'
    }),
    require('@tailwindcss/custom-forms')
  ]
}
