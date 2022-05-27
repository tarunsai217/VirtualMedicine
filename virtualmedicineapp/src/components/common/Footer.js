import React from "react";

export default function Footer() {
  return (
    <React.Fragment>
      <footer
        id="sticky-footer"
        className="flex-shrink-0 py-4 bg-dark text-white-50 footerStyling"
      >
        <div className="container text-center">
          <small>Copyright &copy; This is our Demo Website</small>
        </div>
      </footer>
    </React.Fragment>
  );
}
