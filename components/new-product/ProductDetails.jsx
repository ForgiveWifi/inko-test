import { NumberInput, TextInput } from "@mantine/core";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function ProductDetails({details, setDetails, error}) {
  return (
    <>
      <div className="flexbox-start full-width">
        <TextInput 
          label="product name"
          value={details.name}
          onChange={e => setDetails({...details, name: e.currentTarget.value})}
          error={error && !details.name}
          autoComplete="off"
        />
        <TextInput 
          label="description"
          value={details.description}
          onChange={e => setDetails({...details, description: e.currentTarget.value})}
          autoComplete="off"
          placeholder="Optional"
          className="full-width"
        />
        {/* <NumberInput 
          label="Price"
          value={details.price}
          onChange={v => setDetails({...details, price: v})}
          error={error && !details.price}
          icon={<AttachMoneyIcon style={{ fill: "rgba(0, 0, 0, 0.6 )", marginLeft: "5px"}}/>}
          iconWidth={25}
          min={0}
          precision={2}
          hideControls
        /> */}
      </div>
    </>
  );
}

export default ProductDetails;