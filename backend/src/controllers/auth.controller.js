const register = async (req, res) => {
  res.send("Registerd account");
};

const login = async (req, res) => {
  res.send("Login account");
};

const logout = async (req, res) => {
  res.send("Logout user");
};

export { register, login, logout };
