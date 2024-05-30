import {
  Form,
  useNavigate,
  useNavigation,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "../../styles/BoardForm.module.css";
import axios from "axios";

function BoardForm({ method, board }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const currentSearch = location.search;
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (board) {
      const imageUrls = board.content.images;
      const fetchImages = async () => {
        const imageFiles = await Promise.all(
          imageUrls.map(async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], url.split("/").pop(), { type: blob.type });
          })
        );
        setImages(imageFiles);
        setPreviews(imageFiles.map((file) => URL.createObjectURL(file)));
      };
      fetchImages();
    }
  }, [board]);

  const cancelHandler = () => {
    navigate(`..${currentSearch}`);
  };

  const addImageHandler = (event) => {
    const files = Array.from(event.target.files);

    var fileName = document.getElementById("images").value;

    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (!(extFile === "jpg" || extFile === "jpeg")) {
      alert("Only jpg/jpeg and png files are allowed!");
      return;
    }

    if (images.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...imagePreviews]);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImageHandler = (index) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", event.target.title.value);
    formData.append("content", event.target.content.value);

    images.forEach((image, index) => {
      formData.append("images", image);
    });

    const makeRequest = async () => {
      let url = "/api/board";
      if (method === "put") {
        url += `/${board.id}`;
      }

      try {
        const response = await axios({
          method: method,
          url: url,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        console.log(response);

        if (response.status === 200) {
          window.location.href = `/board/${board.id}${currentSearch}`;
          // navigate(`../${response.data.id}${currentSearch}`, { replace: true });
        } else {
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.err_code === -1)
          await showRegionModalAndResend();
      }
    };

    const showRegionModalAndResend = async () => {
      try {
        const region = await showRegionModal();
        formData.append("region", region);
        await makeRequest();
      } catch (error) {
        console.log("Failed to get region or resend request:", error);
      }
    };

    await makeRequest();
  };

  const showRegionModal = () => {
    return new Promise((resolve, reject) => {
      const region = prompt("지역을 입력해주세요 :");
      if (region) {
        resolve(region);
      } else {
        reject("오류 발생");
      }
    });
  };

  return (
    <Form method={method} className={classes.form} onSubmit={submitHandler}>
      <div>
        {previews.length > 0 && (
          <ul className={classes.preview_list}>
            {previews.map((preview, index) => (
              <li key={index}>
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className={classes.preview_image}
                  onClick={() => removeImageHandler(index)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {previews.length < 5 && (
        <>
          <label htmlFor="images" className={classes.imageLabel}>
            <div className={classes.iFrame}>
              <i className="fa-solid fa-plus fa-3x"></i>
            </div>
          </label>
          <input
            id="images"
            className={classes.images}
            type="file"
            name="images"
            accept=".jpg, .jpeg"
            multiple
            onChange={addImageHandler}
          />
        </>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={board ? board.title : ""}
        />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows="5"
          required
          defaultValue={board ? board.content.content : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default BoardForm;
