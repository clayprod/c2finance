import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render } from '@testing-library/react';
import Login from '../src/pages/Login';
import Dashboard from '../src/pages/Dashboard';
import Goals from '../src/pages/Goals';
import Advisor from '../src/pages/Advisor';

vi.mock('chart.js', () => {
  class FakeChart {
    static register() {}
  }
  return {
    Chart: FakeChart,
    CategoryScale: {},
    LinearScale: {},
    BarElement: {},
    Tooltip: {},
  };
});

beforeEach(() => {
  global.fetch = vi.fn().mockImplementation((url: RequestInfo) => {
    if (String(url).includes('summary')) {
      return Promise.resolve({
        json: () =>
          Promise.resolve({ income: 0, expenses: 0, balance: 0, history: [] }),
      });
    }
    if (String(url).includes('advisor')) {
      return Promise.resolve({ json: () => Promise.resolve([]) });
    }
    return Promise.resolve({ json: () => Promise.resolve({}) });
  }) as any;
});

describe('pages', () => {
  it('login renders', () => {
    render(<Login />);
    expect(true).toBe(true);
  });

  it('dashboard renders', async () => {
    render(<Dashboard />);
    expect(global.fetch).toHaveBeenCalled();
  });

  it('goals renders', () => {
    render(<Goals />);
    expect(true).toBe(true);
  });

  it('advisor renders', () => {
    render(<Advisor />);
    expect(global.fetch).toHaveBeenCalled();
  });
});
