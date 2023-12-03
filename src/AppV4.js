import logo from './logo.svg';
import './App.css';
import BubbleChart from './components/BubbleChart';
import AlterTableV3 from './components/AlterTableV3';
import React, { Component } from 'react';
import * as d3 from 'd3';

class AppV4 extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
		}

		this.handler = this.handler.bind(this);
		this.handleDelete =  this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
	}

	handleAddition(name){
		console.log(name);
	}


	handleDelete(id){
		var newData = this.state.data;
		for(var i in newData.children){
			if(newData.children[i].id === id){
				newData.children.splice(i, 1);
			}
		}

		this.setState({
			data: newData,
		})
	}

	handler(id, action, value){	
		var newData = this.state.data;

		for(var i in newData.children){
			if (newData.children[i].id === id){
				newData.children[i].value = value;
			}
		}
		
		this.setState({
			data: newData
		})
	}

	render(){
	  return (
	  	<div>
	      <BubbleChart data={this.state.data}/>
	      <AlterTableV3 handleAddition={this.handleAddition} handleDeleteItem={this.handleDelete} handler={this.handler} data={this.state.data}/>
	    </div>
	  );
	}
}

export default AppV4;