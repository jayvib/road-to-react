import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/js/redux",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: "Golang",
    url: "https://github.com/go",
    author: "Rob Pike",
    num_comments: 2,
    points: 10,
    objectID: 4,
  }
];

const names = [ "Luffy", "Nami", "Sanji", "Zoro" ];

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'http://127.0.0.1:8083';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

console.log(url);

const isSearched = searchTerm =>
  (item) => !searchTerm ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component{

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this);
    this.fetchSearchTopstories = this.fetchSearchTopstories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  setSearchTopstories(result) {
    this.setState({result});
  }

  fetchSearchTopstories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }

  componentDidMount() {
    const { searchTerm }  = this.state;
    this.fetchSearchTopstories(searchTerm);
  }

  onDismiss(objectID) {
    const updateList = this.state.list.filter(item => item.objectID !== objectID);
    this.setState({list: updateList});
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  // Using Destructuring
  render() {
    const { searchTerm, result } = this.state;
    if (!result) { return null; }
    console.log(result);
    return (
      <div className="page">
        <div className="interactions">
          <Search // Search component
            value={searchTerm} // Latest search value
            onChange={this.onSearchChange} // Handler for the onChange event in the input tag
          >
            Search
          </Search>
        </div>
        <Table // Table Component
          searchTerm={searchTerm} // Current searchTerm
          list={result.hits} // Latest list
          onDismiss={this.onDismiss} // Handler for click event
        />
      </div>
    );
  }
}

class SearchHeader extends Component {
  render() {
    return(
      <span>Search</span>
    )
  }
}

class HelloList extends Component {
  render() {
    const { names } = this.props;
    return(
      <div className="hello">
        {names.map((name, i) => <Hello key={i} name={name}/>)}
      </div>
    )
  }
}

class Hello extends Component {
  render() {
    const { name } = this.props;
    return (
      <h1>Hello {name}</h1>
    )
  }
}

const largeColumn = {
  width: '40%'
};

const midColumn = {
  width: '30%'
};

const smallColumn = {
  width: '10%'
};

const Table = ({searchTerm, list, onDismiss }) =>
    <div className='table'>
      { list.filter(isSearched(searchTerm)).map(item =>
        <div key={item.objectID} className='table-row'>
          <span style={largeColumn}>
            <a href={item.url} target='_blank'>{item.title}</a>
          </span>
          <span style={midColumn}>{item.author} </span>
          <span style={smallColumn}>{item.num_comments} </span>
          <span style={smallColumn}>{item.points} </span>
          <span style={smallColumn}>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className='button-inline'
            >
              Dismiss
            </Button>
          </span>
        </div>
      )}
    </div>;

const Button = ({onClick, className='', children}) =>
  <button
    onClick={onClick}
    className={className}
    type='button'
  >
    {children}
  </button>;

const Search = ({ value, onChange, children }) =>
  <form>{children}
    <input
      type='text'
      value={value}
      onChange={onChange}
    />
  </form>;

export default App;
