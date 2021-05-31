import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

class App extends React.Component {
  state = {
    artlist: [],
    loading: false,
  };

  search = async (val) => {
    this.setState({ loading: true });
    const res = await itunesApiRequest(val);
    const artlist = await res.results;

    this.setState({ artlist, loading: false });
  };

  onChangeHandler = async (e) => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <Container fluid>
        <div>
          <input
            value={this.state.value}
            onChange={(e) => this.onChangeHandler(e)}
            placeholder="Type something to search"
          />
          <h2 className="text-center">Artist List</h2>
          <br></br>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th> Image</th>
                  <th> Kind</th>
                  <th> Artist Name</th>
                  <th> Collection Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.artlist.map((art) => (
                  <tr key={art.collectionId}>
                    <td><img src={art.artworkUrl100} alt={art.artworkUrl100} key={art.artworkUrl100} /></td>
                    <td> {art.primaryGenreName}</td>
                    <td> {art.artistName} </td>
                    <td> {art.collectionName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    );
  }
}

export default App;

export async function itunesApiRequest(term) {
  const url = new URL("https://itunes.apple.com/search");
  const params = {
    limit: 50,
    term,
  };
  try {
    url.search = new URLSearchParams(params);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
