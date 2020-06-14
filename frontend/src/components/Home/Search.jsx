import React, { useEffect, useState } from "react";
import AllAlgorithms from "../Algorithm/AllAlgorithms";
import apiAlgorithmsList from "../../api/algorithm/ApiAlgorithmsList";

const Search = (props) => {
  const [algorithmsList, setAlgorithmsList] = useState([]);
  const [searchedAlgorithms, setSearchedAlgorithms] = useState("");
  const [displayedAlgorithms, setDisplayedAlgorithms ] = useState([])

  const myCallback = (response, status) => {
    if (status === 200) {
      setAlgorithmsList(response);
      setDisplayedAlgorithms(response)
    } else {
      alert("There's something wrong with api");
    }
  };

  useEffect(() => {
    apiAlgorithmsList(myCallback);
  }, []);

  const handleSearch = (e) => {
    let currentDisplayedAlgorithms = algorithmsList.filter((algorithm) => {
      return (
        algorithm.title
          .toLowerCase()
          .indexOf(searchedAlgorithms.toLowerCase()) !== -1
      );
    });
    setDisplayedAlgorithms(currentDisplayedAlgorithms)
  }

  const updateSearch = (event) => {
    setSearchedAlgorithms(event.target.value.substr(0, 50));
  };

  return (
    <div className="container-fluid">
      <div className="row welcome text-center">
        <div className="col-12">
          <h4 className="display-4">Searching the algorithm here</h4>
        </div>
      </div>
      <div>
        <form className="form-inline justify-content-center">
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Algorithm Search"
            onChange={updateSearch.bind(this)}
            value={searchedAlgorithms}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <div>
        <AllAlgorithms displayedAlgorithms={displayedAlgorithms} />
      </div>
    </div>
  );
};

export default Search;

// export default class Search extends Component {
//   static contextType = AlgorithmContext;

//   state = {
//     search: ""
//   };

//   updateSearch(event) {
//     this.setState({ search: event.target.value.substr(0, 50) });
//   }

//   render() {
//     const { algorithms } = this.context;
//     let filteredAlgorithms = algorithms.filter(algorithm => {
//       return algorithm.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
//     });

//     return (
//       <div className="container-fluid">
//         <div className="row welcome text-center">
//           <div className="col-12">
//             <h4 className="display-4">
//               Searching the algorithm here
//             </h4>
//           </div>
//         </div>
//         <div>
//           <form className="form-inline justify-content-center" action="#">
//             <input
//               className="form-control mr-sm-2"
//               type="text"
//               placeholder="Algorithm Search"
//               onChange={this.updateSearch.bind(this)}
//               value={this.state.search}
//             />
//             <button className="btn btn-primary" type="submit">
//               Search
//             </button>
//           </form>
//         </div>
//         <div>
//           <AllAlgorithms filteredAlgorithms={filteredAlgorithms} />
//         </div>
//       </div>
//     );
//   }
// }
