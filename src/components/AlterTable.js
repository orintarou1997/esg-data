import React, { Component } from "react";
import * as d3 from "d3";

function shiftTable(data){
    const width = 528;
    const height = width;
    const margin = 1; // to avoid clipping the root circle stroke

    // Create the pack layout.
    const pack = d3
      .pack()
      .size([width - margin * 2, height - margin * 2])
      .padding(30);

    // Compute the hierarchy from the (flat) data; expose the values
    // for each node; lastly apply the pack layout.
    const root = pack(d3.hierarchy(data).sum((d) => d.value));

    return root.descendants().slice(1);
}

class AlterTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDOMElement = this.handleDOMElement.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
  }


  handleDOMElement(event) {
    this.setState({
      value: event.target.value,
    })
  }

  handleAddition(event){
    event.preventDefault();
    this.props.handleAddition(this.state.value)
    let structuredTable = shiftTable(this.props.data);
    this.setState({
      data: structuredTable,
      value: '',
    })
  }

  handleDelete(item) {
    var newData = this.state.data;
    var myResults = [];
    for (var i in newData) {
      if (newData[i].data.id === item.data.id) {
        delete newData[i];
      }
    }

    this.props.handleDeleteItem(item.data.id);

    this.setState({
      data: newData,
    });
  }

  handleClick(e, actionTitle) {
    var newData = this.state.data;
    let myNewValue = 0;

    if (actionTitle === "plus") {
      for (var i in newData) {
        if (newData[i].data.id === e.data.id) {
          newData[i].data.value += 5;
          myNewValue = newData[i].data.value;
        }
      }
    } else {
      for (var i in newData) {
        if (newData[i].data.id === e.data.id) {
          newData[i].data.value -= newData[i].data.value === 5 ? 0 : 5;
          myNewValue = newData[i].data.value;
        }
      }
    }

    this.props.handler(e.data.id, actionTitle, myNewValue);
    this.setState({
      data: newData,
    });
  }

  componentDidMount() {
    let structuredTable = shiftTable(this.props.data);
    this.setState({
      data: structuredTable,
    });
  }

  render() {
    if (this.props.version === "V2") {
      return (
        <div className="fixed right-[0%] top-[20%] w-2/4 pl-[10%] text-black">
          {this.state.data.map((item) => {
            return <ul className="hover:bg-zinc-300">{item.data.name}</ul>;
          })}
        </div>
      );
    } else if (this.props.version === "V3") {
      return (
        <div className="fixed h-[80vh] overflow-y-scroll right-[0%] top-[5%] w-2/4 pl-[10%] text-black">
          {this.state.data.map((item) => {
            return (
              <div>
                <span className="text-green-300">{item.data.value}</span>
                <li className="rounded-lg border-black border-2 list-none mb-4 min-w-fit w-[40%] hover:bg-zinc-300">
                  <span>{item.data.name}</span>
                  <span
                    onClick={(e) => this.handleClick(item, "minus")}
                    className="float-right text-lg text-center w-[20px] mr-[10px] hover:bg-zinc-500"
                  >
                    -
                  </span>
                  <span
                    onClick={(e) => this.handleClick(item, "plus")}
                    className="float-right text-lg text-center w-[20px]  hover:bg-zinc-500"
                  >
                    +
                  </span>
                </li>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div className="fixed h-[80vh] overflow-y-scroll right-[0%] top-[5%] w-2/4 pl-[5%] text-black">
        <span className="bg-[url('./scroll.png')] w-[40px] h-[40px] bg-contain fixed bottom-[6%] left-[75%]"></span>
        <form
          className="fixed w-[100%]"
          onSubmit={this.handleAddition}
        >
          <input
            type="text"
            name="name"
            value={this.state.value}
            placeholder="Add Bubble..."
            class="bg-[#F5F4F4] mt-[10px] text-center w-[40%]"
            onChange={this.handleDOMElement}
          ></input>
          <input value="+" type="submit" />
        </form>

        <hr class="h-[2px] w-[40%] my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <ul className="mt-[-4%]">
          {this.state.data.map((item) => {
            return (
              <div className="">
                <span className="text-green-300">{item.data.value}</span>
                <li className="rounded-lg border-black border-2 list-none mb-4 min-w-fit w-[40%] hover:bg-zinc-300">
                  <span
                    onClick={(e) => this.handleDelete(item)}
                    className=" hover:font-bold text-red-700 ml-[10px] mr-[10px]"
                  >
                    X
                  </span>
                  <span>{item.data.name}</span>
                  <span
                    onClick={(e) => this.handleClick(item, "minus")}
                    className="float-right text-lg text-center w-[20px] mr-[10px] hover:bg-zinc-500"
                  >
                    -
                  </span>
                  <span
                    onClick={(e) => this.handleClick(item, "plus")}
                    className="float-right text-lg text-center w-[20px]  hover:bg-zinc-500"
                  >
                    +
                  </span>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default AlterTable;
