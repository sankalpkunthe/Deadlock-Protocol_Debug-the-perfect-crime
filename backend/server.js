const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const axios = require("axios");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
const PORT = 5000;


const { exec } = require("child_process");
const fs = require('fs');
const path = require("path");

function runCode(language, code, input="") {
  return new Promise((resolve) => {
    const tempDir = path.join(__dirname, "temp");

    let filePath, command;

    if(language === "javascript") {
      filePath = path.join(tempDir, "code.js");
      fs.writeFileSync(filePath, code);
      command = `node ${filePath}`;
    }

    else if(language === "python") {
      filePath = path.join(tempDir, "code.py");
      fs.writeFileSync(filePath, code);
      command = `python ${filePath}`;
    }

    else if (language === "c") {
      filePath = path.join(tempDir, "code.c");
      fs.writeFileSync(filePath, code);
      command = `gcc ${filePath} -o ${tempDir}/out && ${tempDir}/out`;
    }

    else if(language === "cpp") {
      filePath = path.join(tempDir, "code.cpp");
      fs.writeFileSync(filePath, code);
      command = `g++ ${filePath} -o ${tempDir}/out.exe && ${tempDir}/out.exe`;
    }

    else if (language === "java") {
      filePath = path.join(tempDir, "Main.java");
      fs.writeFileSync(filePath, code);

      command = `cd "${tempDir}" && javac Main.java && java Main`;
    }
    
    const process = exec(command, {timeout: 5000 }, (err, stdout, stderr) => {
      if(err) return resolve(stderr || "Error");
      resolve(stdout.trim());
    });

    if(input) {
      process.stdin.write(input);
    }

    process.stdin.end();
  });
}



app.post("/run-test", async (req, res) => {
  const { language, code, input } = req.body;

  const output = await runCode(language, code, input);

  res.json({ output });
});


app.get('/', (req, res) => {
  res.send("Backend running");
});

const auth = (req, res, next) => {
  const token = req.headers["authorization"];

  if(!token) return res.status(401).send("No token");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};


app.get("/me", auth, async (req, res) => {
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      `SELECT id, name, email FROM users WHERE id = $1`,
      [user_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send("Error fetching user");
  }
});


app.get("/progress", auth, async (req, res) => {
  const user_id = req.user.id;

  const result = await pool.query(
    `SELECT chapter, question
     FROM submissions
     WHERE user_id = $1 AND is_correct = true
     ORDER BY chapter DESC, question DESC
     LIMIT 1`,
    [user_id]
  );

  if (result.rows.length === 0) {
    return res.json({ chapter: 1, question: 1 });
  }
  
    let { chapter, question } = result.rows[0];
    question += 1;

    if (question > 10) {
      chapter += 1;
      question = 1;
    }

  const pointer = ((chapter - 1) * 10) + question;
  res.json({ chapter, question, pointer });
});


app.post('/submit', auth, async (req, res) => {
  const { chapter, question, code, language } = req.body;
  const user_id = req.user.id;

  try {
    const tests = await pool.query(
      `SELECT input, expected_output
       FROM test_cases
       WHERE chapter = $1 AND question = $2`,
      [chapter, question]
    );


    if (tests.rows.length === 0) {
      return res.status(404).send("No test cases found");
    }

    let allPassed = true;
    let results = []

    for (const test of tests.rows) {
      const output = await runCode(language, code, test.input);

      const passed = output.trim() === test.expected_output.trim();

      results.push({
        input: test.input,
        expected: test.expected_output,
        output,
        passed
      });

      if (!passed) {
        allPassed = false;
        break;
      }
    }

    await pool.query(
      `INSERT INTO submissions
      (user_id, chapter, question, code, output, is_correct)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [user_id, chapter, question, code, JSON.stringify(results), allPassed]
    );


    res.json({
      correct: allPassed,
      results
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Execution error");
  }
});


app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    const user = await pool.query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) RETURNING id, name, email`,
       [name, email, hashed]
    );

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Signup error");
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if(user.rows.length === 0) {
      return res.status(400).send("User not found");
    }


    const valid = await bcrypt.compare(password, user.rows[0].password);

    if(!valid) {
      return res.status(400).send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Login error");
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});