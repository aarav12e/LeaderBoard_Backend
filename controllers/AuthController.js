import { createAdminToken } from "../middleware/auth.js";

function parseCredentials(envString, fallback) {
  const source = envString || fallback;
  const accounts = {};
  source.split(",").forEach(pair => {
    const [u, p] = pair.split(":");
    if (u && p) {
      accounts[u.trim().toLowerCase()] = p.trim();
    }
  });
  return accounts;
}

export const juniorLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const validAccounts = parseCredentials(
      process.env.JUNIOR_ADMIN_USERS,
      "nikhil:nikhil123,anupam:anupam123"
    );

    const userKey = username.trim().toLowerCase();
    if (validAccounts[userKey] && validAccounts[userKey] === password.trim()) {
      const token = createAdminToken(userKey, "junior_admin");
      return res.json({ token, username: userKey, role: "junior_admin" });
    }

    return res.status(401).json({ message: "Access denied: Invalid credentials" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Authentication error" });
  }
};

export const seniorLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const validAccounts = parseCredentials(
      process.env.SENIOR_ADMIN_USERS,
      "admin:changeme123"
    );

    const userKey = username.trim().toLowerCase();
    if (validAccounts[userKey] && validAccounts[userKey] === password.trim()) {
      const token = createAdminToken(userKey, "senior_admin");
      return res.json({ token, username: userKey, role: "senior_admin" });
    }

    return res.status(401).json({ message: "Access denied: Invalid credentials" });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Authentication error" });
  }
};

