import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
test('renders vite and react logos', () => {
  render(<App />);
  const canvas = screen.getByTestId('canvas-test-id');;
  expect(canvas).toBeInTheDocument();
});