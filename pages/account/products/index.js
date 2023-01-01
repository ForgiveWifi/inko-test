import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { useEffect, useState } from "react";
import axios from "axios";
import { showError } from "../../../components/ui/alerts";
import MyPagination from "../../../components/ui/MyPagination";
import AddIcon from '@mui/icons-material/Add';
import ProductList from "../../../components/products/ProductList";
import Loading from "../../../components/ui/Loading";
import ProductDisplay from '../../../components/products/ProductDisplay';
import CloseButton from '../../../components/ui/CloseButton';
import { useRouter } from 'next/router';
import Heading from '../../../components/ui/Heading';
import MyModal from '../../../components/ui/MyModal';

function Products() {

  const router = useRouter()
  const [selected, setSelected] = useState(null)
  const [products, setProducts] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`) //?page=${page}&limit=18
        setProducts(data.data) 
        // setCurrentPage(parseInt(page))
        setTotalPages(data.pages)
        setLoading(false)
      }
      catch (err) {
        showError("design-error", "Server error: products", "Contact us!") 
      }
    }
    fetchProducts()
  }, [currentPage])

  function setPageNumber(page) {
    setCurrentPage(page)
  }

  const modal = selected !== null
  return (
    <>
      { loading && <Loading /> }
      <MyModal open={modal}>
        {
          modal ?
          <>
            <CloseButton onClick={() => setSelected(null)} />
            <ProductDisplay loading={false} product={products[selected]} />
          </> :
          null
        }
      </MyModal>
      <Heading text="Products" />
      <ProductList products={products} setSelected={setSelected}/>
      {/* <MyPagination loading={loading} currentPage={currentPage} setPageNumber={setPageNumber} totalPages={totalPages}  /> */}
    </>
  );
}

export default withPageAuthRequired(Products)
