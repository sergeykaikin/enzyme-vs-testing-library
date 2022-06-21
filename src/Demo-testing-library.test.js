import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Demo from './Demo';

describe('<Demo /> with @testing-library/react', () => {
    it('should set greeting text on mount', async() => {
        const { findByText } = render(<Demo />);

        expect(await findByText('Hello World!')).toBeDefined();
    });

    it('should update count on button click', async() => {
        const { findByText } = render(<Demo />);

        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));

        expect(await findByText('Current count: 2')).toBeDefined();
    });

    it('should toggle "tada" image on clicking the button', async() => {
        let tadas;
        const { findByText, queryAllByAltText } = render(<Demo />);

        fireEvent.click(await findByText('Toggle visibility'));

        tadas = await queryAllByAltText('tada');

        expect(tadas.length).toBe(1);

        fireEvent.click(await findByText('Toggle visibility'));

        tadas = await queryAllByAltText('tada');

        expect(tadas.length).toBe(0);
    });

    it('should toggle "tada" image visibility on every 10th count update', async() => {
        let tadas;
        const { findByText, queryAllByAltText } = render(<Demo />);

        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        
        tadas = await queryAllByAltText('tada');

        expect(tadas.length).toBe(1);

        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));
        fireEvent.click(await findByText('Update count'));

        tadas = await queryAllByAltText('tada');

        expect(tadas.length).toBe(0);
    });
});
