import React, { Component } from 'react'

class SideBar extends Component {
  render() {
    return(
       <div id="sidebar-wrapper">
        <ul className="sidebar-nav">
            <li className="sidebar-brand">
                <a href="#">
                    Start Bootstrap
                </a>
            </li>
            <li>
                <a>Dashboard</a>
            </li>
            <li>
                <a>Shortcuts</a>
            </li>
            <li>
                <a>Overview</a>
            </li>
            <li>
                <a>Events</a>
            </li>
            <li>
                <a>About</a>
            </li>
            <li>
                <a>Services</a>
            </li>
            <li>
                <a>Contact</a>
            </li>
        </ul>
    </div>
    )
  }
}

export default SideBar