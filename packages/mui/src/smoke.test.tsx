import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {render, screen} from '@testing-library/react';
import {expect, test} from 'vitest';

test('MUI 9 renders under React 19 in jsdom', () => {
  render(
    <ThemeProvider theme={createTheme()}>
      <Button>Save</Button>
    </ThemeProvider>,
  );
  expect(screen.getByRole('button', {name: 'Save'})).toBeInTheDocument();
});
