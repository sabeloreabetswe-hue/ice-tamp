const USERS_KEY = "tamp_users";
const SESSION_KEY = "tamp_session";

const normalizeRole = (role) => {
  const normalizedRole = role?.toString().trim().toLowerCase();

  if (!normalizedRole) {
    return "freightOwner";
  }

  if (normalizedRole.includes("freight")) {
    return "freightOwner";
  }

  if (normalizedRole.includes("transporter")) {
    return "transporter";
  }

  if (normalizedRole.includes("admin")) {
    return "admin";
  }

  return normalizedRole;
};

/*
=========================================
Get All Users
=========================================
*/

export const getUsers = () => {
  const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  return storedUsers.map((user) => ({
    ...user,
    role: normalizeRole(user.role),
  }));
};

/*
=========================================
Save Users
=========================================
*/

export const saveUsers = (users) => {
  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );
};

/*
=========================================
Register User
=========================================
*/

export const registerUser = (user) => {
  const users = getUsers();

  const exists = users.find(
    (u) => u.email === user.email
  );

  if (exists) {
    return {
      success: false,
      message: "Email already exists",
    };
  }

  users.push({
    id: crypto.randomUUID(),
    ...user,
    role: normalizeRole(user.role),
    createdAt: new Date().toISOString(),
  });

  saveUsers(users);

  return {
    success: true,
  };
};

/*
=========================================
Login
=========================================
*/

export const loginUser = (email, password) => {
  const users = getUsers();

  const user = users.find(
    (u) =>
      u.email === email &&
      u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid credentials",
    };
  }

  const authenticatedUser = {
    ...user,
    role: normalizeRole(user.role),
  };

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(authenticatedUser)
  );

  return {
    success: true,
    user: authenticatedUser,
  };
};

/*
=========================================
Current User
=========================================
*/

export const getCurrentUser = () => {
  const currentUser = JSON.parse(
    localStorage.getItem(SESSION_KEY)
  );

  if (!currentUser) {
    return null;
  }

  return {
    ...currentUser,
    role: normalizeRole(currentUser.role),
  };
};

/*
=========================================
Logout
=========================================
*/

export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};

/*
=========================================
Logged In?
=========================================
*/

export const isAuthenticated = () => {
  return !!localStorage.getItem(SESSION_KEY);
};
