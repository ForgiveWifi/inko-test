import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import InvoicesHeading from "../../components/invoices/InvoicesHeading"
import InvoiceList from "../../components/invoices/InvoiceList"
import InvoiceDisplay from '../../components/invoices/InvoiceDisplay';
import { useState, useEffect } from 'react';
import { showError } from '../../components/ui/alerts';
import { Button, Modal } from '@mantine/core';
import CloseButton from '../../components/ui/CloseButton';
import Heading from '../../components/ui/Heading';
import MyModal from '../../components/ui/MyModal';

function Invoices() {

  const [selected, setSelected] = useState(null)
  const [invoices, setInvoices] = useState(null)
  const [currentPage, setPage] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    fetchInvoices() 
    async function fetchInvoices() {
      try {
        setLoading(true)
        const {data} = await axios.get(`${process.env.API_URL}/invoices`) //?page=${page}&limit=15
        setInvoices(data.data) 
        // setPage(parseInt(page))
        setTotalPages(10)
        setLoading(false)
      }
      catch (err) {
        console.log(err)
        showError("invoices", "Server error - invoices", "Contact us!") 
      }
    }
  }, [currentPage])

  const modal = selected !== null
  return (
    <>
      <MyModal open={modal}>
        {
          modal ? 
          <>
            <CloseButton onClick={() => setSelected(null)} />
            <InvoiceDisplay invoice={invoices[selected]}/>
          </> :
          null
        }
      </MyModal>
      <Heading text="Invoices" />
      <InvoicesHeading />
      <InvoiceList loading={loading} invoices={invoices} setSelected={setSelected}/>
      {/* <MyPagination loading={loading} currentPage={currentPage} totalPages={totalPages} setPageNumber={setPageNumber} /> */}
    </>
  );
}

export default withPageAuthRequired(Invoices)
