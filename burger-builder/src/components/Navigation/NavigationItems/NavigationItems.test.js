import React from 'react';
// Enzyme allows testing just a component of the application without the need to render the complete app
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// Components
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// Initializing enzyme
configure({adapter: new Adapter()});

// This represents a test suite 
describe('<NavigationItems />', () => {
    let wrapper;

    // beforeEach() runs this code before each test
    beforeEach(() => {
        // Shallow makes that the nested components are not rendered, only the one tested here
        wrapper = shallow(<NavigationItems />);
    });

    it('Should render two <NavigationItem />  elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });


    // Tests expected to fail: Authentication is not yet implemented in this project
    it('Should render three <NavigationItem />  elements if authenticated', () => {
        // Setting the NavigationItem prop required for the scope of this test
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    // Tests expected to fail: Authentication is not yet implemented in this project
    it('Should display the logout option if authenticated', () => {
        // Setting the NavigationItem prop required for the scope of this test
        wrapper.setProps({isAuthenticated: true});
        // The expected navigation item is written in the same way as in the code
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});