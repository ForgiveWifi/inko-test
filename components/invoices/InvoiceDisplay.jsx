import { toTime, toDate } from "../../lib/time";
import Divider from "../ui/Divider";
import HorzDivider from "../ui/HorzDivider";
import Lines from "./Lines";
import StatusBox from "./StatusBox";
import toDollars from "../../lib/toDollars";
import InvoiceButtons from "./InvoiceButtons";
import ShippingDisplay from "./ShippingDisplay";

function InvoiceDisplay({invoice}) {
  if (!invoice) {
    return(
      null
    )
  }
  const {id, status, created, due_date, amount_due, lines, customer_shipping, hosted_invoice_url} = invoice
  return (
    <>
      <div className="flexbox-column full-width" style={{ marginTop: 10, padding: 30}}>
        <div className="flexbox-row full-width" style={{ margin: "5px 0px", gap: 15}}>
          <StatusBox status={status} />
        </div>
        <div className="flexbox-row full-width">
          <h2>{id}</h2>
        </div>

        {/* <div className="flexbox-row full-width flex-wrap">
          <div style={{width: 100}}>created:</div>
          <div className="flexbox-row">
            <h5>{toDate(created * 1000, "short")}</h5>
            <Divider />
            <h5>{toTime(created * 1000)}</h5>
          </div>
        </div> */}

        <div className="flexbox-row full-width flex-wrap">
          <div style={{width: 100}}>due date:</div>
          <div className="flexbox-row">
            <h5>{toDate(due_date * 1000, "short")}</h5>
            <Divider />
            <h5>{toTime(due_date * 1000)}</h5>
          </div>
        </div>

        <div className="flexbox-row space-between full-width flex-wrap" style={{ margin: "6px 0px 10px"}}>
          <h3>{toDollars(amount_due)}</h3>
          <InvoiceButtons status={status} url={hosted_invoice_url}/>
        </div>

        <HorzDivider />
 
        <Lines lines={lines} />

        <div className="flexbox-column" style={{margin: "10px 22px 0px auto"}}>
          <h5 className="margin-left">Total:</h5>
          <h5>{toDollars(amount_due)}</h5>
        </div>

        <ShippingDisplay customerShipping={customer_shipping} />
      </div>
    </>
  );
}

export default InvoiceDisplay;