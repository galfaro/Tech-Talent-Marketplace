import React, { useState } from "react";
import { useDispatch } from "react-redux";
import add from "../../reducers/add";

import { API_URL } from "../../utils/constants";

import swal from "sweetalert";

const DeleteAdd = ({ myAddsId }) => {
  const [setDeleteAnAdd] = useState({});
  const dispatch = useDispatch();

  const onDeleteClick = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this add!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const options = {
          method: "DELETE",
          headers: {
            // Authorization: accessToken,
          },
        };
        fetch(API_URL(`adds/${myAddsId}/delete`), options).then(() => {
          dispatch(add.actions.deleteAdd(myAddsId));
        });

        swal("Poof! Your add has been deleted!", {
          icon: "success",
        });

        // window.location.reload(true);
      } else {
        swal("Your add is safe!");
      }
    });
  };

  return <button onClick={onDeleteClick}>Delete Add</button>;
};

export default DeleteAdd;
