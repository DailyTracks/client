import classes from "../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.row}>
          <div className={classes.footer_col}>
            <h4>회사 정보</h4>
            <p>
              DailyTracks는 라이프 로깅으로써 일상을 기록하고 공유하는 SNS
              서비스입니다.
            </p>
          </div>
          <div className={classes.footer_col}>
            <h4>고객 지원</h4>
            <p>
              고객 지원팀은 여러분의 모든 질문과 문의사항에 대해 도와드립니다.
              질문과 문의사항이 있을 시 Github 를 통해 도와드립니다.
            </p>
          </div>
          <div className={classes.footer_col}>
            <h4>SNS 서비스</h4>
            <p>
              dailyTracks는 여러분의 소셜 미디어 생활을 더욱 풍부하게
              만들어줍니다.
            </p>
          </div>
          <div className={classes.footer_col}>
            <h4>팔로우 하기</h4>
            <div className={classes.social_links}>
              <a href="https://github.com/dailytracks">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="https://www.instagram.com/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.facebook.com/">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com/">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

// import classes from "../styles/Footer.module.css";
// import { Link } from "react-router-dom";

// function Footer() {
//   return (
//     <footer className={classes.footer}>
//       <div className={classes.container}>
//         <div className={classes.row}>
//           <div className={classes.footer_col}>
//             <h4>company</h4>
//             <ul>
//               <li>
//                 <Link to="#">about us</Link>
//               </li>
//               <li>
//                 <Link to="#">our services</Link>
//               </li>
//               <li>
//                 <Link to="#">privacy policy</Link>
//               </li>
//               <li>
//                 <Link to="#">affiliate program</Link>
//               </li>
//             </ul>
//           </div>
//           <div className={classes.footer_col}>
//             <h4>get help</h4>
//             <ul>
//               <li>
//                 <Link to="#">FAQ</Link>
//               </li>
//               <li>
//                 <Link to="#">shipping</Link>
//               </li>
//               <li>
//                 <Link to="#">returns</Link>
//               </li>
//               <li>
//                 <Link to="#">order status</Link>
//               </li>
//               <li>
//                 <Link to="#">payment options</Link>
//               </li>
//             </ul>
//           </div>
//           <div className={classes.footer_col}>
//             <h4>online shop</h4>
//             <ul>
//               <li>
//                 <Link to="#">watch</Link>
//               </li>
//               <li>
//                 <Link to="#">bag</Link>
//               </li>
//               <li>
//                 <Link to="#">shoes</Link>
//               </li>
//               <li>
//                 <Link to="#">dress</Link>
//               </li>
//             </ul>
//           </div>
//           <div className={classes.footer_col}>
//             <h4>follow us</h4>
//             <div className={classes.social_links}>
//               <Link to="#">
//                 <i className="fa-brands fa-github"></i>
//               </Link>
//               <Link to="#">
//                 <i className="fa-brands fa-instagram"></i>
//               </Link>
//               <Link to="#">
//                 <i className="fa-brands fa-facebook"></i>
//               </Link>
//               <Link to="#">
//                 <i className="fa-brands fa-twitter"></i>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
