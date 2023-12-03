import logo from './logo.svg';
import './App.css';
import BubbleChart from './components/BubbleChart';
import AlterTable from './components/AlterTable';
import React, { Component } from 'react';
import * as d3 from 'd3';




function RenderAlterTable({version, handleAddition, handleDelete, handler, data}){
		let conditionalTable = (version !== 'V1') ? 
			(<AlterTable version={version} handleAddition={handleAddition} handleDeleteItem={handleDelete} handler={handler} data={data}/>) :
			(null)

		return conditionalTable;
}


class AppSelect extends Component {
	constructor(props){
		super(props);
		this.state = {
			data: props.data,
			version: props.version
		}

		this.handler = this.handler.bind(this);
		this.handleDelete =  this.handleDelete.bind(this);
		this.handleAddition = this.handleAddition.bind(this);
	}

	handleAddition(name){
		var newData = this.state.data;
		let newNode = {id:0, name: name, value:100}

		for(var i in newData.children){
			newData.children[i].id += 1;
		}
		newData.children.unshift(newNode);
		this.setState({
			data: newData
		})

	}

	handler(id, action, value){	
		this.setState({
			data: this.props.data,
		})
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

	render(){
	  return (
	  	<div>
	      <BubbleChart data={this.props.data}/>
	      <RenderAlterTable version={this.props.version} handleAddition={this.handleAddition} handleDelete={this.handleDelete} handler={this.handler} data={this.props.data}/>
	    </div>
	  );
	}
}

export default AppSelect;