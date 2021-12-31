import Select from "react-select";
import "./MemberItem.css";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import MoviesWatched from "./MoviesWatched";
import Restricted from "../../shared/permissions/Restricted";
import PermissionProvider from "../../shared/permissions/providers/permission-provider";
import axios from "axios";

const MemberItem = ({ member, onDelete }) => {
  const { isLoading, error,sendRequest, clearError } = useHttpClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [onAddMovieMode, setOnAddMovieMode] = useState(false);
  const [loadedWatched, setLoadedWatched] = useState([]);
  const [noWatchedMovies, setNoWatchedMovies] = useState([]);
  const [valueMovieToAdd, setValueMovieToAdd] = useState("");
  const [valueDateMovieToAdd, setValueDateMovieToAdd] = useState(null);
  const [subscriptionsId, setSubscriptionsId] = useState(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const auth = useContext(AuthContext);


  const changeKeyObjects = (arr, replaceKeys) => {
    return arr.map((item) => {
      const newItem = {};
      Object.keys(item).forEach((key) => {
        newItem[replaceKeys[key]] = item[[key]];
      });
      return newItem;
    });
  };

  useEffect(() => {

    const source = axios.CancelToken.source()
    const fetchMoviesWatchedByMember = async () => {
      try {
        let response_1 = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/subscriptions/by-member/${member._id}`, {
          cancelToken: source.token,
        })
        setLoadedWatched(response_1.data);

        if (Array.isArray(response_1.data)) {
           let response_2 = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`, {
            cancelToken: source.token,
          })

          let arrayOfMoviesMemberWereWatched = response_1.data.map(
              (movie) => movie._id
          );
          response_2.data = response_2.data.filter((m) =>
              arrayOfMoviesMemberWereWatched.includes(m._id) ? "" : m
          );
          const replaceKeys = {
            name: "label",
            _id: "_id",
            premiered: "premiered",
          };
          const newArray = changeKeyObjects(response_2.data, replaceKeys);
          newArray.forEach((f) => delete f.undefined);
          setNoWatchedMovies(newArray);
        } else {
          let response_2 = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/movies`, {
            cancelToken: source.token,
          })
          const replaceKeys = {
            name: "label",
            _id: "_id",
            premiered: "premiered",
          };
          const newArray = changeKeyObjects(response_2.data, replaceKeys);
          newArray.forEach((f) => delete f.undefined);
          setNoWatchedMovies(newArray);
        }

        const response_3 = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/subscriptions/get-subscriber-by-id/${member._id}`, {
          cancelToken: source.token,
        })

        if(response_3.data.length > 0) {
          setSubscriptionsId(response_3.data[0]._id);
          console.log(response_3);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          throw error
        }
      }
    }
    fetchMoviesWatchedByMember();
    return () => {
      source.cancel()
    }

  }, [sendRequest,shouldRefresh, member._id]);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log(member);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/members/${member._id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      onDelete(member._id);
    } catch (err) {}
  };

  const handleChange = (changeValue) => {
    setValueMovieToAdd(changeValue);
    console.log(changeValue);
  };

  const handleDateOnChange = (event) => {
    setValueDateMovieToAdd(event.target.value);
  };

  const handleSubmit = async (e) => {
    let response_1;
    if (valueMovieToAdd) {
      try {
          if(!valueDateMovieToAdd){
            setShowErrorModal(true);
            return;
          }

          if(subscriptionsId === null) {

             response_1 = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/subscriptions/`, {
              memberId: member._id,
              movies: []
            },  {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              }
            });
            setSubscriptionsId(response_1.data._id);
          }

        await axios.put(`${process.env.REACT_APP_BACKEND_URL}/add/movie/subscriptions/${subscriptionsId || response_1.data._id}`, {
          movieId: valueMovieToAdd._id,
          date: valueDateMovieToAdd,
        },  {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          }
        });
        setValueDateMovieToAdd("");
        setValueMovieToAdd("");

        setShouldRefresh(!shouldRefresh);
        return

      } catch (err) {
        console.log(err);
      }
    }
  };


  const customStyles = {
    menuList: (styles) => ({
      ...styles,
      background: "papayawhip",
    }),
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      background: isFocused
        ? "hsla(88,64%,42%,0.5)"
        : isSelected
        ? "hsl(0,6%,7%)"
        : undefined,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 100,
    }),
  };


  const clearErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <>
      <Modal
          onCancel={clearErrorModal}
          header="Please insert a valid date."
          show={!!showErrorModal}
          footer={<Button onClick={clearErrorModal}>Okay</Button>}
      >
        <p>Please insert a valid date</p>
      </Modal>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="member-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>Do you want to proceed and delete this member? </p>
      </Modal>
      <div className="member-item">
        <Card className="member-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="member-item__info">
            <h2>
              <i>{member.name}</i>{" "}
            </h2>
          </div>
          <div className="member-item__info">
            <h3>Email: </h3>
            <span> {member.email}</span>
          </div>
          <div className="member-item__info">
            <h3>City: </h3>
            <span>{member.city}</span>
          </div>
          <div className="movie-item__info">
            <h2>Movies Watched</h2>
            <Button inverse onClick={() => setOnAddMovieMode(!onAddMovieMode)}>
              Subscribe to new movie
            </Button>
            <br />
            <br />
            {onAddMovieMode && (
              <>
                <h4>Add a new movie</h4>
                <div style={{ width: "30%" }}>
                  <Select
                    menuColor="red"
                    options={noWatchedMovies}
                    value={valueMovieToAdd}
                    styles={customStyles}
                    onChange={handleChange}
                  />
                  <br />
                  <label htmlFor="date">Date: </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={valueDateMovieToAdd || ""}
                    onChange={handleDateOnChange}
                  />
                </div>
                <Button onClick={handleSubmit}>Subscribe</Button>
                <br />
                <br />
              </>
            )}
          </div>
          {loadedWatched && Array.isArray(loadedWatched) && (
            <div>
              <ul className="movie-item__content">
                {loadedWatched.map((movieWatched) => (
                  <MoviesWatched
                    key={movieWatched._id}
                    movieWatched={movieWatched}
                  />
                ))}
              </ul>
            </div>
          )}
          <PermissionProvider permissions={auth.permissions}>
          <div className="center">
            <Restricted to="Update Subscriptions">
            <Button to={`/members/${member._id}`}>EDIT</Button>
            </Restricted>
            <Restricted to="Delete Subscriptions">
            <Button danger onClick={showDeleteWarningHandler}>
              DELETE
            </Button>
            </Restricted>
          </div>
          </PermissionProvider>
        </Card>
      </div>
    </>
  );
};

export default MemberItem;
