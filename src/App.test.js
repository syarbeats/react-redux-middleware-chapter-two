import React from 'react';
/*import ReactDOM from 'react-dom';
import App, {store} from './App';
import Provider from "react-redux/es/components/Provider";*/
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import App from "./App";
import MyComponent from "./MyComponent";
import TableRow from './TableRow';

Enzyme.configure({ adapter: new Adapter() });

describe('App component', () => {

  /*it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><App /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
*/


  it('Checking MyComponent rendered',  () => {
    const wrapper = shallow(<MyComponent />);
    //const mycomponent = wrapper.find('MyComponent');
    //expect(mycomponent.length).toEqual(1);
    expect(wrapper.exists()).toBe(true);
  });

  /*it('Checking props value',  () => {
    const wrapper = shallow(<TableRow />);
  });*/

});
