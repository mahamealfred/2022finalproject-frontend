import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'

export default function Footer() {
  return (
      <>
      <div style={{textAlign:'center', marginBottom:10,height:'5v'}}>
          Quality Education for all{" "}
          <p 
          style={{cursor: "pointer"}}
          >
              Rwanda Basic Education Board
          </p>
      </div>
      </>
  )
}
