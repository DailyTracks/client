import {
  Form,
  useNavigate,
  useNavigation,
  useLocation,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "../../styles/BoardForm.module.css";
import axios from "axios";

function BoardForm({ method, board }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const location = useLocation();
  const currentSearch = location.search;
  const { boardId } = useParams();
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
      console.log(images);
      console.log(previews);
    }
  }, [board]);

  const cancelHandler = () => {
    navigate(`..${currentSearch}`);
  };

  const addImageHandler = (event) => {
    const files = Array.from(event.target.files);

    if (images.length + files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...imagePreviews]);
    setImages((prevImages) => [...prevImages, ...files]);
    // setFileInputKey((prevKey) => prevKey + 1);
  };

  const removeImageHandler = (index) => {
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", event.target.title.value);
    // formData.append("region", event.target.region.value);
    // formData.append("region", "강원도");
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

        if (response.status === 200) {
          console.log(response.data);
          navigate(`../${response.data.id}${currentSearch}`, { replace: true });
        } else {
          console.log("Unexpected status:", response.status);
          showRegionModalAndResend();
        }
      } catch (error) {
        console.log(error);
      }
    };

    const showRegionModalAndResend = async () => {
      try {
        const region = await showRegionModal(); // Assume this shows the modal and returns the user input
        formData.append("region", region);
        await makeRequest(); // Resend the request with the updated formData
      } catch (error) {
        console.log("Failed to get region or resend request:", error);
      }
    };

    await makeRequest();
    // await axios({
    //   method: method,
    //   // url: url,
    //   url: url,
    //   data: formData,
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   withCredentials: true,
    // })
    //   .then((response) => {
    //     console.log(response.status);
    //     if (response.status === 200) {
    //       console.log(response.data);
    //       navigate(`../${response.data.id}${currentSearch}`, { replace: true });
    //       return;
    //     } else  {
    //       console.log("else");
    //       console.log(response);
    //       console.log(response.data);
    //       console.log(response.body);

    //       return;
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const showRegionModal = () => {
    return new Promise((resolve, reject) => {
      // Simulate user input for region
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
            accept="image/*"
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
      {/* <p>
        <label htmlFor="region">Region</label>
        <input
          id="region"
          type="text"
          name="region"
          required
          defaultValue={board ? board.region : ""}
        />
      </p> */}
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

        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default BoardForm;

// export async function action({ request, params }) {
//   const method = request.method;
//   const data = await request.formData();

//   const boardData = {
//     title: data.get("title"),
//     content: data.get("content"),
//     // region: data.get("region"),
//   };

//   let url = "/api/board";

//   if (method === "PUT") {
//     const boardId = params.boardId;
//     url = "/api/board/" + boardId;
//   }

//   const response = await fetch(url, {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(boardData),
//   });

//   console.log(response);

//   if (!response.ok) {
//     // throw json({ message: "Could not save board." }, { status: 500 });
//     throw new Error({ message: "Could not save board." }, { status: 500 });
//   }

//   return redirect("..");
// }

// const submitHandler = async (event) => {
//   event.preventDefault();
//   setIsSubmitting(true);

//   if (images.length < 1 || images.length > 5) {
//     alert("Please select between 1 and 5 images.");
//     setIsSubmitting(false);
//     return;
//   }

//   const formData = new FormData(event.target);

//   images.forEach((image, index) => {
//     formData.append("images", image);
//   });

//   try {
//     const response = await fetch("/your-endpoint", {
//       method: method,
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to submit form");
//     }

//     // handle successful submission
//   } catch (error) {
//     // handle error
//     console.error("Error:", error);
//   } finally {
//     setIsSubmitting(false);
//   }
// };
