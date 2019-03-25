import React from 'react';
import MyComponent from './MyComponent';
import renderer from 'react-test-renderer';

describe('MyComponent component', () => {
    it('matches the snapshot', () => {
        const tree = renderer.create(<MyComponent/>).toJSON();
        expect(tree).toMatchSnapshot();
    })
})