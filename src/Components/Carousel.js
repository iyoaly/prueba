import { Carousel } from "react-bootstrap";

function Slide({ host }) {
  return (
    host.imagenes && (
      <Carousel>
        {host.imagenes.map((image, index) => (
          <Carousel.Item key={image.path + index}>
            <img
              className="d-block w-100"
              src={image.path}
              alt={image.nombre}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src =
                  "https://noktosalmacen.blob.core.windows.net/img/Extended-Suites-Habitacion-sencilla-vista-frontal.jpg";
              }}
            />
            <Carousel.Caption>
              <h3>{image.nombre}</h3>
              <p>{image.created_at}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    )
  );
}

export default Slide;
