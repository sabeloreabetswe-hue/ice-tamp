const USERS_KEY = "tamp_users";

export {
  getUsers,
  saveUsers,
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  isAuthenticated,
} from "./authService";

export const updateUser = (updatedUser) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.email === updatedUser.email
      ? {
          ...user,
          ...updatedUser,
        }
      : user
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return updatedUser;
};

export const suspendUser = (email) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.email === email
      ? {
          ...user,
          status: "Suspended",
        }
      : user
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

export const activateUser = (email) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.email === email
      ? {
          ...user,
          status: "Active",
        }
      : user
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

export const deleteUser = (email) => {
  const users = getUsers();

  const updatedUsers = users.filter(
    (user) => user.email !== email
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

export const verifyUser = (email) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.email === email
      ? {
          ...user,
          verification: "Verified",
        }
      : user
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return updatedUsers;
};

export const rejectVerification = (email) => {
  const users = getUsers();

  const updatedUsers = users.map((user) =>
    user.email === email
      ? {
          ...user,
          verification: "Rejected",
        }
      : user
  );

  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  return updatedUsers;
};