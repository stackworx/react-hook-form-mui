import {afterEach, beforeEach, vi} from 'vitest';

/** Filters MUI X Pro's "Missing license key" console error out of a test file; other errors still print. */
export function silenceMissingLicense() {
  beforeEach(() => {
    const original = console.error.bind(console);
    vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
      if (String(args[0]).includes('MUI X: Missing license key')) return;
      original(...args);
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
}
