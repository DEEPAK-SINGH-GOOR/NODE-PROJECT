const jwt = require("jsonwebtoken");
require("dotenv").config(); 

const decode = async (req, res, next) => {
  try {
    let token = req.headers?.authorization?.split(" ")[1];  

    if (token) {
      try {
      
        let data = await jwt.verify(token, process.env.JWT_SECRET);

        if (data) {
          req.user = data; 
          next(); 
        }
      } catch (error) {
        res.status(404).json({ error: "Invalid token" }); 
      }
    } else {
      res.status(404).json({ error: "No token provided" }); 
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { decode };
