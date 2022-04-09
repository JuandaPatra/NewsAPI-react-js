import "./App.css";
import { Card, Container, Badge, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


const App = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://newsapi.org/v2/top-headlines?country=id&apiKey=insert_your_key_from_NewsAPI`)
      .then((res) => {
        setNews(res.data.articles);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  const category=(cate)=>{
    setLoading(true)
    axios.get(`https://newsapi.org/v2/top-headlines?country=id&category=${cate}&apiKey=insert_your_key_from_NewsAPI`)
    .then((res) => {
      setNews(res.data.articles);
      setLoading(false);
    })
    .catch((err) => {
      // alert(err)
      setError(true);
    });
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center">
        <h1>Error Fetching Data...</h1>
      </div>
    );
  }
  return (
    <div className="App">
      {loading ? (
        <div className="d-flex justify-content-center vertical-align" style={{ height: "100%" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="d-flex justify-content-center mt-3">
            <h1>News App</h1>
          </div>

          <Container>
            <div className="d-flex">
              <Badge bg="primary" onClick={()=>category("business")} className="category">Business</Badge>
              <Badge bg="secondary" onClick={()=>category("entertainment")} className="category">Entertainment</Badge>
              <Badge bg="success" onClick={()=>category("general")} className="category">General</Badge>
              <Badge bg="danger" onClick={()=>category("sport")} className="category">Sport</Badge>
            </div>
          </Container>

          <Card>
            <Container>
              <div className="d-flex justify-content-between flex-wrap ">
                {news.map((item, index) => {
                  return (
                    <Card style={{ width: "18rem" }} className="mb-2 me-2 mt-2 ms-2" key={index}>
                      {/* <Card.Img variant="top" src={item.urlToImage} /> */}
                      <LazyLoadImage alt={item.title} effect="blur" src={item.urlToImage} width="100%" height="300px" />
                      <Card.Body>
                        <div className="d-flex justify-content-start mb-3">
                          <Badge bg="success">Author : {item.author}</Badge>
                        </div>
                        <Card.Title style={{ textAlign: "justify" }}>{item.title}</Card.Title>
                        <Card.Text className="mb-3" style={{ textAlign: "justify" }}>
                          {item.description}
                        </Card.Text>
                      </Card.Body>
                      <div className="d-flex justify-content-center" style={{ marginBottom: "10px" }}>
                        <a href={item.url} className="btn btn-success">
                          Selengkapnya...
                        </a>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Container>
          </Card>
        </>
      )}
    </div>
  );
};

export default App;
