import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Demo from './Demo';

configure({ adapter: new Adapter() });

describe('<Demo /> with Enzyme testing hooks', () => {
    it('should set greeting text on mount', () => {
        const setGreeting = jest.fn();

        jest.spyOn(React, 'useEffect').mockImplementationOnce(effect => effect()); // mockImplementationOnce because we are not interested in the second useEffect hook
        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => (['', setGreeting]))      // greeting
            .mockImplementationOnce(() => ([0, jest.fn()]))         // count
            .mockImplementationOnce(() => ([false, jest.fn()]))     // visibility

        shallow(<Demo />);

        expect(setGreeting).toHaveBeenCalledWith('Hello World');
    });

    it('should update count on button click', () => {
        const setCount = jest.fn();
        const count = 101;

        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => (['', jest.fn()]))         // greeting
            .mockImplementationOnce(() => ([count, setCount]))       // count
            .mockImplementationOnce(() => ([false, jest.fn()]))      // visibility

        shallow(<Demo />).find('button').at(0).simulate('click');

        expect(setCount).toHaveBeenCalledWith(count + 1);
    });

    it('should toggle "tada" image on clicking the button', () => {
        const setVisibility = jest.fn();
        const visible = true;

        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => (['', jest.fn()]))            // greeting
            .mockImplementationOnce(() => ([0, jest.fn()]))             // count
            .mockImplementationOnce(() => ([visible, setVisibility]))   // visibility

        const wrapper = shallow(<Demo />);

        expect(wrapper.find('img[alt="tada"]')).toBeDefined();

        wrapper.find('button').at(1).simulate('click');

        expect(setVisibility).toHaveBeenCalledWith(false);
        expect(wrapper.find('img[alt="tada"]').count).not.toBe(1);
    });

    // the worst example of the tests because we are not using user interaction at all but just the implementation on the component
    it('should toggle "tada" image visibility on every 10th count update', () => {
        const setVisibility = jest.fn();
        const useEffectMock = jest.spyOn(React, 'useEffect').mockImplementation(effect => effect());

        jest.spyOn(React, 'useState')
            .mockImplementationOnce(() => (['', jest.fn()]))            // greeting
            .mockImplementationOnce(() => ([10, jest.fn()]))            // count
            .mockImplementationOnce(() => ([false, setVisibility]))     // visibility

        shallow(<Demo />);
        
        expect(setVisibility).toHaveBeenCalledWith(true);

        useEffectMock.mockReset();
    });
});
