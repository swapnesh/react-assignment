import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoaded: false,
      repoData: {},
      issueList: []
    }
  }
  componentDidMount() {
    fetch("https://api.github.com/repos/facebook/react")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            repoData: result
          })

          fetch('https://api.github.com/repos/facebook/react/issues')
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  issueList: result
                })
              }
            )
        }
      )
  }
  render() {
    const { isLoaded, repoData, issueList } = this.state
    console.clear()
    console.log(issueList)
    if (!isLoaded) {
      return <div>Loading.....................</div>;
    } else {
      return (
        <div className="App container-lg clearfix px-3 mt-4">
          <div className="h-card col-3 float-left pr-3">
            <a href={repoData.html_url} className="u-photo d-block tooltipped tooltipped-s" aria-label={repoData.full_name}>
              <img className="avatar" src={repoData.owner.avatar_url} alt="jonrohan" width="150" height="150" />
            </a>
            <div className="vcard-names-container py-3">
              <h1 className="vcard-names">
                <span className="p-name vcard-fullname d-block overflow-hidden">{repoData.full_name}</span>
              </h1>
              <p>{repoData.description}</p>
            </div>
          </div>
          <div className="col-9 float-left pl-2">
            <nav className="UnderlineNav UnderlineNav--full" aria-label="Foo bar">
              <div className="container-lg UnderlineNav-container">
                <div className="UnderlineNav-body">
                  <a className="UnderlineNav-item">Issues
                    <span className="Counter">{repoData.open_issues_count}</span>
                  </a>
                </div>
              </div>
            </nav>
            <div className="mt-4">
              <div className="Box">
                <ul>
                  {issueList.map(item => (
                    <li key={item.id} className="Box-row">{item.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default App;
