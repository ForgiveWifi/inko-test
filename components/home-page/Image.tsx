
type ImageProp = {
  file: string,
  alt: string,
  width: string,
  style?: {}
}

function Image(props: ImageProp) {

  const { file, alt, width, style } = props

  const css = {
    width: width,
    ...style
  }
  return (
    <div className="flexbox radius10" style={{ boxShadow: "5px 5px #ff6a00"}}>
      <img src={file} alt={alt} style={css} className=" black-border radius10 shadow2" />
    </div>
  );
}

export default Image;