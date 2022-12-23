import { Carousel } from '@mantine/carousel'
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr"

function ProductCarousel({images, name, setCurrentSlide}) {
  if (images.length > 1) {
  return (
    <>
      <div style={{ maxWidth: 500}}>
        <Carousel 
          sx={{width: "100%"}} 
          slideSize="100%" 
          height="100%" 
          withIndicators 
          loop={true}
          nextControlIcon={<GrFormNextLink />}
          previousControlIcon={<GrFormPreviousLink/>}
          onSlideChange={e => setCurrentSlide(e)}>
          {
            images.map((image, i) => {
              return(
                <img key={i} src={image} alt={name} className="full-width radius10" style={{ maxWidth: 500 }} draggable={false}/>
              )
            })
          }
        </Carousel>
      </div>
    </>
  );
  } else {
  return(
    <>
      <img src={images[0]} alt={name} className="full-width radius10" style={{ maxWidth: 500 }} />
    </>
  )}
}

export default ProductCarousel;