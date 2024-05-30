import axios from "axios";
import { useEffect, useState } from "react";
import classes from "../../styles/UserWrite.module.css";
import "../../styles/Modal.css";
import SwiperImage from "../../components/SwiperImage";
import { motion, AnimatePresence } from "framer-motion";

function UserWrite() {
  const [writtenBoard, setWrittenBoard] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedContent, setSelectedContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const id = JSON.parse(sessionStorage.getItem("user")).id;

  useEffect(() => {
    axios
      .get(`/api/user/${id}/written_board`, { withCredentials: true })
      .then((response) => {
        setWrittenBoard(response.data);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, []);

  // 모달 열기
  const openModal = (board, contentData) => {
    setSelectedBoard(board);
    setSelectedContent(contentData);
    setIsOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedBoard("");
    setSelectedContent("");
    setIsOpen(false);
  };

  // 모달 바깥 클릭 시 모달 닫기
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div>
      {writtenBoard && (
        <ul
          style={{ width: "100%", justifyContent: "center", display: "grid" }}
        >
          {writtenBoard.map((board) => {
            const contentData = JSON.parse(board.content);
            return (
              <li
                key={board.id}
                className={classes.board}
                onClick={() => openModal(board, contentData)}
              >
                <div>
                  <p className={classes.title}>{board.title}</p>
                  <p className={classes.content}>{contentData.content}</p>
                  <p className={classes.createdAt}>{board.createdAt}</p>
                </div>

                <img
                  src={contentData.images[0]}
                  alt={contentData.images[0]}
                  className={classes.image}
                />
              </li>
            );
          })}
        </ul>
      )}
      {!writtenBoard && <p>여행일지를 작성해서 남들과 공유해 보아요!</p>}
      <AnimatePresence>
        {isOpen && (
          <div className="modal-overlay" onClick={handleOutsideClick}>
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                duration: "0.3",
              }}
            >
              <div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0 1rem",
                      paddingBottom: "5px",
                      borderBottom: "2px solid black",
                    }}
                  >
                    <div>
                      <p className={classes.title}>
                        제목: {selectedBoard.title}
                      </p>
                    </div>
                  </div>
                  {selectedContent.images && (
                    <SwiperImage data={selectedContent.images} />
                  )}
                  <p className={classes.content}>{selectedContent.content}</p>
                </div>
              </div>
              <button onClick={closeModal}>닫기</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserWrite;
