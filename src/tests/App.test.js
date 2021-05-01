import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import App from '../App';
import {WelcomePage} from '../App'

test('App rendered successfully', () => {
	render(<App />);
});

test('Welcome text rendered', () => {
	render(<App />);
	expect(screen.getByText(/welcome/i)).toBeInTheDocument();
});

test('\'search for a post by its id\' text rendered', () => {
	render(<App />);
	expect(screen.getByText(/search for a post by its id/i)).toBeInTheDocument();
});

test('Post Id label rendered', () => {
	render(<App />);
	expect(screen.getByText(/post id:/i)).toBeInTheDocument();
});

test('Submit button rendered', () => {
	render(<App />);
	expect(screen.getByText(/submit/i)).toBeDisabled();
});

test('Input working', () => {
	render(<App />);
	user.type(screen.getByTestId('post-id-input'), "1")
});

test('Submit button working', () => {
	render(<App />);
	user.type(screen.getByTestId('post-id-input'), "1")
	const submitButton = screen.getByText(/submit/i)
	expect(submitButton).toBeEnabled()
});

test('Post id submission test for id 1', () => {
	render(<App />);
	user.type(screen.getByTestId('post-id-input'), "1")
	const submitButton = screen.getByText(/submit/i)
	user.click(submitButton)
	expect(screen.getByText(/post 1/i)).toBeInTheDocument();
});

test('Post id submission test for id 2', () => {
	render(<App />);
	const back = screen.getByText(/back to home/i)
	user.click(back)
	user.type(screen.getByTestId('post-id-input'), "2")
	const submitButton = screen.getByText(/submit/i)
	user.click(submitButton)
	expect(screen.getByText(/post 2/i)).toBeInTheDocument();
});

test('welcome component test', () => {
	render(<WelcomePage name='Moshfiqur Rahman Rony' email='rony@getd2.com'/>)
	expect(screen.getByText(/moshfiqur rahman rony/i)).toBeInTheDocument()
	expect(screen.getByText(/rony@getd2.com/i)).toBeInTheDocument()
})
