import crypto from "crypto";

const getSecret = () => process.env.ADMIN_AUTH_SECRET || "default_ignite_secret_fallback_key";

export function createAdminToken(username, role) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      username,
      role, // "junior_admin" or "senior_admin"
      exp: Date.now() + 24 * 60 * 60 * 1000, // valid for 24 hours
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

export function verifyAdminToken(token, expectedRole) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;

  try {
    const expectedSignature = crypto
      .createHmac("sha256", getSecret())
      .update(`${header}.${payload}`)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.exp && Date.now() > data.exp) return null;
    if (expectedRole && data.role !== expectedRole) return null;
    return data;
  } catch {
    return null;
  }
}

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }
  return req.headers["x-admin-token"] || null;
}

export function requireJuniorAdmin(req, res, next) {
  const token = extractToken(req);
  const verified = verifyAdminToken(token, "junior_admin");
  if (!verified) {
    return res.status(401).json({ message: "Access denied: Valid Junior Admin authentication required." });
  }
  req.admin = verified;
  next();
}

export function requireSeniorAdmin(req, res, next) {
  const token = extractToken(req);
  const verified = verifyAdminToken(token, "senior_admin");
  if (!verified) {
    return res.status(401).json({ message: "Access denied: Valid Senior Admin authentication required." });
  }
  req.admin = verified;
  next();
}

