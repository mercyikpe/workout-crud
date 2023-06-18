import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDeleteClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };

  // const handleEditClick = async () => {
  //   const response = await fetch("/api/" + workout._id, {
  //     method: "EDIT",
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     dispatch({ type: "Edit_WORKOUT", payload: json });
  //   }
  // };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>

      <div className="actions-btns">
        {/* <span
          className="material-symbols-outlined edit"
          onClick={handleEditClick}
        >
          edit
        </span> */}
        <span className="material-symbols-outlined" onClick={handleDeleteClick}>
          delete
        </span>
      </div>
    </div>
  );
};

export default WorkoutDetails;
