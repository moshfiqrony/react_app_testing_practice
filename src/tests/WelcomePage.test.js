import { render, screen } from '@testing-library/react';
import {WelcomePage} from '../App'

test('welcome component test', () => {
	render(<WelcomePage name='Moshfiqur Rahman Rony' email='rony@getd2.com'/>)
	expect(screen.getByText(/moshfiqur rahman rony/i)).toBeInTheDocument()
	expect(screen.getByText(/rony@getd2.com/i)).toBeInTheDocument()
})
