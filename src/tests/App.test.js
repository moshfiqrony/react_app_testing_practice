import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../App';

test('Can search for a post using its ID', () => {
  render(<App />);
  expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  expect(screen.getByText(/search for a post by its id/i)).toBeInTheDocument();
  expect(screen.getByText(/post id:/i)).toBeInTheDocument();
  expect(screen.getByText(/submit/i)).toBeDisabled();
  user.type(screen.getByTestId('post-id-input'), "1")
  const submitButton = screen.getByText(/submit/i)
  expect(submitButton).toBeEnabled()
});
