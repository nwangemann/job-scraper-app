// import React from 'react';
// import {render, fireEvent} from '@testing-library/react';
// import GetListing from '../Components/SavedJobsPage/SavedJobsPage';

// it('Renders out starting text', () => {
//     const {container} = render(<GetListing/>)
//     expect(container.textContend).toContain('rendered all listings')
// });

// it('Getting Listing', () => {
//     const {getByTestId, container} = render(<GetListing/>)
//     const button = getByTestId('search-button');
//     expect(container.textContent).toContain('You have nothing to list');
//     fireEvent.click(button);
//     expect(container.textContent).toContain('You have your listing')
// })

import axios from 'axios';
import { fetchData, API } from './';
jest.mock('axios');
describe('fetchData', () => {
  it('fetches successfully data from an API', async () => {
    const data = {...};
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(fetchData('react')).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `${API}/search?query=react`,
    );
  });
});