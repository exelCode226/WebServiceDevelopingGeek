import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Footer() {
  const { isAuthenticated } = useAuth()


  if (isAuthenticated) {
    return (
      <footer className="main-footer fixed-bottom">
        <strong><button>Desarrollado por Developing Geek</button></strong>
        <div className="float-right d-none d-sm-inline-block">
          <b>Versión 5.0|</b>
        </div>
      </footer>

    )
  } else {
    return null;
  }
}
