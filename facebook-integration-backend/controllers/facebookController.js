import axios from "axios";
import { pool } from "../db/connect.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const connectFacebook = async (req, res) => {
  try {
    const { pageUrl } = req.body;

    const clientId = process.env.FACEBOOK_CLIENT_ID;
    const redirectUri = process.env.FACEBOOK_REDIRECT_URI;
    const authUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=pages_show_list,pages_read_engagement,email,public_profile`;

    res.json({ authUrl });
  } catch (err) {
    console.error("Error in connectFacebook:", err);
    res.status(500).json({ error: "Failed to generate Facebook oauth URL" });
  }
};


export const facebookCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const tokenResponse = await axios.get("https://graph.facebook.com/v21.0/oauth/access_token", {
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        code,
      },
    });

    const accessToken = tokenResponse.data.access_token;
    const userResponse = await axios.get("https://graph.facebook.com/me", {
      params: { access_token: accessToken, fields: "id,first_name,last_name,email" },
    });

    const { id: userId, first_name, last_name, email } = userResponse.data;
    const integrationId = uuidv4();

    
    const insertQuery = `
      INSERT INTO integrations 
        (integration_id, page_url, user_id, first_name, last_name, email, access_token, refresh_token, token_expires_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, NOW() + INTERVAL '60 days')
      RETURNING *;
    `;

    const values = [
      integrationId,
      "https://www.facebook.com/profile.php?id=61582142952401", 
      userId,
      first_name || "",
      last_name || "",
      email || "unknown",
      accessToken,
      "", 
    ];

    const result = await pool.query(insertQuery, values);

    console.log("User successfully stored in PostgreSQL:", result.rows[0]);

    res.send(`<h2> Connected successfully! You can close this tab.</h2>`);
  } catch (err) {
    console.error("Error in facebookCallback:", err.response?.data || err.message);
    res.status(500).send("Error during Facebook OAuth process.");
  }
};
