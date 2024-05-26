import classes from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.footer_col}>
            <h4>company</h4>
            <ul>
              <li>
                <a href="#">about us</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
              <li>
                <a href="#">affiliate program</a>
              </li>
            </ul>
          </div>
          <div className={classes.footer_col}>
            <h4>get help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">shipping</a>
              </li>
              <li>
                <a href="#">returns</a>
              </li>
              <li>
                <a href="#">order status</a>
              </li>
              <li>
                <a href="#">payment options</a>
              </li>
            </ul>
          </div>
          <div className={classes.footer_col}>
            <h4>online shop</h4>
            <ul>
              <li>
                <a href="#">watch</a>
              </li>
              <li>
                <a href="#">bag</a>
              </li>
              <li>
                <a href="#">shoes</a>
              </li>
              <li>
                <a href="#">dress</a>
              </li>
            </ul>
          </div>
          <div className={classes.footer_col}>
            <h4>follow us</h4>
            <div className={classes.social_links}>
              <a href="#">
                {/* <i className={classes.fab_fa_linkedin_in}></i> */}
                <i class="fa-brands fa-github"></i>
              </a>
              <a href="#">
                {/* <i className={classes.fab_fa_instagram}></i> */}
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                {/* <i className={classes.fab_fa_facebook_f}></i> */}
                <i class="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                {/* <i className={classes.fab_fa_twitter}></i> */}
                <i class="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
