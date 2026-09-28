import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {AdapterLuxon} from '@mui/x-date-pickers/AdapterLuxon';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import type {Preview} from '@storybook/react-vite';

const theme = createTheme();

const preview: Preview = {
  parameters: {layout: 'padded'},
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale='en-ZA'>
          <Story />
        </LocalizationProvider>
      </ThemeProvider>
    ),
  ],
};

export default preview;
