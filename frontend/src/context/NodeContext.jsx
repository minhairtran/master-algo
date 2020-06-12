import React, { Component, createContext } from "react";

import {
  dijkstra,
  getNodesInShortestPathOrder,
} from "../components/Pathfinding/dijkstra";

export const NodeContext = createContext();

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class NodeContextProvider extends Component {
  //tạo giá trị các ô
  state = {
    grid: [],
    algoSpeed: 1,
    mouseIsPressed: false,
  };

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }
  //hết tạo giá trị các ô

  //tạo chướng ngại vật
  handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  };

  handleMouseUp = () => {
    this.setState({ mouseIsPressed: false });
  };
  //hết tạo chướng ngại vật

  //tìm đường đi ngắn nhất
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * this.state.algoSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (
          document.getElementById(`node-${node.row}-${node.col}`).className !=
            "node node-start" &&
          document.getElementById(`node-${node.row}-${node.col}`).className !=
            "node node-finish"
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }
      }, 10 * this.state.algoSpeed * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (
          document.getElementById(`node-${node.row}-${node.col}`).className !=
            "node node-start" &&
          document.getElementById(`node-${node.row}-${node.col}`).className !=
            "node node-finish"
        ) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-shortest-path";
        }
      }, 50 * i);
    }
  }

  handleVisualizeDijkstra = () => {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };
  //hết tạo đường đi

  handleClearPath = () => {
    const newGrid = getInitialGrid();
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 66; col++) {
        if (row === START_NODE_ROW && col === START_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-start";
          continue;
        }
        if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
          document.getElementById(`node-${row}-${col}`).className =
            "node node-finish";
          continue;
        }
        document.getElementById(`node-${row}-${col}`).className =
          "node node-ordinary";
      }
    }
    this.setState({ grid: newGrid });
  };

  //handle algorithm speed

  handleSpeedFast = () => {
    const algoSpeed = 0.1;
    this.setState({ algoSpeed });
  };

  handleSpeedSlow = () => {
    const algoSpeed = 10;
    this.setState({ algoSpeed });
  };
  //hết handle algorithm speed

  render() {
    return (
      <NodeContext.Provider
        value={{
          ...this.state,
          grid: this.state.grid,
          handleMouseDown: this.handleMouseDown,
          handleMouseEnter: this.handleMouseEnter,
          handleMouseUp: this.handleMouseUp,
          mouseIsPressed: this.mouseIsPressed,
          visualizeDijkstra: this.handleVisualizeDijkstra,
          onClearPath: this.handleClearPath,
          handleSpeedSlow: this.handleSpeedSlow,
          handleSpeedFast: this.handleSpeedFast,
        }}
      >
        {this.props.children}
      </NodeContext.Provider>
    );
  }
}

export default NodeContextProvider;

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 66; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
