import React, { useRef, useState } from "react";
import { Col, Row, Card } from "@themesberg/react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatarApi } from "../../../redux/slices/userSlice";

export const ProfileCardWidget = () => {
  const userLogin = JSON.parse(localStorage.getItem("currentUser"));
  const imgReview = useRef(null);
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState();

  const showImgProduct = (fileToLoad) => {
    let fileReader = new FileReader();
    fileReader.onload = function (fileLoadEvent) {
      let srcData = fileLoadEvent.target.result;
      imgReview.current.src = srcData;
    };

    // Đọc thông tin tập tin đã được đăng tải
    fileReader.readAsDataURL(fileToLoad);
  };

  const cancelAvatar = (e) => {
    e.preventDefault();
    imgReview.current.src = userLogin.avatar;
    setAvatar("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);
    toast.success("Avatar saved successfully!");
    await dispatch(uploadAvatarApi(userLogin.id, formData));
    setAvatar("");
  };

  const styleRef = {
    label: {
      display: avatar ? "none" : "block",
    },
    button: {
      display: avatar ? "block" : "none",
    },
  };

  return (
    <Card border="light" className="card__avatar text-center p-0 mb-4">
      <div
        style={{ backgroundImage: `url(./img/profile-cover.jpg)` }}
        className="profile-cover rounded-top"
      />
      <Card.Body className="pb-5 card_profile">
        <Card.Img
          src={userLogin.avatar}
          alt="Neil Portrait"
          ref={imgReview}
          className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-2"
        />

        <Card.Title>{userLogin.user_name}</Card.Title>
      </Card.Body>

      <form className="form__upload" onSubmit={handleSubmit}>
        <input
          type="file"
          id="upload"
          accept=".jpg, .png"
          hidden
          name="avatar"
          // value={avatar}
          onChange={(event) => {
            const fileLoad = event.currentTarget.files[0];
            showImgProduct(fileLoad);
            setAvatar(fileLoad);
          }}
        />
        <label id="label__avatar" htmlFor="upload" style={styleRef.label}>
          Edit Avatar
        </label>

        <div className="container__button" style={styleRef.button}>
          <button className="btn btn-secondary" onClick={cancelAvatar}>
            Cancel
          </button>
          <button type="submit" className="btn btn-success ml-2">
            Save
          </button>
        </div>
      </form>
    </Card>
  );
};

export const CardWidget = (props) => {
  const { title, value } = props;

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body>
        <Row className="d-block d-flex align-items-center text-center">
          <Col xs={12} xl={12} className="px-xl-0">
            <div className="d-none d-sm-block">
              <h5>{title}</h5>
              <h3 className="mb-1">{value}</h3>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
