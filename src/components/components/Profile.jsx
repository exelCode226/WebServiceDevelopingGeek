import React from 'react'

export default function Profile() {
    return (
    <div><ul className="nav nav-treeview">
    <li className="nav-item">
      <a href="pages/examples/login.html" className="nav-link">
        <i className="far fa-circle nav-icon" />
        <p>Login v1</p>
      </a>
    </li>
    <li className="nav-item">
      <a href="pages/examples/register.html" className="nav-link">
        <i className="far fa-circle nav-icon" />
        <p>Register v1</p>
      </a>
    </li>
    <li className="nav-item">
      <a href="pages/examples/forgot-password.html" className="nav-link">
        <i className="far fa-circle nav-icon" />
        <p>Forgot Password v1</p>
      </a>
    </li>
    <li className="nav-item">
      <a href="pages/examples/recover-password.html" className="nav-link">
        <i className="far fa-circle nav-icon" />
        <p>Recover Password v1</p>
      </a>
    </li>
  </ul>
  <li className="nav-item">
    <a href="#" className="nav-link">
      <i className="far fa-circle nav-icon" />
      <p>
        Login &amp; Register v2
        <i className="fas fa-angle-left right" />
      </p>
    </a>
    <ul className="nav nav-treeview" /></li></div>

  )
}
