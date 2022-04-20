import { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { url, fetchApi } from "./api.js";
import Slide from "./Components/Carousel.js";

function Home(props) {
  const [hosts, setHosts] = useState([]);
  const [index, setIndex] = useState("0");
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchApi(url + "/admin/hosts/50", "GET", {
        Authorization: "Bearer " + localStorage.getItem("token"),
      });

      const data = await response.json();
      setHosts(data.host);
    }
    fetchData();
  }, []);

  function handleClick(e, index) {
    setIndex(index);
    setFullscreen(true);
    setShow(true);
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Calificación</th>
            <th>Nombre</th>
            <th>Direccion </th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {hosts.map((host, index) => (
            <tr key={host.nombre + index}>
              <td>{host.id}</td>
              <td>{host.calificacion}</td>
              <td>{host.nombre}</td>
              <td>{host.direccion}</td>
              <td>
                <Button variant="info" onClick={(e) => handleClick(e, index)}>
                  Info
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Slide host={hosts[index]} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
