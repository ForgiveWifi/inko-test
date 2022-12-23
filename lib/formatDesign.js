function formatDesign(design) {
  const {placement, width, height, x_offset, y_offset} = design
  
  const center = (320 - width) / 2
  const left = x_offset < (320 - width) / 4
  const right = x_offset > (320 - width) / 4 * 3
  const back = placement === "back"

  return ({
    ...design,
    placement: back ? "Back Center" : left ? "Front Left Chest" : right ? "Front Right Chest" : "Front Center",
    width: +(width / 20).toFixed(1),
    height: +(height / 20).toFixed(1), 
    x_offset: back ? Math.round((x_offset - center) * 1.27) : left ?  Math.round(x_offset * 1.27) : right ? (Math.round((-320 + x_offset + width) * 1.27)) : Math.round((x_offset - center) * 1.27),
    y_offset: y_offset === 0 ? 0 : (Math.round(y_offset * 1.27)),
  });
}
 
export default formatDesign;