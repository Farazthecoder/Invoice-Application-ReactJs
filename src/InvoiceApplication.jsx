import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import { myContext } from './App';
import html2canvas from "html2canvas";
import jsPDF from 'jspdf';

// for downloading the pdf we have to download two modules which are html2canvas jspdf

//  as we handle all the things in a single state on onchange event so we have to make an object related with the name attribute.

function InvoiceApplication() {

  const { currency, tax } = useContext(myContext)

  const [invoice, setInvoice] = useState("")

  const [data, setData] = useState({
    cname: "",
    pname: "",
    pqty: "",
    pprice: ""
  })

  function handleInvoice(e) {
    setInvoice(e.target.value)
  }

  function collectData(e) {
    let enteredName = e.target.name;
    let enteredValue = e.target.value;

    // It concludes that if their is anything in the entervalue than only this logic will work otherwise not.

    if (enteredValue) {
      setData({ ...data, [enteredName]: enteredValue }) //we can also do this by if and else condition
    }
  }

  function getPdf(){
   const imageContainer = document.getElementById("image-container");
   
   html2canvas(imageContainer).then((data)=>{

      //  now what is in data we have to convert it in the form of image
      const imageData = data.toDataURL("img/png")

      const document = new jsPDF("l","px","a4")

      const  width = document.internal.pageSize.width
      const  height = document.internal.pageSize.height


      document.addImage(imageData,"png",0,-10,width,height)
      document.save("invoice.pdf")

   }).catch((err)=>{
    alert(err)
   })
  }

  return (
    <>
      <div className='flex gap-2 flex-col ' >
        <h1 className='text-3xl  text-cyan-700 font-semibold bg-teal-200 p-1 font-serif rounded-xl '>Invoice Application</h1>
        <h3 className='text-xl text-cyan-500 font-semibold'>Date : {new Date().toLocaleString()}</h3>
        <h3 className='text-xl text-cyan-500 font-semibold' >Invoice No. : <input type="number" onChange={handleInvoice} className="block w-20 mx-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 "/></h3>

        <div>
          <label className='text-xl text-cyan-500 font-semibold' htmlFor="customer">Customer Name:</label>
          <input type="text" id='customer' name='cname' onChange={collectData} className="block w-50 mx-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />

          <label className='text-xl text-cyan-500 font-semibold' htmlFor="productName">Product Name:</label>
          <input type="text" id='productName' name='pname' onChange={collectData} className="block w-50 mx-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />

          <label className='text-xl text-cyan-500 font-semibold' htmlFor="productQty">Product Qty:</label>
          <input type="text" id='productQty' name='pqty' onChange={collectData} className="block w-50 mx-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />

          <label className='text-xl text-cyan-500 font-semibold' htmlFor="productPrice">Product Price:</label>
          <input type="text" id='productPrice' name='pprice' onChange={collectData} className="block w-50 mx-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />

          <label className='text-xl text-cyan-500 font-semibold' htmlFor="productPrice">Currency:</label>
          <input type="text" id='productPrice' name='pprice' value={currency} onChange={collectData} className="block w-50 mx-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />

          <label className='text-xl text-cyan-500 font-semibold' htmlFor="productPrice">Tax:</label>
          <input type="text" id='productPrice' name='pprice' value={tax} onChange={collectData} className="block w-50 mx-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6" />
        </div>

        <div className=' text-3xl bg-teal-50 text-teal-700 border-solid border-2 border-teal-500 rounded-2xl pt-2 pb-2 flex gap-2 flex-col' id='image-container'>
          <h1>Invoice Number : <span className='text-2xl font-sans font-bold'>{invoice}</span> </h1>
          <h1>Customer Name : <span className='text-2xl font-sans font-bold'>{data.cname}</span> </h1>
          <h1>Product Name : <span className='text-2xl font-sans font-bold'>{data.pname}</span></h1>
          <h1>Product QTY : <span className='text-2xl font-sans font-bold'>{data.pqty}</span></h1>
          <h1>Product Price : <span className='text-2xl font-sans font-bold'>{data.pprice}</span></h1>
          <h1>Currency : <span className='text-2xl font-sans font-bold'>{currency}</span></h1>
          <h1>Tax : <span className='text-2xl font-sans font-bold'>{data.pprice * 0.18}</span></h1>
          <h1>Total Cost : <span className='text-2xl font-sans font-bold'>{data.pprice * 0.18 + Number(data.pprice)}</span></h1>
        </div>

        <button onClick={getPdf} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
          <span>Download</span>
        </button>
      </div>
    </>
  )
}

export default InvoiceApplication