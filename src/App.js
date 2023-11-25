import logo from './logo.svg';
import './App.css';
import AppV1 from './AppV1';
import AppV2 from './AppV2';
import React, { Component } from 'react';
import * as d3 from 'd3';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			tab: 'First'
		}
		this.welcome = this.welcome.bind(this);
	}

	welcome(p) {
		if(p === 'First'){
			return <AppV1/>;		
		}else if(p === 'Second'){
			return <AppV2/>
		}
	}
	render(){
	  var myTab = this.state.tab;
	  return (
	    <div className="App">
	      {
	      	this.welcome(myTab)
	      }
	      <div id="tabs">
	      	<ul>
	      		<li className="tab">First</li>
	      		<li className="tab">Second</li>
	      		<li className="tab">Third</li>
	      	</ul>
	      </div>
	    </div>
	  );
	}
}

export default App;