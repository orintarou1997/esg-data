import logo from './logo.svg';
import './App.css';
import AppV1 from './AppV1';
import AppV2 from './AppV2';
import React, { Component } from 'react';
import * as d3 from 'd3';

const data = {
  name: "Eve",
  value:50,
  children: [
    {name: "Sandbox", value:100},
    {name: "Intra-Organziation", value:100},
    {name: "Community Development", value:100},
    {name: "ESG Fellowship", value:100},
    {name: "Software", value:100},
  ]
};

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			tab: 'V2'
		}
		this.welcome = this.welcome.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		document.querySelector('.tabTwo').style.backgroundColor = 'black';
	}
	handleClick(e){
		this.setState({
			tab: e.target.innerHTML,
		})
	}

	welcome(p) {
		if(p === 'V1'){
			document.querySelector('.tabOne').style.backgroundColor = 'black';
			document.querySelector('.tabTwo').style.backgroundColor = 'white';
			document.querySelector('.tabThree').style.backgroundColor = 'white';
			return <AppV1 data={data}/>;		
		}else if(p === 'V2'){
			if(document.querySelector('.tabOne')){
				document.querySelector('.tabOne').style.backgroundColor = 'white';
				document.querySelector('.tabTwo').style.backgroundColor = 'black';
				document.querySelector('.tabThree').style.backgroundColor = 'white';
			}
			return <AppV2 data={data}/>
		}else if(p === 'V3'){
			document.querySelector('.tabOne').style.backgroundColor = 'white';
			document.querySelector('.tabTwo').style.backgroundColor = 'white';
			document.querySelector('.tabThree').style.backgroundColor = 'black';
		}
	}
	render(){
	  var myTab = this.state.tab;
	  return (
	    <div className="">
	    	<header className="App-header">

		      {
		      	this.welcome(myTab)
		      }
	      	<div id="tabs">
		      	<ul>
		      		<li onClick={(e) => this.handleClick(e)} className="tab tabOne">V1</li>
		      		<li onClick={(e) => this.handleClick(e)} className="tab tabTwo">V2</li>
		      		<li onClick={(e) => this.handleClick(e)} className="tab tabThree">V3</li>
		      	</ul>
	      	</div>
	      	</header>
	    </div>
	  );
	}
}

export default App;